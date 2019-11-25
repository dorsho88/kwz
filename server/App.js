
const ClosureCompiler = require('google-closure-compiler').jsCompiler;
const fs = require('fs');
const path = require('path');

const closureCompiler = new ClosureCompiler({
  compilation_level: 'ADVANCED'
});

const compile = (err, content) => {
  const compilerProcess = closureCompiler.run([{
    src: content,
    sourceMap: null // optional input source map
  }], (exitCode, stdOut, stdErr) => {
    if (exitCode > 0) throw stdErr;
    for (let i = 0; i < stdOut.length; i++) {
      fs.writeFile(path.join(__dirname, 'one.min.js'), stdOut[0].src, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
  });
}

const readFile = (fileName) => {
  fs.readFile(path.join(__dirname, fileName), 'utf8', compile)
}

readFile('one.js');
