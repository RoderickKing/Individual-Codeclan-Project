/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/suncalc/suncalc.js":
/*!******************************************!*\
  !*** ../node_modules/suncalc/suncalc.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n (c) 2011-2015, Vladimir Agafonkin\n SunCalc is a JavaScript library for calculating sun/moon position and light phases.\n https://github.com/mourner/suncalc\n*/\n\n(function () { 'use strict';\n\n// shortcuts for easier to read formulas\n\nvar PI   = Math.PI,\n    sin  = Math.sin,\n    cos  = Math.cos,\n    tan  = Math.tan,\n    asin = Math.asin,\n    atan = Math.atan2,\n    acos = Math.acos,\n    rad  = PI / 180;\n\n// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas\n\n\n// date/time constants and conversions\n\nvar dayMs = 1000 * 60 * 60 * 24,\n    J1970 = 2440588,\n    J2000 = 2451545;\n\nfunction toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }\nfunction fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }\nfunction toDays(date)   { return toJulian(date) - J2000; }\n\n\n// general calculations for position\n\nvar e = rad * 23.4397; // obliquity of the Earth\n\nfunction rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }\nfunction declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }\n\nfunction azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }\nfunction altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }\n\nfunction siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }\n\nfunction astroRefraction(h) {\n    if (h < 0) // the following formula works for positive altitudes only.\n        h = 0; // if h = -0.08901179 a div/0 would occur.\n\n    // formula 16.4 of \"Astronomical Algorithms\" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.\n    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:\n    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));\n}\n\n// general sun calculations\n\nfunction solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }\n\nfunction eclipticLongitude(M) {\n\n    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center\n        P = rad * 102.9372; // perihelion of the Earth\n\n    return M + C + P + PI;\n}\n\nfunction sunCoords(d) {\n\n    var M = solarMeanAnomaly(d),\n        L = eclipticLongitude(M);\n\n    return {\n        dec: declination(L, 0),\n        ra: rightAscension(L, 0)\n    };\n}\n\n\nvar SunCalc = {};\n\n\n// calculates sun position for a given date and latitude/longitude\n\nSunCalc.getPosition = function (date, lat, lng) {\n\n    var lw  = rad * -lng,\n        phi = rad * lat,\n        d   = toDays(date),\n\n        c  = sunCoords(d),\n        H  = siderealTime(d, lw) - c.ra;\n\n    return {\n        azimuth: azimuth(H, phi, c.dec),\n        altitude: altitude(H, phi, c.dec)\n    };\n};\n\n\n// sun times configuration (angle, morning name, evening name)\n\nvar times = SunCalc.times = [\n    [-0.833, 'sunrise',       'sunset'      ],\n    [  -0.3, 'sunriseEnd',    'sunsetStart' ],\n    [    -6, 'dawn',          'dusk'        ],\n    [   -12, 'nauticalDawn',  'nauticalDusk'],\n    [   -18, 'nightEnd',      'night'       ],\n    [     6, 'goldenHourEnd', 'goldenHour'  ]\n];\n\n// adds a custom time to the times config\n\nSunCalc.addTime = function (angle, riseName, setName) {\n    times.push([angle, riseName, setName]);\n};\n\n\n// calculations for sun times\n\nvar J0 = 0.0009;\n\nfunction julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }\n\nfunction approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }\nfunction solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }\n\nfunction hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }\n\n// returns set time for the given sun altitude\nfunction getSetJ(h, lw, phi, dec, n, M, L) {\n\n    var w = hourAngle(h, phi, dec),\n        a = approxTransit(w, lw, n);\n    return solarTransitJ(a, M, L);\n}\n\n\n// calculates sun times for a given date and latitude/longitude\n\nSunCalc.getTimes = function (date, lat, lng) {\n\n    var lw = rad * -lng,\n        phi = rad * lat,\n\n        d = toDays(date),\n        n = julianCycle(d, lw),\n        ds = approxTransit(0, lw, n),\n\n        M = solarMeanAnomaly(ds),\n        L = eclipticLongitude(M),\n        dec = declination(L, 0),\n\n        Jnoon = solarTransitJ(ds, M, L),\n\n        i, len, time, Jset, Jrise;\n\n\n    var result = {\n        solarNoon: fromJulian(Jnoon),\n        nadir: fromJulian(Jnoon - 0.5)\n    };\n\n    for (i = 0, len = times.length; i < len; i += 1) {\n        time = times[i];\n\n        Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);\n        Jrise = Jnoon - (Jset - Jnoon);\n\n        result[time[1]] = fromJulian(Jrise);\n        result[time[2]] = fromJulian(Jset);\n    }\n\n    return result;\n};\n\n\n// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas\n\nfunction moonCoords(d) { // geocentric ecliptic coordinates of the moon\n\n    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude\n        M = rad * (134.963 + 13.064993 * d), // mean anomaly\n        F = rad * (93.272 + 13.229350 * d),  // mean distance\n\n        l  = L + rad * 6.289 * sin(M), // longitude\n        b  = rad * 5.128 * sin(F),     // latitude\n        dt = 385001 - 20905 * cos(M);  // distance to the moon in km\n\n    return {\n        ra: rightAscension(l, b),\n        dec: declination(l, b),\n        dist: dt\n    };\n}\n\nSunCalc.getMoonPosition = function (date, lat, lng) {\n\n    var lw  = rad * -lng,\n        phi = rad * lat,\n        d   = toDays(date),\n\n        c = moonCoords(d),\n        H = siderealTime(d, lw) - c.ra,\n        h = altitude(H, phi, c.dec),\n        // formula 14.1 of \"Astronomical Algorithms\" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.\n        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));\n\n    h = h + astroRefraction(h); // altitude correction for refraction\n\n    return {\n        azimuth: azimuth(H, phi, c.dec),\n        altitude: h,\n        distance: c.dist,\n        parallacticAngle: pa\n    };\n};\n\n\n// calculations for illumination parameters of the moon,\n// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and\n// Chapter 48 of \"Astronomical Algorithms\" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.\n\nSunCalc.getMoonIllumination = function (date) {\n\n    var d = toDays(date || new Date()),\n        s = sunCoords(d),\n        m = moonCoords(d),\n\n        sdist = 149598000, // distance from Earth to Sun in km\n\n        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),\n        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),\n        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -\n                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));\n\n    return {\n        fraction: (1 + cos(inc)) / 2,\n        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,\n        angle: angle\n    };\n};\n\n\nfunction hoursLater(date, h) {\n    return new Date(date.valueOf() + h * dayMs / 24);\n}\n\n// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article\n\nSunCalc.getMoonTimes = function (date, lat, lng, inUTC) {\n    var t = new Date(date);\n    if (inUTC) t.setUTCHours(0, 0, 0, 0);\n    else t.setHours(0, 0, 0, 0);\n\n    var hc = 0.133 * rad,\n        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,\n        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;\n\n    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)\n    for (var i = 1; i <= 24; i += 2) {\n        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;\n        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;\n\n        a = (h0 + h2) / 2 - h1;\n        b = (h2 - h0) / 2;\n        xe = -b / (2 * a);\n        ye = (a * xe + b) * xe + h1;\n        d = b * b - 4 * a * h1;\n        roots = 0;\n\n        if (d >= 0) {\n            dx = Math.sqrt(d) / (Math.abs(a) * 2);\n            x1 = xe - dx;\n            x2 = xe + dx;\n            if (Math.abs(x1) <= 1) roots++;\n            if (Math.abs(x2) <= 1) roots++;\n            if (x1 < -1) x1 = x2;\n        }\n\n        if (roots === 1) {\n            if (h0 < 0) rise = i + x1;\n            else set = i + x1;\n\n        } else if (roots === 2) {\n            rise = i + (ye < 0 ? x2 : x1);\n            set = i + (ye < 0 ? x1 : x2);\n        }\n\n        if (rise && set) break;\n\n        h0 = h2;\n    }\n\n    var result = {};\n\n    if (rise) result.rise = hoursLater(t, rise);\n    if (set) result.set = hoursLater(t, set);\n\n    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;\n\n    return result;\n};\n\n\n// export as Node module / AMD module / browser variable\nif (true) module.exports = SunCalc;\nelse {}\n\n}());\n\n\n//# sourceURL=webpack:///../node_modules/suncalc/suncalc.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Location = __webpack_require__(/*! ./models/location.js */ \"./src/models/location.js\");\nconst SelectLocationView = __webpack_require__(/*! ./views/select_location_view.js */ \"./src/views/select_location_view.js\");\nconst LocationView = __webpack_require__(/*! ./views/location_view.js */ \"./src/views/location_view.js\");\nconst MapView = __webpack_require__(/*! ./views/map_view.js */ \"./src/views/map_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"JavaScript Loaded\");\n\n  const myMap = new MapView();\n\n  const locationContainer = document.querySelector(\"#location-container\");\n  const locationView = new LocationView(locationContainer);\n  locationView.bindEvents();\n\n  const selectLocationView = new SelectLocationView();\n  selectLocationView.bindEvents();\n\n  const location = new Location();\n  location.bindEvents();\n  location.getData();\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function(channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function(channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class RequestHelper {\n  constructor(url) {\n    this.url = url;\n  }\n\n  get() {\n    return fetch(this.url).then(res => res.json());\n  }\n\n  post(payload) {\n    return fetch(this.url, {\n      method: \"POST\",\n      body: JSON.stringify(payload),\n      headers: { \"Content-Type\": \"application/json\" }\n    }).then(response => response.json());\n  }\n}\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/location.js":
/*!********************************!*\
  !*** ./src/models/location.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nclass Location {\n  constructor() {\n    this.data = [];\n  }\n\n  bindEvents() {\n    //takes location index from users selection\n    //then finds the location by index and publishes to location_view.js\n    PubSub.subscribe(\"Location:change-location\", event => {\n      const newLocationIndex = event.detail;\n      const newLocation = this.data[newLocationIndex];\n      PubSub.publish(\"Location:location-selection-ready\", newLocation);\n    });\n\n    // PubSub.subscribe(\"Location view:vote-button-click\", (event) => {\n    //   // TODO\n    // });\n  }\n  //gets data from backend and publishes location data\n  getData() {\n    const url = \"http://localhost:3000/photoApp\";\n    const request = new RequestHelper(url);\n    request\n      .get()\n      .then(data => {\n        this.data = data;\n        console.log(data);\n        PubSub.publish(\"Location:location-data-loaded\", this.data);\n      })\n      .catch(message => {\n        console.error(message);\n      });\n  }\n\n  // addlocation(id) {\n  //   const url = \"http://localhost:3000/photoApp\";\n  //   const request = new RequestHelper(url);\n  //   request\n  //     .get()\n  //     .then(data => {\n  //       this.data = data;\n  //       PubSub.publish(\"Locations:locations-data-loaded\", this.data);\n  //     })\n  //     .catch(message => {\n  //       console.error(message);\n  //     });\n  // }\n}\n\nmodule.exports = Location;\n\n\n//# sourceURL=webpack:///./src/models/location.js?");

/***/ }),

