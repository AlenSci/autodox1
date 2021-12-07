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
import OAuth2 from "../../Oauth2";
import ControlPanel from "../controlpanel";
import {css} from "@emotion/css";
import LogoutIcon from "@mui/icons-material/Logout";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";

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
    const token: string = localStorage.getItem('token') || '';
    const MyButton = props.Button
    const {RightButtons} = props
    console.log(token.length >= 10)

    return (<HideOnScroll  {...props}>
        <AppBar
            className={css`
            background-color: #fff;
            background-color: rgba(250, 250, 250, 0.1);
            backdrop-filter: blur(4px);
        `}

            position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} style={{padding: 0}}>
            <Toolbar style={{padding: 0, margin: 0}}>
                <MyButton/>
                <Typography color={'gray'} variant="h6" component="div" sx={{flexGrow: 1}}>
                    ِAUTODOX:             Ali Al-karaawi website sample.
                </Typography>

                <RightButtons/>

            </Toolbar>
        </AppBar>
    </HideOnScroll>);
}