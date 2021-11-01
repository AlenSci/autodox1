import {Descendant} from "slate";

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            {
                text:
                    'With Slate you can build complex block types that have their own embedded content and behaviors, like rendering checkboxes inside check list items!',
            },
        ],
    },
    {
        type: 'image',
        checked: true,
        children: [{text: 'xxxx'}],
    },

    {
        type: 'check-list-item',
        checked: true,
        children: [{text: 'Slide to the left.'}],
    },
    {
        type: 'check-list-item',
        checked: true,
        children: [{text: 'Slide to the right.'}],
    },
    {
        type: 'check-list-item',
        checked: false,
        children: [{text: 'Criss-cross.'}],
    },
    {
        type: 'check-list-item',
        checked: true,
        children: [{text: 'Criss-cross!'}],
    },
    {
        type: 'check-list-item',
        checked: false,
        children: [{text: 'Cha cha real smooth…'}],
    },
    {
        type: 'check-list-item',
        checked: false,
        children: [{text: "Let's go to work!"}],
    },
    {
        type: 'paragraph',
        children: [{text: 'Try it out for yourself!'}],
    },
];
export default initialValue