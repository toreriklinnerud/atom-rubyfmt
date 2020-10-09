'use babel';

import { spawn } from 'child_process';

let checkRubySyntax = function (sourceText) {
  return new Promise(function(resolve, reject) {
    var message = ""

    rubyExecutable = atom.config.get('rubyfmt.rubyExecutable')
    rubySyntax = spawn(rubyExecutable, ['-c'], {windowsHide: true})
    rubySyntax.stderr.on('data', (msg) => {
      message += msg.toString('utf8')
    });

    rubySyntax.stdin.write(sourceText);
    rubySyntax.stdin.end();
    rubySyntax.on('close', (status) => {
      if(status == 0) {
        resolve()
      } else {
        reject({issue: "rubySyntaxError", message: message});
      }
    });
  })
}

export function spawnFormat(sourceText) {
  var promise = new Promise(function(resolve, reject) {
    var formattedText = ""
    var rubyfmtErrorMsg = ""
    rubyfmtExecutable = atom.config.get('rubyfmt.rubyfmtExecutable')
    rubyfmt = spawn(rubyfmtExecutable, [], {windowsHide: true, shell: true})
    rubyfmt.stdout.on('data', (data) => {
      formattedText += data.toString('utf8');
    });

    rubyfmt.stderr.on('data', (msg) => {
      rubyfmtErrorMsg += msg.toString('utf8');
    });

    rubyfmt.stdin.write(sourceText);
    rubyfmt.stdin.end();
    rubyfmt.on('close', (status) => {
      if(status == 0) {
        resolve(formattedText);
      } else {
        checkRubySyntax(sourceText).then(() => {
          reject({issue: "rubyfmtError", message: rubyfmtErrorMsg});
        }, (rubySyntaxError) => {
          reject(rubySyntaxError)
        })
      }
    })
  });
  return promise;
}
