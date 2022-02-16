import {Descendant} from "slate";

export const initialValue: Descendant[] | any = [
    {
        id: '1x',
        type: 'paragraph',
        children: [
            {
                text:
                    'With Slate you can build complex block types that have their own embedded content and behaviors, like rendering checkboxes inside check list items!',
            },
        ],
    },
    {
        id: '11x',
        type: 'data-grid',
        data:[],
        children: [{text: ""}],
    },
    {
        id: '2x',
        type: 'check-list-item',
        checked: true,
        children: [{text: 'Slide to the left.'}],
    },
    {
        id: '3x',
        type: 'check-list-item',
        checked: true,
        children: [{text: 'Slide to the right.'}],
    },
    {
        id: '4x',
        type: 'check-list-item',
        checked: false,
        children: [{text: 'Criss-cross.'}],
    },
    {
        id: '5x',
        type: 'check-list-item',
        checked: true,
        children: [{text: 'Criss-cross!'}],
    },
    {
        id: '6x',
        type: 'check-list-item',
        checked: false,
        children: [{text: 'Cha cha real smooth…'}],
    },
    {
        id: '7x',
        type: 'check-list-item',
        checked: false,
        children: [{text: "Let's go to work!"}],
    },
    {
        id: '8x',
        type: 'paragraph',
        children: [{text: 'Try it out for yourself!'}],
    },
    {
        id: '9x',
        type: 'code',
        value: '<h1> hello world </h1>',
        children: [{text: ""}],
    },
    {
        id: '10x',
        type: 'code',
        value: '<code style="color: red"> code is here </code>">',
        children: [{text: ""}],
    },

]
