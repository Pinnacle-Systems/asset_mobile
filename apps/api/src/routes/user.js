// ============================================================
// Asset Audit Backend - user.js (route)
// Only routes actually used by the Asset Mobile screens.
// ============================================================

import { Router } from 'express';
import {
    login,
    create,
    get,
    getOne,
    getUserDet,
    getDesignation,
    getRolesOnPage,
    createRoleOnPage,
    getUserDetails,
    UpdateRoleOnPage,
    getCompanyCode,
    getEmployeeIds,
    update_fcm,
    send_Otp,
    verify_Otp_and_change_pass,
    getUserRolesOnPage,
    getCreatedRolesOnPage,
    Change_Settings,
    get_Change_Settings,
} from '../services/user.service.js';

const router = Router();

// ─── Auth ──────────────────────────────────────────────────
router.post('/login', login);                           // Login screen
router.post('/send_Otp', send_Otp);                     // Forgot password OTP
router.post('/change_password', verify_Otp_and_change_pass); // Reset password

// ─── User CRUD ─────────────────────────────────────────────
router.post('/', create);                               // Create user
router.get('/', get);                                   // All users (UserCreation.js)
router.get('/getUserDet', getUserDet);                  // Logged-in user detail
router.get('/userDetails', getOne);                     // Single user details
router.get('/getUserBasicDetails', getUserDetails);     // Basic user details

// ─── Role On Page ──────────────────────────────────────────
router.get('/getRolesOnPage', getRolesOnPage);          // Get pages for a role
router.get('/getUserRolesOnPage', getUserRolesOnPage);  // Get user's role pages
router.get('/getCreatedRolesOnPage', getCreatedRolesOnPage); // All role-page assignments
router.post('/createRoleOnPage', createRoleOnPage);    // Assign pages to role
router.post('/UpdateRoleOnPage', UpdateRoleOnPage);    // Update role-page assignment

// ─── Lookups ───────────────────────────────────────────────
router.get('/getCompanyCode', getCompanyCode);          // Company codes (Navbar, Form)
router.get('/getEmployeeIds', getEmployeeIds);          // Employee IDs (Form)
router.get('/getDesignation', getDesignation);          // Designations (Form)

// ─── Settings & FCM ────────────────────────────────────────
router.post('/update_fcm', update_fcm);                 // Update FCM token (Login)
router.post('/Change_Settings', Change_Settings);       // Save settings (Splash)
router.get('/get_Change_Settings', get_Change_Settings); // Get settings (Splash)

export default router;