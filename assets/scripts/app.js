
	var elBody = document.getElementsByTagName("body")[0];
	var elSections = document.getElementsByTagName("section");
	var elModal = document.getElementById("modal");
	var closeBtn = document.getElementsByClassName("modal-close");
	var modalContent = document.getElementById("modal-content")
	var projBtn = document.querySelectorAll(".portfolio-item .btn");
	var navIcon = document.getElementById("nav-icon");
	var ul = document.getElementsByClassName("nav-links")[0];

	//	Loop to add EventListener to node list
	function addEventListenerList(list, event, fn) {
    	for (var i = 0, len = list.length; i < len; i++) {
    	    list[i].addEventListener(event, fn, false);
    	}
	}

	function navDropDwn () {		
		if(ul.style.display !== 'block'){
			Velocity(ul, "slideDown", 800);	
			navIcon.setAttribute("src", "assets/images/icons/nav-open.svg");
		} else {
			Velocity(ul, "slideUp", 800);
			navIcon.setAttribute("src", "assets/images/icons/nav-closed.svg");
		}	
	}

	function browserWidth() {
		var intViewportWidth = window.innerWidth;
		return intViewportWidth;
	}



	
	//	AJAX Request for Portfolio Proj. HTML
	function request(id) {
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

	//	Call Modal 'Open' State
	function modalOpen(e) {
		//	Get id value from data-get-id attr on project btn
		var id = this.getAttribute("data-get-id");
		console.log(id);
		//	AJAX GET Request function
		request(id);
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

	function correctNavDisplay() {
		var isWidth = browserWidth(); 
		var display = ul.style.display;
		if(isWidth >= 499) {
			ul.style.display = 'flex';
		} else if (display = 'flex') {
			ul.style.display = 'none';
			navIcon.setAttribute("src", "assets/images/icons/nav-closed.svg");
		}
	}

	//	Attach EventListener to Proj Btns
	addEventListenerList(projBtn, "click", modalOpen);
	
    navIcon.addEventListener("click", navDropDwn, false);

	window.onresize = function () {
		correctNavDisplay();
	}
	



