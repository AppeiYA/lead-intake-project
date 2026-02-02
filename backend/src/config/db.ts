import Database from 'better-sqlite3'
import type {Database as SQLiteDatabase} from 'better-sqlite3';

export const db: SQLiteDatabase = new Database("app.db");

// Initialize db table 
db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    website TEXT,
    score INTEGER NOT NULL,
    status TEXT NOT NULL
        CHECK (status IN ('qualified', 'unqualified'))
  );

  CREATE TABLE IF NOT EXISTS lead_enrichment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL,
    company_name TEXT,
    company_size INTEGER,
    industry TEXT,
    country TEXT,
    FOREIGN KEY (lead_id) REFERENCES leads(id)
  );
`);
