import fs from 'fs'

export const handler = async (event, context) => {
    // const actionName = event.action_name;
    const actionName = "build-contract-request";

    if (actionName === "retrieve-property-data") {
        return await getPropertyDetails(event.parameters);
    }

    if(actionName === "build-contract-request") {
        return await mapContractFields(event.parameters);
    }

    if (actionName === "create-contract-submission") {
        return await createContract(event.parameters);
    }

    return {
        error: "Unknown action_name"
    };
};


// --------------------- ACTION FUNCTIONS ---------------------

const getPropertyDetails = async (parameters) => {
    const address = parameters.address;

    const url = `https://api.rentcast.io/v1/listings/sale?address=${encodeURIComponent(address)}&status=Active&limit=5`;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "X-Api-Key": process.env.rentCastAPIKey
        }
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json();
        parameters.propertyDetails = data;
        return {
            response: data
        };

    } catch (error) {
        return {
            error: error.message
        };
    }
};

const mapContractFields = async (parameters) => {
    // const propertyDetailsObj = parameters.propertyDetails;
    // const newContractObj = parameters.contractFields;

    const propertyDetailsObj = JSON.parse(fs.readFileSync('SAMPLE_rentcast_response.json', 'utf8'));
    const newContractObj = JSON.parse(fs.readFileSync('request_template_docuSeal.json', 'utf8'));


    const mapping = new Map([
        ["streetAddress", "addressLine1"],
        ["city", "city"],
        ["county", "county"],
    ])
    // const val = "streetAddress"
    // newContractObj.submitters[0].values[val] = propertyDetailsObj[0][mapping.get("streetAddress")]

    mapping.forEach (function(value, key) {
        newContractObj.submitters[0].values[key] = propertyDetailsObj[0][value]
    })

    newContractObj.submitters[0].values["listingBrokerage"] = propertyDetailsObj[0]["listingOffice"]["name"]


    // for map in mapping {
    //     newContractObj.submitters[0].values[map[1]] = propertyDetailsObj[0][map[0]]
    // }


    // const mappedFields = contractFields.map((field) => {
    //     const fieldName = field.name;
    //     const fieldValue = propertyDetails[0][fieldName];
    //     return {
    //         name: fieldName,
    //         value: fieldValue
    //     };
    // });

    // parameters.mappedFields = mappedFields;
    return {
        response: newContractObj
    };
};


const createContract = async (parameters) => {
    requestBody = parameters.mappedFields

    try{
        const url = "https://api.docuseal.com/submissions";
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "X-Auth-Token": process.env.docuSealAPIKey
            },
            body: JSON.stringify(requestBody)
        };
        const res = await fetch(url, options)
    } catch (error) {
        return {
            error: error.message
        };
    }
};
