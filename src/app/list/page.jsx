import React from 'react';
import { list } from "../lib/list";


const page = () => {


    return (
        <div>
            <div className="overflow-x-auto w-[80%] mx-auto">
                <h3 className='text-3xl font-bold text-center my-10'>School & Library List</h3>
                <table className="table text-sm">
                    {/* head */}
                    <thead>
                        <tr className='text-sm'>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {list.length > 0 ? (
                            list.map((school) => (
                                <tr key={school.id}>
                                    <td>{school.id}</td>
                                    <td>{school.name}</td>
                                    <td>{school.price}</td>
                                    <td>Delete</td>
                                    <td>Update</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No data available</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;