import fs from 'fs';
import path from 'path';

const directory = './src';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.astro') || file.endsWith('.md')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(directory);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/La Liga/gi, 'Spansk toppfotball');
    content = content.replace(/Serie A/gi, 'Italiensk toppfotball');
    content = content.replace(/Bundesliga/gi, 'Tysk toppfotball');
    content = content.replace(/Ligue 1/gi, 'Fransk toppfotball');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
