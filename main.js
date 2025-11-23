#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


function copyTemplate(targetDir) {
    const templateDir = path.join(__dirname, 'template');

    function copyRecursive(src, dest) {
        const stats = fs.statSync(src);
        
        if (stats.isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const item of fs.readdirSync(src)) {
            copyRecursive(path.join(src, item), path.join(dest, item));
        }
        } else {
        fs.copyFileSync(src, dest);
        }
    }
    
    copyRecursive(templateDir, targetDir);
}


async function main() {
    const args = process.argv.slice(2);
    const projectName = args[0] || 'my-app';
    const targetDir = path.resolve(process.cwd(), projectName);
    
    if (fs.existsSync(targetDir)) {
        console.error(`❌ Directory ${projectName} already exists!`);
        process.exit(1);
    }
    
    console.log(`🚀 Creating Hasson Project Template in ${targetDir}...`);
    
    try {
        // Copy template
        copyTemplate(targetDir);
        
        // Create package.json for the new project
        const packageJson = {
        name: projectName,
        version: "0.0.1",
        type: "module",
        scripts: {
            "db:create": "node ./dist/cli/create.js",
            "db:alter": "node ./dist/cli/alter.js",
            "dev": "tsc & node ./main.ts"
        },
        "dependencies": {
            "pg-norm":"latest",
            "express":"latest",
            "enders-sync":"latest",
            "jsonwebtoken":"latest",
            "dotenv":"latest"
        },
        "devDependencies": {
            "@types/node": "latest",
            "@types/express" : "latest",
            "@types/jsonwebtoken":"latest"
        }
        };

        fs.writeFileSync(
        path.join(targetDir, 'package.json'),
        JSON.stringify(packageJson, null, 2)
        );

        console.log(`
✅ Hasson Project Template created successfully!

📁 Next steps:
  1. cd ${projectName}
  2. npm install
  3. Edit src/db.ts with your database credentials
  4. Edit src/models.ts to make your own schema
  5. npm run db:create

✨ the project template gives a quick guide on how to start with this

🎉 Happy coding!
    `);

    } catch (error) {
        console.error('❌ Failed to create project:', error);
        process.exit(1);
    }
}

main();
