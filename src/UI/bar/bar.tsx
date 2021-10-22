import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import AlertDialog from "../dialog";
import TabPanel from '../tab'
import SingUp from "../../components/auth/singup";
import SingIn from "../../components/auth/singIn";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export function Bar(props: any) {
    const MyButton = props.Button
    return (<HideOnScroll {...props}>
        <AppBar>
            <Toolbar>
                <MyButton/>

                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    ِAUTODOX
                </Typography>
                <AlertDialog>
                    <div style={{
                        height: '400px',
                        width: "300px"
                    }}>
                        <TabPanel
                            items={[{name: 'sign in', content: <SingIn/>}, {name: 'sign up', content: <SingUp/>}]}/>
                    </div>
                </AlertDialog>
            </Toolbar>
        </AppBar>
    </HideOnScroll>);
}