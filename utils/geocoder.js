const NodeGeocoder = require('node-geocoder');
 
const options = {
  provider: 'opencage',
  apiKey: process.env.OPEN_CAGE_DATA_KEY,
  formatter: null 
}

module.exports = NodeGeocoder(options);