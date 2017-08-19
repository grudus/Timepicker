/*! grudus-timepicker | (c) 2017-2017
 grudus | Apache-2.0 license (see LICENSE) */
var clockHtml = "<section class='g-time-wrapper'>\n" + "    <header class='g-head g-flex' id='g-head'>\n" + "        <section class='g-head-content'>\n" + "            <span class='g-current g-hour g-active g-pointer' id='g-hours'>21</span>\n" + "            <span class='g-current'>:</span>\n" + "            <span class='g-current g-minute g-pointer' id='g-minutes'>37</span>\n" + "        </section>\n" + "    </header>\n" + "\n" + "\n" + "    <section class='g-clock-wrapper g-flex' id='g-clock-wrapper'>\n" + "        <div class='g-clock' id='g-clock'>" + "            <span class='g-middle-dot' id='g-middle-dot'></span>\n" + "            <div class='g-hand-of-a-clock' id='g-hand-of-a-clock'></div>\n" + "            <div class='g-clock g-clock-inner' id='g-clock-inner'></div>\n" + "        </div>\n" + "    </section>\n" + "\n" + "\n" + "    <footer class='g-buttons g-flex' id='g-buttons'>\n" + "        <button id='g-time-cancel' class='g-button g-cancel g-pointer'>CANCEL</button>\n" + "        <button id='g-time-submit' class='g-button g-submit g-pointer'>OK</button>\n" + "    </footer>\n" + "\n" + "</section>";

var clockId = "grudus-clock";

var defaultConfig = {
    onSubmit: function onSubmit() {},
    onClose: function onClose() {
        return document.body.removeChild(document.getElementById(clockId));
    },
    headerBackground: "#1976D2",
    headerColor: "#c7d6e1",
    headerSelected: "#ffffff",
    wrapperBackground: "#f0fff0",
    footerBackground: "#f0fff0",
    submitColor: "#1976D2",
    cancelColor: "#1976D2",
    clockBackground: "#CFD8DC",
    clockItemColor: "#212121",
    clockItemInnerColor: "#212121",
    handColor: "#1976D2"
};

var FaceType = { HOURS: "hours", MINUTES: "minutes" };

var css = {
    clock: "g-clock",
    clockItem: "g-clock-item",
    inner: "g-clock-inner",
    outer: "g-clock-outer",
    item: "g-clock-item",
    hand: "g-hand-of-a-clock",
    fadeOut: "g-fade-out",
    selected: "g-selected",
    active: "g-active",
    submit: "g-submit",
    cancel: "g-cancel",
    hour: "g-hour",
    minute: "g-minute"
};

var DOM = {
    headerId: "g-head",
    hoursId: "g-hours",
    minutesId: "g-minutes",
    clockId: "g-clock",
    innerId: "g-clock-inner",
    wrapperId: "g-clock-wrapper",
    dotId: "g-middle-dot",
    handId: "g-hand-of-a-clock",
    buttonsId: "g-buttons",
    submitId: "g-time-submit",
    cancelId: "g-time-cancel"
};

