import { NextResponse } from "next/server";

let memos = []; // In-memory storage, ideally replaced by a database

// GET: Fetch all memos
export async function GET() {
    try {
        return NextResponse.json(memos); // Return the memos as JSON
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Add a new memo
export async function POST(req) {
    try {
        const { name, amount } = await req.json();
        const newMemo = { _id: Date.now(), name, amount, date: new Date() };
        memos.push(newMemo); // Save the new memo to the in-memory array
        return NextResponse.json(newMemo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}




