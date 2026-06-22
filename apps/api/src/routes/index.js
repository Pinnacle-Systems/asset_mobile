// ============================================================
// Asset Audit Backend - routes/index.js
// Only mounts routes required by the Asset Mobile app.
// ============================================================

import { Router } from 'express';
import { getConnection } from '../constants/db.connection.js';

import commonMast from './commonMasters.js';
import user from './user.js';
import Role from './RoleOnPage.js';

const router = Router();

// Health check
router.get('/health', (req, res) => res.json({ status: 'ok', service: 'asset-audit-api' }));

router.use('/commonMast', commonMast); // Asset audit, barcode, masters
router.use('/users', user);           // Login, user CRUD, role-on-page
router.use('/role', Role);            // Role master CRUD

export default router;