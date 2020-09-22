import React from "react";
import { createUseStyles } from "react-jss";

function Settings() {
  const classes = useStyles();
  return <div className={classes.container}>WIP</div>;
}

export default Settings;

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: window.innerHeight * 0.84,
    alignItems: "center",
    overflowY: "scroll",
  },
});
