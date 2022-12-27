import { Router } from "express";
import account from '../controllers/accounts';
import { validateAccount, validateLogin, validateUpdateAccount, validateAuth } from "./middleware";

const router = Router();

router.get('/accounts/', validateAuth, account.getAccounts);
router.get('/accounts/:id', validateAuth, account.getAccount);
router.patch('/accounts/:id', validateAuth, validateUpdateAccount, account.setAccount);
router.post('/accounts/', validateAccount, account.addAccount);
router.post('/accounts/login', validateLogin, account.loginAccount);
router.post('/accounts/logout', validateAuth, account.logoutAccount);

export default router;