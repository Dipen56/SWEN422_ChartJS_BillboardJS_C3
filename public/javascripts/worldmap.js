var year = 1960;
var worldData = {};
var map;
var isPaused = false;

const getColor = (gdp) => {
    if (gdp > 0 && gdp < 500) {
        return "#fffba7";
    } else if (gdp > 501 && gdp < 1000) {
        return "#fbb42b";
    } else if (gdp > 1001 && gdp < 5000) {
        return "#e24000";
    } else if (gdp > 5001 && gdp < 20000) {
        return "#8f220a";
    } else if (gdp > 20001 && gdp < 100000000) {
        return "#4f0e00";
    }
    return "#abdda4";
}


actualData[year].forEach((country) => {
    worldData = {
        ...worldData,
        [country.code]: country
    }
});

exchangeRate.forEach((country) => {
    worldData[country.countryCode] = { ...worldData[country.countryCode],
        exchangeRate: country.values[year - 1960]
    }
});

map = new Datamap({
    element: document.getElementById('container'),
    responsive: true,
    data: worldData,
    geographyConfig: {
        popupTemplate: function (geography, data) { //this function should just return a string
            return '<div class="hoverinfo"><strong>' + geography.properties.name +
                '</strong></div>\n<div class="hoverinfo"><strong>GDP: ' + (data.gdp >= 0 ? data.gdp : 'undefined') + '</strong></div>' +
                '</strong></div>\n<div class="hoverinfo"><strong>Exchange Rate: ' + (data.exchangeRate >= 0 ? data.exchangeRate : 'undefined') + '</strong></div>';

        }
    },
    done: function (geography) {
        geography.svg.selectAll('.datamaps-subunit').on('click', function (geography1) {
            link = geography1.id;
            loadCountryData(link);
        })

        var zoom = d3.behavior.zoom().scaleExtent([1, 50]).on("zoom", redraw);
        var width = $('#container').width();
        var height = $('#container').height();
        console.log(width);
        geography.svg.call(zoom);

        function redraw() {
            var e = d3.event;
            var tx = Math.min(0, Math.max(e.translate[0], width - width * e.scale));
            var ty = Math.min(0, Math.max(e.translate[1], height - height * e.scale));
            zoom.translate([tx, ty]);
            geography.svg.selectAll("g").attr("transform", "translate(" + [tx, ty] + ")scale(" + d3.event.scale + ")");
        }

    }
});

function updateGraph(years) {
    let currentCountry1 = {}
    let colorData1 = {}
    actualData[year + years].forEach((country) => {
        colorData1 = { ...colorData1,
            [country.code]: { ...country,
                fillColor: getColor(country.gdp),
                gdp: country.gdp ? country.gdp : -1
            }
        };
    });
    exchangeRate.forEach((country) => {
        colorData1[country.countryCode] = { ...colorData1[country.countryCode],
            exchangeRate: country.values[years]
        }
    });
    map.updateChoropleth(colorData1);
}
updateGraph(57);


$('window').resize(function () {
    map.resize();
})

function pause() {
    isPaused = true;
    document.getElementById("play-btn").onclick = play;
    document.getElementById("play-btn-icon").className = "fa fa-play";;
}

function play() {
    isPaused = false;
    document.getElementById("play-btn").onclick = pause;
    document.getElementById("play-btn-icon").className = 'fa fa-pause';
}

function startShow() {

    setInterval(function () {
        if (isPaused) {
            return;
        }
        var counter = parseInt(document.getElementById("slider-input").value);
        counter = counter < 57 ? counter + 1 : 0;
        updateGraph(counter);
        setSliderYear(counter);
    }, 750);
}

startShow();

function loadCountryData(CountryCode) {
    var countryName = "";
    var dataParsed = ["GDP"];
    var xLabels = ["x"]
    var data = [];
    for (i = 1960; i >= 1960 && i <= 2017; i++) {
        xLabels.push(i);
        actualData[i].forEach((country) => {
            if (country.code == CountryCode) {
                dataParsed.push(country.gdp)
                countryName = country.name;
            }
        });
    }
    if (!addedLink) {
        var desiredLink = "#top";
        var desiredText = "Back to Map"
        $('<a href="' + desiredLink + '">' + desiredText + '</a>').appendTo($('#topButton'));
        addedLink = true;
    }
    document.getElementById("graphTitle").innerHTML = countryName;
    data.push(dataParsed);
    data.push(xLabels);
    drawGraph(data);
}

function drawGraph(dataToDraw) {
    console.log('drawing graph');
    if (chart == null) {
        chart = bb.generate({
            type: "line",
            bindto: "#lineChart",
            data: {
                x: "x",
                columns: dataToDraw
            },
            axis: {
                x: {
                    label: {
                        text: "Year",
                        position: "outer-center"
                    }
                },
                y: {
                    label: {
                        text: "GDP",

                    }
                }
            }
        });
    } else {
        chart.load({
            columns: dataToDraw
        });
    }
    window.scrollTo(0,document.body.scrollHeight);
}