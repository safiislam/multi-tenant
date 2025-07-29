import React, { Suspense } from 'react';
import ManageBlog from './ManageBlog';
import { getAllBlogData } from './action';
import { headers } from 'next/headers';

const BlogPage = async () => {
    const headersList = await headers();
    const host = headersList.get("host");
    const subdomain = host?.split(".")[0];

    const data = getAllBlogData(subdomain);
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ManageBlog blogData={data} />
            </Suspense>
            <p className="mb-4">Welcome to the blog page!</p>
        </div>
    );
};

export default BlogPage;