'use client';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { revalidateMyTag } from './actions';

const ManageDB = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    const [formData, setFormData] = useState({
        dbName: '',
        domainName: '',
        username: '',
        password: ''
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
        const data = await fetch('https://multi-tenants-2.vercel.app/api/db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const result = await data.json();
        console.log('Response from API:', result);
        if (result) {
            revalidateMyTag('db');
            closeModal();
        }
    };
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1>Manage Database</h1>
                <div>
                    <button className='flex justify-end' onClick={openModal}>Add Database</button>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    className={''}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <button className='flex w-full justify-end' onClick={closeModal}>close</button>
                    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Tenant Configuration</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="dbName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Database Name
                                </label>
                                <input
                                    type="text"
                                    id="dbName"
                                    name="dbName"
                                    value={formData.dbName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="domainName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Domain Name
                                </label>
                                <input
                                    type="text"
                                    id="domainName"
                                    name="domainName"
                                    value={formData.domainName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., yourcompany.myapp.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoComplete="new-password"
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
        </div>
    );
};

export default ManageDB;