# Full‑Stack Developer Technical Test

**How to start the app:**
1. Pull/clone the code on github
2. Run: 
```bash
cd backend && npm i
cd frontend && npm i
```
3. Check out .env.example and fill in required data

4. Start the backend server
```bash
cd backend
npm run dev
```
5. Launch another server for the frontend
```bash
cd frontend
npm run dev
```
6. Go to the app and test submit lead

**How lead scoring works?**
The lead scoring follows strictly with what is in the document.
1. +10 if lead is with website
2. +20 for company size between 11-20
3. +10 if the country is US/UK/CA
4. -5 for absence of enrichment data
*score does not record negative. Any negative scoring is defaulted to 0*

**Architectural decision**
1. Frontend and backend are standalone but on deployment will stand together with different ports
2. Made use of repository to create a layer system where data is far but close to the service (control service influence on data)

**Trade Offs**
1. Due to time constraint, aethetics was traded off for actual functionality
2. Rather than use Next API, I used standalone server which contributes to the overhead of starting the app

**How ANYMAIL finder enrichment works**
Anymai finder takes an email and responds with data that confirm the validity of the email. It doesn't provide some data like the company size or industry. Anymail finder is also a paid platform that offer a 3 day trial to use their services. This prevented total exploration of the services of anymail finder.

**With more time, what will I improve?**
I will improve on both the UI/UX and the security of the backend infrastructure. I would include a rate limiter, helmet among other tools/modules that help secure the backend. 
I would hop for a better tool for persisting the data, preferrably, postgresql.