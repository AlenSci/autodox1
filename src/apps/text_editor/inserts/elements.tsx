import {Transforms} from "slate";

export  const insertElement = (editor: any, character: string) => {
    var element:any
    if (character === 'divider') {
        element = [{
            type: character,
            children: [{text: ''}],
        }, {
            type: 'paragraph',
            children: [{text: ''}],
        }]
    } else {
        element = {
            type: character,
            children: [{text: ''}],
        }
    }

        Transforms.insertNodes(editor, element )
    };
export const CHARACTERS_E = [
        'bulleted-list',
        'check-list-item',
        'divider',
        'check-list-item',
        'paragraph',
    ]


