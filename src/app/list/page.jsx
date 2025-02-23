"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [schools, setSchools] = useState([]);
    const [editId, setEditId] = useState(null);
    const [newPrice, setNewPrice] = useState("");
    const [newSchool, setNewSchool] = useState({ name: "", price: "" });
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch schools from API based on search query
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`/list/api${searchQuery ? `?search=${searchQuery}` : ""}`);
                if (!res.ok) throw new Error("Failed to fetch school data");
                const data = await res.json();
                setSchools(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [searchQuery]); // Fetch data whenever search query changes

    // Handle form input change
    const handleInputChange = (e) => {
        setNewSchool({ ...newSchool, [e.target.name]: e.target.value });
    };

    // Submit new school to MongoDB
    const handleAddSchool = async (e) => {
        e.preventDefault();
        const response = await fetch("/list/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSchool),
        });

        if (response.ok) {
            const addedSchool = await response.json();
            setSchools([...schools, { _id: addedSchool.id, ...newSchool }]);
            setNewSchool({ name: "", price: "" });
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Delete school
    const handleDelete = async (id) => {
        const response = await fetch("/list/api", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            setSchools(schools.filter((school) => school._id !== id));
        }
    };

    // Enable edit mode
    const handleEdit = (id, price, name) => {
        setEditId(id);
        setNewPrice(price);
        setNewSchool({ ...newSchool, name });
    };

    // Update price and/or name
    const handleUpdate = async (id) => {
        const response = await fetch("/list/api", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name: newSchool.name, price: newPrice }),
        });

        if (response.ok) {
            setSchools(schools.map((school) =>
                school._id === id ? { ...school, name: newSchool.name, price: newPrice } : school
            ));
            setEditId(null);
            setNewPrice("");
            setNewSchool({ name: "", price: "" });
        }
    };

    return (
        <div className="w-[80%] mx-auto">
            <h3 className="text-3xl font-bold text-center my-10">School & Library List</h3>

            {/* Search Input */}
            <div className="mb-6 flex">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name..."
                    className="border px-2 py-1 w-full"
                />
            </div>

            {/* Form to Add New School */}
            <form onSubmit={handleAddSchool} className="flex gap-2 mb-6">
                <input
                    type="text"
                    name="name"
                    placeholder="School Name"
                    value={newSchool.name}
                    onChange={handleInputChange}
                    required
                    className="border px-2 py-1 flex-1"
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Percentage"
                    value={newSchool.price}
                    onChange={handleInputChange}
                    required
                    className="border px-2 py-1 flex-1"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
                    Add That
                </button>
            </form>

            {/* Table of Schools */}
            <table className="table text-sm w-full">
                <thead>
                    <tr className="text-sm">
                        <th>Serial</th>
                        <th>Name</th>
                        <th>Percentage</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {schools.length > 0 ? (
                        schools.map((school, index) => (
                            <tr key={school._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {editId === school._id ? (
                                        <input
                                            type="text"
                                            value={newSchool.name}
                                            onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                                            className="border px-2 py-1 w-20"
                                        />
                                    ) : (
                                        school.name
                                    )}
                                </td>
                                <td>
                                    {editId === school._id ? (
                                        <input
                                            type="text"
                                            value={newPrice}
                                            onChange={(e) => setNewPrice(e.target.value)}
                                            className="border px-2 py-1 w-20"
                                        />
                                    ) : (
                                        school.price
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(school._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    {editId === school._id ? (
                                        <button onClick={() => handleUpdate(school._id)} className="bg-green-500 text-white px-3 py-1 rounded">
                                            Save
                                        </button>
                                    ) : (
                                        <button onClick={() => handleEdit(school._id, school.price, school.name)} className="bg-blue-500 text-white px-3 py-1 rounded">
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Page;
