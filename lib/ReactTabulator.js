"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var pick_react_known_prop_1 = require("pick-react-known-prop");
var ConfigUtils_1 = require("./ConfigUtils");
/* tslint:disable-next-line */
var Tabulator = require('tabulator-tables');
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = null;
        _this.htmlProps = {};
        _this.mainId = "tabulator-" + +new Date() + "-" + Math.floor(Math.random() * 9999999); // random id
        _this.table = null; // will be set once Tabulator instantiated
        return _this;
    }
    default_1.prototype.componentWillMount = function () {
        this.htmlProps = pick_react_known_prop_1.pickHTMLProps(this.props); // pick valid html props
        delete this.htmlProps['data']; // don't render data & columns as attributes
        delete this.htmlProps['columns'];
    };
    default_1.prototype.componentDidMount = function () {
        var domEle = ReactDOM.findDOMNode(this.ref); // mounted DOM element
        var that = this;
        var _a = this.props, columns = _a.columns, data = _a.data, options = _a.options;
        var callbacks = ConfigUtils_1.getCallbacks(this.props);
        var table = new Tabulator(domEle, __assign({ columns: columns }, callbacks, { layout: 'fitColumns', // fit columns to width of table (optional)
            tableBuilding: function () {
                that.table = this; // keep table instance
                if (that.props.tableBuilding) {
                    that.props.tableBuilding();
                }
            } }, options));
        table.setData(data);
    };
    default_1.prototype.componentWillUnmount = function () {
        this.table.destroy();
    };
    default_1.prototype.render = function () {
        var _this = this;
        var className = this.props.className;
        return React.createElement("div", __assign({ ref: function (ref) { return (_this.ref = ref); }, "data-instance": this.mainId }, this.htmlProps, { className: className }));
    };
    return default_1;
}(React.Component));
exports["default"] = default_1;