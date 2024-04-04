// import * as IPFS from 'ipfs-core';

// async function main() {
//   const node = await IPFS.create();
//   const version = await node.version();

//   console.log("Version:", version.version);

//   const fileAdded = await node.add({
//     path: "hello.txt",
//     content: "Hello World 101",
//   });

//   console.log("Added file:", fileAdded.path, fileAdded.cid);

//   const decoder = new TextDecoder()
//   let text = ''

//   for await (const chunk of node.cat(fileAdded.cid)) {
//     text += decoder.decode(chunk, {
//       stream: true
//     })
//   }

//   console.log("Added file contents:", text);
// }

// main();





// import { createHelia } from 'helia'
// import { strings } from '@helia/strings'

// const helia = await createHelia()
// const s = strings(helia)

// const myImmutableAddress = await s.add('hello world')

// console.log(await s.get(myImmutableAddress))







const fs = require('fs');
const path = require('path');

// Path to the build directory of your Truffle project
const buildDir = path.resolve(__dirname, '../build/contracts');

// Read all files in the build directory
fs.readdir(buildDir, (err, files) => {
    if (err) {
        console.error('Error reading build directory:', err);
        return;
    }

    const jsonFiles = files.filter(file => file === 'EmailVerification.json');

    // // Filter out JSON files
    // const jsonFiles = files.filter(file => file.endsWith('.json'));

    // Check if there are any JSON files
    if (jsonFiles.length === 0) {
        console.error('No JSON files found in the build directory.');
        return;
    }

    // Get the path to the first JSON file
    const firstJsonFile = jsonFiles[0];
    const filePath = path.join(buildDir, firstJsonFile);

    // Read the content of the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        try {
            // Parse the JSON content to extract the ABI
            const { abi } = JSON.parse(data);
            console.log(abi);
            // Log the ABI to the console
            // console.log('Type of ABI:', typeof abi);
          
        } catch (error) {
            console.error('Error parsing JSON content:', error);
        }
    });
});
