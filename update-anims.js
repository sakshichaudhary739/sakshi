const fs = require('fs');
const path = require('path');

const dir = 'c:\\Projects\\sz0160\\src\\components\\portfolio';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace all initial states with a particle-like blur materialization
  content = content.replace(/initial=\{\{\s*opacity:\s*0[^}]*\}\}/g, "initial={{ opacity: 0, scale: 0.9, filter: 'blur(24px)' }}");
  
  // Replace all whileInView states
  content = content.replace(/whileInView=\{\{\s*opacity:\s*1[^}]*\}\}/g, "whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}");

  // Replace spring transitions with elegant cinematic ease
  content = content.replace(/transition=\{\{ type: 'spring', stiffness: 300, damping: 15, delay: ([\d.]+) \}\}/g, "transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: $1 }}");

  fs.writeFileSync(filePath, content);
}
console.log('Animations updated successfully.');
