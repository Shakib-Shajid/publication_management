// import { NextResponse } from "next/server";

// let memos = []; // In-memory storage, ideally replaced by a database

// // GET: Fetch all memos
// export async function GET() {
//     try {
//         return NextResponse.json(memos); // Return the memos as JSON
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// // POST: Add a new memo
// export async function POST(req) {
//     try {
//         const { name, amount } = await req.json();
//         const newMemo = { _id: Date.now(), name, amount, date: new Date() };
//         memos.push(newMemo); // Save the new memo to the in-memory array
//         return NextResponse.json(newMemo, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }




import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB connection URI
const uri = "mongodb+srv://managePro:O7zHoTQdHPE7O0Ff@cluster0.pvn5rcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Define the database and collection
const databaseName = "schoolDB"; // Your database name (updated)
const collectionName = "memos"; // Collection name

// GET: Fetch all memos
export async function GET() {
    try {
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);
        
        const memos = await collection.find().toArray(); // Fetch all memos from MongoDB
        return NextResponse.json(memos); // Return the memos
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}

// POST: Add a new memo
export async function POST(req) {
    try {
        const { name, amount } = await req.json();

        // Connect to the database
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        // Create a new memo object
        const newMemo = { name, amount, date: new Date() };

        // Insert the new memo into MongoDB
        const result = await collection.insertOne(newMemo);

        // Return the new memo with the MongoDB-generated _id
        return NextResponse.json({ _id: result.insertedId, ...newMemo }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}