/***/ "./src/views/location_view.js":
/*!************************************!*\
  !*** ./src/views/location_view.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nvar SunCalc = __webpack_require__(/*! suncalc */ \"../node_modules/suncalc/suncalc.js\");\n\nclass LocationView {\n  constructor(container) {\n    this.container = container;\n  }\n\n  bindEvents() {\n    PubSub.subscribe(\"Location:location-selection-ready\", event => {\n      // PubSub.subscribe(\"Location:location-selection-ready\", event => {\n      const location = event.detail;\n      this.render(location);\n    });\n  }\n\n  render(location) {\n    this.clearLocations();\n    const card1 = this.createNotesCard(location);\n    this.container.appendChild(card1);\n    const card2 = this.createSunriseTimeCard(location);\n    this.container.appendChild(card2);\n    const card3 = this.createSunsetTimeCard(location);\n    this.container.appendChild(card3);\n  }\n\n  clearLocations() {\n    this.container.innerHTML = \"\";\n  }\n\n  createNotesCard(location) {\n    const meta = document.createElement(\"div\");\n    meta.classList.add(\"meta\");\n    meta.innerHTML = `<span><br><b>Notes</b> ${\n      location.photo_notes\n    } <br><br><br> Lat.: ${location.lat} <br> Long. :${location.long}</span>`;\n\n    const header = document.createElement(\"div\");\n    header.classList.add(\"header\");\n    header.innerHTML = `Data for ${location.placename}`;\n\n    const content = document.createElement(\"div\");\n    content.classList.add(\"content\");\n\n    const card = document.createElement(\"div\");\n\n    card.classList.add(\"ui\");\n\n    // keep below\n\n    card.classList.add(\"card\");\n\n    content.appendChild(header);\n    content.appendChild(meta);\n    card.appendChild(content);\n\n    return card;\n  }\n\n  createSunriseTimeCard(location) {\n    var the_times = {};\n    the_times = this.derive_times(location.lat, location.long);\n\n    const sunrise =\n      `<br><b>Sunrise</b>` +\n      the_times.sunrise +\n      `<br><br><b>Golden Hour End</b>` +\n      the_times.goldenHourEnd +\n      `<br>`;\n\n    const meta = document.createElement(\"div\");\n    meta.classList.add(\"meta\");\n\n    meta.innerHTML = sunrise;\n\n    const header = document.createElement(\"div\");\n    header.classList.add(\"header\");\n    header.innerHTML = `Sunrise Data for ${location.placename}`;\n\n    const content = document.createElement(\"div\");\n    content.classList.add(\"content\");\n\n    const card = document.createElement(\"div\");\n\n    card.classList.add(\"ui\");\n\n    // keep below\n\n    card.classList.add(\"card\");\n\n    content.appendChild(header);\n    content.appendChild(meta);\n    card.appendChild(content);\n\n    return card;\n  }\n  createSunsetTimeCard(location) {\n    var the_times = {};\n    the_times = this.derive_times(location.lat, location.long);\n\n    const sunset =\n      `<br><b>Sunset</b>` +\n      the_times.sunset +\n      `<br><br><b>Golden Hour End</b>` +\n      the_times.goldenHour;\n\n    const meta = document.createElement(\"div\");\n    meta.classList.add(\"meta\");\n\n    meta.innerHTML = sunset;\n\n    const header = document.createElement(\"div\");\n    header.classList.add(\"header\");\n    header.innerHTML = `Sunset Data for ${location.placename}`;\n\n    const content = document.createElement(\"div\");\n    content.classList.add(\"content\");\n\n    const card = document.createElement(\"div\");\n\n    card.classList.add(\"ui\");\n\n    // keep below\n\n    card.classList.add(\"card\");\n\n    content.appendChild(header);\n    content.appendChild(meta);\n    card.appendChild(content);\n\n    return card;\n  }\n\n  derive_times(lat, long) {\n    var times = SunCalc.getTimes(new Date(), lat, long);\n    return times;\n    //\n    // // get position of the sun (azimuth and altitude) at today's sunrise\n    // var sunrisePos = SunCalc.getPosition(times.sunrise, lat, long);\n    // // get position of the sun (azimuth and altitude) at today's sunset\n    // //console.dir(sunrisePos);\n    //\n    // //var sunriseAzimuth = (sunrisePos.azimuth * 180) / Math.PI;\n    // var sunriseAzimuth = sunrisePos;\n    //\n    // console.dir(sunrisePos);\n    // var sunsetPos = SunCalc.getPosition(times.sunset, lat, long);\n  }\n}\n\n// const buttons = this.createButtons();\n\n// const voteButton = this.createVoteButton();\n// this.container.appendChild(voteButton);\n\n// createButtons() {\n//   const button1 = document.createElement(\"button\");\n//   button1.multiplier = 1;\n//   button1.textContent = \"Small\";\n//\n//   const button2 = document.createElement(\"button\");\n//   button2.multiplier = 1.5;\n//   button2.textContent = \"Medium\";\n//\n//   const button3 = document.createElement(\"button\");\n//   button3.multiplier = 2;\n//   button3.textContent = \"Large\";\n//\n//   const buttons = [button1, button2, button3];\n//   buttons.forEach(button => {\n//     button.addEventListener(\"click\", event => {\n//       PubSub.publish(\"PizzaView:size-button-click\", button.multiplier);\n//     });\n//   });\n//\n//   this.container.appendChild(button1);\n//   this.container.appendChild(button2);\n//   this.container.appendChild(button3);\n// }\n//\n// createVoteButton() {\n//   const voteButton = document.createElement(\"button\");\n//   voteButton.textContent = \"Love it!\";\n//   voteButton.style.float = \"right\";\n//   voteButton.addEventListener(\"click\", event => {\n//     PubSub.publish(\"PizzaView:vote-button-click\");\n//   });\n//   return voteButton;\n// }\nmodule.exports = LocationView;\n\n\n//# sourceURL=webpack:///./src/views/location_view.js?");

