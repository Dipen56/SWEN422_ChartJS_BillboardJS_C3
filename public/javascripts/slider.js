var sheet = document.createElement('style'),
	$rangeInput = $('#slider-input'),
	prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

var getTrackStyle = function (el) {
	var curVal = el.value,
			val = (curVal - 1) * 20,
			style = '';

	// Set active label
	// $('.range-labels li').removeClass('active selected');

	// var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');

	// curLabel.addClass('active selected');
	// curLabel.prevAll().addClass('selected');

  updateGraph(curVal - 1)
	document.getElementById('yearDisplay').innerHTML = 1960 + (curVal - 1);
	return style;
}

$rangeInput.on('input', function () {
	sheet.textContent = getTrackStyle(this);
	pause();
});

var setSliderYear = function(year) {
	document.getElementById("slider-input").value = `${year}`;
	document.getElementById('yearDisplay').innerHTML = 1960 + (year);
}


// Change input value on label click
// $('.range-labels li').on('click', function () {
// 	var index = $(this).index();
// 	$rangeInput.trigger('input').val(index + 1);
// 	sheet.textContent = getTrackStyle($($(this).parent().siblings()[0]).children()[0]);
// });
