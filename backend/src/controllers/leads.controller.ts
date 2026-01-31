import { Request, Response } from 'express';
import Joi from 'joi';
import { GetLeadSchema, LeadPostSchema } from '../validators/leads.post.schema';
import { GetLead, LeadPostService } from '../services/lead.post.service';

const qualifyLead = async (req: Request, res: Response) => {
    const { value, error } = LeadPostSchema.validate(req.body);
    if (error) {
        res.status(422).json({
            "error": error?.details[0]?.message
        });
        return;
    }

    const response = await LeadPostService(value)

    if (response instanceof Error){
        return res.status(500).json({
            error: response.message
        })
    }

    return res.status(200).json({
        message: "Lead posted successfully",
        data: response
    })
}

export const getLead = async (req:Request, res:Response) => {
    const {error, value} = GetLeadSchema.validate(req.params)
    if (error) {
        res.status(422).json({
            "error": error?.details[0]?.message
        });
        return;
    }

    const response = await GetLead(value?.email)

    if (response instanceof Error) {
        return res.status(500).json({
            error: response.message
        })
    }


    return res.status(200).json({
        message: "Lead fetched successfully",
        data: response
    })
}

export default qualifyLead;