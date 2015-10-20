var mainInfo = document.getElementById('theButton');
var moreInfo = document.getElementById('theNextButton');
var userId;

// main info
mainInfo.onclick = function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {button: 'theButton'}, function(response) {
      console.log(Object.keys(response.info))
      // if the page doesn't contain the walkme
      if (Object.keys(response.info).length) {
        // enabled
        $('#enabled').html('enabled');
        $('.details').css('visibility', 'visible');
        $('#userId').html(response.info.userId);
        $('#env').html(response.info.env);
        $('#https').html(response.info.isHttps);
        $('#host').html(response.info.host);
        $('#async').html(response.info.async);
        // define userId to global var
        userId = response.info.userId;
      }

    });
  });
}

// more info (part II)
moreInfo.onclick = function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {button: 'theNextButton', userId: userId}, function(response) {
      console.log(Object.keys(response.info))
      // if the page doesn't get the info
      if (Object.keys(response.info).length) {
        // enabled
        $('.details').css('visibility', 'visible');
        $('#libFile').html(response.info.libFile);
        $('#dataFilesNumber').html(response.info.dataFilesNumber);
        $('#languagesNumber').html(response.info.languagesNumber);
      }

    });
  });
}