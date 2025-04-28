import { PROJECT } from "./utils/project-info";

async function globalSetup() {
    console.log("────────────────────────────────────────────");
    console.log(`🚀 Project: ${PROJECT.name}`);
    console.log(`🛠️ Built With: ${PROJECT.builtWith}`);
    console.log(`👤 Author: ${PROJECT.author} (${PROJECT.email})`);
    console.log(`📝 Motto: "${PROJECT.alias}"`);
    console.log("────────────────────────────────────────────");
    console.log(`                                 
           _____           _____ 
          |     |___ _____|  _  |
          |  |  |- _|     |     |
          |__  _|___|_|_|_|__|__|
             |__|                
         
────────────────────────────────────────────`);
}

export default globalSetup;
