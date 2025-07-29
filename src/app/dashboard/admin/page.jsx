import UserTable from '@/Components/UserTable';
import React from 'react';

const AdminPage = async () => {
    const res = await fetch(`https://multi-tenants-2.vercel.app/api/admin`, { cache: "no-store" });
    const data = await res.json();
    return (
        <div className='w-1/2 mx-auto'>
            <h1>Admin Dashboard</h1>
            <UserTable users={data?.data} />
        </div>
    );
};

export default AdminPage;
