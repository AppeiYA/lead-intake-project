import LeadForm from "@/components/lead-form";
import LeadTable from "@/components/lead-table";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-center font-bold w-full">Submit Lead</h1>
        <LeadForm/>
        <Link href={"/dashboard"} className="text-sm text-purple-500 hover:underline w-full text-center p-2">Check dashboard</Link>
      </main>
    </div>
  );
}
