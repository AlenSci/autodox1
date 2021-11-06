import {css} from "@emotion/css";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

const CollabeHoeer = (props: any) => {
    const {attributes, children, leaf} = props
    return <Tooltip placement="top" arrow open={leaf.collaborate} title={leaf.sender}>
        <span
            className={css`
            font-weight: ${leaf.bold && 'bold'};

        ${leaf.bold &&
            css`
            &:hover {
            color: red;
            }
          `}
          `}
            {...attributes}
        >
            {children}
    </span>
    </Tooltip>;
};
export default CollabeHoeer