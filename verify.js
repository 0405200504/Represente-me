const fs = require('fs');
try {
  const code = fs.readFileSync('app.js', 'utf8');
  // Attempt to parse evaluating via Function constructor throws if bad
  new Function(code);
  console.log('JS is Valid');
} catch (e) {
  console.log('Error parsing JS:', e.message);
  console.log('Line Error (if available):', e.lineNumber);
}
