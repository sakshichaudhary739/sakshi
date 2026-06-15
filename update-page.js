const fs = require('fs');

const file = 'c:\\Projects\\sz0160\\src\\app\\page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Reduce spacing from mt-64 to mt-20
content = content.replace(/mt-64/g, 'mt-20');

// Reduce padding in the main portfolio wrapper
content = content.replace(/py-32/g, 'py-20');

// Add zoom: 1.1 to the main container to zoom everything by 10%
content = content.replace(/className="flex flex-col items-center text-center px-10"/g, 'className="flex flex-col items-center text-center px-10" style={{ zoom: 1.1 }}');

fs.writeFileSync(file, content);
console.log('page.tsx updated');
