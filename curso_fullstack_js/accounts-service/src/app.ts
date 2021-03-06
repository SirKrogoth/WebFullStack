import express from 'express';
import helmet from 'helmet';
import accountsRouter from './routes/accounts';

const app = express();
app.use(helmet());
//Pega o corpo da requisição e transforma em json
app.use(express.json());
app.use(accountsRouter);

export default app;