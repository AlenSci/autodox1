import React from "react";
import {mentoin_element} from "./inserts/mentoin_element";
import {components_elements} from "./inserts/elements";


const Element = (props: any) => {

    const {attributes, children, element} = props
    const x = {};
    [mentoin_element, components_elements].map((i: any) => {
        Object.keys(i).map((key: any) => {
            if ('element' in i[key]) {
                // @ts-ignore
                x[key] = i[key].element(props)
            }
        });
    })
    const y: any = element.type
    // @ts-ignore
    return x[y] || <p {...attributes}>{children}</p>

};
export default Element;
