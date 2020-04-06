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

## Give credits to

[q](https://github.com/kriskowal/q)

## License

Copyright (2020) <a href="https://www.chatopera.com/" target="_blank">北京华夏春松科技有限公司</a>

[The MIT License](./LICENSE)

[![chatoper banner][co-banner-image]][co-url]

[co-banner-image]: https://user-images.githubusercontent.com/3538629/42383104-da925942-8168-11e8-8195-868d5fcec170.png
[co-url]: https://www.chatopera.com
