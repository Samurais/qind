// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
  return function () {
    return call.apply(f, arguments);
  };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

exports = module.exports = function (callback, thisp) {
  var baseArgs = array_slice(arguments, 2);
  //   console.log("baseArgs: ", baseArgs);
  return function () {
    return new Promise((resolve, reject) => {
      var nodeArgs = baseArgs.concat(array_slice(arguments));
      nodeArgs.push((err, ret) => {
        if (err) return reject(err);
        resolve(ret);
      });
      //   console.log("nodeArgs", nodeArgs);
      //   return nodeArgs;
      callback.apply(thisp, nodeArgs);
    });
  };
};
