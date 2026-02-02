export interface LeadType {
  id: number;
  name: string;
  email: string;
  website?: string;
  score: number;
  status: "qualified" | "unqualified";
}


export interface GetLeadResponse {
  id: number;
  name: string;
  email: string;
  website?: string;
  score: number;
  status: "qualified" | "unqualified";
  companyName?: string;
  companySize?: number | null;
  industry?: string | null;
  country?: string;
}

export interface EnrichmentData {
  id?: number;
  leadId?: number;
  companyName?: string ;
  companySize?: number | null;
  industry?: string | null;
  country?: string;
}
