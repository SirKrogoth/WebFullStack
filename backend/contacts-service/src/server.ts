import app from './app';
import database from 'ms-commons/data/db';

(async () => {
    try {
        const port = parseInt(`${process.env.PORT}`);

        await database.sync();
        console.log(`Database is running in ${process.env.DB_NAME}`);

        await app.listen(port, () => {
            console.log(`Running on port ${port}`);
        })    
    } catch (error) {
        console.log(`Erro ao conectar na base de dados. Message: ${error}`);
    }    
})();