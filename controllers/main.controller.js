// NOTE: Can modify this to many controllers
const loader = require('../helpers/loader');

var cachedData = null;

async function loadData() {
    if(!cachedData) {
        cachedData = await loader.load();
    }
    return cachedData;
}

module.exports = {

    index: async (req, res, next) => {
        var data = await loadData();
        var perCapitaData = data.gdpPerCapitaData;
        var colorData = {};
        var gdpData = {};
        var years = Object.keys(perCapitaData);
        var count = 0;
        for (var p in perCapitaData) {
            if (perCapitaData.hasOwnProperty(p)) {
                count++;
            }
        }
        res.render('pages/index', {title: 'GDP Visualiser', actualData: data, count: count, years: years});
    },

    load: async (req, res, next) => {
        let data = await loadData();
        res.send(data);
    },

    countryData: async(req, res, next) =>{

        country = req.query.country;
        var data = await loadData();
        var perCapitaData = data.gdpPerCapitaData;
        var gdpCountryData = {};
        var years = Object.keys(perCapitaData);
        var countryName = "";
        years.forEach((year) => {
            perCapitaData[year].forEach((country) => {
                if (country.code == req.query.country){
                    countryName = country.name;
                    gdpCountryData = {...gdpCountryData, [year]: country.gdp}
                }
            });
        })
        //console.log(gdpCountryData);
        res.render('pages/countryData', {
            title: countryName,
            data: gdpCountryData
        });
    },

    exchangeRate: async(req, res, next) => {
        var data = await loadData();
        var countryNames = [];
        var exchnageRateData = data.exchangeRateData;
        var years = ['x'];
        for(let year in exchnageRateData[0].years){
            years.push((exchnageRateData[0].years[year]));
        }
        var NZL = "NZL";
        var data = [];

        if(req.query.country == undefined){
            req.query.country = "AUS";
        }

        for(let country in exchnageRateData) {
            countryNames.push(exchnageRateData[country].countryName);

            var tempData = [];
            tempData.push(exchnageRateData[country].countryName);
            for(var i in exchnageRateData[country].values){
                tempData.push(exchnageRateData[country].values[i]);
            }
            data.push(tempData);

        }


        res.render('pages/exchangeRate', {
            title: req.query.country + " and NZL Exchange Rate Data",
            years: years,
            countryNames: countryNames,
            data: data
        });
    },
    countryRanking: async(req, res, next) => {
        console.log();
        var yearTwoReq = 2017;
        var yearOneReq = 2016;
        var data = await loadData();
        var perCapitaData = data.gdpPerCapitaData;
        var years = Object.keys(perCapitaData);

        res.render('pages/countryRanking', {
            title: "Country Ranking based on GDP change",
            data: perCapitaData,
            years: years
        });
    }

};