var Config = { clockId: clockId, clockConfig: defaultConfig, FaceType: FaceType };

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var ClockHeader = function () {
    function ClockHeader(config) {
        classCallCheck(this, ClockHeader);

        this.options = config.options;
        this.time = config.time;
        this.onHourClicked = config.onHourClicked;
        this.onMinutesClicked = config.onMinutesClicked;

        this.initView();
    }

    createClass(ClockHeader, [{
        key: "initView",
        value: function initView() {
            var _this = this;

            this.headerHours = document.getElementById(DOM.hoursId);
            this.headerHours.onclick = function () {
                _this.toggleActiveToHours();
                _this.onHourClicked();
            };

            this.headerMinutes = document.getElementById(DOM.minutesId);
            this.headerMinutes.onclick = function () {
                _this.toggleActiveToMinutes();
                _this.onMinutesClicked();
            };

            this.updateDisplayedTime();
            this.toggleActiveToHours();
        }
    }, {
        key: "toggleActiveToMinutes",
        value: function toggleActiveToMinutes() {
            this.toggleActive(this.headerHours, this.headerMinutes);
        }
    }, {
        key: "toggleActiveToHours",
        value: function toggleActiveToHours() {
            this.toggleActive(this.headerMinutes, this.headerHours);
        }
    }, {
        key: "toggleActive",
        value: function toggleActive(objectToRemoveClass, objectToAddClass) {
            objectToRemoveClass.style.color = this.options.headerColor;
            objectToAddClass.style.color = this.options.headerSelected;
        }
    }, {
        key: "updateDisplayedTime",
        value: function updateDisplayedTime() {
            ClockHeader.doUpdateDisplayedTime(this.headerHours, this.time.hours);
            ClockHeader.doUpdateDisplayedTime(this.headerMinutes, this.time.minutes);
        }
    }], [{
        key: "doUpdateDisplayedTime",
        value: function doUpdateDisplayedTime(node, value) {
            if (value < 10) node.innerText = "0" + value;else node.innerText = value;
        }
    }]);
    return ClockHeader;
}();

var MinutesFace = function () {
    function MinutesFace(items, initialMinutes, updateMinutes) {
        classCallCheck(this, MinutesFace);

        this.displayed = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];
        this.options = items.options;
        this.type = Config.FaceType.MINUTES;
        this.selected = undefined;
        this.items = items;
        this.minutes = initialMinutes;
        this.updateMinutes = updateMinutes;
    }

    createClass(MinutesFace, [{
        key: "onEnter",
        value: function onEnter() {
            this.selected = this.findSelected(this.minutes);
            this.colorSelected();
            this.updateMinutes(this.minutes, this.minutes * 6);
        }
    }, {
        key: "onLeave",
        value: function onLeave() {
            if (this.selected) {
                this.removeSelected();
                this.selected = undefined;
            }
        }
    }, {
        key: "selectTime",
        value: function selectTime(angle) {
            if (this.selected) this.removeSelected();

            var minute = Math.round(angle / 6) % 60;
            this.selected = this.findSelected(minute);
            this.colorSelected();
            this.minutes = minute;
            this.updateMinutes(this.minutes, angle);
        }
    }, {
        key: "findSelected",
        value: function findSelected(minute) {
            return minute % 5 === 0 ? this.items.clockItems[minute / 5] : this.items.outerClockItems[minute];
        }
    }, {
        key: "colorSelected",
        value: function colorSelected() {
            if (this.isOuter()) {
                this.selected.classList.add(css.selected);
                return;
            }
            this.selected.style.background = this.options.handColor;
            this.selected.style.color = "whitesmoke";
        }
    }, {
        key: "removeSelected",
        value: function removeSelected() {
            if (this.isOuter()) {
                this.selected.classList.remove(css.selected);
                return;
            }
            this.selected.style.background = "transparent";
            this.selected.style.color = this.options.clockItemColor;
        }
    }, {
        key: "isOuter",
        value: function isOuter() {
            return this.items.outerClockItems.indexOf(this.selected) > -1;
        }
    }]);
    return MinutesFace;
}();

