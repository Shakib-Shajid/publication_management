import { NextResponse } from "next/server";

// Temporary in-memory storage (replace this with a database in production)
let orders = [];

// GET: Fetch all orders
export async function GET() {
    try {
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Add a new order
export async function POST(req) {
    try {
        const { bookName, amount, receiveAmount, status, orderDate, receiveDate } = await req.json();

        if (!bookName || !amount || !orderDate) {
            return NextResponse.json({ error: "Book name, amount, and order date are required" }, { status: 400 });
        }

        const newOrder = {
            _id: (orders.length + 1).toString(),
            bookName,
            amount,
            receiveAmount,
            status,
            orderDate,
            receiveDate
        };

        orders.push(newOrder);

        return NextResponse.json(newOrder);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update an existing order
export async function PUT(req) {
    try {
        const { id, bookName, amount, receiveAmount, status, orderDate, receiveDate } = await req.json();

        if (!id || !bookName || !amount || !orderDate) {
            return NextResponse.json({ error: "ID, book name, amount, and order date are required" }, { status: 400 });
        }

        const orderIndex = orders.findIndex(order => order._id === id);

        if (orderIndex === -1) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const updatedOrder = { _id: id, bookName, amount, receiveAmount, status, orderDate, receiveDate };
        orders[orderIndex] = updatedOrder;

        return NextResponse.json(updatedOrder);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Delete an order
export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const orderIndex = orders.findIndex(order => order._id === id);

        if (orderIndex === -1) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        orders.splice(orderIndex, 1); // Delete the order from the array

        return NextResponse.json({ message: "Order deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
