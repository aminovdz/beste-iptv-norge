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

    // Manual contextual replacements first
    content = content.replace(/både TV2, Viaplay og Discovery/g, 'flere dyre strømmetjenester');
    content = content.replace(/TV2, Viaplay og Discovery/g, 'flere dyre strømmetjenester');
    content = content.replace(/Netflix, Disney\+, Viaplay/g, 'de store strømmetjenestene');
    content = content.replace(/TV2 og Viaplay/g, 'norske kanaler');
    content = content.replace(/Netflix og HBO/g, 'de største internasjonale aktørene');
    content = content.replace(/Premier League-kampene/gi, 'de engelske toppkampene');
    content = content.replace(/Premier League-kamper/gi, 'engelske toppkamper');
    content = content.replace(/Premier League/gi, 'Engelsk toppfotball');
    content = content.replace(/Champions League/gi, 'Europeisk toppfotball');
    content = content.replace(/Eliteserien/gi, 'Norsk toppfotball');
    content = content.replace(/Formel 1/gi, 'Motorsport');
    content = content.replace(/UFC/g, 'Kampsport');
    content = content.replace(/Viaplay/gi, 'norske strømmetjenester');
    content = content.replace(/Netflix/gi, 'premium VOD');
    content = content.replace(/TV2/g, 'norsk TV');
    content = content.replace(/Disney\+/gi, 'barnekanaler');
    content = content.replace(/HBO/g, 'premium serier');
    content = content.replace(/Discovery/gi, 'dokumentarkanaler');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
