import * as React from 'react';
import {
    gridFilterActiveItemsSelector,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import {Button, ButtonGroup, Input} from "@mui/material";
import {useState} from "react";


function CustomToolbar() {
    const [state, setState]: any = useState(false)
    return (
        <GridToolbarContainer
            onMouseEnter={() => setState(true)}
            onMouseLeave={() => setState(false)}
             style={{height:'40px',
                    opacity: state ? '100%' : '0', transition: 'opacity 0.1s'
                }}
        >
            {/*@ts-ignore*/}
            <Input style={{width: '30%'}} placeholder={'Table title.'}/>
            <Button>Add view</Button>
            <GridToolbarColumnsButton/>
            <GridToolbarFilterButton/>
            <GridToolbarDensitySelector/>
            <GridToolbarExport/>
        </GridToolbarContainer>
    );
}

export default CustomToolbar