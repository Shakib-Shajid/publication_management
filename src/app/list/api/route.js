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

// POST: Add a new school
export async function POST(req) {
    try {
        const { name, price } = await req.json();
        if (!name || !price) {
            return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
        }

        await client.connect();
        const result = await collection.insertOne({ name, price });
        return NextResponse.json({ message: "School added", id: result.insertedId });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update school name and/or price
export async function PUT(req) {
    try {
        const { id, name, price } = await req.json();
        if (!id || (!name && !price)) {
            return NextResponse.json({ error: "ID, name or price are required" }, { status: 400 });
        }

        await client.connect();
        const updateFields = {};
        if (name) updateFields.name = name;
        if (price) updateFields.price = price;

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
        return NextResponse.json({ message: "School updated", modifiedCount: result.modifiedCount });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Remove a school
export async function DELETE(req) {
    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        await client.connect();
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ message: "School deleted", deletedCount: result.deletedCount });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
