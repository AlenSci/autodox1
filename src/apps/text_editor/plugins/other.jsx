export function withMyPlugin(editor: ReactEditor) {
    const { insertText, insertData, normalizeNode, isVoid, isInline } = editor;

    // called whenever text is inserted into the document (e.g. when
    // the user types something)
    editor.insertText = (text) => {
      // do something interesting!
      insertText(text);
    };

    // called when the users pastes or drags things into the editor
    editor.insertData = (data) => {
      // do something interesting!
      insertData(data);
    };

    // we'll dedicate a whole post to this one, but the gist is that it's used
    // to enforce your own custom schema to the document JSON
    editor.normalizeNode = (entry) => {
      // do something interesting!
      normalizeNode(entry);
    };

    // tells slate that certain nodes don't have any text content (they're _void_)
    // super handy for stuff like images and diagrams
    editor.isVoid = (element) => {
      if (element.type === 'image') {
        return true;
      }
      return isVoid(element);
    };

    // tells slate that certain nodes are inline and should flow with text, like
    // the link in our example above
    editor.isInline = (element) => {
      if (element.type === 'link') {
        return true;
      }
      return isInline(element);
    };

    return editor;
  }
