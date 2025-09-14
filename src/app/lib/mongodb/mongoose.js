import mongoose from "mongoose";

let innitalize=false;

export default async function connectDb() {
    if(innitalize){
        console.log('your database is already connected')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    console.log('your monodb is successfully connected')
    innitalize=true;
}
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}