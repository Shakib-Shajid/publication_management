// "use client"
// import React, { useState } from 'react';

// const Page = () => {
    // const [amount, setAmount] = useState('');
    // const [percentage, setPercentage] = useState('');
    // const [result, setResult] = useState(null);

    // const handleCalculate = () => {
    //     const totalAmount = parseFloat(amount);
    //     const percentValue = parseFloat(percentage);

    //     if (!isNaN(totalAmount) && !isNaN(percentValue)) {
    //         const calculatedValue = (totalAmount * percentValue) / 100;
    //         const finalAmount = totalAmount - calculatedValue;
    //         setResult(finalAmount);
    //     } else {
    //         setResult('Invalid input');
    //     }
    // };

//     return (
//         <div className='text-center my-10'>
//             <h3 className='text-3xl font-bold'>Calculate Price</h3>
//             <div className='my-10'>
//                 <div className='flex gap-4 justify-center'>
//                     <input 
//                         type="text" 
//                         placeholder="Enter Total Amount" 
//                         className="input input-bordered w-full max-w-xs"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                     />  
//                     <input 
//                         type="text" 
//                         placeholder="Enter Percentage" 
//                         className="input input-bordered w-full max-w-xs"
//                         value={percentage}
//                         onChange={(e) => setPercentage(e.target.value)}
//                     />
//                 </div>
//                 <button 
//                     className='btn btn-primary mt-4'
//                     onClick={handleCalculate}
//                 >
//                     Calculate
//                 </button>
//                 {result !== null && (
//                     <div className='mt-4 text-lg font-semibold'>
//                         Back: {result}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Page;




















"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [schools, setSchools] = useState([]);  // To store list of matching schools
    const [selectedSchool, setSelectedSchool] = useState(null);  // To store the selected school data
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);
    const [notFound, setNotFound] = useState(false);

    // Fetch matching schools based on search query
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
                    setSchools(data);  // Set matching schools
                    setNotFound(false); // Reset not found flag
                } else {
                    setSchools([]);
                    setNotFound(true); // No matching data found
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setNotFound(true);
            }
        }
        fetchData();
    }, [searchQuery]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Select a school from the suggestions
    const handleSchoolSelect = (school) => {
        setSelectedSchool(school);
        setSearchQuery(school.name);  // Set search query to the selected school name
        setSchools([]);  // Clear suggestions after selection
    };

    // Handle amount input change
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    // Calculate result when amount or percentage changes
    useEffect(() => {
        if (amount && selectedSchool) {
            const discount = (parseFloat(amount) * parseFloat(selectedSchool.price)) / 100;
            setResult(parseFloat(amount) - discount);
        } else {
            setResult(null);
        }
    }, [amount, selectedSchool]);

    return (
        <div className="w-[80%] mx-auto">
            <h3 className="text-3xl font-bold text-center my-10">School & Library Calculator</h3>

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

            {/* Show "Not Found" message */}
            {notFound && <p className="text-red-500 text-center">School not found.</p>}

            {/* Show list of schools if matching schools are found */}
            {schools.length > 0 && (
                <div className="mb-4">
                    <ul className="border p-2">
                        {schools.map((school) => (
                            <li
                                key={school._id}
                                onClick={() => handleSchoolSelect(school)}
                                className="cursor-pointer py-1 hover:bg-gray-200"
                            >
                                {school.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Display selected school name */}
            {selectedSchool && !notFound && (
                <div className="mb-4">
                    <label className="block font-semibold">School Name:</label>
                    <input
                        type="text"
                        value={selectedSchool.name}
                        readOnly
                        className="border px-2 py-1 w-full bg-gray-100"
                    />
                </div>
            )}

            {/* Percentage Display */}
            {selectedSchool && !notFound && (
                <div className="mb-4">
                    <label className="block font-semibold">Percentage:</label>
                    <input
                        type="text"
                        value={selectedSchool.price}
                        readOnly
                        className="border px-2 py-1 w-full bg-gray-100"
                    />
                </div>
            )}

            {/* Amount Input */}
            {selectedSchool && !notFound && (
                <div className="mb-4">
                    <label className="block font-semibold">Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount..."
                        className="border px-2 py-1 w-full"
                    />
                </div>
            )}

            {/* Calculation Result */}
            {result !== null && !notFound && (
                <div className="mt-4">
                    <h4 className="text-xl font-bold">Result: {result.toFixed(2)}</h4>
                </div>
            )}
        </div>
    );
};

export default Page;
