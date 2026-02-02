"use client";

import { createLead, CreateLeadRequest } from "@/services/api";
import { LeadFormSchema } from "@/validator/form-validator";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LeadForm() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData: CreateLeadRequest = {
        name: name,
        email: email,
        website: website
      }
      // validate form body
      const check = LeadFormSchema.safeParse(formData);
      if (!check.success){
        setError(`${check.error.issues[0].message}`)
        setLoading(false)
        return
      }

      const response = await createLead(formData);

      alert(response.message)
      setLoading(false)
      router.push("/dashboard")
    } catch (error: any) {
        setError(error.message)
        setLoading(false)
    }
  };
  return (
    <div className="w-full items-center flex justify-center">
      <form className="flex flex-col gap-2 w-[80%]" onSubmit={handleSubmit}>
        <p className="text-red-500 text-xs">{error}</p>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-1 border-1 border-gray-500 rounded-lg w-full text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-1 border-1 border-gray-500 rounded-lg w-full text-sm"
        />
        <input
          type="text"
          placeholder="Website"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="p-1 border-1 border-gray-500 rounded-lg w-full text-sm"
        />
        <input
          type="submit"
          disabled={loading}
          value={loading ? "loading..." : "Create"}
          className={`text-black rounded-lg p-2 cursor-pointer ${loading ? "bg-gray-500" : "bg-white hover:bg-white/70"}`}
        />
      </form>
    </div>
  );
}
