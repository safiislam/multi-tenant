// import { headers } from "next/headers";

import Table from "./_components/Table";
import ManageDB from "./ManageDB";
export const dynamic = 'force-dynamic';

const ManageDatabase = async () => {
    const res = await fetch(`https://multi-tenants-2.vercel.app/api/db`, { cache: "no-store", next: { tags: ['db'] } });
    const data = await res.json();
    return (
        <div>

            <div>
                <ManageDB />
            </div>
            <Table data={data} />
        </div>
    );
};

export default ManageDatabase;