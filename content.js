chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	// object with all the info the fill
  	var infoObject = {};

  	// loads data (Part II)
  	function loadData (userId) {
  		// define webpage with userId
		var url = 'https://s3.amazonaws.com/s3.maketutorial.com/users/' + userId + '/settings.txt'
		$.getJSON('http://anyorigin.com/get?url='+ url, function(data){
    		var JSONFile = data.contents.slice(14, data.contents.length - 2)
    		console.log('JSONFile', JSONFile)
    		// NOT WORKING!!!
    		var finalData = JSON.parse(JSONFile)
    		infoObject.libfile = finalData.LibFile;
    		infoObject.dataFiles = finalData.DataFiles.length;
    		infoObject.languages = finalData.languages.length;
		});
  	}

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

  			// check if there is users info
  			if (arr[3] === 'users') {
  				// get user id
  				infoObject.userId = arr[4];

		  		// // get data from the settings file from specific user
		  		// loadData(infoObject.userId)

  				// get env
  				if (arr[5] === 'test') {
  					infoObject.env = 'Test';
  				}
  				else {
  					infoObject.env = 'Production';
  				}
  			}
  		}
	  	sendResponse({info: infoObject})
	  	return true;
  	})
  	return false;
  }
)
  		

	// DRAFTS
		// REGEX
  		// var notWalkMe = /^(.(?!stringToExclude))*$/i;
  		// console.log($(this)['context'].src.replace(notWalkMe, ''))
  		// console.log($(this)['context'].src)

  		// XML
  		// var xmlhttp = new XMLHttpRequest();
		// xmlhttp.open("GET", url, true);
		// xmlhttp.send();
		// var data = JSON.parse(xmlhttp.responseText);
		// var data = xmlhttp.responseText;
		// console.log('xmlhttp ',xmlhttp.responseText)