import { log } from "console";
import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.mongo_url!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("MongoDB connected Successfully! ");
            
        })

        connection.on('error', (err) => {
            console.log("MongoDB connection Error:"+ err);
            process.exit()
        })
    }
    catch(error){
        console.log("Something goes wrong!");
        console.log(error);
        
        
    }
}