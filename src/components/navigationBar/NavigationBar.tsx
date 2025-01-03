import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { clLogo } from "../../assets";

export default function NavigationBar() {
  return (
    <AppBar position="sticky" variant="outlined" color="primary">
      <Toolbar sx={{ gap: "1rem" }}>
        <Avatar src={clLogo} sx={{ borderRadius: 0, width: "2.5rem", height: "2.5rem" }} />

        <Button color="inherit" component={Link} to="/">
          <Typography variant="h6">Home</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
