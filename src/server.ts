import mongoose from 'mongoose';
import { config } from './app/config';
import app from './app';

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        app.listen(config.port, () => {
            console.log(`assignment three server running ${config.port}`);
        });
    } catch (err) {
        console.log(err);
    }
}

main();
