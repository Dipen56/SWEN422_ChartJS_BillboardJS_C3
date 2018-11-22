const csv = require('csvtojson');
const filepath = __dirname + '/data/gdp-per-capita.csv';

exports.load = async () => {
    let json = await csv().fromFile(filepath);
    let data = transform(json);
    return data;
}

// year -> (name, code, gdp)
function transform (json) {
    const minYear = 1960;
    const maxYear = 2017;
    
    const years = {}; // years
    
    let mapToYear = (entry, minYear, maxYear) => {
        let name = entry['Country Name'];
        let code = entry['Country Code'];
        for(let i = minYear; i <= maxYear; i++){
            if(!years[i]){
                years[i] = [];
            }
            years[i].push({ name, code, gdp: parseFloat(entry[i])});
        }
    }
    
    for(let entry of json){
        mapToYear(entry, minYear, maxYear);
    }
    return years;
}