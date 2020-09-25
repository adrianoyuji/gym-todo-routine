import React from "react";
import { createUseStyles } from "react-jss";

function Settings() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src="https://media-exp1.licdn.com/dms/image/C4D03AQEAsQ_h7forgw/profile-displayphoto-shrink_800_800/0?e=1606348800&v=beta&t=djMq1GHn9uaUey0sLfVr4URnSiTUGy8cdPur2Kf68ps" />
    </div>
  );
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