/***/ }),

/***/ "./src/views/map_view.js":
/*!*******************************!*\
  !*** ./src/views/map_view.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst SunCalc = __webpack_require__(/*! suncalc */ \"../node_modules/suncalc/suncalc.js\");\n\nclass MapView {\n  constructor() {\n    this.myMap = new google.maps.Map(document.getElementById(\"map\"), {\n      center: { lat: 54.397, lng: -3.644 },\n      zoom: 8\n    });\n\n    this.myMap.addListener(\"click\", event => {\n      this.placeMarkerAndPanTo(\n        event.latLng.lat(),\n        event.latLng.lng(),\n        this.myMap\n      );\n    });\n  }\n\n  placeMarkerAndPanTo(lat, lng, myMap) {\n    console.log(\"coord are \", lat, \" \", lng);\n    var marker = new google.maps.Marker({\n      position: new google.maps.LatLng(lat, lng),\n      map: myMap,\n      animation: google.maps.Animation.DROP\n    });\n    myMap.panTo(marker.position);\n  }\n}\n\nmodule.exports = MapView;\n\n\n//# sourceURL=webpack:///./src/views/map_view.js?");

/***/ }),

/***/ "./src/views/select_location_view.js":
/*!*******************************************!*\
  !*** ./src/views/select_location_view.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nclass SelectLocationView {\n  constructor() {\n    this.element = document.querySelector(\"#location-list\");\n  }\n\n  //subscribes to location.js to recieve all location data\n  //then passes data into selectLocationList() as argument\n  bindEvents() {\n    PubSub.subscribe(\"Location:location-data-loaded\", event => {\n      const allLocations = event.detail;\n\n      this.selectLocationList(allLocations);\n    });\n    //listens for change in location selection from dropdown list and\n    //publishes the index of the new location back to location.js\n    this.element.addEventListener(\"change\", event => {\n      const selectIndex = event.target.value;\n      PubSub.publish(\"Location:change-location\", selectIndex);\n    });\n  }\n\n  //creates option/dropdown menu displaying Location name\n  //and sets value as the Location index\n  selectLocationList(locationData) {\n    locationData.forEach((location, index) => {\n      const option = document.createElement(\"option\");\n      option.textContent = location.placename;\n      option.value = index;\n      this.element.appendChild(option);\n    });\n  }\n}\n\nmodule.exports = SelectLocationView;\n\n\n//# sourceURL=webpack:///./src/views/select_location_view.js?");

/***/ })

/******/ });