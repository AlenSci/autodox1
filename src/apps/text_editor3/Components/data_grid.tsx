import * as React from 'react';
import RichText from "../richtext";
import {CustomColumnMenuComponent} from "./Column_menu";
import CustomToolbar from "./tool_bar";
// import {DataGridPro,} from '@mui/x-data-grid-pro';
import {DataGrid, GridRenderCellParams} from "@mui/x-data-grid";
import { Theme, styled } from '@mui/material/styles';

function getFullName(params: any) {
    return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color:
    theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
    }`,
  },
  '& .MuiDataGrid-cell': {
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  ...customCheckbox(theme),
}));



const render_cell = (params: GridRenderCellParams<Date>) => {
    console.log({params})
    var text: any
    try {
        text = params.value.getFullYear()
    } catch {
        text = params.formattedValue
    }

    return (<RichText path={'target'} main_editor={'editor'} initialValue={[
        {type: 'paragraph', children: [{text: `${text}`}]},
    ]}/>)
}

const columns: any = [
    {
        field: 'date',
        headerName: 'Year',
        width: 150,
        renderCell: render_cell,
    },
    {
        field: 'firstName',
        headerName: 'first name',
        width: 150,
        renderCell: render_cell,
    },
    {
        field: 'lastName',
        headerName: 'last name',
        width: 150,
        renderCell: render_cell,
    },
    {
        field: 'fullName',
        headerName: 'full name',
        width: 150,
        renderCell: render_cell,
        valueGetter: getFullName,

    },

];

const rows = [
    {
        id: 1,
        date: '1998',
        firstName: "Sam",
        lastName: "Agent",
    },
    {
        id: 2,
        date: new Date(1984, 1, 1),
        firstName: "Ali",
        lastName: "karaawi",
    },
    {
        id: 3,
        date: new Date(1992, 2, 1),
        firstName: "Alex",
        lastName: "Linken",
    },
];

function customCheckbox(theme: Theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
      }`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  };
}


export default function RenderCellGrid() {
    const [color, setColor] = React.useState<'primary' | 'secondary'>('primary');
    return (
        <div contentEditable={false} style={{height: 300, width: '100%'}}>

            <StyledDataGrid rows={rows} columns={columns}
                      components={{
                          ColumnMenu: CustomColumnMenuComponent,
                          Toolbar: CustomToolbar,
                          // Footer: CustomFooter,
                      }}
                      componentsProps={{
                          columnMenu: {color},
                      }}
            />

        </div>
    );
}
