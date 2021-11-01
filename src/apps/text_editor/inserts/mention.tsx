import {MentionElement} from "../components/custom-types";
import {Transforms} from "slate";

export const insertMention = (editor: any, character: any) => {

        const mention: MentionElement = {
            type: 'mention',
            character,
            children: [{text: ''}],
        }

        Transforms.insertNodes(editor, mention)
        Transforms.move(editor)
    }
export const CHARACTERS = [
        'Aayla Secura',
        'Adi Gallia',
        'Admiral Dodd Rancit',
        'Admiral Firmus Piett',
        'Admiral Gial Ackbar',
        'Admiral Ozzel',
        'Zam Wesell',
        'Zev Senesca',
        'Ziro the Hutt',
        'Zuckuss',
    ]


export const withMentions = (editor:any) => {
  const { isInline, isVoid } = editor

  editor.isInline = (element: any) => {
    return element.type === 'mention' ? true : isInline(element)
  };
  editor.isVoid = (element:any) => {
    return element.type === 'mention' ? true : isVoid(element)
  }

  return editor
}