var HoursFace = function () {
    function HoursFace(items, initialHours, updateHours) {
        classCallCheck(this, HoursFace);

        this.displayed = ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
        this.displayedInner = ["00", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
        this.type = Config.FaceType.MINUTES;
        this.selected = undefined;
        this.options = items.options;

        this.items = items;
        this.hours = initialHours;
        this.updateHours = updateHours;
    }

    createClass(HoursFace, [{
        key: "onEnter",
        value: function onEnter() {
            this.items.innerClockElem.style.display = "block";
            var isInnerClock = this.hours < 13 && this.hours !== 0;
            var hoursIndex = this.hours % 12;
            this.selected = isInnerClock ? this.items.clockItems[hoursIndex] : this.items.innerClockItems[hoursIndex];
            this.colorSelected();

            this.updateHours(this.hours, hoursIndex * 30, isInnerClock ? this.items.radius : this.items.radius - 50);
        }
    }, {
        key: "onLeave",
        value: function onLeave() {
            this.items.innerClockElem.style.display = "none";
            if (this.selected) {
                this.removeSelected();
                this.selected = undefined;
            }
        }
    }, {
        key: "selectTime",
        value: function selectTime(angle, elem) {
            if (this.selected) this.removeSelected();

            var index = Math.round(angle / 30) % 12;
            this.selected = (elem === this.items.innerClockElem ? this.items.innerClockItems : this.items.clockItems)[index];

            this.colorSelected();
            this.hours = parseInt(this.selected.innerText);
            var selectedAngle = Math.round(angle / 30) * 30;

            this.updateHours(this.hours, selectedAngle, elem === this.items.innerClockElem ? this.items.radius - 50 : this.items.radius);
        }
    }, {
        key: "colorSelected",
        value: function colorSelected() {
            this.selected.style.background = this.options.handColor;
            this.selected.style.color = "#ffffff";
        }
    }, {
        key: "removeSelected",
        value: function removeSelected() {
            this.selected.style.background = "transparent";
            this.selected.style.color = this.options.clockItemColor;
        }
    }]);
    return HoursFace;
}();

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function findMousePosition(event, object) {
    var rect = object.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t);
    });
}

Promise.delay = function (fn, t) {
    if (!t) {
        t = fn;
        fn = function fn() {};
    }
    return delay(t).then(fn);
};

Promise.prototype.delay = function (fn, t) {
    return this.then(function () {
        return Promise.delay(fn, t);
    });
};

var Utils = { toRadians: toRadians, toDegrees: toDegrees, findMousePosition: findMousePosition };

var ClockFaceCreator = function () {
    function ClockFaceCreator(clockElem, innerClockElem) {
        classCallCheck(this, ClockFaceCreator);

        this.clockElem = clockElem;
        this.innerClockElem = innerClockElem;
        this.size = {};
        this.middle = {};
    }

    createClass(ClockFaceCreator, [{
        key: "create",
        value: function create(clockItems, innerClockItems, outerClockItems, face) {
            ClockFaceCreator.doCreate(clockItems, this.clockElem, function (span) {
                return span.classList.add(css.item);
            });
            ClockFaceCreator.doCreate(innerClockItems, this.innerClockElem, function (span, i) {
                span.classList.add(css.item, css.inner);
                span.innerText = face.displayedInner[i];
            });

            for (var i = 0; i < 60; i++) {
                var span = document.createElement("span");
                span.classList.add(css.outer);
                outerClockItems.push(span);
                this.clockElem.appendChild(span);
            }
        }
    }, {
        key: "calculateSize",
        value: function calculateSize(clockItems, innerClockItems, outerClockItems) {
            this.size.width = this.clockElem.offsetWidth;
            this.size.height = this.clockElem.offsetHeight;
            this.middle.x = this.size.width / 2;
            this.middle.y = this.size.height / 2;
            this.itemsRadius = this.size.width / 2 - 20;

            var innerWidth = this.innerClockElem.offsetWidth;
            var innerHeight = this.innerClockElem.offsetHeight;
            var middleX = innerWidth / 2;
            var middleY = innerHeight / 2;

            ClockFaceCreator.doCalculateSize(this.middle.x, this.middle.y, this.itemsRadius, clockItems);
            ClockFaceCreator.doCalculateSize(middleX, middleY, this.itemsRadius - 40, innerClockItems);
            ClockFaceCreator.doCalculateSize(this.middle.x, this.middle.y, this.itemsRadius, outerClockItems);
        }
    }], [{
        key: "doCreate",
        value: function doCreate(clockItems, clockElem, fun) {
            for (var i = 0; i < 12; i++) {
                var span = document.createElement("span");
                fun(span, i);
                clockItems.push(span);
                clockElem.appendChild(span);
            }
        }
    }, {
        key: "doCalculateSize",
        value: function doCalculateSize(middleX, middleY, radius, items) {
            var angleQuantum = 360 / items.length;
            for (var i = 0; i < items.length; i++) {

                var angle = Utils.toRadians(i * angleQuantum);
                var item = items[i];
                var itemWidth = item.offsetWidth;
                var itemHeight = item.offsetHeight;

                item.style.left = middleX + Math.sin(angle) * radius - itemWidth / 2 + "px";
                item.style.bottom = middleY + Math.cos(angle) * radius - itemHeight / 2 + "px";
            }
        }
    }]);
    return ClockFaceCreator;
}();

