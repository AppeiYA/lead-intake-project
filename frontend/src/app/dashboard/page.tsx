import LeadTable from "@/components/lead-table";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="flex flex-row gap-2 text-center w-full">
          <span className="font-bold">Lead Table</span>{" "}
          <Link href={"/"} className="text-sm text-purple-500 hover:underline">
            Create Lead
          </Link>
        </h1>
        <LeadTable />
      </main>
    </div>
  );
}
