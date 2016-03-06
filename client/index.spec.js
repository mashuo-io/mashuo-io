// This will search for files ending in .spec.js and require them
// so that they are added to the webpack bundle
var context = require.context('../common', true, /.+\.spec\.jsx?$/); // the params are: folder, if include all sub folders, regular expression
context.keys().forEach(context);
module.exports = context;