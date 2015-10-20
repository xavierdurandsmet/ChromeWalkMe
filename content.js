chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	// object with all the info the fill
  	var infoObject = {};

	if (request.button == "theButton") {

	  	// checks each script and stops the loop if finds a walkme script
	  	$('script').each(function (index) {

	  		var arr = $(this)['context'].src.split('/')

	  		// checks if contains 'walkme_'
	  		if (arr[arr.length - 1].slice(0,7) == 'walkme_') {
		  		// checks if async
		  		if ($(this)['context'].async) {
		  			infoObject.async = true;
		  		}
		  		else {
		  			infoObject.async = false;
		  		}

		  		if (arr[0] == 'https:') {
		  			infoObject.isHttps = true;
		  		}
		  		else {
		  			infoObject.isHttps = false;
		  		}

	  			// get the CDN
	  			infoObject.host = arr[2];

				// get env
				if (arr[5] === 'test') {
					infoObject.env = 'Test';
				}
				else {
					infoObject.env = 'Production';
				}

	  			// check if there is users info
	  			if (arr[3] === 'users') {
	  				// get user id
	  				infoObject.userId = arr[4];

			  		var url = 'https://s3.amazonaws.com/s3.maketutorial.com/users/' + infoObject.userId + '/settings.txt'
			  		infoObject.url = url;
	  			}
	  		}
	  		sendResponse({info: infoObject})
		  	return true;
	  	})
	  	return false;
	  }

  		
	// loads data (Part II)
	if (request.button == "theNextButton") {
	  	// define webpage with userId
	  	function loadData (userId) {
		var url = 'https://s3.amazonaws.com/s3.maketutorial.com/users/' + request.userId + '/settings.txt';
			// create XMLHttpRequest
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", url, true);
			xmlhttp.onreadystatechange = function() {
		    	if (xmlhttp.readyState == 4) {
		       		// get the JSONP from the URL
		       		var JSONP = xmlhttp.responseText
		       		// create a wrapper function with the callback name, to convert JSONP to JSON
		        	var wrapper = new Function("fixedCallback", JSONP)
		        	// convert JSONP to JSON
		        	wrapper(function (json) {
		        		// attach data we want to the info object
		        		infoObject.libFile = json.LibFile;
		        		infoObject.dataFilesNumber = json.DataFiles.length;
		        		infoObject.languagesNumber = json.DataFiles[0].languages.length
		        		console.log(infoObject)
		        		sendResponse({info: infoObject})
		        	})
			  	}
		  	}
			xmlhttp.send();
		    return true;
		}
			loadData(infoObject.userId)
	}

})
	// JSONP
		 // $.ajax({
   //          crossDomain: true,
   //          type:"GET",
   //          contentType: "application/json; charset=utf-8",
   //          async:false,
   //          url: url + "?callback=?",
   //          data: {projectID:1},
   //          dataType: "jsonp",                
   //          jsonpCallback: 'fixedCallback',
   //          // Work with the response
		 //    success: function( response ) {
		 //        console.log( response ); // server response
		 //    }
   //      });
		// REGEX
  		// var notWalkMe = /^(.(?!stringToExclude))*$/i;
  		// console.log($(this)['context'].src.replace(notWalkMe, ''))
  		// console.log($(this)['context'].src)