import { ApifyClient } from 'apify-client';
import readline from 'readline'

const client = new ApifyClient({
    token: process.env.APIFY_TOKEN
});

// let agentName = ""
// const rl = await readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// await rl.question('What is the realtor\'s name?  ', (answer) => {
//     console.log(`Entered: ${answer}!`);
//     agentName = answer
//     rl.close(); // Close the interface after getting the answer
// });


export const getRealtorByName = async (name) => {
    // Prepare Actor input
    const input = { "query": ["Jin Wickwire"], "search_type": "agent", "limit": 1 };

// Run the Actor and wait for it to finish
    const run = await client.actor("jupri/realtor-agents").call(input);

// Fetch and print Actor results from the run's dataset (if any)
    console.log('Results from dataset');
    console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    if(items.length === 0){
        throw Error('AGENT NOT FOUND!')
    }
    items.forEach((item) => {
        console.dir(item);
    });
    return items[0]
}
