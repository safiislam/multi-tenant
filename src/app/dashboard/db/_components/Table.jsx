'use client';
import Link from "next/link";
import { revalidateMyTag } from "../actions";
import { useState } from "react";


const Table = ({ data }) => {
    const [viewId, setViewId] = useState(null);
    const [isView, setIsView] = useState(false);
    const handleDelete = (id) => async () => {
        const response = await fetch(`https://multi-tenants-2.vercel.app/api/db/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        console.log(result);
        if (result) {
            revalidateMyTag('db');
        }
    };
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Database Records</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg shadow">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">DB Name</th>
                            <th className="px-4 py-2 border">Domain</th>
                            <th className="px-4 py-2 border">Username</th>
                            <th className="px-4 py-2 border">Password</th>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={item._id} className="text-center hover:bg-gray-50">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{item.dbName}</td>
                                <td className="px-4 py-2 border">{item.domainName}</td>
                                <td className="px-4 py-2 border">{item.username}</td>
                                <td className="px-4 py-2 border space-x-2">
                                    <span>{isView && viewId === item._id ? item.password : "••••••••"}</span>
                                    <button onClick={() => {
                                        setIsView(!isView);
                                        setViewId(item._id);
                                    }}>{isView && viewId === item._id ? "Hide" : "Show"}</button>
                                </td>
                                <td className="px-4 py-2 border text-xs break-all">{item._id}</td>
                                <td className="px-4 py-2 border text-xs break-all space-x-2">
                                    <Link href={`https://${item.domainName}.tenant-next-app.vercel.app`}>View</Link>
                                    <button onClick={handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
