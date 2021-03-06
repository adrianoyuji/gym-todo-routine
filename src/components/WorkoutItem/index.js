import React from "react";
import { createUseStyles } from "react-jss";
import { Typography, Paper } from "@material-ui/core";

import Icon from "@material-ui/core/Icon";

function WorkoutItem({ workout, handleEditItem, handleDeleteItem, index }) {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.container}>
      <Typography className={classes.title}>{workout.title}</Typography>
      <Icon className={classes.edit} onClick={() => handleEditItem(index)}>
        edit
      </Icon>
      <Icon className={classes.delete} onClick={() => handleDeleteItem(index)}>
        delete
      </Icon>
    </Paper>
  );
}

export default WorkoutItem;

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: window.innerHeight * 0.05,
    width: "90%",
    backgroundColor: "#e5e5e5",
    padding: 8,
    marginTop: 12,
  },
  title: {
    fontWeight: "bold",
    flexGrow: 1,
  },
  edit: {
    color: "#000080",
    cursor: "pointer",
  },
  delete: {
    color: "crimson",
    cursor: "pointer",
    paddingLeft: 8,
  },
});
