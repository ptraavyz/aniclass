require('dotenv').config();
const db = require('../config/db');

async function testConnection() {
    const [health] = await db.query('SELECT 1 + 1 AS solution');
    const [rows] = await db.query('SELECT count(*) AS total FROM anime');
    console.log('Health check:', health[0].solution);
    console.log('Sample user:', rows[0]);
}

testConnection().catch((error) => {
    console.error('Error testing database connection:', error);
    process.exit(1);
})
.finally(() => {
    db.end();
});