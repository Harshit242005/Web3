// // writing the IPFS CORE script
// import * as IPFS from 'ipfs-core';
// import fs from 'fs';

// const AddAccess = async (applicationName) => {
//     // Read the Access.json file
//     fs.readFile('Access.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading Access.json:', err);
//             return;
//         }

//         try {
//             // Parse the JSON data
//             const jsonData = JSON.parse(data);

//             // Check if the applicationName already exists in the array
//             if (!jsonData.Access.includes(applicationName)) {
//                 // Add the applicationName to the array
//                 jsonData.Access.push(applicationName);

//                 // Write the updated array back to the file
//                 fs.writeFile('Access.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
//                     if (err) {
//                         console.error('Error writing Access.json:', err);
//                         return;
//                     }
//                     console.log('Access added successfully:', applicationName);
//                 });
//             } else {
//                 console.log('Application already has access:', applicationName);
//             }
//         } catch (error) {
//             console.error('Error parsing JSON data:', error);
//         }
//     });

//     // deploy the file and get the new cid and return it 
//     const node = await IPFS.create();
//     // Read the content of Access.json file
//     const fileContent = fs.readFile('Access.json', 'utf8');

//     // Add the file to IPFS
//     const { cid } = await node.add({
//         path: 'Access.json',
//         content: fileContent, // Provide the file content
//     });
//     return cid;
    
// };



import { CID } from 'multiformats/cid';
import { createHelia } from 'helia'
import { json } from '@helia/json'

const helia = await createHelia()
const j = json(helia)

const myImmutableAddress = await j.add({ hello: 'world' })
console.log(myImmutableAddress.toString());

const data = await j.get(CID.parse('bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea'))
console.log(data);

// async function main() {
//     const node = await IPFS.create();
//     const fileAdded = await node.add({
//         path: "hello.txt",
//         content: "Hello World 101",
//     });

//     console.log("Added file:", fileAdded.path, fileAdded.cid);

//     const decoder = new TextDecoder()
//     let text = ''

//     for await (const chunk of node.cat(fileAdded.cid)) {
//         text += decoder.decode(chunk, {
//             stream: true
//         })
//     }

//     console.log("Added file contents:", text);
// }




// console.log(AddAccess('voting application'));