(function() {
  loadOptions();
  setHandlers();
})();

function setHandlers() {
  var $headerLocation = $('#headerLocation');
  var $contentLocation = $('#contentLocation');
  $headerLocation.on('click', function() {
    if ($contentLocation.css('display') == 'none') {
      $contentLocation.css('display', '');
    } else {
      $contentLocation.css('display', 'none');
    }
  });

  var $headerFrequency = $('#headerFrequency');
  var $contentFrequency = $('#contentFrequency');
  $headerFrequency.on('click', function() {
    if ($contentFrequency.css('display') == 'none') {
      $contentFrequency.css('display', '');
    } else {
      $contentFrequency.css('display', 'none');
    }
  });

  var $frequencySlider = $('#frequency-slider');
  $frequencySlider.on('change', function() {
    var $current = $(this);
    if ($current.val() < 60) {
      $frequencySlider.val(60);
      $frequencyText.val(60);
    }
  });

  var $frequencyText = $('#frequency-text');
  $frequencyText.on('input', function() {
    var $current = $(this);
    if ($current.val() < 60) {
      $frequencySlider.val(60);
      $frequencyText.val(60);
    }
  });

  var $headerDisplay = $('#headerDisplay');
  var $contentDisplay = $('#contentDisplay');
  $headerDisplay.on('click', function() {
    if ($contentDisplay.css('display') == 'none') {
      $contentDisplay.css('display', '');
    } else {
      $contentDisplay.css('display', 'none');
    }
  });

  var $headerColors = $('#headerColors');
  var $contentColors = $('#contentColors');
  $headerColors.on('click', function() {
    if ($contentColors.css('display') == 'none') {
      $contentColors.css('display', '');
    } else {
      $contentColors.css('display', 'none');
    }
  });

  var $headerConnection = $('#headerConnection');
  var $contentConnection = $('#contentConnection');
  $headerConnection.on('click', function() {
    if ($contentConnection.css('display') == 'none') {
      $contentConnection.css('display', '');
    } else {
      $contentConnection.css('display', 'none');
    }
  });

  var $gps = $('#gps');
  $gps.on('change', function() {
    var $latlonSettings = $('#latlon-settings');
    if ($gps[0].checked) {
      $latlonSettings.css('display', 'none');
    }
  });

  var $latlon = $('#latlon');
  $latlon.on('change', function() {
    var $latlonSettings = $('#latlon-settings');
    if ($latlon[0].checked) {
      $latlonSettings.css('display', '');
    }
  });

  var $latitude = $('#latitude');
  $latitude.on('change', function() {
    $latitude[0].value = $latitude[0].value.replace(/[^0-9.+\-]/g, "");
  });

  var $longitude = $('#longitude');
  $longitude.on('change', function() {
    $longitude[0].value = $longitude[0].value.replace(/[^0-9.+\-]/g, "");
  });

  var $reloadDefaultColors = $('#reloadDefaultColors');
  $reloadDefaultColors.on('click', function() {
    console.log('Reload Default Colors');

    localStorage.colorBackground = '0x000000';
    localStorage.colorText = '0xFFFFFF';
    localStorage.colorHourHand = '0xFFFFFF';
    localStorage.colorMinuteHand = '0x55AAFF';
    localStorage.colorMinuteHandNoBT = '0xFF5500';
    localStorage.colorHourMarkers = '0xFFFFFF';
    localStorage.colorMinorMarkers = '0xFFFFFF';
    location.reload();
  });

  var $submitButton = $('#submitButton');
  $submitButton.on('click', submit);

  var $submitButton2 = $('#submitButton2');
  $submitButton2.on('click', submit);
}

function submit() {
  console.log('Submit');

  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
}

var callerVersion;
var storageVersion;

