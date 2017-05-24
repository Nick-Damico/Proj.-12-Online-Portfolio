
	var elBody = document.getElementsByTagName("body")[0];
	var elSections = document.getElementsByTagName("section");
	var elModal = document.getElementById("modal");
	var closeBtn = document.getElementsByClassName("modal-close");
	var modalContent = document.getElementById("modal-content")
	var projBtn = document.querySelectorAll(".portfolio-item .btn");
	var navIcon = document.getElementById("nav-icon");
	var ul = document.getElementsByClassName("nav-links")[0];
	var navLi = document.querySelectorAll('.nav-links li');
	var introHeader = document.querySelector('.intro-header');


	///////////////////////////////////////////////////////////
	//	FUNTIONS FOR NAVIGATION
	///////////////////////////////////////////////////////////

	//	Animates Navigation on 'click' of hamburger icon
	function navDropDwn () {		
		if(ul.style.display !== 'block'){
			Velocity(ul, "slideDown", 800);	
			navIcon.setAttribute("src", "assets/images/icons/nav-open.svg");
		} else {
			Velocity(ul, "slideUp", 800);
			navIcon.setAttribute("src", "assets/images/icons/nav-closed.svg");
		}	
	}

	//	FIXES NAVIGATION DISPLAY PROP VALUE BUG
	//	CLICKING ON HAMBURGER NAV CAN CAUSE DISPLAY ISSUES ON BROWSER RESIZE
	function correctNavDisplay() {
		//	Get Current Viewport Width
		var isWidth = browserWidth(); 
		//	Get ul.nav-icons display value
		var display = ul.style.display;
		//	This corrects display value for drop down navigation
		if(isWidth >= 499) {
			ul.style.display = 'flex';
		} else if (display = 'flex') {
			ul.style.display = 'none';
			navIcon.setAttribute("src", "assets/images/icons/nav-closed.svg");
		}
	}

	//	Gets Current Width of viewport
	function browserWidth() {
		var intViewportWidth = window.innerWidth;
		return intViewportWidth;
	}



	///////////////////////////////////////////////////////////
	//	NAVIGATION SCROLL FUNCTION
	///////////////////////////////////////////////////////////

	function scroll(e) {
		if(e.target.innerHTML !== 'Blog') {
			e.preventDefault();
			var target = e.target;
			var targetId = target.getAttribute("href");
			var el = document.querySelector(targetId);
			// Velocity(modal, "fadeOut", 1000);
			Velocity(el, "scroll", { duration: 1200, offset: -45});
		}
	}


	
	///////////////////////////////////////////////////////////
	//	XMLHttpRequest Funtions
	///////////////////////////////////////////////////////////
	
	//	AJAX Request for Portfolio Proj. HTML
	function portfolioRequest(id) {
		//	Create XMLHttpRequest object
		var xhr = new XMLHttpRequest();
		//	Prepare Request
		xhr.open('GET', 'modal.html', true);

		//	When response has loaded
		xhr.onload = function() {
			//	Create DOMParser object
			var parser = new DOMParser();
			//	Parses HTML response to string of HTML
			var doc = parser.parseFromString(xhr.responseText, "text/html");
			//	Targets HTML div from response stores HTML
			var el = doc.getElementById(id).innerHTML;
			//	Appends HTML from request to Modal window
			modalContent.innerHTML = el;	
			addEventListenerList(closeBtn, "click", modalClose);		
		}
		//	Send Prepared Request
		xhr.send(null);
	}

	//	
	function treehouseRequest() {
		var xhr = new XMLHttpRequest();
		//	Request Profile Info from Treehouse.com
		xhr.open('GET', 'https://teamtreehouse.com/nicholasdamico.json', true);
		xhr.onload = function() {
			//	Get profile Response (object);
			var content = JSON.parse(xhr.responseText);
			//	Store Profile Skills and Points as Object
			var obj = content.points;
			buildSkillPoints(obj);
		}
		xhr.send(null);
	}

	function buildSkillPoints(obj) {
		var ul = document.getElementsByClassName("skills-list")[0];
		var item = '';
		var li = '';

		for(var prop in obj) {				
			 if(prop !== 'total' && obj[prop] !== 0) {
			 	item += '<li>';
			 	item += prop + ' <i class="points">';
			 	item += obj[prop] + '</i></li>';
			 } else if( prop === 'total') {
			 	document.getElementsByClassName("total")[0].innerHTML = obj[prop];
			 }
		}
		ul.innerHTML = item;
	}



	///////////////////////////////////////////////////////////
	//	MODAL LIGHTBOX FUNCTIONS
	///////////////////////////////////////////////////////////


	//	Call Modal 'Open' State
	function modalOpen(e) {
		//	Get id value from data-get-id attr on project btn
		var id = this.getAttribute("data-get-id");
		console.log(id);
		//	AJAX GET Request function
		portfolioRequest(id);
		//	Add Velocity Animation
		Velocity(modal, "fadeIn", 1000);
		elBody.classList.toggle("modal-open");
	}

	//	Define close() method
	function modalClose() {
		console.log('click');
		//	Remove Modal from page
		Velocity(modal, "fadeOut", 1000);
		elBody.classList.toggle("modal-open");
		//	Remove Content from modal
	}



	///////////////////////////////////////////////////////////
	//	EVENT HANDLERS
	///////////////////////////////////////////////////////////

	//	Loop to add EventListener to node list
	function addEventListenerList(list, event, fn) {
    	for (var i = 0, len = list.length; i < len; i++) {
    	    list[i].addEventListener(event, fn, false);
    	}
	}

	//	Attach EventListener to Proj Btns
	addEventListenerList(projBtn, "click", modalOpen);
	
	//	Drop-down navigation 'hamburger' 'click' event
    navIcon.addEventListener("click", navDropDwn, false);

    //	Window Resize Event
    	//	Fixes navigation display bug from drop-down nav
	window.onresize = function () {
		correctNavDisplay();
	}

	//	Scroll 'click' Event
	addEventListenerList(navLi, 'click', function(e){
		scroll(e);
	});

	
	///////////////////////////////////////////////////////////
	//	Function Calls
	///////////////////////////////////////////////////////////


	treehouseRequest();


