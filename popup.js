var dragButton = document.getElementById('theButton');

dragButton.onclick = function () {
  console.log('yes sir')
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {button: 'theButton'}, function(response) {
      console.log(Object.keys(response.info).length)
      // if the page doesn't contain the walkme
      if (Object.keys(response.info).length) {
        // enabled
        $('#enabled').html('enabled');
        $('#details').css('visibility', 'visible');
        $('#userId').html(response.info.userId);
        $('#env').html(response.info.env);
        $('#https').html(response.info.isHttps);
        $('#host').html(response.info.host);
        $('#async').html(response.info.async);
      }

    });
  });
}