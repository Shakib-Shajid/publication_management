import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const db = client.db("schoolDB"); // Change 'schoolDB' to your actual database name
const collection = db.collection("schools");

// GET: Fetch all schools or search by name
export async function GET(req) {
    try {
        await client.connect();
        const url = new URL(req.url);
        const searchQuery = url.searchParams.get("search"); // Extract search query from URL
        let schools;

        if (searchQuery) {
            schools = await collection.find({
                name: { $regex: searchQuery, $options: "i" } // Case-insensitive search
            }).toArray();
        } else {
            schools = await collection.find().toArray();
        }

        return NextResponse.json(schools);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


