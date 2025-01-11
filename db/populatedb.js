#! /usr/bin/env node

require("dotenv").config();

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    text VARCHAR ( 255 ),
    username VARCHAR ( 255 ),
    added TIMESTAMP DEFAULT NOW()
  );

INSERT INTO messages (text, username)
  VALUES ('I like pie', 'Mario'),
         ('Buhh...', 'Patrick');
`;
async function main() {
  console.log("Seeding...");
  
  const client = new Client({
    connectionString: process.env.CONNECTION_URI,
    ssl: {
      rejectUnauthorized: false, // Required for insecure SSL connections
    },
  });
  
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}

// main();