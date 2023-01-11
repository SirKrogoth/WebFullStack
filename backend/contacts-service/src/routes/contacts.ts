import {Router} from 'express';
import contactsController from '../controllers/contactsController';
import { validateContactSchema, validateUpdateContactSchema, validateAuth } from './middlewares';

const router = Router();

//Verbo HTTP GET
router.get('/contacts/', validateAuth, contactsController.getContacts);
router.get('/contacts/:id', validateAuth, contactsController.getContact);
//Verbo HTTP POST
router.post('/contacts/', validateAuth, validateContactSchema, contactsController.addContact);
//Verbo HTTP PATCH
router.patch('/contacts/:id', validateAuth, validateUpdateContactSchema, contactsController.setContact);

export default router;