import express from 'express'
import qualifyLead, { getLead } from './controllers/leads.controller';

const appRouter = express.Router()

appRouter.post("/leads", qualifyLead)
appRouter.get("/Leads/:email", getLead)

export default appRouter;