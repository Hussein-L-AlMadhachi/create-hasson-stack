import {app} from "../src/db.js";

console.log('🔄 Applying schema alterations...');
await app.createTables();
console.log('✅ Schema alterations applied successfully');
