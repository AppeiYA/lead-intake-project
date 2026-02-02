import LeadTable from "@/components/lead-table";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-start py-16 px-6 bg-white dark:bg-black sm:items-start overflow-auto">
        <h1 className="flex flex-row gap-2 text-left w-full">
          <span className="font-bold">Lead Table</span>{" "}
          <Link href={"/"} className="text-sm text-purple-500 hover:underline">
            Create Lead
          </Link>
        </h1>
        <div className="w-full max-h-[60vh] overflow-auto">
          <LeadTable />
        </div>
      </main>
    </div>
  );
}
