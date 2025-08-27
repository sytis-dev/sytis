#!/usr/bin/env node

/**
 * Script to revert the temporary API changes
 * Run this after your production API has been updated with the new changes
 */

const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/products/[slug].js',
  'src/pages/applications/[slug].js', 
  'src/pages/solutions/[slug].js'
];

console.log('🔄 Reverting temporary API changes...');

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the temporary disabled code and restore original
    content = content.replace(
      /\/\/ TEMPORARILY DISABLED: Prevent building.*?\/\*\s*\n([\s\S]*?)\s*\*\/\s*\n/g,
      '$1'
    );
    
    // Remove the console.log and return statement
    content = content.replace(
      /\/\/ TEMPORARILY DISABLED: Prevent building.*?fallback: "blocking", \/\/ This will generate pages on-demand instead\n\s*\};\s*\n\s*\/\/ ORIGINAL CODE \(commented out for now\):\s*\n\s*\/\*\s*\n/g,
      ''
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Reverted ${file}`);
  } else {
    console.log(`❌ File not found: ${file}`);
  }
});

console.log('🎉 Revert complete! Your pages will now build normally.');
console.log('💡 Remember to deploy again after running this script.');
