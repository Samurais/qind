const nbind = require("../index");

let p = {};

function toi(arg1) {
  let v = parseInt(arg1);
  if (isNaN(v)) {
    throw new Error("unval");
  }
  return v;
}

function cal(arg1, arg2, cb) {
  console.log("arg1, arg2", arg1, arg2);
  try {
    cb(null, toi(arg1) + toi(arg2));
  } catch (e) {
    cb(e);
  }
}

let nproxy = nbind(cal, p);

nproxy("1", "ss").then(
  (val) => {
    console.log("get val: ", val);
  },
  (err) => {
    console.log("Error:", err);
  }
);

nproxy("1", "1").then(
  (val) => {
    console.log("get val: ", val);
  },
  (err) => {
    console.log("Error:", err);
  }
);
