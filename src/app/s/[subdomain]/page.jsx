
const SubdomainPage = async ({ params }) => {
    const { subdomain } = await params;
    console.log(subdomain);
    return (
        <div>

        </div>
    );
};

export default SubdomainPage;