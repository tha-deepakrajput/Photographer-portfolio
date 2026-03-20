import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
console.log("Raw URL from env: ", process.env.DATABASE_URL);
const url = new URL(process.env.DATABASE_URL!);
console.log("Parsed hostname: ", url.hostname);
