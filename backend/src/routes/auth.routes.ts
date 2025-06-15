import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/commonFunctions';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));



export default router; 