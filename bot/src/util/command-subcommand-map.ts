import fs from 'fs';
import path from 'path';

const filenames = fs.readdirSync(path.join(__dirname, '../commands')).filter(f => (f.endsWith('.ts') && !f.endsWith('.test.ts')) || ( f.endsWith('.js') && !f.endsWith('.test.js')));
let commands: any = {};

filenames.forEach((filename: string) => {
    const module = require(path.join(__dirname, `../commands/${filename}`)).default;
    commands[module.name] = module;
});

export default commands;