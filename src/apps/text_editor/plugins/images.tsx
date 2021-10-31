const withImages = (editor:any) => {
  const { isVoid } = editor
  editor.isVoid = (element:any) => {
    return element.type === 'image' ? true : isVoid(element)
  }
  return editor
}
export default withImages