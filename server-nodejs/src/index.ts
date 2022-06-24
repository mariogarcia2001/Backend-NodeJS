import express from "express";
import { PORT } from "./config";
import { connectToMongoDB } from "./database";
import { router } from "./router";

async function main() {
    await connectToMongoDB();
    const server = express();
    server.use(express.json());
    router(server);

    //Start server
    server.listen(PORT, () => {
        console.log('The application is listening on port ' + PORT);
    });
}

main();