const csv = require('csvtojson');
const filepath = __dirname + '/data/exchange-rate-data.csv';

exports.load = async () => {

    let json = await csv().fromFile(filepath);
    let data = transform(json);
    return data;
}

// year -> (name, code, gdp)
function transform (json) {
    // overall data structure
    let data = [];

    for (let entry of json ){
        //stores the country name.
        let countryName = entry['CountryName'];
        let countryCode = entry['CountryCode'];
        // stores the years.
        let years = [];
        //stores the values

        let values = [];
        let year = 1960;
        while(year <= 2017){
            values.push(parseFloat(entry[year]).toFixed(3));
            years.push(year);
            year = year + 1;
        }
        data.push({countryName, years, values, countryCode});
    }
    return data;
    //console.log(data);
}

//exports.load();