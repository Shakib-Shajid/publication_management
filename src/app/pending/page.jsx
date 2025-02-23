"use client";
import React, { useState, useEffect } from "react";

const PendingPage = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [pendingList, setPendingList] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newAmount, setNewAmount] = useState("");
    const [newName, setNewName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch pending data from the backend
    useEffect(() => {
        const fetchPendingList = async () => {
            const res = await fetch(`/pending/api`);
            const data = await res.json();
            setPendingList(data);
        };

        fetchPendingList();
    }, []);

    // Filter pending list based on search query
    const filteredList = pendingList.filter((pending) =>
        pending.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle input changes
    const handleNameChange = (e) => setName(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);

    // Add new pending item
    const handleAddPending = async (e) => {
        e.preventDefault();
        const response = await fetch("/pending/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, amount }),
        });

        if (response.ok) {
            const newPending = await response.json();
            setPendingList([...pendingList, newPending]);
            setName("");
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
            body: JSON.stringify({ id, name: newName, amount: newAmount }),
        });

        if (response.ok) {
            const updatedPending = await response.json();
            setPendingList(pendingList.map((item) => item._id === id ? updatedPending.updatedItem : item));
            setEditId(null);
            setNewName("");
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
    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    return (
        <div className="w-[80%] mx-auto">
            <h3 className="text-3xl font-bold text-center my-10">Pending Amount</h3>

            {/* Search Input */}
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name..."
                className="border px-2 py-1 mb-6 w-full"
            />

            {/* Add Pending Item */}
            <form onSubmit={handleAddPending} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                    className="border px-2 py-1 flex-1"
                />
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

            {/* Display Pending List or No Pending Found */}
            {filteredList.length === 0 ? (
                <p className="text-center text-gray-500">No pending found</p>
            ) : (
                <ul>
                    {filteredList.map((pending) => (
                        <li key={pending._id}>
                            {editId === pending._id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="border px-2 py-1"
                                    />
                                    <input
                                        type="text"
                                        value={newAmount}
                                        onChange={(e) => setNewAmount(e.target.value)}
                                        className="border px-2 py-1 ml-2"
                                    />
                                    <button onClick={() => handleUpdatePending(pending._id)} className="bg-blue-500 text-white px-3 py-1 ml-2">
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    {pending.name} - {pending.amount} - {pending.date}
                                    <button onClick={() => handleDelete(pending._id)} className="bg-red-500 text-white px-3 py-1 ml-2">
                                        Delete
                                    </button>
                                    <button onClick={() => { setEditId(pending._id); setNewName(pending.name); setNewAmount(pending.amount); }} className="bg-yellow-500 text-white px-3 py-1 ml-2">
                                        Edit
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PendingPage;
