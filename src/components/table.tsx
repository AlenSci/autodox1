import React from 'react';
import {DataGridPro} from '@mui/x-data-grid-pro';

export default function DataComp(props:any ) {
  const {columns, rows}:any = props;
  return (
    <DataGridPro style={{ height: '300px', width: '100%' }} rows={rows} columns={columns}/>
  );
}
