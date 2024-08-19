"use strict";

var _express = _interopRequireDefault(require("express"));
var _mysql = _interopRequireDefault(require("mysql"));
var _cors = _interopRequireDefault(require("cors"));
var _httpProxyMiddleware = require("http-proxy-middleware");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var PORT = process.env.PORT || 4000;
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
var db = _mysql["default"].createConnection({
  user: "mydb",
  host: "mysql-mydb.alwaysdata.net",
  password: "mx57yA.U@.fPnTu",
  database: "mydb_dashboard"
});
var handleDatabaseQuery = function handleDatabaseQuery(tableName, res) {
  db.query("SELECT * FROM ".concat(tableName), function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
};
app.get("/userinfo", function (req, res) {
  handleDatabaseQuery("userinfo", res);
});
app.get("/mistake", function (req, res) {
  handleDatabaseQuery("mistake", res);
});
app.get("/meeting", function (req, res) {
  handleDatabaseQuery("meeting", res);
});
app.get("/incident", function (req, res) {
  handleDatabaseQuery("incident", res);
});
var handleUpdateDatabaseQuery = function handleUpdateDatabaseQuery(tableName, columns) {
  return function (req, res) {
    var userId = req.body.id;
    var values = columns.map(function (column) {
      return req.body[column];
    });
    db.query("UPDATE ".concat(tableName, " SET ").concat(columns.map(function (col) {
      return "`".concat(col, "`= ?");
    }).join(', '), " WHERE id = ?"), [].concat(_toConsumableArray(values), [userId]), function (err, result) {
      if (err) return res.send(err);
      return res.json(result);
    });
  };
};
app.put("/userinfo", handleUpdateDatabaseQuery("userinfo", ["projectTitle", "projectStatus"]));
app.put("/mistake", handleUpdateDatabaseQuery("mistake", ["mistake"]));
app.put("/meeting", handleUpdateDatabaseQuery("meeting", ["oneOnone", "weekly", "training"]));
app.put("/incident", handleUpdateDatabaseQuery("incident", ["week1", "week2", "week3", "week4"]));
app.use('/', (0, _httpProxyMiddleware.createProxyMiddleware)({
  target: "http://localhost:".concat(PORT),
  changeOrigin: true
}));
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});