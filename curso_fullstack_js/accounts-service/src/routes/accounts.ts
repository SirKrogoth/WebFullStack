import { Router } from "express";
import account from '../controllers/accounts';
import { validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth } from "./middleware";
import calc from 'ms-commons/calc';

const router = Router();

router.get('/accounts/', validateAuth, account.getAccounts);
router.get('/accounts/:id', validateAuth, account.getAccount);
router.patch('/accounts/:id', validateAuth, validateUpdateAccountSchema, account.setAccount);
router.post('/accounts/', validateAccountSchema, account.addAccount);
router.post('/accounts/login', validateLoginSchema, account.loginAccount);
router.post('/accounts/logout', account.logoutAccount);

router.get('/somar/:val1/:val2', (req, res, next) => {
    const val1 = parseInt(req.params.val1);
    const val2 = parseInt(req.params.val2);

    const resultado = calc(val1, val2);

    res.json({resultado});
})

export default router;