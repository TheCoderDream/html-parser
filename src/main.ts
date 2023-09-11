import fs = require('fs');
import readline = require('readline');
import {parseHtml} from './symbol-html-parser'; // Update the path accordingly

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const args = process.argv.slice(2);

if (args.length === 1) {
    const filePath = args[0];
    const html = fs.readFileSync(filePath, 'utf8');
    const result = parseHtml(html);
    console.log(JSON.stringify(result, null, 2));
} else {
    console.log('Usage: node server.js <html-file-path>');
    process.exit(1);
}


rl.close();
