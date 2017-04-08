(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/Button.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Button, [{
    key: 'handleClick',
    value: function handleClick() {
      var _this2 = this;

      var url = "/rate/" + this.props.date + "/" + this.props.fromCurrency + "/" + this.props.toCurrency;

      var rate = 1.0;
      _axios2.default.get(url).then(function (response) {
        rate = response.data;
        var result = _this2.props.fromAmount * rate;
        _this2.props.handleResult(result.toFixed(2));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var title = this.props.title;
      return _react2.default.createElement(
        'button',
        { onClick: this.handleClick },
        title
      );
    }
  }]);

  return Button;
}(_react2.default.Component);

exports.default = Button;

});

require.register("components/Currency.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CurrencyAmount = require('../containers/CurrencyAmount');

var _CurrencyAmount2 = _interopRequireDefault(_CurrencyAmount);

var _CurrencyChooser = require('../containers/CurrencyChooser');

var _CurrencyChooser2 = _interopRequireDefault(_CurrencyChooser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Currency = function (_React$Component) {
  _inherits(Currency, _React$Component);

  function Currency() {
    _classCallCheck(this, Currency);

    return _possibleConstructorReturn(this, (Currency.__proto__ || Object.getPrototypeOf(Currency)).apply(this, arguments));
  }

  _createClass(Currency, [{
    key: 'render',
    value: function render() {
      var direction = this.props.direction;
      var id = "currency_" + direction;
      return _react2.default.createElement(
        'fieldset',
        { id: id },
        _react2.default.createElement(
          'legend',
          null,
          'Convert ',
          direction,
          ':'
        ),
        _react2.default.createElement(_CurrencyAmount2.default, { direction: direction }),
        _react2.default.createElement(_CurrencyChooser2.default, { direction: direction })
      );
    }
  }]);

  return Currency;
}(_react2.default.Component);

exports.default = Currency;

});

require.register("components/CurrencyAmount.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyAmount = function (_React$Component) {
  _inherits(CurrencyAmount, _React$Component);

  function CurrencyAmount(props) {
    _classCallCheck(this, CurrencyAmount);

    var _this = _possibleConstructorReturn(this, (CurrencyAmount.__proto__ || Object.getPrototypeOf(CurrencyAmount)).call(this, props));

    _this.state = { value: props.direction === 'to' ? props.toAmount : props.fromAmount };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(CurrencyAmount, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = this.props.direction === 'to' ? nextProps.toAmount : nextProps.fromAmount;
      this.setState({ value: value });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      var value = event.target.value === "" ? 0 : parseFloat(event.target.value);
      this.setState({ value: value });
      this.props.handleChange(this.props.direction, value);
    }
  }, {
    key: 'render',
    value: function render() {
      var readOnly = this.props.direction === 'to' ? true : false;
      return _react2.default.createElement('input', {
        type: "number",
        min: 1,
        value: this.state.value,
        disabled: readOnly,
        onChange: this.handleChange
      });
    }
  }]);

  return CurrencyAmount;
}(_react2.default.Component);

exports.default = CurrencyAmount;

});

require.register("components/CurrencyChooser.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyChooser = function (_React$Component) {
  _inherits(CurrencyChooser, _React$Component);

  function CurrencyChooser(props) {
    _classCallCheck(this, CurrencyChooser);

    var _this = _possibleConstructorReturn(this, (CurrencyChooser.__proto__ || Object.getPrototypeOf(CurrencyChooser)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(CurrencyChooser, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.props.handleChange(this.props.direction, event.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.props.direction === 'to' ? this.props.toCurrency : this.props.fromCurrency;
      var options = this.props.currencies.map(function (currency) {
        return _react2.default.createElement(
          'option',
          { key: currency, value: currency },
          currency
        );
      });
      return _react2.default.createElement(
        'select',
        { value: value, onChange: this.handleChange },
        options
      );
    }
  }]);

  return CurrencyChooser;
}(_react2.default.Component);

exports.default = CurrencyChooser;

});

