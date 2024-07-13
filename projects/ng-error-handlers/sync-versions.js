const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const fs = require('fs');
const path = require('path');

if (argv.version) {
    const packageJson = fs.readFileSync(path.resolve('./package.json'), 'utf-8');
    const data = JSON.parse(packageJson);
    data.version = argv.version;
    fs.writeFileSync(path.resolve('./package.json'), JSON.stringify(data), 'utf-8');
}