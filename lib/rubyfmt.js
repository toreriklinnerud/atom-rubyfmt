'use babel';

import { CompositeDisposable } from 'atom';

import { spawnFormat } from './spawn-format';

let notifications = [];

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
    rubyfmtArgs: {
      order: 3,
      type: 'array',
      default: ['--disable=gems', '~/bin/rubyfmt.rb'],
      items: {
        type: 'string'
      },
      title: "Rubyfmt executable",
      description: "Can be overriden with additional parameters"
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
    if(this.isRuby(textEditor) && atom.config.get('rubyfmt.formatOnSave')) {
      return this.formatEditor(textEditor)
    }
  },

  isRuby(textEditor) {
    return textEditor.getRootScopeDescriptor().getScopesArray().some(scope => {
      return scope.startsWith("source.ruby")
    })
  },

  formatEditor(textEditor) {
    while(notification = notifications.pop()) {
      notification.dismiss();
    }

    return spawnFormat(textEditor.getText()).then((formattedText) => {
      textEditor.setText(formattedText);
    }, (error) => {
      switch(error.issue) {
        case 'rubySyntaxError':
          notifications.push(atom.notifications.addError(
            "A Ruby syntax error prevents formatting",
            {detail: error.message, dismissable: true}
          ));
          break;
        case 'rubyfmtError':
          notifications.push(atom.notifications.addError(
            "Failed to execute rubyfmt",
            {detail: error.message, dismissable: true}
          ));
          break;
        default:
          throw(error);
      }
    });
  }
}
