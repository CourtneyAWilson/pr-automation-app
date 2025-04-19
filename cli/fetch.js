#!/usr/bin/env node
const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('client', {
    alias: 'c',
    type: 'string',
    demandOption: true,
    description: 'Client identifier'
  })
  .argv;

const url = `http://localhost:8000/mentions/latest?client=${argv.client}`;
console.log(`📡  Fetching from ${url}`);

axios.get(url)
  .then(res => console.log(JSON.stringify(res.data, null, 2)))
  .catch(err => {
    console.error('Error fetching mentions:', err.message);
    process.exit(1);
  });