function loadOptions() {
  callerVersion = parseInt(getQueryParam('version', 0));
  storageVersion = localStorage.versionLabel;

  var platform = getQueryParam('platform', 'chalk');
  if (platform == 'bw') {
    $colorSettings = $('#colorSettings');
    $colorSettings.css('display', 'none');
  }

  var $gps = $('#gps');
  var $latlon = $('#latlon');
  var $latlonSettings = $('#latlon-settings');
  if (localStorage.useLatLon) {
    if (localStorage.useLatLon == 1) {
      $gps[0].checked = false;
      $latlon[0].checked = true;
    } else {
      $gps[0].checked = true;
      $latlon[0].checked = false;
    }
  }
  if ($gps[0].checked) {
    $latlonSettings.css('display', 'none');
  }

  var $latitude = $('#latitude');
  if (localStorage.latitude) {
    $latitude[0].value = localStorage.latitude;
  }

  var $longitude = $('#longitude');
  if (localStorage.longitude) {
    $longitude[0].value = localStorage.longitude;
  }

  var $frequency = $('#frequency-text');
  if (localStorage.frequency) {
    $frequency[0].value = localStorage.frequency;
  }

  var $displayLocation = $('#displayLocation');
  if (localStorage.displayLocation) {
    $displayLocation[0].checked = localStorage.displayLocation == 1;
  }

  var $displayHourMarkers = $('#displayHourMarkers');
  if (localStorage.displayHourMarkers) {
    $displayHourMarkers[0].checked = localStorage.displayHourMarkers == 1;
  }

  var $displayMinorMarkers = $('#displayMinorMarkers');
  if (localStorage.displayMinorMarkers) {
    $displayMinorMarkers[0].checked = localStorage.displayMinorMarkers == 1;
  }

  var $displayUpdateTime = $('#displayUpdateTime');
  if (localStorage.displayUpdateTime) {
    $displayUpdateTime[0].checked = localStorage.displayUpdateTime == 1;
  }

  var $displayTemp = $('#displayTemp');

  var $displayTempC = $('#displayTempC');
  if (localStorage.displayTempC) {
    $displayTempC[0].checked = localStorage.displayTempC == 1;
  }

  var $displayTempF = $('#displayTempF');
  if (localStorage.displayTempF) {
    $displayTempF[0].checked = localStorage.displayTempF == 1;
  }

  var $tapAction = $('#tapAction');
  if (localStorage.tapAction) {
    $tapAction[0].value = localStorage.tapAction;
  }

  var $colorBackground = $('#colorBackground');
  if (localStorage.colorBackground) {
    $colorBackground[0].value = localStorage.colorBackground;
  }

  var $colorText = $('#colorText');
  if (localStorage.colorText) {
    $colorText[0].value = localStorage.colorText;
  }

  var $colorHourHand = $('#colorHourHand');
  if (localStorage.colorHourHand) {
    $colorHourHand[0].value = localStorage.colorHourHand;
  }

  var $colorMinuteHand = $('#colorMinuteHand');
  if (localStorage.colorMinuteHand) {
    $colorMinuteHand[0].value = localStorage.colorMinuteHand;
  }

  var $colorMinuteHandNoBT = $('#colorMinuteHandNoBT');
  if (localStorage.colorMinuteHandNoBT) {
    $colorMinuteHandNoBT[0].value = localStorage.colorMinuteHandNoBT;
  }

  var $colorHourMarkers = $('#colorHourMarkers');
  if (localStorage.colorHourMarkers) {
    $colorHourMarkers[0].value = localStorage.colorHourMarkers;
  }

  var $colorMinorMarkers = $('#colorMinorMarkers');
  if (localStorage.colorMinorMarkers) {
    $colorMinorMarkers[0].value = localStorage.colorMinorMarkers;
  }

  var $connectionSettings = $('#connectionSettings');
  if (callerVersion < 101) {
    $connectionSettings.css('display', 'none');
  }

  var $InvertOnDisconnect = $('#InvertOnDisconnect');
  if (platform != 'bw') {
    $InvertOnDisconnect.css('display', 'none');
  }

  var $invertBtDisconnect = $('#invertBtDisconnect');
  if (localStorage.invertBtDisconnect) {
    $invertBtDisconnect[0].checked = localStorage.invertBtDisconnect == 1;
  }

  var $vibrateBtDisconnect = $('#vibrateBtDisconnect');
  if (localStorage.vibrateBtDisconnect) {
    $vibrateBtDisconnect[0].checked = localStorage.vibrateBtDisconnect == 1;
  }

  var $vibrateBtReconnect = $('#vibrateBtReconnect');
  if (localStorage.vibrateBtReconnect) {
    $vibrateBtReconnect[0].checked = localStorage.vibrateBtReconnect == 1;
  }
}

