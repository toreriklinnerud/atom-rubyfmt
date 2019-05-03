'use babel';

import { CompositeDisposable } from 'atom';
import { spawn } from 'child_process';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rubyfmt:formatBuffer': () => this.formatBuffer()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  formatBuffer() {
    activePaneItem = atom.workspace.getActivePaneItem();
    if(activePaneItem.getText) {
      text = activePaneItem.getText()
      this.format(text).then((formattedText) => {
        activePaneItem.setText(formattedText);
      });
    }
  },

  format(text) {
    var promise = new Promise(function(resolve, reject) {
      var toReturn
      rubyfmt = spawn('rubyfmt', [], {windowsHide: true})
      rubyfmt.stdout.on('data', (data) => {
        toReturn = data.toString('utf8');
      });

      rubyfmt.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      rubyfmt.stdin.write(text);
      rubyfmt.stdin.end();
      rubyfmt.on('close', () => {
        resolve(toReturn);
      });
    });
    return promise;
  }
};
