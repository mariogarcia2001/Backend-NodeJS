import { connect,connection } from "mongoose";
import { MONGODB_URI } from "./config";

export async function connectToMongoDB() {
    try{
        await connect(MONGODB_URI);
    }catch(error){
        console.log("Error:", error);
    }
}   

connection.on("connected",()=>{
    console.log("Mongo DB Start OK:", connection.db.databaseName);
});

connection.on("error",(error)=>{
    console.error("Mongo DB Error", error);
});

connection.on("disconnected",()=>{
    console.error("Mongo DB disconnected");
});
