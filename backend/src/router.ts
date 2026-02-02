import express from 'express'
import qualifyLead, { getLeads } from './controllers/leads.controller';

const appRouter = express.Router()

appRouter.post("/leads", qualifyLead)
appRouter.get("/Leads", getLeads)

export default appRouter;