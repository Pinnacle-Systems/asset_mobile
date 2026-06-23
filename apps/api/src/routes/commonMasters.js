import { Router } from 'express';

import { delete_Common_Data, getAuditAssestDetails, getAuditVarianceReport, getBarcodeDetails, getBuildingMaster, getDivisionMaster, getFloorMaster, getRoomMaster, SaveBarcodeDetails, Update_Common_Data_prisma } from '../services/commonMasters.service.js';

const router = Router();
router.post('/update',Update_Common_Data_prisma)
router?.post("/SaveBarcodeDetails",SaveBarcodeDetails)
router.post('/delete',delete_Common_Data)
router.get("/getBarcodeDetails",getBarcodeDetails)
router?.get("/getAuditAssestDetails",getAuditAssestDetails)
router?.get("/getAuditVarianceReport",getAuditVarianceReport)

router.get('/master/rooms',     getRoomMaster);
router.get('/master/floors',    getFloorMaster);
router.get('/master/buildings', getBuildingMaster);
router.get('/master/divisions', getDivisionMaster);


export default router;