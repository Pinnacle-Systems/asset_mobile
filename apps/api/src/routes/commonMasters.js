// ============================================================
// Asset Audit Backend - commonMasters.js (route)
// Only routes used by the Asset Mobile app are kept here.
// ============================================================

import { Router } from 'express';
import {
    getBarcodeDetails,
    getAuditAssestDetails,
    getAuditVarianceReport,
    SaveBarcodeDetails,
    getRoomMaster,
    getFloorMaster,
    getBuildingMaster,
    getDivisionMaster,
    delete_Common_Data,
    Update_Common_Data_prisma
} from '../services/commonMasters.service.js';

const router = Router();

// Asset scan & audit data
router.get('/getBarcodeDetails', getBarcodeDetails);
router.get('/getAuditAssestDetails', getAuditAssestDetails);
router.get('/getAuditVarianceReport', getAuditVarianceReport);
router.post('/SaveBarcodeDetails', SaveBarcodeDetails);

// Location masters (for scan form dropdowns)
router.get('/master/rooms', getRoomMaster);
router.get('/master/floors', getFloorMaster);
router.get('/master/buildings', getBuildingMaster);
router.get('/master/divisions', getDivisionMaster);

// Generic Prisma CRUD (used by Role Master screen)
router.post('/delete', delete_Common_Data);
router.post('/update', Update_Common_Data_prisma);

export default router;