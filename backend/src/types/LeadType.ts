export interface LeadType {
    name: string;
    email: string;
    website?: string;
    enrichmentData?: EnrichmentData;
    score: number;
}

export interface EnrichmentData {
    companyName?: string | null
    companySize?: number | null
    industry?: string | null
    country?: string | null
}