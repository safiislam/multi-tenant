import UserTable from "@/Components/UserTable";
import { headers } from "next/headers";
export const dynamic = "force-dynamic";

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get("host");
  const subdomain = host?.split(".")[0];
  let updateSubdomain = subdomain;
  if (subdomain.includes(":")) {
    updateSubdomain = "";
  }
  const res = await fetch(`https://multi-tenants-2.vercel.app/api/user`, {
    cache: "no-store",
    headers: {
      "x-domain-name": updateSubdomain,
    },
  });
  const data = await res.json();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <UserTable users={data?.data} />
    </div>
  );
}
