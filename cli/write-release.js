#!/usr/bin/env node
const axios = require('axios');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('client', { alias: 'c', type: 'string', demandOption: true })
  .option('title',  { alias: 't', type: 'string', demandOption: true })
  .argv;

const url = `http://localhost:8001/generate-release?client=${argv.client}&title=${encodeURIComponent(argv.title)}`;
console.log(`📡  Generating release at ${url}`);

axios.post(url)
  .then(res => console.log(res.data.body))
  .catch(err => {
    console.error('❌  Error generating release:');
    console.error('Message:', err.message);
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Body:', JSON.stringify(err.response.data, null, 2));
    }
    process.exit(1);
  });
