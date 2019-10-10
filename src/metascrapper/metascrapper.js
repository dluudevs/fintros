const metascraper = require('metascraper')([
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-title')(),
])

const axios = require('axios')
const Qs = require('qs')
const proxyURL = 'https://proxy.hackeryou.com';

export const metascrape = async ({url}) => {
    if(url){
        // console.log(url)
        try {
            const response = await axios({
                url: proxyURL,
                method: 'GET',
                paramsSerializer: function (params) {
                    return Qs.stringify(params, { arrayFormat: 'brackets' });
                },
                params: {
                    reqUrl: url,
                }
            })

            const html = response.data
            const url = response.config.params.reqUrl

            const metadata = metascraper({ html, url })
            console.log(metadata)
        } catch (e) {}
    }
}