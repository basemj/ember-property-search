/* eslint-env node */
'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'self-closing-void-elements': false,
    'no-triple-curlies': false,
    'style-concatenation': false
  },
  ignore: [
    './node_modules/**'
  ]
};
