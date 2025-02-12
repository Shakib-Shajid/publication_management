import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className='flex justify-center mt-10'>
                <h2 className='text-3xl font-bold text-green-600 inline-block border-2 border-black rounded-full px-20 py-5'>Welcome to Progressive Prokashony</h2>
            </div>

            <div className='grid grid-cols-2 gap-5 border-2 border-blue-600 my-10 rounded-2xl py-10'>
                <div>
                    <div className="card border-2 border-black shadow-2xl w-80 mx-auto my-5">
                        <div className="card-body text-center">
                            <h2 className="gap-2 text-xl font-semibold leading-7">Create Memo</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card border-2 border-black shadow-2xl w-80 mx-auto my-5">
                        <div className="card-body text-center">
                            <h2 className="gap-2 text-xl font-semibold leading-7">Pending Amount</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card border-2 border-black shadow-2xl w-80 mx-auto my-5">
                        <div className="card-body text-center">
                            <h2 className="gap-2 text-xl font-semibold leading-7">School List</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card border-2 border-black shadow-2xl w-80 mx-auto my-5">
                        <div className="card-body text-center">
                            <h2 className="gap-2 text-xl font-semibold leading-7">Our Books</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card border-2 border-black shadow-2xl w-80 mx-auto my-5">
                        <div className="card-body text-center">
                            <h2 className="gap-2 text-xl font-semibold leading-7">Order List</h2>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card border-2 border-black shadow-2xl w-80 mx-auto my-5">
                        <div className="card-body text-center">
                            <h2 className="gap-2 text-xl font-semibold leading-7">Calculator</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;


