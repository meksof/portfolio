// Create tools directory if it doesn't exist
const fs = require('fs');
const path = require('path');

const toolsDir = path.resolve(__dirname);

if (!fs.existsSync(toolsDir)) {
  fs.mkdirSync(toolsDir, { recursive: true });
  console.log(`Created tools directory: ${toolsDir}`);
} else {
  console.log(`Tools directory already exists: ${toolsDir}`);
} 