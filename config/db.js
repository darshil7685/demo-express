const mongoose =require('mongoose')

let connectDb = null;

async function connectToDatabase() {
    if (connectDb) {
        return connectDb;
    }
    try {
        const client = await mongoose.connect(process.env.MONGO_URI);
        const connectDb = client.connection.db;
        console.log("Db connected");
        return connectDb
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

module.exports = {connectToDatabase};


