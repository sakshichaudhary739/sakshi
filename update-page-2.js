const fs = require('fs');

const file = 'c:\\Projects\\sz0160\\src\\app\\page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Reduce spacing from mt-20 to mt-8
content = content.replace(/mt-20/g, 'mt-8');

// Reduce margin in FloralDivider from my-20 to my-10
content = content.replace(/my-20/g, 'my-10');

fs.writeFileSync(file, content);
console.log('page.tsx updated again');
