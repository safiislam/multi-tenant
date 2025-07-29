'use client';
import React, { use, useActionState, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { revalidateMyTag } from '../dashboard/db/actions';

const ManageBlog = ({ blogData }) => {
    const [currentUrl, setCurrentUrl] = useState("");
    const data = use(blogData);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const url = window.location.origin
            const urlWithoutProtocol = url.replace(/^https?:\/\//, "").split("/")[0]
            setCurrentUrl(urlWithoutProtocol.split(".")[0]);
        }
    }, []);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });


    function closeModal() {
        setIsOpen(false);
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch('https://multi-tenants-2.vercel.app/api/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-domain-name": currentUrl.includes(":") ? "" : currentUrl,
            },
            body: JSON.stringify(formData)
        });
        const result = await data.json();
        console.log('Response from API:', result);
        if (result) {
            revalidateMyTag('blog');
            closeModal();
        }
    };
    const handleDelete = async (id) => {
        const isDelete = confirm("Are you sure you want to delete this blog?");
        if (!isDelete) return;
        const data = await fetch(`https://multi-tenants-2.vercel.app/api/blog/${id}`, {
            method: 'DELETE',
            "x-domain-name": currentUrl.includes(":") ? "" : currentUrl,
        });
        const result = await data.json();
        if (result) {
            revalidateMyTag('blog');
        }
    };
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1>Manage Blog</h1>
                <div>
                    <button className='flex justify-end' onClick={openModal}>Add Database</button>
                </div>
            </div>

            <div>
                <table className="max-w-1/2 w-full mx-auto bg-white border  rounded-lg ">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item) => (
                            <tr key={item._id}>
                                <td className="py-2 px-4 border-b">{item.title}</td>
                                <td className="py-2 px-4 border-b">{item.description}</td>
                                <td className="py-2 px-4 border-b">
                                    {/* <button className="text-blue-600 hover:underline">Edit</button> */}
                                    <button className="text-red-600 hover:underline ml-4" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={modalIsOpen}
                className={''}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <button className='flex w-full justify-end' onClick={closeModal}>close</button>
                <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Blog</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Blog Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., This is a blog post about..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            Create Tenant
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ManageBlog;