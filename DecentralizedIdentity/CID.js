import { CID } from 'multiformats/cid';
import { createHelia } from 'helia'
import { json } from '@helia/json'



const createCid = async (publicKey) => {
    try {
        const helia = await createHelia()
        const j = json(helia)
        const IPFS_Data = {
            'PublicKey': publicKey,
            'Access': [],
            'Denied': []
        }
        const userCid = await j.add(IPFS_Data);
        console.log(userCid.toString());
        return userCid;
    }
    catch (error) {
        console.log('faced some error while creating the initial cid', error);
        return ''
    }
}

// function to add the application name in the access
const addInAccess = async (cid, name) => {
    try {
        const helia = await createHelia();
        const j = json(helia);
        const json_data = await j.get(CID.parse(cid));
        const accessList= json_data.Access;
        accessList.push(name);

        // upload the new data with the new name 
        const new_cid = await cid.add(json_data);
        return new_cid;
    }
    catch (error) {
        console.log('faced some error while creating the initial cid', error);
        return ''
    }
}


// function to add in denied list
const addInDenied = async (cid, name) => {
    try {
        const helia = await createHelia();
        const j = json(helia);
        const json_data = await j.get(CID.parse(cid));
        const deniedList = json_data.Denied;
        deniedList.push(name);

        // upload the new data with the new name 
        const new_cid = await cid.add(json_data);
        return new_cid;
    }
    catch (error) {
        console.log('faced some error while creating the initial cid', error);
        return ''
    }
}

// function to retrieve the list 
const getAllowList = async (cid) => {
    try {
        const helia = await createHelia();
        const j = json(helia);
        const json_data = await j.get(CID.parse(cid));
        const accessList= json_data.Access;
        return accessList;
    }
    catch (error) {
        console.log('error retrieving the list for the access members', error);
        return []
    }
}

const getDeniedList = async (cid) => {
    try {
        const helia = await createHelia();
        const j = json(helia);
        const json_data = await j.get(CID.parse(cid));
        const deniedList = json_data.Denied;
        return deniedList;
    }
    catch (error) {
        console.log('error retrieving the list for the access members', error);
        return []
    }
}

module.exports = {
    createCid,
    addInAccess,
    addInDenied,
    getAllowList,
    getDeniedList
}