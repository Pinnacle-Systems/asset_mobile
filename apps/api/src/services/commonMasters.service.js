// ============================================================
// Asset Audit Backend - commonMasters.service.js
// Only endpoints used by the Asset Mobile app are kept here.
// ============================================================

import { getAssetConnection, getConnection } from '../constants/db.connection.js';
import { prisma_Connector } from '../../index.js';
import bcrypt from 'bcrypt';

// ─── Helper: Transform oracle result rows to key-value objects ──
function transformRows(oracleResult) {
    return oracleResult?.rows?.map(row => {
        const obj = {};
        oracleResult.metaData.forEach((col, i) => {
            obj[col.name] = row[i];
        });
        return obj;
    }) || [];
}

// ─── GET BARCODE DETAILS ────────────────────────────────────────
// Used by: useLazyGetBarcodeDataQuery → GET /commonMast/getBarcodeDetails
export async function getBarcodeDetails(req, res) {
    const connection = await getAssetConnection(res);
    try {
        const { BARCODEID } = req.query;
        const sql = `
            SELECT J.COMPCODE COMPCODE1, A.DOCID DOCID1, A.ASSETID, C.SUBGRPNAME,
                   A.MMADE MACHINEMADE, A.MMODEL MACHINEMODEL, A.REMARKS,
                   D.RNAME RNAME1, A.ABARID, A.*
            FROM GTAD A
            LEFT JOIN GTCOMPMAST B ON A.DIVISION = B.GTCOMPMASTID
            LEFT JOIN ATSUBGRPMASTDET C ON C.ATSUBGRPMASTDETID = A.SUBGRP
            LEFT JOIN GTRMASTDET D ON D.GTRMASTDETID = A.ROOM
            LEFT JOIN ATMAINGRPMAST E ON E.ATMAINGRPMASTID = A.MAINGRP
            LEFT JOIN GTBMAST F ON F.GTBMASTID = A.BUILDING
            LEFT JOIN GTFMASTDET G ON G.GTFMASTDETID = A.FLOORS
            LEFT JOIN GTCOMPMAST J ON J.GTCOMPMASTID = A.COMPCODE
            WHERE A.ABARID = :BARCODEID
            ORDER BY A.DOCID
        `;
        const oracleResult = await connection.execute(sql, { BARCODEID });
        return res.json({ statusCode: 0, data: transformRows(oracleResult) });
    } catch (err) {
        console.error('getBarcodeDetails error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await connection.close();
    }
}

// ─── GET AUDIT ASSET DETAILS ─────────────────────────────────
// Used by: useGetAuditAssestDetailsQuery → GET /commonMast/getAuditAssestDetails
export async function getAuditAssestDetails(req, res) {
    const connection = await getAssetConnection(res);
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();

    try {
        const sql = `
            SELECT
                A.ABARID, A.ASSETID, A.DOCID,
                NVL(A.MMADE, 'N/A') AS MMADE,
                NVL(A.MMODEL, 'N/A') AS MMODEL,
                NVL(A.CONDITION, 'N/A') AS CONDITION,
                NVL(A.LOC, 'N/A') AS LOC,
                NVL(TO_CHAR(A.REMARKS), 'N/A') AS REMARKS,
                NVL(C.SUBGRPNAME, 'N/A') AS SUBGRPNAME,
                NVL(B.COMPNAME, 'N/A') AS DIVISION_NAME,
                NVL(D.RNAME, 'N/A') AS SCANNED_ROOM,
                NVL(F.BNAME, 'N/A') AS SCANNED_BUILDING,
                NVL(G.FNAME, 'N/A') AS SCANNED_FLOOR,
                A.AUDIT_DATE,
                CASE
                    WHEN A.CONDITION = 'Damaged' THEN 'Damaged'
                    ELSE 'Available'
                END AS STATUS,
                A.ROOM AS ROOM_ID,
                A.BUILDING AS BUILDING_ID,
                A.FLOORS AS FLOOR_ID,
                A.DIVISION AS DIVISION_ID,
                A.MAINGRP AS MAINGRP_ID,
                A.SUBGRP AS SUBGRP_ID,
                A.COMPCODE
            FROM ASSETAUDIT A
            LEFT JOIN GTCOMPMAST B ON A.DIVISION = B.GTCOMPMASTID
            LEFT JOIN ATSUBGRPMASTDET C ON C.ATSUBGRPMASTDETID = A.SUBGRP
            LEFT JOIN GTRMASTDET D ON D.GTRMASTDETID = A.ROOM
            LEFT JOIN ATMAINGRPMAST E ON E.ATMAINGRPMASTID = A.MAINGRP
            LEFT JOIN GTBMAST F ON F.GTBMASTID = A.BUILDING
            LEFT JOIN GTFMASTDET G ON G.GTFMASTDETID = A.FLOORS
            WHERE A.COMPCODE = :COMPCODE
            ORDER BY A.AUDIT_DATE DESC, A.ASSETID
        `;
        const oracleResult = await connection.execute(sql, { COMPCODE });
        const data = transformRows(oracleResult);
        return res.json({ statusCode: 1, message: 'Audit details retrieved successfully', data });
    } catch (err) {
        console.error('getAuditAssestDetails error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        if (connection) await connection.close().catch(console.error);
    }
}

// ─── GET AUDIT VARIANCE REPORT ────────────────────────────────
// Used by: useGetAuditVarianceReportQuery → GET /commonMast/getAuditVarianceReport
export async function getAuditVarianceReport(req, res) {
    const connection = await getAssetConnection(res);
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();

    try {
        const sql = `
          WITH TODAY_SCAN AS (
            SELECT COMPCODE, DOCID, ASSETID, ABARID, SUBGRP, MMADE, MMODEL,
                   ROOM, BUILDING, FLOORS, DIVISION, MAINGRP, CONDITION, LOC, REMARKS, AUDIT_DATE
            FROM ASSETAUDIT
            WHERE COMPCODE = :COMPCODE1
              AND AUDIT_DATE >= TRUNC(SYSDATE) AND AUDIT_DATE < TRUNC(SYSDATE) + 1
          ),
          PREV_SCAN AS (
            SELECT COMPCODE, ASSETID,
                   ROOM AS PREV_ROOM, BUILDING AS PREV_BUILDING, FLOORS AS PREV_FLOORS,
                   DIVISION AS PREV_DIVISION, MAINGRP AS PREV_MAINGRP, SUBGRP AS PREV_SUBGRP,
                   CONDITION AS PREV_CONDITION, AUDIT_DATE AS PREV_AUDIT_DATE
            FROM (
                SELECT COMPCODE, ASSETID, ROOM, BUILDING, FLOORS, DIVISION,
                       MAINGRP, SUBGRP, CONDITION, AUDIT_DATE,
                       ROW_NUMBER() OVER (PARTITION BY ASSETID, COMPCODE ORDER BY AUDIT_DATE DESC) AS RN
                FROM ASSETAUDIT
                WHERE COMPCODE = :COMPCODE2 AND AUDIT_DATE < TRUNC(SYSDATE)
            ) WHERE RN = 1
          )
          SELECT
            T.ABARID, T.ASSETID, T.DOCID, T.AUDIT_DATE, P.PREV_AUDIT_DATE,
            NVL(T.MMADE, 'N/A') AS MMADE, NVL(T.MMODEL, 'N/A') AS MMODEL,
            NVL(T.CONDITION, 'N/A') AS CONDITION, NVL(T.LOC, 'N/A') AS LOC,
            NVL(TO_CHAR(T.REMARKS), 'N/A') AS REMARKS,
            NVL(SG.SUBGRPNAME, 'N/A') AS SUBGRPNAME,
            NVL(DIV.COMPNAME, 'N/A') AS DIVISION_NAME,
            NVL(RM_T.RNAME, 'N/A') AS SCANNED_ROOM,
            NVL(BLD_T.BNAME, 'N/A') AS SCANNED_BUILDING,
            NVL(FLR_T.FNAME, 'N/A') AS SCANNED_FLOOR,
            NVL(RM_P.RNAME, 'N/A') AS PREV_ROOM,
            NVL(BLD_P.BNAME, 'N/A') AS PREV_BUILDING,
            NVL(FLR_P.FNAME, 'N/A') AS PREV_FLOOR,
            NVL(P.PREV_CONDITION, 'N/A') AS PREV_CONDITION,
            NVL(RM_M.RNAME, 'N/A') AS EXPECTED_ROOM,
            NVL(BLD_M.BNAME, 'N/A') AS EXPECTED_BUILDING,
            NVL(FLR_M.FNAME, 'N/A') AS EXPECTED_FLOOR,
            CASE
                WHEN MAST.ASSETID IS NULL THEN 'NEW'
                WHEN NVL(T.CONDITION, 'N/A') = 'Damaged' THEN 'Damaged'
                WHEN NVL(T.ROOM, -1) != NVL(MAST.ROOM, -1) THEN 'Misplaced'
                ELSE 'Available'
            END AS STATUS,
            CASE WHEN P.ASSETID IS NULL THEN 'New' WHEN NVL(T.ROOM,-1) != NVL(P.PREV_ROOM,-1) THEN 'Yes' ELSE 'No' END AS ROOM_CHANGED,
            CASE WHEN P.ASSETID IS NULL THEN 'New' WHEN NVL(T.BUILDING,-1) != NVL(P.PREV_BUILDING,-1) THEN 'Yes' ELSE 'No' END AS BUILDING_CHANGED,
            CASE WHEN P.ASSETID IS NULL THEN 'New' WHEN NVL(T.FLOORS,-1) != NVL(P.PREV_FLOORS,-1) THEN 'Yes' ELSE 'No' END AS FLOOR_CHANGED,
            CASE WHEN P.ASSETID IS NULL THEN 'New' WHEN NVL(T.CONDITION,'N/A') != NVL(P.PREV_CONDITION,'N/A') THEN 'Yes' ELSE 'No' END AS CONDITION_CHANGED,
            CASE
                WHEN P.ASSETID IS NULL THEN 'First Scan'
                WHEN NVL(T.ROOM,-1)!=NVL(P.PREV_ROOM,-1) OR NVL(T.BUILDING,-1)!=NVL(P.PREV_BUILDING,-1) OR NVL(T.FLOORS,-1)!=NVL(P.PREV_FLOORS,-1) OR NVL(T.CONDITION,'N/A')!=NVL(P.PREV_CONDITION,'N/A')
                THEN TRIM(',' FROM
                    CASE WHEN NVL(T.ROOM,-1)!=NVL(P.PREV_ROOM,-1) THEN 'Room:['||NVL(RM_P.RNAME,'N/A')||']->['||NVL(RM_T.RNAME,'N/A')||']' ELSE '' END
                 || CASE WHEN NVL(T.BUILDING,-1)!=NVL(P.PREV_BUILDING,-1) THEN ',Bldg:['||NVL(BLD_P.BNAME,'N/A')||']->['||NVL(BLD_T.BNAME,'N/A')||']' ELSE '' END
                 || CASE WHEN NVL(T.FLOORS,-1)!=NVL(P.PREV_FLOORS,-1) THEN ',Floor:['||NVL(FLR_P.FNAME,'N/A')||']->['||NVL(FLR_T.FNAME,'N/A')||']' ELSE '' END
                 || CASE WHEN NVL(T.CONDITION,'N/A')!=NVL(P.PREV_CONDITION,'N/A') THEN ',Cond:['||NVL(P.PREV_CONDITION,'N/A')||']->['||NVL(T.CONDITION,'N/A')||']' ELSE '' END
                )
                ELSE 'No Change'
            END AS CHANGE_SUMMARY,
            CASE
                WHEN MAST.ASSETID IS NOT NULL AND NVL(T.ROOM,-1)!=NVL(MAST.ROOM,-1)
                THEN 'Expected ['||NVL(RM_M.RNAME,'N/A')||'] Found ['||NVL(RM_T.RNAME,'N/A')||']'
            END AS ROOM_VARIANCE
          FROM TODAY_SCAN T
          LEFT JOIN PREV_SCAN P ON P.ASSETID=T.ASSETID AND P.COMPCODE=T.COMPCODE
          LEFT JOIN GTAD MAST ON MAST.ASSETID=T.ASSETID AND TO_CHAR(MAST.COMPCODE)=T.COMPCODE
          LEFT JOIN GTRMASTDET RM_T ON RM_T.GTRMASTDETID=T.ROOM
          LEFT JOIN GTBMAST BLD_T ON BLD_T.GTBMASTID=T.BUILDING
          LEFT JOIN GTFMASTDET FLR_T ON FLR_T.GTFMASTDETID=T.FLOORS
          LEFT JOIN GTCOMPMAST DIV ON DIV.GTCOMPMASTID=T.DIVISION
          LEFT JOIN ATSUBGRPMASTDET SG ON SG.ATSUBGRPMASTDETID=T.SUBGRP
          LEFT JOIN ATMAINGRPMAST MG ON MG.ATMAINGRPMASTID=T.MAINGRP
          LEFT JOIN GTRMASTDET RM_P ON RM_P.GTRMASTDETID=P.PREV_ROOM
          LEFT JOIN GTBMAST BLD_P ON BLD_P.GTBMASTID=P.PREV_BUILDING
          LEFT JOIN GTFMASTDET FLR_P ON FLR_P.GTFMASTDETID=P.PREV_FLOORS
          LEFT JOIN GTRMASTDET RM_M ON RM_M.GTRMASTDETID=MAST.ROOM
          LEFT JOIN GTBMAST BLD_M ON BLD_M.GTBMASTID=MAST.BUILDING
          LEFT JOIN GTFMASTDET FLR_M ON FLR_M.GTFMASTDETID=MAST.FLOORS
          WHERE T.COMPCODE = :COMPCODE1
          ORDER BY CASE WHEN NVL(T.ROOM,-1)!=NVL(P.PREV_ROOM,-1) OR NVL(T.BUILDING,-1)!=NVL(P.PREV_BUILDING,-1) OR NVL(T.FLOORS,-1)!=NVL(P.PREV_FLOORS,-1) OR NVL(T.CONDITION,'N/A')!=NVL(P.PREV_CONDITION,'N/A') THEN 1 WHEN P.ASSETID IS NULL THEN 2 ELSE 3 END, T.ASSETID
        `;
        const oracleResult = await connection.execute(sql, { COMPCODE1: COMPCODE, COMPCODE2: COMPCODE });
        return res.json({ statusCode: 1, message: 'Variance report generated successfully', data: transformRows(oracleResult) });
    } catch (err) {
        console.error('getAuditVarianceReport error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        await connection.close();
    }
}

// ─── SAVE BARCODE SCAN (Asset Audit) ─────────────────────────
// Used by: useSaveBarcodeDetailsMutation → POST /commonMast/SaveBarcodeDetails
export async function SaveBarcodeDetails(req, res) {
    const connection = await getAssetConnection(res);
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();

    try {
        const { DOCID, ASSETID, SUBGRP, MMADE, MMODEL, REMARKS, ROOM, MAINGRP, BUILDING, FLOORS, ABARID, DIVISION, LOC, CONDITION } = req?.body;

        // Prevent duplicate scan on same day
        const checkResult = await connection.execute(
            `SELECT COUNT(*) FROM ASSETAUDIT WHERE COMPCODE=:COMPCODE AND ASSETID=:ASSETID AND TRUNC(AUDIT_DATE)=TRUNC(SYSDATE)`,
            { COMPCODE, ASSETID }
        );
        if (checkResult.rows[0][0] > 0) {
            return res.json({ statusCode: 0, message: 'This barcode has already been scanned today.' });
        }

        const oracleResult = await connection.execute(
            `INSERT INTO ASSETAUDIT (COMPCODE,DOCID,ASSETID,SUBGRP,MMADE,MMODEL,REMARKS,ROOM,MAINGRP,BUILDING,FLOORS,ABARID,DIVISION,LOC,CONDITION,AUDIT_DATE,CREATED_DATE)
             VALUES (:COMPCODE,:DOCID,:ASSETID,:SUBGRP,:MMADE,:MMODEL,:REMARKS,:ROOM,:MAINGRP,:BUILDING,:FLOORS,:ABARID,:DIVISION,:LOC,:CONDITION,SYSDATE,SYSDATE)`,
            { COMPCODE, DOCID, ASSETID, SUBGRP, MMADE, MMODEL, REMARKS, ROOM, MAINGRP, BUILDING, FLOORS, ABARID, DIVISION, LOC, CONDITION }
        );

        if (oracleResult?.rowsAffected > 0) {
            return res.json({ statusCode: 1, message: 'Barcode scanned successfully' });
        }
        return res.json({ statusCode: 0, message: 'Failed to save barcode details' });
    } catch (err) {
        console.error('SaveBarcodeDetails error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        await connection.commit();
        await connection.close();
    }
}

// ─── ROOM MASTER ───────────────────────────────────────────────
// Used by: useGetRoomMasterQuery → GET /commonMast/master/rooms
export async function getRoomMaster(req, res) {
    const connection = await getAssetConnection(res);
    try {
        const oracleResult = await connection.execute(`SELECT GTRMASTDETID AS ID, RNAME AS NAME FROM GTRMASTDET ORDER BY RNAME`);
        return res.json({ statusCode: 1, data: transformRows(oracleResult) });
    } catch (err) {
        console.error('getRoomMaster error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        if (connection) await connection.close().catch(console.error);
    }
}

// ─── FLOOR MASTER ──────────────────────────────────────────────
// Used by: useGetFloorMasterQuery → GET /commonMast/master/floors
export async function getFloorMaster(req, res) {
    const connection = await getAssetConnection(res);
    try {
        const oracleResult = await connection.execute(`SELECT GTFMASTDETID AS ID, FNAME AS NAME FROM GTFMASTDET ORDER BY FNAME`);
        return res.json({ statusCode: 1, data: transformRows(oracleResult) });
    } catch (err) {
        console.error('getFloorMaster error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        if (connection) await connection.close().catch(console.error);
    }
}

// ─── BUILDING MASTER ───────────────────────────────────────────
// Used by: useGetBuildingMasterQuery → GET /commonMast/master/buildings
export async function getBuildingMaster(req, res) {
    const connection = await getAssetConnection(res);
    try {
        const oracleResult = await connection.execute(`SELECT GTBMASTID AS ID, BNAME AS NAME FROM GTBMAST ORDER BY BNAME`);
        return res.json({ statusCode: 1, data: transformRows(oracleResult) });
    } catch (err) {
        console.error('getBuildingMaster error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        if (connection) await connection.close().catch(console.error);
    }
}

// ─── DIVISION MASTER ───────────────────────────────────────────
// Used by: useGetDivisionMasterQuery → GET /commonMast/master/divisions
export async function getDivisionMaster(req, res) {
    const connection = await getAssetConnection(res);
    try {
        const oracleResult = await connection.execute(`SELECT GTCOMPMASTID AS ID, COMPNAME AS NAME FROM GTCOMPMAST ORDER BY COMPNAME`);
        return res.json({ statusCode: 1, data: transformRows(oracleResult) });
    } catch (err) {
        console.error('getDivisionMaster error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        if (connection) await connection.close().catch(console.error);
    }
}

// ─── DELETE COMMON (Prisma) ─────────────────────────────────
// Used by: useDelete_CommonMutation → POST /commonMast/delete
export async function delete_Common_Data(req, res) {
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();
    const { onlywhere, where, table } = req?.body;
    try {
        const result = await prisma_Connector?.[table]?.delete({ where: onlywhere ? { ...where } : { COMPCODE, ...where } });
        res.json({ status: 1, data: result });
    } catch (err) {
        console.error('delete_Common_Data error:', err);
        res.json({ status: 0, data: {} });
    }
}

// ─── UPDATE COMMON (Prisma) ─────────────────────────────────
// Used by: useUpdate_CommonMutation → POST /commonMast/update
export async function Update_Common_Data_prisma(req, res) {
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();
    const { where, onlywhere, table, data } = req?.body;
    const Comp_data = data?.Compcodes;
    const user_updation = data?.user_updation;

    if (data?.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    try {
        if (Comp_data && user_updation) {
            await prisma_Connector?.companyCode?.deleteMany({ where: { Idcard: data?.Idcard, GCOMP: COMPCODE } });
            const { GCOMP, user_updation: _, Compcodes, ...reset } = data;
            const result = await prisma_Connector?.[table]?.update({
                data: { ...reset, Companies: { create: Comp_data } },
                where: onlywhere ? { ...where } : { COMPCODE, ...where }
            });
            return res.json({ status: 1, data: result });
        }
        const result = await prisma_Connector?.[table]?.update({ data, where: onlywhere ? { ...where } : { COMPCODE, ...where } });
        res.json({ status: 1, data: result });
    } catch (err) {
        console.error('Update_Common_Data_prisma error:', err);
        res.json({ status: 0, data: {} });
    }
}
