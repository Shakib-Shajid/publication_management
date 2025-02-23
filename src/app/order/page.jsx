"use client";
import React, { useState, useEffect } from "react";

const OrderPage = () => {
    const [bookName, setBookName] = useState("");
    const [amount, setAmount] = useState("");
    const [receiveAmount, setReceiveAmount] = useState("");
    const [status, setStatus] = useState("pending"); // 'pending' or 'received'
    const [orderDate, setOrderDate] = useState("");
    const [receiveDate, setReceiveDate] = useState("");
    const [orderList, setOrderList] = useState([]);
    const [editId, setEditId] = useState(null);

    // Fetch orders from the backend
    useEffect(() => {
        const fetchOrderList = async () => {
            const res = await fetch("/order/api");
            const data = await res.json();
            setOrderList(data);
        };

        fetchOrderList();
    }, []);

    // Handle input changes
    const handleBookNameChange = (e) => setBookName(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleReceiveAmountChange = (e) => setReceiveAmount(e.target.value);
    const handleStatusChange = (e) => setStatus(e.target.value);
    const handleOrderDateChange = (e) => setOrderDate(e.target.value);
    const handleReceiveDateChange = (e) => setReceiveDate(e.target.value);

    // Add a new order
    const handleAddOrder = async (e) => {
        e.preventDefault();
        const response = await fetch("/order/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bookName,
                amount,
                receiveAmount,
                status,
                orderDate,
                receiveDate,
            }),
        });

        if (response.ok) {
            const newOrder = await response.json();
            setOrderList([...orderList, newOrder]);
            setBookName("");
            setAmount("");
            setReceiveAmount("");
            setStatus("pending");
            setOrderDate("");
            setReceiveDate("");
        }
    };

    // Update an existing order
    const handleUpdateOrder = async (id) => {
        const response = await fetch("/order/api", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                bookName,
                amount,
                receiveAmount,
                status,
                orderDate,
                receiveDate,
            }),
        });

        if (response.ok) {
            const updatedOrder = await response.json();
            setOrderList(
                orderList.map((item) => (item._id === id ? updatedOrder : item))
            );
            setEditId(null);
        }
    };

    // Delete an order
    const handleDelete = async (id) => {
        const response = await fetch("/order/api", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            setOrderList(orderList.filter((item) => item._id !== id));
        }
    };

    return (
        <div className="w-[80%] mx-auto">
            <h3 className="text-3xl font-bold text-center my-10">Order Management</h3>

            {/* Add New Order */}
            <form onSubmit={handleAddOrder} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Book Name"
                    value={bookName}
                    onChange={handleBookNameChange}
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
                <input
                    type="text"
                    placeholder="Receive Amount (optional)"
                    value={receiveAmount}
                    onChange={handleReceiveAmountChange}
                    className="border px-2 py-1 flex-1"
                />
                <select
                    value={status}
                    onChange={handleStatusChange}
                    className="border px-2 py-1"
                >
                    <option value="pending">Pending</option>
                    <option value="received">Received</option>
                </select>
                <input
                    type="date"
                    value={orderDate}
                    onChange={handleOrderDateChange}
                    required
                    className="border px-2 py-1"
                />
                <input
                    type="date"
                    value={receiveDate}
                    onChange={handleReceiveDateChange}
                    className="border px-2 py-1"
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
                    Save Order
                </button>
            </form>

            {/* Display Order List */}
            <ul>
                {orderList.map((order) => (
                    <li key={order._id}>
                        {editId === order._id ? (
                            <div>
                                {/* Edit form for selected order */}
                                <input
                                    type="text"
                                    value={bookName}
                                    onChange={handleBookNameChange}
                                    className="border px-2 py-1"
                                />
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    className="border px-2 py-1 ml-2"
                                />
                                <input
                                    type="text"
                                    value={receiveAmount}
                                    onChange={handleReceiveAmountChange}
                                    className="border px-2 py-1 ml-2"
                                />
                                <select
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="border px-2 py-1 ml-2"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="received">Received</option>
                                </select>
                                <input
                                    type="date"
                                    value={orderDate}
                                    onChange={handleOrderDateChange}
                                    className="border px-2 py-1 ml-2"
                                />
                                <input
                                    type="date"
                                    value={receiveDate}
                                    onChange={handleReceiveDateChange}
                                    className="border px-2 py-1 ml-2"
                                />
                                <button onClick={() => handleUpdateOrder(order._id)} className="bg-blue-500 text-white px-3 py-1 ml-2">
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                {order.bookName} - {order.amount} - {order.receiveAmount ? order.receiveAmount : "Not received"} - {order.status} - {order.orderDate} - {order.receiveDate || "Not received yet"}
                                <button onClick={() => handleDelete(order._id)} className="bg-red-500 text-white px-3 py-1 ml-2">
                                    Delete
                                </button>
                                <button onClick={() => { setEditId(order._id); setBookName(order.bookName); setAmount(order.amount); setReceiveAmount(order.receiveAmount); setStatus(order.status); setOrderDate(order.orderDate); setReceiveDate(order.receiveDate); }} className="bg-yellow-500 text-white px-3 py-1 ml-2">
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

export default OrderPage;
