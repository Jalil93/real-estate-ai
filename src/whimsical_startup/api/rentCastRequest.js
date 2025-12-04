export const getRentCastDetailsByAddress = async (address) => {

    const url = `https://api.rentcast.io/v1/listings/sale?address=${encodeURIComponent(address)}&status=Active&limit=5`;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "X-Api-Key": process.env.RENTCAST_TOKEN
        }
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json();
        // parameters.propertyDetails = data;
        return {
            response: data
        };

    } catch (error) {
        return {
            error: error.message
        };
    }
};