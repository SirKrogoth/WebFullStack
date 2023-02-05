import express, {Router} from 'express';
import helmet from 'helmet';
import cors from 'cors';


export default (Router: Router) => {
    const app = express();
    app.use(helmet());
    app.use(cors());
    //Pega o corpo da requisição e transforma em json
    app.use(express.json());
    app.use(Router);
    
    return app;
}