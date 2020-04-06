# qind

Bind callback function as promise function.

## Install

```
npm install qind
```

## Usage

```
let qind = require("qind")
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

let qcal = qind(cal, p);

qcal("1", "ss").then(
  (val) => {
    console.log("get val: ", val);
  },
  (err) => {
    console.log("Error:", err);
  }
);
```
