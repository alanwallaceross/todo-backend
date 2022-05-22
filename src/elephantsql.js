import { Pool, Client } from "pg";
const connectionString = process.env.DB_URL;
const pool = new Pool({
  connectionString,
});
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
});
pool.on("error", (err, client) => {
  console.error("Error:", err);
});

export default pool;
