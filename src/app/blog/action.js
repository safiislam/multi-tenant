export const getAllBlogData = async (updateSubdomain) => {
  try {
    const res = await fetch(`https://multi-tenants-2.vercel.app/api/blog`, {
      cache: "no-store",
      next: { tags: "blog" },
      headers: {
        "x-domain-name": updateSubdomain.includes(":") ? "" : updateSubdomain,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
