import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuButton } from "./MenuButton";
import { Switch, useTheme } from "@mui/material";

type changeModeHandlerPropsType = {
  changeModeHandler: () => void
};

export default function ButtonAppBar({ changeModeHandler }: changeModeHandlerPropsType) {

  const changeMode = () => {changeModeHandler()}

  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: "20px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MaterialUI
          </Typography>
          <MenuButton color="inherit" background={theme.palette.primary.main}>
            Login
          </MenuButton>
          <MenuButton color="inherit">Logout</MenuButton>
          <MenuButton color="inherit">FAQ</MenuButton>
          <Switch onChange={changeMode} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
