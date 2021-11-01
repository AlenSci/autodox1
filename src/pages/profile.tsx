import * as React from 'react';
// import Table from '@mui/material/Table';
import {Route} from "react-router-dom";
import DataComp from "../components/table";
import {Rating} from "@mui/material";
import {GridColDef, GridRowsProp} from "@mui/x-data-grid-pro";
import {makeStyles} from '@mui/styles';
import {GridRenderCellParams} from '@mui/x-data-grid';

function renderRating(params: GridRenderCellParams<number>) {
  return <Rating readOnly value={params.value} />;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 16,
  },
});


function RatingEditInputCell(props: GridRenderCellParams<number>) {
  const { id, value, api, field } = props;
  const classes = useStyles();

  const handleChange = (event:any) => {
    api.setEditCellValue({ id, field, value: Number(event.target.value) }, event);
    // Check if the event is not from the keyboard
    // https://github.com/facebook/react/issues/7407
    if (event.nativeEvent.clientX !== 0 && event.nativeEvent.clientY !== 0) {
      api.commitCellChange({ id, field });
      api.setCellMode(id, field, 'view');
    }
  };

  const handleRef = (element:any) => {
    if (element) {
      element.querySelector(`input[value="${value}"]`).focus();
    }
  };

  return (
    <div className={classes.root}>
      <Rating
        ref={handleRef}
        name="rating"
        precision={1}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

function renderRatingEditInputCell(params:any) {
  return <RatingEditInputCell {...params} />;
}
const XFunction = ()=> <div>xxx</div>



export default function Profile() {
    const rows: GridRowsProp = [
        {id: 1, col1: 'username', col2: 'username'},
        {id: 2, col1: 'subscription', col2: <Rating name="customized-10" defaultValue={2} max={3} />},
    ];

    const columns: GridColDef[] = [
        {field: 'col1', headerName: 'keys', width: 150},
        {
            field: 'value',
            headerName: 'value',
            renderCell: (e:any)=> {
            return e.row.col2
            },
            // renderEditCell: renderRatingEditInputCell,
            editable: true,
            width: 180,
            type: 'string',
        },
    ];

    return (
        <Route path="/profile">
            <DataComp columns={columns} rows={rows}/>
        </Route>
    );
};
