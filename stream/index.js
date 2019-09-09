


const { Readable, Writable } = require("stream");
const fs = require('fs-extra');

//fs.emptyDir("./stream/test");
fs.ensureFile("./stream/test/a.js");
const srcpath = './stream/big.file'
const dstpath = './stream/this/path/does/not/exist/big.file'

// With a callback:
fs.ensureLink(srcpath, dstpath, err => {
  console.log(err) // => null
  // link has now been created, including the directory it is to be placed in
})

/* const readable = fs.createReadStream("./stream/big.file",   {
    encoding:'utf8',
    highWaterMark:27
});

const writeable = new Writable({
    write(chunk,  encoding, callback) {
        console.log(chunk.toString())
        callback()
    }
})

readable.pipe(writeable);
 */


