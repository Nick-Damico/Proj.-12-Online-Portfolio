
	var elBody = document.getElementsByTagName("body")[0];
	var elSections = document.getElementsByTagName("section");
	var elModal = document.getElementById("modal");
	// var closeBtn = document.getElementsByClassName("closeBtn");
	var modalContent = document.getElementById("modal-content")
	var projBtn = document.querySelectorAll(".portfolio-item .btn");

	//	Loop to add EventListener to node list
	function addEventListenerList(list, event, fn) {
    	for (var i = 0, len = list.length; i < len; i++) {
    	    list[i].addEventListener(event, fn, false);
    	}
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
		}

		//	Send Prepared Request
		xhr.send(null);
	}

	function modalOpen(e) {
		//	Get id value from data-get-id attr on project btn
		var id = this.getAttribute("data-get-id");
		console.log(id);
		//	AJAX GET Request function
		request(id);
		modal.style.display = 'block';
		elBody.classList.toggle("modal-open");
		
	}

	//	Event if user clicks 'close btn'.
	// closeBtn.addEventListener("click", function (e) {
	// 	//	Prevent Default behavior
	// 	e.preventDefault();
	// 	//	Close the modal Window
	// 	modal.style.display = "none";
	// });

	//	Define close() method
	function modalClose() {
		//	Remove Modal from page

		//	Remove Content from modal
		modalContent.innerHTML = "";

	}
	addEventListenerList(projBtn, "click", modalOpen);


	// request("project-3");

