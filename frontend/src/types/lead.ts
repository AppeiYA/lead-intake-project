export interface EnrichmentData {
    companyName?: string
    companySize?: number
    industry?: string
    country?: string
}

export interface Lead {
    name: string
    email: string
    website?: string
    enrichmentData?: EnrichmentData
    score: number
    status: 'qualified'|'unqualified'
}