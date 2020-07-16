const to = require('await-to-js').default;
const geocoder = require('../utils/geocoder');
const GlovoRequestProvider = require('../utils/glovoRequestProvider');
const glovoRequestProvider = new GlovoRequestProvider();

class AfterGlovoController {
    async getOrder(req, res, next){
        const {fromAddress, toAddress, desc} = req.body;

        const[fromAdressDetailsError, fromAdressDetails] = await to(
            geocoder.geocode(
                {
                    address: fromAddress,   
                    countryCode: 'ua',
                    minConfidence: 0.5,
                    limit: 5
                })
        )
        if(fromAdressDetailsError) return res.status(400).send(fromAdressDetailsError);
        
        const[toAdressDetailsError, toAdressDetails] = await to(
            geocoder.geocode(
                {
                    address: toAddress,   
                    countryCode: 'ua',
                    minConfidence: 0.5,
                    limit: 5
                })
        )
        if(toAdressDetailsError) return res.status(400).send(toAdressDetailsError);

        const request = {
            description: desc,
            addresses: [
                {
                    type: 'PICKUP',
                    lat: fromAdressDetails[0].latitude,
                    lon: fromAdressDetails[0].longitude,
                    label: fromAddress
                },
                {
                    type: 'DELIVERY',
                    lat: toAdressDetails[0].latitude,
                    lon: toAdressDetails[0].longitude,
                    label: toAddress
                }
            ]
        }

        const orderEstimate = await glovoRequestProvider.orderEstimate(request);

        const orderEstimateWithDiscount = {
            total: {
                currency: orderEstimate.total.currency,
                total: (orderEstimate.total.amount * 0.8) 
            }
        } 

        res.status(200).send({orderEstimate, orderEstimateWithDiscount});
    }
}


module.exports = new AfterGlovoController();