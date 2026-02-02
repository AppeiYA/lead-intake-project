import { Lead } from "@/types/lead";

export interface CreateLeadRequest {
  name: string;
  email: string;
  website?: string;
}

interface LeadResponse {
    message: string;
    data: Lead
}

export interface FetchLeadResponse {
  message: string;
  data: Lead[]
}

export const createLead = async (data: CreateLeadRequest): Promise<LeadResponse> => {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to create lead");
  }

  return res.json()
};

export const fetchLeads = async (): Promise<FetchLeadResponse>=>{
    const res = await fetch('/api/leads', {
        method: "GET",
        headers: {"content-type": "application/json"}
    })

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.error || "Failed to fetch leads")
    }

    return res.json()
}