require.register("components/CurrencyConverter.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateChooser = require('../containers/DateChooser');

var _DateChooser2 = _interopRequireDefault(_DateChooser);

var _Currency = require('./Currency');

var _Currency2 = _interopRequireDefault(_Currency);

var _Button = require('../containers/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CurrencyConverter
// - DateChooser
// - Currency (From)
//  - Amount
//  - CurrencyChooser
// - Currency (To)
//  - Amount (Disabled)
//  - CurrencyChooser


var CurrencyConverter = function (_React$Component) {
  _inherits(CurrencyConverter, _React$Component);

  function CurrencyConverter() {
    _classCallCheck(this, CurrencyConverter);

    return _possibleConstructorReturn(this, (CurrencyConverter.__proto__ || Object.getPrototypeOf(CurrencyConverter)).apply(this, arguments));
  }

  _createClass(CurrencyConverter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'currency_converter' },
        _react2.default.createElement(
          'h1',
          null,
          'FX-u-like'
        ),
        _react2.default.createElement(_DateChooser2.default, null),
        _react2.default.createElement(_Currency2.default, { direction: 'from' }),
        _react2.default.createElement(_Currency2.default, { direction: 'to' }),
        _react2.default.createElement(_Button2.default, { title: 'Convert!' })
      );
    }
  }]);

  return CurrencyConverter;
}(_react2.default.Component);

exports.default = CurrencyConverter;

});

require.register("components/DateChooser.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateChooser = function (_React$Component) {
  _inherits(DateChooser, _React$Component);

  function DateChooser() {
    _classCallCheck(this, DateChooser);

    return _possibleConstructorReturn(this, (DateChooser.__proto__ || Object.getPrototypeOf(DateChooser)).apply(this, arguments));
  }

  _createClass(DateChooser, [{
    key: 'render',
    value: function render() {
      var component = _react2.default.createElement(_reactDatepicker2.default, { className: 'date_chooser', disabled: true });
      if (this.props.dates && this.props.startDate) {
        component = _react2.default.cloneElement(component, {
          disabled: false,
          selected: (0, _moment2.default)(this.props.startDate),
          onChange: this.props.handleChange.bind(this),
          includeDates: this.props.dates.map(function (x) {
            return (0, _moment2.default)(x);
          })
        });
      }
      return _react2.default.createElement(
        'fieldset',
        { id: 'date_chooser' },
        _react2.default.createElement(
          'legend',
          null,
          'Date:'
        ),
        component
      );
    }
  }]);

  return DateChooser;
}(_react2.default.Component);

exports.default = DateChooser;

});

require.register("containers/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _CurrencyConverter = require('../components/CurrencyConverter');

var _CurrencyConverter2 = _interopRequireDefault(_CurrencyConverter);

var _DateChooser = require('../components/DateChooser');

var _DateChooser2 = _interopRequireDefault(_DateChooser);

var _Currency = require('../components/Currency');

var _Currency2 = _interopRequireDefault(_Currency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    dates: state.data.dates,
    currencies: state.data.currencies
  };
};

var App = (0, _reactRedux.connect)(mapStateToProps)(_CurrencyConverter2.default);

exports.default = App;

});

require.register("containers/Button.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _actions = require('../store/actions');

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    date: state.convert.date,
    fromAmount: state.convert.fromAmount,
    fromCurrency: state.convert.fromCurrency,
    toCurrency: state.convert.toCurrency
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleResult: function handleResult(amount) {
      dispatch((0, _actions.setToAmount)(amount));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Button2.default);

});

require.register("containers/CurrencyAmount.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _actions = require('../store/actions');

var _CurrencyAmount = require('../components/CurrencyAmount');

var _CurrencyAmount2 = _interopRequireDefault(_CurrencyAmount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    fromAmount: state.convert.fromAmount,
    toAmount: state.convert.toAmount
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleChange: function handleChange(direction, value) {
      if (direction === 'from') {
        dispatch((0, _actions.setFromAmount)(value));
      } else {
        dispatch((0, _actions.setToAmount)(value));
      }
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_CurrencyAmount2.default);

});

require.register("containers/CurrencyChooser.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _actions = require('../store/actions');

var _CurrencyChooser = require('../components/CurrencyChooser');

var _CurrencyChooser2 = _interopRequireDefault(_CurrencyChooser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    currencies: state.data.currencies,
    fromCurrency: state.convert.fromCurrency,
    toCurrency: state.convert.toCurrency
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleChange: function handleChange(direction, value) {
      if (direction === 'from') {
        dispatch((0, _actions.setFromCurrency)(value));
      } else {
        dispatch((0, _actions.setToCurrency)(value));
      }
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_CurrencyChooser2.default);

});

