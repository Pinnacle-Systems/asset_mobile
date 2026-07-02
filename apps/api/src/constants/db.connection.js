// ============================================================
// db.connection.js — Oracle DB connection for Asset Audit API
// All credentials are loaded from .env file.
// ============================================================

import 'dotenv/config';
import oracledb from 'oracledb';

// Use Thick mode only if ORACLE_CLIENT_PATH is set in .env
// (Required for older Oracle DB servers. Remove if using Thin mode.)
if (process.env.ORACLE_CLIENT_PATH) {
    try {
        oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_PATH });
    } catch (e) {
        // Already initialized or Thin mode in use — safe to ignore
    }
}

// ─── Payroll / User Oracle DB ────────────────────────────────
const dbConfig = {
    user:          process.env.ORACLE_USER   ,
    password:      process.env.ORACLE_PASSWORD   ,
    connectString: process.env.ORACLE_CONNECT_STRING ,
};

// ─── Asset Oracle DB ─────────────────────────────────────────
const dbASSET_Config = {
    user:          process.env.ORACLE_ASSET_USER ,
    password:      process.env.ORACLE_ASSET_PASSWORD,
    connectString: process.env.ORACLE_ASSET_CONNECT_STRING,
};

// ─── Connection helpers ──────────────────────────────────────
export async function getConnection(res) {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        return connection;
    } catch (err) {
        console.error('Oracle (Payroll) connection failed:', err.message);
        return res.json({ statusCode: 1, message: 'Database Connection Failed' });
    }
}

export async function getAssetConnection(res) {
    try {
        const connection = await oracledb.getConnection(dbASSET_Config);
        return connection;
    } catch (err) {
        console.error('Oracle (Asset) connection failed:', err.message);
        return res.json({ statusCode: 1, message: 'Database Connection Failed' });
    }
}
