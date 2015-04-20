/**
 * Seadragon Ajax 0.8.9 (build 64702 on 2011-01-28)
 * http://gallery.expression.microsoft.com/SeadragonAjax
 * This code is distributed under the license agreement at:
 * http://go.microsoft.com/fwlink/?LinkId=164943
 */
(function (h, r, g, N) {
    var l = "100%", p = 10, w = "absolute", u = "relative", o = "hidden", L = " while executing ", f = "function", D = "mousewheel", k = "px", C = "inline-block", F = "span", j = "0px", B = "none", s = "div", H = "fixed", J = "undefined", z = ",", n = "number", d = "", I = "string", b = null, a = true, t = .5, c = false;
    if (!h.Seadragon)
        h.Seadragon = {};
    var v = h.Seadragon, i = v.Config;
    (function () {
        if (i)
            return;
        i = v.Config = {debugMode: c, animationTime: 1.5, blendTime: t, alwaysBlend: c, autoHideControls: a, constrainDuringPan: a, immediateRender: c, logarithmicZoom: a, wrapHorizontal: c, wrapVertical: c, wrapOverlays: c, transformOverlays: c, minZoomDimension: b, minZoomImageRatio: .8, maxZoomPixelRatio: 2, visibilityRatio: .8, springStiffness: 5, imageLoaderLimit: 2, clickTimeThreshold: 200, clickDistThreshold: 5, zoomPerClick: 2, zoomPerScroll: g.pow(2, 1 / 3), zoomPerSecond: 2, proxyUrl: b, imagePath: "img/"}
    })();
    var x = v.Strings;
    (function () {
        var a = "Hmm, this doesn't appear to be a valid Deep Zoom Image.";
        if (x)
            return;
        x = v.Strings = {Errors: {Failure: "Sorry, but Seadragon Ajax can't run on your browser!\nPlease try using IE 8 or Firefox 3.\n", Dzc: "Sorry, we don't support Deep Zoom Collections!", Dzi: a, Xml: a, Empty: "You asked us to open nothing, so we did just that.", ImageFormat: "Sorry, we don't support {0}-based Deep Zoom Images.", Security: "It looks like a security restriction stopped us from loading this Deep Zoom Image.", Status: "This space unintentionally left blank ({0} {1}).", Unknown: "Whoops, something inexplicably went wrong. Sorry!"}, Messages: {Loading: "Loading..."}, Tooltips: {FullPage: "Toggle full page", Home: "Go home", ZoomIn: "Zoom in (you can also use your mouse's scroll wheel)", ZoomOut: "Zoom out (you can also use your mouse's scroll wheel)"}};
        x.getString = function (f) {
            for (var c = f.split("."), a = x, b = 0; b < c.length; b++)
                a = a[c[b]] || {};
            if (typeof a != I)
                a = d;
            var e = arguments;
            return a.replace(/\{\d+\}/g, function (b) {
                var a = parseInt(b.match(/\d+/)) + 1;
                return a < e.length ? e[a] : d
            })
        };
        x.setString = function (e, d) {
            for (var c = e.split("."), b = x, a = 0; a < c.length - 1; a++) {
                if (!b[c[a]])
                    b[c[a]] = {};
                b = b[c[a]]
            }
            b[c[a]] = d
        }
    })();
    var q = function () {
        this.log = function (c, d) {
            var a = h.console || {}, b = i.debugMode;
            if (b && a.log)
                a.log(c);
            else
                b && d && alert(c)
        };
        this.error = function (b, d) {
            var c = h.console || {}, a = i.debugMode;
            if (a && c.error)
                c.error(b);
            else
                a && alert(b);
            if (a)
                throw d || new Error(b)
        };
        this.fail = function (a) {
            alert(x.getString("Errors.Failure"));
            throw new Error(a)
        }
    };
    q = v.Debug = new q;
    var U = v.Profiler = function () {
        var d = this, o = d, f = c, e = 0, h = b, l = b, j = Infinity, g = 0, i = 0, n = Infinity, k = 0, m = 0;
        d.getAvgUpdateTime = function () {
            return g
        };
        d.getMinUpdateTime = function () {
            return j
        };
        d.getMaxUpdateTime = function () {
            return i
        };
        d.getAvgIdleTime = function () {
            return k
        };
        d.getMinIdleTime = function () {
            return n
        };
        d.getMaxIdleTime = function () {
            return m
        };
        d.isMidUpdate = function () {
            return f
        };
        d.getNumUpdates = function () {
            return e
        };
        d.beginUpdate = function () {
            f && o.endUpdate();
            f = a;
            h = (new Date).getTime();
            if (e < 1)
                return;
            var b = h - l;
            k = (k * (e - 1) + b) / e;
            if (b < n)
                n = b;
            if (b > m)
                m = b
        };
        d.endUpdate = function () {
            if (!f)
                return;
            l = (new Date).getTime();
            f = c;
            var a = l - h;
            e++;
            g = (g * (e - 1) + a) / e;
            if (a < j)
                j = a;
            if (a > i)
                i = a
        };
        d.clearProfile = function () {
            f = c;
            e = 0;
            h = b;
            l = b;
            j = Infinity;
            g = 0;
            i = 0;
            n = Infinity;
            k = 0;
            m = 0
        }
    }, m = v.Point;
    (function () {
        if (m)
            return;
        m = v.Point = function (a, b) {
            this.x = typeof a == n ? a : 0;
            this.y = typeof b == n ? b : 0
        };
        var a = m.prototype;
        a.plus = function (a) {
            return new m(this.x + a.x, this.y + a.y)
        };
        a.minus = function (a) {
            return new m(this.x - a.x, this.y - a.y)
        };
        a.times = function (a) {
            return new m(this.x * a, this.y * a)
        };
        a.divide = function (a) {
            return new m(this.x / a, this.y / a)
        };
        a.negate = function () {
            return new m(-this.x, -this.y)
        };
        a.distanceTo = function (a) {
            return g.sqrt(g.pow(this.x - a.x, 2) + g.pow(this.y - a.y, 2))
        };
        a.apply = function (a) {
            return new m(a(this.x), a(this.y))
        };
        a.equals = function (a) {
            return a instanceof m && this.x === a.x && this.y === a.y
        };
        a.toString = function () {
            return "(" + this.x + z + this.y + ")"
        }
    })();
    var y = v.Rect;
    (function () {
        if (y)
            return;
        y = v.Rect = function (d, e, c, b) {
            var a = this;
            a.x = typeof d == n ? d : 0;
            a.y = typeof e == n ? e : 0;
            a.width = typeof c == n ? c : 0;
            a.height = typeof b == n ? b : 0
        };
        var a = y.prototype;
        a.getAspectRatio = function () {
            return this.width / this.height
        };
        a.getTopLeft = function () {
            return new m(this.x, this.y)
        };
        a.getBottomRight = function () {
            var a = this;
            return new m(a.x + a.width, a.y + a.height)
        };
        a.getCenter = function () {
            var a = this;
            return new m(a.x + a.width / 2, a.y + a.height / 2)
        };
        a.getSize = function () {
            return new m(this.width, this.height)
        };
        a.equals = function (a) {
            var b = this;
            return a instanceof y && b.x === a.x && b.y === a.y && b.width === a.width && b.height === a.height
        };
        a.toString = function () {
            var a = this;
            return "[" + a.x + z + a.y + z + a.width + "x" + a.height + "]"
        }
    })();
    var Q = v.Spring = function (j) {
        var c = this, d = typeof j == n ? j : 0, e = d, b = d, a = (new Date).getTime(), h = a, f = a;
        function k(b) {
            var a = i.springStiffness;
            return (1 - g.exp(-b * a)) / (1 - g.exp(-a))
        }
        c.getCurrent = function () {
            return d
        };
        c.getTarget = function () {
            return b
        };
        c.resetTo = function (c) {
            b = c;
            f = a;
            e = b;
            h = f
        };
        c.springTo = function (c) {
            e = d;
            h = a;
            b = c;
            f = h + 1e3 * i.animationTime
        };
        c.shiftBy = function (a) {
            e += a;
            b += a
        };
        c.update = function () {
            a = (new Date).getTime();
            d = a >= f ? b : e + (b - e) * k((a - h) / (f - h))
        }
    }, A = v.Browser = {UNKNOWN: 0, IE: 1, FIREFOX: 2, SAFARI: 3, CHROME: 4, OPERA: 5}, e = function () {
        var t = "DOMMouseScroll", l = this, o = l, x = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"], z = {bmp: c, jpeg: a, jpg: a, png: a, tif: c, wdp: c}, u = A.UNKNOWN, p = 0, v = c, y = {};
        (function () {
            var d = navigator.appName, o = navigator.appVersion, a = navigator.userAgent;
            if (d == "Microsoft Internet Explorer" && !!h.attachEvent && !!h.ActiveXObject) {
                var i = a.indexOf("MSIE");
                u = A.IE;
                p = parseFloat(a.substring(i + 5, a.indexOf(";", i)));
                var j = r.documentMode;
                if (typeof j !== J)
                    p = j
            } else if (d == "Netscape" && !!h.addEventListener) {
                var g = a.indexOf("Firefox"), b = a.indexOf("Safari"), l = a.indexOf("Chrome");
                if (g >= 0) {
                    u = A.FIREFOX;
                    p = parseFloat(a.substring(g + 8))
                } else if (b >= 0) {
                    var n = a.substring(0, b).lastIndexOf("/");
                    u = l >= 0 ? A.CHROME : A.SAFARI;
                    p = parseFloat(a.substring(n + 1, b))
                }
            } else if (d == "Opera" && !!h.opera && !!h.attachEvent) {
                u = A.OPERA;
                p = parseFloat(o)
            }
            for (var m = h.location.search.substring(1), k = m.split("&"), f = 0; f < k.length; f++) {
                var c = k[f], e = c.indexOf("=");
                if (e > 0)
                    y[c.substring(0, e)] = decodeURIComponent(c.substring(e + 1))
            }
            v = u == A.IE && p < 9 || u == A.CHROME && p < 2
        })();
        function w(a, b) {
            if (b && a != r.body)
                return r.body;
            else
                return a.offsetParent
        }
        l.getBrowser = function () {
            return u
        };
        l.getBrowserVersion = function () {
            return p
        };
        l.getElement = function (a) {
            if (typeof a == I)
                a = r.getElementById(a);
            return a
        };
        l.getElementPosition = function (a) {
            var a = o.getElement(a), b = new m, c = o.getElementStyle(a).position == H, d = w(a, c);
            while (d) {
                b.x += a.offsetLeft;
                b.y += a.offsetTop;
                if (c)
                    b = b.plus(o.getPageScroll());
                a = d;
                c = o.getElementStyle(a).position == H;
                d = w(a, c)
            }
            return b
        };
        l.getElementSize = function (a) {
            var a = o.getElement(a);
            return new m(a.clientWidth, a.clientHeight)
        };
        l.getElementStyle = function (a) {
            var a = o.getElement(a);
            if (a.currentStyle)
                return a.currentStyle;
            else if (h.getComputedStyle)
                return h.getComputedStyle(a, d);
            else
                q.fail("Unknown element style, no known technique.")
        };
        l.getEvent = function (a) {
            return a ? a : h.event
        };
        l.getMousePosition = function (a) {
            var a = o.getEvent(a), b = new m;
            if (a.type == t && u == A.FIREFOX && p < 3) {
                b.x = a.screenX;
                b.y = a.screenY
            } else if (typeof a.pageX == n) {
                b.x = a.pageX;
                b.y = a.pageY
            } else if (typeof a.clientX == n) {
                b.x = a.clientX + r.body.scrollLeft + r.documentElement.scrollLeft;
                b.y = a.clientY + r.body.scrollTop + r.documentElement.scrollTop
            } else
                q.fail("Unknown event mouse position, no known technique.");
            return b
        };
        l.getMouseScroll = function (b) {
            var b = o.getEvent(b), a = 0;
            if (typeof b.wheelDelta == n)
                a = b.wheelDelta;
            else if (typeof b.detail == n)
                a = b.detail * -1;
            else
                q.fail("Unknown event mouse scroll, no known technique.");
            return a ? a / g.abs(a) : 0
        };
        l.getPageScroll = function () {
            var a = new m, b = r.documentElement || {}, c = r.body || {};
            if (typeof h.pageXOffset == n) {
                a.x = h.pageXOffset;
                a.y = h.pageYOffset
            } else if (c.scrollLeft || c.scrollTop) {
                a.x = c.scrollLeft;
                a.y = c.scrollTop
            } else if (b.scrollLeft || b.scrollTop) {
                a.x = b.scrollLeft;
                a.y = b.scrollTop
            }
            return a
        };
        l.getWindowSize = function () {
            var a = new m, b = r.documentElement || {}, c = r.body || {};
            if (typeof h.innerWidth == n) {
                a.x = h.innerWidth;
                a.y = h.innerHeight
            } else if (b.clientWidth || b.clientHeight) {
                a.x = b.clientWidth;
                a.y = b.clientHeight
            } else if (c.clientWidth || c.clientHeight) {
                a.x = c.clientWidth;
                a.y = c.clientHeight
            } else
                q.fail("Unknown window size, no known technique.");
            return a
        };
        l.imageFormatSupported = function (a) {
            var a = a ? a : d;
            return !!z[a.toLowerCase()]
        };
        l.makeCenteredNode = function (h) {
            var b = "border:none; margin:0px; padding:0px;", h = e.getElement(h), c = o.makeNeutralElement(s), a = [];
            a.push('<div style="display:table; height:100%; width:100%;');
            a.push(b);
            a.push('#position:relative; overflow:hidden; text-align:left;">');
            a.push('<div style="#position:absolute; #top:50%; width:100%; ');
            a.push(b);
            a.push('display:table-cell; vertical-align:middle;">');
            a.push('<div style="#position:relative; #top:-50%; width:100%; ');
            a.push(b);
            a.push('text-align:center;"></div></div></div>');
            c.innerHTML = a.join(d);
            c = c.firstChild;
            var g = c, f = c.getElementsByTagName(s);
            while (f.length > 0) {
                g = f[0];
                f = g.getElementsByTagName(s)
            }
            g.appendChild(h);
            return c
        };
        l.makeNeutralElement = function (c) {
            var b = r.createElement(c), a = b.style;
            a.background = "transparent none";
            a.border = B;
            a.margin = j;
            a.padding = j;
            a.position = "static";
            return b
        };
        l.makeTransparentImage = function (d) {
            var c = o.makeNeutralElement("img"), a = b;
            if (u == A.IE && p < 7) {
                a = o.makeNeutralElement(F);
                a.style.display = C;
                c.onload = function () {
                    a.style.width = a.style.width || c.width + k;
                    a.style.height = a.style.height || c.height + k;
                    c.onload = b;
                    c = b
                };
                c.src = d;
                a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + d + "', sizingMethod='scale')"
            } else {
                a = c;
                a.src = d
            }
            return a
        };
        l.setElementOpacity = function (b, a, f) {
            var b = o.getElement(b);
            if (f && v)
                a = g.round(a);
            if (a < 1)
                b.style.opacity = a;
            else
                b.style.opacity = d;
            var c = b.style.filter || d;
            b.style.filter = c.replace(/[\s]*alpha\(.*?\)[\s]*/g, d);
            if (a >= 1)
                return;
            var e = g.round(100 * a), h = " alpha(opacity=" + e + ") ";
            b.style.filter += h
        };
        l.addEvent = function (a, c, d, b) {
            var a = o.getElement(a);
            if (a.addEventListener) {
                c == D && a.addEventListener(t, d, b);
                a.addEventListener(c, d, b)
            } else if (a.attachEvent) {
                a.attachEvent("on" + c, d);
                b && a.setCapture && a.setCapture()
            } else
                q.fail("Unable to attach event handler, no known technique.")
        };
        l.removeEvent = function (a, c, d, b) {
            var a = o.getElement(a);
            if (a.removeEventListener) {
                c == D && a.removeEventListener(t, d, b);
                a.removeEventListener(c, d, b)
            } else if (a.detachEvent) {
                a.detachEvent("on" + c, d);
                b && a.releaseCapture && a.releaseCapture()
            } else
                q.fail("Unable to detach event handler, no known technique.")
        };
        l.cancelEvent = function (b) {
            var b = o.getEvent(b);
            b.preventDefault && b.preventDefault();
            b.cancel = a;
            b.returnValue = c
        };
        l.stopEvent = function (b) {
            var b = o.getEvent(b);
            b.stopPropagation && b.stopPropagation();
            b.cancelBubble = a
        };
        l.createCallback = function (d, c) {
            for (var b = [], a = 2; a < arguments.length; a++)
                b.push(arguments[a]);
            return function () {
                for (var e = b.concat([]), a = 0; a < arguments.length; a++)
                    e.push(arguments[a]);
                return c.apply(d, e)
            }
        };
        l.getUrlParameter = function (c) {
            var a = y[c];
            return a ? a : b
        };
        l.makeAjaxRequest = function (j, d) {
            var c = typeof d == f, a = b;
            if (c)
                var l = d, d = function () {
                h.setTimeout(e.createCallback(b, l, a), 1)
            };
            if (h.ActiveXObject)
                for (var k = 0; k < x.length; k++)
                    try {
                        a = new ActiveXObject(x[k]);
                        break
                    } catch (g) {
                        continue
                    }
            else if (h.XMLHttpRequest)
                a = new XMLHttpRequest;
            !a && q.fail("Browser doesn't support XMLHttpRequest.");
            if (i.proxyUrl)
                j = i.proxyUrl + j;
            if (c)
                a.onreadystatechange = function () {
                    if (a.readyState == 4) {
                        a.onreadystatechange = new Function;
                        d()
                    }
                };
            try {
                a.open("GET", j, c);
                a.send(b)
            } catch (g) {
                q.log(g.name + " while making AJAX request: " + g.message);
                a.onreadystatechange = b;
                a = b;
                c && d()
            }
            return c ? b : a
        };
        l.parseXml = function (e) {
            var d = b;
            if (h.ActiveXObject)
                try {
                    d = new ActiveXObject("Microsoft.XMLDOM");
                    d.async = c;
                    d.loadXML(e)
                } catch (a) {
                    q.log(a.name + " while parsing XML (ActiveX): " + a.message)
                }
            else if (h.DOMParser)
                try {
                    var f = new DOMParser;
                    d = f.parseFromString(e, "text/xml")
                } catch (a) {
                    q.log(a.name + " while parsing XML (DOMParser): " + a.message)
                }
            else
                q.fail("Browser doesn't support XML DOM.");
            return d
        }
    };
    e = v.Utils = new e;
    var M = v.MouseTracker;
    (function () {
        var d = "mouseup", j = "mousedown";
        if (M)
            return;
        var l = e.getBrowser() == A.IE && e.getBrowserVersion() < 9, o = c, t = c, s = {}, m = [];
        function p(a) {
            return e.getMousePosition(a)
        }
        function k(b, d) {
            var c = e.getMousePosition(b), a = e.getElementPosition(d);
            return c.minus(a)
        }
        function n(b, a) {
            var d = r.body;
            while (a && b != a && d != a)
                try {
                    a = a.parentNode
                } catch (e) {
                    return c
                }
            return b == a
        }
        function u() {
            o = a
        }
        function w() {
            o = c
        }
        (function () {
            if (l) {
                e.addEvent(r, j, u, c);
                e.addEvent(r, d, w, c)
            } else {
                e.addEvent(h, j, u, a);
                e.addEvent(h, d, w, a)
            }
        })();
        M = v.MouseTracker = function (u) {
            var w = "mousemove", z = "mouseout", y = "mouseover", x = this, v = x, H = b, M = g.random(), u = e.getElement(u), F = c, A = c, C = c, E = c, G = b, O = b, N = b;
            x.target = u;
            x.enterHandler = b;
            x.exitHandler = b;
            x.pressHandler = b;
            x.releaseHandler = b;
            x.clickHandler = b;
            x.dragHandler = b;
            x.scrollHandler = b;
            function X() {
                if (!F) {
                    e.addEvent(u, y, K, c);
                    e.addEvent(u, z, L, c);
                    e.addEvent(u, j, U, c);
                    e.addEvent(u, d, B, c);
                    e.addEvent(u, D, R, c);
                    e.addEvent(u, "click", T, c);
                    F = a;
                    s[M] = H
                }
            }
            function Z() {
                if (F) {
                    e.removeEvent(u, y, K, c);
                    e.removeEvent(u, z, L, c);
                    e.removeEvent(u, j, U, c);
                    e.removeEvent(u, d, B, c);
                    e.removeEvent(u, D, R, c);
                    e.removeEvent(u, "click", T, c);
                    I();
                    F = c;
                    delete s[M]
                }
            }
            function Y() {
                if (!A) {
                    if (l) {
                        e.removeEvent(u, d, B, c);
                        e.addEvent(u, d, V, a);
                        e.addEvent(u, w, Q, a)
                    } else {
                        e.addEvent(h, d, P, a);
                        e.addEvent(h, w, J, a)
                    }
                    A = a
                }
            }
            function I() {
                if (A) {
                    if (l) {
                        e.removeEvent(u, w, Q, a);
                        e.removeEvent(u, d, V, a);
                        e.addEvent(u, d, B, c)
                    } else {
                        e.removeEvent(h, w, J, a);
                        e.removeEvent(h, d, P, a)
                    }
                    A = c
                }
            }
            function S(c, d) {
                var b = s;
                for (var a in b)
                    b.hasOwnProperty(a) && M != a && b[a][c](d)
            }
            function ab() {
                return E
            }
            function K(b) {
                var b = e.getEvent(b);
                l && A && !n(b.srcElement, u) && S("onMouseOver", b);
                var g = b.target ? b.target : b.srcElement, d = b.relatedTarget ? b.relatedTarget : b.fromElement;
                if (!n(u, g) || n(u, d))
                    return;
                E = a;
                if (typeof v.enterHandler == f)
                    try {
                        v.enterHandler(v, k(b, u), C, o)
                    } catch (c) {
                        q.error(c.name + " while executing enter handler: " + c.message, c)
                    }
            }
            function L(a) {
                var a = e.getEvent(a);
                l && A && !n(a.srcElement, u) && S("onMouseOut", a);
                var d = a.target ? a.target : a.srcElement, g = a.relatedTarget ? a.relatedTarget : a.toElement;
                if (!n(u, d) || n(u, g))
                    return;
                E = c;
                if (typeof v.exitHandler == f)
                    try {
                        v.exitHandler(v, k(a, u), C, o)
                    } catch (b) {
                        q.error(b.name + " while executing exit handler: " + b.message, b)
                    }
            }
            function U(b) {
                var b = e.getEvent(b);
                if (b.button == 2)
                    return;
                C = a;
                G = p(b);
                N = G;
                O = (new Date).getTime();
                if (typeof v.pressHandler == f)
                    try {
                        v.pressHandler(v, k(b, u))
                    } catch (c) {
                        q.error(c.name + " while executing press handler: " + c.message, c)
                    }
                (v.pressHandler || v.dragHandler) && e.cancelEvent(b);
                if (!l || !t) {
                    Y();
                    t = a;
                    m = [H]
                } else
                    l && m.push(H)
            }
            function B(a) {
                var a = e.getEvent(a), g = C, d = E;
                if (a.button == 2)
                    return;
                C = c;
                if (typeof v.releaseHandler == f)
                    try {
                        v.releaseHandler(v, k(a, u), g, d)
                    } catch (b) {
                        q.error(b.name + " while executing release handler: " + b.message, b)
                    }
                g && d && W(a)
            }
            function V(a) {
                var a = e.getEvent(a);
                if (a.button == 2)
                    return;
                for (var b = 0; b < m.length; b++) {
                    var d = m[b];
                    !d.hasMouse() && d.onMouseUp(a)
                }
                I();
                t = c;
                a.srcElement.fireEvent("on" + a.type, r.createEventObject(a));
                e.stopEvent(a)
            }
            function P(a) {
                !E && B(a);
                I()
            }
            function T(a) {
                v.clickHandler && e.cancelEvent(a)
            }
            function W(a) {
                var a = e.getEvent(a);
                if (a.button == 2)
                    return;
                var h = (new Date).getTime() - O, d = p(a), c = N.distanceTo(d), g = h <= i.clickTimeThreshold && c <= i.clickDistThreshold;
                if (typeof v.clickHandler == f)
                    try {
                        v.clickHandler(v, k(a, u), g, a.shiftKey)
                    } catch (b) {
                        q.error(b.name + " while executing click handler: " + b.message, b)
                    }
            }
            function J(a) {
                var a = e.getEvent(a), c = p(a), d = c.minus(G);
                G = c;
                if (typeof v.dragHandler == f) {
                    try {
                        v.dragHandler(v, k(a, u), d, a.shiftKey)
                    } catch (b) {
                        q.error(b.name + " while executing drag handler: " + b.message, b)
                    }
                    e.cancelEvent(a)
                }
            }
            function Q(b) {
                for (var a = 0; a < m.length; a++)
                    m[a].onMouseMove(b);
                e.stopEvent(b)
            }
            function R(a) {
                var a = e.getEvent(a), c = e.getMouseScroll(a);
                if (typeof v.scrollHandler == f) {
                    if (c)
                        try {
                            v.scrollHandler(v, k(a, u), c, a.shiftKey)
                        } catch (b) {
                            q.error(b.name + " while executing scroll handler: " + b.message, b)
                        }
                    e.cancelEvent(a)
                }
            }
            (function () {
                H = {hasMouse: ab, onMouseOver: K, onMouseOut: L, onMouseUp: B, onMouseMove: J}
            })();
            x.isTracking = function () {
                return F
            };
            x.setTracking = function (a) {
                if (a)
                    X();
                else
                    Z()
            }
        }
    })();
    var W = v.EventManager = function () {
        var b = this, a = {};
        b.addListener = function (b, c) {
            if (typeof c != f)
                return;
            if (!a[b])
                a[b] = [];
            a[b].push(c)
        };
        b.removeListener = function (e, d) {
            var b = a[e];
            if (typeof d != f)
                return;
            else if (!b)
                return;
            for (var c = 0; c < b.length; c++)
                if (d == b[c]) {
                    b.splice(c, 1);
                    return
                }
        };
        b.clearListeners = function (b) {
            if (a[b])
                delete a[b]
        };
        b.trigger = function (e) {
            var d = a[e], f = [];
            if (!d)
                return;
            for (var b = 1; b < arguments.length; b++)
                f.push(arguments[b]);
            for (var b = 0; b < d.length; b++)
                try {
                    d[b].apply(h, f)
                } catch (c) {
                    q.error(c.name + L + e + " handler: " + c.message, c)
                }
        }
    }, S;
    (function () {
        var d = 15000;
        function g(i, j) {
            var e = b, f = b;
            function g(a) {
                e.onload = b;
                e.onabort = b;
                e.onerror = b;
                f && h.clearTimeout(f);
                h.setTimeout(function () {
                    j(i, a ? e : b)
                }, 1)
            }
            this.start = function () {
                e = new Image;
                var j = function () {
                    g(a)
                }, b = function () {
                    g(c)
                }, k = function () {
                    q.log("Image timed out: " + i);
                    g(c)
                };
                e.onload = j;
                e.onabort = b;
                e.onerror = b;
                f = h.setTimeout(k, d);
                e.src = i
            }
        }
        S = v.ImageLoader = function () {
            var d = 0;
            function h(b, e, c) {
                d--;
                if (typeof b == f)
                    try {
                        b(c)
                    } catch (a) {
                        q.error(a.name + L + e + " callback: " + a.message, a)
                    }
            }
            this.loadImage = function (l, f) {
                if (d >= i.imageLoaderLimit)
                    return c;
                var j = e.createCallback(b, h, f), k = new g(l, j);
                d++;
                k.start();
                return a
            }
        }
    })();
    var O, R;
    (function () {
        var i = {REST: 0, GROUP: 1, HOVER: 2, DOWN: 3};
        O = v.Button = function (W, V, S, T, U, y, q, v, x, z) {
            var l = e.makeNeutralElement(F), k = i.GROUP, m = new M(l), H = e.makeTransparentImage(V), r = e.makeTransparentImage(S), s = e.makeTransparentImage(T), t = e.makeTransparentImage(U), y = typeof y == f ? y : b, q = typeof q == f ? q : b, v = typeof v == f ? v : b, x = typeof x == f ? x : b, z = typeof z == f ? z : b, G = 0, P = 2e3, D = b, B = c;
            this.elmt = l;
            function E() {
                h.setTimeout(R, 20)
            }
            function R() {
                if (B) {
                    var c = (new Date).getTime(), d = c - D, b = 1 - d / P;
                    b = g.min(1, b);
                    b = g.max(0, b);
                    e.setElementOpacity(r, b, a);
                    b > 0 && E()
                }
            }
            function N() {
                B = a;
                D = (new Date).getTime() + G;
                h.setTimeout(E, G)
            }
            function Q() {
                B = c;
                e.setElementOpacity(r, 1, a)
            }
            function p(a) {
                if (a >= i.GROUP && k == i.REST) {
                    Q();
                    k = i.GROUP
                }
                if (a >= i.HOVER && k == i.GROUP) {
                    s.style.visibility = d;
                    k = i.HOVER
                }
                if (a >= i.DOWN && k == i.HOVER) {
                    t.style.visibility = d;
                    k = i.DOWN
                }
            }
            function n(a) {
                if (a <= i.HOVER && k == i.DOWN) {
                    t.style.visibility = o;
                    k = i.HOVER
                }
                if (a <= i.GROUP && k == i.HOVER) {
                    s.style.visibility = o;
                    k = i.GROUP
                }
                if (a <= i.REST && k == i.GROUP) {
                    N();
                    k = i.REST
                }
            }
            function K(d, c, a, b) {
                if (a) {
                    p(i.DOWN);
                    x && x()
                } else
                    !b && p(i.HOVER)
            }
            function O(d, c, a) {
                n(i.GROUP);
                a && z && z()
            }
            function L() {
                p(i.DOWN);
                y && y()
            }
            function I(d, c, a, b) {
                if (a && b) {
                    n(i.HOVER);
                    q && q()
                } else if (a)
                    n(i.GROUP);
                else
                    p(i.HOVER)
            }
            function J(c, b, a) {
                v && a && v()
            }
            this.notifyGroupEnter = function () {
                p(i.GROUP)
            };
            this.notifyGroupExit = function () {
                n(i.REST)
            };
            (function () {
                l.style.display = C;
                l.style.position = u;
                l.title = W;
                l.appendChild(H);
                l.appendChild(r);
                l.appendChild(s);
                l.appendChild(t);
                var g = H.style, f = r.style, b = s.style, c = t.style;
                f.position = b.position = c.position = w;
                f.top = b.top = c.top = j;
                f.left = b.left = c.left = j;
                b.visibility = c.visibility = o;
                if (e.getBrowser() == A.FIREFOX && e.getBrowserVersion() < 3)
                    f.top = b.top = c.top = d;
                m.enterHandler = K;
                m.exitHandler = O;
                m.pressHandler = L;
                m.releaseHandler = I;
                m.clickHandler = J;
                m.setTracking(a);
                n(i.REST)
            })()
        };
        R = v.ButtonGroup = function (b) {
            var d = e.makeNeutralElement(F), b = b.concat([]), c = new M(d);
            this.elmt = d;
            function f() {
                for (var a = 0; a < b.length; a++)
                    b[a].notifyGroupEnter()
            }
            function g(f, e, c) {
                if (!c)
                    for (var a = 0; a < b.length; a++)
                        b[a].notifyGroupExit()
            }
            function h(f, e, d, c) {
                if (!c)
                    for (var a = 0; a < b.length; a++)
                        b[a].notifyGroupExit()
            }
            this.emulateEnter = function () {
                f()
            };
            this.emulateExit = function () {
                g()
            };
            (function () {
                d.style.display = C;
                for (var e = 0; e < b.length; e++)
                    d.appendChild(b[e].elmt);
                c.enterHandler = f;
                c.exitHandler = g;
                c.releaseHandler = h;
                c.setTracking(a)
            })()
        }
    })();
    var T = v.TileSource = function (d, c, i, e, h, f) {
        var b = this, a = b, j = c / d;
        b.width = d;
        b.height = c;
        b.aspectRatio = d / c;
        b.dimensions = new m(d, c);
        b.minLevel = h ? h : 0;
        b.maxLevel = f ? f : g.ceil(g.log(g.max(d, c)) / g.log(2));
        b.tileSize = i ? i : 0;
        b.tileOverlap = e ? e : 0;
        b.getLevelScale = function (b) {
            return 1 / (1 << a.maxLevel - b)
        };
        b.getNumTiles = function (e) {
            var b = a.getLevelScale(e), f = g.ceil(b * d / a.tileSize), h = g.ceil(b * c / a.tileSize);
            return new m(f, h)
        };
        b.getPixelRatio = function (c) {
            var b = a.dimensions.times(a.getLevelScale(c)), d = 1 / b.x, e = 1 / b.y;
            return new m(d, e)
        };
        b.getTileAtPoint = function (h, d) {
            var b = a.dimensions.times(a.getLevelScale(h)), c = d.times(b.x), e, f;
            if (d.x >= 0 && d.x <= 1)
                e = g.floor(c.x / a.tileSize);
            else
                e = g.ceil(b.x / a.tileSize) * g.floor(c.x / b.x) + g.floor((b.x + c.x % b.x) % b.x / a.tileSize);
            if (d.y >= 0 && d.y <= j)
                f = g.floor(c.y / a.tileSize);
            else
                f = g.ceil(b.y / a.tileSize) * g.floor(c.y / b.y) + g.floor((b.y + c.y % b.y) % b.y / a.tileSize);
            return new m(e, f)
        };
        b.getTileBounds = function (k, f, h) {
            var c = a.dimensions.times(a.getLevelScale(k)), i = f === 0 ? 0 : a.tileSize * f - a.tileOverlap, j = h === 0 ? 0 : a.tileSize * h - a.tileOverlap, d = a.tileSize + (f === 0 ? 1 : 2) * a.tileOverlap, e = a.tileSize + (h === 0 ? 1 : 2) * a.tileOverlap;
            d = g.min(d, c.x - i);
            e = g.min(e, c.y - j);
            var b = 1 / c.x;
            return new y(i * b, j * b, d * b, e * b)
        };
        b.getTileUrl = function () {
            throw new Error("Method not implemented.")
        };
        b.tileExists = function (b, d, e) {
            var c = a.getNumTiles(b);
            return b >= a.minLevel && b <= a.maxLevel && d >= 0 && e >= 0 && d < c.x && e < c.y
        }
    }, P = v.DisplayRect = function (e, f, d, c, b, a) {
        y.apply(this, arguments);
        this.minLevel = b;
        this.maxLevel = a
    };
    P.prototype = new y;
    var K = v.DziTileSource = function (m, l, e, j, k, i, f) {
        var b = this;
        T.apply(b, [m, l, e, j]);
        var n = b, h = {};
        b.fileFormat = i;
        b.tileFormat = i;
        b.displayRects = f;
        (function () {
            if (!f)
                return;
            for (var c = f.length - 1; c >= 0; c--)
                for (var b = f[c], a = b.minLevel; a <= b.maxLevel; a++) {
                    if (!h[a])
                        h[a] = [];
                    h[a].push(b)
                }
        })();
        b.getTileUrl = function (a, b, c) {
            return [k, a, "/", b, "_", c, ".", i].join(d)
        };
        b.tileExists = function (d, p, q) {
            var f = h[d];
            if (!f || !f.length)
                return a;
            for (var i = n.getLevelScale(d), o = f.length - 1; o >= 0; o--) {
                var b = f[o];
                if (d < b.minLevel || d > b.maxLevel)
                    continue;
                var j = b.x * i, k = b.y * i, l = j + b.width * i, m = k + b.height * i;
                j = g.floor(j / e);
                k = g.floor(k / e);
                l = g.ceil(l / e);
                m = g.ceil(m / e);
                if (j <= p && p < l && k <= q && q < m)
                    return a
            }
            return c
        }
    };
    K.prototype = new T;
    (function () {
        var c = "Errors.Empty";
        function a(a) {
            Error.apply(this, arguments);
            this.message = a
        }
        a.prototype = new Error;
        function i(b) {
            if (!(b instanceof a)) {
                q.error(b.name + " while creating DZI from XML: " + b.message);
                b = new a(x.getString("Errors.Unknown"))
            }
            return b
        }
        function d(d) {
            var a = d.split("/"), b = a[a.length - 1], c = b.lastIndexOf(".");
            if (c > -1)
                a[a.length - 1] = b.slice(0, c);
            return a.join("/") + "_files/"
        }
        function j(c, i) {
            if (!c)
                throw new a(x.getString("Errors.Security"));
            else if (c.status !== 200 && c.status !== 0) {
                var f = c.status, h = f == 404 ? "Not Found" : c.statusText;
                throw new a(x.getString("Errors.Status", f, h))
            }
            var d = b;
            if (c.responseXML && c.responseXML.documentElement)
                d = c.responseXML;
            else if (c.responseText)
                d = e.parseXml(c.responseText);
            return g(d, i)
        }
        function g(d, g) {
            var b = "Errors.Dzi";
            if (!d || !d.documentElement)
                throw new a(x.getString("Errors.Xml"));
            var e = d.documentElement, c = e.tagName;
            if (c == "Image")
                try {
                    return l(e, g)
                } catch (f) {
                    var h = x.getString(b);
                    throw f instanceof a ? f : new a(h)
                }
            else if (c == "Collection")
                throw new a(x.getString("Errors.Dzc"));
            else if (c == "Error")
                return k(e);
            throw new a(x.getString(b))
        }
        function l(b, m) {
            var f = b.getAttribute("Format");
            if (!e.imageFormatSupported(f))
                throw new a(x.getString("Errors.ImageFormat", f.toUpperCase()));
            for (var j = b.getElementsByTagName("Size")[0], h = b.getElementsByTagName("DisplayRect"), o = parseInt(j.getAttribute("Width"), p), n = parseInt(j.getAttribute("Height"), p), l = parseInt(b.getAttribute("TileSize")), k = parseInt(b.getAttribute("Overlap")), i = [], g = 0; g < h.length; g++) {
                var d = h[g], c = d.getElementsByTagName("Rect")[0];
                i.push(new P(parseInt(c.getAttribute("X"), p), parseInt(c.getAttribute("Y"), p), parseInt(c.getAttribute("Width"), p), parseInt(c.getAttribute("Height"), p), parseInt(d.getAttribute("MinLevel"), p), parseInt(d.getAttribute("MaxLevel"), p)))
            }
            return new K(o, n, l, k, m, f, i)
        }
        function k(c) {
            var b = c.getElementsByTagName("Message")[0], d = b.firstChild.nodeValue;
            throw new a(d)
        }
        K.getTilesUrl = d;
        K.createFromJson = function (q, o) {
            var r = typeof o == f, m, k, g = q;
            if (!g || !g.url && !g.tilesUrl)
                k = new a(x.getString(c));
            else
                try {
                    var l = g.displayRects;
                    if (l && l.length)
                        for (var n = 0, s = l.length; n < s; n++) {
                            var j = l[n];
                            l[n] = new P(j.x || j[0], j.y || j[1], j.width || j[2], j.height || j[3], j.minLevel || j[4], j.maxLevel || j[5])
                        }
                    m = new K(g.width, g.height, g.tileSize, g.tileOverlap, g.tilesUrl || d(g.url), g.tileFormat, g.displayRects);
                    m.xmlUrl = g.url
                } catch (p) {
                    k = i(p)
                }
            if (r)
                h.setTimeout(e.createCallback(b, o, m, k && k.message), 1);
            else if (k)
                throw k;
            else
                return m
        };
        K.createFromXml = function (l, m, n) {
            var p = typeof n == f, k = b;
            if (!l) {
                k = x.getString(c);
                if (p) {
                    h.setTimeout(function () {
                        n(b, k)
                    }, 1);
                    return b
                }
                throw new a(k)
            }
            var q = d(l);
            function o(d, e) {
                try {
                    var c = d(e, q);
                    c.xmlUrl = l;
                    return c
                } catch (a) {
                    if (p) {
                        k = i(a).message;
                        return b
                    } else
                        throw i(a)
                }
            }
            if (p) {
                if (m)
                    h.setTimeout(function () {
                        var a = o(g, e.parseXml(m));
                        n(a, k)
                    }, 1);
                else
                    e.makeAjaxRequest(l, function (b) {
                        var a = o(j, b);
                        n(a, k)
                    });
                return b
            }
            if (m)
                return o(g, e.parseXml(m));
            else
                return o(j, e.makeAjaxRequest(l))
        }
    })();
    var X = v.Viewport = function (e, n) {
        var d = this, c = d, e = new m(e.x, e.y), s = n.x / n.y, o = n.y / n.x, h = new Q(0), j = new Q(0), l = new Q(i.logarithmicZoom ? 0 : 1), f = b, k = new y(0, 0, 1, o), q = k.getCenter(), A = g.LN2;
        function z() {
            c.goHome(a);
            c.update()
        }
        function u(a) {
            return g.log(a) / A
        }
        function w(a) {
            return g.pow(2, a)
        }
        function r(c, b, a) {
            return g.min(g.max(c, b), a)
        }
        function x(b, a) {
            var d = b.x, f = b.y, c = r(d, a.x, a.x + a.width), e = r(f, a.y, a.y + a.height);
            return d === c && f === e ? b : new m(c, e)
        }
        function p(h) {
            var k = c.getZoom(h), g = 1 / k, j = g / c.getAspectRatio(), f = i.visibilityRatio, d = (f - t) * g, e = (f - t) * j, a = 1 - 2 * d, b = o - 2 * e;
            if (a < 0) {
                d += t * a;
                a = 0
            }
            if (b < 0) {
                e += t * b;
                b = 0
            }
            return new v.Rect(d, e, a, b)
        }
        d.getHomeBounds = function () {
            var b = c.getAspectRatio(), a = new y(k.x, k.y, k.width, k.height);
            if (s >= b) {
                a.height = k.width / b;
                a.y = q.y - a.height / 2
            } else {
                a.width = k.height * b;
                a.x = q.x - a.width / 2
            }
            return a
        };
        d.getHomeCenter = function () {
            return q
        };
        d.getHomeZoom = function () {
            var a = s / c.getAspectRatio();
            return a >= 1 ? 1 : a
        };
        d.getMinCenter = function (a) {
            return p(a).getTopLeft()
        };
        d.getMaxCenter = function (a) {
            return p(a).getBottomRight()
        };
        d.getMinZoom = function () {
            var a = c.getHomeZoom();
            if (i.minZoomDimension)
                var b = n.x <= n.y ? i.minZoomDimension / e.x : i.minZoomDimension / (e.x * o);
            else
                var b = i.minZoomImageRatio * a;
            return g.min(b, a)
        };
        d.getMaxZoom = function () {
            var a = n.x * i.maxZoomPixelRatio / e.x;
            return g.max(a, c.getHomeZoom())
        };
        d.getAspectRatio = function () {
            return e.x / e.y
        };
        d.getContainerSize = function () {
            return new m(e.x, e.y)
        };
        d.getBounds = function (b) {
            var d = c.getCenter(b), a = 1 / c.getZoom(b), e = a / c.getAspectRatio();
            return new y(d.x - a / 2, d.y - e / 2, a, e)
        };
        d.getCenter = function (r) {
            var b = new m(h.getCurrent(), j.getCurrent()), g = new m(h.getTarget(), j.getTarget());
            if (r)
                return b;
            else if (!f)
                return g;
            var l = c.getZoom(), d = 1 / l, k = d / c.getAspectRatio(), i = new y(b.x - d / 2, b.y - k / 2, d, k), q = c.pixelFromPoint(f, a), p = f.minus(i.getTopLeft()).times(e.x / i.width), n = p.minus(q), o = n.divide(e.x * l);
            return g.plus(o)
        };
        d.getZoom = function (b) {
            var a;
            if (b) {
                a = l.getCurrent();
                return i.logarithmicZoom ? w(a) : a
            } else {
                a = l.getTarget();
                return i.logarithmicZoom ? w(a) : a
            }
        };
        d.applyConstraints = function (g) {
            var h = c.getZoom(), d = r(h, c.getMinZoom(), c.getMaxZoom());
            h != d && c.zoomTo(d, f, g);
            var b = c.getCenter(), a = x(b, p());
            if (i.wrapHorizontal)
                a.x = b.x;
            if (i.wrapVertical)
                a.y = b.y;
            if (!b.equals(a)) {
                var e = 1 / d, j = e / c.getAspectRatio();
                c.fitBounds(new y(a.x - t * e, a.y - t * j, e, j), g)
            }
        };
        d.ensureVisible = function (a) {
            c.applyConstraints(a)
        };
        d.fitBounds = function (f, j) {
            var h = c.getAspectRatio(), i = f.getCenter(), d = new y(f.x, f.y, f.width, f.height);
            if (d.getAspectRatio() >= h) {
                d.height = f.width / h;
                d.y = i.y - d.height / 2
            } else {
                d.width = f.height * h;
                d.x = i.x - d.width / 2
            }
            c.panTo(c.getCenter(a), a);
            c.zoomTo(c.getZoom(a), b, a);
            var g = c.getBounds(), m = c.getZoom(), k = 1 / d.width;
            if (k == m || d.width == g.width) {
                c.panTo(i, j);
                return
            }
            var l = g.getTopLeft().times(e.x / g.width).minus(d.getTopLeft().times(e.x / d.width)).divide(e.x / g.width - e.x / d.width);
            c.zoomTo(k, l, j)
        };
        d.goHome = function (b) {
            var a = c.getCenter();
            if (i.wrapHorizontal) {
                a.x = (1 + a.x % 1) % 1;
                h.resetTo(a.x);
                h.update()
            }
            if (i.wrapVertical) {
                a.y = (o + a.y % o) % o;
                j.resetTo(a.y);
                j.update()
            }
            c.fitBounds(k, b)
        };
        d.panBy = function (b, a) {
            c.panTo(c.getCenter().plus(b), a)
        };
        d.panTo = function (b, q) {
            if (q) {
                h.resetTo(b.x);
                j.resetTo(b.y);
                return
            }
            if (!f) {
                h.springTo(b.x);
                j.springTo(b.y);
                return
            }
            var l = c.getZoom(), d = 1 / l, k = d / c.getAspectRatio(), i = new y(h.getCurrent() - d / 2, j.getCurrent() - k / 2, d, k), p = c.pixelFromPoint(f, a), o = f.minus(i.getTopLeft()).times(e.x / i.width), m = o.minus(p), n = m.divide(e.x * l), g = b.minus(n);
            h.springTo(g.x);
            j.springTo(g.y)
        };
        d.zoomBy = function (d, b, a) {
            c.zoomTo(c.getZoom() * d, b, a)
        };
        d.zoomTo = function (a, c, d) {
            if (d)
                l.resetTo(i.logarithmicZoom ? u(a) : a);
            else
                l.springTo(i.logarithmicZoom ? u(a) : a);
            f = c instanceof m ? c : b
        };
        d.resize = function (d, h) {
            var f = c.getBounds(), b = f, g = d.x / e.x;
            e = new m(d.x, d.y);
            if (h) {
                b.width = f.width * g;
                b.height = b.width / c.getAspectRatio()
            }
            c.fitBounds(b, a)
        };
        d.update = function () {
            var m = h.getCurrent(), n = j.getCurrent(), e = l.getCurrent();
            if (f)
                var k = c.pixelFromPoint(f, a);
            l.update();
            if (f && l.getCurrent() != e) {
                var i = c.pixelFromPoint(f, a), g = i.minus(k), d = c.deltaPointsFromPixels(g, a);
                h.shiftBy(d.x);
                j.shiftBy(d.y)
            } else
                f = b;
            h.update();
            j.update();
            return h.getCurrent() != m || j.getCurrent() != n || l.getCurrent() != e
        };
        d.deltaPixelsFromPoints = function (a, b) {
            return a.times(e.x * c.getZoom(b))
        };
        d.deltaPointsFromPixels = function (a, b) {
            return a.divide(e.x * c.getZoom(b))
        };
        d.pixelFromPoint = function (d, b) {
            var a = c.getBounds(b);
            return d.minus(a.getTopLeft()).times(e.x / a.width)
        };
        d.pointFromPixel = function (d, b) {
            var a = c.getBounds(b);
            return d.divide(e.x / a.width).plus(a.getTopLeft())
        };
        z()
    }, V, E;
    (function () {
        var n = "progid:DXImageTransform.Microsoft.Matrix(", j = " when it's not yet loaded.", h = "Attempting to draw tile ", W = 100, G = t, u = e.getBrowser(), P = e.getBrowserVersion(), bb = navigator.userAgent, R = !!r.createElement("canvas").getContext, T = r.documentElement || {}, H = T.style || {}, C = c, K = ["msTransform", "WebkitTransform", "MozTransform"], f, B;
        while (f = K.shift())
            if (typeof H[f] !== J) {
                C = a;
                B = /webkit/i.test(f);
                break
            }
        var X = "-webkit-transform", L = "WebkitTransition", Z = typeof H[L] !== J, O = "progid:DXImageTransform.Microsoft.Matrix", Y = new RegExp(O + "\\(.*?\\)", "g"), ab = function () {
            try {
                return u == A.IE && !!r.documentElement.filters
            } catch (a) {
                return c
            }
        }(), Q = u == A.SAFARI && P < 4 || u == A.CHROME, p = R && !Q, F = !p && C, I = c, M = typeof r.documentMode !== J ? "bicubic" : "nearest-neighbor";
        function o(f, h, i, d, e, g) {
            var a = this;
            a.level = f;
            a.x = h;
            a.y = i;
            a.bounds = d;
            a.exists = e;
            a.url = g;
            a.elmt = b;
            a.image = b;
            a.loaded = c;
            a.loading = c;
            a.style = b;
            a.position = b;
            a.size = b;
            a.blendStart = b;
            a.opacity = b;
            a.distance = b;
            a.visibility = b;
            a.beingDrawn = c;
            a.lastDrawnTime = 0;
            a.lastTouchTime = 0
        }
        o.prototype.toString = function () {
            return this.level + "/" + this.x + "_" + this.y
        };
        o.prototype.drawHTML = function (l) {
            var a = this;
            if (!a.loaded) {
                q.error(h + a.toString() + j);
                return
            }
            if (!a.elmt) {
                a.elmt = e.makeNeutralElement("img");
                a.elmt.src = a.url;
                a.style = a.elmt.style;
                a.style.position = w;
                a.style.msInterpolationMode = M;
                if (F)
                    a.style[f + "Origin"] = "0px 0px"
            }
            var m = a.elmt, r = a.image, c = a.style, b = a.position, i = a.size;
            m.parentNode != l && l.appendChild(m);
            if (F)
                c[f] = ["matrix(", (i.x / r.width).toFixed(8), ",0,0,", (i.y / r.height).toFixed(8), z, b.x.toFixed(8), B ? z : "px,", b.y.toFixed(8), B ? ")" : "px)"].join(d);
            else if (I) {
                var p = l.clientWidth, o = l.clientHeight;
                c.width = p + k;
                c.height = o + k;
                c.filter = [n, "M11=", (i.x / p).toFixed(8), ",M22=", (i.y / o).toFixed(8), ",Dx=", b.x.toFixed(8), ",Dy=", b.y.toFixed(8), ")"].join(d)
            } else {
                b = b.apply(g.floor);
                i = i.apply(g.ceil);
                c.left = b.x + k;
                c.top = b.y + k;
                c.width = i.x + k;
                c.height = i.y + k
            }
            e.setElementOpacity(m, a.opacity)
        };
        o.prototype.drawCanvas = function (c) {
            var a = this;
            if (!a.loaded) {
                q.error(h + a.toString() + j);
                return
            }
            var b = a.position, d = a.size;
            c.globalAlpha = a.opacity;
            c.drawImage(a.image, b.x, b.y, d.x, d.y)
        };
        o.prototype.unload = function () {
            var a = this;
            a.elmt && a.elmt.parentNode && a.elmt.parentNode.removeChild(a.elmt);
            a.elmt = b;
            a.image = b;
            a.loaded = c;
            a.loading = c
        };
        E = v.OverlayPlacement = {CENTER: 0, TOP_LEFT: 1, TOP: 2, TOP_RIGHT: 3, RIGHT: 4, BOTTOM_RIGHT: 5, BOTTOM: 6, BOTTOM_LEFT: 7, LEFT: 8};
        function D(a) {
            switch (a) {
                case E.TOP_LEFT:
                    return function () {
                    };
                case E.TOP:
                    return function (a, b) {
                        a.x -= b.x / 2
                    };
                case E.TOP_RIGHT:
                    return function (a, b) {
                        a.x -= b.x
                    };
                case E.RIGHT:
                    return function (a, b) {
                        a.x -= b.x;
                        a.y -= b.y / 2
                    };
                case E.BOTTOM_RIGHT:
                    return function (a, b) {
                        a.x -= b.x;
                        a.y -= b.y
                    };
                case E.BOTTOM:
                    return function (a, b) {
                        a.x -= b.x / 2;
                        a.y -= b.y
                    };
                case E.BOTTOM_LEFT:
                    return function (a, b) {
                        a.y -= b.y
                    };
                case E.LEFT:
                    return function (a, b) {
                        a.y -= b.y / 2
                    };
                case E.CENTER:
                default:
                    return function (a, b) {
                        a.x -= b.x / 2;
                        a.y -= b.y / 2
                    }
            }
        }
        function x(c, a, d) {
            var b = this;
            b.elmt = c;
            b.scales = a instanceof y;
            b.bounds = new y(a.x, a.y, a.width, a.height);
            b.adjust = D(a instanceof m ? d : E.TOP_LEFT);
            b.position = new m(a.x, a.y);
            b.size = new m(a.width, a.height);
            b.style = c.style;
            b.naturalSize = new m(c.clientWidth, c.clientHeight)
        }
        x.prototype.destroy = function () {
            var b = this.elmt, a = this.style;
            b.parentNode && b.parentNode.removeChild(b);
            a.top = d;
            a.left = d;
            a.position = d;
            if (this.scales) {
                a.width = d;
                a.height = d
            }
        };
        x.prototype.drawHTML = function (m) {
            var h = this, c = h.elmt, a = h.style, o = h.scales, j = h.naturalSize;
            if (c.parentNode != m) {
                m.appendChild(c);
                a.position = w;
                j.x = c.clientWidth;
                j.y = c.clientHeight
            }
            var e = h.position, b = h.size;
            if (!o) {
                b.x = j.x = j.x || c.clientWidth;
                b.y = j.y = j.y || c.clientHeight
            }
            h.adjust(e, b);
            if (i.transformOverlays && C) {
                a[f + "Origin"] = "0px 0px";
                a[f] = ["translate(", e.x.toFixed(8), "px,", e.y.toFixed(8), "px)"].join(d);
                if (o) {
                    if (!c.clientWidth)
                        a.width = l;
                    if (!c.clientHeight)
                        a.height = l;
                    a[f] += [" scale(", (b.x / c.clientWidth).toFixed(8), z, (b.y / c.clientHeight).toFixed(8), ")"].join(d)
                }
            } else if (i.transformOverlays && I) {
                var q = m.clientWidth, p = m.clientHeight;
                a.width = q + k;
                a.height = p + k;
                a.filter = [n, "M11=", (b.x / q).toFixed(8), ",M22=", (b.y / p).toFixed(8), ",Dx=", e.x.toFixed(8), ",Dy=", e.y.toFixed(8), ")"].join(d)
            } else {
                e = e.apply(g.floor);
                b = b.apply(g.ceil);
                a.left = e.x + k;
                a.top = e.y + k;
                if (o) {
                    a.width = b.x + k;
                    a.height = b.y + k
                }
            }
        };
        x.prototype.update = function (a, b) {
            this.scales = a instanceof y;
            this.bounds = new y(a.x, a.y, a.width, a.height);
            this.adjust = D(a instanceof m ? b : E.TOP_LEFT)
        };
        V = v.Drawer = function (f, C, ib) {
            var h = this, B = e.getElement(ib), z = e.makeNeutralElement(p ? "canvas" : s), gb = p ? z.getContext("2d") : b, T = new S, J = new U, eb = f.minLevel, db = f.maxLevel, fb = f.tileSize, X = f.tileOverlap, H = f.height / f.width, F = {}, D = {}, r = {}, v = [], k = {}, n = [], bb = [], K = 0, L = 0, I = c, j = a;
            h.elmt = B;
            h.profiler = J;
            (function () {
                z.style.width = l;
                z.style.height = l;
                z.style.position = w;
                B.style.textAlign = "left";
                B.appendChild(z)
            })();
            function R(a) {
                if (!F[a])
                    F[a] = f.getNumTiles(a);
                return F[a]
            }
            function M(a) {
                if (!D[a])
                    D[a] = f.getPixelRatio(a);
                return D[a]
            }
            function hb(a, b, c, l, d, e) {
                if (!r[a])
                    r[a] = {};
                if (!r[a][b])
                    r[a][b] = {};
                if (!r[a][b][c]) {
                    var g = (d + b % d) % d, h = (e + c % e) % e, i = f.getTileBounds(a, g, h), k = f.tileExists(a, g, h), m = f.getTileUrl(a, g, h);
                    i.x += 1 * (b - g) / d;
                    i.y += H * (c - h) / e;
                    r[a][b][c] = new o(a, b, c, i, k, m)
                }
                var j = r[a][b][c];
                j.lastTouchTime = l;
                return j
            }
            function cb(a, c) {
                a.loading = T.loadImage(a.url, e.createCallback(b, Z, a, c))
            }
            function Z(d, s, n) {
                d.loading = c;
                if (I) {
                    q.error("Tile load callback in middle of drawing routine.");
                    return
                } else if (!n) {
                    q.log("Tile " + d + " failed to load: " + d.url);
                    d.exists = c;
                    return
                } else if (s < L) {
                    q.log("Ignoring tile " + d + " loaded before reset: " + d.url);
                    return
                }
                d.loaded = a;
                d.image = n;
                var k = v.length;
                if (v.length >= W) {
                    for (var r = g.ceil(g.log(fb) / g.log(2)), e = b, i = -1, h = v.length - 1; h >= 0; h--) {
                        var f = v[h];
                        if (f.level <= r || f.beingDrawn)
                            continue;
                        else if (!e) {
                            e = f;
                            i = h;
                            continue
                        }
                        var m = f.lastTouchTime, l = e.lastTouchTime, p = f.level, o = e.level;
                        if (m < l || m == l && p > o) {
                            e = f;
                            i = h
                        }
                    }
                    if (e && i >= 0) {
                        e.unload();
                        k = i
                    }
                }
                v[k] = d;
                j = a
            }
            function Y() {
                r = {};
                v = []
            }
            function y(b, d, g) {
                if (!k[b])
                    return c;
                if (d === N || g === N) {
                    var f = k[b];
                    for (var h in f)
                        if (f.hasOwnProperty(h)) {
                            var e = f[h];
                            for (var i in e)
                                if (e.hasOwnProperty(i) && !e[i])
                                    return c
                        }
                    return a
                }
                return k[b][d] === N || k[b][d][g] === N || k[b][d][g] === a
            }
            function ab(a, b, c) {
                if (b === N || c === N)
                    return y(a + 1);
                else
                    return y(a + 1, 2 * b, 2 * c) && y(a + 1, 2 * b, 2 * c + 1) && y(a + 1, 2 * b + 1, 2 * c) && y(a + 1, 2 * b + 1, 2 * c + 1)
            }
            function V(a, b, d, c) {
                if (!k[a]) {
                    q.error("Setting coverage for a tile before its level's coverage has been reset: " + a);
                    return
                }
                if (!k[a][b])
                    k[a][b] = {};
                k[a][b][d] = c
            }
            function O(a) {
                k[a] = {}
            }
            function P(b, a) {
                if (!b)
                    return a;
                if (a.visibility > b.visibility)
                    return a;
                else if (a.visibility == b.visibility)
                    if (a.distance < b.distance)
                        return a;
                return b
            }
            function E(b) {
                for (var a = n.length - 1; a >= 0; a--)
                    if (n[a].elmt == b)
                        return a;
                return -1
            }
            function Q() {
                j = c;
                var Q = z, Fb = gb, gc = B, xb = p, D = bb;
                while (D.length > 0) {
                    var e = D.pop();
                    e.beingDrawn = c
                }
                var ub = C.getContainerSize(), sb = ub.x, rb = ub.y;
                if (xb) {
                    Q.width = sb;
                    Q.height = rb;
                    Fb.clearRect(0, 0, sb, rb)
                } else
                    Q.innerHTML = d;
                var qb = C.getBounds(a), s = qb.getTopLeft(), r = qb.getBottomRight();
                if (!i.wrapHorizontal && (r.x < 0 || s.x > 1))
                    return;
                else if (!i.wrapVertical && (r.y < 0 || s.y > H))
                    return;
                var Rb = R, F = M, cc = hb, Yb = ab, I = V, Ob = O, Kb = y, Sb = X, Nb = K, bc = u === A.CHROME, ec = g.abs, hc = g.ceil, jb = g.floor, T = g.log, lb = g.max, k = g.min, q = C.deltaPixelsFromPoints, E = C.pixelFromPoint, pb = f.getTileAtPoint, Tb = i.alwaysBlend, U = 1e3 * i.blendTime, Lb = i.immediateRender, Y = i.minZoomDimension, fc = i.minImageRatio, W = i.wrapHorizontal, Z = i.wrapVertical, vb = i.wrapOverlays;
                if (!W) {
                    s.x = lb(s.x, 0);
                    r.x = k(r.x, 1)
                }
                if (!Z) {
                    s.y = lb(s.y, 0);
                    r.y = k(r.y, H)
                }
                var S = b, L = c, v = (new Date).getTime(), mb = C.getCenter(), Ib = E(mb), Xb = q(F(0), c).x, nb = Lb ? 1 : Xb;
                Y = Y || 64;
                var J = lb(eb, jb(T(Y) / T(2))), Wb = q(F(0), a).x, tb = k(db, jb(T(Wb / G) / T(2)));
                J = k(J, tb);
                for (var h = tb; h >= J; h--) {
                    var zb = c, ob = q(F(h), a).x;
                    if (!L && ob >= G || h == J) {
                        zb = a;
                        L = a
                    } else if (!L)
                        continue;
                    Ob(h);
                    var Pb = k(1, (ob - t) / t), Jb = q(F(h), c).x, Mb = nb / ec(nb - Jb), Hb = pb(h, s), w = pb(h, r), Eb = Rb(h), Ab = Eb.x, Bb = Eb.y;
                    if (!W)
                        w.x = k(w.x, Ab - 1);
                    if (!Z)
                        w.y = k(w.y, Bb - 1);
                    for (var l = Hb.x; l <= w.x; l++)
                        for (var o = Hb.y; o <= w.y; o++) {
                            var e = cc(h, l, o, v, Ab, Bb), fb = zb;
                            I(h, l, o, c);
                            if (!e.exists)
                                continue;
                            if (L && !fb)
                                if (Yb(h, l, o))
                                    I(h, l, o, a);
                                else
                                    fb = a;
                            if (!fb)
                                continue;
                            var Db = e.bounds.getTopLeft(), wb = e.bounds.getSize(), Zb = E(Db, a), kb = q(wb, a);
                            if (!Sb)
                                kb = kb.plus(new m(1, 1));
                            var ac = E(Db, c), dc = q(wb, c), Vb = ac.plus(dc.divide(2)), Qb = Ib.distanceTo(Vb);
                            e.position = Zb;
                            e.size = kb;
                            e.distance = Qb;
                            e.visibility = Mb;
                            if (e.loaded) {
                                if (!e.blendStart)
                                    e.blendStart = v;
                                var yb = v - e.blendStart, ib = U === 0 ? 1 : k(1, yb / U);
                                if (Tb)
                                    ib *= Pb;
                                e.opacity = ib;
                                D.push(e);
                                if (ib >= 1) {
                                    I(h, l, o, a);
                                    bc && e.lastDrawnTime !== Nb && I(h, l, o, c)
                                } else if (yb < U)
                                    j = a;
                                e.lastDrawnTime = v
                            } else if (!e.loading)
                                S = P(S, e)
                        }
                    if (Kb(h))
                        break
                }
                for (var x = D.length - 1; x >= 0; x--) {
                    var e = D[x];
                    if (xb)
                        e.drawCanvas(Fb);
                    else
                        e.drawHTML(Q);
                    e.beingDrawn = a
                }
                for (var Ub = n.length, x = 0; x < Ub; x++) {
                    var N = n[x], Gb = N.bounds, Cb = Gb.getTopLeft();
                    if (vb && W)
                        Cb.x += jb(mb.x);
                    if (vb && Z)
                        ;
                    N.position = E(Cb, a);
                    N.size = q(Gb.getSize(), a);
                    N.drawHTML(B)
                }
                if (S) {
                    cb(S, v);
                    j = a
                }
                K = v
            }
            h.addOverlay = function (b, d, c) {
                var b = e.getElement(b);
                if (E(b) >= 0)
                    return;
                n.push(new x(b, d, c));
                j = a
            };
            h.updateOverlay = function (b, f, d) {
                var b = e.getElement(b), c = E(b);
                if (c >= 0) {
                    n[c].update(f, d);
                    j = a
                }
            };
            h.removeOverlay = function (c) {
                var c = e.getElement(c), b = E(c);
                if (b >= 0) {
                    n[b].destroy();
                    n.splice(b, 1);
                    j = a
                }
            };
            h.clearOverlays = function () {
                while (n.length > 0) {
                    n.pop().destroy();
                    j = a
                }
            };
            h.needsUpdate = function () {
                return j
            };
            h.numTilesLoaded = function () {
                return v.length
            };
            h.reset = function () {
                Y();
                L = (new Date).getTime();
                j = a
            };
            h.update = function () {
                J.beginUpdate();
                I = a;
                Q();
                I = c;
                J.endUpdate()
            };
            h.idle = function () {
            }
        }
    })();
    var Y, G;
    (function () {
        var L = "----seadragon----", Q = e.getBrowser();
        G = v.ControlAnchor = {NONE: 0, TOP_LEFT: 1, TOP_RIGHT: 2, BOTTOM_RIGHT: 3, BOTTOM_LEFT: 4};
        function P(c, b, a) {
            if (b == G.TOP_RIGHT || b == G.BOTTOM_RIGHT)
                a.insertBefore(c, a.firstChild);
            else
                a.appendChild(c)
        }
        function f(f, c, d) {
            var b = this, a = e.makeNeutralElement(F);
            b.elmt = f;
            b.anchor = c;
            b.container = d;
            b.wrapper = a;
            a.style.display = C;
            a.appendChild(f);
            if (c == G.NONE)
                a.style.width = a.style.height = l;
            P(a, c, d)
        }
        f.prototype.destroy = function () {
            var a = this;
            a.wrapper.removeChild(a.elmt);
            a.container.removeChild(a.wrapper)
        };
        f.prototype.isVisible = function () {
            return this.wrapper.style.display != B
        };
        f.prototype.setVisible = function (a) {
            this.wrapper.style.display = a ? C : B
        };
        f.prototype.setOpacity = function (b) {
            if (this.elmt[L] && Q == A.IE)
                e.setElementOpacity(this.elmt, b, a);
            else
                e.setElementOpacity(this.wrapper, b, a)
        };
        var k = "fullpage", E = "home", t = "zoomin", n = "zoomout", J = "_rest.png", y = "_grouphover.png", z = "_hover.png", D = "_pressed.png";
        function N(d) {
            var j = b, f = c, q = b, l = b;
            function H() {
                d.viewport && d.viewport.goHome()
            }
            function w() {
                d.setFullPage(!d.isFullPage());
                j.emulateExit();
                d.viewport && d.viewport.applyConstraints()
            }
            function s() {
                l = (new Date).getTime();
                q = i.zoomPerSecond;
                f = a;
                o()
            }
            function r() {
                l = (new Date).getTime();
                q = 1 / i.zoomPerSecond;
                f = a;
                o()
            }
            function m() {
                f = c
            }
            function o() {
                h.setTimeout(F, p)
            }
            function F() {
                if (f && d.viewport) {
                    var a = (new Date).getTime(), c = a - l, b = g.pow(q, c / 1e3);
                    d.viewport.zoomBy(b);
                    d.viewport.applyConstraints();
                    l = a;
                    o()
                }
            }
            function v() {
                if (d.viewport) {
                    f = c;
                    d.viewport.zoomBy(i.zoomPerClick / 1);
                    d.viewport.applyConstraints()
                }
            }
            function u() {
                if (d.viewport) {
                    f = c;
                    d.viewport.zoomBy(1 / i.zoomPerClick);
                    d.viewport.applyConstraints()
                }
            }
            function B() {
                j.emulateEnter();
                j.emulateExit()
            }
            function e(b, a) {
                return i.imagePath + b + a
            }
            var I = new O(x.getString("Tooltips.ZoomIn"), e(t, J), e(t, y), e(t, z), e(t, D), s, m, v, s, m), C = new O(x.getString("Tooltips.ZoomOut"), e(n, J), e(n, y), e(n, z), e(n, D), r, m, u, r, m), G = new O(x.getString("Tooltips.Home"), e(E, J), e(E, y), e(E, z), e(E, D), b, H, b, b, b), A = new O(x.getString("Tooltips.FullPage"), e(k, J), e(k, y), e(k, z), e(k, D), b, w, b, b, b);
            j = new R([I, C, G, A]);
            j.elmt[L] = a;
            d.addEventListener("open", B);
            return j.elmt
        }
        Y = v.Viewer = function (v) {
            var n = this, t = n, P = e.getElement(v), v = e.makeNeutralElement(s), E = e.makeNeutralElement(s), eb = e.makeNeutralElement(s), fb = e.makeNeutralElement(s), db = e.makeNeutralElement(s), cb = e.makeNeutralElement(s), A = b, J = b, k = b, O = b, z = new W, D = new M(E), S = new M(v), y = [], ab = a, ib = b, L = b, kb = 1e3, Ab = 2e3, ib = b, ab = c, yb = r.body.style.width, wb = r.body.style.height, tb = r.body.style.overflow, ub = r.documentElement.style.overflow, bb = new m(1, 1), C = b, R = 0, nb = 0, qb = b, ob = b, F = c, T = c, Y = c;
            n.container = P;
            n.elmt = v;
            n.source = b;
            n.drawer = b;
            n.viewport = b;
            n.profiler = b;
            n.tracker = D;
            function Jb() {
                var c = E.style, b = v.style, g = eb.style, i = fb.style, f = db.style, e = cb.style;
                b.width = l;
                b.height = l;
                b.position = u;
                b.left = j;
                b.top = j;
                b.textAlign = "left";
                c.width = l;
                c.height = l;
                c.overflow = o;
                c.position = w;
                c.top = j;
                c.left = j;
                g.position = i.position = f.position = e.position = w;
                g.top = i.top = j;
                g.left = e.left = j;
                i.right = f.right = j;
                e.bottom = f.bottom = j;
                D.clickHandler = Fb;
                D.pressHandler = Gb;
                D.dragHandler = Hb;
                D.releaseHandler = Db;
                D.scrollHandler = Eb;
                D.setTracking(a);
                L = N(t);
                L.style.marginRight = "4px";
                L.style.marginBottom = "4px";
                t.addControl(L, G.BOTTOM_RIGHT);
                S.enterHandler = lb;
                S.exitHandler = pb;
                S.releaseHandler = Bb;
                S.setTracking(a);
                h.setTimeout(Q, 1);
                v.appendChild(E);
                v.appendChild(eb);
                v.appendChild(fb);
                v.appendChild(db);
                v.appendChild(cb);
                P.innerHTML = d;
                P.appendChild(v)
            }
            function Z(f) {
                var a = "normal", c = r.createTextNode(f);
                E.innerHTML = d;
                E.appendChild(e.makeCenteredNode(c));
                var b = c.parentNode.style;
                b.fontFamily = "verdana";
                b.fontSize = "13px";
                b.fontSizeAdjust = B;
                b.fontStyle = a;
                b.fontStretch = a;
                b.fontVariant = a;
                b.fontWeight = a;
                b.lineHeight = "1em";
                b.textAlign = "center";
                b.textDecoration = B
            }
            function vb() {
                A && zb();
                R = (new Date).getTime();
                h.setTimeout(function () {
                    R > nb && Z(x.getString("Messages.Loading"))
                }, 2e3);
                return R
            }
            function gb(g, b, f) {
                nb = (new Date).getTime();
                if (g < R) {
                    q.log("Ignoring out-of-date open.");
                    z.trigger("ignore", t);
                    return
                } else if (!b) {
                    Z(f);
                    z.trigger("error", t);
                    return
                }
                E.innerHTML = d;
                C = e.getElementSize(v);
                if (C.x === 0 || C.y === 0) {
                    h.setTimeout(function () {
                        gb(g, b, f)
                    }, p);
                    return
                }
                A = b;
                k = new X(C, A.dimensions);
                J = new V(A, k, E);
                O = new U;
                t.source = A;
                t.viewport = k;
                t.drawer = J;
                t.profiler = O;
                F = c;
                T = a;
                rb(Ib);
                z.trigger("open", t)
            }
            function zb() {
                t.source = A = b;
                t.viewport = k = b;
                t.drawer = J = b;
                t.profiler = O = b;
                E.innerHTML = d
            }
            function rb(c, a) {
                if (F)
                    return h.setTimeout(c, 1);
                var b = (new Date).getTime(), a = a ? a : b, d = a + 1e3 / 60, e = g.max(1, d - b);
                return h.setTimeout(c, e)
            }
            function xb() {
                if (!A)
                    return;
                O.beginUpdate();
                var b = e.getElementSize(v);
                if (!b.equals(C) && b.x > 0 && b.y > 0) {
                    k.resize(b, a);
                    C = b;
                    z.trigger("resize", t)
                }
                var d = k.update();
                if (!F && d) {
                    z.trigger("animationstart", t);
                    hb()
                }
                if (d) {
                    J.update();
                    z.trigger("animation", t)
                } else if (T || J.needsUpdate()) {
                    J.update();
                    T = c
                } else
                    J.idle();
                if (F && !d) {
                    z.trigger("animationfinish", t);
                    !Y && Q()
                }
                F = d;
                O.endUpdate()
            }
            function Ib() {
                if (!A)
                    return;
                var a = (new Date).getTime();
                xb();
                rb(arguments.callee, a)
            }
            function mb(b) {
                for (var a = y.length - 1; a >= 0; a--)
                    if (y[a].elmt == b)
                        return a;
                return -1
            }
            function jb() {
                h.setTimeout(Cb, 20)
            }
            function Cb() {
                if (ab) {
                    var c = (new Date).getTime(), d = c - ib, a = 1 - d / Ab;
                    a = g.min(1, a);
                    a = g.max(0, a);
                    for (var b = y.length - 1; b >= 0; b--)
                        y[b].setOpacity(a);
                    a > 0 && jb()
                }
            }
            function hb() {
                ab = c;
                for (var a = y.length - 1; a >= 0; a--)
                    y[a].setOpacity(1)
            }
            function Q() {
                if (!i.autoHideControls)
                    return;
                ab = a;
                ib = (new Date).getTime() + kb;
                h.setTimeout(jb, kb)
            }
            function lb() {
                Y = a;
                hb()
            }
            function pb(e, d, a) {
                if (!a) {
                    Y = c;
                    !F && Q()
                }
            }
            function Bb(e, d, b, a) {
                if (!a) {
                    Y = c;
                    !F && Q()
                }
            }
            function Fb(g, c, e, f) {
                if (k && e) {
                    var b = i.zoomPerClick, d = f ? 1 / b : b;
                    k.zoomBy(d, k.pointFromPixel(c, a));
                    k.applyConstraints()
                }
            }
            function Gb(b, a) {
                if (k) {
                    qb = a;
                    ob = k.getCenter()
                }
            }
            function Hb(f, d, e) {
                if (k)
                    if (i.constrainDuringPan) {
                        var b = d.minus(qb), c = k.deltaPointsFromPixels(b.negate(), a);
                        k.panTo(ob.plus(c));
                        k.applyConstraints()
                    } else
                        k.panBy(k.deltaPointsFromPixels(e.negate(), a))
            }
            function Db(d, c, a) {
                a && k && k.applyConstraints()
            }
            function Eb(e, b, d) {
                if (k) {
                    var c = g.pow(i.zoomPerScroll, d);
                    k.zoomBy(c, k.pointFromPixel(b, a));
                    k.applyConstraints()
                }
            }
            function sb(a) {
                a = e.getEvent(a);
                a.keyCode === 27 && t.setFullPage(c)
            }
            n.isOpen = function () {
                return !!A
            };
            n.openDzi = function (a, f) {
                var d = vb(), c = e.createCallback(b, gb, d);
                switch (typeof a) {
                    case I:
                        K.createFromXml(a, f, c);
                        break;
                    default:
                        K.createFromJson(a, c)
                }
            };
            n.openTileSource = function (b) {
                var a = vb();
                h.setTimeout(function () {
                    gb(a, b)
                }, 1)
            };
            n.close = function () {
                if (!A)
                    return;
                zb()
            };
            n.addControl = function (a, d) {
                var a = e.getElement(a);
                if (mb(a) >= 0)
                    return;
                var c = b;
                switch (d) {
                    case G.TOP_RIGHT:
                        c = fb;
                        a.style.position = u;
                        break;
                    case G.BOTTOM_RIGHT:
                        c = db;
                        a.style.position = u;
                        break;
                    case G.BOTTOM_LEFT:
                        c = cb;
                        a.style.position = u;
                        break;
                    case G.TOP_LEFT:
                        c = eb;
                        a.style.position = u;
                        break;
                    case G.NONE:
                    default:
                        c = v;
                        a.style.position = w
                }
                y.push(new f(a, d, c))
            };
            n.removeControl = function (b) {
                var b = e.getElement(b), a = mb(b);
                if (a >= 0) {
                    y[a].destroy();
                    y.splice(a, 1)
                }
            };
            n.clearControls = function () {
                while (y.length > 0)
                    y.pop().destroy()
            };
            n.getNavControl = function () {
                return L
            };
            n.isDashboardEnabled = function () {
                for (var b = y.length - 1; b >= 0; b--)
                    if (y[b].isVisible())
                        return a;
                return c
            };
            n.isFullPage = function () {
                return v.parentNode == r.body
            };
            n.isMouseNavEnabled = function () {
                return D.isTracking()
            };
            n.isVisible = function () {
                return v.style.visibility != o
            };
            n.setDashboardEnabled = function (b) {
                for (var a = y.length - 1; a >= 0; a--)
                    y[a].setVisible(b)
            };
            n.setFullPage = function (j) {
                if (j == t.isFullPage())
                    return;
                var q = r.body, c = q.style, i = r.documentElement.style, f = v.style, h = E.style;
                if (j) {
                    tb = c.overflow;
                    ub = i.overflow;
                    c.overflow = o;
                    i.overflow = o;
                    yb = c.width;
                    wb = c.height;
                    c.width = l;
                    c.height = l;
                    h.backgroundColor = "black";
                    h.color = "white";
                    f.position = H;
                    f.zIndex = "99999999";
                    q.appendChild(v);
                    C = e.getWindowSize();
                    e.addEvent(r, "keydown", sb);
                    lb()
                } else {
                    c.overflow = tb;
                    i.overflow = ub;
                    c.width = yb;
                    c.height = wb;
                    h.backgroundColor = d;
                    h.color = d;
                    f.position = u;
                    f.zIndex = d;
                    P.appendChild(v);
                    C = e.getElementSize(P);
                    e.removeEvent(r, "keydown", sb);
                    pb()
                }
                if (k) {
                    var p = k.getBounds();
                    k.resize(C);
                    var n = k.getBounds();
                    if (j)
                        bb = new m(n.width / p.width, n.height / p.height);
                    else {
                        k.update();
                        k.zoomBy(g.max(bb.x, bb.y), b, a)
                    }
                    T = a;
                    z.trigger("resize", t);
                    xb()
                }
            };
            n.setMouseNavEnabled = function (a) {
                D.setTracking(a)
            };
            n.setVisible = function (a) {
                v.style.visibility = a ? d : o
            };
            n.showMessage = function (a, b) {
                if (!b) {
                    Z(a);
                    return
                }
                h.setTimeout(function () {
                    !t.isOpen() && Z(a)
                }, b)
            };
            n.addEventListener = function (a, b) {
                z.addListener(a, b)
            };
            n.removeEventListener = function (a, b) {
                z.removeListener(a, b)
            };
            Jb()
        }
    })()
})(window, document, Math);