import {Transforms} from "slate";
import React from "react";
import {useFocused, useSelected} from "slate-react";
import uniqid from 'uniqid';


export const Mention = ({attributes, children, element}: any) => {
    console.log('Mention component')
    const selected = useSelected()
    const focused = useFocused()
    return (
        <span
            {...attributes}
            contentEditable={false}
            data-cy={`mention-${element.character.replace(' ', '-')}`}
            style={{
                padding: '3px 3px 2px',
                margin: '0 1px',
                verticalAlign: 'baseline',
                display: 'inline-block',
                borderRadius: '4px',
                backgroundColor: '#eee',
                fontSize: '0.9em',
                boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
            }}
        >
      @{element.character}
            {children}
    </span>
    )
}

export const mentoin_element: any = {
    'mention': {
        'element': (props: any) => <Mention {...props} />,
        'insert': (character: any) => ({
            type: 'mention',
            id: uniqid(),
            character,
            children: [{text: ''}],
        }),
    },

};


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

export const insertMention = (editor: any, character: any) => {
    Transforms.insertNodes(editor, mentoin_element.mention.insert(character))
    Transforms.move(editor)
};
export const withMentions = (editor: any) => {
    const {isInline, isVoid} = editor

    editor.isInline = (element: any) => {
        return element.type === 'mention' ? true : isInline(element)
    };
    editor.isVoid = (element: any) => {
        return element.type === 'mention' ? true : isVoid(element)
    }

    return editor
}


