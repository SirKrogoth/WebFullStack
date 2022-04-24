import { Router, Request, Response } from "express";
import account from '../controllers/accounts';

const router = Router();

router.get('/accounts/', account.getAccounts);
router.get('/accounts/:id', account.getAccount);
router.post('/accounts/', account.addAccount);


export default router;