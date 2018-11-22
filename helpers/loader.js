const gdpPerCapita = require('./transformations/gdp.transform');
const exchangeRate = require('./transformations/exchange-rate.transform');
exports.load = async () => {
    return {
        gdpPerCapitaData: await gdpPerCapita.load(),
        exchangeRateData: await exchangeRate.load()
    };
}