var ClockFace = function () {
    function ClockFace(options, initialTime, onTimeUpdate) {
        classCallCheck(this, ClockFace);

        this.options = options;
        this.time = initialTime;
        this.onTimeUpdate = onTimeUpdate;
        this.isMouseDown = false;
        this.clockItems = [];
        this.innerClockItems = [];
        this.outerClockItems = [];
        this.size = {};
        this.middle = {};

        this.initViews();
        this.initTimeFaces(initialTime);
        this.createFace();

        this.hoursFace.items.radius = this.itemsRadius;

        this.currentFace = this.hoursFace;
        this.changeDisplayed(this.currentFace.displayed);
    }

    createClass(ClockFace, [{
        key: "initViews",
        value: function initViews() {
            var _this = this;

            this.clockElem = document.getElementById(DOM.clockId);
            this.innerClockElem = document.getElementById(DOM.innerId);
            this.handOfAClock = document.getElementById(DOM.handId);

            this.clockElem.onmousedown = function () {
                return _this.isMouseDown = true;
            };
            this.clockElem.onmouseup = function () {
                _this.isMouseDown = false;
                _this.toggleToMinutes();
            };

            this.handOfAClock.onmouseup = function (e) {
                return e.stopPropagation();
            };
            this.handOfAClock.onmousemove = function (e) {
                return e.stopPropagation();
            };
            this.handOfAClock.onclick = function (e) {
                return e.stopPropagation();
            };

            this.clockElem.onmousemove = function (e) {
                return _this.selectTime(e, false, _this.clockElem);
            };
            this.clockElem.onclick = function (e) {
                return _this.selectTime(e, true, _this.clockElem);
            };

            this.innerClockElem.onmousemove = function (e) {
                return _this.selectTime(e, false, _this.innerClockElem);
            };
            this.innerClockElem.onclick = function (e) {
                return _this.selectTime(e, true, _this.innerClockElem);
            };
        }
    }, {
        key: "initTimeFaces",
        value: function initTimeFaces(initialTime) {
            var _this2 = this;

            this.minutesFace = new MinutesFace({
                options: this.options,
                clockItems: this.clockItems,
                outerClockItems: this.outerClockItems
            }, initialTime.minutes, function (minutes, angle) {
                return _this2.updateMinutes(minutes, angle);
            });

            this.hoursFace = new HoursFace({
                options: this.options,
                innerClockItems: this.innerClockItems,
                clockItems: this.clockItems,
                innerClockElem: this.innerClockElem
            }, initialTime.hours, function (hours, angle, radius) {
                return _this2.updateHours(hours, angle, radius);
            });
        }
    }, {
        key: "onStart",
        value: function onStart() {
            this.currentFace.onEnter();
        }
    }, {
        key: "createFace",
        value: function createFace() {
            var clockFaceCreator = new ClockFaceCreator(this.clockElem, this.innerClockElem);
            clockFaceCreator.create(this.clockItems, this.innerClockItems, this.outerClockItems, this.hoursFace);
            clockFaceCreator.calculateSize(this.clockItems, this.innerClockItems, this.outerClockItems);

            this.size = clockFaceCreator.size;
            this.middle = clockFaceCreator.middle;
            this.itemsRadius = clockFaceCreator.itemsRadius;
        }
    }, {
        key: "selectTime",
        value: function selectTime(event, isMouseDown, elem) {
            if (!(isMouseDown || this.isMouseDown)) return;
            var mouse = Utils.findMousePosition(event, this.clockElem);
            var x = mouse.x - this.middle.x;
            var y = this.middle.y - mouse.y;
            var angle = 90 - Utils.toDegrees(Math.atan(y / x));
            if (x < 0) angle += 180;

            this.currentFace.selectTime(angle, elem);
            event.stopPropagation();
        }
    }, {
        key: "changeDisplayed",
        value: function changeDisplayed(array) {
            for (var i = 0; i < this.clockItems.length; i++) {
                this.clockItems[i].innerText = array[i];
            }
        }
    }, {
        key: "onEachClockElement",
        value: function onEachClockElement(fun) {
            [].forEach.call(this.clockItems, function (c) {
                return fun(c);
            });
        }
    }, {
        key: "updateMinutes",
        value: function updateMinutes(minutes, angle) {
            this.time.minutes = minutes;
            this.calculateHandOfTheClock(angle, this.itemsRadius);
            this.onTimeUpdate(this.time, Config.FaceType.MINUTES);
        }
    }, {
        key: "updateHours",
        value: function updateHours(hours, angle, radius) {
            this.time.hours = hours;
            this.calculateHandOfTheClock(angle, radius);
            this.onTimeUpdate(this.time, Config.FaceType.HOURS);
        }
    }, {
        key: "calculateHandOfTheClock",
        value: function calculateHandOfTheClock(angle) {
            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.itemsRadius;

            this.handOfAClock.style.transform = "rotate(" + (angle - 90) + "deg)";
            this.handOfAClock.style.width = size + "px";
        }
    }, {
        key: "toggleToHours",
        value: function toggleToHours() {
            this.minutesFace.onLeave();
            this.toggleTime(this.hoursFace);
        }
    }, {
        key: "toggleToMinutes",
        value: function toggleToMinutes() {
            this.hoursFace.onLeave();
            this.toggleTime(this.minutesFace);
        }
    }, {
        key: "toggleTime",
        value: function toggleTime(face) {
            var _this3 = this;

            if (this.currentFace !== face) {
                this.onEachClockElement(function (c) {
                    return c.classList.add(css.fadeOut);
                });
                this.handOfAClock.classList.add(css.fadeOut);
                Promise.delay(function () {
                    _this3.onEachClockElement(function (c) {
                        return c.classList.remove(css.fadeOut);
                    });
                    _this3.handOfAClock.classList.remove(css.fadeOut);
                    _this3.changeDisplayed(face.displayed);
                    _this3.currentFace = face;
                    _this3.onEachClockElement(function (c) {
                        return _this3.removeSelected(c);
                    });
                    face.onEnter();
                }, 300);
            }
        }
    }, {
        key: "removeSelected",
        value: function removeSelected(c) {
            c.classList.remove(css.selected);
            c.style.background = "transparent";
            c.style.color = this.options.clockItemColor;
        }
    }]);
    return ClockFace;
}();

