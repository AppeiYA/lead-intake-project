"use client";

import { useEffect, useState } from "react";
import { FetchLeadResponse, fetchLeads } from "@/services/api";

export default function LeadTable() {
  const [leads, setLeads] = useState<FetchLeadResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads().then((data) => {
      setLeads(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading leads...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max">
        <thead>
          <tr className="font-bold text-left border-b">
            <th className="text-sm sm:text-base px-4 py-2">Name</th>
            <th className="text-sm sm:text-base px-4 py-2">Email</th>
            <th className="text-sm sm:text-base px-4 py-2">Score</th>
            <th className="text-sm sm:text-base px-4 py-2">Status</th>
            <th className="text-sm sm:text-base px-4 py-2">Company name</th>
            <th className="text-sm sm:text-base px-4 py-2">Company size</th>
            <th className="text-sm sm:text-base px-4 py-2">Industry</th>
            <th className="text-sm sm:text-base px-4 py-2">Country</th>
          </tr>
        </thead>
        <tbody>
          {leads?.data.map((lead) => (
            <tr key={lead.email} className="border-b">
              <td className="text-sm sm:text-base px-4 py-2">{lead.name}</td>
              <td className="text-sm sm:text-base px-4 py-2">{lead.email}</td>
              <td className="text-sm sm:text-base px-4 py-2">{lead.score}</td>
              <td className="text-sm sm:text-base px-4 py-2">{lead.score > 25 ? "qualified": "unqualified"}</td>
              <td className="text-sm sm:text-base px-4 py-2">
                {lead.enrichmentData?.companyName || "-"}
              </td>
              <td className="text-sm sm:text-base px-4 py-2">
                {lead.enrichmentData?.companySize || "-"}
              </td>
              <td className="text-sm sm:text-base px-4 py-2">
                {lead.enrichmentData?.industry || "-"}
              </td>
              <td className="text-sm sm:text-base px-4 py-2">
                {lead.enrichmentData?.country || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
