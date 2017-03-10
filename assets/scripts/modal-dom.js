//	iife Function
var modal = (function () {

	//	Get window object
	var elBody = document.getElementsByTagName("body")[0];

	//	Create Modal
		//	Modal
		var elModal = document.createElement('div');
			//	Add id
			elModal.setAttribute("id", "modal");

		//	Modal Content
		var elContent = document.createElement("div");
			//	Add classes
			elContent.setAttribute("id", "modal-content");

		//	Modal Wrapper	
		var modalWrapper = document.createElement("div");
			//	Add Classes
			modalWrapper.setAttribute("class", "inner-wrapper");

		//	Modal Title
		var modalTitle	= document.createElement("h3");
			//	Add Classes
			modalTitle.setAttribute("class", "section-title");

		//	Modal img				
		var modalImg = document.createElement("img");
			//	Add Classes
			modalImg.setAttribute("class", "modal-img");

		//	Modal subTitle
		var modalSubTitle = document.createElement("h4");
			modalSubTitle.setAttribute("class", "modal-proj-title");

		//	Modal Description
		var modalPara = document.createElement("p");
			//	Add Classes
			modalPara.setAttribute("class", "proj-description");

		//	Btn Container
		var btnContainer = document.createElement("div");
			//	Btn Classes
			btnContainer.setAttribute("class", "btn-container");

		//	Btn
		var elBtn = document.createElement("button");
			elBtn.setAttribute("class", "btn btn-1of2-layout btn-green");

		var elBtn2 = document.createElement("button");
			elBtn2.setAttribute("class", "btn btn-2of2-layout btn-git");


		//	Append Elements to Modal
		elModal.appendChild(modalWrapper);
		modalWrapper.appendChild(elContent);
		elContent.appendChild(modalTitle);
		elContent.appendChild(modalImg);
		elContent.appendChild(modalSubTitle);
		elContent.appendChild(modalPara);
		elContent.appendChild(modalPara);
		elContent.appendChild(btnContainer);
		btnContainer.appendChild(elBtn);
		btnContainer.appendChild(elBtn2);

		//	Append to Body Element
		elBody.appendChild(elModal);

// End of iife
}());


