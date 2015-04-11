	var mainNavCrops = document.getElementById('main-nav-crops'),
	mainNavMonths = document.getElementById('main-nav-months'),
	svgSow = document.getElementById('sow'),
	svgHarvest = document.getElementById('harvest'),
	menuCrops = document.getElementById('menu-crops'),
	menuMonths = document.getElementById('menu-months'),
	menuCloseCrops = document.getElementById('close-menu-crops'),
	menuCloseMonths = document.getElementById('close-menu-months'),
	monthsFormHeader = document.getElementById('months-form-header'),
	monthFormTitle = document.getElementById('months-form-title'),
	cropsItemsHolder = document.getElementById('menu-crops-items-holder'),
	prevMonth = document.getElementById('months-form-left'),
	nextMonth = document.getElementById('months-form-right'),
	btnInside = document.getElementById('months-form-btn-inside'),
	btnOutside = document.getElementById('months-form-btn-outside'),
	btnHarvest = document.getElementById('months-form-btn-harvest'),
	selectedCropName = '',
	selectedCropInside = '',
	selectedCropOutside = '',
	selectedCropHarvest = '',
	selectedMonthId = '',
	whatFunction = 'inside'
	;

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var taskFilter = ['inside', 'outside', 'harvest'];
var vegData = [
	{
		name: "Asparagus",
		inside: "011100000000",
		outside: "000010000000",
		harvest: "000011000000"
	},
	{
		name: "Aubergine",
		inside: "011100000000",
		outside: "000011000000",
		harvest: "000000111100"
	},
	{
		name: "Beetroot",
		inside: "000000000000",
		outside: "001111000000",
		harvest: "000001111100"
	},
	{
		name: "Broccoli",
		inside: "011100000000",
		outside: "000111000000",
		harvest: "000000011000"
	},
	{
		name: "Broad-Bean",
		inside: "110000000001",
		outside: "001110000000",
		harvest: "000011110000"
	},
	{
		name: "Cabbage",
		inside: "000000000000",
		outside: "000001100000",
		harvest: "110000000011"
	},
	{
		name: "Carrot",
		inside: "000000000000",
		outside: "011111110000",
		harvest: "000001111110"
	},
	{
		name: "Cauliflower",
		inside: "000000000000",
		outside: "000010000000",
		harvest: "000000001100"
	},
	{
		name: "Courgette",
		inside: "000110000000",
		outside: "000011000000",
		harvest: "000000111100"
	},
	{
		name: "Chilli",
		inside: "011100000000",
		outside: "000000000000",
		harvest: "000000011100"
	},
	{
		name: "French-Bean",
		inside: "000110000000",
		outside: "000011000000",
		harvest: "0000001111000"
	},
	{
		name: "Garlic",
		inside: "000000000000",
		outside: "111100000000",
		harvest: "000001100000"
	},
	{
		name: "Leek",
		inside: "110000000000",
		outside: "001100000000",
		harvest: "110000001111"
	},
	{
		name: "Lettuce",
		inside: "000000000000",
		outside: "001111110000",
		harvest: "000111111100"
	},
	{
		name: "Onion",
		inside: "110000000000",
		outside: "001100000000",
		harvest: "000000011000"
	},
	{
		name: "Pepper",
		inside: "001110000000",
		outside: "000000000000",
		harvest: "000000111100"
	},
	{
		name: "Parsnip",
		inside: "000000000000",
		outside: "011110000000",
		harvest: "110000000111"
	},
	{
		name: "Potato",
		inside: "000000000000",
		outside: "000100000000",
		harvest: "000000011100"
	},
	{
		name: "Peas",
		inside: "000000000000",
		outside: "001111100000",
		harvest: "000001111110"
	},
	{
		name: "Pumpkin",
		inside: "000000000000",
		outside: "000111000000",
		harvest: "000000011110"
	},
	{
		name: "Rhubarb",
		inside: "000000000000",
		outside: "011100000000",
		harvest: "000011110000"
	},
	{
		name: "Rocket",
		inside: "000000000000",
		outside: "000111110000",
		harvest: "000011111100"
	},
	{
		name: "Spinach",
		inside: "000000000000",
		outside: "001111110000",
		harvest: "000011111100"
	},
	{
		name: "Sweet-Potato",
		inside: "000000000000",
		outside: "000110000000",
		harvest: "000000001100"
	},
	{
		name: "Sweet-Corn",
		inside: "001110000000",
		outside: "000010000000",
		harvest: "000000011000"
	},
	{
		name: "Tomato",
		inside: "111100000000",
		outside: "000110000000",
		harvest: "000001111100"
	},
	{
		name: "Watercress",
		inside: "000000000000",
		outside: "001111110000",
		harvest: "000111111110"
	}
];


/************ MENUS EVENT LISTENERS ************/

mainNavCrops.addEventListener('click', function(){
	menuOpen(event, 'buttonClick');

});

mainNavMonths.addEventListener('click', function(){
	menuOpen(event, 'buttonClick');
});

menuCloseCrops.addEventListener('click', function(){
	menuOpen(event, 'buttonClick');
});

menuCloseMonths.addEventListener('click', function(){
	menuOpen(event, 'buttonClick');
});


btnInside.addEventListener('click', function(){
	changeFunction(this, 'inside');
});

btnOutside.addEventListener('click', function(){
	changeFunction(this, 'outside');
});

btnHarvest.addEventListener('click', function(){
	changeFunction(this, 'harvest');
});

