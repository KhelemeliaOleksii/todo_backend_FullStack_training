import app from './app';
import setEnvVars from './config/setEnvVars';

setEnvVars();

const start = async () => {
    const {PORT = 3000} = process.env;
    
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error:any) {
        process.exit(1);
    }
}

(async () => {
    await start();
})();