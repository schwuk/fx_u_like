// See http://brunch.io for documentation.
exports.paths = {
  public: 'public'
};

exports.files = {
  javascripts: {
    joinTo: {
      'js/vendor.js': /^(?!app)/,
      'js/app.js': /^app/
    }
  },
  stylesheets: {
    joinTo: {
      'css/app.css': /^app/,
      'css/vendor.css': /^node_modules/
    }
  }
};

exports.sourceMaps = false;

exports.plugins = {
  babel: {presets: ['latest', 'react']}
};
