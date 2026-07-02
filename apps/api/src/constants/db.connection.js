// ============================================================
// db.connection.js — Oracle DB connection for Asset Audit API
// All credentials are loaded from .env file.
// ============================================================

import 'dotenv/config';
import oracledb from 'oracledb';
import { env } from '../config/env.js';

// Use Thick mode only if ORACLE_CLIENT_PATH is set in .env
// (Required for older Oracle DB servers. Remove if using Thin mode.)
if (env.ORACLE_CLIENT_PATH) {
    try {
        oracledb.initOracleClient({ libDir: env.ORACLE_CLIENT_PATH });
    } catch (e) {
        // Already initialized or Thin mode in use — safe to ignore
    }
}

// ─── Payroll / User Oracle DB ────────────────────────────────
const dbConfig = {
    user: env.ORACLE_PAYROLL_USER,
    password: env.ORACLE_PAYROLL_PASSWORD,
    connectString: env.ORACLE_PAYROLL_CONNECT_STRING,
};

// ─── Asset Oracle DB ─────────────────────────────────────────
const dbASSET_Config = {
    user: env.ORACLE_ASSET_USER,
    password: env.ORACLE_ASSET_PASSWORD,
    connectString: env.ORACLE_ASSET_CONNECT_STRING,
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
