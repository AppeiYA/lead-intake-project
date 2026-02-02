import { db } from "../config/db";
import { EnrichmentData, GetLeadResponse, LeadType } from "../types/LeadType";

export function CreateLead(lead: LeadType): LeadType | null {
  // Insert lead
  const stmt = db.prepare<
    [string, string, string | undefined, number, "qualified" | "unqualified"],
    LeadType
  >(
    `
        INSERT INTO leads (name, email, website, score, status)
        VALUES(?, ?, ?, ?, ?)
        RETURNING *
        `,
  );
  const newLead = stmt.get(
    lead.name,
    lead.email,
    lead.website,
    lead.score,
    lead.status,
  );

  return newLead ?? null;
}

export function GetLead(email: string): LeadType | null {
  const lead = db
    .prepare<[string], LeadType>("SELECT * FROM leads WHERE email = ?")
    .get(email);

  return lead ?? null;
}

export function getLeads(): GetLeadResponse[] {
  const stmt = db.prepare<[], GetLeadResponse>(`
    SELECT 
      l.*,
      le.company_name,
      le.company_size,
      le.industry,
      le.country
    FROM leads l
    LEFT JOIN lead_enrichment le ON l.id = le.lead_id
    ORDER BY l.score DESC`);
  return stmt.all();
}

export function UpdateLead(
  leadId: number,
  score: number,
  status: "qualified" | "unqualified",
): LeadType | null {
  const stmt = db.prepare<
    [number, "qualified" | "unqualified", number],
    LeadType
  >(`
    UPDATE leads
    SET score = ?, status = ?
    WHERE id = ?
    RETURNING *
  `);

  const updated = stmt.get(score, status, leadId);
  return updated ?? null;
}

export function StoreEnrichment(
  enrichment: EnrichmentData,
): EnrichmentData | null {
  const stmt = db.prepare<
    [
      number,
      string | undefined,
      number | null | undefined,
      string | null | undefined,
      string | undefined,
    ],
    EnrichmentData
  >(
    `
        INSERT INTO lead_enrichment (lead_id, company_name, company_size, industry, country)
        VALUES(?, ?, ?, ?, ?)
        RETURNING *
        `,
  );
  const newEnrichment = stmt.get(
    enrichment.leadId!,
    enrichment.companyName,
    enrichment.companySize,
    enrichment.industry,
    enrichment.country,
  );

  return newEnrichment ?? null;
}