require.register("containers/DateChooser.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _actions = require('../store/actions');

var _DateChooser = require('../components/DateChooser');

var _DateChooser2 = _interopRequireDefault(_DateChooser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    dates: state.data.dates,
    startDate: state.data.startDate
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleChange: function handleChange(date) {
      dispatch((0, _actions.setDate)(date.format('YYYY-MM-DD')));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_DateChooser2.default);

});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _App = require('containers/App');

var _App2 = _interopRequireDefault(_App);

var _reducers = require('store/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = require('store/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var date = (0, _moment2.default)().format('YYYY-MM-DD');
var preloadedState = {
  'data': {
    'currencies': [],
    'dates': []
  },
  'convert': {
    'fromAmount': 1,
    'fromCurrency': 'USD',
    'toCurrency': 'GBP'
  }
};

var store = (0, _redux.createStore)(_reducers2.default, preloadedState);

_axios2.default.get('/dates').then(function (response) {
  store.dispatch((0, _actions.setDates)(response.data));
  store.dispatch((0, _actions.setDate)(response.data[0]));
});

_axios2.default.get('/currencies').then(function (response) {
  store.dispatch((0, _actions.setCurrencies)(response.data));
});

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_App2.default, null)
  ), document.getElementById('container'));
});

});

require.register("store/actions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDates = setDates;
exports.setCurrencies = setCurrencies;
exports.setDate = setDate;
exports.setFromAmount = setFromAmount;
exports.setFromCurrency = setFromCurrency;
exports.setToAmount = setToAmount;
exports.setToCurrency = setToCurrency;
/*
 * action types
 */

var SET_DATES = exports.SET_DATES = 'SET_DATES';
var SET_CURRENCIES = exports.SET_CURRENCIES = 'SET_CURRENCIES';
var SET_DATE = exports.SET_DATE = 'SET_DATE';
var SET_FROM_AMOUNT = exports.SET_FROM_AMOUNT = 'SET_FROM_AMOUNT';
var SET_FROM_CURRENCY = exports.SET_FROM_CURRENCY = 'SET_FROM_CURRENCY';
var SET_TO_AMOUNT = exports.SET_TO_AMOUNT = 'SET_TO_AMOUNT';
var SET_TO_CURRENCY = exports.SET_TO_CURRENCY = 'SET_TO_CURRENCY';

/*
 * action creators
 */

function setDates(dates) {
  return { type: SET_DATES, dates: dates };
}

function setCurrencies(currencies) {
  return { type: SET_CURRENCIES, currencies: currencies };
}

function setDate(date) {
  return { type: SET_DATE, date: date };
}

function setFromAmount(amount) {
  return { type: SET_FROM_AMOUNT, amount: amount };
}

function setFromCurrency(currency) {
  return { type: SET_FROM_CURRENCY, currency: currency };
}

function setToAmount(amount) {
  return { type: SET_TO_AMOUNT, amount: amount };
}

function setToCurrency(currency) {
  return { type: SET_TO_CURRENCY, currency: currency };
}

});

;require.register("store/reducers.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _actions = require('./actions');

function visibilityFilter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SHOW_ALL;
  var action = arguments[1];

  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function data() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actions.SET_DATE:
      return Object.assign({}, state, {
        startDate: action.date
      });
    case _actions.SET_DATES:
      return Object.assign({}, state, {
        dates: action.dates,
        startDate: action.dates[0]
      });
    case _actions.SET_CURRENCIES:
      return Object.assign({}, state, {
        currencies: action.currencies
      });
    default:
      return state;
  }
}

function convert() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _actions.SET_DATE:
      return Object.assign({}, state, {
        date: action.date
      });
    case _actions.SET_FROM_AMOUNT:
      return Object.assign({}, state, {
        fromAmount: action.amount
      });
    case _actions.SET_TO_AMOUNT:
      return Object.assign({}, state, {
        toAmount: action.amount
      });
    case _actions.SET_FROM_CURRENCY:
      return Object.assign({}, state, {
        fromCurrency: action.currency
      });
    case _actions.SET_TO_CURRENCY:
      return Object.assign({}, state, {
        toCurrency: action.currency
      });
    default:
      return state;
  }
}

var fxApp = (0, _redux.combineReducers)({
  data: data,
  convert: convert
});

exports.default = fxApp;

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

