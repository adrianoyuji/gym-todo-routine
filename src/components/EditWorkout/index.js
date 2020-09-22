import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Button, Fab } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import RegisterWorkoutModal from "../RegisterWorkoutModal";
import WorkoutItem from "../WorkoutItem";

function EditWorkout({ schedule, setSchedule }) {
  const [registerModal, setRegisterModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const classes = useStyles();

  const handleSaveForm = (routine) => {
    setSchedule([...schedule, routine]);
  };
  const handleEditItem = (index) => {
    setSelectedItem(schedule[index]);
    setRegisterModal(true);
  };
  const handleDeleteItem = (index) => {
    setSchedule(schedule.filter((workout, i) => i !== index));
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        {schedule.map((workout, index) => (
          <WorkoutItem
            key={index}
            workout={workout}
            index={index}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </div>
      <div className={classes.floatingAddButton}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => {
            setSelectedItem(false);
            setRegisterModal(true);
          }}
        >
          <Icon>add</Icon>
        </Fab>
      </div>
      <RegisterWorkoutModal
        open={registerModal}
        handleClose={() => {
          setRegisterModal(false);
          setSelectedItem(false);
        }}
        handleSaveForm={handleSaveForm}
        prevRoutine={!!selectedItem && selectedItem}
      />
    </div>
  );
}

export default EditWorkout;

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "auto",
    paddingTop: 8,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "84vh",
    alignItems: "center",
    overflowY: "scroll",
  },
  floatingAddButton: {
    position: "fixed",
    bottom: "10vh",
    right: 8,
  },
});
