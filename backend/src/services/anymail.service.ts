import axios from 'axios'
import { Env } from '../config/config';
import { EnrichmentData } from '../types/LeadType';

const ANYMAIL_API_URL = Env.AnyMailApiUrl;
const API_KEY = Env.AnyMailApiKey;

export const GetEnrichmentData = async (email: string) : Promise<EnrichmentData | null> => {
    try {
        const domainName = email.split('@')[1]
        const response = await axios.get(`${ANYMAIL_API_URL}/search/${domainName}`,{
            headers:{
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            timeout: 5000
        })

        const data = response.data

        const enrichmentData: EnrichmentData = {
            companyName: data?.company?.name || null,
            companySize: null,
            industry: null,
            country: data?.company?.country || null
        }
        // anymail finder will not return values for companySize and industry 

        return enrichmentData;
    } catch (error) {
        console.log("Failed to get enrichment data", error)
        return null
    }
}

