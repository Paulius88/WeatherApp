/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ (() => {

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var regionSelect = document.querySelector('#region');
var citySelect = document.querySelector('#city');
var weather = document.querySelector('.weather');
var searchButton = document.querySelector('.search_icon');
var searchInput = document.querySelector('.search_input');

function getFilteredLocations() {
  fetch('/weather/places').then(function (response) {
    return response.json();
  }).then(function (data) {
    var rObj = new Set();
    var filteredRegions = data.filter(function (el) {
      var duplicate = rObj.has(el.administrativeDivision);
      rObj.add(el.administrativeDivision);
      return !duplicate;
    });
    filteredRegions.sort(function (a, b) {
      return a.administrativeDivision > b.administrativeDivision ? 1 : -1;
    });

    var _iterator = _createForOfIteratorHelper(filteredRegions),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var r = _step.value;

        if (r.countryCode == 'LT') {
          var reg_option = document.createElement('option');
          reg_option.innerText = r.administrativeDivision;
          reg_option.value = r.administrativeDivision;
          regionSelect.appendChild(reg_option);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    ;

    var _iterator2 = _createForOfIteratorHelper(data),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var p = _step2.value;

        if (p.countryCode == 'LT') {
          var city_option = document.createElement('option');
          city_option.value = p.administrativeDivision;
          city_option.innerText = p.name;
          city_option.classList.add(p.code);
          citySelect.appendChild(city_option);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var defaultCity = document.querySelector('.klaipeda');
    defaultCity.setAttribute('selected', 'klaipeda');
    getWeatherResult();
  });
}

;
document.addEventListener('DOMContentLoaded', getFilteredLocations);

function getDoubleDigit(a) {
  if (a < 10) {
    return "0".concat(a);
  } else {
    return a;
  }
}

;

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  document.querySelector('#clock').innerText = "".concat(getDoubleDigit(h), ":").concat(getDoubleDigit(m), ":").concat(getDoubleDigit(s));
  document.querySelector('#date').innerText = "".concat(d.getFullYear(), "-").concat(d.getMonth() + 1, "-").concat(d.getDate());
}

;
setInterval(time, 1000);

function createNewForecastItem(conditionCode, temperature, time, wind) {
  var newDiv = document.createElement('div');
  var newForecast = document.createElement('div');
  newForecast.classList.add('fas');
  newForecast.classList.add(conditionCode);
  var forecastTime = document.createElement('small');
  forecastTime.innerText = time;
  var newTemp = document.createElement('div');
  newTemp.innerText = "".concat(temperature, "\xB0C");
  var windImage = document.createElement('div');
  windImage.classList.add('fas');
  windImage.classList.add('fa-wind');
  var windSpeed = document.createElement('span');
  windSpeed.innerText = " ".concat(wind, " m/s");
  newDiv.appendChild(newForecast);
  newDiv.appendChild(forecastTime);
  newDiv.appendChild(newTemp);
  newDiv.appendChild(windImage);
  newDiv.appendChild(windSpeed);
  return newDiv;
}

;

function setWeatherPicture(conditionCode) {
  if (conditionCode == 'clear') {
    return 'fa-sun';
  } else if (conditionCode == 'isolated-clouds') {
    return 'fa-cloud-sun';
  } else if (conditionCode == 'scattered-clouds') {
    return 'fa-cloud-sun';
  } else if (conditionCode == 'overcast') {
    return 'fa-cloud';
  } else if (conditionCode == 'light-rain') {
    return 'fa-cloud-rain';
  } else if (conditionCode == 'moderate-rain') {
    return 'fa-cloud-rain';
  } else if (conditionCode == 'heavy-rain') {
    return 'fa-cloud-showers-heavy';
  } else if (conditionCode == 'sleet') {
    return 'fa-cloud-meatball';
  } else if (conditionCode == 'light-snow') {
    return 'fa-snowflake';
  } else if (conditionCode == 'moderate-snow') {
    return 'fa-snowflake';
  } else if (conditionCode == 'heavy-snow') {
    return 'fa-snowflake';
  } else if (conditionCode == 'fog') {
    return 'fa-smog';
  } else {
    return 'no data';
  }
}

;

function getWeatherResult() {
  var searchValue = searchInput.value.toLowerCase();
  console.log(searchValue);
  var selection = searchValue || citySelect.options[citySelect.selectedIndex].className;
  var selectedCityNode = document.querySelector('.' + selection);

  if (selectedCityNode) {
    selectedCityNode.setAttribute('selected', 'klaipeda');
  }

  fetch("./weather/places/".concat(selection)).then(function (response) {
    return response.json();
  }).then(function (data) {
    var time = new Date();
    var currentDate = "".concat(time.getFullYear(), "-").concat(time.getMonth() + 1, "-").concat(time.getDate());
    var currentTime = "".concat(time.getHours());
    var weatherNow = document.querySelector('#weather_now');
    weatherNow.innerHTML = '';
    var laterToday = document.querySelector('#later_today');
    laterToday.innerHTML = '';

    var _iterator3 = _createForOfIteratorHelper(data.forecastTimestamps),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var t = _step3.value;
        var forecastTempDate = Array.from(t.forecastTimeUtc).splice(0, 10).join('');
        var forecastTempTime = Array.from(t.forecastTimeUtc).slice(11).splice(0, 2).join('');
        var forecastDisplayTime = Array.from(t.forecastTimeUtc).slice(11).splice(0, 5).join('');

        if (currentDate == forecastTempDate && currentTime == forecastTempTime) {
          var weatherPicture = document.querySelector('#weather_now');
          weatherPicture.classList.add('fas');
          weatherPicture.classList.add('col-6');
          weatherPicture.classList.add(setWeatherPicture(t.conditionCode));
          weatherPicture.classList.add('weatherPicture');
          var currentTemp = document.querySelector('#current_temp');
          currentTemp.classList.add('col-6');
          currentTemp.innerText = "".concat(Number(t.airTemperature).toFixed(1), "\xB0C");
          var windImage = document.querySelector('#wind');
          windImage.classList.add('fas');
          windImage.classList.add('fa-wind');
          var windSpeed = document.querySelector('#wind_speed');
          windSpeed.innerText = "".concat(t.windGust, " m/s");
          var humidity = document.querySelector('#humidity');
          humidity.innerText = "Dr\u0117gm\u0117: ".concat(t.relativeHumidity, "%");
          var onDisplay = document.querySelector('#on_display');
          onDisplay.innerText = "\u0160iuo metu: ".concat(citySelect.options[citySelect.selectedIndex].innerText);
        }

        if (currentDate == forecastTempDate && currentTime < forecastTempTime) {
          laterToday.appendChild(createNewForecastItem(setWeatherPicture(t.conditionCode), Number(t.airTemperature).toFixed(1), forecastDisplayTime, t.windGust));
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    ;
  });
}

;
regionSelect.addEventListener('input', function () {
  var cities = document.querySelectorAll('#city > *');

  var _iterator4 = _createForOfIteratorHelper(cities),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var i = _step4.value;

      if (i.value != this.value) {
        i.style.display = 'none';
        citySelect.value = null;
      } else if (this.value == '-- Pasirinkite savivaldybę') {
        i.style.display = 'block';
      } else {
        i.style.display = 'block';
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
});
citySelect.addEventListener('input', getWeatherResult);
searchButton.addEventListener('click', getWeatherResult, false);

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkWeatherApp"] = self["webpackChunkWeatherApp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./resources/sass/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;