import { LeadsData } from "../data/StaticLeadData";
import { LeadType } from "../types/LeadType";
import { GetEnrichmentData } from "./anymail.service";

export async function LeadPostService(payload: {name: string, email: string, website?:string}) {
    //check if lead exists already 
    const exists = LeadsData.find(lead => lead.email == payload.email)
    if (exists) {
        return new Error("Lead already exists")
    }

    const lead: LeadType = {...payload, score: 0}

    var score:number;
    var finalLead: LeadType;
    const enrichmentData = await GetEnrichmentData(payload.email)
    if(enrichmentData){
        score = ComputeScore(payload.website? true : false, enrichmentData.companySize? enrichmentData.companySize : 0, enrichmentData.country ? enrichmentData.country : "", true)
        finalLead = {...lead, score: score, ...enrichmentData}
    }else{
        score = ComputeScore(payload.website? true : false, 0, "", false)
        finalLead = {...lead, score: score}
    }

    LeadsData.push(finalLead)

    return finalLead;
}

export async function GetLeads() {
    return LeadsData
}

const ComputeScore = (hasWebsite: boolean = false, companySize: number, country: string, hasEnrichmentData: boolean = false): number => {
    var score = 0
    if(hasEnrichmentData){
        if(0 < companySize  && companySize <= 10){
            score += 10
        }else{
            score += 20
        }

        if (["UK", "US", "CA"].includes(country)){
            score += 10
        }
    }else{
        score -= 5
    }

    if(hasWebsite){
        score += 10
    }

    if (score < 0) return 0
    return score
}