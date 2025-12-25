import { getZillowDetailsByAddress } from "./api/apifyZillowScraper.js";
import { getRealtorByName } from "./api/apifyRealtorScraper.js";
import { getRentCastDetailsByAddress } from "./api/rentCastRequest.js";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

const inputAddress = '123 Main St.';
const realtorName = 'John Doe';

const createSubmissionBody = async (address, realtorName) => {
    const now = new Date()

    const zillowDetails = await getZillowDetailsByAddress(address);
    const realtor = await getRealtorByName(realtorName);
    const rentcast = await getRentCastDetailsByAddress(address);

    let submissionBody = fs.readFile('src/whimsical_startup/fields.json');

    submissionBody = JSON.parse(submissionBody);

    submissionBody['addressLine1'] = rentcast[0].addressLine1;
    submissionBody['city'] = rentcast[0].city;
    submissionBody['zipCode'] = rentcast[0].zipCode
    submissionBody['taxMapId'] = rentcast[0].parcelId || rentcast[0].resoFacts.parcelNumber
    submissionBody['county'] = rentcast[0].county

    submissionBody['hoa'] = 'false'
    for (fact in zillowDetails[0].resoFacts.atAGlanceFacts) {

        fact['factLabel'] === 'Type' ? submissionBody['subdivision_or_condominium'] = fact['factValue'] : null;

        (fact['factLabel'] === 'HOA') && (String(fact['factValue'])) !== 'None' ?  submissionBody['hoa'] = 'true' : null;

        if (fact['factLabel'] === 'Year Built') {
            parseInt(fact['factValue']) >= 1978 ? submissionBody['yearBuiltForLead1978'] = 'builtOnOrAfter1978': submissionBody['yearBuiltForLead1978'] = 'builtBefore1978';
        }

        if (fact['factLabel'] === 'Heating') {
            submissionBody['heating'] = 'electric';
            String(fact['factValue']).includes('Natural Gas') ? submissionBody['heating'] = 'gas': null;
            String(fact['factValue']).includes('Heat Pump') ? submissionBody['heating'] = 'heat pump': null;
            String(fact['factValue']).includes('oil') ? submissionBody['heating'] = 'oil': null;
            String(fact['factValue']).includes('other') ? submissionBody['heating'] = 'other': null;
        }

        if (fact['factLabel'] === 'Cooling') {
            submissionBody['airConditioning'] = 'electric';
            String(fact['factValue']).includes('Heat Pump') ? submissionBody['airConditioning'] = 'heat pump': null;
            String(fact['factValue']).includes('Natural Gas') ? submissionBody['airConditioning'] = 'gas': null;
            String(fact['factValue']).includes('oil') ? submissionBody['airConditioning'] = 'oil': null;
            String(fact['factValue']).includes('other') ? submissionBody['airConditioning'] = 'other': null;
        }

    }

    submissionBody['condo'] = 'false'
    zillowDetails[0].resoFacts.homeType === 'Condo' ? submissionBody['condo'] = 'true' : null;











    // const submissionBody = {
    //     zillowDetails,
    //     realtor,
    //     rentcast,
    //     timestamp: now.toString()
    // };

    const fileNo = 'output_' + now.toString().replace(/[^a-zA-Z0-9]/g, '').substring(3, 18);
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

await createSubmissionBody(inputAddress, realtorName);