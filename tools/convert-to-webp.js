// Script to convert images to WebP format
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directories to scan for images
const directories = [
  path.resolve(__dirname, '../public/images'),
  path.resolve(__dirname, '../public/images/companies'),
  path.resolve(__dirname, '../public/images/certifications')
];

// Process a single image file
async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  // Only process certain image types
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    return;
  }
  
  const outputPath = filePath.replace(ext, '.webp');
  
  // Skip if WebP version already exists
  if (fs.existsSync(outputPath)) {
    console.log(`Skipping ${filePath} (WebP version already exists)`);
    return;
  }
  
  console.log(`Converting ${filePath} to WebP...`);
  
  try {
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`✅ Created ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error.message);
  }
}

// Process images in a directory recursively
async function processDirectory(directory) {
  try {
    const items = fs.readdirSync(directory);
    
    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        await processDirectory(itemPath);
      } else if (stat.isFile()) {
        await processImage(itemPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error.message);
  }
}

// Main execution
async function main() {
  console.log('Converting images to WebP format...');
  
  // Process each directory
  for (const directory of directories) {
    if (fs.existsSync(directory)) {
      await processDirectory(directory);
    } else {
      console.warn(`Directory not found: ${directory}`);
    }
  }
  
  console.log('Conversion complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
}); 