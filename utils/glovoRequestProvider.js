const btoa = require('btoa');
const fetch = require('node-fetch');

class GlovoRequestProvider{
    constructor(){
        this.apiKey = process.env.APIKEY;
        this.secretKey = process.env.APISECRET;
        this.apiUrl = 'https://api.glovoapp.com';
    }


    /**
     * Count order estimate
     * Docs Url: https://api-docs.glovoapp.com/b2b/index.html#estimate-order-price
     * Type: POST
     * APIURL: POST /fapi/v3/openOrders
     * @return {Promise<HttpRequest>}
     */
    async orderEstimate(request){
        const keyInBase64 = btoa(`${this.apiKey}:${this.secretKey}`);

        const res = await fetch(`${this.apiUrl}/b2b/orders/estimate`, {        
            method: 'POST',
            headers: 
            { 
                'Content-Type': 'application/json',
                'Authorization': `Basic ${keyInBase64}`
            },
            body: JSON.stringify(request),
        })

        return res.json();
    }
}

module.exports = GlovoRequestProvider;