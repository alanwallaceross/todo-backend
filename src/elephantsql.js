import { Pool, Client } from "pg";
const connectionString = process.env.DB_URL;
const pool = new Pool({
  connectionString,
});
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
});
const client = new Client({
  connectionString,
});
client.connect();

export default pool;
