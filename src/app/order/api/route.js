import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB connection URI
const uri = "mongodb+srv://managePro:O7zHoTQdHPE7O0Ff@cluster0.pvn5rcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Define the database and collection
const databaseName = "schoolDB"; // Your database name
const collectionName = "orders"; // Collection name for orders

// GET: Fetch all orders
export async function GET() {
    try {
        // Connect to MongoDB
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        // Fetch all orders from the database
        const orders = await collection.find().toArray();
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}

// POST: Add a new order
export async function POST(req) {
    try {
        const { bookName, amount, receiveAmount, status, orderDate, receiveDate } = await req.json();

        if (!bookName || !amount || !orderDate) {
            return NextResponse.json({ error: "Book name, amount, and order date are required" }, { status: 400 });
        }

        // Connect to MongoDB
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        // Create a new order object
        const newOrder = {
            bookName,
            amount,
            receiveAmount,
            status,
            orderDate,
            receiveDate,
            dateCreated: new Date().toISOString() // Add creation date
        };

        // Insert the new order into the MongoDB collection
        const result = await collection.insertOne(newOrder);

        return NextResponse.json({ _id: result.insertedId, ...newOrder });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}

// PUT: Update an existing order
export async function PUT(req) {
    try {
        const { id, bookName, amount, receiveAmount, status, orderDate, receiveDate } = await req.json();

        if (!id || !bookName || !amount || !orderDate) {
            return NextResponse.json({ error: "ID, book name, amount, and order date are required" }, { status: 400 });
        }

        // Connect to MongoDB
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        // Find the order by ID and update it
        const result = await collection.findOneAndUpdate(
            { _id: new MongoClient.ObjectId(id) }, // Match the order by its _id
            {
                $set: {
                    bookName,
                    amount,
                    receiveAmount,
                    status,
                    orderDate,
                    receiveDate,
                    updatedAt: new Date().toISOString(), // Store the updated timestamp
                },
            },
            { returnDocument: "after" } // Return the updated document
        );

        if (!result.value) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order updated successfully", updatedOrder: result.value });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}

// DELETE: Delete an order
export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        // Connect to MongoDB
        await client.connect();
        const database = client.db(databaseName);
        const collection = database.collection(collectionName);

        // Delete the order by ID
        const result = await collection.deleteOne({ _id: new MongoClient.ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Order deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await client.close();
    }
}