var hoursRegex = /^([0-1]?[0-9]|2[0-3])$/;
var minutesRegex = /^([0-5]?[0-9])$/;
var regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

function extractTime(date) {
    if (!date) return fromDate(new Date());else if (date instanceof Date) return fromDate(date);else if (hoursRegex.test(date.hours) && minutesRegex.test(date.minutes)) return { hours: parseInt(date.hours), minutes: parseInt(date.minutes) };else if (regex.test(date)) return fromRegex(date);else throw new TypeError("INVALID FORMAT: {" + JSON.stringify(date) + "}.\n            Time must be a Date or 'hh:MM' string or object with 'hours' and 'minutes' fields");
}

function fromRegex(date) {
    var parsed = regex.exec(date);
    return { hours: parseInt(parsed[1]), minutes: parseInt(parsed[2]) };
}

function fromDate(date) {
    return { hours: date.getHours(), minutes: date.getMinutes() };
}

var formatTime = function (time) {
    var extractedTime = extractTime(time);
    return (extractedTime.hours < 10 ? "0" + extractedTime.hours : extractedTime.hours) + ":" + (extractedTime.minutes < 10 ? "0" + extractedTime.minutes : extractedTime.minutes);
};

var Clock = function () {
    function Clock(options, time) {
        classCallCheck(this, Clock);

        this.options = options;

        this.initView();
        this.time = time;
        this.initElements();
    }

    createClass(Clock, [{
        key: "initView",
        value: function initView() {
            var _this = this;

            this.submitButton = document.getElementById(DOM.submitId);
            this.submitButton.onclick = function () {
                var time = _this.time;
                time.formatted = function () {
                    return formatTime(time);
                };
                _this.options.onSubmit(time);
                _this.options.onClose();
            };

            this.cancelButton = document.getElementById(DOM.cancelId);
            this.cancelButton.onclick = function () {
                return _this.options.onClose();
            };
        }
    }, {
        key: "initElements",
        value: function initElements() {
            var _this2 = this;

            this.header = new ClockHeader({
                options: this.options,
                time: this.time,
                onHourClicked: function onHourClicked() {
                    return _this2.toggleToHours();
                },
                onMinutesClicked: function onMinutesClicked() {
                    return _this2.toggleToMinutes();
                }
            });
            this.clockFace = new ClockFace(this.options, this.time, function (time, type) {
                return _this2.onTimeUpdate(time, type);
            });
        }
    }, {
        key: "onStart",
        value: function onStart() {
            this.clockFace.onStart();
        }
    }, {
        key: "toggleToHours",
        value: function toggleToHours() {
            this.clockFace.toggleToHours();
        }
    }, {
        key: "toggleToMinutes",
        value: function toggleToMinutes() {
            this.clockFace.toggleToMinutes();
        }
    }, {
        key: "onTimeUpdate",
        value: function onTimeUpdate(time, type) {
            this.time = time;
            this.header.time = time;
            this.header.updateDisplayedTime();
            if (type === Config.FaceType.MINUTES) this.header.toggleActiveToMinutes();
        }
    }]);
    return Clock;
}();

