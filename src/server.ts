import app from './app';

const start = async () => {
    const PORT = 5000;
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