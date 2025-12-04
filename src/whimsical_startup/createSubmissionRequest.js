import { getZillowDetailsByAddress } from "./api/apifyZillowScraper.js";
import { getRealtorByName } from "./api/apifyRealtorScraper.js";
import { getRentCastDetailsByAddress } from "./api/rentCastRequest.js";
import fs from "fs";

const inputAddress = '8350 Greensboro Dr APT 517, Mc Lean, VA 22102';
const realtorName = 'Arman Nikmorad';

const createSubmissionBody = async (address, realtorName) => {
    const now = new Date()

    const zillowDetails = await getZillowDetailsByAddress(address);
    const realtor = await getRealtorByName(realtorName);
    const rentcast = await getRentCastDetailsByAddress(address);

    const submissionBody = {
        zillowDetails,
        realtor,
        rentcast,
        timestamp: now.toString()
    };

    const fileNo = 'output' + now.toString().replace(/[^a-zA-Z0-9]/g, '').substring(3, 18);
    const filePath = process.cwd()+'/output/'+fileNo


    fs.writeFile(filePath, JSON.stringify(submissionBody, null, 2), (err) => {
        if (err) {
            console.error('Error writing JSON to file:', err);
        } else {
            console.log(`JSON data successfully written to ${filePath}`);
        }
    });

    return submissionBody;
};

createSubmissionBody(inputAddress, realtorName);