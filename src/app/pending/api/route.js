import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB connection URI
const uri = "mongodb+srv://managePro:O7zHoTQdHPE7O0Ff@cluster0.pvn5rcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Define the database and collection
const databaseName = "schoolDB"; // Your database name
const collectionName = "pendingItems"; // Collection name for pending items

// GET: Fetch all pending items (search by name if query is provided)
export async function GET(req) {
  try {
    const { search } = req.nextUrl.searchParams;

    // Connect to MongoDB
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Query the database
    const filter = search
      ? { name: { $regex: search, $options: "i" } } // Case-insensitive search
      : {};

    const pendingItems = await collection.find(filter).toArray();
    return NextResponse.json(pendingItems);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

// POST: Create a new pending item with the current date
export async function POST(req) {
  try {
    const { name, amount } = await req.json();

    if (!name || !amount) {
      return NextResponse.json({ error: "Name and amount are required" }, { status: 400 });
    }

    // Connect to MongoDB
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Create a new pending item
    const newItem = {
      name,
      amount,
      date: new Date().toISOString(), // Store the creation date
    };

    // Insert the new item into MongoDB
    const result = await collection.insertOne(newItem);

    return NextResponse.json({ _id: result.insertedId, ...newItem });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

// PUT: Update pending item
export async function PUT(req) {
  try {
    const { id, name, amount } = await req.json();

    if (!id || !name || !amount) {
      return NextResponse.json({ error: "All fields (ID, name, amount) are required" }, { status: 400 });
    }

    // Connect to MongoDB
    await client.connect();
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Find the item to update
    const result = await collection.findOneAndUpdate(
      { _id: new MongoClient.ObjectId(id) }, // Match the item by its _id
      {
        $set: {
          name,
          amount,
          updatedAt: new Date().toISOString(), // Store the updated timestamp
        },
      },
      { returnDocument: "after" } // Return the updated item
    );

    if (!result.value) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item updated successfully", updatedItem: result.value });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

// DELETE: Delete pending item
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

    // Delete the pending item
    const result = await collection.deleteOne({ _id: new MongoClient.ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
