import { Router, Request, Response } from "express";
import account from '../controllers/accounts';
import { validateAccount, validateLogin } from "./middleware";

const router = Router();

router.get('/accounts/', account.getAccounts);
router.get('/accounts/:id', account.getAccount);
router.post('/accounts/', validateAccount, account.addAccount);
router.post('/accounts/login', validateLogin, account.loginAccount);
router.post('/accounts/logout', account.logoutAccount);
router.patch('/accounts/:id', validateAccount, account.setAccount);


export default router;