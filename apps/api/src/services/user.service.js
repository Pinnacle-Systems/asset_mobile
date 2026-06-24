import { logger } from "../utils/logger.js";
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
export async function login(req, res, next) {
    const { deviceName, MobileIP, username, password, COMPCODE } = req.body;
    if (!username) return res.json({ statusCode: 1, message: 'Please provide a valid username.' });
    if (!password) return res.json({ statusCode: 1, message: 'Please provide a valid password.' });

    const user = await prisma_Connector.user.findFirst({ where: { username }, include: { Companies: true } });
    if (!user?.username) return res.json({ statusCode: 1, message: "We couldn't find an account with that username." });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) return res.json({ statusCode: 1, message: "The password you entered is incorrect. Please try again." });

    await prisma_Connector?.userLog.create({
        data: { MobileName: deviceName, MobileIP, User: user.username, COMPCODE, Idcard: user?.Idcard, type: 'Login' }
    });
    return res.json({ statusCode: 0, message: 'Login Successfull', data: user });
}

// ─── CREATE USER ────────────────────────────────────────────
export async function create(req, res, next) {
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
        logger.error('create user error:', error);
        return res.json({ statusCode: 1, message: 'An error occurred while creating the user' });
    }
}

// ─── GET ALL USERS ──────────────────────────────────────────
export async function get(req, res, next) {
    const connection = await getConnection(res);
    try {
        const result = await prisma_Connector.user.findMany({ include: { Companies: true, role: true }, where: { active: true } });
        return res.json({ statusCode: 0, data: result.map(d => ({ gmail: d?.email, ...d })) });
    } catch (err) {
        logger.error('Get users error:', err);
        return next(err);
    } finally {
        await connection.close();
    }
}

// ─── GET LOGGED-IN USER DETAILS ─────────────────────────────
export async function getUserDet(req, res, next) {
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
        logger.error('getUserDet error:', err);
        return next(err);
    } finally {
        await connection.close();
    }
}







// ─── GET ROLES ON PAGE (by RoleId) ──────────────────────────
export async function getRolesOnPage(req, res, next) {
    const { RoleId } = req?.query;
    try {
        const result = await prisma_Connector.roleOnPage.findMany({ where: RoleId ? { roleName: RoleId } : {} });
        return res.json({
            status: 1,
            data: result.map(d => ({ dbid: d?.id, id: d?.roleId, create: d?.create, read: d?.read, delete: d?.delete, edit: d?.edit, isdefault: d?.isdefault, link: d?.link }))
        });
    } catch (error) {
        logger.error('getRolesOnPage error:', error);
        res.json({ status: 500, data: {}, message: 'An error occurred while fetching roles' });
    }
}

// ─── GET USER ROLES ON PAGE ─────────────────────────────────
export async function getUserRolesOnPage(req, res, next) {
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();
    const { RoleId } = req?.query;
    try {
        const result = await prisma_Connector.role.findMany({ where: { name: RoleId, COMPCODE }, select: { RoleOnPage: true } });
        const pages = result[0]?.RoleOnPage?.map(d => ({ id: d?.roleId, create: d?.create, read: d?.read, delete: d?.delete, edit: d?.edit, isdefault: d?.isdefault, link: d?.link }));
        return res.json({ status: 1, data: pages });
    } catch (error) {
        logger.error('getUserRolesOnPage error:', error);
        res.json({ status: 500, data: {}, message: 'An error occurred while fetching roles' });
    }
}

// ─── GET CREATED ROLES ON PAGE ──────────────────────────────
export async function getCreatedRolesOnPage(req, res, next) {
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();
    try {
        const result = await prisma_Connector.role.findMany({
            where: { COMPCODE, RoleOnPage: { some: {} } },
            select: { name: true, id: true, active: true, RoleOnPage: true }
        });
        return res.json({ status: 1, data: result });
    } catch (error) {
        logger.error('getCreatedRolesOnPage error:', error);
        res.json({ status: 500, data: {}, message: 'An error occurred while fetching roles' });
    }
}

