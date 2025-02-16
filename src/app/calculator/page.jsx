"use client"
import React, { useState } from 'react';

const Page = () => {
    const [amount, setAmount] = useState('');
    const [percentage, setPercentage] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        const totalAmount = parseFloat(amount);
        const percentValue = parseFloat(percentage);

        if (!isNaN(totalAmount) && !isNaN(percentValue)) {
            const calculatedValue = (totalAmount * percentValue) / 100;
            const finalAmount = totalAmount - calculatedValue;
            setResult(finalAmount);
        } else {
            setResult('Invalid input');
        }
    };

    return (
        <div className='text-center my-10'>
            <h3 className='text-3xl font-bold'>Calculate Price</h3>
            <div className='my-10'>
                <div className='flex gap-4 justify-center'>
                    <input 
                        type="text" 
                        placeholder="Enter Total Amount" 
                        className="input input-bordered w-full max-w-xs"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />  
                    <input 
                        type="text" 
                        placeholder="Enter Percentage" 
                        className="input input-bordered w-full max-w-xs"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                    />
                </div>
                <button 
                    className='btn btn-primary mt-4'
                    onClick={handleCalculate}
                >
                    Calculate
                </button>
                {result !== null && (
                    <div className='mt-4 text-lg font-semibold'>
                        Result: {result}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;

