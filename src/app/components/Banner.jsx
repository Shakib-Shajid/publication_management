import Link from 'next/link';
import React from 'react';

const Banner = () => {
    return (
        <div className=''>
            <div className='flex justify-center mt-5'>
                <h2 className='text-lg lg:text-3xl font-bold text-green-600 border-2 border-black rounded-full px-7 md:px-20 py-5'>Welcome to Progressive Prokashony</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 border-2 border-blue-600 my-10 rounded-2xl py-10 w-[90%] md:w-full mx-auto'>
                <div>
                    <Link href="/memo">
                        <div className="card border-2 border-black shadow-2xl w-60 lg:w-80 mx-auto my-5">
                            <div className="card-body text-center">
                                <h2 className="gap-2 text-xl font-semibold leading-7">Create Memo</h2>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href="/pending">
                        <div className="card border-2 border-black shadow-2xl w-60 lg:w-80 mx-auto my-5">
                            <div className="card-body text-center">
                                <h2 className="gap-2 text-xl font-semibold leading-7">Pending Amount</h2>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href="/list">
                        <div className="card border-2 border-black shadow-2xl w-60 lg:w-80 mx-auto my-5">
                            <div className="card-body text-center">
                                <h2 className="gap-2 text-xl font-semibold leading-7">School List</h2>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href="https://progressiveprokashony.com/order">
                        <div className="card border-2 border-black shadow-2xl w-60 lg:w-80 mx-auto my-5">
                            <div className="card-body text-center">
                                <h2 className="gap-2 text-xl font-semibold leading-7">Our Books</h2>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href="/order">
                        <div className="card border-2 border-black shadow-2xl w-60 lg:w-80 mx-auto my-5">
                            <div className="card-body text-center">
                                <h2 className="gap-2 text-xl font-semibold leading-7">Order List</h2>
                            </div>
                        </div>
                    </Link>
                </div>
                <div>
                    <Link href="/calculator">
                        <div className="card border-2 border-black shadow-2xl w-60 lg:w-80 mx-auto my-5">
                            <div className="card-body text-center">
                                <h2 className="gap-2 text-xl font-semibold leading-7">Calculator</h2>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <p className='text-sm text-center text-gray-400'>All right reserved to Progressive Prokashony</p>
        </div>
    );
};

export default Banner;


