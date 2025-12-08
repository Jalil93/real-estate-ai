import { ApifyClient } from 'apify-client';
import fs from 'fs';




export const getZillowDetailsByAddress = async (address) => {
// Rest of your code remains the same...
    const client = new ApifyClient({
        token: process.env.APIFY_TOKEN
    });

    // Starts an Actor and waits for it to finish
    const { defaultDatasetId } = await client.actor('maxcopell/zillow-detail-scraper').call({
        "addresses": [
            address
        ],
        "extractBuildingUnits": "all",
        "propertyStatus": "FOR_SALE",
        "startUrls": []
    });

// Lists items from the Actor's dataset
    const { items } = await client.dataset(defaultDatasetId).listItems();

    const jsonOutput = JSON.stringify(items)

    const fileNo = Math.floor(Math.random()*1000)
    const filePath = `zillowScraperOutput-${fileNo}.json`;

    fs.writeFile(filePath, jsonOutput, (err) => {
        if (err) {
            console.error('Error writing JSON to file:', err);
        } else {
            console.log(`JSON data successfully written to ${filePath}`);
        }
    });

    return jsonOutput
}