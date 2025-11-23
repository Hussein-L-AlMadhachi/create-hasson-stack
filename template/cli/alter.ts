import {app} from "../src/db.js";

console.log('🔄 creating tables...');
await app.alterTables();
console.log('✅ tables created successfully');
