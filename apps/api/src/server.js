import 'dotenv/config';
import { logger } from "./utils/logger.js";
import createApp from "./app.js";
import { env } from "./config/env.js";
import oracledb from 'oracledb';

// ─── Oracle DB connection check on startup ───────────────────
async function checkOracleDB(label, config) {
    let conn;
    try {
        conn = await oracledb.getConnection(config);
        const result = await conn.execute('SELECT 1 FROM DUAL');
        if (result.rows[0][0] === 1) {
            console.log(`\x1b[32m✔ Oracle [${label}] connected successfully → ${config.connectString}\x1b[0m`);
        }
    } catch (err) {
        console.error(`\x1b[31m✘ Oracle [${label}] connection FAILED → ${config.connectString}\x1b[0m`);
        console.error(`  Reason: ${err.message}`);
    } finally {
        if (conn) await conn.close().catch(() => { });
    }
}

async function checkAllDBConnections() {
    console.log('\n\x1b[36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m');
    console.log('\x1b[36m  Asset Audit API — Database Health Check  \x1b[0m');
    console.log('\x1b[36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m');

    // Oracle Thick mode init (if path set)
    if (env.ORACLE_CLIENT_PATH) {
        try {
            oracledb.initOracleClient({ libDir: env.ORACLE_CLIENT_PATH });
            console.log(`\x1b[33m  Oracle Thick mode: ${env.ORACLE_CLIENT_PATH}\x1b[0m`);
        } catch (e) {
            // NJS-077 = already initialized (safe to ignore on hot-reload)
            if (!e.message?.includes('NJS-077')) {
                console.error(`\x1b[31m  ✘ Oracle Thick mode init FAILED: ${e.message}\x1b[0m`);
                console.error(`  Check that ORACLE_CLIENT_PATH is correct: ${env.ORACLE_CLIENT_PATH}`);
            }
        }
    } else {
        console.log('\x1b[33m  Oracle Thin mode (no local client needed)\x1b[0m');
        console.log('\x1b[33m  ⚠  If connecting to Oracle 11g or older, set ORACLE_CLIENT_PATH in .env\x1b[0m');
    }

    const payrollConfig = {
        user: env.ORACLE_PAYROLL_USER,
        password: env.ORACLE_PAYROLL_PASSWORD,
        connectString: env.ORACLE_PAYROLL_CONNECT_STRING,
    };
    const assetConfig = {
        user: env.ORACLE_ASSET_USER,
        password: env.ORACLE_ASSET_PASSWORD,
        connectString: env.ORACLE_ASSET_CONNECT_STRING,
    };

    await Promise.all([
        checkOracleDB('Payroll / User', payrollConfig),
        checkOracleDB('Asset Audit', assetConfig),
    ]);

    console.log('\x1b[36m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m\n');
}

// ─── Start server ────────────────────────────────────────────
const app = createApp();
const server = app.listen(env.PORT, async () => {
    logger.info("API server started", { port: env.PORT, environment: env.NODE_ENV });
    console.log(`\x1b[32m🚀 Server running at http://localhost:${env.PORT}\x1b[0m`);
    await checkAllDBConnections();
});

server.on("error", (error) => {
    logger.error("API server failed to start", { error, port: env.PORT });
});

process.on("SIGTERM", () => {
    server.close(() => {
        logger.info("API server stopped");
        process.exit(0);
    });
});

export default server;
