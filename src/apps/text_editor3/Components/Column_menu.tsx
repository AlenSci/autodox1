import * as React from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {
    GridColumnMenu,
    GridColumnMenuContainer,
    GridColumnMenuProps,
    GridFilterMenuItem,
    SortGridMenuItems,
    useGridApiRef,
    DataGridPro,
} from '@mui/x-data-grid-pro';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import {Input, MenuItem} from "@mui/material";

const StyledGridColumnMenuContainer = styled(GridColumnMenuContainer)<{
    ownerState: { color: string };
}>(({theme, ownerState}: any) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText,
}));

const StyledGridColumnMenu = styled(GridColumnMenu)<{
    ownerState: { color: string };
}>(({theme, ownerState}: any) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText,
}));

export function CustomColumnMenuComponent(
    props: GridColumnMenuProps & { color: string },
) {
    const {hideMenu, currentColumn, color, ...other} = props;

    return (
        <StyledGridColumnMenuContainer
            hideMenu={hideMenu}
            currentColumn={currentColumn}
            ownerState={{color}}
            {...other}

        >

            <Input style={{color:'white'}} defaultValue={currentColumn.field}/>
            <MenuItem>Formula</MenuItem>
            <MenuItem>xx</MenuItem>
            {/*<SortGridMenuItems onClick={hideMenu} column={currentColumn!}/>*/}
            {/*<GridFilterMenuItem onClick={hideMenu} column={currentColumn!}/>*/}
        </StyledGridColumnMenuContainer>
    );
    // if (currentColumn.field === 'firsetName') {
    //   return (
    //     <StyledGridColumnMenuContainer
    //       hideMenu={hideMenu}
    //       currentColumn={currentColumn}
    //       ownerState={{ color }}
    //       {...other}
    //     >
    //       <Box
    //         sx={{
    //           width: 127,
    //           height: 160,
    //           display: 'flex',
    //           justifyContent: 'center',
    //           flexDirection: 'column',
    //           alignItems: 'center',
    //         }}
    //       >
    //         <StarOutlineIcon sx={{ fontSize: 80 }} />
    //       </Box>
    //     </StyledGridColumnMenuContainer>
    //   );
    // }
    // return (
    //   <StyledGridColumnMenu
    //     hideMenu={hideMenu}
    //     currentColumn={currentColumn}
    //     ownerState={{ color }}
    //     {...other}
    //   />
    // );
}

// export default function CustomColumnMenu() {
//   const [color, setColor] = React.useState<'primary' | 'secondary'>('primary');
//   const apiRef = useGridApiRef();
//
//   return (
//     <div
//       style={{
//         width: '100%',
//       }}
//     >
//       <Button
//         color={color}
//         variant="outlined"
//         onClick={(event) => {
//           event.stopPropagation();
//           setColor((current) => (current === 'primary' ? 'secondary' : 'primary'));
//           apiRef.current.showColumnMenu('default');
//         }}
//       >
//         Toggle menu background
//       </Button>
//       <div style={{ height: 250, width: '100%', marginTop: 16 }}>
//         <DataGridPro
//           apiRef={apiRef}
//           columns={[
//             { field: 'default', width: 150 },
//             { field: 'name', width: 150 },
//             { field: 'stars', width: 150 },
//           ]}
//           rows={[
//             {
//               id: 1,
//               name: 'MUI',
//               stars: 28000,
//               default: 'Open source',
//             },
//             {
//               id: 2,
//               name: 'DataGridPro',
//               stars: 15000,
//               default: 'Enterprise',
//             },
//           ]}
//           components={{
//             ColumnMenu: CustomColumnMenuComponent,
//           }}
//           componentsProps={{
//             columnMenu: { color },
//           }}
//         />
//       </div>
//     </div>
//   );
// }
