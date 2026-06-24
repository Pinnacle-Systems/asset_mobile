// ============================================================
// Asset Audit Backend - user.service.js
// Only functions used by the Asset Mobile screens are kept.
// ============================================================

import bcrypt from 'bcrypt';
import { getConnection } from '../constants/db.connection.js';
import { prisma_Connector } from '../../index.js';
import Random_Otp from '../utils/Random_Otp.js';
import { sendMail } from '../utils/Mailer.js';

// ─── Helper: transform Oracle rows to key-value objects ─────
function transformRows(result) {
    return result?.rows?.map(row => {
        const obj = {};
        result.metaData.forEach((col, i) => { obj[col.name] = row[i]; });
        return obj;
    }) || [];
}

// ─── LOGIN ──────────────────────────────────────────────────
export async function login(req, res) {
    const { deviceName, MobileIP, username, password, COMPCODE } = req.body;
    if (!username) return res.json({ statusCode: 1, message: 'Username is Required' });
    if (!password) return res.json({ statusCode: 1, message: 'Password is Required' });

    const user = await prisma_Connector.user.findFirst({ where: { username }, include: { Companies: true } });
    if (!user?.username) return res.json({ statusCode: 1, message: "Username Doesn't Exist" });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.json({ statusCode: 1, message: "Password Doesn't Match" });

    await prisma_Connector?.userLog.create({
        data: { MobileName: deviceName, MobileIP, User: user.username, COMPCODE, Idcard: user?.Idcard, type: 'Login' }
    });
    return res.json({ statusCode: 0, message: 'Login Successfull', data: user });
}

// ─── CREATE USER ────────────────────────────────────────────
export async function create(req, res) {
    const { username, password, hod, email, otpemail, roleId, Idcard, Compcodes, level, ...rest } = req.body;
    if (!username || !password) return res.json({ statusCode: 1, message: 'Username and Password are Required' });

    try {
        const existing = await prisma_Connector.user.findFirst({ where: { username } });
        if (existing?.username) return res.json({ statusCode: 1, message: 'UserName Already Exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma_Connector.user.create({
            data: { username, roleId, otpemail, password: hashedPassword, email, Idcard, hod, level, Companies: { create: Compcodes }, ...rest }
        });
        return res.json({ statusCode: 0, message: 'User created successfully', data: newUser });
    } catch (error) {
        console.error('create user error:', error);
        return res.json({ statusCode: 1, message: 'An error occurred while creating the user' });
    }
}

