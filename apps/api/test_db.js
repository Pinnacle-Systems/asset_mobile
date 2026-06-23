import 'dotenv/config';
import { getAssetConnection } from './src/constants/db.connection.js';

async function test() {
    let conn;
    try {
        conn = await getAssetConnection();
        const sql = `
            SELECT 
                C.GTFMASTDETID AS ID, 
                C.FNAME AS NAME, 
                C.FCODE
            FROM GTFLMAST B
            JOIN GTFMASTDET C ON B.GTFLMASTID=C.GTFLMASTID
            JOIN GTBMAST A ON A.GTBMASTID=B.BNAME
            JOIN GTCOMPMAST D ON A.COMPCODE=D.GTCOMPMASTID
            WHERE (A.ACTIVE='T' OR 0>0) 
              AND A.GTBMASTID = '1' 
        `;
        const res = await conn.execute(sql);
        console.log("Result:", res.rows.length);
    } catch (e) {
        console.error(e.message);
    } finally {
        if (conn) await conn.close();
    }
}
test();
