const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/Three/Experience.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const replacements = {
  'bg-[#000814]': 'bg-black',
  'args={["#000814"]}': 'args={["#000000"]}',
  'args={["#000814", 5, 30]}': 'args={["#000000", 5, 30]}',
  '#00f2ff': '#ffffff',
  '#001524': '#050505',
  '#002b4d': '#1a1a1a',
  '#a0feff': '#cccccc',
  '#7000ff': '#ffffff',
  '#00ffcc': '#ffffff',
  '#ff00ff': '#ffffff',
  '#38b2ac': '#ffffff',
  '#ff5d01': '#ffffff',
  '#3ecf8e': '#ffffff',
  '#339933': '#ffffff',
  '#336791': '#ffffff',
  'text-cyan-400': 'text-neutral-300',
  'text-cyan-500': 'text-neutral-400',
  'bg-cyan-500': 'bg-white',
  'border-cyan-500/30': 'border-white/10',
  'from-cyan-400': 'from-white/70',
};

for (const [key, value] of Object.entries(replacements)) {
  content = content.split(key).join(value);
}

fs.writeFileSync(filePath, content);
console.log("Replaced colors successfully.");
