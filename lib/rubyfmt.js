'use babel';

import { CompositeDisposable } from 'atom';
import { spawn } from 'child_process';

export default {

  subscriptions: null,
  config: {
    formatOnSave: {
      order: 1,
      title: 'Format on save',
      description: "Automatically format when saving",
      type: 'boolean',
      default: false
    },
    rubyExecutable: {
      order: 2,
      type: 'string',
      default: 'ruby',
      title: "Ruby executable",
      description: "Can be overriden with an absolute path"
    },
    rubyfmtExecutable: {
      order: 3,
      type: 'string',
      default: 'rubyfmt',
      title: "Rubyfmt executable",
      description: "Can be overriden with an absolute path"
    },
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'rubyfmt:formatBuffer': () => this.handleManualFormat()
    }));
    this.subscriptions.add(atom.workspace.observeTextEditors(textEditor => {
      buffer = textEditor.getBuffer()
      this.subscriptions.add(buffer.onWillSave(() => this.handleSave(textEditor)))
    }))
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  handleManualFormat() {
    item = atom.workspace.getActivePaneItem()
    if(item.getBuffer) {
      this.formatEditor(item);
    }
  },

  handleSave(textEditor) {
    if(this.isRuby(textEditor) && atom.config.get('rubyfmt.formatOnSave')) { this.formatEditor(textEditor) }
  },

  isRuby(textEditor) {
    return textEditor.getRootScopeDescriptor().getScopesArray().some(scope => {
      return scope.startsWith("source.ruby")
    })
  },

  formatEditor(textEditor) {
    return this.format(textEditor.getText()).then((formattedText) => {
      textEditor.setText(formattedText);
    });
  },

  format(text) {
    var promise = new Promise(function(resolve, reject) {
      var toReturn
      executable = atom.config.get('rubyfmt.rubyfmtExecutable')
      rubyfmt = spawn(executable, [], {windowsHide: true})
      rubyfmt.stdout.on('data', (data) => {
        toReturn = data.toString('utf8');
      });

      rubyfmt.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });

      rubyfmt.stdin.write(text);
      rubyfmt.stdin.end();
      rubyfmt.on('close', (status) => {
        if(status == 0) {
          resolve(toReturn);
        } else {
          reject(status)
        }
      });
    });
    return promise;
  }
};
