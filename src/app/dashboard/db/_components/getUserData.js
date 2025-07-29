// import { headers } from "next/headers";

const getUserData = async () => {
  //   const headersList = headers();
  //   const host = headersList.get("host");
  //   const subdomain = host?.split(".")[0];
  const res = await fetch(`http://localhost:7000/api/db`, {
    cache: "no-store",
    // headers: {
    //   "x-domain-name": subdomain,
    // },
  });
  const data = await res.json();
  return data;
};

export default getUserData;