// ─── CREATE ROLE ON PAGE ────────────────────────────────────
export async function createRoleOnPage(req, res, next) {
    const { roleName, permissions } = req.body;
    try {
        const insertData = Object.entries(permissions).map(([page, p]) => ({
            read: Boolean(p.read), create: Boolean(p.create), edit: Boolean(p.edit),
            delete: Boolean(p.delete), isdefault: Boolean(p.isdefault), roleName, link: page
        }));
        const result = await prisma_Connector.roleOnPage.createMany({ data: insertData });
        return res.json({ status: 1, data: result });
    } catch (err) {
        logger.error('createRoleOnPage error:', err);
        res.json({ status: 0, data: {} });
    }
}

// ─── UPDATE ROLE ON PAGE ────────────────────────────────────
export async function UpdateRoleOnPage(req, res, next) {
    const { roleName, permissions } = req.body;
    if (!roleName || !permissions) return next(err);

    try {
        const results = await Promise.all(
            Object.entries(permissions).map(async ([page, p]) => {
                const upsertData = { read: Boolean(p.read), create: Boolean(p.create), edit: Boolean(p.edit), delete: Boolean(p.delete), isdefault: Boolean(p.isdefault), roleName, link: page };
                return prisma_Connector.roleOnPage.upsert({
                    where: { id: p.dbid ?? -1, link: page, roleName, AND: { roleName, link: page, id: p.dbid ?? -1 } },
                    update: upsertData, create: upsertData
                }).catch(err => { logger.error(`Error on page ${page}:`, err); return null; });
            })
        );
        const failed = results.filter(r => r === null).length;
        return res.json({ status: 1, data: { successCount: results.length - failed, failedCount: failed } });
    } catch (error) {
        logger.error('UpdateRoleOnPage error:', error);
        return next(err);
    }
}

// ─── GET COMPANY CODES ──────────────────────────────────────
export async function getCompanyCode(req, res, next) {
    const connection = await getConnection(res);
    try {
        const result = await connection.execute(`SELECT A.COMPCODE "id", A.COMPCODE "value", A.GTCOMPMASTID COMPID FROM GTCOMPMAST A WHERE A.PTRANSACTION = 'COMPANY' ORDER BY 1`);
        return res.json({ statusCode: 0, data: transformRows(result) });
    } catch (err) {
        logger.error('getCompanyCode error:', err);
        return next(err);
    } finally {
        await connection?.close();
    }
}

// ─── GET EMPLOYEE IDs ───────────────────────────────────────
export async function getEmployeeIds(req, res, next) {
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
        logger.error('getEmployeeIds error:', err);
        return next(err);
    } finally {
        await connection.close();
    }
}

// ─── UPDATE FCM TOKEN ───────────────────────────────────────
export async function update_fcm(req, res, next) {
    const { Idcard, fcm } = req.body;
    try {
        if (Idcard && fcm) {
            const result = await prisma_Connector.user.update({ where: { Idcard }, data: { fcm } });
            return res.json({ statusCode: 0, data: result });
        }
        return res.json({ statusCode: 500, data: {}, message: 'Id Not Found' });
    } catch (err) {
        logger.error('update_fcm error:', err);
        return next(err);
    }
}







// ─── GET SETTINGS ───────────────────────────────────────────
export async function get_Change_Settings(req, res, next) {
    const compCode = String(req.headers?.compcode).toUpperCase();
    const Idcard = req.query?.Idcard;
    try {
        const result = Idcard ? await prisma_Connector.settings.findUnique({ where: { UserId: Idcard, COMPCODE: compCode } }) : {};
        return res.json({ statusCode: 0, data: result });
    } catch (err) {
        logger.error('get_Change_Settings error:', err);
        return next(err);
    }
}
