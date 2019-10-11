const metascraper = require('metascraper')([
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-title')(),
])

const axios = require('axios')
const Qs = require('qs')
const proxyURL = 'https://proxy.hackeryou.com';


export const metascrape = async ({url: link}) => {
    try {
        const response = await axios({
            url: proxyURL,
            method: 'GET',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' });
            },
            params: {
                reqUrl: link,
            }
        })
        
        const html  = response.data;
        const url = response.config.params.reqUrl;
    
        const metadata = await metascraper({ html, url })
        if(metadata.description && metadata.image && metadata.title){
            // console.log(metadata)
            return metadata;
        }
    } catch (err) {
        // console.log(err)
    }
}