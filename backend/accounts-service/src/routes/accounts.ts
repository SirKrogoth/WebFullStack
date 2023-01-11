import { Router } from "express";
import account from '../controllers/accounts';
import { validateAuthorization ,validateAccountSchema, validateLoginSchema, validateUpdateAccountSchema, validateAuth } from "./middleware";
import calc from 'ms-commons/calc';

const router = Router();

router.get('/accounts/', validateAuth, account.getAccounts);
router.get('/accounts/:id', validateAuth, validateAuthorization, account.getAccount);
router.patch('/accounts/:id', validateAuth, validateAuthorization, validateUpdateAccountSchema, account.setAccount);
router.post('/accounts/', validateAccountSchema, account.addAccount);
router.post('/accounts/login', validateLoginSchema, account.loginAccount);
router.post('/accounts/logout', validateAuth, account.logoutAccount);
router.delete('/accounts/:id', validateAuth, validateAuthorization, account.deleteAccount);

router.get('/somar/:val1/:val2', (req, res, next) => {
    const val1 = parseInt(req.params.val1);
    const val2 = parseInt(req.params.val2);

    const resultado = calc(val1, val2);

    res.json({resultado});
})

export default router;