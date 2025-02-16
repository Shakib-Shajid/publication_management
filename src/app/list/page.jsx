import React from 'react';
import { list } from "../lib/list";


const page = () => {


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
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