function styleColors(options) {
    document.getElementById(DOM.headerId).style.background = options.headerBackground;
    document.getElementById(DOM.headerId).style.color = options.headerColor;
    document.getElementById(DOM.wrapperId).style.background = options.wrapperBackground;
    document.getElementById(DOM.clockId).style.background = options.clockBackground;
    document.getElementById(DOM.handId).style.background = options.handColor;
    document.getElementById(DOM.dotId).style.background = options.handColor;
    document.getElementById(DOM.buttonsId).style.background = options.footerBackground;
    document.getElementById(DOM.submitId).style.color = options.submitColor;
    document.getElementById(DOM.cancelId).style.color = options.cancelColor;

    changeColor(css.clockItem, options.clockItemColor);
    changeColor(css.inner, options.clockItemInnerColor);
    changeColor(css.outer, options.handColor, "borderColor");
}

function changeColor(className, color) {
    var property = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "color";

    var items = Array.from(document.getElementsByClassName(className));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            item.style[property] = color;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function _showPicker() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var options = Object.assign({}, Config.clockConfig, config);
    var time = extractTime(options.time);

    var clockDiv = document.createElement("div");
    clockDiv.id = Config.clockId;
    clockDiv.innerHTML = clockHtml;
    document.body.appendChild(clockDiv);

    var clock = new Clock(options, time);
    styleColors(options);
    clock.onStart();
}

var index = {
    showPicker: function showPicker(config) {
        return _showPicker(config);
    },
    format: function format(time) {
        return formatTime(time);
    }
};

export default index;
//# sourceMappingURL=grudus-timepicker.js.map
