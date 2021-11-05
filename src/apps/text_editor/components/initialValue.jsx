import {Descendant} from "slate";
import uniqid from "uniqid";

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        id:uniqid(),
        children: [
            {
                text:
                    'With Slate you can build complex block types that have their own embedded content and behaviors, like rendering checkboxes inside check list items!',
            },
        ],
    },
    {
        type: 'image',
        id:uniqid(),
        checked: true,
        children: [{text: 'xxxx'}],
    },

    {
        type: 'check-list-item',
        id:uniqid(),
        checked: true,
        children: [{text: 'Slide to the left.'}],
    },
    {
        type: 'check-list-item',
        id:uniqid(),
        checked: true,
        children: [{text: 'Slide to the right.'}],
    },

];
export default initialValue