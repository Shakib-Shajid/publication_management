"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [memos, setMemos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch memos from the API
    useEffect(() => {
        async function fetchMemos() {
            try {
                const response = await fetch("/memo/api");
                if (!response.ok) {
                    throw new Error("Failed to fetch memos");
                }
                const data = await response.json();
                setMemos(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchMemos();
    }, []); // Runs only once on component mount

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send POST request to the memo API to create a new memo
        try {
            const response = await fetch("/memo/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, amount }),
            });

            if (!response.ok) {
                throw new Error("Failed to create memo");
            }

            const newMemo = await response.json();
            setMemos([...memos, newMemo]); // Add the newly created memo to the list
            setName(""); // Clear the form fields
            setAmount("");
        } catch (error) {
            console.error("Error submitting memo:", error);
        }
    };

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter memos based on search query
    const filteredMemos = memos.filter((memo) =>
        memo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-[80%] mx-auto">
            <h3 className="text-3xl font-bold text-center my-10">Memo List</h3>

            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name..."
                    className="border px-2 py-1 w-full"
                />
            </div>

            {/* Form to Add New Memo */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border px-2 py-1 flex-1"
                />
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="border px-2 py-1 flex-1"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
                    Add Memo
                </button>
            </form>

            {/* Display List of Memos */}
            <table className="table text-sm w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMemos.length > 0 ? (
                        filteredMemos.map((memo) => (
                            <tr key={memo._id}>
                                <td>{memo.name}</td>
                                <td>{memo.amount}</td>
                                <td>{new Date(memo.date).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No memos found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Page;