// ─── GET ALL USERS ──────────────────────────────────────────
export async function get(req, res) {
    const connection = await getConnection(res);
    try {
        const result = await prisma_Connector.user.findMany({ include: { Companies: true, role: true }, where: { active: true } });
        return res.json({ statusCode: 0, data: result.map(d => ({ gmail: d?.email, ...d })) });
    } catch (err) {
        console.error('Get users error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection.close();
    }
}

// ─── GET LOGGED-IN USER DETAILS ─────────────────────────────
export async function getUserDet(req, res) {
    const connection = await getConnection(res);
    try {
        const sql = `SELECT B.IDCARD||'@'||C.COMPCODE MOBUSER, C.COMPCODE, D.BANDNAME, E.MNNAME1 DEPTNAME, F.DESIGNATION
            FROM HREMPLOYMAST A
            JOIN HREMPLOYDETAILS B ON A.HREMPLOYMASTID=B.HREMPLOYMASTID
            JOIN GTCOMPMAST C ON C.GTCOMPMASTID=A.COMPCODE
            JOIN HRBANDMAST D ON D.HRBANDMASTID=B.BAND
            JOIN GTDEPTDESGMAST E ON E.GTDEPTDESGMASTID=B.DEPTNAME
            JOIN GTDESIGNATIONMAST F ON F.GTDESIGNATIONMASTID=B.DESIGNATION
            WHERE D.BANDNAME='STAFF' AND B.IDACTIVE='YES'`;
        const result = await connection.execute(sql);
        return res.json({ statusCode: 0, data: result.rows.map(u => ({ id: u[0], value: u[0], role: u[4] })) });
    } catch (err) {
        console.error('getUserDet error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection.close();
    }
}

// ─── GET SINGLE USER (legacy Oracle) ────────────────────────
export async function getOne(req, res) {
    const connection = await getConnection(res);
    try {
        const sql = `SELECT T.userName, mobuserlog.allowedpages, T.DEFAULTADMIN
            FROM mobileuser T
            LEFT JOIN mobuserlog ON T.USERNAME = mobuserlog.USERNAME
            ORDER BY userName`;
        const result = await connection.execute(sql);
        return res.json({ statusCode: 0, data: result.rows.map(u => ({ userName: u[0], allowedpages: u[1], defaultAdmin: u[2] })) });
    } catch (err) {
        console.error('getOne error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection.close();
    }
}

// ─── GET USER BASIC DETAILS ─────────────────────────────────
export async function getUserDetails(req, res) {
    const Idcard = req.query.Idcard;
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();
    const connection = await getConnection(res);
    try {
        const sql = `SELECT D.MNNAME1 DeptName,A.FNAME,A.IDCARDNO EMPID,C.DESIGNATION,E.MOBNO
            FROM HREMPLOYMAST A
            JOIN HREMPLOYDETAILS B ON A.HREMPLOYMASTID=B.HREMPLOYMASTID
            JOIN GTDESIGNATIONMAST C ON C.GTDESIGNATIONMASTID=B.DESIGNATION
            JOIN GTDEPTDESGMAST D ON D.GTDEPTDESGMASTID=B.DEPTNAME
            JOIN GTCOMPMAST CM ON CM.GTCOMPMASTID=A.COMPCODE
            LEFT JOIN HRECONTACTDETAILS E ON E.HREMPLOYMASTID=A.HREMPLOYMASTID
            WHERE A.IDCARDNO=:IDCARDNO AND CM.COMPCODE=:COMPCODE`;
        const result = await connection.execute(sql, { COMPCODE, IDCARDNO: Idcard });
        const r = result?.rows[0];
        return res.json({ statusCode: 0, data: r ? { Department: r[0], Name: r[1], EmpId: r[2], Designation: r[3], Mobile: r[4] } : {} });
    } catch (err) {
        console.error('getUserDetails error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection.close();
    }
}

// ─── GET DESIGNATION ────────────────────────────────────────
export async function getDesignation(req, res) {
    const connection = await getConnection(res);
    try {
        const result = await connection.execute(`SELECT DISTINCT(role) FROM mobuserlog`);
        return res.json({ statusCode: 0, data: result.rows.map(u => ({ value: u[0], id: u[0] })) });
    } catch (err) {
        console.error('getDesignation error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection.close();
    }
}

// ─── GET ROLES ON PAGE (by RoleId) ──────────────────────────
export async function getRolesOnPage(req, res) {
    const { RoleId } = req?.query;
    try {
        const result = await prisma_Connector.roleOnPage.findMany({ where: RoleId ? { roleName: RoleId } : {} });
        return res.json({
            status: 1,
            data: result.map(d => ({ dbid: d?.id, id: d?.roleId, create: d?.create, read: d?.read, delete: d?.delete, edit: d?.edit, isdefault: d?.isdefault, link: d?.link }))
        });
    } catch (error) {
        console.error('getRolesOnPage error:', error);
        res.json({ status: 500, data: {}, message: 'An error occurred while fetching roles' });
    }
}

// ─── GET USER ROLES ON PAGE ─────────────────────────────────
export async function getUserRolesOnPage(req, res) {
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();
    const { RoleId } = req?.query;
    try {
        const result = await prisma_Connector.role.findMany({ where: { name: RoleId, COMPCODE }, select: { RoleOnPage: true } });
        const pages = result[0]?.RoleOnPage?.map(d => ({ id: d?.roleId, create: d?.create, read: d?.read, delete: d?.delete, edit: d?.edit, isdefault: d?.isdefault, link: d?.link }));
        return res.json({ status: 1, data: pages });
    } catch (error) {
        console.error('getUserRolesOnPage error:', error);
        res.json({ status: 500, data: {}, message: 'An error occurred while fetching roles' });
    }
}

// ─── GET CREATED ROLES ON PAGE ──────────────────────────────
export async function getCreatedRolesOnPage(req, res) {
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();
    try {
        const result = await prisma_Connector.role.findMany({
            where: { COMPCODE, RoleOnPage: { some: {} } },
            select: { name: true, id: true, active: true, RoleOnPage: true }
        });
        return res.json({ status: 1, data: result });
    } catch (error) {
        console.error('getCreatedRolesOnPage error:', error);
        res.json({ status: 500, data: {}, message: 'An error occurred while fetching roles' });
    }
}

// ─── CREATE ROLE ON PAGE ────────────────────────────────────
export async function createRoleOnPage(req, res) {
    const { roleName, permissions } = req.body;
    try {
        const insertData = Object.entries(permissions).map(([page, p]) => ({
            read: Boolean(p.read), create: Boolean(p.create), edit: Boolean(p.edit),
            delete: Boolean(p.delete), isdefault: Boolean(p.isdefault), roleName, link: page
        }));
        const result = await prisma_Connector.roleOnPage.createMany({ data: insertData });
        return res.json({ status: 1, data: result });
    } catch (err) {
        console.error('createRoleOnPage error:', err);
        res.json({ status: 0, data: {} });
    }
}

// ─── UPDATE ROLE ON PAGE ────────────────────────────────────
export async function UpdateRoleOnPage(req, res) {
    const { roleName, permissions } = req.body;
    if (!roleName || !permissions) return res.status(400).json({ status: 0, message: 'roleName and permissions are required' });

    try {
        const results = await Promise.all(
            Object.entries(permissions).map(async ([page, p]) => {
                const upsertData = { read: Boolean(p.read), create: Boolean(p.create), edit: Boolean(p.edit), delete: Boolean(p.delete), isdefault: Boolean(p.isdefault), roleName, link: page };
                return prisma_Connector.roleOnPage.upsert({
                    where: { id: p.dbid ?? -1, link: page, roleName, AND: { roleName, link: page, id: p.dbid ?? -1 } },
                    update: upsertData, create: upsertData
                }).catch(err => { console.error(`Error on page ${page}:`, err); return null; });
            })
        );
        const failed = results.filter(r => r === null).length;
        return res.json({ status: 1, data: { successCount: results.length - failed, failedCount: failed } });
    } catch (error) {
        console.error('UpdateRoleOnPage error:', error);
        return res.status(500).json({ status: 0, message: 'An error occurred while updating permissions' });
    }
}

// ─── GET COMPANY CODES ──────────────────────────────────────
export async function getCompanyCode(req, res) {
    const connection = await getConnection(res);
    try {
        const result = await connection.execute(`SELECT A.COMPCODE "id", A.COMPCODE "value", A.GTCOMPMASTID COMPID FROM GTCOMPMAST A WHERE A.PTRANSACTION = 'COMPANY' ORDER BY 1`);
        return res.json({ statusCode: 0, data: transformRows(result) });
    } catch (err) {
        console.error('getCompanyCode error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection?.close();
    }
}

// ─── GET EMPLOYEE IDs ───────────────────────────────────────
export async function getEmployeeIds(req, res) {
    const connection = await getConnection(res);
    try {
        const sql = `SELECT C.COMPCODE||'('||B.IDCARD||')'||'('||D.FNAME||')' "value", C.COMPCODE||'-'||B.IDCARD "id", C.COMPCODE, C.COMPNAME, B.DEPTNAME
            FROM HREMPLOYMAST A
            JOIN HREMPLOYDETAILS B ON A.HREMPLOYMASTID=B.HREMPLOYMASTID
            JOIN GTCOMPMAST C ON C.GTCOMPMASTID=A.COMPCODE
            JOIN HREMPLOYMAST D ON D.HREMPLOYMASTID=B.HREMPLOYMASTID
            ORDER BY 3, TO_NUMBER(B.IDCARD)`;
        const result = await connection.execute(sql);
        return res.json({ statusCode: 0, data: transformRows(result) });
    } catch (err) {
        console.error('getEmployeeIds error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection.close();
    }
}

// ─── UPDATE FCM TOKEN ───────────────────────────────────────
export async function update_fcm(req, res) {
    const { Idcard, fcm } = req.body;
    try {
        if (Idcard && fcm) {
            const result = await prisma_Connector.user.update({ where: { Idcard }, data: { fcm } });
            return res.json({ statusCode: 0, data: result });
        }
        return res.json({ statusCode: 500, data: {}, message: 'Id Not Found' });
    } catch (err) {
        console.error('update_fcm error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ─── SEND OTP (Forgot Password) ─────────────────────────────
export async function send_Otp(req, res) {
    const reset = req?.body?.reset;
    try {
        const data = await prisma_Connector.user?.findFirst({
            where: reset ? { OR: [{ otpemail: req?.body?.username }, { username: req?.body?.username }] } : { username: req?.body?.username }
        });
        const isMatched = !reset && await bcrypt.compare(req?.body?.password, data?.password);
        if (isMatched || (reset && data?.otpemail)) {
            const otpVal = Random_Otp();
            const otp = await sendMail({ to: data?.otpemail, otp: otpVal });
            if (otp?.accepted[0] === data?.otpemail) {
                await prisma_Connector.user?.update({ where: { username: data?.username }, data: { otp: otpVal } });
                return res.json({ status: 1 });
            }
            return res.json({ status: 0 });
        } else if (!data?.otpemail) {
            return res.json({ status: 0, err: 'Email is Not Registered!' });
        } else {
            return res.json({ status: 0, err: 'Password is Not Correct!' });
        }
    } catch (error) {
        console.error('send_Otp error:', error);
        res.json({ status: 500, err: error.message });
    }
}

// ─── VERIFY OTP & CHANGE PASSWORD ──────────────────────────
export async function verify_Otp_and_change_pass(req, res) {
    const { otp, username, NewPass } = req?.body;
    try {
        const data = await prisma_Connector.user?.findFirst({ where: { otp } });
        if (data?.otp) {
            const hashedPassword = await bcrypt.hash(NewPass, 10);
            const result = await prisma_Connector?.user?.update({ where: { username }, data: { password: hashedPassword } });
            return res?.json({ status: result?.password ? 1 : 0 });
        }
        return res?.json({ status: 0 });
    } catch (err) {
        console.error('verify_Otp_and_change_pass error:', err);
    }
}

// ─── CHANGE SETTINGS ────────────────────────────────────────
export async function Change_Settings(req, res) {
    const compCode = String(req.headers?.compcode).toUpperCase();
    const { Idcard, data } = req.body;
    try {
        const result = await prisma_Connector.settings.upsert({ where: { UserId: Idcard, COMPCODE: compCode }, update: data, create: data });
        return res.json({ statusCode: 1, data: result });
    } catch (err) {
        console.error('Change_Settings error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ─── GET SETTINGS ───────────────────────────────────────────
export async function get_Change_Settings(req, res) {
    const compCode = String(req.headers?.compcode).toUpperCase();
    const Idcard = req.query?.Idcard;
    try {
        const result = Idcard ? await prisma_Connector.settings.findUnique({ where: { UserId: Idcard, COMPCODE: compCode } }) : {};
        return res.json({ statusCode: 0, data: result });
    } catch (err) {
        console.error('get_Change_Settings error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
