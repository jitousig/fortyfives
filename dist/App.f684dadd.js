// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/immer/dist/immer.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.castDraft = K;
exports.castImmutable = $;
exports.current = D;
exports.enableAllPlugins = J;
exports.enableES5 = T;
exports.enableMapSet = C;
exports.enablePatches = F;
exports.isDraft = t;
exports.isDraftable = r;
exports.original = e;
exports.setUseProxies = exports.setAutoFreeze = exports.produceWithPatches = exports.produce = exports.nothing = exports.immerable = exports.finishDraft = exports.createDraft = exports.applyPatches = exports.Immer = exports.default = void 0;

function n(n) {
  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) r[e - 1] = arguments[e];

  if ("production" !== "development") {
    var i = Y[n],
        o = i ? "function" == typeof i ? i.apply(null, r) : i : "unknown error nr: " + n;
    throw Error("[Immer] " + o);
  }

  throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.map(function (n) {
    return "'" + n + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}

function t(n) {
  return !!n && !!n[Q];
}

function r(n) {
  return !!n && (function (n) {
    if (!n || "object" != typeof n) return !1;
    var t = Object.getPrototypeOf(n);
    return !t || t === Object.prototype;
  }(n) || Array.isArray(n) || !!n[L] || !!n.constructor[L] || s(n) || v(n));
}

function e(r) {
  return t(r) || n(23, r), r[Q].t;
}

function i(n, t, r) {
  void 0 === r && (r = !1), 0 === o(n) ? (r ? Object.keys : Z)(n).forEach(function (e) {
    r && "symbol" == typeof e || t(e, n[e], n);
  }) : n.forEach(function (r, e) {
    return t(e, r, n);
  });
}

function o(n) {
  var t = n[Q];
  return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}

function u(n, t) {
  return 2 === o(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
}

function a(n, t) {
  return 2 === o(n) ? n.get(t) : n[t];
}

function f(n, t, r) {
  var e = o(n);
  2 === e ? n.set(t, r) : 3 === e ? (n.delete(t), n.add(r)) : n[t] = r;
}

function c(n, t) {
  return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
}

function s(n) {
  return X && n instanceof Map;
}

function v(n) {
  return q && n instanceof Set;
}

function p(n) {
  return n.o || n.t;
}

function l(n) {
  if (Array.isArray(n)) return Array.prototype.slice.call(n);
  var t = nn(n);
  delete t[Q];

  for (var r = Z(t), e = 0; e < r.length; e++) {
    var i = r[e],
        o = t[i];
    !1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (t[i] = {
      configurable: !0,
      writable: !0,
      enumerable: o.enumerable,
      value: n[i]
    });
  }

  return Object.create(Object.getPrototypeOf(n), t);
}

function d(n, e) {
  y(n) || t(n) || !r(n) || (o(n) > 1 && (n.set = n.add = n.clear = n.delete = h), Object.freeze(n), e && i(n, function (n, t) {
    return d(t, !0);
  }, !0));
}

function h() {
  n(2);
}

function y(n) {
  return null == n || "object" != typeof n || Object.isFrozen(n);
}

function b(t) {
  var r = tn[t];
  return r || n(18, t), r;
}

function m(n, t) {
  tn[n] || (tn[n] = t);
}

function _() {
  return "production" === "development" || U || n(0), U;
}

function j(n, t) {
  t && (b("Patches"), n.u = [], n.s = [], n.v = t);
}

function g(n) {
  O(n), n.p.forEach(S), n.p = null;
}

function O(n) {
  n === U && (U = n.l);
}

function w(n) {
  return U = {
    p: [],
    l: U,
    h: n,
    m: !0,
    _: 0
  };
}

function S(n) {
  var t = n[Q];
  0 === t.i || 1 === t.i ? t.j() : t.g = !0;
}

function P(t, e) {
  e._ = e.p.length;
  var i = e.p[0],
      o = void 0 !== t && t !== i;
  return e.h.O || b("ES5").S(e, t, o), o ? (i[Q].P && (g(e), n(4)), r(t) && (t = M(e, t), e.l || x(e, t)), e.u && b("Patches").M(i[Q], t, e.u, e.s)) : t = M(e, i, []), g(e), e.u && e.v(e.u, e.s), t !== H ? t : void 0;
}

function M(n, t, r) {
  if (y(t)) return t;
  var e = t[Q];
  if (!e) return i(t, function (i, o) {
    return A(n, e, t, i, o, r);
  }, !0), t;
  if (e.A !== n) return t;
  if (!e.P) return x(n, e.t, !0), e.t;

  if (!e.I) {
    e.I = !0, e.A._--;
    var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o;
    i(3 === e.i ? new Set(o) : o, function (t, i) {
      return A(n, e, o, t, i, r);
    }), x(n, o, !1), r && n.u && b("Patches").R(e, r, n.u, n.s);
  }

  return e.o;
}

function A(e, i, o, a, c, s) {
  if ("production" !== "development" && c === o && n(5), t(c)) {
    var v = M(e, c, s && i && 3 !== i.i && !u(i.D, a) ? s.concat(a) : void 0);
    if (f(o, a, v), !t(v)) return;
    e.m = !1;
  }

  if (r(c) && !y(c)) {
    if (!e.h.N && e._ < 1) return;
    M(e, c), i && i.A.l || x(e, c);
  }
}

function x(n, t, r) {
  void 0 === r && (r = !1), n.h.N && n.m && d(t, r);
}

function z(n, t) {
  var r = n[Q];
  return (r ? p(r) : n)[t];
}

function I(n, t) {
  if (t in n) for (var r = Object.getPrototypeOf(n); r;) {
    var e = Object.getOwnPropertyDescriptor(r, t);
    if (e) return e;
    r = Object.getPrototypeOf(r);
  }
}

function E(n) {
  n.P || (n.P = !0, n.l && E(n.l));
}

function k(n) {
  n.o || (n.o = l(n.t));
}

function R(n, t, r) {
  var e = s(t) ? b("MapSet").T(t, r) : v(t) ? b("MapSet").F(t, r) : n.O ? function (n, t) {
    var r = Array.isArray(n),
        e = {
      i: r ? 1 : 0,
      A: t ? t.A : _(),
      P: !1,
      I: !1,
      D: {},
      l: t,
      t: n,
      k: null,
      o: null,
      j: null,
      C: !1
    },
        i = e,
        o = rn;
    r && (i = [e], o = en);
    var u = Proxy.revocable(i, o),
        a = u.revoke,
        f = u.proxy;
    return e.k = f, e.j = a, f;
  }(t, r) : b("ES5").J(t, r);
  return (r ? r.A : _()).p.push(e), e;
}

function D(e) {
  return t(e) || n(22, e), function n(t) {
    if (!r(t)) return t;
    var e,
        u = t[Q],
        c = o(t);

    if (u) {
      if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
      u.I = !0, e = N(t, c), u.I = !1;
    } else e = N(t, c);

    return i(e, function (t, r) {
      u && a(u.t, t) === r || f(e, t, n(r));
    }), 3 === c ? new Set(e) : e;
  }(e);
}

function N(n, t) {
  switch (t) {
    case 2:
      return new Map(n);

    case 3:
      return Array.from(n);
  }

  return l(n);
}

function T() {
  function r(n, t) {
    var r = s[n];
    return r ? r.enumerable = t : s[n] = r = {
      configurable: !0,
      enumerable: t,
      get: function () {
        var t = this[Q];
        return "production" !== "development" && f(t), rn.get(t, n);
      },
      set: function (t) {
        var r = this[Q];
        "production" !== "development" && f(r), rn.set(r, n, t);
      }
    }, r;
  }

  function e(n) {
    for (var t = n.length - 1; t >= 0; t--) {
      var r = n[t][Q];
      if (!r.P) switch (r.i) {
        case 5:
          a(r) && E(r);
          break;

        case 4:
          o(r) && E(r);
      }
    }
  }

  function o(n) {
    for (var t = n.t, r = n.k, e = Z(r), i = e.length - 1; i >= 0; i--) {
      var o = e[i];

      if (o !== Q) {
        var a = t[o];
        if (void 0 === a && !u(t, o)) return !0;
        var f = r[o],
            s = f && f[Q];
        if (s ? s.t !== a : !c(f, a)) return !0;
      }
    }

    var v = !!t[Q];
    return e.length !== Z(t).length + (v ? 0 : 1);
  }

  function a(n) {
    var t = n.k;
    if (t.length !== n.t.length) return !0;
    var r = Object.getOwnPropertyDescriptor(t, t.length - 1);
    return !(!r || r.get);
  }

  function f(t) {
    t.g && n(3, JSON.stringify(p(t)));
  }

  var s = {};
  m("ES5", {
    J: function (n, t) {
      var e = Array.isArray(n),
          i = function (n, t) {
        if (n) {
          for (var e = Array(t.length), i = 0; i < t.length; i++) Object.defineProperty(e, "" + i, r(i, !0));

          return e;
        }

        var o = nn(t);
        delete o[Q];

        for (var u = Z(o), a = 0; a < u.length; a++) {
          var f = u[a];
          o[f] = r(f, n || !!o[f].enumerable);
        }

        return Object.create(Object.getPrototypeOf(t), o);
      }(e, n),
          o = {
        i: e ? 5 : 4,
        A: t ? t.A : _(),
        P: !1,
        I: !1,
        D: {},
        l: t,
        t: n,
        k: i,
        o: null,
        g: !1,
        C: !1
      };

      return Object.defineProperty(i, Q, {
        value: o,
        writable: !0
      }), i;
    },
    S: function (n, r, o) {
      o ? t(r) && r[Q].A === n && e(n.p) : (n.u && function n(t) {
        if (t && "object" == typeof t) {
          var r = t[Q];

          if (r) {
            var e = r.t,
                o = r.k,
                f = r.D,
                c = r.i;
            if (4 === c) i(o, function (t) {
              t !== Q && (void 0 !== e[t] || u(e, t) ? f[t] || n(o[t]) : (f[t] = !0, E(r)));
            }), i(e, function (n) {
              void 0 !== o[n] || u(o, n) || (f[n] = !1, E(r));
            });else if (5 === c) {
              if (a(r) && (E(r), f.length = !0), o.length < e.length) for (var s = o.length; s < e.length; s++) f[s] = !1;else for (var v = e.length; v < o.length; v++) f[v] = !0;

              for (var p = Math.min(o.length, e.length), l = 0; l < p; l++) void 0 === f[l] && n(o[l]);
            }
          }
        }
      }(n.p[0]), e(n.p));
    },
    K: function (n) {
      return 4 === n.i ? o(n) : a(n);
    }
  });
}

function F() {
  function e(n) {
    if (!r(n)) return n;
    if (Array.isArray(n)) return n.map(e);
    if (s(n)) return new Map(Array.from(n.entries()).map(function (n) {
      return [n[0], e(n[1])];
    }));
    if (v(n)) return new Set(Array.from(n).map(e));
    var t = Object.create(Object.getPrototypeOf(n));

    for (var i in n) t[i] = e(n[i]);

    return t;
  }

  function f(n) {
    return t(n) ? e(n) : n;
  }

  var c = "add";
  m("Patches", {
    $: function (t, r) {
      return r.forEach(function (r) {
        for (var i = r.path, u = r.op, f = t, s = 0; s < i.length - 1; s++) "object" != typeof (f = a(f, i[s])) && n(15, i.join("/"));

        var v = o(f),
            p = e(r.value),
            l = i[i.length - 1];

        switch (u) {
          case "replace":
            switch (v) {
              case 2:
                return f.set(l, p);

              case 3:
                n(16);

              default:
                return f[l] = p;
            }

          case c:
            switch (v) {
              case 1:
                return f.splice(l, 0, p);

              case 2:
                return f.set(l, p);

              case 3:
                return f.add(p);

              default:
                return f[l] = p;
            }

          case "remove":
            switch (v) {
              case 1:
                return f.splice(l, 1);

              case 2:
                return f.delete(l);

              case 3:
                return f.delete(r.value);

              default:
                return delete f[l];
            }

          default:
            n(17, u);
        }
      }), t;
    },
    R: function (n, t, r, e) {
      switch (n.i) {
        case 0:
        case 4:
        case 2:
          return function (n, t, r, e) {
            var o = n.t,
                s = n.o;
            i(n.D, function (n, i) {
              var v = a(o, n),
                  p = a(s, n),
                  l = i ? u(o, n) ? "replace" : c : "remove";

              if (v !== p || "replace" !== l) {
                var d = t.concat(n);
                r.push("remove" === l ? {
                  op: l,
                  path: d
                } : {
                  op: l,
                  path: d,
                  value: p
                }), e.push(l === c ? {
                  op: "remove",
                  path: d
                } : "remove" === l ? {
                  op: c,
                  path: d,
                  value: f(v)
                } : {
                  op: "replace",
                  path: d,
                  value: f(v)
                });
              }
            });
          }(n, t, r, e);

        case 5:
        case 1:
          return function (n, t, r, e) {
            var i = n.t,
                o = n.D,
                u = n.o;

            if (u.length < i.length) {
              var a = [u, i];
              i = a[0], u = a[1];
              var s = [e, r];
              r = s[0], e = s[1];
            }

            for (var v = 0; v < i.length; v++) if (o[v] && u[v] !== i[v]) {
              var p = t.concat([v]);
              r.push({
                op: "replace",
                path: p,
                value: f(u[v])
              }), e.push({
                op: "replace",
                path: p,
                value: f(i[v])
              });
            }

            for (var l = i.length; l < u.length; l++) {
              var d = t.concat([l]);
              r.push({
                op: c,
                path: d,
                value: f(u[l])
              });
            }

            i.length < u.length && e.push({
              op: "replace",
              path: t.concat(["length"]),
              value: i.length
            });
          }(n, t, r, e);

        case 3:
          return function (n, t, r, e) {
            var i = n.t,
                o = n.o,
                u = 0;
            i.forEach(function (n) {
              if (!o.has(n)) {
                var i = t.concat([u]);
                r.push({
                  op: "remove",
                  path: i,
                  value: n
                }), e.unshift({
                  op: c,
                  path: i,
                  value: n
                });
              }

              u++;
            }), u = 0, o.forEach(function (n) {
              if (!i.has(n)) {
                var o = t.concat([u]);
                r.push({
                  op: c,
                  path: o,
                  value: n
                }), e.unshift({
                  op: "remove",
                  path: o,
                  value: n
                });
              }

              u++;
            });
          }(n, t, r, e);
      }
    },
    M: function (n, t, r, e) {
      r.push({
        op: "replace",
        path: [],
        value: t
      }), e.push({
        op: "replace",
        path: [],
        value: n.t
      });
    }
  });
}

function C() {
  function t(n, t) {
    function r() {
      this.constructor = n;
    }

    a(n, t), n.prototype = (r.prototype = t.prototype, new r());
  }

  function e(n) {
    n.o || (n.D = new Map(), n.o = new Map(n.t));
  }

  function o(n) {
    n.o || (n.o = new Set(), n.t.forEach(function (t) {
      if (r(t)) {
        var e = R(n.A.h, t, n);
        n.p.set(t, e), n.o.add(e);
      } else n.o.add(t);
    }));
  }

  function u(t) {
    t.g && n(3, JSON.stringify(p(t)));
  }

  var a = function (n, t) {
    return (a = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (n, t) {
      n.__proto__ = t;
    } || function (n, t) {
      for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
    })(n, t);
  },
      f = function () {
    function n(n, t) {
      return this[Q] = {
        i: 2,
        l: t,
        A: t ? t.A : _(),
        P: !1,
        I: !1,
        o: void 0,
        D: void 0,
        t: n,
        k: this,
        C: !1,
        g: !1
      }, this;
    }

    t(n, Map);
    var o = n.prototype;
    return Object.defineProperty(o, "size", {
      get: function () {
        return p(this[Q]).size;
      }
    }), o.has = function (n) {
      return p(this[Q]).has(n);
    }, o.set = function (n, t) {
      var r = this[Q];
      return u(r), p(r).has(n) && p(r).get(n) === t || (e(r), E(r), r.D.set(n, !0), r.o.set(n, t), r.D.set(n, !0)), this;
    }, o.delete = function (n) {
      if (!this.has(n)) return !1;
      var t = this[Q];
      return u(t), e(t), E(t), t.D.set(n, !1), t.o.delete(n), !0;
    }, o.clear = function () {
      var n = this[Q];
      u(n), p(n).size && (e(n), E(n), n.D = new Map(), i(n.t, function (t) {
        n.D.set(t, !1);
      }), n.o.clear());
    }, o.forEach = function (n, t) {
      var r = this;
      p(this[Q]).forEach(function (e, i) {
        n.call(t, r.get(i), i, r);
      });
    }, o.get = function (n) {
      var t = this[Q];
      u(t);
      var i = p(t).get(n);
      if (t.I || !r(i)) return i;
      if (i !== t.t.get(n)) return i;
      var o = R(t.A.h, i, t);
      return e(t), t.o.set(n, o), o;
    }, o.keys = function () {
      return p(this[Q]).keys();
    }, o.values = function () {
      var n,
          t = this,
          r = this.keys();
      return (n = {})[V] = function () {
        return t.values();
      }, n.next = function () {
        var n = r.next();
        return n.done ? n : {
          done: !1,
          value: t.get(n.value)
        };
      }, n;
    }, o.entries = function () {
      var n,
          t = this,
          r = this.keys();
      return (n = {})[V] = function () {
        return t.entries();
      }, n.next = function () {
        var n = r.next();
        if (n.done) return n;
        var e = t.get(n.value);
        return {
          done: !1,
          value: [n.value, e]
        };
      }, n;
    }, o[V] = function () {
      return this.entries();
    }, n;
  }(),
      c = function () {
    function n(n, t) {
      return this[Q] = {
        i: 3,
        l: t,
        A: t ? t.A : _(),
        P: !1,
        I: !1,
        o: void 0,
        t: n,
        k: this,
        p: new Map(),
        g: !1,
        C: !1
      }, this;
    }

    t(n, Set);
    var r = n.prototype;
    return Object.defineProperty(r, "size", {
      get: function () {
        return p(this[Q]).size;
      }
    }), r.has = function (n) {
      var t = this[Q];
      return u(t), t.o ? !!t.o.has(n) || !(!t.p.has(n) || !t.o.has(t.p.get(n))) : t.t.has(n);
    }, r.add = function (n) {
      var t = this[Q];
      return u(t), this.has(n) || (o(t), E(t), t.o.add(n)), this;
    }, r.delete = function (n) {
      if (!this.has(n)) return !1;
      var t = this[Q];
      return u(t), o(t), E(t), t.o.delete(n) || !!t.p.has(n) && t.o.delete(t.p.get(n));
    }, r.clear = function () {
      var n = this[Q];
      u(n), p(n).size && (o(n), E(n), n.o.clear());
    }, r.values = function () {
      var n = this[Q];
      return u(n), o(n), n.o.values();
    }, r.entries = function () {
      var n = this[Q];
      return u(n), o(n), n.o.entries();
    }, r.keys = function () {
      return this.values();
    }, r[V] = function () {
      return this.values();
    }, r.forEach = function (n, t) {
      for (var r = this.values(), e = r.next(); !e.done;) n.call(t, e.value, e.value, this), e = r.next();
    }, n;
  }();

  m("MapSet", {
    T: function (n, t) {
      return new f(n, t);
    },
    F: function (n, t) {
      return new c(n, t);
    }
  });
}

function J() {
  T(), C(), F();
}

function K(n) {
  return n;
}

function $(n) {
  return n;
}

var G,
    U,
    W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
    X = "undefined" != typeof Map,
    q = "undefined" != typeof Set,
    B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
    H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = !0, G),
    L = W ? Symbol.for("immer-draftable") : "__$immer_draftable",
    Q = W ? Symbol.for("immer-state") : "__$immer_state",
    V = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator",
    Y = {
  0: "Illegal state",
  1: "Immer drafts cannot have computed properties",
  2: "This object has been frozen and should not be mutated",
  3: function (n) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n;
  },
  4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  5: "Immer forbids circular references",
  6: "The first or second argument to `produce` must be a function",
  7: "The third argument to `produce` must be a function or undefined",
  8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
  10: "The given draft is already finalized",
  11: "Object.defineProperty() cannot be used on an Immer draft",
  12: "Object.setPrototypeOf() cannot be used on an Immer draft",
  13: "Immer only supports deleting array indices",
  14: "Immer only supports setting array indices and the 'length' property",
  15: function (n) {
    return "Cannot apply patch, path doesn't resolve: " + n;
  },
  16: 'Sets cannot have "replace" patches.',
  17: function (n) {
    return "Unsupported patch operation: " + n;
  },
  18: function (n) {
    return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
  },
  20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",
  21: function (n) {
    return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n + "'";
  },
  22: function (n) {
    return "'current' expects a draft, got: " + n;
  },
  23: function (n) {
    return "'original' expects a draft, got: " + n;
  }
},
    Z = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
  return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
} : Object.getOwnPropertyNames,
    nn = Object.getOwnPropertyDescriptors || function (n) {
  var t = {};
  return Z(n).forEach(function (r) {
    t[r] = Object.getOwnPropertyDescriptor(n, r);
  }), t;
},
    tn = {},
    rn = {
  get: function (n, t) {
    if (t === Q) return n;
    var e = p(n);
    if (!u(e, t)) return function (n, t, r) {
      var e,
          i = I(t, r);
      return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
    }(n, e, t);
    var i = e[t];
    return n.I || !r(i) ? i : i === z(n.t, t) ? (k(n), n.o[t] = R(n.A.h, i, n)) : i;
  },
  has: function (n, t) {
    return t in p(n);
  },
  ownKeys: function (n) {
    return Reflect.ownKeys(p(n));
  },
  set: function (n, t, r) {
    var e = I(p(n), t);
    if (null == e ? void 0 : e.set) return e.set.call(n.k, r), !0;

    if (!n.P) {
      var i = z(p(n), t),
          o = null == i ? void 0 : i[Q];
      if (o && o.t === r) return n.o[t] = r, n.D[t] = !1, !0;
      if (c(r, i) && (void 0 !== r || u(n.t, t))) return !0;
      k(n), E(n);
    }

    return n.o[t] = r, n.D[t] = !0, !0;
  },
  deleteProperty: function (n, t) {
    return void 0 !== z(n.t, t) || t in n.t ? (n.D[t] = !1, k(n), E(n)) : delete n.D[t], n.o && delete n.o[t], !0;
  },
  getOwnPropertyDescriptor: function (n, t) {
    var r = p(n),
        e = Reflect.getOwnPropertyDescriptor(r, t);
    return e ? {
      writable: !0,
      configurable: 1 !== n.i || "length" !== t,
      enumerable: e.enumerable,
      value: r[t]
    } : e;
  },
  defineProperty: function () {
    n(11);
  },
  getPrototypeOf: function (n) {
    return Object.getPrototypeOf(n.t);
  },
  setPrototypeOf: function () {
    n(12);
  }
},
    en = {};

exports.immerable = L;
exports.nothing = H;
i(rn, function (n, t) {
  en[n] = function () {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
}), en.deleteProperty = function (t, r) {
  return "production" !== "development" && isNaN(parseInt(r)) && n(13), rn.deleteProperty.call(this, t[0], r);
}, en.set = function (t, r, e) {
  return "production" !== "development" && "length" !== r && isNaN(parseInt(r)) && n(14), rn.set.call(this, t[0], r, e, t[0]);
};

var on = function () {
  function e(n) {
    this.O = B, this.N = "production" !== "development", "boolean" == typeof (null == n ? void 0 : n.useProxies) && this.setUseProxies(n.useProxies), "boolean" == typeof (null == n ? void 0 : n.autoFreeze) && this.setAutoFreeze(n.autoFreeze), this.produce = this.produce.bind(this), this.produceWithPatches = this.produceWithPatches.bind(this);
  }

  var i = e.prototype;
  return i.produce = function (t, e, i) {
    if ("function" == typeof t && "function" != typeof e) {
      var o = e;
      e = t;
      var u = this;
      return function (n) {
        var t = this;
        void 0 === n && (n = o);

        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];

        return u.produce(n, function (n) {
          var r;
          return (r = e).call.apply(r, [t, n].concat(i));
        });
      };
    }

    var a;

    if ("function" != typeof e && n(6), void 0 !== i && "function" != typeof i && n(7), r(t)) {
      var f = w(this),
          c = R(this, t, void 0),
          s = !0;

      try {
        a = e(c), s = !1;
      } finally {
        s ? g(f) : O(f);
      }

      return "undefined" != typeof Promise && a instanceof Promise ? a.then(function (n) {
        return j(f, i), P(n, f);
      }, function (n) {
        throw g(f), n;
      }) : (j(f, i), P(a, f));
    }

    if (!t || "object" != typeof t) {
      if ((a = e(t)) === H) return;
      return void 0 === a && (a = t), this.N && d(a, !0), a;
    }

    n(21, t);
  }, i.produceWithPatches = function (n, t) {
    var r,
        e,
        i = this;
    return "function" == typeof n ? function (t) {
      for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) e[o - 1] = arguments[o];

      return i.produceWithPatches(t, function (t) {
        return n.apply(void 0, [t].concat(e));
      });
    } : [this.produce(n, t, function (n, t) {
      r = n, e = t;
    }), r, e];
  }, i.createDraft = function (e) {
    r(e) || n(8), t(e) && (e = D(e));
    var i = w(this),
        o = R(this, e, void 0);
    return o[Q].C = !0, O(i), o;
  }, i.finishDraft = function (t, r) {
    var e = t && t[Q];
    "production" !== "development" && (e && e.C || n(9), e.I && n(10));
    var i = e.A;
    return j(i, r), P(void 0, i);
  }, i.setAutoFreeze = function (n) {
    this.N = n;
  }, i.setUseProxies = function (t) {
    t && !B && n(20), this.O = t;
  }, i.applyPatches = function (n, r) {
    var e;

    for (e = r.length - 1; e >= 0; e--) {
      var i = r[e];

      if (0 === i.path.length && "replace" === i.op) {
        n = i.value;
        break;
      }
    }

    var o = b("Patches").$;
    return t(n) ? o(n, r) : this.produce(n, function (n) {
      return o(n, r.slice(e + 1));
    });
  }, e;
}(),
    un = new on(),
    an = un.produce,
    fn = un.produceWithPatches.bind(un),
    cn = un.setAutoFreeze.bind(un),
    sn = un.setUseProxies.bind(un),
    vn = un.applyPatches.bind(un),
    pn = un.createDraft.bind(un),
    ln = un.finishDraft.bind(un);

exports.finishDraft = ln;
exports.createDraft = pn;
exports.applyPatches = vn;
exports.setUseProxies = sn;
exports.setAutoFreeze = cn;
exports.produceWithPatches = fn;
exports.produce = an;
exports.Immer = on;
var _default = an;
exports.default = _default;
},{}],"node_modules/boardgame.io/dist/esm/turn-order-7578f7f3.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I = InitTurnOrderState;
exports.U = UpdateTurnOrderState;
exports.a = SetActivePlayersEvent;
exports.b = SetActivePlayers;
exports.c = UpdateActivePlayersOnceEmpty;
exports.e = error;
exports.i = info;
exports.q = alea;
exports.w = exports.v = exports.u = exports.t = exports.s = exports.r = exports.p = exports.o = exports.n = exports.m = exports.l = exports.k = exports.j = exports.h = exports.g = exports.f = exports.d = exports.T = exports.S = exports.R = exports.P = exports.N = exports.M = exports.G = exports.F = exports.E = exports.A = void 0;

var _immer = _interopRequireDefault(require("immer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
const MAKE_MOVE = 'MAKE_MOVE';
exports.M = MAKE_MOVE;
const GAME_EVENT = 'GAME_EVENT';
exports.G = GAME_EVENT;
const REDO = 'REDO';
exports.m = REDO;
const RESET = 'RESET';
exports.R = RESET;
const SYNC = 'SYNC';
exports.k = SYNC;
const UNDO = 'UNDO';
exports.l = UNDO;
const UPDATE = 'UPDATE';
exports.j = UPDATE;
const PLUGIN = 'PLUGIN';
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */

exports.P = PLUGIN;

const makeMove = (type, args, playerID, credentials) => ({
  type: MAKE_MOVE,
  payload: {
    type,
    args,
    playerID,
    credentials
  }
});
/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.p = makeMove;

const gameEvent = (type, args, playerID, credentials) => ({
  type: GAME_EVENT,
  payload: {
    type,
    args,
    playerID,
    credentials
  }
});
/**
 * Generate an automatic game event that is a side-effect of a move.
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.g = gameEvent;

const automaticGameEvent = (type, args, playerID, credentials) => ({
  type: GAME_EVENT,
  payload: {
    type,
    args,
    playerID,
    credentials
  },
  automatic: true
});

const sync = info => ({
  type: SYNC,
  state: info.state,
  log: info.log,
  initialState: info.initialState,
  clientOnly: true
});
/**
 * Used to update the Redux store's state in response to
 * an action coming from another player.
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta.
 */


exports.s = sync;

const update = (state, deltalog) => ({
  type: UPDATE,
  state,
  deltalog,
  clientOnly: true
});
/**
 * Used to reset the game state.
 * @param {object} state - The initial state.
 */


exports.w = update;

const reset = state => ({
  type: RESET,
  state,
  clientOnly: true
});
/**
 * Used to undo the last move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.r = reset;

const undo = (playerID, credentials) => ({
  type: UNDO,
  payload: {
    type: null,
    args: null,
    playerID,
    credentials
  }
});
/**
 * Used to redo the last undone move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.u = undo;

const redo = (playerID, credentials) => ({
  type: REDO,
  payload: {
    type: null,
    args: null,
    playerID,
    credentials
  }
});
/**
 * Allows plugins to define their own actions and intercept them.
 */


exports.t = redo;

const plugin = (type, args, playerID, credentials) => ({
  type: PLUGIN,
  payload: {
    type,
    args,
    playerID,
    credentials
  }
});

var ActionCreators = /*#__PURE__*/Object.freeze({
  makeMove: makeMove,
  gameEvent: gameEvent,
  automaticGameEvent: automaticGameEvent,
  sync: sync,
  update: update,
  reset: reset,
  undo: undo,
  redo: redo,
  plugin: plugin
});
/**
 * Moves can return this when they want to indicate
 * that the combination of arguments is illegal and
 * the move ought to be discarded.
 */

exports.A = ActionCreators;
const INVALID_MOVE = 'INVALID_MOVE';
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Plugin that allows using Immer to make immutable changes
 * to G by just mutating it.
 */

exports.h = INVALID_MOVE;
const ImmerPlugin = {
  name: 'plugin-immer',
  fnWrap: move => (G, ctx, ...args) => {
    let isInvalid = false;
    const newG = (0, _immer.default)(G, G => {
      const result = move(G, ctx, ...args);

      if (result === INVALID_MOVE) {
        isInvalid = true;
        return;
      }

      return result;
    });
    if (isInvalid) return INVALID_MOVE;
    return newG;
  }
}; // Inlined version of Alea from https://github.com/davidbau/seedrandom.
// Converted to Typescript October 2020.

class Alea {
  constructor(seed) {
    const mash = Mash(); // Apply the seeding algorithm from Baagoe.

    this.c = 1;
    this.s0 = mash(' ');
    this.s1 = mash(' ');
    this.s2 = mash(' ');
    this.s0 -= mash(seed);

    if (this.s0 < 0) {
      this.s0 += 1;
    }

    this.s1 -= mash(seed);

    if (this.s1 < 0) {
      this.s1 += 1;
    }

    this.s2 -= mash(seed);

    if (this.s2 < 0) {
      this.s2 += 1;
    }
  }

  next() {
    const t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32

    this.s0 = this.s1;
    this.s1 = this.s2;
    return this.s2 = t - (this.c = t | 0);
  }

}

function Mash() {
  var n = 0xefc8249d;

  var mash = function (data) {
    const str = data.toString();

    for (var i = 0; i < str.length; i++) {
      n += str.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function alea(seed, state) {
  const xg = new Alea(seed);
  const prng = xg.next.bind(xg);
  if (state) copy(state, xg);

  prng.state = () => copy(xg, {});

  return prng;
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Random
 *
 * Calls that require a pseudorandom number generator.
 * Uses a seed from ctx, and also persists the PRNG
 * state in ctx so that moves can stay pure.
 */


class Random {
  /**
   * constructor
   * @param {object} ctx - The ctx object to initialize from.
   */
  constructor(state) {
    // If we are on the client, the seed is not present.
    // Just use a temporary seed to execute the move without
    // crashing it. The move state itself is discarded,
    // so the actual value doesn't matter.
    this.state = state;
    this.used = false;
  }
  /**
   * Generates a new seed from the current date / time.
   */


  static seed() {
    return (+new Date()).toString(36).slice(-10);
  }

  isUsed() {
    return this.used;
  }

  getState() {
    return this.state;
  }
  /**
   * Generate a random number.
   */


  _random() {
    this.used = true;
    const R = this.state;
    const seed = R.prngstate ? '' : R.seed;
    const rand = alea(seed, R.prngstate);
    const number = rand();
    this.state = { ...R,
      prngstate: rand.state()
    };
    return number;
  }

  api() {
    const random = this._random.bind(this);

    const SpotValue = {
      D4: 4,
      D6: 6,
      D8: 8,
      D10: 10,
      D12: 12,
      D20: 20
    }; // Generate functions for predefined dice values D4 - D20.

    const predefined = {};

    for (const key in SpotValue) {
      const spotvalue = SpotValue[key];

      predefined[key] = diceCount => {
        if (diceCount === undefined) {
          return Math.floor(random() * spotvalue) + 1;
        } else {
          return [...new Array(diceCount).keys()].map(() => Math.floor(random() * spotvalue) + 1);
        }
      };
    }

    function Die(spotvalue = 6, diceCount) {
      if (diceCount === undefined) {
        return Math.floor(random() * spotvalue) + 1;
      } else {
        return [...new Array(diceCount).keys()].map(() => Math.floor(random() * spotvalue) + 1);
      }
    }

    return {
      /**
       * Similar to Die below, but with fixed spot values.
       * Supports passing a diceCount
       *    if not defined, defaults to 1 and returns the value directly.
       *    if defined, returns an array containing the random dice values.
       *
       * D4: (diceCount) => value
       * D6: (diceCount) => value
       * D8: (diceCount) => value
       * D10: (diceCount) => value
       * D12: (diceCount) => value
       * D20: (diceCount) => value
       */
      ...predefined,

      /**
       * Roll a die of specified spot value.
       *
       * @param {number} spotvalue - The die dimension (default: 6).
       * @param {number} diceCount - number of dice to throw.
       *                             if not defined, defaults to 1 and returns the value directly.
       *                             if defined, returns an array containing the random dice values.
       */
      Die,

      /**
       * Generate a random number between 0 and 1.
       */
      Number: () => {
        return random();
      },

      /**
       * Shuffle an array.
       *
       * @param {Array} deck - The array to shuffle. Does not mutate
       *                       the input, but returns the shuffled array.
       */
      Shuffle: deck => {
        const clone = deck.slice(0);
        let srcIndex = deck.length;
        let dstIndex = 0;
        const shuffled = new Array(srcIndex);

        while (srcIndex) {
          let randIndex = srcIndex * random() | 0;
          shuffled[dstIndex++] = clone[randIndex];
          clone[randIndex] = clone[--srcIndex];
        }

        return shuffled;
      },
      _obj: this
    };
  }

}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


const RandomPlugin = {
  name: 'random',
  noClient: ({
    api
  }) => {
    return api._obj.isUsed();
  },
  flush: ({
    api
  }) => {
    return api._obj.getState();
  },
  api: ({
    data
  }) => {
    const random = new Random(data);
    return random.api();
  },
  setup: ({
    game
  }) => {
    let {
      seed
    } = game;

    if (seed === undefined) {
      seed = Random.seed();
    }

    return {
      seed
    };
  }
};
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Events
 */

class Events {
  constructor(flow, playerID) {
    this.flow = flow;
    this.playerID = playerID;
    this.dispatch = [];
  }
  /**
   * Attaches the Events API to ctx.
   * @param {object} ctx - The ctx object to attach to.
   */


  api(ctx) {
    const events = {
      _obj: this
    };
    const {
      phase,
      turn
    } = ctx;

    for (const key of this.flow.eventNames) {
      events[key] = (...args) => {
        this.dispatch.push({
          key,
          args,
          phase,
          turn
        });
      };
    }

    return events;
  }

  isUsed() {
    return this.dispatch.length > 0;
  }
  /**
   * Updates ctx with the triggered events.
   * @param {object} state - The state object { G, ctx }.
   */


  update(state) {
    for (let i = 0; i < this.dispatch.length; i++) {
      const item = this.dispatch[i]; // If the turn already ended some other way,
      // don't try to end the turn again.

      if (item.key === 'endTurn' && item.turn !== state.ctx.turn) {
        continue;
      } // If the phase already ended some other way,
      // don't try to end the phase again.


      if ((item.key === 'endPhase' || item.key === 'setPhase') && item.phase !== state.ctx.phase) {
        continue;
      }

      const action = automaticGameEvent(item.key, item.args, this.playerID);
      state = { ...state,
        ...this.flow.processEvent(state, action)
      };
    }

    return state;
  }

}
/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


const EventsPlugin = {
  name: 'events',
  noClient: ({
    api
  }) => {
    return api._obj.isUsed();
  },
  dangerouslyFlushRawState: ({
    state,
    api
  }) => {
    return api._obj.update(state);
  },
  api: ({
    game,
    playerID,
    ctx
  }) => {
    return new Events(game.flow, playerID).api(ctx);
  }
};
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * List of plugins that are always added.
 */

const DEFAULT_PLUGINS = [ImmerPlugin, RandomPlugin, EventsPlugin];
/**
 * Allow plugins to intercept actions and process them.
 */

const ProcessAction = (state, action, opts) => {
  opts.game.plugins.filter(plugin => plugin.action !== undefined).filter(plugin => plugin.name === action.payload.type).forEach(plugin => {
    const name = plugin.name;
    const pluginState = state.plugins[name] || {
      data: {}
    };
    const data = plugin.action(pluginState.data, action.payload);
    state = { ...state,
      plugins: { ...state.plugins,
        [name]: { ...pluginState,
          data
        }
      }
    };
  });
  return state;
};
/**
 * The API's created by various plugins are stored in the plugins
 * section of the state object:
 *
 * {
 *   G: {},
 *   ctx: {},
 *   plugins: {
 *     plugin-a: {
 *       data: {},  // this is generated by the plugin at Setup / Flush.
 *       api: {},   // this is ephemeral and generated by Enhance.
 *     }
 *   }
 * }
 *
 * This function takes these API's and stuffs them back into
 * ctx for consumption inside a move function or hook.
 */


exports.n = ProcessAction;

const EnhanceCtx = state => {
  let ctx = { ...state.ctx
  };
  const plugins = state.plugins || {};
  Object.entries(plugins).forEach(([name, {
    api
  }]) => {
    ctx[name] = api;
  });
  return ctx;
};
/**
 * Applies the provided plugins to the given move / flow function.
 *
 * @param {function} fn - The move function or trigger to apply the plugins to.
 * @param {object} plugins - The list of plugins.
 */


exports.E = EnhanceCtx;

const FnWrap = (fn, plugins) => {
  const reducer = (acc, {
    fnWrap
  }) => fnWrap(acc);

  return [...DEFAULT_PLUGINS, ...plugins].filter(plugin => plugin.fnWrap !== undefined).reduce(reducer, fn);
};
/**
 * Allows the plugin to generate its initial state.
 */


exports.F = FnWrap;

const Setup = (state, opts) => {
  [...DEFAULT_PLUGINS, ...opts.game.plugins].filter(plugin => plugin.setup !== undefined).forEach(plugin => {
    const name = plugin.name;
    const data = plugin.setup({
      G: state.G,
      ctx: state.ctx,
      game: opts.game
    });
    state = { ...state,
      plugins: { ...state.plugins,
        [name]: {
          data
        }
      }
    };
  });
  return state;
};
/**
 * Invokes the plugin before a move or event.
 * The API that the plugin generates is stored inside
 * the `plugins` section of the state (which is subsequently
 * merged into ctx).
 */


exports.o = Setup;

const Enhance = (state, opts) => {
  [...DEFAULT_PLUGINS, ...opts.game.plugins].filter(plugin => plugin.api !== undefined).forEach(plugin => {
    const name = plugin.name;
    const pluginState = state.plugins[name] || {
      data: {}
    };
    const api = plugin.api({
      G: state.G,
      ctx: state.ctx,
      data: pluginState.data,
      game: opts.game,
      playerID: opts.playerID
    });
    state = { ...state,
      plugins: { ...state.plugins,
        [name]: { ...pluginState,
          api
        }
      }
    };
  });
  return state;
};
/**
 * Allows plugins to update their state after a move / event.
 */


exports.d = Enhance;

const Flush = (state, opts) => {
  // Note that we flush plugins in reverse order, to make sure that plugins
  // that come before in the chain are still available.
  [...DEFAULT_PLUGINS, ...opts.game.plugins].reverse().forEach(plugin => {
    const name = plugin.name;
    const pluginState = state.plugins[name] || {
      data: {}
    };

    if (plugin.flush) {
      const newData = plugin.flush({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
      state = { ...state,
        plugins: { ...state.plugins,
          [plugin.name]: {
            data: newData
          }
        }
      };
    } else if (plugin.dangerouslyFlushRawState) {
      state = plugin.dangerouslyFlushRawState({
        state,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      }); // Remove everything other than data.

      const data = state.plugins[name].data;
      state = { ...state,
        plugins: { ...state.plugins,
          [plugin.name]: {
            data
          }
        }
      };
    }
  });
  return state;
};
/**
 * Allows plugins to indicate if they should not be materialized on the client.
 * This will cause the client to discard the state update and wait for the
 * master instead.
 */


exports.f = Flush;

const NoClient = (state, opts) => {
  return [...DEFAULT_PLUGINS, ...opts.game.plugins].filter(plugin => plugin.noClient !== undefined).map(plugin => {
    const name = plugin.name;
    const pluginState = state.plugins[name];

    if (pluginState) {
      return plugin.noClient({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
    }

    return false;
  }).some(value => value === true);
};
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


exports.N = NoClient;
const production = "development" === 'production';
const logfn = production ? () => {} : console.log;
const errorfn = console.error;

function info(msg) {
  logfn("INFO: ".concat(msg));
}

function error(error) {
  errorfn('ERROR:', error);
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Event to change the active players (and their stages) in the current turn.
 */


function SetActivePlayersEvent(state, _playerID, arg) {
  return { ...state,
    ctx: SetActivePlayers(state.ctx, arg)
  };
}

function SetActivePlayers(ctx, arg) {
  let {
    _prevActivePlayers
  } = ctx;
  let activePlayers = {};
  let _nextActivePlayers = null;
  let _activePlayersMoveLimit = {};

  if (Array.isArray(arg)) {
    // support a simple array of player IDs as active players
    let value = {};
    arg.forEach(v => value[v] = Stage.NULL);
    activePlayers = value;
  } else {
    // process active players argument object
    if (arg.next) {
      _nextActivePlayers = arg.next;
    }

    if (arg.revert) {
      _prevActivePlayers = _prevActivePlayers.concat({
        activePlayers: ctx.activePlayers,
        _activePlayersMoveLimit: ctx._activePlayersMoveLimit,
        _activePlayersNumMoves: ctx._activePlayersNumMoves
      });
    } else {
      _prevActivePlayers = [];
    }

    if (arg.currentPlayer !== undefined) {
      ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, ctx.currentPlayer, arg.currentPlayer);
    }

    if (arg.others !== undefined) {
      for (let i = 0; i < ctx.playOrder.length; i++) {
        const id = ctx.playOrder[i];

        if (id !== ctx.currentPlayer) {
          ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, id, arg.others);
        }
      }
    }

    if (arg.all !== undefined) {
      for (let i = 0; i < ctx.playOrder.length; i++) {
        const id = ctx.playOrder[i];
        ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, id, arg.all);
      }
    }

    if (arg.value) {
      for (const id in arg.value) {
        ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, id, arg.value[id]);
      }
    }

    if (arg.moveLimit) {
      for (const id in activePlayers) {
        if (_activePlayersMoveLimit[id] === undefined) {
          _activePlayersMoveLimit[id] = arg.moveLimit;
        }
      }
    }
  }

  if (Object.keys(activePlayers).length == 0) {
    activePlayers = null;
  }

  if (Object.keys(_activePlayersMoveLimit).length == 0) {
    _activePlayersMoveLimit = null;
  }

  let _activePlayersNumMoves = {};

  for (const id in activePlayers) {
    _activePlayersNumMoves[id] = 0;
  }

  return { ...ctx,
    activePlayers,
    _activePlayersMoveLimit,
    _activePlayersNumMoves,
    _prevActivePlayers,
    _nextActivePlayers
  };
}
/**
 * Update activePlayers, setting it to previous, next or null values
 * when it becomes empty.
 * @param ctx
 */


function UpdateActivePlayersOnceEmpty(ctx) {
  let {
    activePlayers,
    _activePlayersMoveLimit,
    _activePlayersNumMoves,
    _prevActivePlayers
  } = ctx;

  if (activePlayers && Object.keys(activePlayers).length == 0) {
    if (ctx._nextActivePlayers) {
      ctx = SetActivePlayers(ctx, ctx._nextActivePlayers);
      ({
        activePlayers,
        _activePlayersMoveLimit,
        _activePlayersNumMoves,
        _prevActivePlayers
      } = ctx);
    } else if (_prevActivePlayers.length > 0) {
      const lastIndex = _prevActivePlayers.length - 1;
      ({
        activePlayers,
        _activePlayersMoveLimit,
        _activePlayersNumMoves
      } = _prevActivePlayers[lastIndex]);
      _prevActivePlayers = _prevActivePlayers.slice(0, lastIndex);
    } else {
      activePlayers = null;
      _activePlayersMoveLimit = null;
    }
  }

  return { ...ctx,
    activePlayers,
    _activePlayersMoveLimit,
    _activePlayersNumMoves,
    _prevActivePlayers
  };
}
/**
 * Apply an active player argument to the given player ID
 * @param {Object} activePlayers
 * @param {Object} _activePlayersMoveLimit
 * @param {String} playerID The player to apply the parameter to
 * @param {(String|Object)} arg An active player argument
 */


function ApplyActivePlayerArgument(activePlayers, _activePlayersMoveLimit, playerID, arg) {
  if (typeof arg !== 'object' || arg === Stage.NULL) {
    arg = {
      stage: arg
    };
  }

  if (arg.stage !== undefined) {
    activePlayers[playerID] = arg.stage;
    if (arg.moveLimit) _activePlayersMoveLimit[playerID] = arg.moveLimit;
  }
}
/**
 * Converts a playOrderPos index into its value in playOrder.
 * @param {Array} playOrder - An array of player ID's.
 * @param {number} playOrderPos - An index into the above.
 */


function getCurrentPlayer(playOrder, playOrderPos) {
  // convert to string in case playOrder is set to number[]
  return playOrder[playOrderPos] + '';
}
/**
 * Called at the start of a turn to initialize turn order state.
 *
 * TODO: This is called inside StartTurn, which is called from
 * both UpdateTurn and StartPhase (so it's called at the beginning
 * of a new phase as well as between turns). We should probably
 * split it into two.
 */


function InitTurnOrderState(state, turn) {
  let {
    G,
    ctx
  } = state;
  const ctxWithAPI = EnhanceCtx(state);
  const order = turn.order;
  let playOrder = [...new Array(ctx.numPlayers)].map((_, i) => i + '');

  if (order.playOrder !== undefined) {
    playOrder = order.playOrder(G, ctxWithAPI);
  }

  const playOrderPos = order.first(G, ctxWithAPI);
  const posType = typeof playOrderPos;

  if (posType !== 'number') {
    error("invalid value returned by turn.order.first \u2014 expected number got ".concat(posType, " \u201C").concat(playOrderPos, "\u201D."));
  }

  const currentPlayer = getCurrentPlayer(playOrder, playOrderPos);
  ctx = { ...ctx,
    currentPlayer,
    playOrderPos,
    playOrder
  };
  ctx = SetActivePlayers(ctx, turn.activePlayers || {});
  return ctx;
}
/**
 * Called at the end of each turn to update the turn order state.
 * @param {object} G - The game object G.
 * @param {object} ctx - The game object ctx.
 * @param {object} turn - A turn object for this phase.
 * @param {string} endTurnArg - An optional argument to endTurn that
                                may specify the next player.
 */


function UpdateTurnOrderState(state, currentPlayer, turn, endTurnArg) {
  const order = turn.order;
  let {
    G,
    ctx
  } = state;
  let playOrderPos = ctx.playOrderPos;
  let endPhase = false;

  if (endTurnArg && endTurnArg !== true) {
    if (typeof endTurnArg !== 'object') {
      error("invalid argument to endTurn: ".concat(endTurnArg));
    }

    Object.keys(endTurnArg).forEach(arg => {
      switch (arg) {
        case 'remove':
          currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
          break;

        case 'next':
          playOrderPos = ctx.playOrder.indexOf(endTurnArg.next);
          currentPlayer = endTurnArg.next;
          break;

        default:
          error("invalid argument to endTurn: ".concat(arg));
      }
    });
  } else {
    const ctxWithAPI = EnhanceCtx(state);
    const t = order.next(G, ctxWithAPI);
    const type = typeof t;

    if (t !== undefined && type !== 'number') {
      error("invalid value returned by turn.order.next \u2014 expected number or undefined got ".concat(type, " \u201C").concat(t, "\u201D."));
    }

    if (t === undefined) {
      endPhase = true;
    } else {
      playOrderPos = t;
      currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
    }
  }

  ctx = { ...ctx,
    playOrderPos,
    currentPlayer
  };
  return {
    endPhase,
    ctx
  };
}
/**
 * Set of different turn orders possible in a phase.
 * These are meant to be passed to the `turn` setting
 * in the flow objects.
 *
 * Each object defines the first player when the phase / game
 * begins, and also a function `next` to determine who the
 * next player is when the turn ends.
 *
 * The phase ends if next() returns undefined.
 */


const TurnOrder = {
  /**
   * DEFAULT
   *
   * The default round-robin turn order.
   */
  DEFAULT: {
    first: (G, ctx) => ctx.turn === 0 ? ctx.playOrderPos : (ctx.playOrderPos + 1) % ctx.playOrder.length,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  },

  /**
   * RESET
   *
   * Similar to DEFAULT, but starts from 0 each time.
   */
  RESET: {
    first: () => 0,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  },

  /**
   * CONTINUE
   *
   * Similar to DEFAULT, but starts with the player who ended the last phase.
   */
  CONTINUE: {
    first: (G, ctx) => ctx.playOrderPos,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  },

  /**
   * ONCE
   *
   * Another round-robin turn order, but goes around just once.
   * The phase ends after all players have played.
   */
  ONCE: {
    first: () => 0,
    next: (G, ctx) => {
      if (ctx.playOrderPos < ctx.playOrder.length - 1) {
        return ctx.playOrderPos + 1;
      }
    }
  },

  /**
   * CUSTOM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase.
   *
   * @param {Array} playOrder - The play order.
   */
  CUSTOM: playOrder => ({
    playOrder: () => playOrder,
    first: () => 0,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  }),

  /**
   * CUSTOM_FROM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase to a value specified by a field
   * in G.
   *
   * @param {string} playOrderField - Field in G.
   */
  CUSTOM_FROM: playOrderField => ({
    playOrder: G => G[playOrderField],
    first: () => 0,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  })
};
exports.T = TurnOrder;
const Stage = {
  NULL: null
};
exports.S = Stage;
const ActivePlayers = {
  /**
   * ALL
   *
   * The turn stays with one player, but any player can play (in any order)
   * until the phase ends.
   */
  ALL: {
    all: Stage.NULL
  },

  /**
   * ALL_ONCE
   *
   * The turn stays with one player, but any player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every player in the game.
   */
  ALL_ONCE: {
    all: Stage.NULL,
    moveLimit: 1
  },

  /**
   * OTHERS
   *
   * The turn stays with one player, and every *other* player can play (in any order)
   * until the phase ends.
   */
  OTHERS: {
    others: Stage.NULL
  },

  /**
   * OTHERS_ONCE
   *
   * The turn stays with one player, and every *other* player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every *other* player in the game.
   */
  OTHERS_ONCE: {
    others: Stage.NULL,
    moveLimit: 1
  }
};
exports.v = ActivePlayers;
},{"immer":"node_modules/immer/dist/immer.esm.js"}],"node_modules/boardgame.io/dist/esm/reducer-ef40323d.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.C = CreateGameReducer;
exports.P = ProcessGameConfig;

var _turnOrder7578f7f = require("./turn-order-7578f7f3.js");

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Flow
 *
 * Creates a reducer that updates ctx (analogous to how moves update G).
 */
function Flow({
  moves,
  phases,
  endIf,
  onEnd,
  turn,
  events,
  plugins
}) {
  // Attach defaults.
  if (moves === undefined) {
    moves = {};
  }

  if (events === undefined) {
    events = {};
  }

  if (plugins === undefined) {
    plugins = [];
  }

  if (phases === undefined) {
    phases = {};
  }

  if (!endIf) endIf = () => undefined;
  if (!onEnd) onEnd = G => G;
  if (!turn) turn = {};
  const phaseMap = { ...phases
  };

  if ('' in phaseMap) {
    (0, _turnOrder7578f7f.e)('cannot specify phase with empty name');
  }

  phaseMap[''] = {};
  let moveMap = {};
  let moveNames = new Set();
  let startingPhase = null;
  Object.keys(moves).forEach(name => moveNames.add(name));

  const HookWrapper = fn => {
    const withPlugins = (0, _turnOrder7578f7f.F)(fn, plugins);
    return state => {
      const ctxWithAPI = (0, _turnOrder7578f7f.E)(state);
      return withPlugins(state.G, ctxWithAPI);
    };
  };

  const TriggerWrapper = endIf => {
    return state => {
      let ctxWithAPI = (0, _turnOrder7578f7f.E)(state);
      return endIf(state.G, ctxWithAPI);
    };
  };

  const wrapped = {
    onEnd: HookWrapper(onEnd),
    endIf: TriggerWrapper(endIf)
  };

  for (let phase in phaseMap) {
    const conf = phaseMap[phase];

    if (conf.start === true) {
      startingPhase = phase;
    }

    if (conf.moves !== undefined) {
      for (let move of Object.keys(conf.moves)) {
        moveMap[phase + '.' + move] = conf.moves[move];
        moveNames.add(move);
      }
    }

    if (conf.endIf === undefined) {
      conf.endIf = () => undefined;
    }

    if (conf.onBegin === undefined) {
      conf.onBegin = G => G;
    }

    if (conf.onEnd === undefined) {
      conf.onEnd = G => G;
    }

    if (conf.turn === undefined) {
      conf.turn = turn;
    }

    if (conf.turn.order === undefined) {
      conf.turn.order = _turnOrder7578f7f.T.DEFAULT;
    }

    if (conf.turn.onBegin === undefined) {
      conf.turn.onBegin = G => G;
    }

    if (conf.turn.onEnd === undefined) {
      conf.turn.onEnd = G => G;
    }

    if (conf.turn.endIf === undefined) {
      conf.turn.endIf = () => false;
    }

    if (conf.turn.onMove === undefined) {
      conf.turn.onMove = G => G;
    }

    if (conf.turn.stages === undefined) {
      conf.turn.stages = {};
    }

    for (const stage in conf.turn.stages) {
      const stageConfig = conf.turn.stages[stage];
      const moves = stageConfig.moves || {};

      for (let move of Object.keys(moves)) {
        let key = phase + '.' + stage + '.' + move;
        moveMap[key] = moves[move];
        moveNames.add(move);
      }
    }

    conf.wrapped = {
      onBegin: HookWrapper(conf.onBegin),
      onEnd: HookWrapper(conf.onEnd),
      endIf: TriggerWrapper(conf.endIf)
    };
    conf.turn.wrapped = {
      onMove: HookWrapper(conf.turn.onMove),
      onBegin: HookWrapper(conf.turn.onBegin),
      onEnd: HookWrapper(conf.turn.onEnd),
      endIf: TriggerWrapper(conf.turn.endIf)
    };
  }

  function GetPhase(ctx) {
    return ctx.phase ? phaseMap[ctx.phase] : phaseMap[''];
  }

  function OnMove(s) {
    return s;
  }

  function Process(state, events) {
    const phasesEnded = new Set();
    const turnsEnded = new Set();

    for (let i = 0; i < events.length; i++) {
      const {
        fn,
        arg,
        ...rest
      } = events[i]; // Detect a loop of EndPhase calls.
      // This could potentially even be an infinite loop
      // if the endIf condition of each phase blindly
      // returns true. The moment we detect a single
      // loop, we just bail out of all phases.

      if (fn === EndPhase) {
        turnsEnded.clear();
        const phase = state.ctx.phase;

        if (phasesEnded.has(phase)) {
          const ctx = { ...state.ctx,
            phase: null
          };
          return { ...state,
            ctx
          };
        }

        phasesEnded.add(phase);
      } // Process event.


      let next = [];
      state = fn(state, { ...rest,
        arg,
        next
      });

      if (fn === EndGame) {
        break;
      } // Check if we should end the game.


      const shouldEndGame = ShouldEndGame(state);

      if (shouldEndGame) {
        events.push({
          fn: EndGame,
          arg: shouldEndGame,
          turn: state.ctx.turn,
          phase: state.ctx.phase,
          automatic: true
        });
        continue;
      } // Check if we should end the phase.


      const shouldEndPhase = ShouldEndPhase(state);

      if (shouldEndPhase) {
        events.push({
          fn: EndPhase,
          arg: shouldEndPhase,
          turn: state.ctx.turn,
          phase: state.ctx.phase,
          automatic: true
        });
        continue;
      } // Check if we should end the turn.


      if (fn === OnMove) {
        const shouldEndTurn = ShouldEndTurn(state);

        if (shouldEndTurn) {
          events.push({
            fn: EndTurn,
            arg: shouldEndTurn,
            turn: state.ctx.turn,
            phase: state.ctx.phase,
            automatic: true
          });
          continue;
        }
      }

      events.push(...next);
    }

    return state;
  } ///////////
  // Start //
  ///////////


  function StartGame(state, {
    next
  }) {
    next.push({
      fn: StartPhase
    });
    return state;
  }

  function StartPhase(state, {
    next
  }) {
    let {
      G,
      ctx
    } = state;
    const conf = GetPhase(ctx); // Run any phase setup code provided by the user.

    G = conf.wrapped.onBegin(state);
    next.push({
      fn: StartTurn
    });
    return { ...state,
      G,
      ctx
    };
  }

  function StartTurn(state, {
    currentPlayer
  }) {
    let {
      G,
      ctx
    } = state;
    const conf = GetPhase(ctx); // Initialize the turn order state.

    if (currentPlayer) {
      ctx = { ...ctx,
        currentPlayer
      };

      if (conf.turn.activePlayers) {
        ctx = (0, _turnOrder7578f7f.b)(ctx, conf.turn.activePlayers);
      }
    } else {
      // This is only called at the beginning of the phase
      // when there is no currentPlayer yet.
      ctx = (0, _turnOrder7578f7f.I)(state, conf.turn);
    }

    const turn = ctx.turn + 1;
    ctx = { ...ctx,
      turn,
      numMoves: 0,
      _prevActivePlayers: []
    };
    G = conf.turn.wrapped.onBegin({ ...state,
      G,
      ctx
    });
    return { ...state,
      G,
      ctx,
      _undo: [],
      _redo: []
    };
  } ////////////
  // Update //
  ////////////


  function UpdatePhase(state, {
    arg,
    next,
    phase
  }) {
    const conf = GetPhase({
      phase
    });
    let {
      ctx
    } = state;

    if (arg && arg.next) {
      if (arg.next in phaseMap) {
        ctx = { ...ctx,
          phase: arg.next
        };
      } else {
        (0, _turnOrder7578f7f.e)('invalid phase: ' + arg.next);
        return state;
      }
    } else if (conf.next !== undefined) {
      ctx = { ...ctx,
        phase: conf.next
      };
    } else {
      ctx = { ...ctx,
        phase: null
      };
    }

    state = { ...state,
      ctx
    }; // Start the new phase.

    next.push({
      fn: StartPhase
    });
    return state;
  }

  function UpdateTurn(state, {
    arg,
    currentPlayer,
    next
  }) {
    let {
      G,
      ctx
    } = state;
    const conf = GetPhase(ctx); // Update turn order state.

    const {
      endPhase,
      ctx: newCtx
    } = (0, _turnOrder7578f7f.U)(state, currentPlayer, conf.turn, arg);
    ctx = newCtx;
    state = { ...state,
      G,
      ctx
    };

    if (endPhase) {
      next.push({
        fn: EndPhase,
        turn: ctx.turn,
        phase: ctx.phase
      });
    } else {
      next.push({
        fn: StartTurn,
        currentPlayer: ctx.currentPlayer
      });
    }

    return state;
  }

  function UpdateStage(state, {
    arg,
    playerID
  }) {
    if (typeof arg === 'string') {
      arg = {
        stage: arg
      };
    }

    let {
      ctx
    } = state;
    let {
      activePlayers,
      _activePlayersMoveLimit,
      _activePlayersNumMoves
    } = ctx;

    if (arg.stage) {
      if (activePlayers === null) {
        activePlayers = {};
      }

      activePlayers[playerID] = arg.stage;
      _activePlayersNumMoves[playerID] = 0;

      if (arg.moveLimit) {
        if (_activePlayersMoveLimit === null) {
          _activePlayersMoveLimit = {};
        }

        _activePlayersMoveLimit[playerID] = arg.moveLimit;
      }
    }

    ctx = { ...ctx,
      activePlayers,
      _activePlayersMoveLimit,
      _activePlayersNumMoves
    };
    return { ...state,
      ctx
    };
  } ///////////////
  // ShouldEnd //
  ///////////////


  function ShouldEndGame(state) {
    return wrapped.endIf(state);
  }

  function ShouldEndPhase(state) {
    const conf = GetPhase(state.ctx);
    return conf.wrapped.endIf(state);
  }

  function ShouldEndTurn(state) {
    const conf = GetPhase(state.ctx); // End the turn if the required number of moves has been made.

    const currentPlayerMoves = state.ctx.numMoves || 0;

    if (conf.turn.moveLimit && currentPlayerMoves >= conf.turn.moveLimit) {
      return true;
    }

    return conf.turn.wrapped.endIf(state);
  } /////////
  // End //
  /////////


  function EndGame(state, {
    arg,
    phase
  }) {
    state = EndPhase(state, {
      phase
    });

    if (arg === undefined) {
      arg = true;
    }

    state = { ...state,
      ctx: { ...state.ctx,
        gameover: arg
      }
    }; // Run game end hook.

    const G = wrapped.onEnd(state);
    return { ...state,
      G
    };
  }

  function EndPhase(state, {
    arg,
    next,
    turn,
    automatic
  }) {
    // End the turn first.
    state = EndTurn(state, {
      turn,
      force: true,
      automatic: true
    });
    let G = state.G;
    let ctx = state.ctx;

    if (next) {
      next.push({
        fn: UpdatePhase,
        arg,
        phase: ctx.phase
      });
    } // If we aren't in a phase, there is nothing else to do.


    if (ctx.phase === null) {
      return state;
    } // Run any cleanup code for the phase that is about to end.


    const conf = GetPhase(ctx);
    G = conf.wrapped.onEnd(state); // Reset the phase.

    ctx = { ...ctx,
      phase: null
    }; // Add log entry.

    const action = (0, _turnOrder7578f7f.g)('endPhase', arg);
    const logEntry = {
      action,
      _stateID: state._stateID,
      turn: state.ctx.turn,
      phase: state.ctx.phase
    };

    if (automatic) {
      logEntry.automatic = true;
    }

    const deltalog = [...state.deltalog, logEntry];
    return { ...state,
      G,
      ctx,
      deltalog
    };
  }

  function EndTurn(state, {
    arg,
    next,
    turn,
    force,
    automatic,
    playerID
  }) {
    // This is not the turn that EndTurn was originally
    // called for. The turn was probably ended some other way.
    if (turn !== state.ctx.turn) {
      return state;
    }

    let {
      G,
      ctx
    } = state;
    const conf = GetPhase(ctx); // Prevent ending the turn if moveLimit hasn't been reached.

    const currentPlayerMoves = ctx.numMoves || 0;

    if (!force && conf.turn.moveLimit && currentPlayerMoves < conf.turn.moveLimit) {
      (0, _turnOrder7578f7f.i)("cannot end turn before making ".concat(conf.turn.moveLimit, " moves"));
      return state;
    } // Run turn-end triggers.


    G = conf.turn.wrapped.onEnd(state);

    if (next) {
      next.push({
        fn: UpdateTurn,
        arg,
        currentPlayer: ctx.currentPlayer
      });
    } // Reset activePlayers.


    ctx = { ...ctx,
      activePlayers: null
    }; // Remove player from playerOrder

    if (arg && arg.remove) {
      playerID = playerID || ctx.currentPlayer;
      const playOrder = ctx.playOrder.filter(i => i != playerID);
      const playOrderPos = ctx.playOrderPos > playOrder.length - 1 ? 0 : ctx.playOrderPos;
      ctx = { ...ctx,
        playOrder,
        playOrderPos
      };

      if (playOrder.length === 0) {
        next.push({
          fn: EndPhase,
          turn: ctx.turn,
          phase: ctx.phase
        });
        return state;
      }
    } // Add log entry.


    const action = (0, _turnOrder7578f7f.g)('endTurn', arg);
    const logEntry = {
      action,
      _stateID: state._stateID,
      turn: state.ctx.turn,
      phase: state.ctx.phase
    };

    if (automatic) {
      logEntry.automatic = true;
    }

    const deltalog = [...(state.deltalog || []), logEntry];
    return { ...state,
      G,
      ctx,
      deltalog,
      _undo: [],
      _redo: []
    };
  }

  function EndStage(state, {
    arg,
    next,
    automatic,
    playerID
  }) {
    playerID = playerID || state.ctx.currentPlayer;
    let {
      ctx
    } = state;
    let {
      activePlayers,
      _activePlayersMoveLimit
    } = ctx;
    const playerInStage = activePlayers !== null && playerID in activePlayers;

    if (!arg && playerInStage) {
      const conf = GetPhase(ctx);
      const stage = conf.turn.stages[activePlayers[playerID]];
      if (stage && stage.next) arg = stage.next;
    }

    if (next && arg) {
      next.push({
        fn: UpdateStage,
        arg,
        playerID
      });
    } // If player isn’t in a stage, there is nothing else to do.


    if (!playerInStage) return state; // Remove player from activePlayers.

    activePlayers = Object.keys(activePlayers).filter(id => id !== playerID).reduce((obj, key) => {
      obj[key] = activePlayers[key];
      return obj;
    }, {});

    if (_activePlayersMoveLimit) {
      // Remove player from _activePlayersMoveLimit.
      _activePlayersMoveLimit = Object.keys(_activePlayersMoveLimit).filter(id => id !== playerID).reduce((obj, key) => {
        obj[key] = _activePlayersMoveLimit[key];
        return obj;
      }, {});
    }

    ctx = (0, _turnOrder7578f7f.c)({ ...ctx,
      activePlayers,
      _activePlayersMoveLimit
    }); // Add log entry.

    const action = (0, _turnOrder7578f7f.g)('endStage', arg);
    const logEntry = {
      action,
      _stateID: state._stateID,
      turn: state.ctx.turn,
      phase: state.ctx.phase
    };

    if (automatic) {
      logEntry.automatic = true;
    }

    const deltalog = [...(state.deltalog || []), logEntry];
    return { ...state,
      ctx,
      deltalog
    };
  }
  /**
   * Retrieves the relevant move that can be played by playerID.
   *
   * If ctx.activePlayers is set (i.e. one or more players are in some stage),
   * then it attempts to find the move inside the stages config for
   * that turn. If the stage for a player is '', then the player is
   * allowed to make a move (as determined by the phase config), but
   * isn't restricted to a particular set as defined in the stage config.
   *
   * If not, it then looks for the move inside the phase.
   *
   * If it doesn't find the move there, it looks at the global move definition.
   *
   * @param {object} ctx
   * @param {string} name
   * @param {string} playerID
   */


  function GetMove(ctx, name, playerID) {
    const conf = GetPhase(ctx);
    const stages = conf.turn.stages;
    const {
      activePlayers
    } = ctx;

    if (activePlayers && activePlayers[playerID] !== undefined && activePlayers[playerID] !== _turnOrder7578f7f.S.NULL && stages[activePlayers[playerID]] !== undefined && stages[activePlayers[playerID]].moves !== undefined) {
      // Check if moves are defined for the player's stage.
      const stage = stages[activePlayers[playerID]];
      const moves = stage.moves;

      if (name in moves) {
        return moves[name];
      }
    } else if (conf.moves) {
      // Check if moves are defined for the current phase.
      if (name in conf.moves) {
        return conf.moves[name];
      }
    } else if (name in moves) {
      // Check for the move globally.
      return moves[name];
    }

    return null;
  }

  function ProcessMove(state, action) {
    let conf = GetPhase(state.ctx);
    const move = GetMove(state.ctx, action.type, action.playerID);
    const shouldCount = !move || typeof move === 'function' || move.noLimit !== true;
    let {
      ctx
    } = state;
    let {
      _activePlayersNumMoves
    } = ctx;
    const {
      playerID
    } = action;
    let numMoves = state.ctx.numMoves;

    if (shouldCount) {
      if (playerID == state.ctx.currentPlayer) {
        numMoves++;
      }

      if (ctx.activePlayers) _activePlayersNumMoves[playerID]++;
    }

    state = { ...state,
      ctx: { ...ctx,
        numMoves,
        _activePlayersNumMoves
      }
    };

    if (ctx._activePlayersMoveLimit && _activePlayersNumMoves[playerID] >= ctx._activePlayersMoveLimit[playerID]) {
      state = EndStage(state, {
        playerID,
        automatic: true
      });
    }

    const G = conf.turn.wrapped.onMove(state);
    state = { ...state,
      G
    };
    let events = [{
      fn: OnMove
    }];
    return Process(state, events);
  }

  function SetStageEvent(state, playerID, arg) {
    return Process(state, [{
      fn: EndStage,
      arg,
      playerID
    }]);
  }

  function EndStageEvent(state, playerID) {
    return Process(state, [{
      fn: EndStage,
      playerID
    }]);
  }

  function SetPhaseEvent(state, _playerID, newPhase) {
    return Process(state, [{
      fn: EndPhase,
      phase: state.ctx.phase,
      turn: state.ctx.turn,
      arg: {
        next: newPhase
      }
    }]);
  }

  function EndPhaseEvent(state) {
    return Process(state, [{
      fn: EndPhase,
      phase: state.ctx.phase,
      turn: state.ctx.turn
    }]);
  }

  function EndTurnEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndTurn,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      arg
    }]);
  }

  function PassEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndTurn,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      force: true,
      arg
    }]);
  }

  function EndGameEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndGame,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      arg
    }]);
  }

  const eventHandlers = {
    endStage: EndStageEvent,
    setStage: SetStageEvent,
    endTurn: EndTurnEvent,
    pass: PassEvent,
    endPhase: EndPhaseEvent,
    setPhase: SetPhaseEvent,
    endGame: EndGameEvent,
    setActivePlayers: _turnOrder7578f7f.a
  };
  let enabledEventNames = [];

  if (events.endTurn !== false) {
    enabledEventNames.push('endTurn');
  }

  if (events.pass !== false) {
    enabledEventNames.push('pass');
  }

  if (events.endPhase !== false) {
    enabledEventNames.push('endPhase');
  }

  if (events.setPhase !== false) {
    enabledEventNames.push('setPhase');
  }

  if (events.endGame !== false) {
    enabledEventNames.push('endGame');
  }

  if (events.setActivePlayers !== false) {
    enabledEventNames.push('setActivePlayers');
  }

  if (events.endStage !== false) {
    enabledEventNames.push('endStage');
  }

  if (events.setStage !== false) {
    enabledEventNames.push('setStage');
  }

  function ProcessEvent(state, action) {
    const {
      type,
      playerID,
      args
    } = action.payload;

    if (eventHandlers.hasOwnProperty(type)) {
      const eventArgs = [state, playerID].concat(args);
      return eventHandlers[type].apply({}, eventArgs);
    }

    return state;
  }

  function IsPlayerActive(_G, ctx, playerID) {
    if (ctx.activePlayers) {
      return playerID in ctx.activePlayers;
    }

    return ctx.currentPlayer === playerID;
  }

  return {
    ctx: numPlayers => ({
      numPlayers,
      turn: 0,
      currentPlayer: '0',
      playOrder: [...new Array(numPlayers)].map((_d, i) => i + ''),
      playOrderPos: 0,
      phase: startingPhase,
      activePlayers: null
    }),
    init: state => {
      return Process(state, [{
        fn: StartGame
      }]);
    },
    isPlayerActive: IsPlayerActive,
    eventHandlers,
    eventNames: Object.keys(eventHandlers),
    enabledEventNames,
    moveMap,
    moveNames: [...moveNames.values()],
    processMove: ProcessMove,
    processEvent: ProcessEvent,
    getMove: GetMove
  };
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


function IsProcessed(game) {
  return game.processMove !== undefined;
}
/**
 * Helper to generate the game move reducer. The returned
 * reducer has the following signature:
 *
 * (G, action, ctx) => {}
 *
 * You can roll your own if you like, or use any Redux
 * addon to generate such a reducer.
 *
 * The convention used in this framework is to
 * have action.type contain the name of the move, and
 * action.args contain any additional arguments as an
 * Array.
 */


function ProcessGameConfig(game) {
  // The Game() function has already been called on this
  // config object, so just pass it through.
  if (IsProcessed(game)) {
    return game;
  }

  if (game.name === undefined) game.name = 'default';
  if (game.disableUndo === undefined) game.disableUndo = false;
  if (game.setup === undefined) game.setup = () => ({});
  if (game.moves === undefined) game.moves = {};
  if (game.playerView === undefined) game.playerView = G => G;
  if (game.plugins === undefined) game.plugins = [];
  game.plugins.forEach(plugin => {
    if (plugin.name === undefined) {
      throw new Error('Plugin missing name attribute');
    }

    if (plugin.name.includes(' ')) {
      throw new Error(plugin.name + ': Plugin name must not include spaces');
    }
  });

  if (game.name.includes(' ')) {
    throw new Error(game.name + ': Game name must not include spaces');
  }

  const flow = Flow(game);
  return { ...game,
    flow,
    moveNames: flow.moveNames,
    pluginNames: game.plugins.map(p => p.name),
    processMove: (state, action) => {
      let moveFn = flow.getMove(state.ctx, action.type, action.playerID);

      if (IsLongFormMove(moveFn)) {
        moveFn = moveFn.move;
      }

      if (moveFn instanceof Function) {
        const fn = (0, _turnOrder7578f7f.F)(moveFn, game.plugins);
        const ctxWithAPI = { ...(0, _turnOrder7578f7f.E)(state),
          playerID: action.playerID
        };
        let args = [];

        if (action.args !== undefined) {
          args = args.concat(action.args);
        }

        return fn(state.G, ctxWithAPI, ...args);
      }

      (0, _turnOrder7578f7f.e)("invalid move object: ".concat(action.type));
      return state.G;
    }
  };
}

function IsLongFormMove(move) {
  return move instanceof Object && move.move !== undefined;
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Check if the payload for the passed action contains a playerID.
 */


const actionHasPlayerID = action => action.payload.playerID !== null && action.payload.playerID !== undefined;
/**
 * Returns true if a move can be undone.
 */


const CanUndoMove = (G, ctx, move) => {
  function HasUndoable(move) {
    return move.undoable !== undefined;
  }

  function IsFunction(undoable) {
    return undoable instanceof Function;
  }

  if (!HasUndoable(move)) {
    return true;
  }

  if (IsFunction(move.undoable)) {
    return move.undoable(G, ctx);
  }

  return move.undoable;
};
/**
 * Update the undo and redo stacks for a move or event.
 */


function updateUndoRedoState(state, opts) {
  if (opts.game.disableUndo) return state;
  const undoEntry = {
    G: state.G,
    ctx: state.ctx,
    plugins: state.plugins,
    playerID: opts.action.payload.playerID || state.ctx.currentPlayer
  };

  if (opts.action.type === 'MAKE_MOVE') {
    undoEntry.moveType = opts.action.payload.type;
  }

  return { ...state,
    _undo: [...state._undo, undoEntry],
    // Always reset redo stack when making a move or event
    _redo: []
  };
}
/**
 * Process state, adding the initial deltalog for this action.
 */


function initializeDeltalog(state, action, move) {
  // Create a log entry for this action.
  const logEntry = {
    action,
    _stateID: state._stateID,
    turn: state.ctx.turn,
    phase: state.ctx.phase
  };

  if (typeof move === 'object' && move.redact === true) {
    logEntry.redact = true;
  }

  return { ...state,
    deltalog: [logEntry]
  };
}
/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 */


function CreateGameReducer({
  game,
  isClient
}) {
  game = ProcessGameConfig(game);
  /**
   * GameReducer
   *
   * Redux reducer that maintains the overall game state.
   * @param {object} state - The state before the action.
   * @param {object} action - A Redux action.
   */

  return (state = null, action) => {
    switch (action.type) {
      case _turnOrder7578f7f.G:
        {
          state = { ...state,
            deltalog: []
          }; // Process game events only on the server.
          // These events like `endTurn` typically
          // contain code that may rely on secret state
          // and cannot be computed on the client.

          if (isClient) {
            return state;
          } // Disallow events once the game is over.


          if (state.ctx.gameover !== undefined) {
            (0, _turnOrder7578f7f.e)("cannot call event after game end");
            return state;
          } // Ignore the event if the player isn't active.


          if (actionHasPlayerID(action) && !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
            (0, _turnOrder7578f7f.e)("disallowed event: ".concat(action.payload.type));
            return state;
          } // Execute plugins.


          state = (0, _turnOrder7578f7f.d)(state, {
            game,
            isClient: false,
            playerID: action.payload.playerID
          }); // Process event.

          let newState = game.flow.processEvent(state, action); // Execute plugins.

          newState = (0, _turnOrder7578f7f.f)(newState, {
            game,
            isClient: false
          }); // Update undo / redo state.

          newState = updateUndoRedoState(newState, {
            game,
            action
          });
          return { ...newState,
            _stateID: state._stateID + 1
          };
        }

      case _turnOrder7578f7f.M:
        {
          state = { ...state,
            deltalog: []
          }; // Check whether the move is allowed at this time.

          const move = game.flow.getMove(state.ctx, action.payload.type, action.payload.playerID || state.ctx.currentPlayer);

          if (move === null) {
            (0, _turnOrder7578f7f.e)("disallowed move: ".concat(action.payload.type));
            return state;
          } // Don't run move on client if move says so.


          if (isClient && move.client === false) {
            return state;
          } // Disallow moves once the game is over.


          if (state.ctx.gameover !== undefined) {
            (0, _turnOrder7578f7f.e)("cannot make move after game end");
            return state;
          } // Ignore the move if the player isn't active.


          if (actionHasPlayerID(action) && !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
            (0, _turnOrder7578f7f.e)("disallowed move: ".concat(action.payload.type));
            return state;
          } // Execute plugins.


          state = (0, _turnOrder7578f7f.d)(state, {
            game,
            isClient,
            playerID: action.payload.playerID
          }); // Process the move.

          let G = game.processMove(state, action.payload); // The game declared the move as invalid.

          if (G === _turnOrder7578f7f.h) {
            (0, _turnOrder7578f7f.e)("invalid move: ".concat(action.payload.type, " args: ").concat(action.payload.args));
            return state;
          }

          const newState = { ...state,
            G
          }; // Some plugin indicated that it is not suitable to be
          // materialized on the client (and must wait for the server
          // response instead).

          if (isClient && (0, _turnOrder7578f7f.N)(newState, {
            game
          })) {
            return state;
          }

          state = newState; // If we're on the client, just process the move
          // and no triggers in multiplayer mode.
          // These will be processed on the server, which
          // will send back a state update.

          if (isClient) {
            state = (0, _turnOrder7578f7f.f)(state, {
              game,
              isClient: true
            });
            return { ...state,
              _stateID: state._stateID + 1
            };
          } // On the server, construct the deltalog.


          state = initializeDeltalog(state, action, move); // Allow the flow reducer to process any triggers that happen after moves.

          state = game.flow.processMove(state, action.payload);
          state = (0, _turnOrder7578f7f.f)(state, {
            game
          }); // Update undo / redo state.

          state = updateUndoRedoState(state, {
            game,
            action
          });
          return { ...state,
            _stateID: state._stateID + 1
          };
        }

      case _turnOrder7578f7f.R:
      case _turnOrder7578f7f.j:
      case _turnOrder7578f7f.k:
        {
          return action.state;
        }

      case _turnOrder7578f7f.l:
        {
          state = { ...state,
            deltalog: []
          };

          if (game.disableUndo) {
            (0, _turnOrder7578f7f.e)('Undo is not enabled');
            return state;
          }

          const {
            _undo,
            _redo
          } = state;

          if (_undo.length < 2) {
            return state;
          }

          const last = _undo[_undo.length - 1];
          const restore = _undo[_undo.length - 2]; // Only allow players to undo their own moves.

          if (actionHasPlayerID(action) && action.payload.playerID !== last.playerID) {
            return state;
          } // Only allow undoable moves to be undone.


          const lastMove = game.flow.getMove(restore.ctx, last.moveType, last.playerID);

          if (!CanUndoMove(state.G, state.ctx, lastMove)) {
            return state;
          }

          state = initializeDeltalog(state, action);
          return { ...state,
            G: restore.G,
            ctx: restore.ctx,
            plugins: restore.plugins,
            _stateID: state._stateID + 1,
            _undo: _undo.slice(0, _undo.length - 1),
            _redo: [last, ..._redo]
          };
        }

      case _turnOrder7578f7f.m:
        {
          state = { ...state,
            deltalog: []
          };

          if (game.disableUndo) {
            (0, _turnOrder7578f7f.e)('Redo is not enabled');
            return state;
          }

          const {
            _undo,
            _redo
          } = state;

          if (_redo.length == 0) {
            return state;
          }

          const first = _redo[0]; // Only allow players to redo their own undos.

          if (actionHasPlayerID(action) && action.payload.playerID !== first.playerID) {
            return state;
          }

          state = initializeDeltalog(state, action);
          return { ...state,
            G: first.G,
            ctx: first.ctx,
            plugins: first.plugins,
            _stateID: state._stateID + 1,
            _undo: [..._undo, first],
            _redo: _redo.slice(1)
          };
        }

      case _turnOrder7578f7f.P:
        {
          return (0, _turnOrder7578f7f.n)(state, action, {
            game
          });
        }

      default:
        {
          return state;
        }
    }
  };
}
},{"./turn-order-7578f7f3.js":"node_modules/boardgame.io/dist/esm/turn-order-7578f7f3.js"}],"node_modules/flatted/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = exports.parse = exports.default = void 0;

var Flatted = function (Primitive, primitive) {
  /*!
   * ISC License
   *
   * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */
  var Flatted = {
    parse: function parse(text) {
      var input = JSON.parse(text, Primitives).map(primitives);
      var value = input[0];
      return typeof value === 'object' && value ? revive(input, new Set(), value) : value;
    },
    stringify: function stringify(value) {
      for (var firstRun, known = new Map(), input = [], output = [], i = +set(known, input, value), replace = function (key, value) {
        if (firstRun) return firstRun = !firstRun, value;

        switch (typeof value) {
          case 'object':
            if (value === null) return value;

          case primitive:
            return known.get(value) || set(known, input, value);
        }

        return value;
      }; i < input.length; i++) {
        firstRun = true;
        output[i] = JSON.stringify(input[i], replace);
      }

      return '[' + output.join(',') + ']';
    }
  };
  return Flatted;

  function revive(input, parsed, output) {
    return Object.keys(output).reduce(function (output, key) {
      var value = output[key];

      if (value instanceof Primitive) {
        var tmp = input[value];

        if (typeof tmp === 'object' && !parsed.has(tmp)) {
          parsed.add(tmp);
          output[key] = revive(input, parsed, tmp);
        } else {
          output[key] = tmp;
        }
      }

      return output;
    }, output);
  }

  function set(known, input, value) {
    var index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
  }

  function primitives(value) {
    return value instanceof Primitive ? Primitive(value) : value;
  }

  function Primitives(key, value) {
    return typeof value === primitive ? new Primitive(value) : value;
  }
}(String, 'string');

var _default = Flatted;
exports.default = _default;
const parse = Flatted.parse;
exports.parse = parse;
const stringify = Flatted.stringify;
exports.stringify = stringify;
},{}],"node_modules/boardgame.io/dist/esm/ai-4091d3f9.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S = Step;
exports.a = Simulate;
exports.R = exports.M = exports.B = void 0;

var _turnOrder7578f7f = require("./turn-order-7578f7f3.js");

var _reducerEf40323d = require("./reducer-ef40323d.js");

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Base class that bots can extend.
 */
class Bot {
  constructor({
    enumerate,
    seed
  }) {
    this.enumerateFn = enumerate;
    this.seed = seed;
    this.iterationCounter = 0;
    this._opts = {};
  }

  addOpt({
    key,
    range,
    initial
  }) {
    this._opts[key] = {
      range,
      value: initial
    };
  }

  getOpt(key) {
    return this._opts[key].value;
  }

  setOpt(key, value) {
    if (key in this._opts) {
      this._opts[key].value = value;
    }
  }

  opts() {
    return this._opts;
  }

  enumerate(G, ctx, playerID) {
    const actions = this.enumerateFn(G, ctx, playerID);
    return actions.map(a => {
      if ('payload' in a) {
        return a;
      }

      if ('move' in a) {
        return (0, _turnOrder7578f7f.p)(a.move, a.args, playerID);
      }

      if ('event' in a) {
        return (0, _turnOrder7578f7f.g)(a.event, a.args, playerID);
      }
    });
  }

  random(arg) {
    let number;

    if (this.seed !== undefined) {
      const seed = this.prngstate ? '' : this.seed;
      const rand = (0, _turnOrder7578f7f.q)(seed, this.prngstate);
      number = rand();
      this.prngstate = rand.state();
    } else {
      number = Math.random();
    }

    if (arg) {
      if (Array.isArray(arg)) {
        const id = Math.floor(number * arg.length);
        return arg[id];
      } else {
        return Math.floor(number * arg);
      }
    }

    return number;
  }

}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * The number of iterations to run before yielding to
 * the JS event loop (in async mode).
 */


exports.B = Bot;
const CHUNK_SIZE = 25;
/**
 * Bot that uses Monte-Carlo Tree Search to find promising moves.
 */

class MCTSBot extends Bot {
  constructor({
    enumerate,
    seed,
    objectives,
    game,
    iterations,
    playoutDepth,
    iterationCallback
  }) {
    super({
      enumerate,
      seed
    });

    if (objectives === undefined) {
      objectives = () => ({});
    }

    this.objectives = objectives;

    this.iterationCallback = iterationCallback || (() => {});

    this.reducer = (0, _reducerEf40323d.C)({
      game
    });
    this.iterations = iterations;
    this.playoutDepth = playoutDepth;
    this.addOpt({
      key: 'async',
      initial: false
    });
    this.addOpt({
      key: 'iterations',
      initial: typeof iterations === 'number' ? iterations : 1000,
      range: {
        min: 1,
        max: 2000
      }
    });
    this.addOpt({
      key: 'playoutDepth',
      initial: typeof playoutDepth === 'number' ? playoutDepth : 50,
      range: {
        min: 1,
        max: 100
      }
    });
  }

  createNode({
    state,
    parentAction,
    parent,
    playerID
  }) {
    const {
      G,
      ctx
    } = state;
    let actions = [];
    let objectives = [];

    if (playerID !== undefined) {
      actions = this.enumerate(G, ctx, playerID);
      objectives = this.objectives(G, ctx, playerID);
    } else if (ctx.activePlayers) {
      for (let playerID in ctx.activePlayers) {
        actions = actions.concat(this.enumerate(G, ctx, playerID));
        objectives = objectives.concat(this.objectives(G, ctx, playerID));
      }
    } else {
      actions = actions.concat(this.enumerate(G, ctx, ctx.currentPlayer));
      objectives = objectives.concat(this.objectives(G, ctx, ctx.currentPlayer));
    }

    return {
      state,
      parent,
      parentAction,
      actions,
      objectives,
      children: [],
      visits: 0,
      value: 0
    };
  }

  select(node) {
    // This node has unvisited children.
    if (node.actions.length > 0) {
      return node;
    } // This is a terminal node.


    if (node.children.length == 0) {
      return node;
    }

    let selectedChild = null;
    let best = 0.0;

    for (const child of node.children) {
      const childVisits = child.visits + Number.EPSILON;
      const uct = child.value / childVisits + Math.sqrt(2 * Math.log(node.visits) / childVisits);

      if (selectedChild == null || uct > best) {
        best = uct;
        selectedChild = child;
      }
    }

    return this.select(selectedChild);
  }

  expand(node) {
    const actions = node.actions;

    if (actions.length == 0 || node.state.ctx.gameover !== undefined) {
      return node;
    }

    const id = this.random(actions.length);
    const action = actions[id];
    node.actions.splice(id, 1);
    const childState = this.reducer(node.state, action);
    const childNode = this.createNode({
      state: childState,
      parentAction: action,
      parent: node
    });
    node.children.push(childNode);
    return childNode;
  }

  playout({
    state
  }) {
    let playoutDepth = this.getOpt('playoutDepth');

    if (typeof this.playoutDepth === 'function') {
      playoutDepth = this.playoutDepth(state.G, state.ctx);
    }

    for (let i = 0; i < playoutDepth && state.ctx.gameover === undefined; i++) {
      const {
        G,
        ctx
      } = state;
      let playerID = ctx.currentPlayer;

      if (ctx.activePlayers) {
        playerID = Object.keys(ctx.activePlayers)[0];
      }

      const moves = this.enumerate(G, ctx, playerID); // Check if any objectives are met.

      const objectives = this.objectives(G, ctx, playerID);
      const score = Object.keys(objectives).reduce((score, key) => {
        const objective = objectives[key];

        if (objective.checker(G, ctx)) {
          return score + objective.weight;
        }

        return score;
      }, 0.0); // If so, stop and return the score.

      if (score > 0) {
        return {
          score
        };
      }

      if (!moves || moves.length == 0) {
        return undefined;
      }

      const id = this.random(moves.length);
      const childState = this.reducer(state, moves[id]);
      state = childState;
    }

    return state.ctx.gameover;
  }

  backpropagate(node, result = {}) {
    node.visits++;

    if (result.score !== undefined) {
      node.value += result.score;
    }

    if (result.draw === true) {
      node.value += 0.5;
    }

    if (node.parentAction && result.winner === node.parentAction.payload.playerID) {
      node.value++;
    }

    if (node.parent) {
      this.backpropagate(node.parent, result);
    }
  }

  play(state, playerID) {
    const root = this.createNode({
      state,
      playerID
    });
    let numIterations = this.getOpt('iterations');

    if (typeof this.iterations === 'function') {
      numIterations = this.iterations(state.G, state.ctx);
    }

    const getResult = () => {
      let selectedChild = null;

      for (const child of root.children) {
        if (selectedChild == null || child.visits > selectedChild.visits) {
          selectedChild = child;
        }
      }

      const action = selectedChild && selectedChild.parentAction;
      const metadata = root;
      return {
        action,
        metadata
      };
    };

    return new Promise(resolve => {
      const iteration = () => {
        for (let i = 0; i < CHUNK_SIZE && this.iterationCounter < numIterations; i++) {
          const leaf = this.select(root);
          const child = this.expand(leaf);
          const result = this.playout(child);
          this.backpropagate(child, result);
          this.iterationCounter++;
        }

        this.iterationCallback({
          iterationCounter: this.iterationCounter,
          numIterations,
          metadata: root
        });
      };

      this.iterationCounter = 0;

      if (this.getOpt('async')) {
        const asyncIteration = () => {
          if (this.iterationCounter < numIterations) {
            iteration();
            setTimeout(asyncIteration, 0);
          } else {
            resolve(getResult());
          }
        };

        asyncIteration();
      } else {
        while (this.iterationCounter < numIterations) {
          iteration();
        }

        resolve(getResult());
      }
    });
  }

}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Bot that picks a move at random.
 */


exports.M = MCTSBot;

class RandomBot extends Bot {
  play({
    G,
    ctx
  }, playerID) {
    const moves = this.enumerate(G, ctx, playerID);
    return Promise.resolve({
      action: this.random(moves)
    });
  }

}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Make a single move on the client with a bot.
 *
 * @param {...object} client - The game client.
 * @param {...object} bot - The bot.
 */


exports.R = RandomBot;

async function Step(client, bot) {
  const state = client.store.getState();
  let playerID = state.ctx.currentPlayer;

  if (state.ctx.activePlayers) {
    playerID = Object.keys(state.ctx.activePlayers)[0];
  }

  const {
    action,
    metadata
  } = await bot.play(state, playerID);

  if (action) {
    const a = { ...action,
      payload: { ...action.payload,
        metadata
      }
    };
    client.store.dispatch(a);
    return a;
  }
}
/**
 * Simulates the game till the end or a max depth.
 *
 * @param {...object} game - The game object.
 * @param {...object} bots - An array of bots.
 * @param {...object} state - The game state to start from.
 */


async function Simulate({
  game,
  bots,
  state,
  depth
}) {
  if (depth === undefined) depth = 10000;
  const reducer = (0, _reducerEf40323d.C)({
    game
  });
  let metadata = null;
  let iter = 0;

  while (state.ctx.gameover === undefined && iter < depth) {
    let playerID = state.ctx.currentPlayer;

    if (state.ctx.activePlayers) {
      playerID = Object.keys(state.ctx.activePlayers)[0];
    }

    const bot = bots instanceof Bot ? bots : bots[playerID];
    const t = await bot.play(state, playerID);

    if (!t.action) {
      break;
    }

    metadata = t.metadata;
    state = reducer(state, t.action);
    iter++;
  }

  return {
    state,
    metadata
  };
}
},{"./turn-order-7578f7f3.js":"node_modules/boardgame.io/dist/esm/turn-order-7578f7f3.js","./reducer-ef40323d.js":"node_modules/boardgame.io/dist/esm/reducer-ef40323d.js"}],"node_modules/boardgame.io/dist/esm/Debug-ba7187a3.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.D = void 0;

var _turnOrder7578f7f = require("./turn-order-7578f7f3.js");

var _reducerEf40323d = require("./reducer-ef40323d.js");

var _flatted = require("flatted");

var _ai4091d3f = require("./ai-4091d3f9.js");

function noop() {}

const identity = x => x;

function assign(tar, src) {
  // @ts-ignore
  for (const k in src) tar[k] = src[k];

  return tar;
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
}

function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }

  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (typeof lets === 'object') {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);

      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);

  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}

function exclude_internal_props(props) {
  const result = {};

  for (const k in props) if (k[0] !== '$') result[k] = props[k];

  return result;
}

function null_to_empty(value) {
  return value == null ? '' : value;
}

const is_client = typeof window !== 'undefined';
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
const tasks = new Set();

function run_tasks(now) {
  tasks.forEach(task => {
    if (!task.c(now)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */


function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise(fulfill => {
      tasks.add(task = {
        c: callback,
        f: fulfill
      });
    }),

    abort() {
      tasks.delete(task);
    }

  };
}

function append(target, node) {
  target.appendChild(node);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}

function stop_propagation(fn) {
  return function (event) {
    event.stopPropagation(); // @ts-ignore

    return fn.call(this, event);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function to_number(value) {
  return value === '' ? undefined : +value;
}

function children(element) {
  return Array.from(element.childNodes);
}

function set_data(text, data) {
  data = '' + data;
  if (text.wholeText !== data) text.data = data;
}

function set_input_value(input, value) {
  input.value = value == null ? '' : value;
}

function select_option(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];

    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
}

function select_value(select) {
  const selected_option = select.querySelector(':checked') || select.options[0];
  return selected_option && selected_option.__value;
}

function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}

function custom_event(type, detail) {
  const e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, false, false, detail);
  return e;
}

const active_docs = new Set();
let active = 0; // https://github.com/darkskyapp/string-hash/blob/master/index.js

function hash(str) {
  let hash = 5381;
  let i = str.length;

  while (i--) hash = (hash << 5) - hash ^ str.charCodeAt(i);

  return hash >>> 0;
}

function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = '{\n';

  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + "%{".concat(fn(t, 1 - t), "}\n");
  }

  const rule = keyframes + "100% {".concat(fn(b, 1 - b), "}\n}");
  const name = "__svelte_".concat(hash(rule), "_").concat(uid);
  const doc = node.ownerDocument;
  active_docs.add(doc);
  const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
  const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});

  if (!current_rules[name]) {
    current_rules[name] = true;
    stylesheet.insertRule("@keyframes ".concat(name, " ").concat(rule), stylesheet.cssRules.length);
  }

  const animation = node.style.animation || '';
  node.style.animation = "".concat(animation ? "".concat(animation, ", ") : "").concat(name, " ").concat(duration, "ms linear ").concat(delay, "ms 1 both");
  active += 1;
  return name;
}

function delete_rule(node, name) {
  const previous = (node.style.animation || '').split(', ');
  const next = previous.filter(name ? anim => anim.indexOf(name) < 0 // remove specific animation
  : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
  );
  const deleted = previous.length - next.length;

  if (deleted) {
    node.style.animation = next.join(', ');
    active -= deleted;
    if (!active) clear_rules();
  }
}

function clear_rules() {
  raf(() => {
    if (active) return;
    active_docs.forEach(doc => {
      const stylesheet = doc.__svelte_stylesheet;
      let i = stylesheet.cssRules.length;

      while (i--) stylesheet.deleteRule(i);

      doc.__svelte_rules = {};
    });
    active_docs.clear();
  });
}

let current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];

    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      const event = custom_event(type, detail);
      callbacks.slice().forEach(fn => {
        fn.call(component, event);
      });
    }
  };
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

function getContext(key) {
  return get_current_component().$$.context.get(key);
} // TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism


function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];

  if (callbacks) {
    callbacks.slice().forEach(fn => fn(event));
  }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

let flushing = false;
const seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    dirty_components.length = 0;

    while (binding_callbacks.length) binding_callbacks.pop()(); // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

let promise;

function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }

  return promise;
}

function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event("".concat(direction ? 'intro' : 'outro').concat(kind)));
}

const outroing = new Set();
let outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

const null_transition = {
  duration: 0
};

function create_bidirectional_transition(node, fn, params, intro) {
  let config = fn(node, params);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;

  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }

  function init(program, duration) {
    const d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }

  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };

    if (!b) {
      // @ts-ignore todo: improve typings
      program.group = outros;
      outros.r += 1;
    }

    if (running_program) {
      pending_program = program;
    } else {
      // if this is an intro, and there's a delay, we need to do
      // an initial tick and/or apply CSS animation immediately
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }

      if (b) tick(0, 1);
      running_program = init(program, duration);
      add_render_callback(() => dispatch(node, b, 'start'));
      loop(now => {
        if (pending_program && now > pending_program.start) {
          running_program = init(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, 'start');

          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
          }
        }

        if (running_program) {
          if (now >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, 'end');

            if (!pending_program) {
              // we're done
              if (running_program.b) {
                // intro — we can tidy up immediately
                clear_animation();
              } else {
                // outro — needs to be coordinated
                if (! --running_program.group.r) run_all(running_program.group.c);
              }
            }

            running_program = null;
          } else if (now >= running_program.start) {
            const p = now - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }

        return !!(running_program || pending_program);
      });
    }
  }

  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          // @ts-ignore
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },

    end() {
      clear_animation();
      running_program = pending_program = null;
    }

  };
}

const globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

function get_spread_update(levels, updates) {
  const update = {};
  const to_null_out = {};
  const accounted_for = {
    $$scope: 1
  };
  let i = levels.length;

  while (i--) {
    const o = levels[i];
    const n = updates[i];

    if (n) {
      for (const key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (const key in n) {
        if (!accounted_for[key]) {
          update[key] = n[key];
          accounted_for[key] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }

  for (const key in to_null_out) {
    if (!(key in update)) update[key] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function create_component(block) {
  block && block.c();
}

function mount_component(component, target, anchor) {
  const {
    fragment,
    on_mount,
    on_destroy,
    after_update
  } = component.$$;
  fragment && fragment.m(target, anchor); // onMount happens before the initial afterUpdate

  add_render_callback(() => {
    const new_on_destroy = on_mount.map(run).filter(is_function);

    if (on_destroy) {
      on_destroy.push(...new_on_destroy);
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }

    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  const $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const prop_values = options.props || {};
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : []),
    // everything else
    callbacks: blank_object(),
    dirty
  };
  let ready = false;
  $$.ctx = instance ? instance(component, prop_values, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if ($$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }

  set_current_component(parent_component);
}

class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }

  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }

  $set() {// overridden by instance, if it has props
  }

}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */

function writable(value, start = noop) {
  let stop;
  const subscribers = [];

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        const run_queue = !subscriber_queue.length;

        for (let i = 0; i < subscribers.length; i += 1) {
          const s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }

        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.push(subscriber);

    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return () => {
      const index = subscribers.indexOf(subscriber);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }

      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set,
    update,
    subscribe
  };
}

function cubicOut(t) {
  const f = t - 1.0;
  return f * f * f + 1.0;
}

function fly(node, {
  delay = 0,
  duration = 400,
  easing = cubicOut,
  x = 0,
  y = 0,
  opacity = 0
}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === 'none' ? '' : style.transform;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => "\n\t\t\ttransform: ".concat(transform, " translate(").concat((1 - t) * x, "px, ").concat((1 - t) * y, "px);\n\t\t\topacity: ").concat(target_opacity - od * u)
  };
}
/* src/client/debug/Menu.svelte generated by Svelte v3.24.0 */


function add_css() {
  var style = element("style");
  style.id = "svelte-14p9tpy-style";
  style.textContent = ".menu.svelte-14p9tpy{display:flex;margin-top:-10px;flex-direction:row-reverse;border:1px solid #ccc;border-radius:5px 5px 0 0;height:25px;line-height:25px;margin-right:-500px;transform-origin:bottom right;transform:rotate(-90deg) translate(0, -500px)}.menu-item.svelte-14p9tpy{line-height:25px;cursor:pointer;border:0;background:#fefefe;color:#555;padding-left:15px;padding-right:15px;text-align:center}.menu-item.svelte-14p9tpy:first-child{border-radius:0 5px 0 0}.menu-item.svelte-14p9tpy:last-child{border-radius:5px 0 0 0}.menu-item.active.svelte-14p9tpy{cursor:default;font-weight:bold;background:#ddd;color:#555}.menu-item.svelte-14p9tpy:hover,.menu-item.svelte-14p9tpy:focus{background:#eee;color:#555}";
  append(document.head, style);
}

function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i][0];
  child_ctx[5] = list[i][1].label;
  return child_ctx;
} // (57:2) {#each Object.entries(panes) as [key, {label}


function create_each_block(ctx) {
  let button;
  let t0_value =
  /*label*/
  ctx[5] + "";
  let t0;
  let t1;
  let mounted;
  let dispose;

  function click_handler(...args) {
    return (
      /*click_handler*/
      ctx[3](
      /*key*/
      ctx[4], ...args)
    );
  }

  return {
    c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "menu-item svelte-14p9tpy");
      toggle_class(button, "active",
      /*pane*/
      ctx[0] ==
      /*key*/
      ctx[4]);
    },

    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t0);
      append(button, t1);

      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*panes*/
      2 && t0_value !== (t0_value =
      /*label*/
      ctx[5] + "")) set_data(t0, t0_value);

      if (dirty &
      /*pane, Object, panes*/
      3) {
        toggle_class(button, "active",
        /*pane*/
        ctx[0] ==
        /*key*/
        ctx[4]);
      }
    },

    d(detaching) {
      if (detaching) detach(button);
      mounted = false;
      dispose();
    }

  };
}

function create_fragment(ctx) {
  let nav;
  let each_value = Object.entries(
  /*panes*/
  ctx[1]);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  return {
    c() {
      nav = element("nav");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(nav, "class", "menu svelte-14p9tpy");
    },

    m(target, anchor) {
      insert(target, nav, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(nav, null);
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*pane, Object, panes, dispatch*/
      7) {
        each_value = Object.entries(
        /*panes*/
        ctx[1]);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(nav, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(nav);
      destroy_each(each_blocks, detaching);
    }

  };
}

function instance($$self, $$props, $$invalidate) {
  let {
    pane
  } = $$props;
  let {
    panes
  } = $$props;
  const dispatch = createEventDispatcher();

  const click_handler = key => dispatch("change", key);

  $$self.$set = $$props => {
    if ("pane" in $$props) $$invalidate(0, pane = $$props.pane);
    if ("panes" in $$props) $$invalidate(1, panes = $$props.panes);
  };

  return [pane, panes, dispatch, click_handler];
}

class Menu extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-14p9tpy-style")) add_css();
    init(this, options, instance, create_fragment, safe_not_equal, {
      pane: 0,
      panes: 1
    });
  }

}

var contextKey = {};
/* node_modules/svelte-json-tree-auto/src/JSONArrow.svelte generated by Svelte v3.24.0 */

function add_css$1() {
  var style = element("style");
  style.id = "svelte-1vyml86-style";
  style.textContent = ".container.svelte-1vyml86{display:inline-block;cursor:pointer;transform:translate(calc(0px - var(--li-identation)), -50%);position:absolute;top:50%;padding-right:100%}.arrow.svelte-1vyml86{transform-origin:25% 50%;position:relative;line-height:1.1em;font-size:0.75em;margin-left:0;transition:150ms;color:var(--arrow-sign);user-select:none;font-family:'Courier New', Courier, monospace}.expanded.svelte-1vyml86{transform:rotateZ(90deg) translateX(-3px)}";
  append(document.head, style);
}

function create_fragment$1(ctx) {
  let div1;
  let div0;
  let mounted;
  let dispose;
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      div0.textContent = "▶";
      attr(div0, "class", "arrow svelte-1vyml86");
      toggle_class(div0, "expanded",
      /*expanded*/
      ctx[0]);
      attr(div1, "class", "container svelte-1vyml86");
    },

    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);

      if (!mounted) {
        dispose = listen(div1, "click",
        /*click_handler*/
        ctx[1]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*expanded*/
      1) {
        toggle_class(div0, "expanded",
        /*expanded*/
        ctx[0]);
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div1);
      mounted = false;
      dispose();
    }

  };
}

function instance$1($$self, $$props, $$invalidate) {
  let {
    expanded
  } = $$props;

  function click_handler(event) {
    bubble($$self, event);
  }

  $$self.$set = $$props => {
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  return [expanded, click_handler];
}

class JSONArrow extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1vyml86-style")) add_css$1();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      expanded: 0
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONKey.svelte generated by Svelte v3.24.0 */


function add_css$2() {
  var style = element("style");
  style.id = "svelte-1vlbacg-style";
  style.textContent = "label.svelte-1vlbacg{display:inline-block;color:var(--label-color);padding:0}.spaced.svelte-1vlbacg{padding-right:var(--li-colon-space)}";
  append(document.head, style);
} // (16:0) {#if showKey && key}


function create_if_block(ctx) {
  let label;
  let span;
  let t0;
  let t1;
  let mounted;
  let dispose;
  return {
    c() {
      label = element("label");
      span = element("span");
      t0 = text(
      /*key*/
      ctx[0]);
      t1 = text(
      /*colon*/
      ctx[2]);
      attr(label, "class", "svelte-1vlbacg");
      toggle_class(label, "spaced",
      /*isParentExpanded*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, label, anchor);
      append(label, span);
      append(span, t0);
      append(span, t1);

      if (!mounted) {
        dispose = listen(label, "click",
        /*click_handler*/
        ctx[5]);
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*key*/
      1) set_data(t0,
      /*key*/
      ctx[0]);
      if (dirty &
      /*colon*/
      4) set_data(t1,
      /*colon*/
      ctx[2]);

      if (dirty &
      /*isParentExpanded*/
      2) {
        toggle_class(label, "spaced",
        /*isParentExpanded*/
        ctx[1]);
      }
    },

    d(detaching) {
      if (detaching) detach(label);
      mounted = false;
      dispose();
    }

  };
}

function create_fragment$2(ctx) {
  let if_block_anchor;
  let if_block =
  /*showKey*/
  ctx[3] &&
  /*key*/
  ctx[0] && create_if_block(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },

    p(ctx, [dirty]) {
      if (
      /*showKey*/
      ctx[3] &&
      /*key*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
}

function instance$2($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray = false
  } = $$props,
      {
    colon = ":"
  } = $$props;

  function click_handler(event) {
    bubble($$self, event);
  }

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("colon" in $$props) $$invalidate(2, colon = $$props.colon);
  };

  let showKey;

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*isParentExpanded, isParentArray, key*/
    19) {
      $: $$invalidate(3, showKey = isParentExpanded || !isParentArray || key != +key);
    }
  };

  return [key, isParentExpanded, colon, showKey, isParentArray, click_handler];
}

class JSONKey extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1vlbacg-style")) add_css$2();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      key: 0,
      isParentExpanded: 1,
      isParentArray: 4,
      colon: 2
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONNested.svelte generated by Svelte v3.24.0 */


function add_css$3() {
  var style = element("style");
  style.id = "svelte-rwxv37-style";
  style.textContent = "label.svelte-rwxv37{display:inline-block}.indent.svelte-rwxv37{padding-left:var(--li-identation)}.collapse.svelte-rwxv37{--li-display:inline;display:inline;font-style:italic}.comma.svelte-rwxv37{margin-left:-0.5em;margin-right:0.5em}label.svelte-rwxv37{position:relative}";
  append(document.head, style);
}

function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  child_ctx[20] = i;
  return child_ctx;
} // (57:4) {#if expandable && isParentExpanded}


function create_if_block_3(ctx) {
  let jsonarrow;
  let current;
  jsonarrow = new JSONArrow({
    props: {
      expanded:
      /*expanded*/
      ctx[0]
    }
  });
  jsonarrow.$on("click",
  /*toggleExpand*/
  ctx[15]);
  return {
    c() {
      create_component(jsonarrow.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonarrow, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const jsonarrow_changes = {};
      if (dirty &
      /*expanded*/
      1) jsonarrow_changes.expanded =
      /*expanded*/
      ctx[0];
      jsonarrow.$set(jsonarrow_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonarrow.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonarrow.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonarrow, detaching);
    }

  };
} // (75:4) {:else}


function create_else_block(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "…";
    },

    m(target, anchor) {
      insert(target, span, anchor);
    },

    p: noop,
    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(span);
    }

  };
} // (63:4) {#if isParentExpanded}


function create_if_block$1(ctx) {
  let ul;
  let t;
  let current;
  let mounted;
  let dispose;
  let each_value =
  /*slicedKeys*/
  ctx[13];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  let if_block =
  /*slicedKeys*/
  ctx[13].length <
  /*previewKeys*/
  ctx[7].length && create_if_block_1();
  return {
    c() {
      ul = element("ul");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t = space();
      if (if_block) if_block.c();
      attr(ul, "class", "svelte-rwxv37");
      toggle_class(ul, "collapse", !
      /*expanded*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, ul, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }

      append(ul, t);
      if (if_block) if_block.m(ul, null);
      current = true;

      if (!mounted) {
        dispose = listen(ul, "click",
        /*expand*/
        ctx[16]);
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*expanded, previewKeys, getKey, slicedKeys, isArray, getValue, getPreviewValue*/
      10129) {
        each_value =
        /*slicedKeys*/
        ctx[13];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul, t);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        check_outros();
      }

      if (
      /*slicedKeys*/
      ctx[13].length <
      /*previewKeys*/
      ctx[7].length) {
        if (if_block) ;else {
          if_block = create_if_block_1();
          if_block.c();
          if_block.m(ul, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(ul, "collapse", !
        /*expanded*/
        ctx[0]);
      }
    },

    i(local) {
      if (current) return;

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      current = true;
    },

    o(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      current = false;
    },

    d(detaching) {
      if (detaching) detach(ul);
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }

  };
} // (67:10) {#if !expanded && index < previewKeys.length - 1}


function create_if_block_2(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = ",";
      attr(span, "class", "comma svelte-rwxv37");
    },

    m(target, anchor) {
      insert(target, span, anchor);
    },

    d(detaching) {
      if (detaching) detach(span);
    }

  };
} // (65:8) {#each slicedKeys as key, index}


function create_each_block$1(ctx) {
  let jsonnode;
  let t;
  let if_block_anchor;
  let current;
  jsonnode = new JSONNode({
    props: {
      key:
      /*getKey*/
      ctx[8](
      /*key*/
      ctx[12]),
      isParentExpanded:
      /*expanded*/
      ctx[0],
      isParentArray:
      /*isArray*/
      ctx[4],
      value:
      /*expanded*/
      ctx[0] ?
      /*getValue*/
      ctx[9](
      /*key*/
      ctx[12]) :
      /*getPreviewValue*/
      ctx[10](
      /*key*/
      ctx[12])
    }
  });
  let if_block = !
  /*expanded*/
  ctx[0] &&
  /*index*/
  ctx[20] <
  /*previewKeys*/
  ctx[7].length - 1 && create_if_block_2();
  return {
    c() {
      create_component(jsonnode.$$.fragment);
      t = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      mount_component(jsonnode, target, anchor);
      insert(target, t, anchor);
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const jsonnode_changes = {};
      if (dirty &
      /*getKey, slicedKeys*/
      8448) jsonnode_changes.key =
      /*getKey*/
      ctx[8](
      /*key*/
      ctx[12]);
      if (dirty &
      /*expanded*/
      1) jsonnode_changes.isParentExpanded =
      /*expanded*/
      ctx[0];
      if (dirty &
      /*isArray*/
      16) jsonnode_changes.isParentArray =
      /*isArray*/
      ctx[4];
      if (dirty &
      /*expanded, getValue, slicedKeys, getPreviewValue*/
      9729) jsonnode_changes.value =
      /*expanded*/
      ctx[0] ?
      /*getValue*/
      ctx[9](
      /*key*/
      ctx[12]) :
      /*getPreviewValue*/
      ctx[10](
      /*key*/
      ctx[12]);
      jsonnode.$set(jsonnode_changes);

      if (!
      /*expanded*/
      ctx[0] &&
      /*index*/
      ctx[20] <
      /*previewKeys*/
      ctx[7].length - 1) {
        if (if_block) ;else {
          if_block = create_if_block_2();
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },

    i(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnode.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnode, detaching);
      if (detaching) detach(t);
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
} // (71:8) {#if slicedKeys.length < previewKeys.length }


function create_if_block_1(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "…";
    },

    m(target, anchor) {
      insert(target, span, anchor);
    },

    d(detaching) {
      if (detaching) detach(span);
    }

  };
}

function create_fragment$3(ctx) {
  let li;
  let label_1;
  let t0;
  let jsonkey;
  let t1;
  let span1;
  let span0;
  let t2;
  let t3;
  let t4;
  let current_block_type_index;
  let if_block1;
  let t5;
  let span2;
  let t6;
  let current;
  let mounted;
  let dispose;
  let if_block0 =
  /*expandable*/
  ctx[11] &&
  /*isParentExpanded*/
  ctx[2] && create_if_block_3(ctx);
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[12],
      colon:
      /*context*/
      ctx[14].colon,
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3]
    }
  });
  jsonkey.$on("click",
  /*toggleExpand*/
  ctx[15]);
  const if_block_creators = [create_if_block$1, create_else_block];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*isParentExpanded*/
    ctx[2]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      li = element("li");
      label_1 = element("label");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span1 = element("span");
      span0 = element("span");
      t2 = text(
      /*label*/
      ctx[1]);
      t3 = text(
      /*bracketOpen*/
      ctx[5]);
      t4 = space();
      if_block1.c();
      t5 = space();
      span2 = element("span");
      t6 = text(
      /*bracketClose*/
      ctx[6]);
      attr(label_1, "class", "svelte-rwxv37");
      attr(li, "class", "svelte-rwxv37");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[2]);
    },

    m(target, anchor) {
      insert(target, li, anchor);
      append(li, label_1);
      if (if_block0) if_block0.m(label_1, null);
      append(label_1, t0);
      mount_component(jsonkey, label_1, null);
      append(label_1, t1);
      append(label_1, span1);
      append(span1, span0);
      append(span0, t2);
      append(span1, t3);
      append(li, t4);
      if_blocks[current_block_type_index].m(li, null);
      append(li, t5);
      append(li, span2);
      append(span2, t6);
      current = true;

      if (!mounted) {
        dispose = listen(span1, "click",
        /*toggleExpand*/
        ctx[15]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (
      /*expandable*/
      ctx[11] &&
      /*isParentExpanded*/
      ctx[2]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*expandable, isParentExpanded*/
          2052) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(label_1, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }

      const jsonkey_changes = {};
      if (dirty &
      /*key*/
      4096) jsonkey_changes.key =
      /*key*/
      ctx[12];
      if (dirty &
      /*isParentExpanded*/
      4) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      jsonkey.$set(jsonkey_changes);
      if (!current || dirty &
      /*label*/
      2) set_data(t2,
      /*label*/
      ctx[1]);
      if (!current || dirty &
      /*bracketOpen*/
      32) set_data(t3,
      /*bracketOpen*/
      ctx[5]);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];

        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        }

        transition_in(if_block1, 1);
        if_block1.m(li, t5);
      }

      if (!current || dirty &
      /*bracketClose*/
      64) set_data(t6,
      /*bracketClose*/
      ctx[6]);

      if (dirty &
      /*isParentExpanded*/
      4) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[2]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(jsonkey.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },

    o(local) {
      transition_out(if_block0);
      transition_out(jsonkey.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      if (if_block0) if_block0.d();
      destroy_component(jsonkey);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }

  };
}

function instance$3($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    keys
  } = $$props,
      {
    colon = ":"
  } = $$props,
      {
    label = ""
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray
  } = $$props,
      {
    isArray = false
  } = $$props,
      {
    bracketOpen
  } = $$props,
      {
    bracketClose
  } = $$props;
  let {
    previewKeys = keys
  } = $$props;
  let {
    getKey = key => key
  } = $$props;
  let {
    getValue = key => key
  } = $$props;
  let {
    getPreviewValue = getValue
  } = $$props;
  let {
    expanded = false
  } = $$props,
      {
    expandable = true
  } = $$props;
  const context = getContext(contextKey);
  setContext(contextKey, { ...context,
    colon
  });

  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }

  function expand() {
    $$invalidate(0, expanded = true);
  }

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(12, key = $$props.key);
    if ("keys" in $$props) $$invalidate(17, keys = $$props.keys);
    if ("colon" in $$props) $$invalidate(18, colon = $$props.colon);
    if ("label" in $$props) $$invalidate(1, label = $$props.label);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("isArray" in $$props) $$invalidate(4, isArray = $$props.isArray);
    if ("bracketOpen" in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
    if ("bracketClose" in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
    if ("previewKeys" in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
    if ("getKey" in $$props) $$invalidate(8, getKey = $$props.getKey);
    if ("getValue" in $$props) $$invalidate(9, getValue = $$props.getValue);
    if ("getPreviewValue" in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
    if ("expandable" in $$props) $$invalidate(11, expandable = $$props.expandable);
  };

  let slicedKeys;

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*isParentExpanded*/
    4) {
      $: if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }

    if ($$self.$$.dirty &
    /*expanded, keys, previewKeys*/
    131201) {
      $: $$invalidate(13, slicedKeys = expanded ? keys : previewKeys.slice(0, 5));
    }
  };

  return [expanded, label, isParentExpanded, isParentArray, isArray, bracketOpen, bracketClose, previewKeys, getKey, getValue, getPreviewValue, expandable, key, slicedKeys, context, toggleExpand, expand, keys, colon];
}

class JSONNested extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-rwxv37-style")) add_css$3();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      key: 12,
      keys: 17,
      colon: 18,
      label: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      isArray: 4,
      bracketOpen: 5,
      bracketClose: 6,
      previewKeys: 7,
      getKey: 8,
      getValue: 9,
      getPreviewValue: 10,
      expanded: 0,
      expandable: 11
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONObjectNode.svelte generated by Svelte v3.24.0 */


function create_fragment$4(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[5],
      previewKeys:
      /*keys*/
      ctx[5],
      getValue:
      /*getValue*/
      ctx[6],
      label: "" + (
      /*nodeType*/
      ctx[3] + " "),
      bracketOpen: "{",
      bracketClose: "}"
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.keys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.previewKeys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*nodeType*/
      8) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + " ");
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function instance$4($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    value
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray
  } = $$props,
      {
    nodeType
  } = $$props;
  let {
    expanded = true
  } = $$props;

  function getValue(key) {
    return value[key];
  }

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(7, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  let keys;

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    128) {
      $: $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, expanded, keys, getValue, value];
}

class JSONObjectNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      key: 0,
      value: 7,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3,
      expanded: 4
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONArrayNode.svelte generated by Svelte v3.24.0 */


function create_fragment$5(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3],
      isArray: true,
      keys:
      /*keys*/
      ctx[5],
      previewKeys:
      /*previewKeys*/
      ctx[6],
      getValue:
      /*getValue*/
      ctx[7],
      label: "Array(" +
      /*value*/
      ctx[1].length + ")",
      bracketOpen: "[",
      bracketClose: "]"
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.keys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*previewKeys*/
      64) jsonnested_changes.previewKeys =
      /*previewKeys*/
      ctx[6];
      if (dirty &
      /*value*/
      2) jsonnested_changes.label = "Array(" +
      /*value*/
      ctx[1].length + ")";
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function instance$5($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    value
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray
  } = $$props;
  let {
    expanded = JSON.stringify(value).length < 1024
  } = $$props;
  const filteredKey = new Set(["length"]);

  function getValue(key) {
    return value[key];
  }

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  let keys;
  let previewKeys;

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    2) {
      $: $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }

    if ($$self.$$.dirty &
    /*keys*/
    32) {
      $: $$invalidate(6, previewKeys = keys.filter(key => !filteredKey.has(key)));
    }
  };

  return [key, value, isParentExpanded, isParentArray, expanded, keys, previewKeys, getValue];
}

class JSONArrayNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONIterableArrayNode.svelte generated by Svelte v3.24.0 */


function create_fragment$6(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[4],
      getKey,
      getValue,
      isArray: true,
      label: "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")"),
      bracketOpen: "{",
      bracketClose: "}"
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      16) jsonnested_changes.keys =
      /*keys*/
      ctx[4];
      if (dirty &
      /*nodeType, keys*/
      24) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")");
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function getKey(key) {
  return String(key[0]);
}

function getValue(key) {
  return key[1];
}

function instance$6($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    value
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray
  } = $$props,
      {
    nodeType
  } = $$props;
  let keys = [];

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(5, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    32) {
      $: {
        let result = [];
        let i = 0;

        for (const entry of value) {
          result.push([i++, entry]);
        }

        $$invalidate(4, keys = result);
      }
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableArrayNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
  }

}

class MapEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONIterableMapNode.svelte generated by Svelte v3.24.0 */


function create_fragment$7(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[4],
      getKey: getKey$1,
      getValue: getValue$1,
      label: "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")"),
      colon: "",
      bracketOpen: "{",
      bracketClose: "}"
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      16) jsonnested_changes.keys =
      /*keys*/
      ctx[4];
      if (dirty &
      /*nodeType, keys*/
      24) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")");
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function getKey$1(entry) {
  return entry[0];
}

function getValue$1(entry) {
  return entry[1];
}

function instance$7($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    value
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray
  } = $$props,
      {
    nodeType
  } = $$props;
  let keys = [];

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(5, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    32) {
      $: {
        let result = [];
        let i = 0;

        for (const entry of value) {
          result.push([i++, new MapEntry(entry[0], entry[1])]);
        }

        $$invalidate(4, keys = result);
      }
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableMapNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONMapEntryNode.svelte generated by Svelte v3.24.0 */


function create_fragment$8(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3],
      key:
      /*isParentExpanded*/
      ctx[2] ? String(
      /*key*/
      ctx[0]) :
      /*value*/
      ctx[1].key,
      keys:
      /*keys*/
      ctx[5],
      getValue:
      /*getValue*/
      ctx[6],
      label:
      /*isParentExpanded*/
      ctx[2] ? "Entry " : "=> ",
      bracketOpen: "{",
      bracketClose: "}"
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*isParentExpanded, key, value*/
      7) jsonnested_changes.key =
      /*isParentExpanded*/
      ctx[2] ? String(
      /*key*/
      ctx[0]) :
      /*value*/
      ctx[1].key;
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.label =
      /*isParentExpanded*/
      ctx[2] ? "Entry " : "=> ";
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function instance$8($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    value
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray
  } = $$props;
  let {
    expanded = false
  } = $$props;
  const keys = ["key", "value"];

  function getValue(key) {
    return value[key];
  }

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  return [key, value, isParentExpanded, isParentArray, expanded, keys, getValue];
}

class JSONMapEntryNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONValueNode.svelte generated by Svelte v3.24.0 */


function add_css$4() {
  var style = element("style");
  style.id = "svelte-3bjyvl-style";
  style.textContent = "li.svelte-3bjyvl{user-select:text;word-wrap:break-word;word-break:break-all}.indent.svelte-3bjyvl{padding-left:var(--li-identation)}.String.svelte-3bjyvl{color:var(--string-color)}.Date.svelte-3bjyvl{color:var(--date-color)}.Number.svelte-3bjyvl{color:var(--number-color)}.Boolean.svelte-3bjyvl{color:var(--boolean-color)}.Null.svelte-3bjyvl{color:var(--null-color)}.Undefined.svelte-3bjyvl{color:var(--undefined-color)}.Function.svelte-3bjyvl{color:var(--function-color);font-style:italic}.Symbol.svelte-3bjyvl{color:var(--symbol-color)}";
  append(document.head, style);
}

function create_fragment$9(ctx) {
  let li;
  let jsonkey;
  let t0;
  let span;
  let t1_value = (
  /*valueGetter*/
  ctx[2] ?
  /*valueGetter*/
  ctx[2](
  /*value*/
  ctx[1]) :
  /*value*/
  ctx[1]) + "";
  let t1;
  let span_class_value;
  let current;
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[0],
      colon:
      /*colon*/
      ctx[6],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3],
      isParentArray:
      /*isParentArray*/
      ctx[4]
    }
  });
  return {
    c() {
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      attr(span, "class", span_class_value = "" + (null_to_empty(
      /*nodeType*/
      ctx[5]) + " svelte-3bjyvl"));
      attr(li, "class", "svelte-3bjyvl");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[3]);
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(jsonkey, li, null);
      append(li, t0);
      append(li, span);
      append(span, t1);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonkey_changes = {};
      if (dirty &
      /*key*/
      1) jsonkey_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      if (dirty &
      /*isParentArray*/
      16) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty &
      /*valueGetter, value*/
      6) && t1_value !== (t1_value = (
      /*valueGetter*/
      ctx[2] ?
      /*valueGetter*/
      ctx[2](
      /*value*/
      ctx[1]) :
      /*value*/
      ctx[1]) + "")) set_data(t1, t1_value);

      if (!current || dirty &
      /*nodeType*/
      32 && span_class_value !== (span_class_value = "" + (null_to_empty(
      /*nodeType*/
      ctx[5]) + " svelte-3bjyvl"))) {
        attr(span, "class", span_class_value);
      }

      if (dirty &
      /*isParentExpanded*/
      8) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[3]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(jsonkey.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonkey.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(jsonkey);
    }

  };
}

function instance$9($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    value
  } = $$props,
      {
    valueGetter = null
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray
  } = $$props,
      {
    nodeType
  } = $$props;
  const {
    colon
  } = getContext(contextKey);

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("valueGetter" in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
    if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("nodeType" in $$props) $$invalidate(5, nodeType = $$props.nodeType);
  };

  return [key, value, valueGetter, isParentExpanded, isParentArray, nodeType, colon];
}

class JSONValueNode extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-3bjyvl-style")) add_css$4();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, {
      key: 0,
      value: 1,
      valueGetter: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      nodeType: 5
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/ErrorNode.svelte generated by Svelte v3.24.0 */


function add_css$5() {
  var style = element("style");
  style.id = "svelte-1ca3gb2-style";
  style.textContent = "li.svelte-1ca3gb2{user-select:text;word-wrap:break-word;word-break:break-all}.indent.svelte-1ca3gb2{padding-left:var(--li-identation)}.collapse.svelte-1ca3gb2{--li-display:inline;display:inline;font-style:italic}";
  append(document.head, style);
}

function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
} // (40:2) {#if isParentExpanded}


function create_if_block_2$1(ctx) {
  let jsonarrow;
  let current;
  jsonarrow = new JSONArrow({
    props: {
      expanded:
      /*expanded*/
      ctx[0]
    }
  });
  jsonarrow.$on("click",
  /*toggleExpand*/
  ctx[7]);
  return {
    c() {
      create_component(jsonarrow.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonarrow, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const jsonarrow_changes = {};
      if (dirty &
      /*expanded*/
      1) jsonarrow_changes.expanded =
      /*expanded*/
      ctx[0];
      jsonarrow.$set(jsonarrow_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonarrow.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonarrow.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonarrow, detaching);
    }

  };
} // (45:2) {#if isParentExpanded}


function create_if_block$2(ctx) {
  let ul;
  let current;
  let if_block =
  /*expanded*/
  ctx[0] && create_if_block_1$1(ctx);
  return {
    c() {
      ul = element("ul");
      if (if_block) if_block.c();
      attr(ul, "class", "svelte-1ca3gb2");
      toggle_class(ul, "collapse", !
      /*expanded*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, ul, anchor);
      if (if_block) if_block.m(ul, null);
      current = true;
    },

    p(ctx, dirty) {
      if (
      /*expanded*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*expanded*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(ul, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(ul, "collapse", !
        /*expanded*/
        ctx[0]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(ul);
      if (if_block) if_block.d();
    }

  };
} // (47:6) {#if expanded}


function create_if_block_1$1(ctx) {
  let jsonnode;
  let t0;
  let li;
  let jsonkey;
  let t1;
  let span;
  let current;
  jsonnode = new JSONNode({
    props: {
      key: "message",
      value:
      /*value*/
      ctx[2].message
    }
  });
  jsonkey = new JSONKey({
    props: {
      key: "stack",
      colon: ":",
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3]
    }
  });
  let each_value =
  /*stack*/
  ctx[5];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }

  return {
    c() {
      create_component(jsonnode.$$.fragment);
      t0 = space();
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span = element("span");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(li, "class", "svelte-1ca3gb2");
    },

    m(target, anchor) {
      mount_component(jsonnode, target, anchor);
      insert(target, t0, anchor);
      insert(target, li, anchor);
      mount_component(jsonkey, li, null);
      append(li, t1);
      append(li, span);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(span, null);
      }

      current = true;
    },

    p(ctx, dirty) {
      const jsonnode_changes = {};
      if (dirty &
      /*value*/
      4) jsonnode_changes.value =
      /*value*/
      ctx[2].message;
      jsonnode.$set(jsonnode_changes);
      const jsonkey_changes = {};
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      jsonkey.$set(jsonkey_changes);

      if (dirty &
      /*stack*/
      32) {
        each_value =
        /*stack*/
        ctx[5];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(span, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },

    i(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      transition_in(jsonkey.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnode.$$.fragment, local);
      transition_out(jsonkey.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnode, detaching);
      if (detaching) detach(t0);
      if (detaching) detach(li);
      destroy_component(jsonkey);
      destroy_each(each_blocks, detaching);
    }

  };
} // (52:12) {#each stack as line, index}


function create_each_block$2(ctx) {
  let span;
  let t_value =
  /*line*/
  ctx[8] + "";
  let t;
  let br;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      br = element("br");
      attr(span, "class", "svelte-1ca3gb2");
      toggle_class(span, "indent",
      /*index*/
      ctx[10] > 0);
    },

    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
      insert(target, br, anchor);
    },

    p(ctx, dirty) {
      if (dirty &
      /*stack*/
      32 && t_value !== (t_value =
      /*line*/
      ctx[8] + "")) set_data(t, t_value);
    },

    d(detaching) {
      if (detaching) detach(span);
      if (detaching) detach(br);
    }

  };
}

function create_fragment$a(ctx) {
  let li;
  let t0;
  let jsonkey;
  let t1;
  let span;
  let t2;
  let t3_value = (
  /*expanded*/
  ctx[0] ? "" :
  /*value*/
  ctx[2].message) + "";
  let t3;
  let t4;
  let current;
  let mounted;
  let dispose;
  let if_block0 =
  /*isParentExpanded*/
  ctx[3] && create_if_block_2$1(ctx);
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[1],
      colon:
      /*context*/
      ctx[6].colon,
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3],
      isParentArray:
      /*isParentArray*/
      ctx[4]
    }
  });
  let if_block1 =
  /*isParentExpanded*/
  ctx[3] && create_if_block$2(ctx);
  return {
    c() {
      li = element("li");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span = element("span");
      t2 = text("Error: ");
      t3 = text(t3_value);
      t4 = space();
      if (if_block1) if_block1.c();
      attr(li, "class", "svelte-1ca3gb2");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[3]);
    },

    m(target, anchor) {
      insert(target, li, anchor);
      if (if_block0) if_block0.m(li, null);
      append(li, t0);
      mount_component(jsonkey, li, null);
      append(li, t1);
      append(li, span);
      append(span, t2);
      append(span, t3);
      append(li, t4);
      if (if_block1) if_block1.m(li, null);
      current = true;

      if (!mounted) {
        dispose = listen(span, "click",
        /*toggleExpand*/
        ctx[7]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (
      /*isParentExpanded*/
      ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*isParentExpanded*/
          8) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(li, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }

      const jsonkey_changes = {};
      if (dirty &
      /*key*/
      2) jsonkey_changes.key =
      /*key*/
      ctx[1];
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      if (dirty &
      /*isParentArray*/
      16) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty &
      /*expanded, value*/
      5) && t3_value !== (t3_value = (
      /*expanded*/
      ctx[0] ? "" :
      /*value*/
      ctx[2].message) + "")) set_data(t3, t3_value);

      if (
      /*isParentExpanded*/
      ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*isParentExpanded*/
          8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(li, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }

      if (dirty &
      /*isParentExpanded*/
      8) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[3]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(jsonkey.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },

    o(local) {
      transition_out(if_block0);
      transition_out(jsonkey.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      if (if_block0) if_block0.d();
      destroy_component(jsonkey);
      if (if_block1) if_block1.d();
      mounted = false;
      dispose();
    }

  };
}

function instance$a($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    value
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray
  } = $$props;
  let {
    expanded = false
  } = $$props;
  const context = getContext(contextKey);
  setContext(contextKey, { ...context,
    colon: ":"
  });

  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(1, key = $$props.key);
    if ("value" in $$props) $$invalidate(2, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ("expanded" in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  let stack;

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    4) {
      $: $$invalidate(5, stack = value.stack.split("\n"));
    }

    if ($$self.$$.dirty &
    /*isParentExpanded*/
    8) {
      $: if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }
  };

  return [expanded, key, value, isParentExpanded, isParentArray, stack, context, toggleExpand];
}

class ErrorNode extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1ca3gb2-style")) add_css$5();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, {
      key: 1,
      value: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      expanded: 0
    });
  }

}

function objType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);

  if (type === 'Object') {
    if (typeof obj[Symbol.iterator] === 'function') {
      return 'Iterable';
    }

    return obj.constructor.name;
  }

  return type;
}
/* node_modules/svelte-json-tree-auto/src/JSONNode.svelte generated by Svelte v3.24.0 */


function create_fragment$b(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value =
  /*componentType*/
  ctx[5];

  function switch_props(ctx) {
    return {
      props: {
        key:
        /*key*/
        ctx[0],
        value:
        /*value*/
        ctx[1],
        isParentExpanded:
        /*isParentExpanded*/
        ctx[2],
        isParentArray:
        /*isParentArray*/
        ctx[3],
        nodeType:
        /*nodeType*/
        ctx[4],
        valueGetter:
        /*valueGetter*/
        ctx[6]
      }
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  return {
    c() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },

    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert(target, switch_instance_anchor, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const switch_instance_changes = {};
      if (dirty &
      /*key*/
      1) switch_instance_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*value*/
      2) switch_instance_changes.value =
      /*value*/
      ctx[1];
      if (dirty &
      /*isParentExpanded*/
      4) switch_instance_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) switch_instance_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*nodeType*/
      16) switch_instance_changes.nodeType =
      /*nodeType*/
      ctx[4];
      if (dirty &
      /*valueGetter*/
      64) switch_instance_changes.valueGetter =
      /*valueGetter*/
      ctx[6];

      if (switch_value !== (switch_value =
      /*componentType*/
      ctx[5])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },

    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },

    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }

  };
}

function instance$b($$self, $$props, $$invalidate) {
  let {
    key
  } = $$props,
      {
    value
  } = $$props,
      {
    isParentExpanded
  } = $$props,
      {
    isParentArray
  } = $$props;

  function getComponent(nodeType) {
    switch (nodeType) {
      case "Object":
        return JSONObjectNode;

      case "Error":
        return ErrorNode;

      case "Array":
        return JSONArrayNode;

      case "Iterable":
      case "Map":
      case "Set":
        return typeof value.set === "function" ? JSONIterableMapNode : JSONIterableArrayNode;

      case "MapEntry":
        return JSONMapEntryNode;

      default:
        return JSONValueNode;
    }
  }

  function getValueGetter(nodeType) {
    switch (nodeType) {
      case "Object":
      case "Error":
      case "Array":
      case "Iterable":
      case "Map":
      case "Set":
      case "MapEntry":
      case "Number":
        return undefined;

      case "String":
        return raw => "\"".concat(raw, "\"");

      case "Boolean":
        return raw => raw ? "true" : "false";

      case "Date":
        return raw => raw.toISOString();

      case "Null":
        return () => "null";

      case "Undefined":
        return () => "undefined";

      case "Function":
      case "Symbol":
        return raw => raw.toString();

      default:
        return () => "<".concat(nodeType, ">");
    }
  }

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
    if ("isParentExpanded" in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ("isParentArray" in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
  };

  let nodeType;
  let componentType;
  let valueGetter;

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    2) {
      $: $$invalidate(4, nodeType = objType(value));
    }

    if ($$self.$$.dirty &
    /*nodeType*/
    16) {
      $: $$invalidate(5, componentType = getComponent(nodeType));
    }

    if ($$self.$$.dirty &
    /*nodeType*/
    16) {
      $: $$invalidate(6, valueGetter = getValueGetter(nodeType));
    }
  };

  return [key, value, isParentExpanded, isParentArray, nodeType, componentType, valueGetter];
}

class JSONNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$b, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/Root.svelte generated by Svelte v3.24.0 */


function add_css$6() {
  var style = element("style");
  style.id = "svelte-773n60-style";
  style.textContent = "ul.svelte-773n60{--string-color:var(--json-tree-string-color, #cb3f41);--symbol-color:var(--json-tree-symbol-color, #cb3f41);--boolean-color:var(--json-tree-boolean-color, #112aa7);--function-color:var(--json-tree-function-color, #112aa7);--number-color:var(--json-tree-number-color, #3029cf);--label-color:var(--json-tree-label-color, #871d8f);--arrow-color:var(--json-tree-arrow-color, #727272);--null-color:var(--json-tree-null-color, #8d8d8d);--undefined-color:var(--json-tree-undefined-color, #8d8d8d);--date-color:var(--json-tree-date-color, #8d8d8d);--li-identation:var(--json-tree-li-indentation, 1em);--li-line-height:var(--json-tree-li-line-height, 1.3);--li-colon-space:0.3em;font-size:var(--json-tree-font-size, 12px);font-family:var(--json-tree-font-family, 'Courier New', Courier, monospace)}ul.svelte-773n60 li{line-height:var(--li-line-height);display:var(--li-display, list-item);list-style:none}ul.svelte-773n60,ul.svelte-773n60 ul{padding:0;margin:0}";
  append(document.head, style);
}

function create_fragment$c(ctx) {
  let ul;
  let jsonnode;
  let current;
  jsonnode = new JSONNode({
    props: {
      key:
      /*key*/
      ctx[0],
      value:
      /*value*/
      ctx[1],
      isParentExpanded: true,
      isParentArray: false
    }
  });
  return {
    c() {
      ul = element("ul");
      create_component(jsonnode.$$.fragment);
      attr(ul, "class", "svelte-773n60");
    },

    m(target, anchor) {
      insert(target, ul, anchor);
      mount_component(jsonnode, ul, null);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnode_changes = {};
      if (dirty &
      /*key*/
      1) jsonnode_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*value*/
      2) jsonnode_changes.value =
      /*value*/
      ctx[1];
      jsonnode.$set(jsonnode_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnode.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(ul);
      destroy_component(jsonnode);
    }

  };
}

function instance$c($$self, $$props, $$invalidate) {
  setContext(contextKey, {});
  let {
    key = ""
  } = $$props,
      {
    value
  } = $$props;

  $$self.$set = $$props => {
    if ("key" in $$props) $$invalidate(0, key = $$props.key);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
  };

  return [key, value];
}

class Root extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-773n60-style")) add_css$6();
    init(this, options, instance$c, create_fragment$c, safe_not_equal, {
      key: 0,
      value: 1
    });
  }

}
/* src/client/debug/main/ClientSwitcher.svelte generated by Svelte v3.24.0 */


const {
  document: document_1
} = globals;

function add_css$7() {
  var style = element("style");
  style.id = "svelte-jvfq3i-style";
  style.textContent = ".svelte-jvfq3i{box-sizing:border-box}section.switcher.svelte-jvfq3i{position:sticky;bottom:0;transform:translateY(20px);margin:40px -20px 0;border-top:1px solid #999;padding:20px;background:#fff}label.svelte-jvfq3i{display:flex;align-items:baseline;gap:5px;font-weight:bold}select.svelte-jvfq3i{min-width:140px}";
  append(document_1.head, style);
}

function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  child_ctx[9] = i;
  return child_ctx;
} // (42:0) {#if debuggableClients.length > 1}


function create_if_block$3(ctx) {
  let section;
  let label;
  let t;
  let select;
  let mounted;
  let dispose;
  let each_value =
  /*debuggableClients*/
  ctx[1];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }

  return {
    c() {
      section = element("section");
      label = element("label");
      t = text("Client\n      \n      ");
      select = element("select");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(select, "id", selectId);
      attr(select, "class", "svelte-jvfq3i");
      if (
      /*selected*/
      ctx[2] === void 0) add_render_callback(() =>
      /*select_change_handler*/
      ctx[4].call(select));
      attr(label, "class", "svelte-jvfq3i");
      attr(section, "class", "switcher svelte-jvfq3i");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      append(section, label);
      append(label, t);
      append(label, select);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(select, null);
      }

      select_option(select,
      /*selected*/
      ctx[2]);

      if (!mounted) {
        dispose = [listen(select, "change",
        /*handleSelection*/
        ctx[3]), listen(select, "change",
        /*select_change_handler*/
        ctx[4])];
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*debuggableClients, JSON*/
      2) {
        each_value =
        /*debuggableClients*/
        ctx[1];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$3(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (dirty &
      /*selected*/
      4) {
        select_option(select,
        /*selected*/
        ctx[2]);
      }
    },

    d(detaching) {
      if (detaching) detach(section);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }

  };
} // (48:8) {#each debuggableClients as clientOption, index}


function create_each_block$3(ctx) {
  let option;
  let t0;
  let t1;
  let t2_value = JSON.stringify(
  /*clientOption*/
  ctx[7].playerID) + "";
  let t2;
  let t3;
  let t4_value = JSON.stringify(
  /*clientOption*/
  ctx[7].matchID) + "";
  let t4;
  let t5;
  let t6_value =
  /*clientOption*/
  ctx[7].game.name + "";
  let t6;
  let t7;
  let option_value_value;
  return {
    c() {
      option = element("option");
      t0 = text(
      /*index*/
      ctx[9]);
      t1 = text(" —\n            playerID: ");
      t2 = text(t2_value);
      t3 = text(",\n            matchID: ");
      t4 = text(t4_value);
      t5 = text("\n            (");
      t6 = text(t6_value);
      t7 = text(")\n          ");
      option.__value = option_value_value =
      /*index*/
      ctx[9];
      option.value = option.__value;
      attr(option, "class", "svelte-jvfq3i");
    },

    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t0);
      append(option, t1);
      append(option, t2);
      append(option, t3);
      append(option, t4);
      append(option, t5);
      append(option, t6);
      append(option, t7);
    },

    p(ctx, dirty) {
      if (dirty &
      /*debuggableClients*/
      2 && t2_value !== (t2_value = JSON.stringify(
      /*clientOption*/
      ctx[7].playerID) + "")) set_data(t2, t2_value);
      if (dirty &
      /*debuggableClients*/
      2 && t4_value !== (t4_value = JSON.stringify(
      /*clientOption*/
      ctx[7].matchID) + "")) set_data(t4, t4_value);
      if (dirty &
      /*debuggableClients*/
      2 && t6_value !== (t6_value =
      /*clientOption*/
      ctx[7].game.name + "")) set_data(t6, t6_value);
    },

    d(detaching) {
      if (detaching) detach(option);
    }

  };
}

function create_fragment$d(ctx) {
  let if_block_anchor;
  let if_block =
  /*debuggableClients*/
  ctx[1].length > 1 && create_if_block$3(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },

    p(ctx, [dirty]) {
      if (
      /*debuggableClients*/
      ctx[1].length > 1) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$3(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
}

const selectId = "bgio-debug-select-client";

function instance$d($$self, $$props, $$invalidate) {
  let $clientManager,
      $$unsubscribe_clientManager = noop,
      $$subscribe_clientManager = () => ($$unsubscribe_clientManager(), $$unsubscribe_clientManager = subscribe(clientManager, $$value => $$invalidate(6, $clientManager = $$value)), clientManager);

  $$self.$$.on_destroy.push(() => $$unsubscribe_clientManager());
  let {
    clientManager
  } = $$props;
  $$subscribe_clientManager();

  const handleSelection = e => {
    // Request to switch to the selected client.
    const selectedClient = debuggableClients[e.target.value];
    clientManager.switchToClient(selectedClient); // Maintain focus on the client select menu after switching clients.
    // Necessary because switching clients will usually trigger a mount/unmount.

    const select = document.getElementById(selectId);
    if (select) select.focus();
  };

  function select_change_handler() {
    selected = select_value(this);
    (($$invalidate(2, selected), $$invalidate(1, debuggableClients)), $$invalidate(5, client)), $$invalidate(6, $clientManager);
  }

  $$self.$set = $$props => {
    if ("clientManager" in $$props) $$subscribe_clientManager($$invalidate(0, clientManager = $$props.clientManager));
  };

  let client;
  let debuggableClients;
  let selected;

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*$clientManager*/
    64) {
      $: $$invalidate(5, ({
        client,
        debuggableClients
      } = $clientManager), client, ($$invalidate(1, debuggableClients), $$invalidate(6, $clientManager)));
    }

    if ($$self.$$.dirty &
    /*debuggableClients, client*/
    34) {
      $: $$invalidate(2, selected = debuggableClients.indexOf(client));
    }
  };

  return [clientManager, debuggableClients, selected, handleSelection, select_change_handler];
}

class ClientSwitcher extends SvelteComponent {
  constructor(options) {
    super();
    if (!document_1.getElementById("svelte-jvfq3i-style")) add_css$7();
    init(this, options, instance$d, create_fragment$d, safe_not_equal, {
      clientManager: 0
    });
  }

}
/* src/client/debug/main/Hotkey.svelte generated by Svelte v3.24.0 */


function add_css$8() {
  var style = element("style");
  style.id = "svelte-1vfj1mn-style";
  style.textContent = ".key.svelte-1vfj1mn.svelte-1vfj1mn{display:flex;flex-direction:row;align-items:center}button.svelte-1vfj1mn.svelte-1vfj1mn{cursor:pointer;min-width:10px;padding-left:5px;padding-right:5px;height:20px;line-height:20px;text-align:center;border:1px solid #ccc;box-shadow:1px 1px 1px #888;background:#eee;color:#444}button.svelte-1vfj1mn.svelte-1vfj1mn:hover{background:#ddd}.key.active.svelte-1vfj1mn button.svelte-1vfj1mn{background:#ddd;border:1px solid #999;box-shadow:none}label.svelte-1vfj1mn.svelte-1vfj1mn{margin-left:10px}";
  append(document.head, style);
} // (78:2) {#if label}


function create_if_block$4(ctx) {
  let label_1;
  let t0;
  let t1;
  let span;
  let t2_value = "(shortcut: ".concat(
  /*value*/
  ctx[0], ")") + "";
  let t2;
  return {
    c() {
      label_1 = element("label");
      t0 = text(
      /*label*/
      ctx[1]);
      t1 = space();
      span = element("span");
      t2 = text(t2_value);
      attr(span, "class", "screen-reader-only");
      attr(label_1, "for",
      /*id*/
      ctx[5]);
      attr(label_1, "class", "svelte-1vfj1mn");
    },

    m(target, anchor) {
      insert(target, label_1, anchor);
      append(label_1, t0);
      append(label_1, t1);
      append(label_1, span);
      append(span, t2);
    },

    p(ctx, dirty) {
      if (dirty &
      /*label*/
      2) set_data(t0,
      /*label*/
      ctx[1]);
      if (dirty &
      /*value*/
      1 && t2_value !== (t2_value = "(shortcut: ".concat(
      /*value*/
      ctx[0], ")") + "")) set_data(t2, t2_value);
    },

    d(detaching) {
      if (detaching) detach(label_1);
    }

  };
}

function create_fragment$e(ctx) {
  let div;
  let button;
  let t0;
  let t1;
  let mounted;
  let dispose;
  let if_block =
  /*label*/
  ctx[1] && create_if_block$4(ctx);
  return {
    c() {
      div = element("div");
      button = element("button");
      t0 = text(
      /*value*/
      ctx[0]);
      t1 = space();
      if (if_block) if_block.c();
      attr(button, "id",
      /*id*/
      ctx[5]);
      button.disabled =
      /*disable*/
      ctx[2];
      attr(button, "class", "svelte-1vfj1mn");
      attr(div, "class", "key svelte-1vfj1mn");
      toggle_class(div, "active",
      /*active*/
      ctx[3]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      append(button, t0);
      append(div, t1);
      if (if_block) if_block.m(div, null);

      if (!mounted) {
        dispose = [listen(window, "keydown",
        /*Keypress*/
        ctx[7]), listen(button, "click",
        /*Activate*/
        ctx[6])];
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*value*/
      1) set_data(t0,
      /*value*/
      ctx[0]);

      if (dirty &
      /*disable*/
      4) {
        button.disabled =
        /*disable*/
        ctx[2];
      }

      if (
      /*label*/
      ctx[1]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$4(ctx);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty &
      /*active*/
      8) {
        toggle_class(div, "active",
        /*active*/
        ctx[3]);
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }

  };
}

function instance$e($$self, $$props, $$invalidate) {
  let $disableHotkeys;
  let {
    value
  } = $$props;
  let {
    onPress = null
  } = $$props;
  let {
    label = null
  } = $$props;
  let {
    disable = false
  } = $$props;
  const {
    disableHotkeys
  } = getContext("hotkeys");
  component_subscribe($$self, disableHotkeys, value => $$invalidate(9, $disableHotkeys = value));
  let active = false;
  let id = "key-".concat(value);

  function Deactivate() {
    $$invalidate(3, active = false);
  }

  function Activate() {
    $$invalidate(3, active = true);
    setTimeout(Deactivate, 200);

    if (onPress) {
      setTimeout(onPress, 1);
    }
  }

  function Keypress(e) {
    if (!$disableHotkeys && !disable && !e.ctrlKey && !e.metaKey && e.key == value) {
      e.preventDefault();
      Activate();
    }
  }

  $$self.$set = $$props => {
    if ("value" in $$props) $$invalidate(0, value = $$props.value);
    if ("onPress" in $$props) $$invalidate(8, onPress = $$props.onPress);
    if ("label" in $$props) $$invalidate(1, label = $$props.label);
    if ("disable" in $$props) $$invalidate(2, disable = $$props.disable);
  };

  return [value, label, disable, active, disableHotkeys, id, Activate, Keypress, onPress];
}

class Hotkey extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1vfj1mn-style")) add_css$8();
    init(this, options, instance$e, create_fragment$e, safe_not_equal, {
      value: 0,
      onPress: 8,
      label: 1,
      disable: 2
    });
  }

}
/* src/client/debug/main/InteractiveFunction.svelte generated by Svelte v3.24.0 */


function add_css$9() {
  var style = element("style");
  style.id = "svelte-1mppqmp-style";
  style.textContent = ".move.svelte-1mppqmp{display:flex;flex-direction:row;cursor:pointer;margin-left:10px;color:#666}.move.svelte-1mppqmp:hover{color:#333}.move.active.svelte-1mppqmp{color:#111;font-weight:bold}.arg-field.svelte-1mppqmp{outline:none;font-family:monospace}";
  append(document.head, style);
}

function create_fragment$f(ctx) {
  let div;
  let span0;
  let t0;
  let t1;
  let span1;
  let t3;
  let span2;
  let t4;
  let span3;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      span0 = element("span");
      t0 = text(
      /*name*/
      ctx[2]);
      t1 = space();
      span1 = element("span");
      span1.textContent = "(";
      t3 = space();
      span2 = element("span");
      t4 = space();
      span3 = element("span");
      span3.textContent = ")";
      attr(span2, "class", "arg-field svelte-1mppqmp");
      attr(span2, "contenteditable", "");
      attr(div, "class", "move svelte-1mppqmp");
      toggle_class(div, "active",
      /*active*/
      ctx[3]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span0);
      append(span0, t0);
      append(div, t1);
      append(div, span1);
      append(div, t3);
      append(div, span2);
      /*span2_binding*/

      ctx[6](span2);
      append(div, t4);
      append(div, span3);

      if (!mounted) {
        dispose = [listen(span2, "focus", function () {
          if (is_function(
          /*Activate*/
          ctx[0]))
            /*Activate*/
            ctx[0].apply(this, arguments);
        }), listen(span2, "blur", function () {
          if (is_function(
          /*Deactivate*/
          ctx[1]))
            /*Deactivate*/
            ctx[1].apply(this, arguments);
        }), listen(span2, "keypress", stop_propagation(keypress_handler)), listen(span2, "keydown",
        /*OnKeyDown*/
        ctx[5]), listen(div, "click", function () {
          if (is_function(
          /*Activate*/
          ctx[0]))
            /*Activate*/
            ctx[0].apply(this, arguments);
        })];
        mounted = true;
      }
    },

    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (dirty &
      /*name*/
      4) set_data(t0,
      /*name*/
      ctx[2]);

      if (dirty &
      /*active*/
      8) {
        toggle_class(div, "active",
        /*active*/
        ctx[3]);
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
      /*span2_binding*/

      ctx[6](null);
      mounted = false;
      run_all(dispose);
    }

  };
}

const keypress_handler = () => {};

function instance$f($$self, $$props, $$invalidate) {
  let {
    Activate
  } = $$props;
  let {
    Deactivate
  } = $$props;
  let {
    name
  } = $$props;
  let {
    active
  } = $$props;
  let span;
  const dispatch = createEventDispatcher();

  function Submit() {
    try {
      const value = span.innerText;
      let argArray = new Function("return [".concat(value, "]"))();
      dispatch("submit", argArray);
    } catch (error) {
      dispatch("error", error);
    }

    $$invalidate(4, span.innerText = "", span);
  }

  function OnKeyDown(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      Submit();
    }

    if (e.key == "Escape") {
      e.preventDefault();
      Deactivate();
    }
  }

  afterUpdate(() => {
    if (active) {
      span.focus();
    } else {
      span.blur();
    }
  });

  function span2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      span = $$value;
      $$invalidate(4, span);
    });
  }

  $$self.$set = $$props => {
    if ("Activate" in $$props) $$invalidate(0, Activate = $$props.Activate);
    if ("Deactivate" in $$props) $$invalidate(1, Deactivate = $$props.Deactivate);
    if ("name" in $$props) $$invalidate(2, name = $$props.name);
    if ("active" in $$props) $$invalidate(3, active = $$props.active);
  };

  return [Activate, Deactivate, name, active, span, OnKeyDown, span2_binding];
}

class InteractiveFunction extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1mppqmp-style")) add_css$9();
    init(this, options, instance$f, create_fragment$f, safe_not_equal, {
      Activate: 0,
      Deactivate: 1,
      name: 2,
      active: 3
    });
  }

}
/* src/client/debug/main/Move.svelte generated by Svelte v3.24.0 */


function add_css$a() {
  var style = element("style");
  style.id = "svelte-smqssc-style";
  style.textContent = ".move-error.svelte-smqssc{color:#a00;font-weight:bold}.wrapper.svelte-smqssc{display:flex;flex-direction:row;align-items:center}";
  append(document.head, style);
} // (65:2) {#if error}


function create_if_block$5(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
      /*error*/
      ctx[2]);
      attr(span, "class", "move-error svelte-smqssc");
    },

    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },

    p(ctx, dirty) {
      if (dirty &
      /*error*/
      4) set_data(t,
      /*error*/
      ctx[2]);
    },

    d(detaching) {
      if (detaching) detach(span);
    }

  };
}

function create_fragment$g(ctx) {
  let div1;
  let div0;
  let hotkey;
  let t0;
  let interactivefunction;
  let t1;
  let current;
  hotkey = new Hotkey({
    props: {
      value:
      /*shortcut*/
      ctx[0],
      onPress:
      /*Activate*/
      ctx[4]
    }
  });
  interactivefunction = new InteractiveFunction({
    props: {
      Activate:
      /*Activate*/
      ctx[4],
      Deactivate:
      /*Deactivate*/
      ctx[5],
      name:
      /*name*/
      ctx[1],
      active:
      /*active*/
      ctx[3]
    }
  });
  interactivefunction.$on("submit",
  /*Submit*/
  ctx[6]);
  interactivefunction.$on("error",
  /*Error*/
  ctx[7]);
  let if_block =
  /*error*/
  ctx[2] && create_if_block$5(ctx);
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      create_component(hotkey.$$.fragment);
      t0 = space();
      create_component(interactivefunction.$$.fragment);
      t1 = space();
      if (if_block) if_block.c();
      attr(div0, "class", "wrapper svelte-smqssc");
    },

    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      mount_component(hotkey, div0, null);
      append(div0, t0);
      mount_component(interactivefunction, div0, null);
      append(div1, t1);
      if (if_block) if_block.m(div1, null);
      current = true;
    },

    p(ctx, [dirty]) {
      const hotkey_changes = {};
      if (dirty &
      /*shortcut*/
      1) hotkey_changes.value =
      /*shortcut*/
      ctx[0];
      hotkey.$set(hotkey_changes);
      const interactivefunction_changes = {};
      if (dirty &
      /*name*/
      2) interactivefunction_changes.name =
      /*name*/
      ctx[1];
      if (dirty &
      /*active*/
      8) interactivefunction_changes.active =
      /*active*/
      ctx[3];
      interactivefunction.$set(interactivefunction_changes);

      if (
      /*error*/
      ctx[2]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$5(ctx);
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },

    i(local) {
      if (current) return;
      transition_in(hotkey.$$.fragment, local);
      transition_in(interactivefunction.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(hotkey.$$.fragment, local);
      transition_out(interactivefunction.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div1);
      destroy_component(hotkey);
      destroy_component(interactivefunction);
      if (if_block) if_block.d();
    }

  };
}

function instance$g($$self, $$props, $$invalidate) {
  let {
    shortcut
  } = $$props;
  let {
    name
  } = $$props;
  let {
    fn
  } = $$props;
  const {
    disableHotkeys
  } = getContext("hotkeys");
  let error$1 = "";
  let active = false;

  function Activate() {
    disableHotkeys.set(true);
    $$invalidate(3, active = true);
  }

  function Deactivate() {
    disableHotkeys.set(false);
    $$invalidate(2, error$1 = "");
    $$invalidate(3, active = false);
  }

  function Submit(e) {
    $$invalidate(2, error$1 = "");
    Deactivate();
    fn.apply(this, e.detail);
  }

  function Error(e) {
    $$invalidate(2, error$1 = e.detail);
    (0, _turnOrder7578f7f.e)(e.detail);
  }

  $$self.$set = $$props => {
    if ("shortcut" in $$props) $$invalidate(0, shortcut = $$props.shortcut);
    if ("name" in $$props) $$invalidate(1, name = $$props.name);
    if ("fn" in $$props) $$invalidate(8, fn = $$props.fn);
  };

  return [shortcut, name, error$1, active, Activate, Deactivate, Submit, Error, fn];
}

class Move extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-smqssc-style")) add_css$a();
    init(this, options, instance$g, create_fragment$g, safe_not_equal, {
      shortcut: 0,
      name: 1,
      fn: 8
    });
  }

}
/* src/client/debug/main/Controls.svelte generated by Svelte v3.24.0 */


function add_css$b() {
  var style = element("style");
  style.id = "svelte-c3lavh-style";
  style.textContent = "ul.svelte-c3lavh{padding-left:0}li.svelte-c3lavh{list-style:none;margin:none;margin-bottom:5px}";
  append(document.head, style);
}

function create_fragment$h(ctx) {
  let ul;
  let li0;
  let hotkey0;
  let t0;
  let li1;
  let hotkey1;
  let t1;
  let li2;
  let hotkey2;
  let t2;
  let li3;
  let hotkey3;
  let current;
  hotkey0 = new Hotkey({
    props: {
      value: "1",
      onPress:
      /*client*/
      ctx[0].reset,
      label: "reset"
    }
  });
  hotkey1 = new Hotkey({
    props: {
      value: "2",
      onPress:
      /*Save*/
      ctx[1],
      label: "save"
    }
  });
  hotkey2 = new Hotkey({
    props: {
      value: "3",
      onPress:
      /*Restore*/
      ctx[2],
      label: "restore"
    }
  });
  hotkey3 = new Hotkey({
    props: {
      value: ".",
      disable: true,
      label: "hide"
    }
  });
  return {
    c() {
      ul = element("ul");
      li0 = element("li");
      create_component(hotkey0.$$.fragment);
      t0 = space();
      li1 = element("li");
      create_component(hotkey1.$$.fragment);
      t1 = space();
      li2 = element("li");
      create_component(hotkey2.$$.fragment);
      t2 = space();
      li3 = element("li");
      create_component(hotkey3.$$.fragment);
      attr(li0, "class", "svelte-c3lavh");
      attr(li1, "class", "svelte-c3lavh");
      attr(li2, "class", "svelte-c3lavh");
      attr(li3, "class", "svelte-c3lavh");
      attr(ul, "id", "debug-controls");
      attr(ul, "class", "controls svelte-c3lavh");
    },

    m(target, anchor) {
      insert(target, ul, anchor);
      append(ul, li0);
      mount_component(hotkey0, li0, null);
      append(ul, t0);
      append(ul, li1);
      mount_component(hotkey1, li1, null);
      append(ul, t1);
      append(ul, li2);
      mount_component(hotkey2, li2, null);
      append(ul, t2);
      append(ul, li3);
      mount_component(hotkey3, li3, null);
      current = true;
    },

    p(ctx, [dirty]) {
      const hotkey0_changes = {};
      if (dirty &
      /*client*/
      1) hotkey0_changes.onPress =
      /*client*/
      ctx[0].reset;
      hotkey0.$set(hotkey0_changes);
    },

    i(local) {
      if (current) return;
      transition_in(hotkey0.$$.fragment, local);
      transition_in(hotkey1.$$.fragment, local);
      transition_in(hotkey2.$$.fragment, local);
      transition_in(hotkey3.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(hotkey0.$$.fragment, local);
      transition_out(hotkey1.$$.fragment, local);
      transition_out(hotkey2.$$.fragment, local);
      transition_out(hotkey3.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(ul);
      destroy_component(hotkey0);
      destroy_component(hotkey1);
      destroy_component(hotkey2);
      destroy_component(hotkey3);
    }

  };
}

function instance$h($$self, $$props, $$invalidate) {
  let {
    client
  } = $$props;

  function Save() {
    // get state to persist and overwrite deltalog, _undo, and _redo
    const state = client.getState();
    const json = (0, _flatted.stringify)({ ...state,
      _undo: [],
      _redo: [],
      deltalog: []
    });
    window.localStorage.setItem("gamestate", json);
    window.localStorage.setItem("initialState", (0, _flatted.stringify)(client.initialState));
  }

  function Restore() {
    const gamestateJSON = window.localStorage.getItem("gamestate");
    const initialStateJSON = window.localStorage.getItem("initialState");

    if (gamestateJSON !== null && initialStateJSON !== null) {
      const gamestate = (0, _flatted.parse)(gamestateJSON);
      const initialState = (0, _flatted.parse)(initialStateJSON);
      client.store.dispatch((0, _turnOrder7578f7f.s)({
        state: gamestate,
        initialState
      }));
    }
  }

  $$self.$set = $$props => {
    if ("client" in $$props) $$invalidate(0, client = $$props.client);
  };

  return [client, Save, Restore];
}

class Controls extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-c3lavh-style")) add_css$b();
    init(this, options, instance$h, create_fragment$h, safe_not_equal, {
      client: 0
    });
  }

}
/* src/client/debug/main/PlayerInfo.svelte generated by Svelte v3.24.0 */


function add_css$c() {
  var style = element("style");
  style.id = "svelte-19aan9p-style";
  style.textContent = ".player-box.svelte-19aan9p{display:flex;flex-direction:row}.player.svelte-19aan9p{cursor:pointer;text-align:center;width:30px;height:30px;line-height:30px;background:#eee;border:3px solid #fefefe;box-sizing:content-box;padding:0}.player.current.svelte-19aan9p{background:#555;color:#eee;font-weight:bold}.player.active.svelte-19aan9p{border:3px solid #ff7f50}";
  append(document.head, style);
}

function get_each_context$4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
} // (59:2) {#each players as player}


function create_each_block$4(ctx) {
  let button;
  let t0_value =
  /*player*/
  ctx[7] + "";
  let t0;
  let t1;
  let button_aria_label_value;
  let mounted;
  let dispose;

  function click_handler(...args) {
    return (
      /*click_handler*/
      ctx[5](
      /*player*/
      ctx[7], ...args)
    );
  }

  return {
    c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "player svelte-19aan9p");
      attr(button, "aria-label", button_aria_label_value =
      /*playerLabel*/
      ctx[4](
      /*player*/
      ctx[7]));
      toggle_class(button, "current",
      /*player*/
      ctx[7] ==
      /*ctx*/
      ctx[0].currentPlayer);
      toggle_class(button, "active",
      /*player*/
      ctx[7] ==
      /*playerID*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t0);
      append(button, t1);

      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*players*/
      4 && t0_value !== (t0_value =
      /*player*/
      ctx[7] + "")) set_data(t0, t0_value);

      if (dirty &
      /*players*/
      4 && button_aria_label_value !== (button_aria_label_value =
      /*playerLabel*/
      ctx[4](
      /*player*/
      ctx[7]))) {
        attr(button, "aria-label", button_aria_label_value);
      }

      if (dirty &
      /*players, ctx*/
      5) {
        toggle_class(button, "current",
        /*player*/
        ctx[7] ==
        /*ctx*/
        ctx[0].currentPlayer);
      }

      if (dirty &
      /*players, playerID*/
      6) {
        toggle_class(button, "active",
        /*player*/
        ctx[7] ==
        /*playerID*/
        ctx[1]);
      }
    },

    d(detaching) {
      if (detaching) detach(button);
      mounted = false;
      dispose();
    }

  };
}

function create_fragment$i(ctx) {
  let div;
  let each_value =
  /*players*/
  ctx[2];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }

  return {
    c() {
      div = element("div");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(div, "class", "player-box svelte-19aan9p");
    },

    m(target, anchor) {
      insert(target, div, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*playerLabel, players, ctx, playerID, OnClick*/
      31) {
        each_value =
        /*players*/
        ctx[2];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$4(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$4(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
      destroy_each(each_blocks, detaching);
    }

  };
}

function instance$i($$self, $$props, $$invalidate) {
  let {
    ctx
  } = $$props;
  let {
    playerID
  } = $$props;
  const dispatch = createEventDispatcher();

  function OnClick(player) {
    if (player == playerID) {
      dispatch("change", {
        playerID: null
      });
    } else {
      dispatch("change", {
        playerID: player
      });
    }
  }

  function playerLabel(player) {
    const properties = [];
    if (player == ctx.currentPlayer) properties.push("current");
    if (player == playerID) properties.push("active");
    let label = "Player ".concat(player);
    if (properties.length) label += " (".concat(properties.join(", "), ")");
    return label;
  }

  let players;

  const click_handler = player => OnClick(player);

  $$self.$set = $$props => {
    if ("ctx" in $$props) $$invalidate(0, ctx = $$props.ctx);
    if ("playerID" in $$props) $$invalidate(1, playerID = $$props.playerID);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*ctx*/
    1) {
      $: $$invalidate(2, players = ctx ? [...Array(ctx.numPlayers).keys()].map(i => i.toString()) : []);
    }
  };

  return [ctx, playerID, players, OnClick, playerLabel, click_handler];
}

class PlayerInfo extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-19aan9p-style")) add_css$c();
    init(this, options, instance$i, create_fragment$i, safe_not_equal, {
      ctx: 0,
      playerID: 1
    });
  }

}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


function AssignShortcuts(moveNames, blacklist) {
  var shortcuts = {};
  var taken = {};

  for (var i = 0; i < blacklist.length; i++) {
    var c = blacklist[i];
    taken[c] = true;
  } // Try assigning the first char of each move as the shortcut.


  var t = taken;
  var canUseFirstChar = true;

  for (var name in moveNames) {
    var shortcut = name[0];

    if (t[shortcut]) {
      canUseFirstChar = false;
      break;
    }

    t[shortcut] = true;
    shortcuts[name] = shortcut;
  }

  if (canUseFirstChar) {
    return shortcuts;
  } // If those aren't unique, use a-z.


  t = taken;
  var next = 97;
  shortcuts = {};

  for (var _name in moveNames) {
    var _shortcut = String.fromCharCode(next);

    while (t[_shortcut]) {
      next++;
      _shortcut = String.fromCharCode(next);
    }

    t[_shortcut] = true;
    shortcuts[_name] = _shortcut;
  }

  return shortcuts;
}
/* src/client/debug/main/Main.svelte generated by Svelte v3.24.0 */


function add_css$d() {
  var style = element("style");
  style.id = "svelte-146sq5f-style";
  style.textContent = ".tree.svelte-146sq5f{--json-tree-font-family:monospace;--json-tree-font-size:14px;--json-tree-null-color:#757575}.label.svelte-146sq5f{margin-bottom:0;text-transform:none}h3.svelte-146sq5f{text-transform:uppercase}ul.svelte-146sq5f{padding-left:0}li.svelte-146sq5f{list-style:none;margin:0;margin-bottom:5px}";
  append(document.head, style);
}

function get_each_context$5(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i][0];
  child_ctx[10] = list[i][1];
  return child_ctx;
} // (77:4) {#each Object.entries(moves) as [name, fn]}


function create_each_block$5(ctx) {
  let li;
  let move;
  let t;
  let current;
  move = new Move({
    props: {
      shortcut:
      /*shortcuts*/
      ctx[7][
      /*name*/
      ctx[9]],
      fn:
      /*fn*/
      ctx[10],
      name:
      /*name*/
      ctx[9]
    }
  });
  return {
    c() {
      li = element("li");
      create_component(move.$$.fragment);
      t = space();
      attr(li, "class", "svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      append(li, t);
      current = true;
    },

    p(ctx, dirty) {
      const move_changes = {};
      if (dirty &
      /*moves*/
      8) move_changes.shortcut =
      /*shortcuts*/
      ctx[7][
      /*name*/
      ctx[9]];
      if (dirty &
      /*moves*/
      8) move_changes.fn =
      /*fn*/
      ctx[10];
      if (dirty &
      /*moves*/
      8) move_changes.name =
      /*name*/
      ctx[9];
      move.$set(move_changes);
    },

    i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }

  };
} // (89:2) {#if ctx.activePlayers && events.endStage}


function create_if_block_2$2(ctx) {
  let li;
  let move;
  let current;
  move = new Move({
    props: {
      name: "endStage",
      shortcut: 7,
      fn:
      /*events*/
      ctx[4].endStage
    }
  });
  return {
    c() {
      li = element("li");
      create_component(move.$$.fragment);
      attr(li, "class", "svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      current = true;
    },

    p(ctx, dirty) {
      const move_changes = {};
      if (dirty &
      /*events*/
      16) move_changes.fn =
      /*events*/
      ctx[4].endStage;
      move.$set(move_changes);
    },

    i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }

  };
} // (94:2) {#if events.endTurn}


function create_if_block_1$2(ctx) {
  let li;
  let move;
  let current;
  move = new Move({
    props: {
      name: "endTurn",
      shortcut: 8,
      fn:
      /*events*/
      ctx[4].endTurn
    }
  });
  return {
    c() {
      li = element("li");
      create_component(move.$$.fragment);
      attr(li, "class", "svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      current = true;
    },

    p(ctx, dirty) {
      const move_changes = {};
      if (dirty &
      /*events*/
      16) move_changes.fn =
      /*events*/
      ctx[4].endTurn;
      move.$set(move_changes);
    },

    i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }

  };
} // (99:2) {#if ctx.phase && events.endPhase}


function create_if_block$6(ctx) {
  let li;
  let move;
  let current;
  move = new Move({
    props: {
      name: "endPhase",
      shortcut: 9,
      fn:
      /*events*/
      ctx[4].endPhase
    }
  });
  return {
    c() {
      li = element("li");
      create_component(move.$$.fragment);
      attr(li, "class", "svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      current = true;
    },

    p(ctx, dirty) {
      const move_changes = {};
      if (dirty &
      /*events*/
      16) move_changes.fn =
      /*events*/
      ctx[4].endPhase;
      move.$set(move_changes);
    },

    i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }

  };
}

function create_fragment$j(ctx) {
  let section0;
  let h30;
  let t1;
  let controls;
  let t2;
  let section1;
  let h31;
  let t4;
  let playerinfo;
  let t5;
  let section2;
  let h32;
  let t7;
  let ul0;
  let t8;
  let section3;
  let h33;
  let t10;
  let ul1;
  let t11;
  let t12;
  let t13;
  let section4;
  let h34;
  let t15;
  let jsontree0;
  let t16;
  let section5;
  let h35;
  let t18;
  let jsontree1;
  let t19;
  let clientswitcher;
  let current;
  controls = new Controls({
    props: {
      client:
      /*client*/
      ctx[0]
    }
  });
  playerinfo = new PlayerInfo({
    props: {
      ctx:
      /*ctx*/
      ctx[5],
      playerID:
      /*playerID*/
      ctx[2]
    }
  });
  playerinfo.$on("change",
  /*change_handler*/
  ctx[8]);
  let each_value = Object.entries(
  /*moves*/
  ctx[3]);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
  }

  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  let if_block0 =
  /*ctx*/
  ctx[5].activePlayers &&
  /*events*/
  ctx[4].endStage && create_if_block_2$2(ctx);
  let if_block1 =
  /*events*/
  ctx[4].endTurn && create_if_block_1$2(ctx);
  let if_block2 =
  /*ctx*/
  ctx[5].phase &&
  /*events*/
  ctx[4].endPhase && create_if_block$6(ctx);
  jsontree0 = new Root({
    props: {
      value:
      /*G*/
      ctx[6]
    }
  });
  jsontree1 = new Root({
    props: {
      value: SanitizeCtx(
      /*ctx*/
      ctx[5])
    }
  });
  clientswitcher = new ClientSwitcher({
    props: {
      clientManager:
      /*clientManager*/
      ctx[1]
    }
  });
  return {
    c() {
      section0 = element("section");
      h30 = element("h3");
      h30.textContent = "Controls";
      t1 = space();
      create_component(controls.$$.fragment);
      t2 = space();
      section1 = element("section");
      h31 = element("h3");
      h31.textContent = "Players";
      t4 = space();
      create_component(playerinfo.$$.fragment);
      t5 = space();
      section2 = element("section");
      h32 = element("h3");
      h32.textContent = "Moves";
      t7 = space();
      ul0 = element("ul");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t8 = space();
      section3 = element("section");
      h33 = element("h3");
      h33.textContent = "Events";
      t10 = space();
      ul1 = element("ul");
      if (if_block0) if_block0.c();
      t11 = space();
      if (if_block1) if_block1.c();
      t12 = space();
      if (if_block2) if_block2.c();
      t13 = space();
      section4 = element("section");
      h34 = element("h3");
      h34.textContent = "G";
      t15 = space();
      create_component(jsontree0.$$.fragment);
      t16 = space();
      section5 = element("section");
      h35 = element("h3");
      h35.textContent = "ctx";
      t18 = space();
      create_component(jsontree1.$$.fragment);
      t19 = space();
      create_component(clientswitcher.$$.fragment);
      attr(h30, "class", "svelte-146sq5f");
      attr(h31, "class", "svelte-146sq5f");
      attr(h32, "class", "svelte-146sq5f");
      attr(ul0, "class", "svelte-146sq5f");
      attr(h33, "class", "svelte-146sq5f");
      attr(ul1, "class", "svelte-146sq5f");
      attr(h34, "class", "label svelte-146sq5f");
      attr(section4, "class", "tree svelte-146sq5f");
      attr(h35, "class", "label svelte-146sq5f");
      attr(section5, "class", "tree svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, section0, anchor);
      append(section0, h30);
      append(section0, t1);
      mount_component(controls, section0, null);
      insert(target, t2, anchor);
      insert(target, section1, anchor);
      append(section1, h31);
      append(section1, t4);
      mount_component(playerinfo, section1, null);
      insert(target, t5, anchor);
      insert(target, section2, anchor);
      append(section2, h32);
      append(section2, t7);
      append(section2, ul0);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul0, null);
      }

      insert(target, t8, anchor);
      insert(target, section3, anchor);
      append(section3, h33);
      append(section3, t10);
      append(section3, ul1);
      if (if_block0) if_block0.m(ul1, null);
      append(ul1, t11);
      if (if_block1) if_block1.m(ul1, null);
      append(ul1, t12);
      if (if_block2) if_block2.m(ul1, null);
      insert(target, t13, anchor);
      insert(target, section4, anchor);
      append(section4, h34);
      append(section4, t15);
      mount_component(jsontree0, section4, null);
      insert(target, t16, anchor);
      insert(target, section5, anchor);
      append(section5, h35);
      append(section5, t18);
      mount_component(jsontree1, section5, null);
      insert(target, t19, anchor);
      mount_component(clientswitcher, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const controls_changes = {};
      if (dirty &
      /*client*/
      1) controls_changes.client =
      /*client*/
      ctx[0];
      controls.$set(controls_changes);
      const playerinfo_changes = {};
      if (dirty &
      /*ctx*/
      32) playerinfo_changes.ctx =
      /*ctx*/
      ctx[5];
      if (dirty &
      /*playerID*/
      4) playerinfo_changes.playerID =
      /*playerID*/
      ctx[2];
      playerinfo.$set(playerinfo_changes);

      if (dirty &
      /*shortcuts, Object, moves*/
      136) {
        each_value = Object.entries(
        /*moves*/
        ctx[3]);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$5(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$5(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul0, null);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        check_outros();
      }

      if (
      /*ctx*/
      ctx[5].activePlayers &&
      /*events*/
      ctx[4].endStage) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*ctx, events*/
          48) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$2(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(ul1, t11);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }

      if (
      /*events*/
      ctx[4].endTurn) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*events*/
          16) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(ul1, t12);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }

      if (
      /*ctx*/
      ctx[5].phase &&
      /*events*/
      ctx[4].endPhase) {
        if (if_block2) {
          if_block2.p(ctx, dirty);

          if (dirty &
          /*ctx, events*/
          48) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$6(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(ul1, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }

      const jsontree0_changes = {};
      if (dirty &
      /*G*/
      64) jsontree0_changes.value =
      /*G*/
      ctx[6];
      jsontree0.$set(jsontree0_changes);
      const jsontree1_changes = {};
      if (dirty &
      /*ctx*/
      32) jsontree1_changes.value = SanitizeCtx(
      /*ctx*/
      ctx[5]);
      jsontree1.$set(jsontree1_changes);
      const clientswitcher_changes = {};
      if (dirty &
      /*clientManager*/
      2) clientswitcher_changes.clientManager =
      /*clientManager*/
      ctx[1];
      clientswitcher.$set(clientswitcher_changes);
    },

    i(local) {
      if (current) return;
      transition_in(controls.$$.fragment, local);
      transition_in(playerinfo.$$.fragment, local);

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      transition_in(jsontree0.$$.fragment, local);
      transition_in(jsontree1.$$.fragment, local);
      transition_in(clientswitcher.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(controls.$$.fragment, local);
      transition_out(playerinfo.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(jsontree0.$$.fragment, local);
      transition_out(jsontree1.$$.fragment, local);
      transition_out(clientswitcher.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section0);
      destroy_component(controls);
      if (detaching) detach(t2);
      if (detaching) detach(section1);
      destroy_component(playerinfo);
      if (detaching) detach(t5);
      if (detaching) detach(section2);
      destroy_each(each_blocks, detaching);
      if (detaching) detach(t8);
      if (detaching) detach(section3);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (detaching) detach(t13);
      if (detaching) detach(section4);
      destroy_component(jsontree0);
      if (detaching) detach(t16);
      if (detaching) detach(section5);
      destroy_component(jsontree1);
      if (detaching) detach(t19);
      destroy_component(clientswitcher, detaching);
    }

  };
}

function SanitizeCtx(ctx) {
  let r = {};

  for (const key in ctx) {
    if (!key.startsWith("_")) {
      r[key] = ctx[key];
    }
  }

  return r;
}

function instance$j($$self, $$props, $$invalidate) {
  let {
    client
  } = $$props;
  let {
    clientManager
  } = $$props;
  const shortcuts = AssignShortcuts(client.moves, "mlia");
  let {
    playerID,
    moves,
    events
  } = client;
  let ctx = {};
  let G = {};
  client.subscribe(state => {
    if (state) $$invalidate(6, ({
      G,
      ctx
    } = state), G, $$invalidate(5, ctx));
    $$invalidate(2, ({
      playerID,
      moves,
      events
    } = client), playerID, $$invalidate(3, moves), $$invalidate(4, events));
  });

  const change_handler = e => clientManager.switchPlayerID(e.detail.playerID);

  $$self.$set = $$props => {
    if ("client" in $$props) $$invalidate(0, client = $$props.client);
    if ("clientManager" in $$props) $$invalidate(1, clientManager = $$props.clientManager);
  };

  return [client, clientManager, playerID, moves, events, ctx, G, shortcuts, change_handler];
}

class Main extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-146sq5f-style")) add_css$d();
    init(this, options, instance$j, create_fragment$j, safe_not_equal, {
      client: 0,
      clientManager: 1
    });
  }

}
/* src/client/debug/info/Item.svelte generated by Svelte v3.24.0 */


function add_css$e() {
  var style = element("style");
  style.id = "svelte-13qih23-style";
  style.textContent = ".item.svelte-13qih23.svelte-13qih23{padding:10px}.item.svelte-13qih23.svelte-13qih23:not(:first-child){border-top:1px dashed #aaa}.item.svelte-13qih23 div.svelte-13qih23{float:right;text-align:right}";
  append(document.head, style);
}

function create_fragment$k(ctx) {
  let div1;
  let strong;
  let t0;
  let t1;
  let div0;
  let t2_value = JSON.stringify(
  /*value*/
  ctx[1]) + "";
  let t2;
  return {
    c() {
      div1 = element("div");
      strong = element("strong");
      t0 = text(
      /*name*/
      ctx[0]);
      t1 = space();
      div0 = element("div");
      t2 = text(t2_value);
      attr(div0, "class", "svelte-13qih23");
      attr(div1, "class", "item svelte-13qih23");
    },

    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, strong);
      append(strong, t0);
      append(div1, t1);
      append(div1, div0);
      append(div0, t2);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*name*/
      1) set_data(t0,
      /*name*/
      ctx[0]);
      if (dirty &
      /*value*/
      2 && t2_value !== (t2_value = JSON.stringify(
      /*value*/
      ctx[1]) + "")) set_data(t2, t2_value);
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div1);
    }

  };
}

function instance$k($$self, $$props, $$invalidate) {
  let {
    name
  } = $$props;
  let {
    value
  } = $$props;

  $$self.$set = $$props => {
    if ("name" in $$props) $$invalidate(0, name = $$props.name);
    if ("value" in $$props) $$invalidate(1, value = $$props.value);
  };

  return [name, value];
}

class Item extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-13qih23-style")) add_css$e();
    init(this, options, instance$k, create_fragment$k, safe_not_equal, {
      name: 0,
      value: 1
    });
  }

}
/* src/client/debug/info/Info.svelte generated by Svelte v3.24.0 */


function add_css$f() {
  var style = element("style");
  style.id = "svelte-1yzq5o8-style";
  style.textContent = ".gameinfo.svelte-1yzq5o8{padding:10px}";
  append(document.head, style);
} // (18:2) {#if client.multiplayer}


function create_if_block$7(ctx) {
  let item;
  let current;
  item = new Item({
    props: {
      name: "isConnected",
      value:
      /*$client*/
      ctx[1].isConnected
    }
  });
  return {
    c() {
      create_component(item.$$.fragment);
    },

    m(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const item_changes = {};
      if (dirty &
      /*$client*/
      2) item_changes.value =
      /*$client*/
      ctx[1].isConnected;
      item.$set(item_changes);
    },

    i(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(item, detaching);
    }

  };
}

function create_fragment$l(ctx) {
  let section;
  let item0;
  let t0;
  let item1;
  let t1;
  let item2;
  let t2;
  let current;
  item0 = new Item({
    props: {
      name: "matchID",
      value:
      /*client*/
      ctx[0].matchID
    }
  });
  item1 = new Item({
    props: {
      name: "playerID",
      value:
      /*client*/
      ctx[0].playerID
    }
  });
  item2 = new Item({
    props: {
      name: "isActive",
      value:
      /*$client*/
      ctx[1].isActive
    }
  });
  let if_block =
  /*client*/
  ctx[0].multiplayer && create_if_block$7(ctx);
  return {
    c() {
      section = element("section");
      create_component(item0.$$.fragment);
      t0 = space();
      create_component(item1.$$.fragment);
      t1 = space();
      create_component(item2.$$.fragment);
      t2 = space();
      if (if_block) if_block.c();
      attr(section, "class", "gameinfo svelte-1yzq5o8");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      mount_component(item0, section, null);
      append(section, t0);
      mount_component(item1, section, null);
      append(section, t1);
      mount_component(item2, section, null);
      append(section, t2);
      if (if_block) if_block.m(section, null);
      current = true;
    },

    p(ctx, [dirty]) {
      const item0_changes = {};
      if (dirty &
      /*client*/
      1) item0_changes.value =
      /*client*/
      ctx[0].matchID;
      item0.$set(item0_changes);
      const item1_changes = {};
      if (dirty &
      /*client*/
      1) item1_changes.value =
      /*client*/
      ctx[0].playerID;
      item1.$set(item1_changes);
      const item2_changes = {};
      if (dirty &
      /*$client*/
      2) item2_changes.value =
      /*$client*/
      ctx[1].isActive;
      item2.$set(item2_changes);

      if (
      /*client*/
      ctx[0].multiplayer) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*client*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$7(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(section, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;
      transition_in(item0.$$.fragment, local);
      transition_in(item1.$$.fragment, local);
      transition_in(item2.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(item0.$$.fragment, local);
      transition_out(item1.$$.fragment, local);
      transition_out(item2.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section);
      destroy_component(item0);
      destroy_component(item1);
      destroy_component(item2);
      if (if_block) if_block.d();
    }

  };
}

function instance$l($$self, $$props, $$invalidate) {
  let $client,
      $$unsubscribe_client = noop,
      $$subscribe_client = () => ($$unsubscribe_client(), $$unsubscribe_client = subscribe(client, $$value => $$invalidate(1, $client = $$value)), client);

  $$self.$$.on_destroy.push(() => $$unsubscribe_client());
  let {
    client
  } = $$props;
  $$subscribe_client();
  let {
    clientManager
  } = $$props;

  $$self.$set = $$props => {
    if ("client" in $$props) $$subscribe_client($$invalidate(0, client = $$props.client));
    if ("clientManager" in $$props) $$invalidate(2, clientManager = $$props.clientManager);
  };

  return [client, $client, clientManager];
}

class Info extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1yzq5o8-style")) add_css$f();
    init(this, options, instance$l, create_fragment$l, safe_not_equal, {
      client: 0,
      clientManager: 2
    });
  }

}
/* src/client/debug/log/TurnMarker.svelte generated by Svelte v3.24.0 */


function add_css$g() {
  var style = element("style");
  style.id = "svelte-6eza86-style";
  style.textContent = ".turn-marker.svelte-6eza86{display:flex;justify-content:center;align-items:center;grid-column:1;background:#555;color:#eee;text-align:center;font-weight:bold;border:1px solid #888}";
  append(document.head, style);
}

function create_fragment$m(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text(
      /*turn*/
      ctx[0]);
      attr(div, "class", "turn-marker svelte-6eza86");
      attr(div, "style",
      /*style*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*turn*/
      1) set_data(t,
      /*turn*/
      ctx[0]);
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
    }

  };
}

function instance$m($$self, $$props, $$invalidate) {
  let {
    turn
  } = $$props;
  let {
    numEvents
  } = $$props;
  const style = "grid-row: span ".concat(numEvents);

  $$self.$set = $$props => {
    if ("turn" in $$props) $$invalidate(0, turn = $$props.turn);
    if ("numEvents" in $$props) $$invalidate(2, numEvents = $$props.numEvents);
  };

  return [turn, style, numEvents];
}

class TurnMarker extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-6eza86-style")) add_css$g();
    init(this, options, instance$m, create_fragment$m, safe_not_equal, {
      turn: 0,
      numEvents: 2
    });
  }

}
/* src/client/debug/log/PhaseMarker.svelte generated by Svelte v3.24.0 */


function add_css$h() {
  var style = element("style");
  style.id = "svelte-1t4xap-style";
  style.textContent = ".phase-marker.svelte-1t4xap{grid-column:3;background:#555;border:1px solid #888;color:#eee;text-align:center;font-weight:bold;padding-top:10px;padding-bottom:10px;text-orientation:sideways;writing-mode:vertical-rl;line-height:30px;width:100%}";
  append(document.head, style);
}

function create_fragment$n(ctx) {
  let div;
  let t_value = (
  /*phase*/
  ctx[0] || "") + "";
  let t;
  return {
    c() {
      div = element("div");
      t = text(t_value);
      attr(div, "class", "phase-marker svelte-1t4xap");
      attr(div, "style",
      /*style*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*phase*/
      1 && t_value !== (t_value = (
      /*phase*/
      ctx[0] || "") + "")) set_data(t, t_value);
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
    }

  };
}

function instance$n($$self, $$props, $$invalidate) {
  let {
    phase
  } = $$props;
  let {
    numEvents
  } = $$props;
  const style = "grid-row: span ".concat(numEvents);

  $$self.$set = $$props => {
    if ("phase" in $$props) $$invalidate(0, phase = $$props.phase);
    if ("numEvents" in $$props) $$invalidate(2, numEvents = $$props.numEvents);
  };

  return [phase, style, numEvents];
}

class PhaseMarker extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1t4xap-style")) add_css$h();
    init(this, options, instance$n, create_fragment$n, safe_not_equal, {
      phase: 0,
      numEvents: 2
    });
  }

}
/* src/client/debug/log/CustomPayload.svelte generated by Svelte v3.24.0 */


function create_fragment$o(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "".concat(
      /*custompayload*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
    },

    p: noop,
    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
    }

  };
}

function instance$o($$self, $$props, $$invalidate) {
  let {
    payload
  } = $$props;
  const custompayload = payload !== undefined ? JSON.stringify(payload, null, 4) : "";

  $$self.$set = $$props => {
    if ("payload" in $$props) $$invalidate(1, payload = $$props.payload);
  };

  return [custompayload, payload];
}

class CustomPayload extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$o, create_fragment$o, safe_not_equal, {
      payload: 1
    });
  }

}
/* src/client/debug/log/LogEvent.svelte generated by Svelte v3.24.0 */


function add_css$i() {
  var style = element("style");
  style.id = "svelte-11hs70q-style";
  style.textContent = ".log-event.svelte-11hs70q{grid-column:2;cursor:pointer;overflow:hidden;display:flex;flex-direction:column;justify-content:center;background:#fff;border:1px dotted #ccc;border-left:5px solid #ccc;padding:5px;text-align:center;color:#666;font-size:14px;min-height:25px;line-height:25px}.log-event.svelte-11hs70q:hover,.log-event.svelte-11hs70q:focus{border-style:solid;background:#eee}.log-event.pinned.svelte-11hs70q{border-style:solid;background:#eee;opacity:1}.player0.svelte-11hs70q{border-left-color:#ff851b}.player1.svelte-11hs70q{border-left-color:#7fdbff}.player2.svelte-11hs70q{border-left-color:#0074d9}.player3.svelte-11hs70q{border-left-color:#39cccc}.player4.svelte-11hs70q{border-left-color:#3d9970}.player5.svelte-11hs70q{border-left-color:#2ecc40}.player6.svelte-11hs70q{border-left-color:#01ff70}.player7.svelte-11hs70q{border-left-color:#ffdc00}.player8.svelte-11hs70q{border-left-color:#001f3f}.player9.svelte-11hs70q{border-left-color:#ff4136}.player10.svelte-11hs70q{border-left-color:#85144b}.player11.svelte-11hs70q{border-left-color:#f012be}.player12.svelte-11hs70q{border-left-color:#b10dc9}.player13.svelte-11hs70q{border-left-color:#111111}.player14.svelte-11hs70q{border-left-color:#aaaaaa}.player15.svelte-11hs70q{border-left-color:#dddddd}";
  append(document.head, style);
} // (139:2) {:else}


function create_else_block$1(ctx) {
  let custompayload;
  let current;
  custompayload = new CustomPayload({
    props: {
      payload:
      /*payload*/
      ctx[2]
    }
  });
  return {
    c() {
      create_component(custompayload.$$.fragment);
    },

    m(target, anchor) {
      mount_component(custompayload, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const custompayload_changes = {};
      if (dirty &
      /*payload*/
      4) custompayload_changes.payload =
      /*payload*/
      ctx[2];
      custompayload.$set(custompayload_changes);
    },

    i(local) {
      if (current) return;
      transition_in(custompayload.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(custompayload.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(custompayload, detaching);
    }

  };
} // (137:2) {#if payloadComponent}


function create_if_block$8(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value =
  /*payloadComponent*/
  ctx[3];

  function switch_props(ctx) {
    return {
      props: {
        payload:
        /*payload*/
        ctx[2]
      }
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  return {
    c() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },

    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert(target, switch_instance_anchor, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const switch_instance_changes = {};
      if (dirty &
      /*payload*/
      4) switch_instance_changes.payload =
      /*payload*/
      ctx[2];

      if (switch_value !== (switch_value =
      /*payloadComponent*/
      ctx[3])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },

    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },

    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }

  };
}

function create_fragment$p(ctx) {
  let button;
  let div;
  let t0;
  let t1;
  let t2_value =
  /*args*/
  ctx[6].join(",") + "";
  let t2;
  let t3;
  let t4;
  let current_block_type_index;
  let if_block;
  let button_class_value;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$8, create_else_block$1];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*payloadComponent*/
    ctx[3]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      button = element("button");
      div = element("div");
      t0 = text(
      /*actionType*/
      ctx[4]);
      t1 = text("(");
      t2 = text(t2_value);
      t3 = text(")");
      t4 = space();
      if_block.c();
      attr(button, "class", button_class_value = "log-event player" +
      /*playerID*/
      ctx[7] + " svelte-11hs70q");
      toggle_class(button, "pinned",
      /*pinned*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, button, anchor);
      append(button, div);
      append(div, t0);
      append(div, t1);
      append(div, t2);
      append(div, t3);
      append(button, t4);
      if_blocks[current_block_type_index].m(button, null);
      current = true;

      if (!mounted) {
        dispose = [listen(button, "click",
        /*click_handler*/
        ctx[9]), listen(button, "mouseenter",
        /*mouseenter_handler*/
        ctx[10]), listen(button, "focus",
        /*focus_handler*/
        ctx[11]), listen(button, "mouseleave",
        /*mouseleave_handler*/
        ctx[12]), listen(button, "blur",
        /*blur_handler*/
        ctx[13])];
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (!current || dirty &
      /*actionType*/
      16) set_data(t0,
      /*actionType*/
      ctx[4]);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(button, null);
      }

      if (dirty &
      /*pinned*/
      2) {
        toggle_class(button, "pinned",
        /*pinned*/
        ctx[1]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(button);
      if_blocks[current_block_type_index].d();
      mounted = false;
      run_all(dispose);
    }

  };
}

function instance$p($$self, $$props, $$invalidate) {
  let {
    logIndex
  } = $$props;
  let {
    action
  } = $$props;
  let {
    pinned
  } = $$props;
  let {
    payload
  } = $$props;
  let {
    payloadComponent
  } = $$props;
  const dispatch = createEventDispatcher();
  const args = action.payload.args || [];
  const playerID = action.payload.playerID;
  let actionType;

  switch (action.type) {
    case "UNDO":
      actionType = "undo";
      break;

    case "REDO":
      actionType = "redo";

    case "GAME_EVENT":
    case "MAKE_MOVE":
    default:
      actionType = action.payload.type;
      break;
  }

  const click_handler = () => dispatch("click", {
    logIndex
  });

  const mouseenter_handler = () => dispatch("mouseenter", {
    logIndex
  });

  const focus_handler = () => dispatch("mouseenter", {
    logIndex
  });

  const mouseleave_handler = () => dispatch("mouseleave");

  const blur_handler = () => dispatch("mouseleave");

  $$self.$set = $$props => {
    if ("logIndex" in $$props) $$invalidate(0, logIndex = $$props.logIndex);
    if ("action" in $$props) $$invalidate(8, action = $$props.action);
    if ("pinned" in $$props) $$invalidate(1, pinned = $$props.pinned);
    if ("payload" in $$props) $$invalidate(2, payload = $$props.payload);
    if ("payloadComponent" in $$props) $$invalidate(3, payloadComponent = $$props.payloadComponent);
  };

  return [logIndex, pinned, payload, payloadComponent, actionType, dispatch, args, playerID, action, click_handler, mouseenter_handler, focus_handler, mouseleave_handler, blur_handler];
}

class LogEvent extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-11hs70q-style")) add_css$i();
    init(this, options, instance$p, create_fragment$p, safe_not_equal, {
      logIndex: 0,
      action: 8,
      pinned: 1,
      payload: 2,
      payloadComponent: 3
    });
  }

}
/* node_modules/svelte-icons/components/IconBase.svelte generated by Svelte v3.24.0 */


function add_css$j() {
  var style = element("style");
  style.id = "svelte-c8tyih-style";
  style.textContent = "svg.svelte-c8tyih{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}";
  append(document.head, style);
} // (18:2) {#if title}


function create_if_block$9(ctx) {
  let title_1;
  let t;
  return {
    c() {
      title_1 = svg_element("title");
      t = text(
      /*title*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, title_1, anchor);
      append(title_1, t);
    },

    p(ctx, dirty) {
      if (dirty &
      /*title*/
      1) set_data(t,
      /*title*/
      ctx[0]);
    },

    d(detaching) {
      if (detaching) detach(title_1);
    }

  };
}

function create_fragment$q(ctx) {
  let svg;
  let if_block_anchor;
  let current;
  let if_block =
  /*title*/
  ctx[0] && create_if_block$9(ctx);
  const default_slot_template =
  /*$$slots*/
  ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[2], null);
  return {
    c() {
      svg = svg_element("svg");
      if (if_block) if_block.c();
      if_block_anchor = empty();
      if (default_slot) default_slot.c();
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox",
      /*viewBox*/
      ctx[1]);
      attr(svg, "class", "svelte-c8tyih");
    },

    m(target, anchor) {
      insert(target, svg, anchor);
      if (if_block) if_block.m(svg, null);
      append(svg, if_block_anchor);

      if (default_slot) {
        default_slot.m(svg, null);
      }

      current = true;
    },

    p(ctx, [dirty]) {
      if (
      /*title*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$9(ctx);
          if_block.c();
          if_block.m(svg, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4) {
          update_slot(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[2], dirty, null, null);
        }
      }

      if (!current || dirty &
      /*viewBox*/
      2) {
        attr(svg, "viewBox",
        /*viewBox*/
        ctx[1]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },

    o(local) {
      transition_out(default_slot, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(svg);
      if (if_block) if_block.d();
      if (default_slot) default_slot.d(detaching);
    }

  };
}

function instance$q($$self, $$props, $$invalidate) {
  let {
    title = null
  } = $$props;
  let {
    viewBox
  } = $$props;
  let {
    $$slots = {},
    $$scope
  } = $$props;

  $$self.$set = $$props => {
    if ("title" in $$props) $$invalidate(0, title = $$props.title);
    if ("viewBox" in $$props) $$invalidate(1, viewBox = $$props.viewBox);
    if ("$$scope" in $$props) $$invalidate(2, $$scope = $$props.$$scope);
  };

  return [title, viewBox, $$scope, $$slots];
}

class IconBase extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-c8tyih-style")) add_css$j();
    init(this, options, instance$q, create_fragment$q, safe_not_equal, {
      title: 0,
      viewBox: 1
    });
  }

}
/* node_modules/svelte-icons/fa/FaArrowAltCircleDown.svelte generated by Svelte v3.24.0 */


function create_default_slot(ctx) {
  let path;
  return {
    c() {
      path = svg_element("path");
      attr(path, "d", "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z");
    },

    m(target, anchor) {
      insert(target, path, anchor);
    },

    d(detaching) {
      if (detaching) detach(path);
    }

  };
}

function create_fragment$r(ctx) {
  let iconbase;
  let current;
  const iconbase_spread_levels = [{
    viewBox: "0 0 512 512"
  },
  /*$$props*/
  ctx[0]];
  let iconbase_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx
    }
  };

  for (let i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }

  iconbase = new IconBase({
    props: iconbase_props
  });
  return {
    c() {
      create_component(iconbase.$$.fragment);
    },

    m(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const iconbase_changes = dirty &
      /*$$props*/
      1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(
      /*$$props*/
      ctx[0])]) : {};

      if (dirty &
      /*$$scope*/
      2) {
        iconbase_changes.$$scope = {
          dirty,
          ctx
        };
      }

      iconbase.$set(iconbase_changes);
    },

    i(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(iconbase, detaching);
    }

  };
}

function instance$r($$self, $$props, $$invalidate) {
  $$self.$set = $$new_props => {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };

  $$props = exclude_internal_props($$props);
  return [$$props];
}

class FaArrowAltCircleDown extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$r, create_fragment$r, safe_not_equal, {});
  }

}
/* src/client/debug/mcts/Action.svelte generated by Svelte v3.24.0 */


function add_css$k() {
  var style = element("style");
  style.id = "svelte-1a7time-style";
  style.textContent = "div.svelte-1a7time{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:500px}";
  append(document.head, style);
}

function create_fragment$s(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text(
      /*text*/
      ctx[0]);
      attr(div, "alt",
      /*text*/
      ctx[0]);
      attr(div, "class", "svelte-1a7time");
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*text*/
      1) set_data(t,
      /*text*/
      ctx[0]);

      if (dirty &
      /*text*/
      1) {
        attr(div, "alt",
        /*text*/
        ctx[0]);
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
    }

  };
}

function instance$s($$self, $$props, $$invalidate) {
  let {
    action
  } = $$props;
  let text;

  $$self.$set = $$props => {
    if ("action" in $$props) $$invalidate(1, action = $$props.action);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*action*/
    2) {
      $: {
        const {
          type,
          args
        } = action.payload;
        const argsFormatted = (args || []).join(",");
        $$invalidate(0, text = "".concat(type, "(").concat(argsFormatted, ")"));
      }
    }
  };

  return [text, action];
}

class Action extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1a7time-style")) add_css$k();
    init(this, options, instance$s, create_fragment$s, safe_not_equal, {
      action: 1
    });
  }

}
/* src/client/debug/mcts/Table.svelte generated by Svelte v3.24.0 */


function add_css$l() {
  var style = element("style");
  style.id = "svelte-ztcwsu-style";
  style.textContent = "table.svelte-ztcwsu.svelte-ztcwsu{font-size:12px;border-collapse:collapse;border:1px solid #ddd;padding:0}tr.svelte-ztcwsu.svelte-ztcwsu{cursor:pointer}tr.svelte-ztcwsu:hover td.svelte-ztcwsu{background:#eee}tr.selected.svelte-ztcwsu td.svelte-ztcwsu{background:#eee}td.svelte-ztcwsu.svelte-ztcwsu{padding:10px;height:10px;line-height:10px;font-size:12px;border:none}th.svelte-ztcwsu.svelte-ztcwsu{background:#888;color:#fff;padding:10px;text-align:center}";
  append(document.head, style);
}

function get_each_context$6(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[12] = i;
  return child_ctx;
} // (86:2) {#each children as child, i}


function create_each_block$6(ctx) {
  let tr;
  let td0;
  let t0_value =
  /*child*/
  ctx[10].value + "";
  let t0;
  let t1;
  let td1;
  let t2_value =
  /*child*/
  ctx[10].visits + "";
  let t2;
  let t3;
  let td2;
  let action;
  let t4;
  let current;
  let mounted;
  let dispose;
  action = new Action({
    props: {
      action:
      /*child*/
      ctx[10].parentAction
    }
  });

  function click_handler(...args) {
    return (
      /*click_handler*/
      ctx[5](
      /*child*/
      ctx[10],
      /*i*/
      ctx[12], ...args)
    );
  }

  function mouseout_handler(...args) {
    return (
      /*mouseout_handler*/
      ctx[6](
      /*i*/
      ctx[12], ...args)
    );
  }

  function mouseover_handler(...args) {
    return (
      /*mouseover_handler*/
      ctx[7](
      /*child*/
      ctx[10],
      /*i*/
      ctx[12], ...args)
    );
  }

  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      t2 = text(t2_value);
      t3 = space();
      td2 = element("td");
      create_component(action.$$.fragment);
      t4 = space();
      attr(td0, "class", "svelte-ztcwsu");
      attr(td1, "class", "svelte-ztcwsu");
      attr(td2, "class", "svelte-ztcwsu");
      attr(tr, "class", "svelte-ztcwsu");
      toggle_class(tr, "clickable",
      /*children*/
      ctx[1].length > 0);
      toggle_class(tr, "selected",
      /*i*/
      ctx[12] ===
      /*selectedIndex*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      append(td1, t2);
      append(tr, t3);
      append(tr, td2);
      mount_component(action, td2, null);
      append(tr, t4);
      current = true;

      if (!mounted) {
        dispose = [listen(tr, "click", click_handler), listen(tr, "mouseout", mouseout_handler), listen(tr, "mouseover", mouseover_handler)];
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty &
      /*children*/
      2) && t0_value !== (t0_value =
      /*child*/
      ctx[10].value + "")) set_data(t0, t0_value);
      if ((!current || dirty &
      /*children*/
      2) && t2_value !== (t2_value =
      /*child*/
      ctx[10].visits + "")) set_data(t2, t2_value);
      const action_changes = {};
      if (dirty &
      /*children*/
      2) action_changes.action =
      /*child*/
      ctx[10].parentAction;
      action.$set(action_changes);

      if (dirty &
      /*children*/
      2) {
        toggle_class(tr, "clickable",
        /*children*/
        ctx[1].length > 0);
      }

      if (dirty &
      /*selectedIndex*/
      1) {
        toggle_class(tr, "selected",
        /*i*/
        ctx[12] ===
        /*selectedIndex*/
        ctx[0]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(action.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(action.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(tr);
      destroy_component(action);
      mounted = false;
      run_all(dispose);
    }

  };
}

function create_fragment$t(ctx) {
  let table;
  let thead;
  let t5;
  let tbody;
  let current;
  let each_value =
  /*children*/
  ctx[1];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
  }

  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  return {
    c() {
      table = element("table");
      thead = element("thead");
      thead.innerHTML = "<th class=\"svelte-ztcwsu\">Value</th> \n    <th class=\"svelte-ztcwsu\">Visits</th> \n    <th class=\"svelte-ztcwsu\">Action</th>";
      t5 = space();
      tbody = element("tbody");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(table, "class", "svelte-ztcwsu");
    },

    m(target, anchor) {
      insert(target, table, anchor);
      append(table, thead);
      append(table, t5);
      append(table, tbody);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(tbody, null);
      }

      current = true;
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*children, selectedIndex, Select, Preview*/
      15) {
        each_value =
        /*children*/
        ctx[1];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$6(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$6(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(tbody, null);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        check_outros();
      }
    },

    i(local) {
      if (current) return;

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      current = true;
    },

    o(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      current = false;
    },

    d(detaching) {
      if (detaching) detach(table);
      destroy_each(each_blocks, detaching);
    }

  };
}

function instance$t($$self, $$props, $$invalidate) {
  let {
    root
  } = $$props;
  let {
    selectedIndex = null
  } = $$props;
  const dispatch = createEventDispatcher();
  let parents = [];
  let children = [];

  function Select(node, i) {
    dispatch("select", {
      node,
      selectedIndex: i
    });
  }

  function Preview(node, i) {
    if (selectedIndex === null) {
      dispatch("preview", {
        node
      });
    }
  }

  const click_handler = (child, i) => Select(child, i);

  const mouseout_handler = i => Preview(null);

  const mouseover_handler = (child, i) => Preview(child);

  $$self.$set = $$props => {
    if ("root" in $$props) $$invalidate(4, root = $$props.root);
    if ("selectedIndex" in $$props) $$invalidate(0, selectedIndex = $$props.selectedIndex);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*root, parents*/
    272) {
      $: {
        let t = root;
        $$invalidate(8, parents = []);

        while (t.parent) {
          const parent = t.parent;
          const {
            type,
            args
          } = t.parentAction.payload;
          const argsFormatted = (args || []).join(",");
          const arrowText = "".concat(type, "(").concat(argsFormatted, ")");
          parents.push({
            parent,
            arrowText
          });
          t = parent;
        }

        parents.reverse();
        $$invalidate(1, children = [...root.children].sort((a, b) => a.visits < b.visits ? 1 : -1).slice(0, 50));
      }
    }
  };

  return [selectedIndex, children, Select, Preview, root, click_handler, mouseout_handler, mouseover_handler];
}

class Table extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-ztcwsu-style")) add_css$l();
    init(this, options, instance$t, create_fragment$t, safe_not_equal, {
      root: 4,
      selectedIndex: 0
    });
  }

}
/* src/client/debug/mcts/MCTS.svelte generated by Svelte v3.24.0 */


function add_css$m() {
  var style = element("style");
  style.id = "svelte-1f0amz4-style";
  style.textContent = ".visualizer.svelte-1f0amz4{display:flex;flex-direction:column;align-items:center;padding:50px}.preview.svelte-1f0amz4{opacity:0.5}.icon.svelte-1f0amz4{color:#777;width:32px;height:32px;margin-bottom:20px}";
  append(document.head, style);
}

function get_each_context$7(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i].node;
  child_ctx[10] = list[i].selectedIndex;
  child_ctx[12] = i;
  return child_ctx;
} // (50:4) {#if i !== 0}


function create_if_block_2$3(ctx) {
  let div;
  let arrow;
  let current;
  arrow = new FaArrowAltCircleDown({});
  return {
    c() {
      div = element("div");
      create_component(arrow.$$.fragment);
      attr(div, "class", "icon svelte-1f0amz4");
    },

    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(arrow, div, null);
      current = true;
    },

    i(local) {
      if (current) return;
      transition_in(arrow.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(arrow.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      destroy_component(arrow);
    }

  };
} // (61:6) {:else}


function create_else_block$2(ctx) {
  let table;
  let current;

  function select_handler_1(...args) {
    return (
      /*select_handler_1*/
      ctx[7](
      /*i*/
      ctx[12], ...args)
    );
  }

  table = new Table({
    props: {
      root:
      /*node*/
      ctx[9],
      selectedIndex:
      /*selectedIndex*/
      ctx[10]
    }
  });
  table.$on("select", select_handler_1);
  return {
    c() {
      create_component(table.$$.fragment);
    },

    m(target, anchor) {
      mount_component(table, target, anchor);
      current = true;
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      const table_changes = {};
      if (dirty &
      /*nodes*/
      1) table_changes.root =
      /*node*/
      ctx[9];
      if (dirty &
      /*nodes*/
      1) table_changes.selectedIndex =
      /*selectedIndex*/
      ctx[10];
      table.$set(table_changes);
    },

    i(local) {
      if (current) return;
      transition_in(table.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(table.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(table, detaching);
    }

  };
} // (57:6) {#if i === nodes.length - 1}


function create_if_block_1$3(ctx) {
  let table;
  let current;

  function select_handler(...args) {
    return (
      /*select_handler*/
      ctx[5](
      /*i*/
      ctx[12], ...args)
    );
  }

  function preview_handler(...args) {
    return (
      /*preview_handler*/
      ctx[6](
      /*i*/
      ctx[12], ...args)
    );
  }

  table = new Table({
    props: {
      root:
      /*node*/
      ctx[9]
    }
  });
  table.$on("select", select_handler);
  table.$on("preview", preview_handler);
  return {
    c() {
      create_component(table.$$.fragment);
    },

    m(target, anchor) {
      mount_component(table, target, anchor);
      current = true;
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      const table_changes = {};
      if (dirty &
      /*nodes*/
      1) table_changes.root =
      /*node*/
      ctx[9];
      table.$set(table_changes);
    },

    i(local) {
      if (current) return;
      transition_in(table.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(table.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(table, detaching);
    }

  };
} // (49:2) {#each nodes as { node, selectedIndex }


function create_each_block$7(ctx) {
  let t;
  let section;
  let current_block_type_index;
  let if_block1;
  let current;
  let if_block0 =
  /*i*/
  ctx[12] !== 0 && create_if_block_2$3();
  const if_block_creators = [create_if_block_1$3, create_else_block$2];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*i*/
    ctx[12] ===
    /*nodes*/
    ctx[0].length - 1) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if (if_block0) if_block0.c();
      t = space();
      section = element("section");
      if_block1.c();
    },

    m(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert(target, t, anchor);
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;
    },

    p(ctx, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];

        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        }

        transition_in(if_block1, 1);
        if_block1.m(section, null);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },

    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },

    d(detaching) {
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach(t);
      if (detaching) detach(section);
      if_blocks[current_block_type_index].d();
    }

  };
} // (69:2) {#if preview}


function create_if_block$a(ctx) {
  let div;
  let arrow;
  let t;
  let section;
  let table;
  let current;
  arrow = new FaArrowAltCircleDown({});
  table = new Table({
    props: {
      root:
      /*preview*/
      ctx[1]
    }
  });
  return {
    c() {
      div = element("div");
      create_component(arrow.$$.fragment);
      t = space();
      section = element("section");
      create_component(table.$$.fragment);
      attr(div, "class", "icon svelte-1f0amz4");
      attr(section, "class", "preview svelte-1f0amz4");
    },

    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(arrow, div, null);
      insert(target, t, anchor);
      insert(target, section, anchor);
      mount_component(table, section, null);
      current = true;
    },

    p(ctx, dirty) {
      const table_changes = {};
      if (dirty &
      /*preview*/
      2) table_changes.root =
      /*preview*/
      ctx[1];
      table.$set(table_changes);
    },

    i(local) {
      if (current) return;
      transition_in(arrow.$$.fragment, local);
      transition_in(table.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(arrow.$$.fragment, local);
      transition_out(table.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      destroy_component(arrow);
      if (detaching) detach(t);
      if (detaching) detach(section);
      destroy_component(table);
    }

  };
}

function create_fragment$u(ctx) {
  let div;
  let t;
  let current;
  let each_value =
  /*nodes*/
  ctx[0];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
  }

  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  let if_block =
  /*preview*/
  ctx[1] && create_if_block$a(ctx);
  return {
    c() {
      div = element("div");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t = space();
      if (if_block) if_block.c();
      attr(div, "class", "visualizer svelte-1f0amz4");
    },

    m(target, anchor) {
      insert(target, div, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }

      append(div, t);
      if (if_block) if_block.m(div, null);
      current = true;
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*nodes, SelectNode, PreviewNode*/
      13) {
        each_value =
        /*nodes*/
        ctx[0];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$7(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$7(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, t);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        check_outros();
      }

      if (
      /*preview*/
      ctx[1]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*preview*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$a(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      transition_in(if_block);
      current = true;
    },

    o(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
    }

  };
}

function instance$u($$self, $$props, $$invalidate) {
  let {
    metadata
  } = $$props;
  let nodes = [];
  let preview = null;

  function SelectNode({
    node,
    selectedIndex
  }, i) {
    $$invalidate(1, preview = null);
    $$invalidate(0, nodes[i].selectedIndex = selectedIndex, nodes);
    $$invalidate(0, nodes = [...nodes.slice(0, i + 1), {
      node
    }]);
  }

  function PreviewNode({
    node
  }, i) {
    $$invalidate(1, preview = node);
  }

  const select_handler = (i, e) => SelectNode(e.detail, i);

  const preview_handler = (i, e) => PreviewNode(e.detail);

  const select_handler_1 = (i, e) => SelectNode(e.detail, i);

  $$self.$set = $$props => {
    if ("metadata" in $$props) $$invalidate(4, metadata = $$props.metadata);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*metadata*/
    16) {
      $: {
        $$invalidate(0, nodes = [{
          node: metadata
        }]);
      }
    }
  };

  return [nodes, preview, SelectNode, PreviewNode, metadata, select_handler, preview_handler, select_handler_1];
}

class MCTS extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1f0amz4-style")) add_css$m();
    init(this, options, instance$u, create_fragment$u, safe_not_equal, {
      metadata: 4
    });
  }

}
/* src/client/debug/log/Log.svelte generated by Svelte v3.24.0 */


function add_css$n() {
  var style = element("style");
  style.id = "svelte-1pq5e4b-style";
  style.textContent = ".gamelog.svelte-1pq5e4b{display:grid;grid-template-columns:30px 1fr 30px;grid-auto-rows:auto;grid-auto-flow:column}";
  append(document.head, style);
}

function get_each_context$8(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i].phase;
  child_ctx[18] = i;
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[19] = list[i].action;
  child_ctx[20] = list[i].payload;
  child_ctx[18] = i;
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[22] = list[i].turn;
  child_ctx[18] = i;
  return child_ctx;
} // (136:4) {#if i in turnBoundaries}


function create_if_block_1$4(ctx) {
  let turnmarker;
  let current;
  turnmarker = new TurnMarker({
    props: {
      turn:
      /*turn*/
      ctx[22],
      numEvents:
      /*turnBoundaries*/
      ctx[3][
      /*i*/
      ctx[18]]
    }
  });
  return {
    c() {
      create_component(turnmarker.$$.fragment);
    },

    m(target, anchor) {
      mount_component(turnmarker, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const turnmarker_changes = {};
      if (dirty &
      /*renderedLogEntries*/
      4) turnmarker_changes.turn =
      /*turn*/
      ctx[22];
      if (dirty &
      /*turnBoundaries*/
      8) turnmarker_changes.numEvents =
      /*turnBoundaries*/
      ctx[3][
      /*i*/
      ctx[18]];
      turnmarker.$set(turnmarker_changes);
    },

    i(local) {
      if (current) return;
      transition_in(turnmarker.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(turnmarker.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(turnmarker, detaching);
    }

  };
} // (135:2) {#each renderedLogEntries as { turn }


function create_each_block_2(ctx) {
  let if_block_anchor;
  let current;
  let if_block =
  /*i*/
  ctx[18] in
  /*turnBoundaries*/
  ctx[3] && create_if_block_1$4(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },

    p(ctx, dirty) {
      if (
      /*i*/
      ctx[18] in
      /*turnBoundaries*/
      ctx[3]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*turnBoundaries*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$4(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
} // (141:2) {#each renderedLogEntries as { action, payload }


function create_each_block_1(ctx) {
  let logevent;
  let current;
  logevent = new LogEvent({
    props: {
      pinned:
      /*i*/
      ctx[18] ===
      /*pinned*/
      ctx[1],
      logIndex:
      /*i*/
      ctx[18],
      action:
      /*action*/
      ctx[19],
      payload:
      /*payload*/
      ctx[20]
    }
  });
  logevent.$on("click",
  /*OnLogClick*/
  ctx[5]);
  logevent.$on("mouseenter",
  /*OnMouseEnter*/
  ctx[6]);
  logevent.$on("mouseleave",
  /*OnMouseLeave*/
  ctx[7]);
  return {
    c() {
      create_component(logevent.$$.fragment);
    },

    m(target, anchor) {
      mount_component(logevent, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const logevent_changes = {};
      if (dirty &
      /*pinned*/
      2) logevent_changes.pinned =
      /*i*/
      ctx[18] ===
      /*pinned*/
      ctx[1];
      if (dirty &
      /*renderedLogEntries*/
      4) logevent_changes.action =
      /*action*/
      ctx[19];
      if (dirty &
      /*renderedLogEntries*/
      4) logevent_changes.payload =
      /*payload*/
      ctx[20];
      logevent.$set(logevent_changes);
    },

    i(local) {
      if (current) return;
      transition_in(logevent.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(logevent.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(logevent, detaching);
    }

  };
} // (153:4) {#if i in phaseBoundaries}


function create_if_block$b(ctx) {
  let phasemarker;
  let current;
  phasemarker = new PhaseMarker({
    props: {
      phase:
      /*phase*/
      ctx[16],
      numEvents:
      /*phaseBoundaries*/
      ctx[4][
      /*i*/
      ctx[18]]
    }
  });
  return {
    c() {
      create_component(phasemarker.$$.fragment);
    },

    m(target, anchor) {
      mount_component(phasemarker, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const phasemarker_changes = {};
      if (dirty &
      /*renderedLogEntries*/
      4) phasemarker_changes.phase =
      /*phase*/
      ctx[16];
      if (dirty &
      /*phaseBoundaries*/
      16) phasemarker_changes.numEvents =
      /*phaseBoundaries*/
      ctx[4][
      /*i*/
      ctx[18]];
      phasemarker.$set(phasemarker_changes);
    },

    i(local) {
      if (current) return;
      transition_in(phasemarker.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(phasemarker.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(phasemarker, detaching);
    }

  };
} // (152:2) {#each renderedLogEntries as { phase }


function create_each_block$8(ctx) {
  let if_block_anchor;
  let current;
  let if_block =
  /*i*/
  ctx[18] in
  /*phaseBoundaries*/
  ctx[4] && create_if_block$b(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },

    p(ctx, dirty) {
      if (
      /*i*/
      ctx[18] in
      /*phaseBoundaries*/
      ctx[4]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*phaseBoundaries*/
          16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$b(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
}

function create_fragment$v(ctx) {
  let div;
  let t0;
  let t1;
  let current;
  let mounted;
  let dispose;
  let each_value_2 =
  /*renderedLogEntries*/
  ctx[2];
  let each_blocks_2 = [];

  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  const out = i => transition_out(each_blocks_2[i], 1, 1, () => {
    each_blocks_2[i] = null;
  });

  let each_value_1 =
  /*renderedLogEntries*/
  ctx[2];
  let each_blocks_1 = [];

  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  const out_1 = i => transition_out(each_blocks_1[i], 1, 1, () => {
    each_blocks_1[i] = null;
  });

  let each_value =
  /*renderedLogEntries*/
  ctx[2];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
  }

  const out_2 = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  return {
    c() {
      div = element("div");

      for (let i = 0; i < each_blocks_2.length; i += 1) {
        each_blocks_2[i].c();
      }

      t0 = space();

      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }

      t1 = space();

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(div, "class", "gamelog svelte-1pq5e4b");
      toggle_class(div, "pinned",
      /*pinned*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, div, anchor);

      for (let i = 0; i < each_blocks_2.length; i += 1) {
        each_blocks_2[i].m(div, null);
      }

      append(div, t0);

      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(div, null);
      }

      append(div, t1);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }

      current = true;

      if (!mounted) {
        dispose = listen(window, "keydown",
        /*OnKeyDown*/
        ctx[8]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*renderedLogEntries, turnBoundaries*/
      12) {
        each_value_2 =
        /*renderedLogEntries*/
        ctx[2];
        let i;

        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx, each_value_2, i);

          if (each_blocks_2[i]) {
            each_blocks_2[i].p(child_ctx, dirty);
            transition_in(each_blocks_2[i], 1);
          } else {
            each_blocks_2[i] = create_each_block_2(child_ctx);
            each_blocks_2[i].c();
            transition_in(each_blocks_2[i], 1);
            each_blocks_2[i].m(div, t0);
          }
        }

        group_outros();

        for (i = each_value_2.length; i < each_blocks_2.length; i += 1) {
          out(i);
        }

        check_outros();
      }

      if (dirty &
      /*pinned, renderedLogEntries, OnLogClick, OnMouseEnter, OnMouseLeave*/
      230) {
        each_value_1 =
        /*renderedLogEntries*/
        ctx[2];
        let i;

        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx, each_value_1, i);

          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
            transition_in(each_blocks_1[i], 1);
          } else {
            each_blocks_1[i] = create_each_block_1(child_ctx);
            each_blocks_1[i].c();
            transition_in(each_blocks_1[i], 1);
            each_blocks_1[i].m(div, t1);
          }
        }

        group_outros();

        for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
          out_1(i);
        }

        check_outros();
      }

      if (dirty &
      /*renderedLogEntries, phaseBoundaries*/
      20) {
        each_value =
        /*renderedLogEntries*/
        ctx[2];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$8(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$8(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out_2(i);
        }

        check_outros();
      }

      if (dirty &
      /*pinned*/
      2) {
        toggle_class(div, "pinned",
        /*pinned*/
        ctx[1]);
      }
    },

    i(local) {
      if (current) return;

      for (let i = 0; i < each_value_2.length; i += 1) {
        transition_in(each_blocks_2[i]);
      }

      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks_1[i]);
      }

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      current = true;
    },

    o(local) {
      each_blocks_2 = each_blocks_2.filter(Boolean);

      for (let i = 0; i < each_blocks_2.length; i += 1) {
        transition_out(each_blocks_2[i]);
      }

      each_blocks_1 = each_blocks_1.filter(Boolean);

      for (let i = 0; i < each_blocks_1.length; i += 1) {
        transition_out(each_blocks_1[i]);
      }

      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      destroy_each(each_blocks_2, detaching);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }

  };
}

function instance$v($$self, $$props, $$invalidate) {
  let $client,
      $$unsubscribe_client = noop,
      $$subscribe_client = () => ($$unsubscribe_client(), $$unsubscribe_client = subscribe(client, $$value => $$invalidate(10, $client = $$value)), client);

  $$self.$$.on_destroy.push(() => $$unsubscribe_client());
  let {
    client
  } = $$props;
  $$subscribe_client();
  const {
    secondaryPane
  } = getContext("secondaryPane");
  const reducer = (0, _reducerEf40323d.C)({
    game: client.game
  });
  const initialState = client.getInitialState();
  let {
    log
  } = $client;
  let pinned = null;

  function rewind(logIndex) {
    let state = initialState;

    for (let i = 0; i < log.length; i++) {
      const {
        action,
        automatic
      } = log[i];

      if (!automatic) {
        state = reducer(state, action);

        if (logIndex == 0) {
          break;
        }

        logIndex--;
      }
    }

    return {
      G: state.G,
      ctx: state.ctx,
      plugins: state.plugins
    };
  }

  function OnLogClick(e) {
    const {
      logIndex
    } = e.detail;
    const state = rewind(logIndex);
    const renderedLogEntries = log.filter(e => !e.automatic);
    client.overrideGameState(state);

    if (pinned == logIndex) {
      $$invalidate(1, pinned = null);
      secondaryPane.set(null);
    } else {
      $$invalidate(1, pinned = logIndex);
      const {
        metadata
      } = renderedLogEntries[logIndex].action.payload;

      if (metadata) {
        secondaryPane.set({
          component: MCTS,
          metadata
        });
      }
    }
  }

  function OnMouseEnter(e) {
    const {
      logIndex
    } = e.detail;

    if (pinned === null) {
      const state = rewind(logIndex);
      client.overrideGameState(state);
    }
  }

  function OnMouseLeave() {
    if (pinned === null) {
      client.overrideGameState(null);
    }
  }

  function Reset() {
    $$invalidate(1, pinned = null);
    client.overrideGameState(null);
    secondaryPane.set(null);
  }

  onDestroy(Reset);

  function OnKeyDown(e) {
    // ESC.
    if (e.keyCode == 27) {
      Reset();
    }
  }

  let renderedLogEntries;
  let turnBoundaries = {};
  let phaseBoundaries = {};

  $$self.$set = $$props => {
    if ("client" in $$props) $$subscribe_client($$invalidate(0, client = $$props.client));
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*$client, log, renderedLogEntries*/
    1540) {
      $: {
        $$invalidate(9, log = $client.log);
        $$invalidate(2, renderedLogEntries = log.filter(e => !e.automatic));
        let eventsInCurrentPhase = 0;
        let eventsInCurrentTurn = 0;
        $$invalidate(3, turnBoundaries = {});
        $$invalidate(4, phaseBoundaries = {});

        for (let i = 0; i < renderedLogEntries.length; i++) {
          const {
            action,
            payload,
            turn,
            phase
          } = renderedLogEntries[i];
          eventsInCurrentTurn++;
          eventsInCurrentPhase++;

          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].turn != turn) {
            $$invalidate(3, turnBoundaries[i] = eventsInCurrentTurn, turnBoundaries);
            eventsInCurrentTurn = 0;
          }

          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].phase != phase) {
            $$invalidate(4, phaseBoundaries[i] = eventsInCurrentPhase, phaseBoundaries);
            eventsInCurrentPhase = 0;
          }
        }
      }
    }
  };

  return [client, pinned, renderedLogEntries, turnBoundaries, phaseBoundaries, OnLogClick, OnMouseEnter, OnMouseLeave, OnKeyDown];
}

class Log extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1pq5e4b-style")) add_css$n();
    init(this, options, instance$v, create_fragment$v, safe_not_equal, {
      client: 0
    });
  }

}
/* src/client/debug/ai/Options.svelte generated by Svelte v3.24.0 */


function add_css$o() {
  var style = element("style");
  style.id = "svelte-1fu900w-style";
  style.textContent = "label.svelte-1fu900w{color:#666}.option.svelte-1fu900w{margin-bottom:20px}.value.svelte-1fu900w{font-weight:bold;color:#000}input[type='checkbox'].svelte-1fu900w{vertical-align:middle}";
  append(document.head, style);
}

function get_each_context$9(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[5] = list[i][0];
  child_ctx[6] = list[i][1];
  return child_ctx;
} // (39:4) {#if value.range}


function create_if_block_1$5(ctx) {
  let span;
  let t0_value =
  /*values*/
  ctx[1][
  /*key*/
  ctx[5]] + "";
  let t0;
  let t1;
  let input;
  let input_min_value;
  let input_max_value;
  let mounted;
  let dispose;

  function input_change_input_handler() {
    /*input_change_input_handler*/
    ctx[3].call(input,
    /*key*/
    ctx[5]);
  }

  return {
    c() {
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      input = element("input");
      attr(span, "class", "value svelte-1fu900w");
      attr(input, "type", "range");
      attr(input, "min", input_min_value =
      /*value*/
      ctx[6].range.min);
      attr(input, "max", input_max_value =
      /*value*/
      ctx[6].range.max);
    },

    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      insert(target, t1, anchor);
      insert(target, input, anchor);
      set_input_value(input,
      /*values*/
      ctx[1][
      /*key*/
      ctx[5]]);

      if (!mounted) {
        dispose = [listen(input, "change", input_change_input_handler), listen(input, "input", input_change_input_handler), listen(input, "change",
        /*OnChange*/
        ctx[2])];
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*values, bot*/
      3 && t0_value !== (t0_value =
      /*values*/
      ctx[1][
      /*key*/
      ctx[5]] + "")) set_data(t0, t0_value);

      if (dirty &
      /*bot*/
      1 && input_min_value !== (input_min_value =
      /*value*/
      ctx[6].range.min)) {
        attr(input, "min", input_min_value);
      }

      if (dirty &
      /*bot*/
      1 && input_max_value !== (input_max_value =
      /*value*/
      ctx[6].range.max)) {
        attr(input, "max", input_max_value);
      }

      if (dirty &
      /*values, Object, bot*/
      3) {
        set_input_value(input,
        /*values*/
        ctx[1][
        /*key*/
        ctx[5]]);
      }
    },

    d(detaching) {
      if (detaching) detach(span);
      if (detaching) detach(t1);
      if (detaching) detach(input);
      mounted = false;
      run_all(dispose);
    }

  };
} // (44:4) {#if typeof value.value === 'boolean'}


function create_if_block$c(ctx) {
  let input;
  let mounted;
  let dispose;

  function input_change_handler() {
    /*input_change_handler*/
    ctx[4].call(input,
    /*key*/
    ctx[5]);
  }

  return {
    c() {
      input = element("input");
      attr(input, "type", "checkbox");
      attr(input, "class", "svelte-1fu900w");
    },

    m(target, anchor) {
      insert(target, input, anchor);
      input.checked =
      /*values*/
      ctx[1][
      /*key*/
      ctx[5]];

      if (!mounted) {
        dispose = [listen(input, "change", input_change_handler), listen(input, "change",
        /*OnChange*/
        ctx[2])];
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty &
      /*values, Object, bot*/
      3) {
        input.checked =
        /*values*/
        ctx[1][
        /*key*/
        ctx[5]];
      }
    },

    d(detaching) {
      if (detaching) detach(input);
      mounted = false;
      run_all(dispose);
    }

  };
} // (35:0) {#each Object.entries(bot.opts()) as [key, value]}


function create_each_block$9(ctx) {
  let div;
  let label;
  let t0_value =
  /*key*/
  ctx[5] + "";
  let t0;
  let t1;
  let t2;
  let t3;
  let if_block0 =
  /*value*/
  ctx[6].range && create_if_block_1$5(ctx);
  let if_block1 = typeof
  /*value*/
  ctx[6].value === "boolean" && create_if_block$c(ctx);
  return {
    c() {
      div = element("div");
      label = element("label");
      t0 = text(t0_value);
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      t3 = space();
      attr(label, "class", "svelte-1fu900w");
      attr(div, "class", "option svelte-1fu900w");
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, label);
      append(label, t0);
      append(div, t1);
      if (if_block0) if_block0.m(div, null);
      append(div, t2);
      if (if_block1) if_block1.m(div, null);
      append(div, t3);
    },

    p(ctx, dirty) {
      if (dirty &
      /*bot*/
      1 && t0_value !== (t0_value =
      /*key*/
      ctx[5] + "")) set_data(t0, t0_value);

      if (
      /*value*/
      ctx[6].range) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_1$5(ctx);
          if_block0.c();
          if_block0.m(div, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (typeof
      /*value*/
      ctx[6].value === "boolean") {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block$c(ctx);
          if_block1.c();
          if_block1.m(div, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },

    d(detaching) {
      if (detaching) detach(div);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }

  };
}

function create_fragment$w(ctx) {
  let each_1_anchor;
  let each_value = Object.entries(
  /*bot*/
  ctx[0].opts());
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
  }

  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      each_1_anchor = empty();
    },

    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }

      insert(target, each_1_anchor, anchor);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*values, Object, bot, OnChange*/
      7) {
        each_value = Object.entries(
        /*bot*/
        ctx[0].opts());
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$9(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$9(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach(each_1_anchor);
    }

  };
}

function instance$w($$self, $$props, $$invalidate) {
  let {
    bot
  } = $$props;
  let values = {};

  for (let [key, value] of Object.entries(bot.opts())) {
    values[key] = value.value;
  }

  function OnChange() {
    for (let [key, value] of Object.entries(values)) {
      bot.setOpt(key, value);
    }
  }

  function input_change_input_handler(key) {
    values[key] = to_number(this.value);
    $$invalidate(1, values);
    $$invalidate(0, bot);
  }

  function input_change_handler(key) {
    values[key] = this.checked;
    $$invalidate(1, values);
    $$invalidate(0, bot);
  }

  $$self.$set = $$props => {
    if ("bot" in $$props) $$invalidate(0, bot = $$props.bot);
  };

  return [bot, values, OnChange, input_change_input_handler, input_change_handler];
}

class Options extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1fu900w-style")) add_css$o();
    init(this, options, instance$w, create_fragment$w, safe_not_equal, {
      bot: 0
    });
  }

}
/* src/client/debug/ai/AI.svelte generated by Svelte v3.24.0 */


function add_css$p() {
  var style = element("style");
  style.id = "svelte-lifdi8-style";
  style.textContent = "ul.svelte-lifdi8{padding-left:0}li.svelte-lifdi8{list-style:none;margin:none;margin-bottom:5px}h3.svelte-lifdi8{text-transform:uppercase}label.svelte-lifdi8{color:#666}input[type='checkbox'].svelte-lifdi8{vertical-align:middle}";
  append(document.head, style);
}

function get_each_context$a(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
} // (201:4) {:else}


function create_else_block$3(ctx) {
  let p0;
  let t1;
  let p1;
  return {
    c() {
      p0 = element("p");
      p0.textContent = "No bots available.";
      t1 = space();
      p1 = element("p");
      p1.innerHTML = "Follow the instructions\n        <a href=\"https://boardgame.io/documentation/#/tutorial?id=bots\" target=\"_blank\">here</a>\n        to set up bots.";
    },

    m(target, anchor) {
      insert(target, p0, anchor);
      insert(target, t1, anchor);
      insert(target, p1, anchor);
    },

    p: noop,
    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(p0);
      if (detaching) detach(t1);
      if (detaching) detach(p1);
    }

  };
} // (199:4) {#if client.multiplayer}


function create_if_block_5(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = "The bot debugger is only available in singleplayer mode.";
    },

    m(target, anchor) {
      insert(target, p, anchor);
    },

    p: noop,
    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(p);
    }

  };
} // (149:2) {#if client.game.ai && !client.multiplayer}


function create_if_block$d(ctx) {
  let section0;
  let h30;
  let t1;
  let ul;
  let li0;
  let hotkey0;
  let t2;
  let li1;
  let hotkey1;
  let t3;
  let li2;
  let hotkey2;
  let t4;
  let section1;
  let h31;
  let t6;
  let select;
  let t7;
  let show_if = Object.keys(
  /*bot*/
  ctx[7].opts()).length;
  let t8;
  let if_block1_anchor;
  let current;
  let mounted;
  let dispose;
  hotkey0 = new Hotkey({
    props: {
      value: "1",
      onPress:
      /*Reset*/
      ctx[13],
      label: "reset"
    }
  });
  hotkey1 = new Hotkey({
    props: {
      value: "2",
      onPress:
      /*Step*/
      ctx[11],
      label: "play"
    }
  });
  hotkey2 = new Hotkey({
    props: {
      value: "3",
      onPress:
      /*Simulate*/
      ctx[12],
      label: "simulate"
    }
  });
  let each_value = Object.keys(
  /*bots*/
  ctx[8]);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
  }

  let if_block0 = show_if && create_if_block_4(ctx);
  let if_block1 = (
  /*botAction*/
  ctx[5] ||
  /*iterationCounter*/
  ctx[3]) && create_if_block_1$6(ctx);
  return {
    c() {
      section0 = element("section");
      h30 = element("h3");
      h30.textContent = "Controls";
      t1 = space();
      ul = element("ul");
      li0 = element("li");
      create_component(hotkey0.$$.fragment);
      t2 = space();
      li1 = element("li");
      create_component(hotkey1.$$.fragment);
      t3 = space();
      li2 = element("li");
      create_component(hotkey2.$$.fragment);
      t4 = space();
      section1 = element("section");
      h31 = element("h3");
      h31.textContent = "Bot";
      t6 = space();
      select = element("select");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t7 = space();
      if (if_block0) if_block0.c();
      t8 = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      attr(h30, "class", "svelte-lifdi8");
      attr(li0, "class", "svelte-lifdi8");
      attr(li1, "class", "svelte-lifdi8");
      attr(li2, "class", "svelte-lifdi8");
      attr(ul, "class", "svelte-lifdi8");
      attr(h31, "class", "svelte-lifdi8");
      if (
      /*selectedBot*/
      ctx[4] === void 0) add_render_callback(() =>
      /*select_change_handler*/
      ctx[16].call(select));
    },

    m(target, anchor) {
      insert(target, section0, anchor);
      append(section0, h30);
      append(section0, t1);
      append(section0, ul);
      append(ul, li0);
      mount_component(hotkey0, li0, null);
      append(ul, t2);
      append(ul, li1);
      mount_component(hotkey1, li1, null);
      append(ul, t3);
      append(ul, li2);
      mount_component(hotkey2, li2, null);
      insert(target, t4, anchor);
      insert(target, section1, anchor);
      append(section1, h31);
      append(section1, t6);
      append(section1, select);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(select, null);
      }

      select_option(select,
      /*selectedBot*/
      ctx[4]);
      insert(target, t7, anchor);
      if (if_block0) if_block0.m(target, anchor);
      insert(target, t8, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;

      if (!mounted) {
        dispose = [listen(select, "change",
        /*select_change_handler*/
        ctx[16]), listen(select, "change",
        /*ChangeBot*/
        ctx[10])];
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*Object, bots*/
      256) {
        each_value = Object.keys(
        /*bots*/
        ctx[8]);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$a(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$a(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (dirty &
      /*selectedBot, Object, bots*/
      272) {
        select_option(select,
        /*selectedBot*/
        ctx[4]);
      }

      if (dirty &
      /*bot*/
      128) show_if = Object.keys(
      /*bot*/
      ctx[7].opts()).length;

      if (show_if) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*bot*/
          128) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t8.parentNode, t8);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }

      if (
      /*botAction*/
      ctx[5] ||
      /*iterationCounter*/
      ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_1$6(ctx);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },

    i(local) {
      if (current) return;
      transition_in(hotkey0.$$.fragment, local);
      transition_in(hotkey1.$$.fragment, local);
      transition_in(hotkey2.$$.fragment, local);
      transition_in(if_block0);
      current = true;
    },

    o(local) {
      transition_out(hotkey0.$$.fragment, local);
      transition_out(hotkey1.$$.fragment, local);
      transition_out(hotkey2.$$.fragment, local);
      transition_out(if_block0);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section0);
      destroy_component(hotkey0);
      destroy_component(hotkey1);
      destroy_component(hotkey2);
      if (detaching) detach(t4);
      if (detaching) detach(section1);
      destroy_each(each_blocks, detaching);
      if (detaching) detach(t7);
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach(t8);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach(if_block1_anchor);
      mounted = false;
      run_all(dispose);
    }

  };
} // (168:8) {#each Object.keys(bots) as bot}


function create_each_block$a(ctx) {
  let option;
  let t_value =
  /*bot*/
  ctx[7] + "";
  let t;
  let option_value_value;
  return {
    c() {
      option = element("option");
      t = text(t_value);
      option.__value = option_value_value =
      /*bot*/
      ctx[7];
      option.value = option.__value;
    },

    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t);
    },

    p: noop,

    d(detaching) {
      if (detaching) detach(option);
    }

  };
} // (174:4) {#if Object.keys(bot.opts()).length}


function create_if_block_4(ctx) {
  let section;
  let h3;
  let t1;
  let label;
  let t3;
  let input;
  let t4;
  let options;
  let current;
  let mounted;
  let dispose;
  options = new Options({
    props: {
      bot:
      /*bot*/
      ctx[7]
    }
  });
  return {
    c() {
      section = element("section");
      h3 = element("h3");
      h3.textContent = "Options";
      t1 = space();
      label = element("label");
      label.textContent = "debug";
      t3 = space();
      input = element("input");
      t4 = space();
      create_component(options.$$.fragment);
      attr(h3, "class", "svelte-lifdi8");
      attr(label, "class", "svelte-lifdi8");
      attr(input, "type", "checkbox");
      attr(input, "class", "svelte-lifdi8");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      append(section, h3);
      append(section, t1);
      append(section, label);
      append(section, t3);
      append(section, input);
      input.checked =
      /*debug*/
      ctx[1];
      append(section, t4);
      mount_component(options, section, null);
      current = true;

      if (!mounted) {
        dispose = [listen(input, "change",
        /*input_change_handler*/
        ctx[17]), listen(input, "change",
        /*OnDebug*/
        ctx[9])];
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*debug*/
      2) {
        input.checked =
        /*debug*/
        ctx[1];
      }

      const options_changes = {};
      if (dirty &
      /*bot*/
      128) options_changes.bot =
      /*bot*/
      ctx[7];
      options.$set(options_changes);
    },

    i(local) {
      if (current) return;
      transition_in(options.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(options.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section);
      destroy_component(options);
      mounted = false;
      run_all(dispose);
    }

  };
} // (183:4) {#if botAction || iterationCounter}


function create_if_block_1$6(ctx) {
  let section;
  let h3;
  let t1;
  let t2;
  let if_block0 =
  /*progress*/
  ctx[2] &&
  /*progress*/
  ctx[2] < 1 && create_if_block_3$1(ctx);
  let if_block1 =
  /*botAction*/
  ctx[5] && create_if_block_2$4(ctx);
  return {
    c() {
      section = element("section");
      h3 = element("h3");
      h3.textContent = "Result";
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      attr(h3, "class", "svelte-lifdi8");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      append(section, h3);
      append(section, t1);
      if (if_block0) if_block0.m(section, null);
      append(section, t2);
      if (if_block1) if_block1.m(section, null);
    },

    p(ctx, dirty) {
      if (
      /*progress*/
      ctx[2] &&
      /*progress*/
      ctx[2] < 1) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3$1(ctx);
          if_block0.c();
          if_block0.m(section, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*botAction*/
      ctx[5]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2$4(ctx);
          if_block1.c();
          if_block1.m(section, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },

    d(detaching) {
      if (detaching) detach(section);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }

  };
} // (186:6) {#if progress && progress < 1.0}


function create_if_block_3$1(ctx) {
  let progress_1;
  return {
    c() {
      progress_1 = element("progress");
      progress_1.value =
      /*progress*/
      ctx[2];
    },

    m(target, anchor) {
      insert(target, progress_1, anchor);
    },

    p(ctx, dirty) {
      if (dirty &
      /*progress*/
      4) {
        progress_1.value =
        /*progress*/
        ctx[2];
      }
    },

    d(detaching) {
      if (detaching) detach(progress_1);
    }

  };
} // (190:6) {#if botAction}


function create_if_block_2$4(ctx) {
  let ul;
  let li0;
  let t0;
  let t1;
  let t2;
  let li1;
  let t3;
  let t4_value = JSON.stringify(
  /*botActionArgs*/
  ctx[6]) + "";
  let t4;
  return {
    c() {
      ul = element("ul");
      li0 = element("li");
      t0 = text("Action: ");
      t1 = text(
      /*botAction*/
      ctx[5]);
      t2 = space();
      li1 = element("li");
      t3 = text("Args: ");
      t4 = text(t4_value);
      attr(li0, "class", "svelte-lifdi8");
      attr(li1, "class", "svelte-lifdi8");
      attr(ul, "class", "svelte-lifdi8");
    },

    m(target, anchor) {
      insert(target, ul, anchor);
      append(ul, li0);
      append(li0, t0);
      append(li0, t1);
      append(ul, t2);
      append(ul, li1);
      append(li1, t3);
      append(li1, t4);
    },

    p(ctx, dirty) {
      if (dirty &
      /*botAction*/
      32) set_data(t1,
      /*botAction*/
      ctx[5]);
      if (dirty &
      /*botActionArgs*/
      64 && t4_value !== (t4_value = JSON.stringify(
      /*botActionArgs*/
      ctx[6]) + "")) set_data(t4, t4_value);
    },

    d(detaching) {
      if (detaching) detach(ul);
    }

  };
}

function create_fragment$x(ctx) {
  let section;
  let current_block_type_index;
  let if_block;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$d, create_if_block_5, create_else_block$3];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*client*/
    ctx[0].game.ai && !
    /*client*/
    ctx[0].multiplayer) return 0;
    if (
    /*client*/
    ctx[0].multiplayer) return 1;
    return 2;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      section = element("section");
      if_block.c();
    },

    m(target, anchor) {
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;

      if (!mounted) {
        dispose = listen(window, "keydown",
        /*OnKeyDown*/
        ctx[14]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        }

        transition_in(if_block, 1);
        if_block.m(section, null);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }

  };
}

function instance$x($$self, $$props, $$invalidate) {
  let {
    client
  } = $$props;
  let {
    clientManager
  } = $$props;
  const {
    secondaryPane
  } = getContext("secondaryPane");
  const bots = {
    "MCTS": _ai4091d3f.M,
    "Random": _ai4091d3f.R
  };
  let debug = false;
  let progress = null;
  let iterationCounter = 0;
  let metadata = null;

  const iterationCallback = ({
    iterationCounter: c,
    numIterations,
    metadata: m
  }) => {
    $$invalidate(3, iterationCounter = c);
    $$invalidate(2, progress = c / numIterations);
    metadata = m;

    if (debug && metadata) {
      secondaryPane.set({
        component: MCTS,
        metadata
      });
    }
  };

  function OnDebug() {
    if (debug && metadata) {
      secondaryPane.set({
        component: MCTS,
        metadata
      });
    } else {
      secondaryPane.set(null);
    }
  }

  let bot;

  if (client.game.ai) {
    bot = new _ai4091d3f.M({
      game: client.game,
      enumerate: client.game.ai.enumerate,
      iterationCallback
    });
    bot.setOpt("async", true);
  }

  let selectedBot;
  let botAction;
  let botActionArgs;

  function ChangeBot() {
    const botConstructor = bots[selectedBot];
    $$invalidate(7, bot = new botConstructor({
      game: client.game,
      enumerate: client.game.ai.enumerate,
      iterationCallback
    }));
    bot.setOpt("async", true);
    $$invalidate(5, botAction = null);
    metadata = null;
    secondaryPane.set(null);
    $$invalidate(3, iterationCounter = 0);
  }

  async function Step$1() {
    $$invalidate(5, botAction = null);
    metadata = null;
    $$invalidate(3, iterationCounter = 0);
    const t = await (0, _ai4091d3f.S)(client, bot);

    if (t) {
      $$invalidate(5, botAction = t.payload.type);
      $$invalidate(6, botActionArgs = t.payload.args);
    }
  }

  function Simulate(iterations = 10000, sleepTimeout = 100) {
    $$invalidate(5, botAction = null);
    metadata = null;
    $$invalidate(3, iterationCounter = 0);

    const step = async () => {
      for (let i = 0; i < iterations; i++) {
        const action = await (0, _ai4091d3f.S)(client, bot);
        if (!action) break;
        await new Promise(resolve => setTimeout(resolve, sleepTimeout));
      }
    };

    return step();
  }

  function Exit() {
    client.overrideGameState(null);
    secondaryPane.set(null);
    $$invalidate(1, debug = false);
  }

  function Reset() {
    client.reset();
    $$invalidate(5, botAction = null);
    metadata = null;
    $$invalidate(3, iterationCounter = 0);
    Exit();
  }

  function OnKeyDown(e) {
    // ESC.
    if (e.keyCode == 27) {
      Exit();
    }
  }

  onDestroy(Exit);

  function select_change_handler() {
    selectedBot = select_value(this);
    $$invalidate(4, selectedBot);
    $$invalidate(8, bots);
  }

  function input_change_handler() {
    debug = this.checked;
    $$invalidate(1, debug);
  }

  $$self.$set = $$props => {
    if ("client" in $$props) $$invalidate(0, client = $$props.client);
    if ("clientManager" in $$props) $$invalidate(15, clientManager = $$props.clientManager);
  };

  return [client, debug, progress, iterationCounter, selectedBot, botAction, botActionArgs, bot, bots, OnDebug, ChangeBot, Step$1, Simulate, Reset, OnKeyDown, clientManager, select_change_handler, input_change_handler];
}

class AI extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-lifdi8-style")) add_css$p();
    init(this, options, instance$x, create_fragment$x, safe_not_equal, {
      client: 0,
      clientManager: 15
    });
  }

}
/* src/client/debug/Debug.svelte generated by Svelte v3.24.0 */


function add_css$q() {
  var style = element("style");
  style.id = "svelte-1dhkl71-style";
  style.textContent = ".debug-panel.svelte-1dhkl71{position:fixed;color:#555;font-family:monospace;display:flex;flex-direction:row;text-align:left;right:0;top:0;height:100%;font-size:14px;box-sizing:border-box;opacity:0.9;z-index:99999}.pane.svelte-1dhkl71{flex-grow:2;overflow-x:hidden;overflow-y:scroll;background:#fefefe;padding:20px;border-left:1px solid #ccc;box-shadow:-1px 0 5px rgba(0, 0, 0, 0.2);box-sizing:border-box;width:280px}.secondary-pane.svelte-1dhkl71{background:#fefefe;overflow-y:scroll}.debug-panel.svelte-1dhkl71 button,.debug-panel.svelte-1dhkl71 select{cursor:pointer;font-size:14px;font-family:monospace}.debug-panel.svelte-1dhkl71 select{background:#eee;border:1px solid #bbb;color:#555;padding:3px;border-radius:3px}.debug-panel.svelte-1dhkl71 section{margin-bottom:20px}.debug-panel.svelte-1dhkl71 .screen-reader-only{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}";
  append(document.head, style);
} // (118:0) {#if visible}


function create_if_block$e(ctx) {
  let section;
  let menu;
  let t0;
  let div;
  let switch_instance;
  let t1;
  let section_transition;
  let current;
  menu = new Menu({
    props: {
      panes:
      /*panes*/
      ctx[6],
      pane:
      /*pane*/
      ctx[2]
    }
  });
  menu.$on("change",
  /*MenuChange*/
  ctx[8]);
  var switch_value =
  /*panes*/
  ctx[6][
  /*pane*/
  ctx[2]].component;

  function switch_props(ctx) {
    return {
      props: {
        client:
        /*client*/
        ctx[4],
        clientManager:
        /*clientManager*/
        ctx[0]
      }
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  let if_block =
  /*$secondaryPane*/
  ctx[5] && create_if_block_1$7(ctx);
  return {
    c() {
      section = element("section");
      create_component(menu.$$.fragment);
      t0 = space();
      div = element("div");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      t1 = space();
      if (if_block) if_block.c();
      attr(div, "class", "pane svelte-1dhkl71");
      attr(div, "role", "region");
      attr(div, "aria-label",
      /*pane*/
      ctx[2]);
      attr(div, "tabindex", "-1");
      attr(section, "aria-label", "boardgame.io Debug Panel");
      attr(section, "class", "debug-panel svelte-1dhkl71");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      mount_component(menu, section, null);
      append(section, t0);
      append(section, div);

      if (switch_instance) {
        mount_component(switch_instance, div, null);
      }
      /*div_binding*/


      ctx[10](div);
      append(section, t1);
      if (if_block) if_block.m(section, null);
      current = true;
    },

    p(ctx, dirty) {
      const menu_changes = {};
      if (dirty &
      /*pane*/
      4) menu_changes.pane =
      /*pane*/
      ctx[2];
      menu.$set(menu_changes);
      const switch_instance_changes = {};
      if (dirty &
      /*client*/
      16) switch_instance_changes.client =
      /*client*/
      ctx[4];
      if (dirty &
      /*clientManager*/
      1) switch_instance_changes.clientManager =
      /*clientManager*/
      ctx[0];

      if (switch_value !== (switch_value =
      /*panes*/
      ctx[6][
      /*pane*/
      ctx[2]].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }

      if (!current || dirty &
      /*pane*/
      4) {
        attr(div, "aria-label",
        /*pane*/
        ctx[2]);
      }

      if (
      /*$secondaryPane*/
      ctx[5]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*$secondaryPane*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$7(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(section, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;
      transition_in(menu.$$.fragment, local);
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      transition_in(if_block);
      add_render_callback(() => {
        if (!section_transition) section_transition = create_bidirectional_transition(section, fly, {
          x: 400
        }, true);
        section_transition.run(1);
      });
      current = true;
    },

    o(local) {
      transition_out(menu.$$.fragment, local);
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      transition_out(if_block);
      if (!section_transition) section_transition = create_bidirectional_transition(section, fly, {
        x: 400
      }, false);
      section_transition.run(0);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section);
      destroy_component(menu);
      if (switch_instance) destroy_component(switch_instance);
      /*div_binding*/

      ctx[10](null);
      if (if_block) if_block.d();
      if (detaching && section_transition) section_transition.end();
    }

  };
} // (130:4) {#if $secondaryPane}


function create_if_block_1$7(ctx) {
  let div;
  let switch_instance;
  let current;
  var switch_value =
  /*$secondaryPane*/
  ctx[5].component;

  function switch_props(ctx) {
    return {
      props: {
        metadata:
        /*$secondaryPane*/
        ctx[5].metadata
      }
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  return {
    c() {
      div = element("div");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      attr(div, "class", "secondary-pane svelte-1dhkl71");
    },

    m(target, anchor) {
      insert(target, div, anchor);

      if (switch_instance) {
        mount_component(switch_instance, div, null);
      }

      current = true;
    },

    p(ctx, dirty) {
      const switch_instance_changes = {};
      if (dirty &
      /*$secondaryPane*/
      32) switch_instance_changes.metadata =
      /*$secondaryPane*/
      ctx[5].metadata;

      if (switch_value !== (switch_value =
      /*$secondaryPane*/
      ctx[5].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },

    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },

    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      if (switch_instance) destroy_component(switch_instance);
    }

  };
}

function create_fragment$y(ctx) {
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  let if_block =
  /*visible*/
  ctx[3] && create_if_block$e(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;

      if (!mounted) {
        dispose = listen(window, "keypress",
        /*Keypress*/
        ctx[9]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (
      /*visible*/
      ctx[3]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*visible*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$e(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
      mounted = false;
      dispose();
    }

  };
}

function instance$y($$self, $$props, $$invalidate) {
  let $clientManager,
      $$unsubscribe_clientManager = noop,
      $$subscribe_clientManager = () => ($$unsubscribe_clientManager(), $$unsubscribe_clientManager = subscribe(clientManager, $$value => $$invalidate(11, $clientManager = $$value)), clientManager);

  let $secondaryPane;
  $$self.$$.on_destroy.push(() => $$unsubscribe_clientManager());
  let {
    clientManager
  } = $$props;
  $$subscribe_clientManager();
  const panes = {
    main: {
      label: "Main",
      shortcut: "m",
      component: Main
    },
    log: {
      label: "Log",
      shortcut: "l",
      component: Log
    },
    info: {
      label: "Info",
      shortcut: "i",
      component: Info
    },
    ai: {
      label: "AI",
      shortcut: "a",
      component: AI
    }
  };
  const disableHotkeys = writable(false);
  const secondaryPane = writable(null);
  component_subscribe($$self, secondaryPane, value => $$invalidate(5, $secondaryPane = value));
  setContext("hotkeys", {
    disableHotkeys
  });
  setContext("secondaryPane", {
    secondaryPane
  });
  let paneDiv;
  let pane = "main";

  function MenuChange(e) {
    $$invalidate(2, pane = e.detail);
    paneDiv.focus();
  }

  let visible = true;

  function Keypress(e) {
    // Toggle debugger visibilty
    if (e.key == ".") {
      $$invalidate(3, visible = !visible);
      return;
    } // Set displayed pane


    if (!visible) return;
    Object.entries(panes).forEach(([key, {
      shortcut
    }]) => {
      if (e.key == shortcut) {
        $$invalidate(2, pane = key);
      }
    });
  }

  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      paneDiv = $$value;
      $$invalidate(1, paneDiv);
    });
  }

  $$self.$set = $$props => {
    if ("clientManager" in $$props) $$subscribe_clientManager($$invalidate(0, clientManager = $$props.clientManager));
  };

  let client;

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*$clientManager*/
    2048) {
      $: $$invalidate(4, client = $clientManager.client);
    }
  };

  return [clientManager, paneDiv, pane, visible, client, $secondaryPane, panes, secondaryPane, MenuChange, Keypress, div_binding];
}

class Debug extends SvelteComponent {
  constructor(options) {
    super();
    if (!document.getElementById("svelte-1dhkl71-style")) add_css$q();
    init(this, options, instance$y, create_fragment$y, safe_not_equal, {
      clientManager: 0
    });
  }

}

exports.D = Debug;
},{"./turn-order-7578f7f3.js":"node_modules/boardgame.io/dist/esm/turn-order-7578f7f3.js","./reducer-ef40323d.js":"node_modules/boardgame.io/dist/esm/reducer-ef40323d.js","flatted":"node_modules/flatted/esm/index.js","./ai-4091d3f9.js":"node_modules/boardgame.io/dist/esm/ai-4091d3f9.js"}],"node_modules/symbol-observable/es/ponyfill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = symbolObservablePonyfill;

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

;
},{}],"node_modules/symbol-observable/es/index.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ponyfill = _interopRequireDefault(require("./ponyfill.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill.default)(root);
var _default = result;
exports.default = _default;
},{"./ponyfill.js":"node_modules/symbol-observable/es/ponyfill.js"}],"node_modules/redux/es/redux.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.createStore = createStore;
exports.__DO_NOT_USE__ActionTypes = void 0;

var _symbolObservable = _interopRequireDefault(require("symbol-observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

exports.__DO_NOT_USE__ActionTypes = ActionTypes;

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[_symbolObservable.default] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable.default] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */


function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}
},{"symbol-observable":"node_modules/symbol-observable/es/index.js"}],"node_modules/boardgame.io/dist/esm/initialize-ff341f37.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I = InitializeGame;

var _turnOrder7578f7f = require("./turn-order-7578f7f3.js");

var _reducerEf40323d = require("./reducer-ef40323d.js");

/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Creates the initial game state.
 */
function InitializeGame({
  game,
  numPlayers,
  setupData
}) {
  game = (0, _reducerEf40323d.P)(game);

  if (!numPlayers) {
    numPlayers = 2;
  }

  let ctx = game.flow.ctx(numPlayers);
  let state = {
    // User managed state.
    G: {},
    // Framework managed state.
    ctx,
    // Plugin related state.
    plugins: {}
  }; // Run plugins over initial state.

  state = (0, _turnOrder7578f7f.o)(state, {
    game
  });
  state = (0, _turnOrder7578f7f.d)(state, {
    game,
    playerID: undefined
  });
  const enhancedCtx = (0, _turnOrder7578f7f.E)(state);
  state.G = game.setup(enhancedCtx, setupData);
  let initial = { ...state,
    // List of {G, ctx} pairs that can be undone.
    _undo: [],
    // List of {G, ctx} pairs that can be redone.
    _redo: [],
    // A monotonically non-decreasing ID to ensure that
    // state updates are only allowed from clients that
    // are at the same version that the server.
    _stateID: 0
  };
  initial = game.flow.init(initial);
  initial = (0, _turnOrder7578f7f.f)(initial, {
    game
  }); // Initialize undo stack.

  if (!game.disableUndo) {
    initial._undo = [{
      G: initial.G,
      ctx: initial.ctx,
      plugins: initial.plugins
    }];
  }

  return initial;
}
},{"./turn-order-7578f7f3.js":"node_modules/boardgame.io/dist/esm/turn-order-7578f7f3.js","./reducer-ef40323d.js":"node_modules/boardgame.io/dist/esm/reducer-ef40323d.js"}],"node_modules/boardgame.io/dist/esm/client-b699de9a.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.C = Client;

var _DebugBa7187a = require("./Debug-ba7187a3.js");

var _redux = require("redux");

var _turnOrder7578f7f = require("./turn-order-7578f7f3.js");

var _reducerEf40323d = require("./reducer-ef40323d.js");

var _initializeFf341f = require("./initialize-ff341f37.js");

/**
 * Class to manage boardgame.io clients and limit debug panel rendering.
 */
class ClientManager {
  constructor() {
    this.debugPanel = null;
    this.currentClient = null;
    this.clients = new Map();
    this.subscribers = new Map();
  }
  /**
   * Register a client with the client manager.
   */


  register(client) {
    // Add client to clients map.
    this.clients.set(client, client); // Mount debug for this client (no-op if another debug is already mounted).

    this.mountDebug(client);
    this.notifySubscribers();
  }
  /**
   * Unregister a client from the client manager.
   */


  unregister(client) {
    // Remove client from clients map.
    this.clients.delete(client);

    if (this.currentClient === client) {
      // If the removed client owned the debug panel, unmount it.
      this.unmountDebug(); // Mount debug panel for next available client.

      for (const [client] of this.clients) {
        if (this.debugPanel) break;
        this.mountDebug(client);
      }
    }

    this.notifySubscribers();
  }
  /**
   * Subscribe to the client manager state.
   * Calls the passed callback each time the current client changes or a client
   * registers/unregisters.
   * Returns a function to unsubscribe from the state updates.
   */


  subscribe(callback) {
    const id = Symbol();
    this.subscribers.set(id, callback);
    callback(this.getState());
    return () => {
      this.subscribers.delete(id);
    };
  }
  /**
   * Switch to a client with a matching playerID.
   */


  switchPlayerID(playerID) {
    // For multiplayer clients, try switching control to a different client
    // that is using the same transport layer.
    if (this.currentClient.multiplayer) {
      for (const [client] of this.clients) {
        if (client.playerID === playerID && client.debugOpt !== false && client.multiplayer === this.currentClient.multiplayer) {
          this.switchToClient(client);
          return;
        }
      }
    } // If no client matches, update the playerID for the current client.


    this.currentClient.updatePlayerID(playerID);
    this.notifySubscribers();
  }
  /**
   * Set the passed client as the active client for debugging.
   */


  switchToClient(client) {
    if (client === this.currentClient) return;
    this.unmountDebug();
    this.mountDebug(client);
    this.notifySubscribers();
  }
  /**
   * Notify all subscribers of changes to the client manager state.
   */


  notifySubscribers() {
    const arg = this.getState();
    this.subscribers.forEach(cb => {
      cb(arg);
    });
  }
  /**
   * Get the client manager state.
   */


  getState() {
    return {
      client: this.currentClient,
      debuggableClients: this.getDebuggableClients()
    };
  }
  /**
   * Get an array of the registered clients that haven’t disabled the debug panel.
   */


  getDebuggableClients() {
    return [...this.clients.values()].filter(client => client.debugOpt !== false);
  }
  /**
   * Mount the debug panel using the passed client.
   */


  mountDebug(client) {
    if (client.debugOpt === false || this.debugPanel !== null || typeof document === 'undefined') {
      return;
    }

    let DebugImpl;
    let target = document.body;

    if ("development" !== 'production') {
      DebugImpl = _DebugBa7187a.D;
    }

    if (client.debugOpt && client.debugOpt !== true) {
      DebugImpl = client.debugOpt.impl || DebugImpl;
      target = client.debugOpt.target || target;
    }

    if (DebugImpl) {
      this.currentClient = client;
      this.debugPanel = new DebugImpl({
        target,
        props: {
          clientManager: this
        }
      });
    }
  }
  /**
   * Unmount the debug panel.
   */


  unmountDebug() {
    this.debugPanel.$destroy();
    this.debugPanel = null;
    this.currentClient = null;
  }

}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Global client manager instance that all clients register with.
 */


const GlobalClientManager = new ClientManager();
/**
 * Standardise the passed playerID, using currentPlayer if appropriate.
 */

function assumedPlayerID(playerID, store, multiplayer) {
  // In singleplayer mode, if the client does not have a playerID
  // associated with it, we attach the currentPlayer as playerID.
  if (!multiplayer && (playerID === null || playerID === undefined)) {
    const state = store.getState();
    playerID = state.ctx.currentPlayer;
  }

  return playerID;
}
/**
 * createDispatchers
 *
 * Create action dispatcher wrappers with bound playerID and credentials
 */


function createDispatchers(storeActionType, innerActionNames, store, playerID, credentials, multiplayer) {
  return innerActionNames.reduce((dispatchers, name) => {
    dispatchers[name] = function (...args) {
      store.dispatch(_turnOrder7578f7f.A[storeActionType](name, args, assumedPlayerID(playerID, store, multiplayer), credentials));
    };

    return dispatchers;
  }, {});
} // Creates a set of dispatchers to make moves.


const createMoveDispatchers = createDispatchers.bind(null, 'makeMove'); // Creates a set of dispatchers to dispatch game flow events.

const createEventDispatchers = createDispatchers.bind(null, 'gameEvent'); // Creates a set of dispatchers to dispatch actions to plugins.

const createPluginDispatchers = createDispatchers.bind(null, 'plugin');
/**
 * Implementation of Client (see below).
 */

class _ClientImpl {
  constructor({
    game,
    debug,
    numPlayers,
    multiplayer,
    matchID: matchID,
    playerID,
    credentials,
    enhancer
  }) {
    this.game = (0, _reducerEf40323d.P)(game);
    this.playerID = playerID;
    this.matchID = matchID;
    this.credentials = credentials;
    this.multiplayer = multiplayer;
    this.debugOpt = debug;
    this.manager = GlobalClientManager;
    this.gameStateOverride = null;
    this.subscribers = {};
    this._running = false;
    this.reducer = (0, _reducerEf40323d.C)({
      game: this.game,
      isClient: multiplayer !== undefined
    });
    this.initialState = null;

    if (!multiplayer) {
      this.initialState = (0, _initializeFf341f.I)({
        game: this.game,
        numPlayers
      });
    }

    this.reset = () => {
      this.store.dispatch((0, _turnOrder7578f7f.r)(this.initialState));
    };

    this.undo = () => {
      const undo$1 = (0, _turnOrder7578f7f.u)(assumedPlayerID(this.playerID, this.store, this.multiplayer), this.credentials);
      this.store.dispatch(undo$1);
    };

    this.redo = () => {
      const redo$1 = (0, _turnOrder7578f7f.t)(assumedPlayerID(this.playerID, this.store, this.multiplayer), this.credentials);
      this.store.dispatch(redo$1);
    };

    this.log = [];
    /**
     * Middleware that manages the log object.
     * Reducers generate deltalogs, which are log events
     * that are the result of application of a single action.
     * The master may also send back a deltalog or the entire
     * log depending on the type of request.
     * The middleware below takes care of all these cases while
     * managing the log object.
     */

    const LogMiddleware = store => next => action => {
      const result = next(action);
      const state = store.getState();

      switch (action.type) {
        case _turnOrder7578f7f.M:
        case _turnOrder7578f7f.G:
        case _turnOrder7578f7f.l:
        case _turnOrder7578f7f.m:
          {
            const deltalog = state.deltalog;
            this.log = [...this.log, ...deltalog];
            break;
          }

        case _turnOrder7578f7f.R:
          {
            this.log = [];
            break;
          }

        case _turnOrder7578f7f.j:
          {
            let id = -1;

            if (this.log.length > 0) {
              id = this.log[this.log.length - 1]._stateID;
            }

            let deltalog = action.deltalog || []; // Filter out actions that are already present
            // in the current log. This may occur when the
            // client adds an entry to the log followed by
            // the update from the master here.

            deltalog = deltalog.filter(l => l._stateID > id);
            this.log = [...this.log, ...deltalog];
            break;
          }

        case _turnOrder7578f7f.k:
          {
            this.initialState = action.initialState;
            this.log = action.log || [];
            break;
          }
      }

      return result;
    };
    /**
     * Middleware that intercepts actions and sends them to the master,
     * which keeps the authoritative version of the state.
     */


    const TransportMiddleware = store => next => action => {
      const baseState = store.getState();
      const result = next(action);

      if (!('clientOnly' in action)) {
        this.transport.onAction(baseState, action);
      }

      return result;
    };
    /**
     * Middleware that intercepts actions and invokes the subscription callback.
     */


    const SubscriptionMiddleware = () => next => action => {
      const result = next(action);
      this.notifySubscribers();
      return result;
    };

    if (enhancer !== undefined) {
      enhancer = (0, _redux.compose)((0, _redux.applyMiddleware)(SubscriptionMiddleware, TransportMiddleware, LogMiddleware), enhancer);
    } else {
      enhancer = (0, _redux.applyMiddleware)(SubscriptionMiddleware, TransportMiddleware, LogMiddleware);
    }

    this.store = (0, _redux.createStore)(this.reducer, this.initialState, enhancer);
    this.transport = {
      isConnected: true,
      onAction: () => {},
      subscribe: () => {},
      subscribeMatchData: () => {},
      connect: () => {},
      disconnect: () => {},
      updateMatchID: () => {},
      updatePlayerID: () => {}
    };

    if (multiplayer) {
      // typeof multiplayer is 'function'
      this.transport = multiplayer({
        gameKey: game,
        game: this.game,
        store: this.store,
        matchID,
        playerID,
        gameName: this.game.name,
        numPlayers
      });
    }

    this.createDispatchers();
    this.transport.subscribeMatchData(metadata => {
      this.matchData = metadata;
      this.notifySubscribers();
    });
  }

  notifySubscribers() {
    Object.values(this.subscribers).forEach(fn => fn(this.getState()));
  }

  overrideGameState(state) {
    this.gameStateOverride = state;
    this.notifySubscribers();
  }

  start() {
    this.transport.connect();
    this._running = true;
    this.manager.register(this);
  }

  stop() {
    this.transport.disconnect();
    this._running = false;
    this.manager.unregister(this);
  }

  subscribe(fn) {
    const id = Object.keys(this.subscribers).length;
    this.subscribers[id] = fn;
    this.transport.subscribe(() => this.notifySubscribers());

    if (this._running || !this.multiplayer) {
      fn(this.getState());
    } // Return a handle that allows the caller to unsubscribe.


    return () => {
      delete this.subscribers[id];
    };
  }

  getInitialState() {
    return this.initialState;
  }

  getState() {
    let state = this.store.getState();

    if (this.gameStateOverride !== null) {
      state = this.gameStateOverride;
    } // This is the state before a sync with the game master.


    if (state === null) {
      return state;
    } // isActive.


    let isActive = true;
    const isPlayerActive = this.game.flow.isPlayerActive(state.G, state.ctx, this.playerID);

    if (this.multiplayer && !isPlayerActive) {
      isActive = false;
    }

    if (!this.multiplayer && this.playerID !== null && this.playerID !== undefined && !isPlayerActive) {
      isActive = false;
    }

    if (state.ctx.gameover !== undefined) {
      isActive = false;
    } // Secrets are normally stripped on the server,
    // but we also strip them here so that game developers
    // can see their effects while prototyping.
    // Do not strip again if this is a multiplayer game
    // since the server has already stripped secret info. (issue #818)


    const G = this.multiplayer ? state.G : this.game.playerView(state.G, state.ctx, this.playerID); // Combine into return value.

    return { ...state,
      G,
      log: this.log,
      isActive,
      isConnected: this.transport.isConnected
    };
  }

  createDispatchers() {
    this.moves = createMoveDispatchers(this.game.moveNames, this.store, this.playerID, this.credentials, this.multiplayer);
    this.events = createEventDispatchers(this.game.flow.enabledEventNames, this.store, this.playerID, this.credentials, this.multiplayer);
    this.plugins = createPluginDispatchers(this.game.pluginNames, this.store, this.playerID, this.credentials, this.multiplayer);
  }

  updatePlayerID(playerID) {
    this.playerID = playerID;
    this.createDispatchers();
    this.transport.updatePlayerID(playerID);
    this.notifySubscribers();
  }

  updateMatchID(matchID) {
    this.matchID = matchID;
    this.createDispatchers();
    this.transport.updateMatchID(matchID);
    this.notifySubscribers();
  }

  updateCredentials(credentials) {
    this.credentials = credentials;
    this.createDispatchers();
    this.notifySubscribers();
  }

}
/**
 * Client
 *
 * boardgame.io JS client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} matchID - The matchID that you want to connect to.
 * @param {...object} playerID - The playerID associated with this client.
 * @param {...string} credentials - The authentication credentials associated with this client.
 *
 * Returns:
 *   A JS object that provides an API to interact with the
 *   game by dispatching moves and events.
 */


function Client(opts) {
  return new _ClientImpl(opts);
}
},{"./Debug-ba7187a3.js":"node_modules/boardgame.io/dist/esm/Debug-ba7187a3.js","redux":"node_modules/redux/es/redux.js","./turn-order-7578f7f3.js":"node_modules/boardgame.io/dist/esm/turn-order-7578f7f3.js","./reducer-ef40323d.js":"node_modules/boardgame.io/dist/esm/reducer-ef40323d.js","./initialize-ff341f37.js":"node_modules/boardgame.io/dist/esm/initialize-ff341f37.js"}],"node_modules/boardgame.io/dist/esm/client-61b8ced8.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.L = void 0;

const assertString = (str, label) => {
  if (!str || typeof str !== 'string') {
    throw new Error("Expected ".concat(label, " string, got \"").concat(str, "\"."));
  }
};

const assertGameName = name => assertString(name, 'game name');

const assertMatchID = id => assertString(id, 'match ID');

const validateBody = (body, schema) => {
  if (!body) throw new Error("Expected body, got \u201C".concat(body, "\u201D."));

  for (const key in schema) {
    const type = schema[key];
    const received = body[key];

    if (typeof received !== type) {
      throw new Error("Expected body.".concat(key, " to be of type ").concat(type, ", got \u201C").concat(received, "\u201D."));
    }
  }
};
/**
 * Create a boardgame.io Lobby API client.
 * @param server The API’s base URL, e.g. `http://localhost:8000`.
 */


class LobbyClient {
  constructor({
    server = ''
  } = {}) {
    // strip trailing slash if passed
    this.server = server.replace(/\/$/, '');
  }

  async request(route, init) {
    const response = await fetch(this.server + route, init);
    if (!response.ok) throw new Error("HTTP status ".concat(response.status));
    return response.json();
  }

  async post(route, opts) {
    let init = {
      method: 'post',
      body: JSON.stringify(opts.body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (opts.init) init = { ...init,
      ...opts.init,
      headers: { ...init.headers,
        ...opts.init.headers
      }
    };
    return this.request(route, init);
  }
  /**
   * Get a list of the game names available on this server.
   * @param  init Optional RequestInit interface to override defaults.
   * @return Array of game names.
   *
   * @example
   * lobbyClient.listGames()
   *   .then(console.log); // => ['chess', 'tic-tac-toe']
   */


  async listGames(init) {
    return this.request('/games', init);
  }
  /**
   * Get a list of the matches for a specific game type on the server.
   * @param  gameName The game to list for, e.g. 'tic-tac-toe'.
   * @param  where    Options to filter matches by update time or gameover state
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Array of match metadata objects.
   *
   * @example
   * lobbyClient.listMatches('tic-tac-toe', where: { isGameover: false })
   *   .then(data => console.log(data.matches));
   * // => [
   * //   {
   * //     matchID: 'xyz',
   * //     gameName: 'tic-tac-toe',
   * //     players: [{ id: 0, name: 'Alice' }, { id: 1 }]
   * //   },
   * //   ...
   * // ]
   */


  async listMatches(gameName, where, init) {
    assertGameName(gameName);
    let query = '';

    if (where) {
      const queries = [];
      const {
        isGameover,
        updatedBefore,
        updatedAfter
      } = where;
      if (isGameover !== undefined) queries.push("isGameover=".concat(isGameover));
      if (updatedBefore) queries.push("updatedBefore=".concat(updatedBefore));
      if (updatedAfter) queries.push("updatedAfter=".concat(updatedAfter));
      if (queries.length) query = '?' + queries.join('&');
    }

    return this.request("/games/".concat(gameName).concat(query), init);
  }
  /**
   * Get metadata for a specific match.
   * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to fetch.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return A match metadata object.
   *
   * @example
   * lobbyClient.getMatch('tic-tac-toe', 'xyz').then(console.log);
   * // => {
   * //   matchID: 'xyz',
   * //   gameName: 'tic-tac-toe',
   * //   players: [{ id: 0, name: 'Alice' }, { id: 1 }]
   * // }
   */


  async getMatch(gameName, matchID, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    return this.request("/games/".concat(gameName, "/").concat(matchID), init);
  }
  /**
   * Create a new match for a specific game type.
   * @param  gameName The game to create a match for, e.g. 'tic-tac-toe'.
   * @param  body     Options required to configure match creation.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return An object containing the created `matchID`.
   *
   * @example
   * lobbyClient.createMatch('tic-tac-toe', { numPlayers: 2 })
   *   .then(console.log);
   * // => { matchID: 'xyz' }
   */


  async createMatch(gameName, body, init) {
    assertGameName(gameName);
    validateBody(body, {
      numPlayers: 'number'
    });
    return this.post("/games/".concat(gameName, "/create"), {
      body,
      init
    });
  }
  /**
   * Join a match using its matchID.
   * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to join.
   * @param  body     Options required to join match.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Object containing `playerCredentials` for the player who joined.
   *
   * @example
   * lobbyClient.joinMatch('tic-tac-toe', 'xyz', {
   *   playerID: '1',
   *   playerName: 'Bob',
   * }).then(console.log);
   * // => { playerCredentials: 'random-string' }
   */


  async joinMatch(gameName, matchID, body, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    validateBody(body, {
      playerID: 'string',
      playerName: 'string'
    });
    return this.post("/games/".concat(gameName, "/").concat(matchID, "/join"), {
      body,
      init
    });
  }
  /**
   * Leave a previously joined match.
   * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to leave.
   * @param  body     Options required to leave match.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Promise resolves if successful.
   *
   * @example
   * lobbyClient.leaveMatch('tic-tac-toe', 'xyz', {
   *   playerID: '1',
   *   credentials: 'credentials-returned-when-joining',
   * })
   *   .then(() => console.log('Left match.'))
   *   .catch(error => console.error('Error leaving match', error));
   */


  async leaveMatch(gameName, matchID, body, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    validateBody(body, {
      playerID: 'string',
      credentials: 'string'
    });
    await this.post("/games/".concat(gameName, "/").concat(matchID, "/leave"), {
      body,
      init
    });
  }
  /**
   * Update a player’s name or custom metadata.
   * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to update.
   * @param  body     Options required to update player.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Promise resolves if successful.
   *
   * @example
   * lobbyClient.updatePlayer('tic-tac-toe', 'xyz', {
   *   playerID: '0',
   *   credentials: 'credentials-returned-when-joining',
   *   newName: 'Al',
   * })
   *   .then(() => console.log('Updated player data.'))
   *   .catch(error => console.error('Error updating data', error));
   */


  async updatePlayer(gameName, matchID, body, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    validateBody(body, {
      playerID: 'string',
      credentials: 'string'
    });
    await this.post("/games/".concat(gameName, "/").concat(matchID, "/update"), {
      body,
      init
    });
  }
  /**
   * Create a new match based on the configuration of the current match.
   * @param  gameName The match’s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to play again.
   * @param  body     Options required to configure match.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Object containing `nextMatchID`.
   *
   * @example
   * lobbyClient.playAgain('tic-tac-toe', 'xyz', {
   *   playerID: '0',
   *   credentials: 'credentials-returned-when-joining',
   * })
   *   .then(({ nextMatchID }) => {
   *     return lobbyClient.joinMatch('tic-tac-toe', nextMatchID, {
   *       playerID: '0',
   *       playerName: 'Al',
   *     })
   *   })
   *   .then({ playerCredentials } => {
   *     console.log(playerCredentials);
   *   })
   *   .catch(console.error);
   */


  async playAgain(gameName, matchID, body, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    validateBody(body, {
      playerID: 'string',
      credentials: 'string'
    });
    return this.post("/games/".concat(gameName, "/").concat(matchID, "/playAgain"), {
      body,
      init
    });
  }

}

exports.L = LobbyClient;
},{}],"node_modules/boardgame.io/dist/esm/client.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Client", {
  enumerable: true,
  get: function () {
    return _clientB699de9a.C;
  }
});
Object.defineProperty(exports, "LobbyClient", {
  enumerable: true,
  get: function () {
    return _client61b8ced.L;
  }
});

require("./Debug-ba7187a3.js");

require("redux");

require("./turn-order-7578f7f3.js");

require("immer");

require("./reducer-ef40323d.js");

require("./initialize-ff341f37.js");

require("flatted");

require("./ai-4091d3f9.js");

var _clientB699de9a = require("./client-b699de9a.js");

var _client61b8ced = require("./client-61b8ced8.js");
},{"./Debug-ba7187a3.js":"node_modules/boardgame.io/dist/esm/Debug-ba7187a3.js","redux":"node_modules/redux/es/redux.js","./turn-order-7578f7f3.js":"node_modules/boardgame.io/dist/esm/turn-order-7578f7f3.js","immer":"node_modules/immer/dist/immer.esm.js","./reducer-ef40323d.js":"node_modules/boardgame.io/dist/esm/reducer-ef40323d.js","./initialize-ff341f37.js":"node_modules/boardgame.io/dist/esm/initialize-ff341f37.js","flatted":"node_modules/flatted/esm/index.js","./ai-4091d3f9.js":"node_modules/boardgame.io/dist/esm/ai-4091d3f9.js","./client-b699de9a.js":"node_modules/boardgame.io/dist/esm/client-b699de9a.js","./client-61b8ced8.js":"node_modules/boardgame.io/dist/esm/client-61b8ced8.js"}],"constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NUM_RESOURCES_END = exports.LARGEST_HERD_BONUS = exports.MAX_HAND_SIZE = exports.MIN_RARE_TRADE = exports.COMMON_RESOURCES = exports.RARE_RESOURCES = exports.RESOURCES = exports.ACTIONS = exports.Modes = void 0;
const Modes = Object.freeze({
  TRADE: 0,
  TAKE_ONE: 1,
  TAKE_MANY: 2,
  TAKE_CAMELS: 3,
  NONE: -1
});
exports.Modes = Modes;
const ACTIONS = Object.freeze({
  trade: "trade",
  takeOne: "takeOne",
  takeCamels: "takeCamels",
  takeMany: "takeMany"
});
exports.ACTIONS = ACTIONS;
const RESOURCES = Object.freeze({
  camel: "CAMEL",
  gold: "GOLD",
  silver: "SILVER",
  diamond: "DIAMOND",
  silk: "SILK",
  leather: "LEATHER",
  spices: "SPICES"
});
exports.RESOURCES = RESOURCES;
const RARE_RESOURCES = [RESOURCES.diamond, RESOURCES.gold, RESOURCES.silver];
exports.RARE_RESOURCES = RARE_RESOURCES;
const COMMON_RESOURCES = [RESOURCES.silk, RESOURCES.leather, RESOURCES.spices];
exports.COMMON_RESOURCES = COMMON_RESOURCES;
const MIN_RARE_TRADE = 2;
exports.MIN_RARE_TRADE = MIN_RARE_TRADE;
const MAX_HAND_SIZE = 7;
exports.MAX_HAND_SIZE = MAX_HAND_SIZE;
const LARGEST_HERD_BONUS = 5; // Number of resources present when it ends the game

exports.LARGEST_HERD_BONUS = LARGEST_HERD_BONUS;
const NUM_RESOURCES_END = 3;
exports.NUM_RESOURCES_END = NUM_RESOURCES_END;
},{}],"node_modules/boardgame.io/dist/esm/core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ActivePlayers", {
  enumerable: true,
  get: function () {
    return _turnOrder7578f7f.v;
  }
});
Object.defineProperty(exports, "INVALID_MOVE", {
  enumerable: true,
  get: function () {
    return _turnOrder7578f7f.h;
  }
});
Object.defineProperty(exports, "Stage", {
  enumerable: true,
  get: function () {
    return _turnOrder7578f7f.S;
  }
});
Object.defineProperty(exports, "TurnOrder", {
  enumerable: true,
  get: function () {
    return _turnOrder7578f7f.T;
  }
});
exports.PlayerView = void 0;

var _turnOrder7578f7f = require("./turn-order-7578f7f3.js");

require("immer");

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * PlayerView reducers.
 */
const PlayerView = {
  /**
   * STRIP_SECRETS
   *
   * Reducer which removes a key named `secret` and
   * removes all the keys in `players`, except for the one
   * corresponding to the current playerID.
   */
  STRIP_SECRETS: (G, ctx, playerID) => {
    let r = { ...G
    };

    if (r.secret !== undefined) {
      delete r.secret;
    }

    if (r.players) {
      r.players = {
        [playerID]: r.players[playerID]
      };
    }

    return r;
  }
};
exports.PlayerView = PlayerView;
},{"./turn-order-7578f7f3.js":"node_modules/boardgame.io/dist/esm/turn-order-7578f7f3.js","immer":"node_modules/immer/dist/immer.esm.js"}],"config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.APP_PRODUCTION = exports.WEB_SERVER_URL = exports.GAME_SERVER_URL = exports.GAME_SERVER_PORT = exports.GAME_NAME = void 0;
const GAME_NAME = "udaipur";
exports.GAME_NAME = GAME_NAME;
const GAME_SERVER_PORT = 8000;
exports.GAME_SERVER_PORT = GAME_SERVER_PORT;
const GAME_SERVER_URL = "http://localhost:".concat(GAME_SERVER_PORT);
exports.GAME_SERVER_URL = GAME_SERVER_URL;
const WEB_SERVER_URL = "http://localhost:8000";
exports.WEB_SERVER_URL = WEB_SERVER_URL;
const APP_PRODUCTION = true;
exports.APP_PRODUCTION = APP_PRODUCTION;
},{}],"src/moveValidation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveValidate = exports.checkPlayerHand = void 0;

var _constants = require("../constants");

//import {istrump} from "./Game";
const checkPlayerHand = hand => {
  const goods = hand.filter(card => card.type !== _constants.RESOURCES.camel);

  if (goods.length > _constants.MAX_HAND_SIZE) {
    return false;
  } else {
    return true;
  }
};

exports.checkPlayerHand = checkPlayerHand;

const result = (valid, message) => {
  if (!valid) {
    console.log("Invalid move : ", message);
  }

  return {
    valid: valid,
    message: message
  };
};
/**
 *  MoveValidate is an object
 *  containing a set of independent, stateless functions
 *  for validating moves.
 *  This validation aims to separate a large chunk of validation
 *  that is required to be done at both the server side and the client side
 *
 *  IDEALLY, these validation functions should not contain any secrets, so
 *  they should be written to be able to function on the Stripped PlayerView
 */


const MoveValidate = {
  playCard: (G, ctx, id) => {
    const p = ctx.currentPlayer;
    let cards = G.players[p].cards.slice();
    let filteredhand = cards.filter(card => card.id === id);

    if (cards.filter(card => card.id === id).length != 1) {
      return result(false, "That isn't a card in your hand!");
    }

    const istrump = card => {
      if (card.suit === G.hand.trumpsuit || card.id === "AH") {
        return true;
      } else {
        return false;
      }
    };

    let cardToPlay = cards.filter(card => card.id === id)[0];

    if (G.trick.cards_played > 0) {
      if (G.trick.trumpled && !istrump(cardToPlay)) {
        if (cards.filter(card => istrump(card) && (card.ranktrump > G.trick.ranktrumpled || card.ranktrump > 3)).length > 0) {
          return result(false, "Trump was lead. You need to play trump.");
        }
      }

      if (!G.trick.trumpled && !istrump(cardToPlay) && cardToPlay.suit != G.trick.suitled) {
        if (cards.filter(card => card.suit === G.trick.suitled).length > 0) {
          return result(false, "You need to follow suit or play trump.");
        }
      }
    }

    return result(true, "ok");
    /*
    if (typeof id !== "number") {
    return result(false, "Select 1 and only 1 card for takeOne");
    }
    const p = ctx.currentPlayer;
    //Using slice to return new arrays rather than references
    let board = G.board.slice();
    let cardToTake = board.filter((card) => card.id === id)[0];
    if (!cardToTake) {
    return result(false, "Card with that ID does not exist!");
    }
    if (cardToTake.type === RESOURCES.camel) {
    return result(false, "You can't take a camel!");
    }
    let newPlayerCards = G.players[p].cards.slice();
    newPlayerCards.push(cardToTake);
    if (checkPlayerHand(newPlayerCards)) {
    return result(true, "ok");
    } else {
    return result(false, "Too many cards in your hand for doing that move!");
    }*/
  },
  Bid: (G, ctx, amount) => {
    const p = ctx.currentPlayer;

    if (![20, 25, 30, "pass", "hold"].includes(amount)) {
      return result(false, "That is not a valid bid");
    }

    if (amount === "hold" && p != G.dealer) {
      return result(false, "Only the dealer can hold");
    }

    if (amount != "hold" && amount <= G.hand.highest_bid_yet) {
      return result(false, "You have to bid more than the previous player");
    }

    return result(true, "ok");
  },
  discard: (G, ctx, cardsToDiscard) => {
    const p = ctx.currentPlayer;
    const l = cardsToDiscard.length;
    let cards = G.players[p].cards.slice();

    for (let i = 0; i < l; i++) {
      if (cards.filter(card => card.id === cardsToDiscard[i]).length != 1) {
        return result(false, "You can only discard cards in your hand");
      }
    }

    return result(true, "ok");
  },
  takeOne: (G, ctx, id) => {
    if (typeof id !== "number") {
      return result(false, "Select 1 and only 1 card for takeOne");
    }

    const p = ctx.currentPlayer; //Using slice to return new arrays rather than references

    let board = G.board.slice();
    let cardToTake = board.filter(card => card.id === id)[0];

    if (!cardToTake) {
      return result(false, "Card with that ID does not exist!");
    }

    if (cardToTake.type === _constants.RESOURCES.camel) {
      return result(false, "You can't take a camel!");
    }

    let newPlayerCards = G.players[p].cards.slice();
    newPlayerCards.push(cardToTake);

    if (checkPlayerHand(newPlayerCards)) {
      return result(true, "ok");
    } else {
      return result(false, "Too many cards in your hand for doing that move!");
    }
  },
  takeMany: (G, ctx, takeIDs, replaceIDs) => {
    const p = ctx.currentPlayer;

    if (takeIDs.length !== replaceIDs.length) {
      return result(false, "You have to replace as many as you take!");
    }

    if (takeIDs.length <= 1) {
      return result(false, "You have to take atleast 2 cards with replacement");
    } // Cards to remove from the deck


    const cardsToRemove = G.board.filter(card => takeIDs.includes(card.id) && card.type !== _constants.RESOURCES.camel //Cannot remove camels from the deck
    );

    if (cardsToRemove.length !== takeIDs.length) {
      return result(false, "Length mismatch(Perhaps camels were attempted to be removed from the board!)");
    }

    let newPlayerCards = G.players[p].cards.filter(card => !replaceIDs.includes(card.id));
    newPlayerCards.push(...cardsToRemove);

    if (checkPlayerHand(newPlayerCards)) {
      return result(true, "ok");
    } else {
      return result(false, "Too many cards in your hand for doing that move!");
    }
  },
  trade: (G, ctx, tradeIDs) => {
    const p = ctx.currentPlayer;
    const cardsToTrade = G.players[p].cards.filter(card => tradeIDs.includes(card.id));

    if (cardsToTrade.length === 0) {
      return result(false, "Select atleast one card to trade");
    }

    const cardType = cardsToTrade[0].type;

    if (!cardsToTrade.every(card => card.type === cardType)) {
      return result(false, "You can only trade cards of a one resource in a turn");
    }

    if (cardType === _constants.RESOURCES.camel) {
      return result(false, "You cannot trade camels!");
    }

    if (cardsToTrade.length !== tradeIDs.length) {
      return result(false, "All cards traded have to be of the same resource!");
    }

    if (_constants.RARE_RESOURCES.includes(cardType) && cardsToTrade.length < _constants.MIN_RARE_TRADE) {
      return result(false, "Cannot trade less than {0} cards for a rare resource!".replace("{0}", _constants.MIN_RARE_TRADE));
    }

    if (G.tokens[cardType].length < cardsToTrade.length) {
      return result(false, "Not enough tokens in the market to trade that resource!");
    }

    return result(true, "OK");
  },
  takeCamels: (G, ctx) => {
    let camels = G.board.filter(card => card.type === _constants.RESOURCES.camel);
    const numCamels = camels.length;

    if (numCamels === 0) {
      return result(false, "No camels on the board! Can't make that move");
    }

    return result(true, "OK");
  }
};
exports.MoveValidate = MoveValidate;
},{"../constants":"constants.js"}],"src/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TicTacToe = void 0;

var _constants = require("../constants");

var _core = require("boardgame.io/core");

var _config = require("../config.js");

var _moveValidation = require("./moveValidation");

//Defining some Game constants here
let DECK_CONTENTS = {};
DECK_CONTENTS[_constants.RESOURCES.diamond] = 6;
DECK_CONTENTS[_constants.RESOURCES.gold] = 6;
DECK_CONTENTS[_constants.RESOURCES.silver] = 6;
DECK_CONTENTS[_constants.RESOURCES.silk] = 8;
DECK_CONTENTS[_constants.RESOURCES.spices] = 8;
DECK_CONTENTS[_constants.RESOURCES.leather] = 10;
DECK_CONTENTS[_constants.RESOURCES.camel] = 11;
DECK_CONTENTS = Object.freeze(DECK_CONTENTS);

const Error = str => {
  console.log("ERROR: " + str);
};

const isPass = bid => {
  if (bid === "pass") {
    return 1;
  } else {
    return 0;
  }
};

const shuffleDeck = deck => {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
};

const getWinner = G => {
  let p0Score = G.players[0].trade_tokens.reduce((total, token) => {
    return total + token.value;
  }, 0);
  let p1Score = G.players[1].trade_tokens.reduce((total, token) => {
    return total + token.value;
  }, 0);
  let p0Camels = G.players[0].cards.filter(card => card.type === _constants.RESOURCES.camel).length;
  let p1Camels = G.players[1].cards.filter(card => card.type === _constants.RESOURCES.camel).length; // Give out token for most camels

  if (p0Camels > p1Camels) {
    p0Score += _constants.LARGEST_HERD_BONUS;
  } else if (p1Camels > p0Camels) {
    p1Score += _constants.LARGEST_HERD_BONUS;
  } else {//TODO: Deal with a tie
  }

  p0Score += G.players[0].T3 * 4;
  p0Score += G.players[0].T4 * 6;
  p0Score += G.players[0].T5 * 8;
  p1Score += G.players[1].T3 * 4;
  p1Score += G.players[1].T4 * 6;
  p1Score += G.players[1].T5 * 8;
  let winner = 0;

  if (p0Score >= p1Score) {
    winner = 0;
  } else {
    winner = 1;
  }

  return {
    winner: winner,
    scores: {
      0: p0Score,
      1: p1Score
    }
  };
};

function Bid(G, ctx, amount) {
  const validBid = _moveValidation.MoveValidate.Bid(G, ctx, amount);

  if (!validBid.valid) {
    return Error(validBid.message);
  }

  G.hand.bidding[ctx.currentPlayer] = amount;

  if (amount != "pass") {
    G.hand.highest_bid_yet = amount;

    if (amount != "hold") {
      G.hand.highest_bid_value_yet = amount;
    }

    G.hand.highest_bidder_yet = ctx.currentPlayer;
  }

  ctx.events.endTurn();
}

function scoreTrick(G, ctx) {
  //identify winning partnership
  if (G.trick.bestplayerthistrick === '0' || G.trick.bestplayerthistrick === '2') {
    G.trick.winningpartnership = 0;
  } else {
    G.trick.winningpartnership = 1;
  }

  G.hand.score[G.trick.winningpartnership] += 5; //Check if this was the last trick of the hand

  if (G.hand.score[0] + G.hand.score[1] === 25) {
    ctx.events.setPhase("handscoring");
  } //clear the table for next trick


  G.table = {
    0: [],
    1: [],
    2: [],
    3: []
  }; // set nexttolead before clearing trick state

  let nexttolead = G.trick.bestplayerthistrick;
  G.trick = {
    cards_played: 0,
    bestcardthistrick: [],
    bestplayerthistrick: [],
    winningpartnership: [],
    suitled: [],
    trumpled: [],
    ranktrumpled: []
  }; //go to next trick

  G.hand.nexttoplay = nexttolead;
  ctx.events.endPhase();
}

function scoreHand(G, ctx) {
  //5 points for highest trump
  if (G.hand.highest_trump_yet_player === '0' || G.hand.highest_trump_yet_player === '2') {
    G.hand.score[0] += 5;
  } else {
    G.hand.score[1] += 5;
  } //update the game score
  //check if someone went 25 without the 5
  //score declaring partnership
  //check if the declaring partnership didn't make their bid


  if (G.hand.score[G.hand.declaringpartnership] < G.hand.highest_bid_value_yet) {
    G.score[G.hand.declaringpartnership] -= G.hand.highest_bid_value_yet;
  } else {
    if (G.hand.highest_bid_value_yet === 30) {
      G.score[G.hand.declaringpartnership] += 60;
    } else {
      G.score[G.hand.declaringpartnership] += G.hand.score[G.hand.declaringpartnership];
    }
  } //score defending partnership


  if (G.score[G.hand.defendingpartnership] < 100) {
    G.score[G.hand.defendingpartnership] += G.hand.score[G.hand.defendingpartnership];
  } //deal a new hand


  G.dealer = (G.dealer + 1) % ctx.numPlayers;
  G.under_the_gun = (G.under_the + 1) % ctx.numPlayers;
  ctx.events.endPhase();
}

function playCard(G, ctx, id) {
  const istrump = card => {
    if (card.suit === G.hand.trumpsuit || card.id === "AH") {
      return true;
    } else {
      return false;
    }
  };

  const nextCardBetter = (card1, card2) => {
    if (istrump(card1) && !istrump(card2)) {
      return false;
    } else if (!istrump(card1) && istrump(card2)) {
      return true;
    } else if (istrump(card1) && istrump(card2)) {
      if (card1.ranktrump < card2.ranktrump) {
        return false;
      } else {
        return true;
      }
    } else if (!istrump(card1) && !istrump(card2)) {
      if (card1.suit === G.trick.suitled && card2.suit != G.trick.suitled) {
        return false;
      } else if (card1.suit != G.trick.suitled && card2.suit === G.trick.suitled) {
        return true;
      } else if (card1.suit === G.trick.suitled && card2.suit === G.trick.suitled) {
        if (card1.ranknontrump < card2.ranknontrump) {
          return false;
        } else {
          return true;
        }
      } else if (card1.suit != G.trick.suitled && card2.suit != G.trick.suitled) {
        return "incomparable";
      }
    }
  }; //put the card into play area
  //remove the card from your hand


  const validMove = _moveValidation.MoveValidate.playCard(G, ctx, id); //  console.log(validMove.valid)


  if (!validMove.valid) {
    return Error(validMove.message);
  }
  /*      //return Error(validMove.message) */


  const p = ctx.currentPlayer;
  let cards = G.players[p].cards.slice();
  let cardToPlay = cards.filter(card => card.id === id)[0];
  cards = cards.filter(card => card.id !== cardToPlay.id);
  G.players[p].cards = cards;
  G.table[p] = cardToPlay; //keep track of highest trump yet

  if (istrump(cardToPlay)) {
    if (G.hand.highest_trump_yet.length === 0) {
      G.hand.highest_trump_yet = cardToPlay.ranktrump;
      G.hand.highest_trump_yet_player = p;
    } else {
      if (cardToPlay.ranktrump < G.hand.highest_trump_yet) {
        G.hand.highest_trump_yet = cardToPlay.ranktrump;
        G.hand.highest_trump_yet_player = p;
      }
    }
  } //keep track of suit led and rank if trump (for reneging)


  if (G.trick.cards_played === 0) {
    G.trick.suitled = cardToPlay.suit;
    G.trick.trumpled = istrump(cardToPlay);

    if (G.trick.trumpled) {
      G.trick.ranktrumpled = cardToPlay.ranktrump;
    }
  }

  G.trick.cards_played++; //track best card played

  if (G.trick.cards_played === 1) {
    G.trick.bestcardthistrick = cardToPlay;
    G.trick.bestplayerthistrick = p;
  } else {
    //  if ( cardToPlay.id > G.trick.bestcardthistrick.id ) {
    if (nextCardBetter(G.trick.bestcardthistrick, cardToPlay)) {
      G.trick.bestcardthistrick = cardToPlay;
      G.trick.bestplayerthistrick = p;
    }
  }

  ;

  if (G.trick.cards_played === 4) {
    ctx.events.endPhase();
  } //score the trick

  /*  if (G.trick.cards_played === 4 ) {
      //identify winning partnership
      if (G.trick.bestplayerthistrick === '0' || G.trick.bestplayerthistrick === '2') {
        G.trick.winningpartnership = 0;
      } else {
        G.trick.winningpartnership = 1;
      }
  
      G.hand.score[G.trick.winningpartnership] += 5;
  
      //Check if this was the last trick of the hand
      if (G.hand.score[0] + G.hand.score[1] === 25) {
        //5 points for highest trump
        if (G.hand.highest_trump_yet_player === '0' || G.hand.highest_trump_yet_player === '2') {
          G.hand.score[0] += 5
        } else {
          G.hand.score[1] += 5;
        }
  
        //update the game score
        //check if someone went 25 without the 5
  
        //score declaring partnership
        //check if the declaring partnership didn't make their bid
        if (G.hand.score[G.hand.declaringpartnership] < G.hand.highest_bid_value_yet) {
          G.score[G.hand.declaringpartnership] -= G.hand.highest_bid_value_yet
        } else {
          if (G.hand.highest_bid_value_yet === 30) {
          G.score[G.hand.declaringpartnership] += 60
          } else {
            G.score[G.hand.declaringpartnership] += G.hand.score[G.hand.declaringpartnership]
          }
        }
  
        //score defending partnership
        if (G.score[G.hand.defendingpartnership] < 100) {
          G.score[G.hand.defendingpartnership] += G.hand.score[G.hand.defendingpartnership]
        }
        //deal a new hand
        G.dealer = (G.dealer + 1) % ctx.numPlayers
        G.under_the_gun = (G.under_the + 1) % ctx.numPlayers
        ctx.events.endPhase()
      }
  
      //clear the table for next trick
      G.table = {
        0: [],
        1: [],
        2: [],
        3: []
      };
  
      // set nexttolead before clearing trick state
      let nexttolead = G.trick.bestplayerthistrick
  
      G.trick = {
        cards_played: 0,
        bestcardthistrick: [],
        bestplayerthistrick: [],
        winningpartnership: [],
        suitled: [],
        trumpled: [],
        ranktrumpled: []
      };
  
      //go to next trick
      ctx.events.endTurn({ next: nexttolead });
    }; */


  ctx.events.endTurn();
}

function declareSuit(G, ctx, suit) {
  G.hand.trumpsuit = suit;
  ctx.events.endPhase();
}

function discard(G, ctx, cardsToDiscard) {
  const validDiscard = _moveValidation.MoveValidate.discard(G, ctx, cardsToDiscard);

  if (!validDiscard.valid) {
    return Error(validDiscard.message);
  }

  const p = ctx.currentPlayer;
  const l = cardsToDiscard.length;
  let cards = G.players[p].cards.slice();
  let cardsToKeep = cards.filter(card => !cardsToDiscard.includes(card.id));
  G.players[p].cards = cardsToKeep;

  for (let i = 0; i < l; i++) {
    G.players[p].cards.push(G.deck.pop());
  }

  ctx.events.endTurn();
}
/*const scoreTrick = () => {
G.trick.northsouthscore = 5;
// add 5 points to the winning team score
// identify winning player
// identify highest trump if played
}; */


const std_45s_deck = [{
  id: 'AH',
  ranktrump: 3,
  suit: "Hearts"
}, {
  id: 'KH',
  ranktrump: 4,
  ranknontrump: 1,
  suit: "Hearts"
}, {
  id: 'QH',
  ranktrump: 5,
  ranknontrump: 2,
  suit: "Hearts"
}, {
  id: 'JH',
  ranktrump: 2,
  ranknontrump: 3,
  suit: "Hearts"
}, {
  id: 'TH',
  ranktrump: 6,
  ranknontrump: 4,
  suit: "Hearts"
}, {
  id: '9H',
  ranktrump: 7,
  ranknontrump: 5,
  suit: "Hearts"
}, {
  id: '8H',
  ranktrump: 8,
  ranknontrump: 6,
  suit: "Hearts"
}, {
  id: '7H',
  ranktrump: 9,
  ranknontrump: 7,
  suit: "Hearts"
}, {
  id: '6H',
  ranktrump: 10,
  ranknontrump: 8,
  suit: "Hearts"
}, {
  id: '5H',
  ranktrump: 1,
  ranknontrump: 9,
  suit: "Hearts"
}, {
  id: '4H',
  ranktrump: 11,
  ranknontrump: 10,
  suit: "Hearts"
}, {
  id: '3H',
  ranktrump: 12,
  ranknontrump: 11,
  suit: "Hearts"
}, {
  id: '2H',
  ranktrump: 13,
  ranknontrump: 12,
  suit: "Hearts"
}, {
  id: 'AD',
  ranktrump: 4,
  ranknontrump: 13,
  suit: "Diamonds"
}, {
  id: 'KD',
  ranktrump: 5,
  ranknontrump: 1,
  suit: "Diamonds"
}, {
  id: 'QD',
  ranktrump: 6,
  ranknontrump: 2,
  suit: "Diamonds"
}, {
  id: 'JD',
  ranktrump: 2,
  ranknontrump: 3,
  suit: "Diamonds"
}, {
  id: 'TD',
  ranktrump: 7,
  ranknontrump: 4,
  suit: "Diamonds"
}, {
  id: '9D',
  ranktrump: 8,
  ranknontrump: 5,
  suit: "Diamonds"
}, {
  id: '8D',
  ranktrump: 9,
  ranknontrump: 6,
  suit: "Diamonds"
}, {
  id: '7D',
  ranktrump: 10,
  ranknontrump: 7,
  suit: "Diamonds"
}, {
  id: '6D',
  ranktrump: 11,
  ranknontrump: 8,
  suit: "Diamonds"
}, {
  id: '5D',
  ranktrump: 1,
  ranknontrump: 9,
  suit: "Diamonds"
}, {
  id: '4D',
  ranktrump: 12,
  ranknontrump: 10,
  suit: "Diamonds"
}, {
  id: '3D',
  ranktrump: 13,
  ranknontrump: 11,
  suit: "Diamonds"
}, {
  id: '2D',
  ranktrump: 14,
  ranknontrump: 12,
  suit: "Diamonds"
}, {
  id: 'AS',
  ranktrump: 4,
  ranknontrump: 4,
  suit: "Spades"
}, {
  id: 'KS',
  ranktrump: 5,
  ranknontrump: 1,
  suit: "Spades"
}, {
  id: 'QS',
  ranktrump: 6,
  ranknontrump: 2,
  suit: "Spades"
}, {
  id: 'JS',
  ranktrump: 2,
  ranknontrump: 3,
  suit: "Spades"
}, {
  id: 'TS',
  ranktrump: 14,
  ranknontrump: 13,
  suit: "Spades"
}, {
  id: '9S',
  ranktrump: 13,
  ranknontrump: 12,
  suit: "Spades"
}, {
  id: '8S',
  ranktrump: 12,
  ranknontrump: 11,
  suit: "Spades"
}, {
  id: '7S',
  ranktrump: 11,
  ranknontrump: 10,
  suit: "Spades"
}, {
  id: '6S',
  ranktrump: 10,
  ranknontrump: 9,
  suit: "Spades"
}, {
  id: '5S',
  ranktrump: 1,
  ranknontrump: 8,
  suit: "Spades"
}, {
  id: '4S',
  ranktrump: 9,
  ranknontrump: 7,
  suit: "Spades"
}, {
  id: '3S',
  ranktrump: 8,
  ranknontrump: 6,
  suit: "Spades"
}, {
  id: '2S',
  ranktrump: 7,
  ranknontrump: 5,
  suit: "Spades"
}, {
  id: 'AC',
  ranktrump: 4,
  ranknontrump: 4,
  suit: "Clubs"
}, {
  id: 'KC',
  ranktrump: 5,
  ranknontrump: 1,
  suit: "Clubs"
}, {
  id: 'QC',
  ranktrump: 6,
  ranknontrump: 2,
  suit: "Clubs"
}, {
  id: 'JC',
  ranktrump: 2,
  ranknontrump: 3,
  suit: "Clubs"
}, {
  id: 'TC',
  ranktrump: 14,
  ranknontrump: 13,
  suit: "Clubs"
}, {
  id: '9C',
  ranktrump: 13,
  ranknontrump: 12,
  suit: "Clubs"
}, {
  id: '8C',
  ranktrump: 12,
  ranknontrump: 11,
  suit: "Clubs"
}, {
  id: '7C',
  ranktrump: 11,
  ranknontrump: 10,
  suit: "Clubs"
}, {
  id: '6C',
  ranktrump: 10,
  ranknontrump: 9,
  suit: "Clubs"
}, {
  id: '5C',
  ranktrump: 1,
  ranknontrump: 8,
  suit: "Clubs"
}, {
  id: '4C',
  ranktrump: 9,
  ranknontrump: 7,
  suit: "Clubs"
}, {
  id: '3C',
  ranktrump: 8,
  ranknontrump: 6,
  suit: "Clubs"
}, {
  id: '2C',
  ranktrump: 7,
  ranknontrump: 5,
  suit: "Clubs"
}];
/*
const compare = (card1, card2) => {
  if (istrump(card1) && !(istrump(card2))) {
    return card1
  } else if (!istrump(card1) && istrump(card2)) {
    return card2
  } else if (istrump(card1) && istrump(card2)) {
    if (card1.ranktrump < card2.ranktrump) {
      return card1
    } else { return card2}
  } else if (!istrump(card1) && !istrump(card2)){
    if (card1.suit === suitled && card2.suit != suitled) {
      return card1
    } else if (card1.suit != suitled && card2.suit === suitled) {
      return card2
    } else if (card1.suit === suitled && card2.suit === suitled) {
      if (card1.ranknontrump < card2.ranknontrump) {
        return card1
      } else { return card2}

    }
    else if (card1.suit != suitled && card2.suit != suitled) {
      return "incomparable"
    }
  }
} */

const nextCardBetter = (card1, card2) => {
  if (istrump(card1) && !istrump(card2)) {
    return false;
  } else if (!istrump(card1) && istrump(card2)) {
    return true;
  } else if (istrump(card1) && istrump(card2)) {
    if (card1.ranktrump < card2.ranktrump) {
      return false;
    } else {
      return true;
    }
  } else if (!istrump(card1) && !istrump(card2)) {
    if (card1.suit === G.trick.suitled && card2.suit != G.trick.suitled) {
      return false;
    } else if (card1.suit != G.trick.suitled && card2.suit === G.trick.suitled) {
      return true;
    } else if (card1.suit === G.trick.suitled && card2.suit === G.trick.suitled) {
      if (card1.ranknontrump < card2.ranknontrump) {
        return false;
      } else {
        return true;
      }
    } else if (card1.suit != G.trick.suitled && card2.suit != G.trick.suitled) {
      return "incomparable";
    }
  }
};

const TicTacToe = {
  name: _config.GAME_NAME,
  setup: () => {
    const deck = std_45s_deck;
    var start = {
      score: {
        0: 0,
        //players 0 and 2
        1: 0 //players 1 and 3

      },
      dealer: 0,
      under_the_gun: 1,
      //player to the left of the dealer
      board: [],
      chat: [],
      tokens: {},
      players: {
        0: {
          cards: []
        },
        1: {
          cards: []
        },
        2: {
          cards: []
        },
        3: {
          cards: []
        }
      },
      deck: deck,
      table: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      trick: {
        cards_played: 0,
        bestcardthistrick: [],
        bestplayerthistrick: [],
        winningpartnership: [],
        suitled: [],
        trumpled: [],
        ranktrumpled: []
      },
      hand: {
        nexttoplay: 0,
        kitty: [],
        bidding: {
          0: [],
          1: [],
          2: [],
          3: []
        },
        declarer: "0",
        declaringpartnership: [],
        defendingpartnership: [],
        score: {
          0: 0,
          //northsouth
          1: 0 //eastwest

        },
        highest_bid_yet: [],
        highest_bid_value_yet: [],
        highest_bidder_yet: [],
        trumpsuit: [],
        highest_trump_yet: [],
        highest_trump_yet_player: []
      }
    };
    start.deck = shuffleDeck(std_45s_deck); // Deal 5 cards in alternating order to each player

    for (let i = 0; i < 5; i++) {
      start.players[0].cards.push(start.deck.pop());
      start.players[1].cards.push(start.deck.pop());
      start.players[2].cards.push(start.deck.pop());
      start.players[3].cards.push(start.deck.pop());
    }

    for (let i = 0; i < 3; i++) {
      start.hand.kitty.push(start.deck.pop());
    } // Adding deckSize so that the Deck can be stripped in the future
    // deckSize will get updated after turn onEnd
    //  start.deckSize = start.deck.length;


    return start;
  },
  //playerView: PlayerView.STRIP_SECRETS,
  phases: {
    bid: {
      moves: {
        Bid
      },
      endIf: G => isPass(G.hand.bidding[0]) + isPass(G.hand.bidding[1]) + isPass(G.hand.bidding[2]) + isPass(G.hand.bidding[3]) === 3,
      start: true,
      next: 'declare',
      turn: {
        order: {
          // Get the initial value of playOrderPos.
          // This is called at the beginning of the phase.
          first: (G, ctx) => G.under_the_gun,
          // Get the next value of playOrderPos.
          // This is called at the end of each turn.
          // The phase ends if this returns undefined.
          next: (G, ctx) => {
            for (var i = 1; i < 4; i++) {
              let p = (ctx.playOrderPos + i) % ctx.numPlayers;

              if (G.hand.bidding[p] != "pass") {
                return (ctx.playOrderPos + i) % ctx.numPlayers;
              }
            }
          }
        }
      },
      onEnd: (G, ctx) => {
        G.hand.declarer = G.hand.highest_bidder_yet;
        G.hand.nexttoplay = (parseInt(G.hand.declarer) + 1) % ctx.numPlayers; //determine declaring partnership

        if (G.hand.declarer === '0' || G.hand.declarer == '2') {
          G.hand.declaringpartnership = 0;
          G.hand.defendingpartnership = 1;
        } else {
          G.hand.declaringpartnership = 1;
          G.hand.defendingpartnership = 0;
        }
      }
    },
    declare: {
      //   onBegin: (G, ctx) =>{ctx.playOrderPos = G.under_the_gun},
      moves: {
        declareSuit
      },
      next: 'draw',
      turn: {
        order: {
          // Get the initial value of playOrderPos.
          // This is called at the beginning of the phase.
          first: (G, ctx) => parseInt(G.hand.declarer) // Get the next value of playOrderPos.
          // This is called at the end of each turn.
          // The phase ends if this returns undefined.
          // next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,

        }
      },
      onEnd: (G, ctx) => {
        for (let i = 0; i < 3; i++) {
          G.players[G.hand.declarer].cards.push(G.hand.kitty.pop());
        }
      }
    },
    draw: {
      // onBegin: (G, ctx) =>{ctx.playOrderPos = G.under_the_gun},
      moves: {
        discard
      },
      next: 'play',

      /* turn: {
         order: {
      // Get the initial value of playOrderPos.
      // This is called at the beginning of the phase.
      first: (G, ctx) => G.under_the_gun,
      // Get the next value of playOrderPos.
      // This is called at the end of each turn.
      // The phase ends if this returns undefined.
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers
      }
       } */
      turn: {
        order: {
          first: (G, ctx) => G.under_the_gun,
          next: (G, ctx) => {
            if ((ctx.playOrderPos + 1) % ctx.numPlayers != G.under_the_gun) {
              return (ctx.playOrderPos + 1) % ctx.numPlayers;
            } else {
              ctx.events.endPhase();
            }
          }
        }
      }
    },
    play: {
      //start: true,
      moves: {
        playCard
      },
      next: 'trickscoring',
      turn: {
        order: {
          // Get the initial value of playOrderPos.
          // This is called at the beginning of the phase.
          //     first: (G, ctx) => (parseInt(G.hand.declarer) + 1) % ctx.numPlayers,
          first: (G, ctx) => parseInt(G.hand.nexttoplay),
          // Get the next value of playOrderPos.
          // This is called at the end of each turn.
          // The phase ends if this returns undefined.
          next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers // OPTIONAL:
          // Override the initial value of playOrder.
          // This is called at the beginning of the game / phase.
          // playOrder: (G, ctx) => [...],

        }
      }
    },
    trickscoring: {
      // onBegin: (G, ctx) =>{ctx.playOrderPos = G.under_the_gun},
      moves: {
        scoreTrick
      },
      next: 'play',

      /* turn: {
         order: {
      // Get the initial value of playOrderPos.
      // This is called at the beginning of the phase.
      first: (G, ctx) => G.under_the_gun,
      // Get the next value of playOrderPos.
      // This is called at the end of each turn.
      // The phase ends if this returns undefined.
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers
      }
       } */
      turn: {
        order: {
          first: (G, ctx) => parseInt(G.trick.bestplayerthistrick),
          next: (G, ctx) => {
            if ((ctx.playOrderPos + 1) % ctx.numPlayers != G.under_the_gun) {
              return (ctx.playOrderPos + 1) % ctx.numPlayers;
            } else {
              ctx.events.endPhase();
            }
          }
        }
      }
    },
    handscoring: {
      // onBegin: (G, ctx) =>{ctx.playOrderPos = G.under_the_gun},
      moves: {
        scoreHand
      },
      next: 'bid',

      /* turn: {
         order: {
      // Get the initial value of playOrderPos.
      // This is called at the beginning of the phase.
      first: (G, ctx) => G.under_the_gun,
      // Get the next value of playOrderPos.
      // This is called at the end of each turn.
      // The phase ends if this returns undefined.
      next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers
      }
       } */
      turn: {
        order: {
          first: (G, ctx) => parseInt(G.dealer),
          next: (G, ctx) => {
            if ((ctx.playOrderPos + 1) % ctx.numPlayers != G.under_the_gun) {
              return (ctx.playOrderPos + 1) % ctx.numPlayers;
            } else {
              ctx.events.endPhase();
            }
          }
        }
      }
    }
  },

  /*  turn: {
      onEnd: (G, ctx) => {
        //Update states here like deck size
    //    G.deckSize = G.deck.length;
      },
    },*/
  endIf: (G, ctx) => {
    if (G.score[0] > 120 || G.score[1] > 120) {
      if (G.score[0] > G.score[1]) {
        return 0;
      } else {
        return 1;
      }
    } // Victory Condition here

    /*    if (G.deck.length <= 0) {
          console.log("Ending game since we are out of cards!");
          return getWinner(G);
        } */

    /*
    const numResourcesLeft = Object.values(G.tokens).filter((res) => {
      return res.length > 0;
    }).length;
    console.log(numResourcesLeft, " resources left");
    if (numResourcesLeft <= NUM_RESOURCES_END) {
      console.log(
        "Ending game since we have reached the minimum number of trading token stacks!"
      );
      return getWinner(G);
    } */

  },
  onEnd: (G, ctx) => G
};
exports.TicTacToe = TicTacToe;
},{"../constants":"constants.js","boardgame.io/core":"node_modules/boardgame.io/dist/esm/core.js","../config.js":"config.js","./moveValidation":"src/moveValidation.js"}],"src/App.js":[function(require,module,exports) {
"use strict";

var _client = require("boardgame.io/client");

var _Game = require("./Game");

class TicTacToeClient {
  constructor(rootElement) {
    this.client = (0, _client.Client)({
      game: _Game.TicTacToe,
      numPlayers: 4
    });
    this.client.start();
    this.rootElement = rootElement;
    this.createBoard();
    this.attachListeners();
    this.client.subscribe(state => this.update(state));
  }

  createBoard() {
    // Create cells in rows for the Tic-Tac-Toe board.
    const hand = [];

    for (let i = 0; i < 4; i++) {
      const cards = [];

      for (let j = 0; j < 5; j++) {
        const cardid = j;
        const playerid = i;
        cards.push("<td class=\"card\" data-cardid=\"".concat(cardid, "\" data-playerid=\"").concat(playerid, "\"></td>"));
      }

      hand.push("<tr>".concat(cards.join(''), "</tr>"));
    }

    const board = [];

    for (let i = 0; i < 4; i++) {
      const playerid = i;
      board.push("<td class=\"board\" data-cardid=\"\" data-playerid=\"".concat(playerid, "\"></td>"));
    }

    const bids = [];

    for (let i = 0; i < 4; i++) {
      const playerid = i;
      board.push("<td class=\"bid\" data-playerid=\"".concat(playerid, "\"></td>"));
    } // Add the HTML to our app <div>.
    // We’ll use the empty <p> to display the game winner later.


    this.rootElement.innerHTML = "\n<form> \n  <p>Please select your bid:</p>\n  <div>\n    <input type=\"radio\" id=\"bidChoice1\"\n           name=\"bid\" value=\"pass\">\n    <label for=\"bidChoice1\">Pass</label>\n    <input type=\"radio\" id=\"bidChoice2\"\n           name=\"bid\" value=\"20\">\n    <label for=\"bidChoice2\">20</label>\n    <input type=\"radio\" id=\"bidChoice3\"\n           name=\"bid\" value=\"25\">\n    <label for=\"bidChoice3\">25</label>\n    <input type=\"radio\" id=\"bidChoice4\"\n           name=\"bid\" value=\"30\">\n    <label for=\"bidChoice4\">30</label>\n        <input type=\"radio\" id=\"bidChoice5\"\n           name=\"bid\" value=\"hold\">\n    <label for=\"bidChoice5\">Hold</label>\n  </div>\n  <div>\n    <button type=\"submit\">Submit</button>\n  </div>\n</form>\n        <table>".concat(bids.join(''), "</table>\n        <table>").concat(hand.join(''), "</table>\n        <table>").concat(board.join(''), "</table>\n        <p class=\"currentplayer\"></p>\n        <p class=\"score\"></p>\n      ");
  }

  attachListeners() {
    // This event handler will read the cell id from a cell’s
    // `data-id` attribute and make the `clickCell` move.
    const handleCellClick = event => {
      const id = event.target.textContent;
      console.log(id);
      this.client.moves.playCard(id);
    }; // Attach the event listener to each of the board cells.


    const cards = this.rootElement.querySelectorAll('.card');
    cards.forEach(card => {
      card.onclick = handleCellClick;
    });
    var form = this.rootElement.querySelector("form"); //  var log = document.querySelector("#log");

    function logSubmit(event) {
      console.log("I was triggered");
      var data = new FormData(form);
      var output = ""; //      console.log(data)

      for (const entry of data) {
        output = output + entry[0] + "=" + entry[1] + "\r";
        output = entry[1];
      }

      ;
      console.log(output); //      this.client.moves.Bid(20)
    } //    form.addEventListener('submit', logSubmit);
    //    event.preventDefault();


    const handleSubmitClick = bidamount => {
      const id = event.target.textContent;
      console.log(bidamount);

      if (bidamount === "20" || bidamount === "25" || bidamount === "30") {
        bidamount = parseInt(bidamount);
      }

      this.client.moves.Bid(bidamount);
    };

    form.addEventListener("submit", function (event) {
      var data = new FormData(form);
      var output = "";
      var bidamount = "";

      for (const entry of data) {
        output = output + entry[0] + "=" + entry[1][1] + "\r";
        bidamount = entry[1];
      }

      ; //  log.innerText = output;

      console.log(output);
      handleSubmitClick(bidamount);
      event.preventDefault();
    }, false);
  }

  update(state) {
    // Get all the board cells.
    const cards = this.rootElement.querySelectorAll('.card'); // Update cells to display the values in game state.

    cards.forEach(card => {
      const cellId = parseInt(card.dataset.cardid);
      const playerId = parseInt(card.dataset.playerid);
      let cellValue = "";

      if (cellId <= state.G.players[playerId].cards.length - 1) {
        cellValue = state.G.players[playerId].cards[cellId].id;
      }

      card.textContent = cellValue !== null ? cellValue : '';
    }); // Get the gameover message element.
    //const messageEl = this.rootElement.querySelector('.winner');
    // Update the element to show a winner if any.
    //if (state.ctx.gameover) {
    //  messageEl.textContent =
    //    state.ctx.gameover.winner !== undefined
    //      ? 'Winner: ' + state.ctx.gameover.winner
    //      : 'Draw!';
    //} else {
    //  messageEl.textContent = '';
    //}

    const boards = this.rootElement.querySelectorAll('.board'); // Update cells to display the values in game state.

    boards.forEach(board => {
      const playerId = parseInt(board.dataset.playerid);
      const cellValue = state.G.table[playerId].id; //     board.textContent = playerId !== null ? playerId : '';

      board.textContent = cellValue !== null ? cellValue : '';
    });
    const bids = this.rootElement.querySelectorAll('.bid'); // Update cells to display the values in game state.

    bids.forEach(bid => {
      const playerId = parseInt(bid.dataset.playerid);
      const cellValue = state.G.hand.bidding[playerId]; //     board.textContent = playerId !== null ? playerId : '';

      bid.textContent = cellValue !== null ? cellValue : '';
    });
    const messageCurrentPlayer = this.rootElement.querySelector('.currentplayer'); // Update the element to show a winner if any.

    messageCurrentPlayer.textContent = "The current player is player " + state.ctx.currentPlayer;
    const messagecurrentscore = this.rootElement.querySelector('.score');
    messagecurrentscore.textContent = "The score is " + state.G.score[0] + " to " + state.G.score[1];
  }

}

const appElement = document.getElementById('app');
const app = new TicTacToeClient(appElement);
},{"boardgame.io/client":"node_modules/boardgame.io/dist/esm/client.js","./Game":"src/Game.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62373" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/App.js"], null)
//# sourceMappingURL=/App.f684dadd.js.map