import CodeEditor from "../../../components/CodeEditor";
import React, {useState} from "react";
import {Button, ButtonGroup, Popper, Tooltip} from "@mui/material";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import SimpleListMenu from "./drop_down";


function CodeBlock(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMouseEnter = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMouseLeave = (event: any) => {
        setAnchorEl(null);
    };

    const OpenPopper = Boolean(anchorEl);
    const id = OpenPopper ? 'simple-popper' : undefined;
    const [code, setCode] = useState(props.element.value)
    const [language, setLanguage] = React.useState('xml');
    const x = `<html><body>${code}</body></html>`
    return (
        <div
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter} contentEditable={false}>

            <Popper placement={'top-start'} id={id} open={OpenPopper} anchorEl={anchorEl}>
                <ButtonGroup size="small" variant="contained" aria-label="outlined primary button group">
                    <Tooltip placement={'top'} title="Execute the code." arrow>
                        <Button> <PlayCircleOutlineOutlinedIcon/></Button>
                    </Tooltip>
                    <Tooltip placement={'top'} title="Execute all cells in this page." arrow>
                        <Button> <DensitySmallIcon/></Button>
                    </Tooltip>
                    <Button><SimpleListMenu onChange={setLanguage} options={[
                        'javascript',
                        'python',
                        'xml',
                        'css',
                        'json',
                    ]}/></Button>

                </ButtonGroup>
            </Popper>
            <CodeEditor
                onChange={setCode}
                language={language}
                value={code}/>
            <span style={{background: 'gray', color: 'white'}}>


</span>
            <iframe
                srcDoc={x}
                title="output"
                sandbox="allow-scripts"
                width="100%"
                height="100%"
                frameBorder="0"
            />
        </div>
    )
}

export default CodeBlock