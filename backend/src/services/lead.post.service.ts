import {
  CreateLead,
  GetLead,
  StoreEnrichment,
  getLeads,
  UpdateLead,
} from "../repository/lead.repository";
import { EnrichmentData, GetLeadResponse, LeadType } from "../types/LeadType";
import { GetEnrichmentData } from "./anymail.service";

export async function LeadPostService(payload: {
  name: string;
  email: string;
  website?: string;
}): Promise<GetLeadResponse | Error> {
  try {
    // check if lead exists already
    const exists = GetLead(payload.email);
    if (exists) {
      return new Error("Lead already exists");
    }

    // Create a lead placeholder (id will be returned from DB)
    const leadToCreate: LeadType = {
      id: 0,
      name: payload.name,
      email: payload.email,
      score: 0,
      status: "unqualified",
      ...(payload.website ? { website: payload.website } : {}),
    };

    const newLead = CreateLead(leadToCreate);
    if (!newLead) {
      return new Error("Error creating lead");
    }

    // enrichment data
    let score: number;
    const enrichmentData = await GetEnrichmentData(payload.email);

    if (enrichmentData) {
      score = ComputeScore(
        !!payload.website,
        enrichmentData.companySize ?? 0,
        enrichmentData.country ?? "",
        true,
      );

      // store enrichment (map fields and attach leadId)
      const enrichmentToStore: EnrichmentData = {
        leadId: newLead.id,
        ...(enrichmentData.companyName
          ? { companyName: enrichmentData.companyName }
          : {}),
        ...(typeof enrichmentData.companySize === "number"
          ? { companySize: enrichmentData.companySize }
          : {}),
        ...(enrichmentData.industry
          ? { industry: enrichmentData.industry }
          : {}),
        ...(enrichmentData.country ? { country: enrichmentData.country } : {}),
      };

      const storedEnrichment = StoreEnrichment(enrichmentToStore);

      const status = score >= 25 ? "qualified" : "unqualified";
      const updated = UpdateLead(newLead.id, score, status);
      if (updated) {
        const finalLead: GetLeadResponse = { ...updated, ...storedEnrichment };
        return finalLead;
      }
    }
    
    score = ComputeScore(!!payload.website, 0, "", false);

    const status = score >= 30 ? "qualified" : "unqualified";
    const updated = UpdateLead(newLead.id, score, status);
    if (updated) {
      const finalLead: GetLeadResponse = { ...updated };
      return finalLead;
    }

    const finalLead: GetLeadResponse = { ...newLead, score };

    return finalLead;
  } catch (error: any) {
    return new Error(error?.message || "Failed to create lead");
  }
}

export async function GetLeads() {
  return getLeads();
}

const ComputeScore = (
  hasWebsite: boolean = false,
  companySize: number,
  country: string,
  hasEnrichmentData: boolean = false,
): number => {
  var score = 0;
  if (hasEnrichmentData) {
    if (0 < companySize && companySize <= 10) {
      score += 10;
    } else {
      score += 20;
    }

    if (["UK", "US", "CA"].includes(country)) {
      score += 10;
    }
  } else {
    score -= 5;
  }

  if (hasWebsite) {
    score += 10;
  }

  if (score < 0) return 0;
  return score;
};