/************ CROP ITEM EVENT LISTENERS ************/
var cropSelection = document.getElementsByClassName('menu-crops-item');
for( i=0; i<cropSelection.length; i++) {

	cropSelection[i].addEventListener('click', function(){

		selectedCropName = String(this.innerHTML)

		.split('_')[1] //splits at first _ character and takes 2nd half
		.split('.')[0]//splits at first . character and takes 1st half
		;

		processCrop(selectedCropName);

	});

}


/************ MONTHS ITEM EVENT LISTENERS ************/
var monthSelection = document.getElementsByClassName('menu-months-item');
for( i=0; i<monthSelection.length; i++) {

	monthSelection[i].addEventListener('click', function(){

		//GET MONTH NUMBER
		selectedMonthId = parseInt(
			this.getElementsByTagName('img')[0]
			.className.split('-')[1]
		);

		//OPEN MONTH FORM
		menuOpen('menu-crops', 'fromMenu');
		menuOpen('menu-months', 'fromMenu');

		//SHOW MONTH HEADER AND ADD MARGIN TO LIST ITEMS
		addMonthHeader(true);

		//SHOW RELAVANT CROPS
		displayCrops (selectedMonthId);
	
		
	});

}


prevMonth.addEventListener('click', function() { moveMonth(-1); });

nextMonth.addEventListener('click', function() { moveMonth(1); });



/************ CLICK CROPS ************/

function processCrop(selectedCropName) {

	function makeActive(chosenRingActive, ringPrefix) {
		chosenRingActive.classList.remove("svg-inactive");
		chosenRingActive.classList.add(ringPrefix + "-active");
	}


	function makeInactive(chosenRingInactive) {
		chosenRingInactive.classList.add("svg-inactive");
		chosenRingInactive.classList.remove("harvest-active");
	}

	//hide menu
	menuCrops.classList.toggle( 'visible' );

	//search through vegData to find matching name
	for( i=0; i<vegData.length; i++) {

		if (selectedCropName == vegData[i].name) {

					selectedCropInside = vegData[i].inside;
					selectedCropOutside = vegData[i].outside;
					selectedCropHarvest = vegData[i].harvest;

					for( x=0; x< 12; x++) {

						var selectedInsideSegment = document.getElementById('sow-inside-' + x);
						var selectedOutsideSegment = document.getElementById('sow-outside-' + x);
						var selectedHarvestSegment = document.getElementById('harvest-' + x);

						if (selectedCropInside.charAt(x) == "1") {
							makeActive(selectedInsideSegment, "sow-inside");
						}
						else {
							makeInactive(selectedInsideSegment);
						}

						if (selectedCropOutside.charAt(x) == "1") {
							makeActive(selectedOutsideSegment, "sow-outside" );
						}
						else {
							makeInactive(selectedOutsideSegment);
						}

						if (selectedCropHarvest.charAt(x) == "1") {
							makeActive(selectedHarvestSegment);
						}
						else {
							makeInactive(selectedHarvestSegment, "harvest");
						}

			}

			//load main central image

			document.getElementById('main-crop-holder')
			.innerHTML = "<img src='img/crops-coloured/crops_" + vegData[i].name + ".svg'/> <h3>" + vegData[i].name + "</h3>";

		}

	}

} // /processCrops




/************ OPEN MENUS FUNCTION ************/

function menuOpen( menuChoice, type ) {

	addMonthHeader(false);
	var menuSelection = '';

	if (type == 'buttonClick') {

		//reset any hidden crops
		for( i=0; i<cropSelection.length; i++) { 
			cropSelection[i].classList.remove('hide');	
		}

		var mainMenuId = menuChoice.srcElement.id
		.replace( 'main-nav-','' )
		.replace( 'close-menu-','' );

		menuSelection = document.getElementById( 'menu-' + mainMenuId );
	}
	
	else if (type == "fromMenu") {
		menuSelection = document.getElementById( menuChoice );
	}
		menuSelection.classList.toggle( 'visible' );
}



/************ ADD MONTH HEADER NAV TO CROPS PAGE ************/
function addMonthHeader(openHeader) {
	if (openHeader === true) {

		monthsFormHeader.style.display = 'block';
		cropsItemsHolder.className += ' menu-items-holder-margin';
	}

	else {
		monthsFormHeader.style.display = 'none';
		cropsItemsHolder.className = cropsItemsHolder.className.replace(' menu-items-holder-margin', '');
	}
}



/************ FILTER CROPS BY MONTH DATA ************/

function displayCrops(selectedMonthId) {  

	//SET TITLE TO SELECTED MONTH
		monthFormTitle.innerHTML = monthNames[selectedMonthId];

		//HIDE UNWANTED CROPS
		for( i=0; i<cropSelection.length; i++) {

				if ( vegData[i][whatFunction].charAt(selectedMonthId) == '0'){
					cropSelection[i].classList.add('hide');
				}
				else{
					cropSelection[i].classList.remove('hide');	
				}
		}
	}


/************ MOVE MONTH ************/

function moveMonth(direction) {
	
	//adjust month number
	selectedMonthId = selectedMonthId + direction;
	//looping
	if (selectedMonthId < 0) {
		selectedMonthId = 11;
	}
	else if (selectedMonthId > 11) {
		selectedMonthId = 0;
	}
	//display information
	displayCrops (selectedMonthId);
	

}


function changeFunction(thisBtn, viewType) {
	//set function according to button
	whatFunction = viewType;

	//change active button
	btnInside.classList.remove('active');
	btnOutside.classList.remove('active');
	btnHarvest.classList.remove('active');

	thisBtn.classList.add('active');

	//reload crops but stay on same month
	moveMonth(0);
}


/************ set function to indoor first for month selection ************/

var whatFunctionButton = document.getElementById('months-form-btn-' + whatFunction);

whatFunctionButton.classList.add('active');

