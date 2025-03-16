"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState(null);
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [paidAmount, setPaidAmount] = useState("");
    const [returnAmount, setReturnAmount] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (searchQuery.trim() === "") {
                setSchools([]);
                setSelectedSchool(null);
                setNotFound(false);
                return;
            }

            try {
                const res = await fetch(`/list/api?search=${searchQuery}`);
                if (!res.ok) throw new Error("Failed to fetch data");

                const data = await res.json();
                if (data.length > 0) {
                    setSchools(data);
                    setNotFound(false);
                } else {
                    setSchools([]);
                    setNotFound(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setNotFound(true);
            }
        }
        fetchData();
    }, [searchQuery]);

    useEffect(() => {
        if (amount && selectedSchool) {
            const discount = (parseFloat(amount) * parseFloat(selectedSchool.price)) / 100;
            setResult(parseFloat(amount) - discount);
        } else {
            setResult(null);
        }
    }, [amount, selectedSchool]);

    useEffect(() => {
        if (paidAmount && result !== null) {
            setReturnAmount(parseFloat(paidAmount) - result);
        } else {
            setReturnAmount(null);
        }
    }, [paidAmount, result]);

    return (
        <div className="w-[80%] mx-auto">
            <h3 className="text-3xl font-bold text-center my-10">School & Library Calculator</h3>
            
            <div className="mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="border px-2 py-1 w-full"
                />
            </div>

            {notFound && <p className="text-red-500 text-center">School not found.</p>}

            {schools.length > 0 && (
                <div className="mb-4">
                    <ul className="border p-2">
                        {schools.map((school) => (
                            <li
                                key={school._id}
                                onClick={() => { setSelectedSchool(school); setSearchQuery(school.name); setSchools([]); }}
                                className="cursor-pointer py-1 hover:bg-gray-200"
                            >
                                {school.name} - {school.price}%
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedSchool && !notFound && (
                <>
                    <div className="mb-4">
                        <label className="block font-semibold">School Name:</label>
                        <input type="text" value={selectedSchool.name} readOnly className="border px-2 py-1 w-full bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Percentage:</label>
                        <input type="text" value={selectedSchool.price} readOnly className="border px-2 py-1 w-full bg-gray-100" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Total Bill:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount..."
                            className="border px-2 py-1 w-full"
                        />
                    </div>
                    {result !== null && (
                        <div className="mt-4">
                            <h4 className="text-xl font-bold">Pay: {result.toFixed(2)}</h4>
                        </div>
                    )}
                    <div className="mb-4 mt-4">
                        <label className="block font-semibold">Given Amount:</label>
                        <input
                            type="number"
                            value={paidAmount}
                            onChange={(e) => setPaidAmount(e.target.value)}
                            placeholder="Enter amount paid..."
                            className="border px-2 py-1 w-full"
                        />
                    </div>
                    {returnAmount !== null && (
                        <div className="mt-4">
                            <h4 className="text-xl font-bold">Return Amount: {returnAmount.toFixed(2)}</h4>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Page;
