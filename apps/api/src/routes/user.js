// ============================================================
// Asset Audit Backend - user.js (route)
// Only routes actually used by the Asset Mobile screens.
// ============================================================

import { Router } from 'express';
import {
    login,
    create,
    get,
    getUserDet,
    getRolesOnPage,
    createRoleOnPage,
    UpdateRoleOnPage,
    getCompanyCode,
    getEmployeeIds,
    update_fcm,
    getUserRolesOnPage,
    getCreatedRolesOnPage,
    get_Change_Settings,
} from '../services/user.service.js';

const router = Router();

// ─── Auth ──────────────────────────────────────────────────
router.post('/login', login);                           // Login screen

// ─── User CRUD ─────────────────────────────────────────────
router.post('/', create);                               // Create user
router.get('/', get);                                   // All users (UserCreation.js)
router.get('/getUserDet', getUserDet);                  // Logged-in user detail

// ─── Role On Page ──────────────────────────────────────────
router.get('/getRolesOnPage', getRolesOnPage);          // Get pages for a role
router.get('/getUserRolesOnPage', getUserRolesOnPage);  // Get user's role pages
router.get('/getCreatedRolesOnPage', getCreatedRolesOnPage); // All role-page assignments
router.post('/createRoleOnPage', createRoleOnPage);    // Assign pages to role
router.post('/UpdateRoleOnPage', UpdateRoleOnPage);    // Update role-page assignment

// ─── Lookups ───────────────────────────────────────────────
router.get('/getCompanyCode', getCompanyCode);          // Company codes (Navbar, Form)
router.get('/getEmployeeIds', getEmployeeIds);          // Employee IDs (Form)

// ─── Settings & FCM ────────────────────────────────────────
router.post('/update_fcm', update_fcm);                 // Update FCM token (Login)
router.get('/get_Change_Settings', get_Change_Settings); // Get settings (Splash)

export default router;