function initContentShowHide() {
  $('#contentLocation').css('display', 'none');
  $('#contentFrequency').css('display', 'none');
  $('#contentDisplay').css('display', 'none');
  $('#contentTapAction').css('display', 'none');
  $('#contentColors').css('display', 'none');
  $('#contentConnection').css('display', 'none');
}

function getAndStoreConfigData() {
  var $gps = $('#gps');
  var $latlon = $('#latlon');
  var $latitude = $('#latitude');
  var $longitude = $('#longitude');
  var $frequency = $('#frequency-text');
  var $displayLocation = $('#displayLocation');
  var $displayHourMarkers = $('#displayHourMarkers');
  var $displayMinorMarkers = $('#displayMinorMarkers');
  var $displayUpdateTime = $('#displayUpdateTime');
  var $displayTempC = $('#displayTempC');
  var $displayTempF = $('#displayTempF');
  var $tapAction = $('#tapAction');
  var $colorBackground = $('#colorBackground');
  var $colorText = $('#colorText');
  var $colorHourHand = $('#colorHourHand');
  var $colorMinuteHand = $('#colorMinuteHand');
  var $colorMinuteHandNoBT = $('#colorMinuteHandNoBT');
  var $colorHourMarkers = $('#colorHourMarkers');
  var $colorMinorMarkers = $('#colorMinorMarkers');
  var $invertBtDisconnect = $('#invertBtDisconnect');
  var $vibrateBtDisconnect = $('#vibrateBtDisconnect');
  var $vibrateBtReconnect = $('#vibrateBtReconnect');

  var options;
  options = {
    versionLabel: callerVersion,
    useLatLon: ($latlon[0].checked ? 1 : 0),
    latitude: $latitude.val(),
    longitude: $longitude.val(),
    frequency: $frequency.val(),
    displayLocation: ($displayLocation[0].checked ? 1 : 0),
    displayHourMarkers: ($displayHourMarkers[0].checked ? 1 : 0),
    displayMinorMarkers: ($displayMinorMarkers[0].checked ? 1 : 0),
    displayUpdateTime: ($displayUpdateTime[0].checked ? 1 : 0),
    displayTempC: ($displayTempC[0].checked ? 1 : 0),
    displayTempF: ($displayTempF[0].checked ? 1 : 0),
    tapAction: $tapAction.val(),
    colorBackground: $colorBackground.val(),
    colorText: $colorText.val(),
    colorHourHand: $colorHourHand.val(),
    colorMinuteHand: $colorMinuteHand.val(),
    colorMinuteHandNoBT: $colorMinuteHandNoBT.val(),
    colorHourMarkers: $colorHourMarkers.val(),
    colorMinorMarkers: $colorMinorMarkers.val(),
    invertBtDisconnect: ($invertBtDisconnect[0].checked ? 1 : 0),
    vibrateBtDisconnect: ($vibrateBtDisconnect[0].checked ? 1 : 0),
    vibrateBtReconnect: ($vibrateBtReconnect[0].checked ? 1 : 0)
  };

  localStorage.versionLabel = callerVersion;
  localStorage.useLatLon = options.useLatLon;
  localStorage.latitude = options.latitude;
  localStorage.longitude = options.longitude;
  localStorage.frequency = options.frequency;
  localStorage.displayLocation = options.displayLocation;
  localStorage.displayHourMarkers = options.displayHourMarkers;
  localStorage.displayMinorMarkers = options.displayMinorMarkers;
  localStorage.displayUpdateTime = options.displayUpdateTime;
  localStorage.displayTempC = options.displayTempC;
  localStorage.displayTempF = options.displayTempF;
  localStorage.tapAction = options.tapAction;
  localStorage.colorBackground = options.colorBackground;
  localStorage.colorText = options.colorText;
  localStorage.colorHourHand = options.colorHourHand;
  localStorage.colorMinuteHand = options.colorMinuteHand;
  localStorage.colorMinuteHandNoBT = options.colorMinuteHandNoBT;
  localStorage.colorHourMarkers = options.colorHourMarkers;
  localStorage.colorMinorMarkers = options.colorMinorMarkers;
  localStorage.invertBtDisconnect = options.invertBtDisconnect;
  localStorage.vibrateBtDisconnect = options.vibrateBtDisconnect;
  localStorage.vibrateBtReconnect = options.vibrateBtReconnect;

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}
