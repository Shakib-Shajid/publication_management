import { NextResponse } from "next/server";

// Temporary in-memory storage (Replace this with a database in real-world scenarios)
let pendingItems = [];

// GET: Fetch all pending items (search by name if query is provided)
export async function GET(req) {
  try {
    const { search } = req.nextUrl.searchParams;
    const filteredItems = search
      ? pendingItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      : pendingItems;

    return NextResponse.json(filteredItems);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new pending item with the current date
export async function POST(req) {
  try {
    const { name, amount } = await req.json();
    
    if (!name || !amount) {
      return NextResponse.json({ error: "Name and amount are required" }, { status: 400 });
    }

    const newItem = {
      _id: String(pendingItems.length + 1), // Generate a unique ID
      name,
      amount,
      date: new Date().toISOString(), // Automatically add the current date
    };

    pendingItems.push(newItem); // Store the new item
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update pending item
export async function PUT(req) {
  try {
    const { id, name, amount } = await req.json();

    if (!id || !name || !amount) {
      return NextResponse.json({ error: "All fields (ID, name, amount) are required" }, { status: 400 });
    }

    // Find the item to update
    const itemIndex = pendingItems.findIndex(item => item._id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Keep the previous date, but add an updated timestamp (updatedAt)
    const updatedItem = {
      ...pendingItems[itemIndex],
      name,
      amount,
      updatedAt: new Date().toISOString(), // Store the updated time
    };

    pendingItems[itemIndex] = updatedItem; // Update the item in the list

    return NextResponse.json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete pending item
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const itemIndex = pendingItems.findIndex(item => item._id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    pendingItems.splice(itemIndex, 1); // Delete the item from the array

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
