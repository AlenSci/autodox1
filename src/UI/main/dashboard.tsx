import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {css} from "@emotion/css";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
//
// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props: any) {
  const Component = props.Component
  const DrawerContent = props.DrawerContent
  const Bar = props.Bar
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen((pre:boolean) => {
        return !pre
    })
  };

    return (
        <Box sx={{display: 'flex'}}>

            <Bar Button={() =>
                <IconButton onClick={handleDrawerOpen}>
                    <MenuIcon/>
                </IconButton>
            }
            />


            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },

                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div style={{marginTop:'60px'}}>
                    <DrawerContent/>
                </div>
            </Drawer>

            <Main  open={open}>
                <DrawerHeader/>
                <Component />
            </Main>
        </Box>
    );
}
