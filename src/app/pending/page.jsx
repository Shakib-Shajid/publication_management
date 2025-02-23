"use client";
import React, { useState, useEffect } from "react";

const PendingPage = () => {
    const [amount, setAmount] = useState("");
    const [pendingList, setPendingList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newAmount, setNewAmount] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch pending data from the backend
    useEffect(() => {
        const fetchPendingList = async () => {
            const res = await fetch(`/pending/api?search=${searchQuery}`);
            const data = await res.json();
            setPendingList(data);
        };

        fetchPendingList();
    }, [searchQuery]);

    // Handle amount input change
    const handleAmountChange = (e) => setAmount(e.target.value);

    // Add new pending amount
    const handleAddPending = async (e) => {
        e.preventDefault();
        const response = await fetch("/pending/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount }),
        });

        if (response.ok) {
            const newPending = await response.json();
            setPendingList([...pendingList, newPending]);
            setAmount("");
        }
    };

    // Update pending entry
    const handleUpdatePending = async (id) => {
        const response = await fetch("/pending/api", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, amount: newAmount }),
        });

        if (response.ok) {
            setPendingList(pendingList.map((item) => item._id === id ? { ...item, amount: newAmount } : item));
            setEditId(null);
            setNewAmount("");
        }
    };

    // Delete pending entry
    const handleDelete = async (id) => {
        const response = await fetch("/pending/api", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            setPendingList(pendingList.filter((item) => item._id !== id));
        }
    };

    // Handle search query change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="w-[80%] mx-auto">
            <h3 className="text-3xl font-bold text-center my-10">Pending Amount</h3>

            {/* Search Input */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by amount..."
                className="border px-2 py-1 mb-6 w-full"
            />

            {/* Add Pending Amount */}
            <form onSubmit={handleAddPending} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={handleAmountChange}
                    required
                    className="border px-2 py-1 flex-1"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
                    Save Pending
                </button>
            </form>

            {/* Display Pending List */}
            <ul>
                {pendingList.map((pending) => (
                    <li key={pending._id}>
                        {editId === pending._id ? (
                            <div>
                                <input
                                    type="text"
                                    value={newAmount}
                                    onChange={(e) => setNewAmount(e.target.value)}
                                    className="border px-2 py-1"
                                />
                                <button onClick={() => handleUpdatePending(pending._id)} className="bg-blue-500 text-white px-3 py-1 ml-2">
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                {pending.amount} - {pending.date}
                                <button onClick={() => handleDelete(pending._id)} className="bg-red-500 text-white px-3 py-1 ml-2">
                                    Delete
                                </button>
                                <button onClick={() => { setEditId(pending._id); setNewAmount(pending.amount); }} className="bg-yellow-500 text-white px-3 py-1 ml-2">
                                    Edit
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingPage;
