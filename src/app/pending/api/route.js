import { NextResponse } from "next/server";

// Temporary in-memory storage (Replace this with a database in real-world scenarios)
let pendingItems = [
  { _id: "1", name: "Pending Item 1", amount: "100", date: "2025-02-23" },
  { _id: "2", name: "Pending Item 2", amount: "200", date: "2025-02-24" }
];

// GET: Fetch all pending items
export async function GET() {
  try {
    return NextResponse.json(pendingItems);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update pending item
export async function PUT(req) {
  try {
    const { id, name, amount, date } = await req.json();

    if (!id || !name || !amount || !date) {
      return NextResponse.json({ error: "All fields (ID, name, amount, date) are required" }, { status: 400 });
    }

    // Find the item to update
    const itemIndex = pendingItems.findIndex(item => item._id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Update the item
    const updatedItem = { _id: id, name, amount, date };
    pendingItems[itemIndex] = updatedItem;

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




