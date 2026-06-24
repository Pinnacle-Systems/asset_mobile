import { prisma_Connector } from "../../index.js";
import { getAssetConnection, getConnection } from "../constants/db.connection.js";
import bcrypt from "bcrypt"
import formatDateToOracle from "../utils/OracleDateFormat.js";


export async function get(req, res) {
    const connection = await getConnection(res)
    try {
        const result = await connection.execute(`
        select * from (select finyr  from GTFINANCIALYEAR order by finyr desc) finyr     
        where rownum <= 3
     `)
        let resp = result.rows.map(po => ({
            finYear: po[0]
        }))

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getBuyer(req, res) {
    const connection = await getConnection(res)
    try {
        const result = await connection.execute(`
        SELECT C.COMPCODE,COUNT(*) TOT FROM HREMPLOYMAST A 
JOIN HREMPLOYDETAILS B ON A.HREMPLOYMASTID = B.HREMPLOYMASTID
JOIN GTCOMPMAST C ON C.GTCOMPMASTID = A.COMPCODE
WHERE B.IDACTIVE = 'YES'
GROUP BY C.COMPCODE
     `)
        let resp = result.rows.map(po => ({
            buyerName: po[0]
        }))

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}


export async function getMonthData(req, res) {
    const connection = await getConnection(res)
    try {
        const { filterYear, filterBuyer } = req.query;
        const result = await connection.execute(`
            SELECT A.PAYPERIOD FROM MONTHLYPAYFRQ A
              WHERE A.finyr = '${filterYear}' 
GROUP BY A.PAYPERIOD
      ORDER BY TO_DATE(A.PAYPERIOD, 'Month YYYY')        
     `)
        console.log(result, 'res');
        let resp = result.rows.map(po => ({
            month: po[0]
        }))

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}

export async function getCompCodeData(req, res) {
    const connection = await getConnection(res)
    try {
        const { } = req.query;
        const sql =
            `
       SELECT C.COMPCODE,COUNT(*) TOT FROM HREMPLOYMAST A 
JOIN HREMPLOYDETAILS B ON A.HREMPLOYMASTID = B.HREMPLOYMASTID
JOIN GTCOMPMAST C ON C.GTCOMPMASTID = A.COMPCODE
WHERE B.IDACTIVE = 'YES'
GROUP BY C.COMPCODE`
        console.log(sql, '84');
        const result = await connection.execute(sql)
        let resp = result.rows.map(po => ({
            com: po[0]
        }))

        return res.json({ statusCode: 0, data: resp })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}






export async function getBarcodeDetails(req, res) {
    const connection = await getAssetConnection(res)
   const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    try {
        const {BARCODEID} = req.query;

   console.log("DR",BARCODEID)

        const sql =
            ` SELECT J.COMPCODE COMPCODE1,A.DOCID DOCID1,A.ASSETID,C.SUBGRPNAME,A.MMADE MACHINEMADE,A.MMODEL MACHINEMODEL,A.REMARKS,D.RNAME RNAME1,A.ABARID,A.*
FROM GTAD A 
LEFT JOIN GTCOMPMAST B ON A.DIVISION=B.GTCOMPMASTID
LEFT JOIN ATSUBGRPMASTDET C ON C.ATSUBGRPMASTDETID=A.SUBGRP
LEFT JOIN GTRMASTDET D ON D.GTRMASTDETID=A.ROOM
LEFT JOIN ATMAINGRPMAST E ON E.ATMAINGRPMASTID = A.MAINGRP
LEFT JOIN GTBMAST F ON F.GTBMASTID=A.BUILDING
LEFT JOIN GTFMASTDET G ON G.GTFMASTDETID=A.FLOORS
LEFT JOIN GTCOMPMAST J ON J.GTCOMPMASTID =A.COMPCODE
WHERE  A.ABARID =:BARCODEID
ORDER BY A.DOCID`
          const oracleResult = await connection.execute(sql, {BARCODEID});        
         const transformedResult = oracleResult?.rows?.map(row => {
            const keyValuePair = {};
            // Assuming the first row contains the column names
            oracleResult.metaData.forEach((col, index) => {
              keyValuePair[col.name] = row[index];
            });
            return keyValuePair;
           });


           console.log("bar"+BARCODEID,transformedResult);
           
        return res.json({ statusCode: 0, data:transformedResult })
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    finally {
        await connection.close()
    }
}



// export async function getAuditAssestDetails(req, res) {
//     const connection = await getAssetConnection(res);
//     const COMPCODE = String(req?.headers?.compcode).toUpperCase();
    
//     try {
//         const sql = `
//           SELECT A.DOCID DOCID1,A.ASSETID,C.SUBGRPNAME,A.MMADE MACHINEMADE,A.MMODEL MACHINEMODEL,A.REMARKS,D.RNAME RNAME1,A.ABARID,A.CONDITION,A.*
// FROM ASSETAUDIT A 
// JOIN GTCOMPMAST B ON A.DIVISION=B.GTCOMPMASTID
// JOIN ATSUBGRPMASTDET C ON C.ATSUBGRPMASTDETID=A.SUBGRP
// JOIN GTRMASTDET D ON D.GTRMASTDETID=A.ROOM
// JOIN ATMAINGRPMAST E ON E.ATMAINGRPMASTID = A.MAINGRP
// JOIN GTBMAST F ON F.GTBMASTID=A.BUILDING
// JOIN GTFMASTDET G ON G.GTFMASTDETID= TO_NUMBER(A.FLOORS)  
// where A.COMPCODE=:COMPCODE  ORDER BY A.DOCID 
//         `;

//         console.log("COm",COMPCODE);
        

//         const oracleResult = await connection.execute(sql,{COMPCODE});

//         // Transform result to key-value pairs
//         const transformedResult = oracleResult?.rows?.map(row => {
//             const keyValuePair = {};
//             oracleResult.metaData.forEach((col, index) => {
//                 keyValuePair[col.name] = row[index];
//             });
//             return keyValuePair;
//         });

//         console.log("Barcode query:", "Results:", transformedResult?.length);
        
//         if (!transformedResult || transformedResult.length === 0) {
//             return res.json({ 
//                 statusCode: 0, 
//                 message: 'No barcode details found',
//                 data: [] 
//             });
//         }

//         return res.json({ 
//             statusCode: 1, 
//             message: 'Barcode details retrieved successfully',
//             data: transformedResult 
//         });
//     }
//     catch (err) {
//         console.error('Error retrieving barcode details:', err);
//         res.status(500).json({ 
//             statusCode: 0, 
//             error: 'Internal Server Error',
//             message: err.message 
//         });
//     }
//     finally {
//         await connection.close();
//     }
// }



// export async function getAuditVarianceReport(req, res) {

//     console.log("barc",req?.headers);
//     const connection = await getAssetConnection(res);
//     const COMPCODE = String(req?.headers?.compcode).toUpperCase();


// //     WITH TODAY_SCAN AS (
// //     SELECT
// //         COMPCODE, DOCID, ASSETID, ABARID,
// //         SUBGRP, MMADE, MMODEL,
// //         ROOM, BUILDING, FLOORS, DIVISION,
// //         CONDITION, LOC, REMARKS, AUDIT_DATE
// //     FROM ASSETAUDIT
// //     WHERE COMPCODE   = :COMPCODE
// //       AND AUDIT_DATE >= TRUNC(SYSDATE)
// //       AND AUDIT_DATE  < TRUNC(SYSDATE) + 1
// // ),
// // PREV_SCAN AS (
// //     SELECT
// //         COMPCODE, ASSETID,
// //         ROOM       AS PREV_ROOM,
// //         BUILDING   AS PREV_BUILDING,
// //         FLOORS     AS PREV_FLOORS,
// //         CONDITION  AS PREV_CONDITION,
// //         AUDIT_DATE AS PREV_AUDIT_DATE
// //     FROM (
// //         SELECT
// //             COMPCODE, ASSETID,
// //             ROOM, BUILDING, FLOORS, CONDITION, AUDIT_DATE,
// //             ROW_NUMBER() OVER (
// //                 PARTITION BY ASSETID, COMPCODE
// //                 ORDER BY AUDIT_DATE DESC
// //             ) AS RN
// //         FROM ASSETAUDIT
// //         WHERE COMPCODE   = :COMPCODE
// //           AND AUDIT_DATE < TRUNC(SYSDATE)
// //     )
// //     WHERE RN = 1
// // )
// // SELECT
// //     T.ABARID,
// //     T.ASSETID,
// //     T.DOCID,
// //     T.AUDIT_DATE                                        AS AUDIT_DATE,
// //     P.PREV_AUDIT_DATE,

// //     -- Asset details
// //     NVL(T.MMADE,                    'N/A')              AS MMADE,
// //     NVL(T.MMODEL,                   'N/A')              AS MMODEL,
// //     NVL(C.SUBGRPNAME,               'N/A')              AS SUBGRPNAME,
// //     NVL(DIV.COMPNAME,               'N/A')              AS DIVISION_NAME,
// //     NVL(T.CONDITION,                'N/A')              AS CONDITION,
// //     NVL(T.LOC,                      'N/A')              AS LOC,
// //     NVL(TO_CHAR(T.REMARKS),         'N/A')              AS REMARKS,

// //     -- Today locations (resolved names)
// //     NVL(D_T.RNAME,                  'N/A')              AS SCANNED_ROOM,
// //     NVL(BLD_T.BNAME,                'N/A')              AS SCANNED_BUILDING,
// //     NVL(FLR_T.FNAME,                'N/A')              AS SCANNED_FLOOR,

// //     -- Previous locations (resolved names)
// //     NVL(D_P.RNAME,                  'N/A')              AS PREV_ROOM,
// //     NVL(BLD_P.BNAME,                'N/A')              AS PREV_BUILDING,
// //     NVL(FLR_P.FNAME,                'N/A')              AS PREV_FLOOR,
// //     NVL(P.PREV_CONDITION,           'N/A')              AS PREV_CONDITION,

// //     -- Expected locations from master (resolved names)
// //     NVL(D_MAST.RNAME,               'N/A')              AS EXPECTED_ROOM,
// //     NVL(BLD_M.BNAME,                'N/A')              AS EXPECTED_BUILDING,
// //     NVL(FLR_M.FNAME,                'N/A')              AS EXPECTED_FLOOR,

// //     -- Master status
// //     CASE
// //         WHEN MAST.ASSETID IS NULL                        THEN 'Ghost'
// //         WHEN NVL(T.CONDITION,'N/A')  = 'Damaged'        THEN 'Damaged'
// //         WHEN NVL(T.ROOM,-1) != NVL(MAST.ROOM,-1)       THEN 'Misplaced'
// //         ELSE                                                  'Available'
// //     END AS STATUS,

// //     -- Variance flags for React Native screen
// //     -- ROOM_CHANGED: 'New' = first scan, 'Yes' = changed, 'No' = same
// //     CASE
// //         WHEN P.ASSETID IS NULL                           THEN 'New'
// //         WHEN NVL(T.ROOM,-1) != NVL(P.PREV_ROOM,-1)     THEN 'Yes'
// //         ELSE                                                  'No'
// //     END AS ROOM_CHANGED,

// //     CASE
// //         WHEN P.ASSETID IS NULL                                          THEN 'New'
// //         WHEN NVL(T.BUILDING,-1) != NVL(P.PREV_BUILDING,-1)            THEN 'Yes'
// //         ELSE                                                                 'No'
// //     END AS BUILDING_CHANGED,

// //     CASE
// //         WHEN P.ASSETID IS NULL                                          THEN 'New'
// //         WHEN NVL(T.FLOORS,-1) != NVL(P.PREV_FLOORS,-1)                THEN 'Yes'
// //         ELSE                                                                 'No'
// //     END AS FLOOR_CHANGED,

// //     CASE
// //         WHEN P.ASSETID IS NULL                                               THEN 'New'
// //         WHEN NVL(T.CONDITION,'N/A') != NVL(P.PREV_CONDITION,'N/A')         THEN 'Yes'
// //         ELSE                                                                      'No'
// //     END AS CONDITION_CHANGED,

// //     -- Human readable change summary
// //     CASE
// //         WHEN P.ASSETID IS NULL
// //             THEN 'First Scan'
// //         WHEN NVL(T.ROOM,      -1) != NVL(P.PREV_ROOM,      -1)
// //           OR NVL(T.BUILDING,  -1) != NVL(P.PREV_BUILDING,  -1)
// //           OR NVL(T.FLOORS,    -1) != NVL(P.PREV_FLOORS,    -1)
// //           OR NVL(T.CONDITION,'N/A') != NVL(P.PREV_CONDITION,'N/A')
// //         THEN
// //             TRIM(',' FROM
// //                 CASE WHEN NVL(T.ROOM,-1) != NVL(P.PREV_ROOM,-1)
// //                      THEN 'Room:['         || NVL(D_P.RNAME,   'N/A')
// //                                            || ']->[' || NVL(D_T.RNAME,   'N/A') || ']'
// //                 END
// //              || CASE WHEN NVL(T.BUILDING,-1) != NVL(P.PREV_BUILDING,-1)
// //                      THEN ',Bldg:['        || NVL(BLD_P.BNAME, 'N/A')
// //                                            || ']->[' || NVL(BLD_T.BNAME, 'N/A') || ']'
// //                 END
// //              || CASE WHEN NVL(T.FLOORS,-1) != NVL(P.PREV_FLOORS,-1)
// //                      THEN ',Floor:['       || NVL(FLR_P.FNAME, 'N/A')
// //                                            || ']->[' || NVL(FLR_T.FNAME, 'N/A') || ']'
// //                 END
// //              || CASE WHEN NVL(T.CONDITION,'N/A') != NVL(P.PREV_CONDITION,'N/A')
// //                      THEN ',Cond:['        || NVL(P.PREV_CONDITION,'N/A')
// //                                            || ']->[' || NVL(T.CONDITION,  'N/A') || ']'
// //                 END
// //             )
// //         ELSE 'No Change'
// //     END AS CHANGE_SUMMARY

// // FROM TODAY_SCAN T

// // LEFT JOIN PREV_SCAN            P
// //     ON  P.ASSETID              = T.ASSETID
// //     AND P.COMPCODE             = T.COMPCODE

// // LEFT JOIN GTAD                 MAST
// //     ON  MAST.ASSETID           = T.ASSETID
// //     AND TO_CHAR(MAST.COMPCODE) = T.COMPCODE

// // LEFT JOIN ATSUBGRPMASTDET      C
// //     ON  C.ATSUBGRPMASTDETID    = T.SUBGRP

// // LEFT JOIN GTCOMPMAST           DIV
// //     ON  DIV.GTCOMPMASTID       = T.DIVISION

// // -- Today locations
// // LEFT JOIN GTRMASTDET           D_T   ON D_T.GTRMASTDETID   = T.ROOM
// // LEFT JOIN GTBMAST              BLD_T ON BLD_T.GTBMASTID    = T.BUILDING
// // LEFT JOIN GTFMASTDET           FLR_T ON FLR_T.GTFMASTDETID = T.FLOORS

// // -- Previous locations
// // LEFT JOIN GTRMASTDET           D_P   ON D_P.GTRMASTDETID   = P.PREV_ROOM
// // LEFT JOIN GTBMAST              BLD_P ON BLD_P.GTBMASTID    = P.PREV_BUILDING
// // LEFT JOIN GTFMASTDET           FLR_P ON FLR_P.GTFMASTDETID = P.PREV_FLOORS

// // -- Expected locations from master
// // LEFT JOIN GTRMASTDET           D_MAST ON D_MAST.GTRMASTDETID = MAST.ROOM
// // LEFT JOIN GTBMAST              BLD_M  ON BLD_M.GTBMASTID     = MAST.BUILDING
// // LEFT JOIN GTFMASTDET           FLR_M  ON FLR_M.GTFMASTDETID  = MAST.FLOORS

// // ORDER BY
// //     CASE
// //         WHEN NVL(T.ROOM,     -1) != NVL(P.PREV_ROOM,     -1)
// //           OR NVL(T.BUILDING, -1) != NVL(P.PREV_BUILDING, -1)
// //           OR NVL(T.FLOORS,   -1) != NVL(P.PREV_FLOORS,   -1)
// //           OR NVL(T.CONDITION,'N/A') != NVL(P.PREV_CONDITION,'N/A') THEN 1
// //         WHEN P.ASSETID IS NULL                                      THEN 2
// //         ELSE                                                             3
// //     END,
// //     CASE
// //         WHEN MAST.ASSETID IS NULL                                   THEN 1
// //         WHEN NVL(T.CONDITION,'N/A') = 'Damaged'                    THEN 2
// //         WHEN NVL(T.ROOM,-1) != NVL(MAST.ROOM,-1)                  THEN 3
// //         ELSE                                                             4
// //     END,
// //     T.ASSETID;
    
//     try {
//         // This query identifies variances: Available, Misplaced, Damaged, or Missing
//         const sql = `
//           WITH TODAY_SCAN AS (
//     SELECT
//         COMPCODE, DOCID, ASSETID, ABARID,
//         SUBGRP, MMADE, MMODEL,
//         ROOM, BUILDING, FLOORS, DIVISION,
//         CONDITION, LOC, REMARKS, AUDIT_DATE
//     FROM ASSETAUDIT
//     WHERE COMPCODE   = :COMPCODE
//       AND AUDIT_DATE >= TRUNC(SYSDATE)
//       AND AUDIT_DATE  < TRUNC(SYSDATE) + 1
// ),
// PREV_SCAN AS (
//     SELECT
//         COMPCODE, ASSETID,
//         ROOM       AS PREV_ROOM,
//         BUILDING   AS PREV_BUILDING,
//         FLOORS     AS PREV_FLOORS,
//         CONDITION  AS PREV_CONDITION,
//         AUDIT_DATE AS PREV_AUDIT_DATE
//     FROM (
//         SELECT
//             COMPCODE, ASSETID,
//             ROOM, BUILDING, FLOORS, CONDITION, AUDIT_DATE,
//             ROW_NUMBER() OVER (
//                 PARTITION BY ASSETID, COMPCODE
//                 ORDER BY AUDIT_DATE DESC
//             ) AS RN
//         FROM ASSETAUDIT
//         WHERE COMPCODE   = :COMPCODE
//           AND AUDIT_DATE < TRUNC(SYSDATE)
//     )
//     WHERE RN = 1
// )
// SELECT
//     T.ABARID,
//     T.ASSETID,
//     T.DOCID,
//     T.AUDIT_DATE                                        AS AUDIT_DATE,
//     P.PREV_AUDIT_DATE,

//     -- Asset details
//     NVL(T.MMADE,                    'N/A')              AS MMADE,
//     NVL(T.MMODEL,                   'N/A')              AS MMODEL,
//     NVL(C.SUBGRPNAME,               'N/A')              AS SUBGRPNAME,
//     NVL(DIV.COMPNAME,               'N/A')              AS DIVISION_NAME,
//     NVL(T.CONDITION,                'N/A')              AS CONDITION,
//     NVL(T.LOC,                      'N/A')              AS LOC,
//     NVL(TO_CHAR(T.REMARKS),         'N/A')              AS REMARKS,

//     -- Today locations (resolved names)
//     NVL(D_T.RNAME,                  'N/A')              AS SCANNED_ROOM,
//     NVL(BLD_T.BNAME,                'N/A')              AS SCANNED_BUILDING,
//     NVL(FLR_T.FNAME,                'N/A')              AS SCANNED_FLOOR,

//     -- Previous locations (resolved names)
//     NVL(D_P.RNAME,                  'N/A')              AS PREV_ROOM,
//     NVL(BLD_P.BNAME,                'N/A')              AS PREV_BUILDING,
//     NVL(FLR_P.FNAME,                'N/A')              AS PREV_FLOOR,
//     NVL(P.PREV_CONDITION,           'N/A')              AS PREV_CONDITION,

//     -- Expected locations from master (resolved names)
//     NVL(D_MAST.RNAME,               'N/A')              AS EXPECTED_ROOM,
//     NVL(BLD_M.BNAME,                'N/A')              AS EXPECTED_BUILDING,
//     NVL(FLR_M.FNAME,                'N/A')              AS EXPECTED_FLOOR,

//     -- Master status
//     CASE
//         WHEN MAST.ASSETID IS NULL                        THEN 'Ghost'
//         WHEN NVL(T.CONDITION,'N/A')  = 'Damaged'        THEN 'Damaged'
//         WHEN NVL(T.ROOM,-1) != NVL(MAST.ROOM,-1)       THEN 'Misplaced'
//         ELSE                                                  'Available'
//     END AS STATUS,

//     -- Variance flags for React Native screen
//     -- ROOM_CHANGED: 'New' = first scan, 'Yes' = changed, 'No' = same
//     CASE
//         WHEN P.ASSETID IS NULL                           THEN 'New'
//         WHEN NVL(T.ROOM,-1) != NVL(P.PREV_ROOM,-1)     THEN 'Yes'
//         ELSE                                                  'No'
//     END AS ROOM_CHANGED,

//     CASE
//         WHEN P.ASSETID IS NULL                                          THEN 'New'
//         WHEN NVL(T.BUILDING,-1) != NVL(P.PREV_BUILDING,-1)            THEN 'Yes'
//         ELSE                                                                 'No'
//     END AS BUILDING_CHANGED,

//     CASE
//         WHEN P.ASSETID IS NULL                                          THEN 'New'
//         WHEN NVL(T.FLOORS,-1) != NVL(P.PREV_FLOORS,-1)                THEN 'Yes'
//         ELSE                                                                 'No'
//     END AS FLOOR_CHANGED,

//     CASE
//         WHEN P.ASSETID IS NULL                                               THEN 'New'
//         WHEN NVL(T.CONDITION,'N/A') != NVL(P.PREV_CONDITION,'N/A')         THEN 'Yes'
//         ELSE                                                                      'No'
//     END AS CONDITION_CHANGED,

//     -- Human readable change summary
//     CASE
//         WHEN P.ASSETID IS NULL
//             THEN 'First Scan'
//         WHEN NVL(T.ROOM,      -1) != NVL(P.PREV_ROOM,      -1)
//           OR NVL(T.BUILDING,  -1) != NVL(P.PREV_BUILDING,  -1)
//           OR NVL(T.FLOORS,    -1) != NVL(P.PREV_FLOORS,    -1)
//           OR NVL(T.CONDITION,'N/A') != NVL(P.PREV_CONDITION,'N/A')
//         THEN
//             TRIM(',' FROM
//                 CASE WHEN NVL(T.ROOM,-1) != NVL(P.PREV_ROOM,-1)
//                      THEN 'Room:['         || NVL(D_P.RNAME,   'N/A')
//                                            || ']->[' || NVL(D_T.RNAME,   'N/A') || ']'
//                 END
//              || CASE WHEN NVL(T.BUILDING,-1) != NVL(P.PREV_BUILDING,-1)
//                      THEN ',Bldg:['        || NVL(BLD_P.BNAME, 'N/A')
//                                            || ']->[' || NVL(BLD_T.BNAME, 'N/A') || ']'
//                 END
//              || CASE WHEN NVL(T.FLOORS,-1) != NVL(P.PREV_FLOORS,-1)
//                      THEN ',Floor:['       || NVL(FLR_P.FNAME, 'N/A')
//                                            || ']->[' || NVL(FLR_T.FNAME, 'N/A') || ']'
//                 END
//              || CASE WHEN NVL(T.CONDITION,'N/A') != NVL(P.PREV_CONDITION,'N/A')
//                      THEN ',Cond:['        || NVL(P.PREV_CONDITION,'N/A')
//                                            || ']->[' || NVL(T.CONDITION,  'N/A') || ']'
//                 END
//             )
//         ELSE 'No Change'
//     END AS CHANGE_SUMMARY

// FROM TODAY_SCAN T

// LEFT JOIN PREV_SCAN            P
//     ON  P.ASSETID              = T.ASSETID
//     AND P.COMPCODE             = T.COMPCODE

// LEFT JOIN GTAD                 MAST
//     ON  MAST.ASSETID           = T.ASSETID
//     AND TO_CHAR(MAST.COMPCODE) = T.COMPCODE

// LEFT JOIN ATSUBGRPMASTDET      C
//     ON  C.ATSUBGRPMASTDETID    = T.SUBGRP

// LEFT JOIN GTCOMPMAST           DIV
//     ON  DIV.GTCOMPMASTID       = T.DIVISION

// -- Today locations
// LEFT JOIN GTRMASTDET           D_T   ON D_T.GTRMASTDETID   = T.ROOM
// LEFT JOIN GTBMAST              BLD_T ON BLD_T.GTBMASTID    = T.BUILDING
// LEFT JOIN GTFMASTDET           FLR_T ON FLR_T.GTFMASTDETID = T.FLOORS

// -- Previous locations
// LEFT JOIN GTRMASTDET           D_P   ON D_P.GTRMASTDETID   = P.PREV_ROOM
// LEFT JOIN GTBMAST              BLD_P ON BLD_P.GTBMASTID    = P.PREV_BUILDING
// LEFT JOIN GTFMASTDET           FLR_P ON FLR_P.GTFMASTDETID = P.PREV_FLOORS

// -- Expected locations from master
// LEFT JOIN GTRMASTDET           D_MAST ON D_MAST.GTRMASTDETID = MAST.ROOM
// LEFT JOIN GTBMAST              BLD_M  ON BLD_M.GTBMASTID     = MAST.BUILDING
// LEFT JOIN GTFMASTDET           FLR_M  ON FLR_M.GTFMASTDETID  = MAST.FLOORS

// ORDER BY
//     CASE
//         WHEN NVL(T.ROOM,     -1) != NVL(P.PREV_ROOM,     -1)
//           OR NVL(T.BUILDING, -1) != NVL(P.PREV_BUILDING, -1)
//           OR NVL(T.FLOORS,   -1) != NVL(P.PREV_FLOORS,   -1)
//           OR NVL(T.CONDITION,'N/A') != NVL(P.PREV_CONDITION,'N/A') THEN 1
//         WHEN P.ASSETID IS NULL                                      THEN 2
//         ELSE                                                             3
//     END,
//     CASE
//         WHEN MAST.ASSETID IS NULL                                   THEN 1
//         WHEN NVL(T.CONDITION,'N/A') = 'Damaged'                    THEN 2
//         WHEN NVL(T.ROOM,-1) != NVL(MAST.ROOM,-1)                  THEN 3
//         ELSE                                                             4
//     END,
//     T.ASSETID
//         `;


//         const oracleResult = await connection.execute(sql, { COMPCODE });

//         const transformedResult = oracleResult?.rows?.map(row => {
//             const keyValuePair = {};
//             oracleResult.metaData.forEach((col, index) => {
//                 keyValuePair[col.name] = row[index];
//             });
//             return keyValuePair;
//         });

//         return res.json({ 
//             statusCode: 1, 
//             message: 'Variance report generated successfully',
//             data: transformedResult 
//         });
//     }
//     catch (err) {
//         console.error('Error generating variance report:', err);
//         res.status(500).json({ 
//             statusCode: 0, 
//             error: 'Internal Server Error',
//             message: err.message 
//         });
//     }
//     finally {
//         await connection.close();
//     }
// }



export async function getAuditAssestDetails(req, res) {
    const connection = await getAssetConnection(res);
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();

    try {
        const sql = `
            SELECT 
                -- Identity fields (matches transform)
                A.ABARID,
                A.ASSETID,
                A.DOCID,
                
                -- Asset info (matches transform)
                NVL(A.MMADE, 'N/A') AS MMADE,
                NVL(A.MMODEL, 'N/A') AS MMODEL,
                NVL(A.CONDITION, 'N/A') AS CONDITION,
                NVL(A.LOC, 'N/A') AS LOC,
                NVL(TO_CHAR(A.REMARKS), 'N/A') AS REMARKS,
                
                -- Master lookups (matches transform)
                NVL(C.SUBGRPNAME, 'N/A') AS SUBGRPNAME,
                NVL(B.COMPNAME, 'N/A') AS DIVISION_NAME,
                
                -- Scanned locations (matches transform)
                NVL(D.RNAME, 'N/A') AS SCANNED_ROOM,
                NVL(F.BNAME, 'N/A') AS SCANNED_BUILDING,
                NVL(G.FNAME, 'N/A') AS SCANNED_FLOOR,
                
                -- Timestamps (matches transform)
                A.AUDIT_DATE,
                
                -- Status (matches transform - UI expects 'Available'/'Damaged'/'Misplaced'/'Ghost')
                CASE 
                    WHEN A.CONDITION = 'Damaged' THEN 'Damaged'
                    ELSE 'Available'
                END AS STATUS,
                
                -- Include IDs for reference (optional)
                A.ROOM AS ROOM_ID,
                A.BUILDING AS BUILDING_ID,
                A.FLOORS AS FLOOR_ID,
                A.DIVISION AS DIVISION_ID,
                A.MAINGRP AS MAINGRP_ID,
                A.SUBGRP AS SUBGRP_ID,
                A.COMPCODE
                
            FROM ASSETAUDIT A
            
            -- Division lookup
            LEFT JOIN GTCOMPMAST B 
                ON A.DIVISION = B.GTCOMPMASTID
                
            -- Subgroup lookup
            LEFT JOIN ATSUBGRPMASTDET C 
                ON C.ATSUBGRPMASTDETID = A.SUBGRP
                
            -- Room lookup
            LEFT JOIN GTRMASTDET D 
                ON D.GTRMASTDETID = A.ROOM
                
            -- Main group lookup (optional, not used in UI)
            LEFT JOIN ATMAINGRPMAST E 
                ON E.ATMAINGRPMASTID = A.MAINGRP
                
            -- Building lookup
            LEFT JOIN GTBMAST F 
                ON F.GTBMASTID = A.BUILDING
                
            -- Floor lookup
            LEFT JOIN GTFMASTDET G 
                ON G.GTFMASTDETID = A.FLOORS
                
            WHERE A.COMPCODE = :COMPCODE
              
            ORDER BY A.AUDIT_DATE DESC, A.ASSETID
        `;

        const oracleResult = await connection.execute(sql, { COMPCODE });

        const transformedResult = oracleResult?.rows?.map(row => {
            const keyValuePair = {};
            oracleResult.metaData.forEach((col, index) => {
                keyValuePair[col.name] = row[index];
            });
            return keyValuePair;
        });

        console.log(`getAuditAssestDetails: Found ${transformedResult?.length || 0} records for COMPCODE: ${COMPCODE}`);

        return res.json({
            statusCode: 1,
            message: 'Audit details retrieved successfully',
            data: transformedResult || []
        });
    }
    catch (err) {
        console.error('getAuditAssestDetails error:', err);
        res.status(500).json({
            statusCode: 0,
            error: 'Internal Server Error',
            message: err.message
        });
    }
    finally {
        if (connection) {
            try {
                await connection.close();
            } catch (closeErr) {
                console.error('Error closing connection:', closeErr);
            }
        }
    }
}



// ─── ROOM MASTER ───────────────────────────────────────────────
export async function getRoomMaster(req, res) {
    const connection = await getAssetConnection(res);
    const floorId = req?.query?.floorId || '';
    const divisionId = req?.query?.divisionId || '';
    console.log('getRoomMaster params:', { floorId, divisionId });

    try {
        const sql = `
            SELECT 
                AA.GTRMASTDETID AS ID, 
                AA.RNAME AS NAME, 
                AA.RCODE
            FROM GTROOMMAST A
            JOIN GTRMASTDET AA ON AA.GTROOMMASTID = A.GTROOMMASTID
            JOIN GTFMASTDET B ON B.GTFMASTDETID = A.FNAME
            JOIN GTCOMPMAST C ON C.GTCOMPMASTID = A.COMPCODE
            WHERE (A.ACTIVE='T' OR 0>0) 
              AND B.GTFMASTDETID = :floorId 
              AND C.GTCOMPMASTID = :divisionId
            ORDER BY AA.RNAME
        `;

        const oracleResult = await connection.execute(sql, { floorId, divisionId });

        const data = oracleResult?.rows?.map(row => {
            const obj = {};
            oracleResult.metaData.forEach((col, i) => {
                obj[col.name] = row[i];
            });
            return obj;
        });

        return res.json({
            statusCode: 1,
            message: 'Room master retrieved successfully',
            data: data || []
        });
    } catch (err) {
        console.error('getRoomMaster error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (e) { console.error(e); }
        }
    }
}


// ─── FLOOR MASTER ──────────────────────────────────────────────
export async function getFloorMaster(req, res) {
    const connection = await getAssetConnection(res);
    const buildingId = req?.query?.buildingId || '';
    const divisionId = req?.query?.divisionId || '';
    console.log('getFloorMaster params:', { buildingId, divisionId });

    try {
        const sql = `
            SELECT 
                C.GTFMASTDETID AS ID, 
                C.FNAME AS NAME, 
                C.FCODE
            FROM GTFLMAST B
            JOIN GTFMASTDET C ON B.GTFLMASTID=C.GTFLMASTID
            JOIN GTBMAST A ON A.GTBMASTID=B.BNAME
            JOIN GTCOMPMAST D ON B.COMPCODE=D.GTCOMPMASTID
            WHERE (A.ACTIVE='T' OR 0>0) 
              AND A.GTBMASTID = :buildingId 
              AND D.GTCOMPMASTID = :divisionId
            ORDER BY C.FNAME
        `;

        const oracleResult = await connection.execute(sql, { buildingId, divisionId });

        const data = oracleResult?.rows?.map(row => {
            const obj = {};
            oracleResult.metaData.forEach((col, i) => {
                obj[col.name] = row[i];
            });
            return obj;
        });

        return res.json({
            statusCode: 1,
            message: 'Floor master retrieved successfully',
            data: data || []
        });
    } catch (err) {
        console.error('getFloorMaster error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (e) { console.error(e); }
        }
    }
}


// ─── BUILDING MASTER ───────────────────────────────────────────
export async function getBuildingMaster(req, res) {
    const connection = await getAssetConnection(res);
    const COMPCODE = req?.query?.divisionId || '';

console.log("log",COMPCODE)
    try {
        const sql = `
            SELECT 
                GTBMASTID  AS ID,
                BNAME      AS NAME
            FROM GTBMAST
            WHERE COMPCODE=:COMPCODE
            ORDER BY BNAME
        `;

        const oracleResult = await connection.execute(sql, { COMPCODE });

        const data = oracleResult?.rows?.map(row => {
            const obj = {};
            oracleResult.metaData.forEach((col, i) => {
                obj[col.name] = row[i];
            });
            return obj;
        });

        return res.json({
            statusCode: 1,
            message: 'Building master retrieved successfully',
            data: data || []
        });
    } catch (err) {
        console.error('getBuildingMaster error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (e) { console.error(e); }
        }
    }
}


// ─── DIVISION MASTER ───────────────────────────────────────────
export async function getDivisionMaster(req, res) {
    const connection = await getAssetConnection(res);
   // const COMPCODE = String(req?.headers?.compcode || '').toUpperCase();

    try {
        const sql = `
            SELECT 
                GTCOMPMASTID  AS ID,
                COMPNAME      AS NAME,
                COMPCODE
            FROM GTCOMPMAST
            ORDER BY COMPNAME
        `;

        const oracleResult = await connection.execute(sql);

        const data = oracleResult?.rows?.map(row => {
            const obj = {};
            oracleResult.metaData.forEach((col, i) => {
                obj[col.name] = row[i];
            });
            return obj;
        });

        return res.json({
            statusCode: 1,
            message: 'Division master retrieved successfully',
            data: data || []
        });
    } catch (err) {
        console.error('getDivisionMaster error:', err);
        res.status(500).json({ statusCode: 0, error: 'Internal Server Error', message: err.message });
    } finally {
        if (connection) {
            try { await connection.close(); } catch (e) { console.error(e); }
        }
    }
}

export async function getAuditVarianceReport(req, res) {
    const connection = await getAssetConnection(res);
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();

    try {
        const sql = `
          WITH TODAY_SCAN AS (
    SELECT
        COMPCODE, 
        DOCID, 
        ASSETID, 
        ABARID,
        SUBGRP, 
        MMADE, 
        MMODEL,
        ROOM, 
        BUILDING, 
        FLOORS, 
        DIVISION, 
        MAINGRP,
        CONDITION, 
        LOC, 
        REMARKS, 
        AUDIT_DATE
    FROM ASSETAUDIT
    WHERE COMPCODE = :COMPCODE1
      AND AUDIT_DATE >= TRUNC(SYSDATE)
      AND AUDIT_DATE < TRUNC(SYSDATE) + 1
),
PREV_SCAN AS (
    SELECT
        COMPCODE, 
        ASSETID,
        ROOM AS PREV_ROOM,
        BUILDING AS PREV_BUILDING,
        FLOORS AS PREV_FLOORS,
        DIVISION AS PREV_DIVISION,
        MAINGRP AS PREV_MAINGRP,
        SUBGRP AS PREV_SUBGRP,
        CONDITION AS PREV_CONDITION,
        AUDIT_DATE AS PREV_AUDIT_DATE
    FROM (
        SELECT
            COMPCODE, 
            ASSETID,
            ROOM, 
            BUILDING, 
            FLOORS, 
            DIVISION, 
            MAINGRP, 
            SUBGRP,
            CONDITION, 
            AUDIT_DATE,
            ROW_NUMBER() OVER (
                PARTITION BY ASSETID, COMPCODE
                ORDER BY AUDIT_DATE DESC
            ) AS RN
        FROM ASSETAUDIT 
        WHERE COMPCODE = :COMPCODE2
          AND AUDIT_DATE < TRUNC(SYSDATE)
    )
    WHERE RN = 1
)
SELECT
    -- Identity (matches transform)
    T.ABARID,
    T.ASSETID,
    T.DOCID,
    
    -- Dates (matches transform)
    T.AUDIT_DATE,
    P.PREV_AUDIT_DATE,
    
    -- Asset info (matches transform)
    NVL(T.MMADE, 'N/A') AS MMADE,
    NVL(T.MMODEL, 'N/A') AS MMODEL,
    NVL(T.CONDITION, 'N/A') AS CONDITION,
    NVL(T.LOC, 'N/A') AS LOC,
    NVL(TO_CHAR(T.REMARKS), 'N/A') AS REMARKS,

    -- SubGroup and Division (for transform.subGroup, transform.division)
    NVL(SG.SUBGRPNAME, 'N/A') AS SUBGRPNAME,
    NVL(DIV.COMPNAME, 'N/A') AS DIVISION_NAME,

    -- TODAY'S SCAN locations (matches transform.scannedRoom/Building/Floor)
    NVL(RM_T.RNAME, 'N/A') AS SCANNED_ROOM,
    NVL(BLD_T.BNAME, 'N/A') AS SCANNED_BUILDING,
    NVL(FLR_T.FNAME, 'N/A') AS SCANNED_FLOOR,

    -- PREVIOUS SCAN locations (matches transform.prevRoom/Building/Floor/Condition)
    NVL(RM_P.RNAME, 'N/A') AS PREV_ROOM,
    NVL(BLD_P.BNAME, 'N/A') AS PREV_BUILDING,
    NVL(FLR_P.FNAME, 'N/A') AS PREV_FLOOR,
    NVL(P.PREV_CONDITION, 'N/A') AS PREV_CONDITION,

    -- EXPECTED locations from master (matches transform.expectedRoom/Building/Floor)
    NVL(RM_M.RNAME, 'N/A') AS EXPECTED_ROOM,
    NVL(BLD_M.BNAME, 'N/A') AS EXPECTED_BUILDING,
    NVL(FLR_M.FNAME, 'N/A') AS EXPECTED_FLOOR,

    -- Master status (matches transform.status)
    CASE
        WHEN MAST.ASSETID IS NULL THEN 'NEW'
        WHEN NVL(T.CONDITION, 'N/A') = 'Damaged' THEN 'Damaged'
        WHEN NVL(T.ROOM, -1) != NVL(MAST.ROOM, -1) THEN 'Misplaced'
        ELSE 'Available'
    END AS STATUS,

    -- Variance flags (matches transform.roomChanged/buildingChanged/etc)
    CASE
        WHEN P.ASSETID IS NULL THEN 'New'
        WHEN NVL(T.ROOM, -1) != NVL(P.PREV_ROOM, -1) THEN 'Yes'
        ELSE 'No'
    END AS ROOM_CHANGED,

    CASE
        WHEN P.ASSETID IS NULL THEN 'New'
        WHEN NVL(T.BUILDING, -1) != NVL(P.PREV_BUILDING, -1) THEN 'Yes'
        ELSE 'No'
    END AS BUILDING_CHANGED,

    CASE
        WHEN P.ASSETID IS NULL THEN 'New'
        WHEN NVL(T.FLOORS, -1) != NVL(P.PREV_FLOORS, -1) THEN 'Yes'
        ELSE 'No'
    END AS FLOOR_CHANGED,

    CASE
        WHEN P.ASSETID IS NULL THEN 'New'
        WHEN NVL(T.CONDITION, 'N/A') != NVL(P.PREV_CONDITION, 'N/A') THEN 'Yes'
        ELSE 'No'
    END AS CONDITION_CHANGED,

    -- Change summary (matches transform.changeSummary)
    CASE
        WHEN P.ASSETID IS NULL THEN 'First Scan'
        WHEN NVL(T.ROOM, -1) != NVL(P.PREV_ROOM, -1)
          OR NVL(T.BUILDING, -1) != NVL(P.PREV_BUILDING, -1)
          OR NVL(T.FLOORS, -1) != NVL(P.PREV_FLOORS, -1)
          OR NVL(T.CONDITION, 'N/A') != NVL(P.PREV_CONDITION, 'N/A')
        THEN 
            TRIM(',' FROM
                CASE WHEN NVL(T.ROOM, -1) != NVL(P.PREV_ROOM, -1)
                     THEN 'Room:[' || NVL(RM_P.RNAME, 'N/A') || '] -> [' || NVL(RM_T.RNAME, 'N/A') || ']' 
                     ELSE '' END
             || CASE WHEN NVL(T.BUILDING, -1) != NVL(P.PREV_BUILDING, -1)
                     THEN ', Building:[' || NVL(BLD_P.BNAME, 'N/A') || '] -> [' || NVL(BLD_T.BNAME, 'N/A') || ']' 
                     ELSE '' END
             || CASE WHEN NVL(T.FLOORS, -1) != NVL(P.PREV_FLOORS, -1)
                     THEN ', Floor:[' || NVL(FLR_P.FNAME, 'N/A') || '] -> [' || NVL(FLR_T.FNAME, 'N/A') || ']' 
                     ELSE '' END
             || CASE WHEN NVL(T.CONDITION, 'N/A') != NVL(P.PREV_CONDITION, 'N/A')
                     THEN ', Condition:[' || NVL(P.PREV_CONDITION, 'N/A') || '] -> [' || NVL(T.CONDITION, 'N/A') || ']' 
                     ELSE '' END
            )
        ELSE 'No Change'
    END AS CHANGE_SUMMARY,

    -- Room variance (matches transform.roomVariance)
    CASE
        WHEN MAST.ASSETID IS NOT NULL 
             AND NVL(T.ROOM, -1) != NVL(MAST.ROOM, -1)
        THEN 'Expected [' || NVL(RM_M.RNAME, 'N/A')
          || '] Found [' || NVL(RM_T.RNAME, 'N/A') || ']'
    END AS ROOM_VARIANCE

FROM TODAY_SCAN T

-- Previous scan
LEFT JOIN PREV_SCAN P
    ON P.ASSETID = T.ASSETID
    AND P.COMPCODE = T.COMPCODE

-- Master asset
LEFT JOIN GTAD MAST
    ON MAST.ASSETID = T.ASSETID
    AND TO_CHAR(MAST.COMPCODE) = T.COMPCODE

-- Today's lookup tables
LEFT JOIN GTRMASTDET RM_T ON RM_T.GTRMASTDETID = T.ROOM
LEFT JOIN GTBMAST BLD_T ON BLD_T.GTBMASTID = T.BUILDING
LEFT JOIN GTFMASTDET FLR_T ON FLR_T.GTFMASTDETID = T.FLOORS
LEFT JOIN GTCOMPMAST DIV ON DIV.GTCOMPMASTID = T.DIVISION
LEFT JOIN ATSUBGRPMASTDET SG ON SG.ATSUBGRPMASTDETID = T.SUBGRP
LEFT JOIN ATMAINGRPMAST MG ON MG.ATMAINGRPMASTID = T.MAINGRP

-- Previous lookup tables
LEFT JOIN GTRMASTDET RM_P ON RM_P.GTRMASTDETID = P.PREV_ROOM
LEFT JOIN GTBMAST BLD_P ON BLD_P.GTBMASTID = P.PREV_BUILDING
LEFT JOIN GTFMASTDET FLR_P ON FLR_P.GTFMASTDETID = P.PREV_FLOORS

-- Master lookup tables
LEFT JOIN GTRMASTDET RM_M ON RM_M.GTRMASTDETID = MAST.ROOM
LEFT JOIN GTBMAST BLD_M ON BLD_M.GTBMASTID = MAST.BUILDING
LEFT JOIN GTFMASTDET FLR_M ON FLR_M.GTFMASTDETID = MAST.FLOORS

WHERE T.COMPCODE = :COMPCODE1

ORDER BY
    CASE
        WHEN NVL(T.ROOM, -1) != NVL(P.PREV_ROOM, -1)
          OR NVL(T.BUILDING, -1) != NVL(P.PREV_BUILDING, -1)
          OR NVL(T.FLOORS, -1) != NVL(P.PREV_FLOORS, -1)
          OR NVL(T.CONDITION, 'N/A') != NVL(P.PREV_CONDITION, 'N/A') THEN 1
        WHEN P.ASSETID IS NULL THEN 2
        ELSE 3
    END,
    T.ASSETID
        `;

        console.log('Executing SQL with params:', { COMPCODE1: COMPCODE, COMPCODE2: COMPCODE });
        
        const oracleResult = await connection.execute(sql, {
            COMPCODE1: COMPCODE,
            COMPCODE2: COMPCODE
        });

        const transformedResult = oracleResult?.rows?.map(row => {
            const keyValuePair = {};
            oracleResult.metaData.forEach((col, index) => {
                keyValuePair[col.name] = row[index];
            });
            return keyValuePair;
        });

        // Log first few rows for debugging
        if (transformedResult && transformedResult.length > 0) {
            console.log('First row sample:', {
                ASSETID: transformedResult[0].ASSETID,
                HAS_PREV_SCAN: transformedResult[0].HAS_PREV_SCAN,
                PREV_ROOM_ID_RAW: transformedResult[0].PREV_ROOM_ID_RAW,
                PREV_ROOM_NAME_RAW: transformedResult[0].PREV_ROOM_NAME_RAW,
                PREV_ROOM: transformedResult[0].PREV_ROOM,
                PREV_BUILDING_ID_RAW: transformedResult[0].PREV_BUILDING_ID_RAW,
                PREV_BUILDING: transformedResult[0].PREV_BUILDING,
                ROOM_CHANGED: transformedResult[0].ROOM_CHANGED
            });
        }

        return res.json({
            statusCode: 1,
            message: 'Variance report generated successfully',
            data: transformedResult || []
        });
    }
    catch (err) {
        console.error('getAuditVarianceReport error:', err);
        res.status(500).json({
            statusCode: 0,
            error: 'Internal Server Error',
            message: err.message
        });
    }
    finally {
        await connection.close();
    }
}


export async function SaveBarcodeDetails(req, res) {
    const connection = await getAssetConnection(res);
    const COMPCODE = String(req?.headers?.compcode).toUpperCase();
    
    try {
        const {
            DOCID, ASSETID, SUBGRP, MMADE, MMODEL, 
            REMARKS, ROOM, MAINGRP, BUILDING, FLOORS, ABARID, DIVISION, LOC, CONDITION, AUDIT_DATE
        } = req?.body;

        // First check if this barcode was already scanned today
        const checkSql = `
            SELECT COUNT(*) as scan_count 
            FROM ASSETAUDIT 
            WHERE COMPCODE = :COMPCODE 
            AND ASSETID = :ASSETID 
            AND TRUNC(AUDIT_DATE) = TRUNC(SYSDATE)
        `;

        const checkResult = await connection.execute(checkSql, {
            COMPCODE: COMPCODE,
            ASSETID: ASSETID
        });

        const scanCount = checkResult.rows[0][0];

        if (scanCount > 0) {
            return res.json({ 
                statusCode: 0, 
                message: 'This barcode has already been scanned today. Only one scan per day is allowed.' 
            });
        }

        // If not scanned today, proceed with insertion
        const insertSql = `
            INSERT INTO ASSETAUDIT (
                COMPCODE, DOCID, ASSETID, SUBGRP, MMADE, MMODEL, 
                REMARKS, ROOM, MAINGRP, BUILDING, FLOORS, ABARID, 
                DIVISION, LOC, CONDITION, AUDIT_DATE, CREATED_DATE
            ) VALUES (
                :COMPCODE, :DOCID, :ASSETID, :SUBGRP, :MMADE, :MMODEL, 
                :REMARKS, :ROOM, :MAINGRP, :BUILDING, :FLOORS, :ABARID, 
                :DIVISION, :LOC, :CONDITION, SYSDATE, SYSDATE
            )
        `;

        const oracleResult = await connection.execute(insertSql, {
            COMPCODE: COMPCODE, 
            DOCID, 
            ASSETID, 
            SUBGRP, 
            MMADE, 
            MMODEL, 
            REMARKS, 
            ROOM, 
            MAINGRP, 
            BUILDING, 
            FLOORS, 
            ABARID, 
            DIVISION, 
            LOC,
            CONDITION
        });

        if (oracleResult?.rowsAffected > 0) {
            return res.json({ 
                statusCode: 1, 
                message: 'Barcode scanned successfully',
                data: oracleResult 
            });
        } else {
            return res.json({ 
                statusCode: 0, 
                message: 'Failed to save barcode details',
                data: {} 
            });
        }
    }
    catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ 
            statusCode: 0, 
            error: 'Internal Server Error',
            message: err.message 
        });
    }
    finally {
        await connection.commit();
        await connection.close();
    }
}




export async function chat(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const chat_data=req?.body
    

   var chat_=await prisma_Connector?.chat?.create({
        data:{...chat_data,COMPCODE}
    })

    if(chat_?.id){
        res?.json({status:1,data:chat_})
    }else{
         res?.json({status:0,data:{}})
    }

    




}




export async function get_chat(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const DEPARTMENT=req?.query?.DEPARTMENT
    

   var chat_=await prisma_Connector?.chat?.findMany({
    where:{
        COMPCODE,groupId:DEPARTMENT
    },
    include:{userdata:true}
   })

    if(chat_){
        res?.json({status:1,data:chat_})
    }else{
         res?.json({status:0,data:{}})
    }

    




}

  
export async function delete_Common_Data(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const onlywhere=req?.body?.onlywhere
    const where=req?.body?.where
    const table=req?.body?.table
        try {
            const result=await  prisma_Connector?.[table]?.delete({where:onlywhere ?{...where} : {COMPCODE,...where}})
            res.json({status:1,data:result}) 
        }
        catch (err) {
          res.json({status:0,data:{}}) 
           console.log(err);
           
        }
}


export async function Update_Common_Data_prisma(req, res) {
    const COMPCODE=String(req?.headers?.compcode).toUpperCase()
    const where=req?.body?.where
    const onlywhere=req?.body?.onlywhere
    const table=req?.body?.table
    const data=req?.body?.data
    const Comp_data=req?.body?.data?.Compcodes
    const user_updation=req?.body?.data?.user_updation
    

      if(data?.password){

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data?.password, saltRounds);
        data.password=hashedPassword

        }


        if(Comp_data &&  user_updation){
 
         const delete_succesued= await  prisma_Connector?.companyCode?.deleteMany({where:{Idcard:data?.Idcard,GCOMP:COMPCODE}})
           if(delete_succesued?.count>0 || delete_succesued?.count==0){
              try {
             const {GCOMP,user_updation,Compcodes,...reset}=data
              const result=await  prisma_Connector?.[table]?.update({data:{...reset,Companies:{create:Comp_data}},where:onlywhere ? {...where} : {COMPCODE,...where}})
              res.json({status:1,data:result}) 
               
            }


            catch (err) {
          res.json({status:0,data:{}}) 
           console.log(err);
           
            }

        }



        }else{

       

        try {
            const result=await  prisma_Connector?.[table]?.update({data,where:onlywhere ? {...where} : {COMPCODE,...where}})

            res.json({status:1,data:result}) 
        }


        catch (err) {
          res.json({status:0,data:{}}) 
           console.log(err);
           
        }

         }
}

