const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const json = require('json-update');

const version = argv.v;

json.update('package.json', { version })
