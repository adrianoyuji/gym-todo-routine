import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Fab } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import RegisterWorkoutModal from "../RegisterWorkoutModal";
import WorkoutItem from "../WorkoutItem";

function EditWorkout({ schedule, setSchedule }) {
  const [registerModal, setRegisterModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const classes = useStyles();

  const handleSaveForm = (routine) => {
    setSchedule([...schedule, routine]);
  };
  const handleEditItem = (index) => {
    setSelectedItem({ ...schedule[index] });
    setSelectedItemIndex(index);
    setRegisterModal(true);
  };
  const handleDeleteItem = (index) => {
    setSchedule(schedule.filter((workout, i) => i !== index));
  };
  const handleUpdateItem = (routine) => {
    let newSchedule = [...schedule];
    newSchedule[selectedItemIndex] = routine;
    setSchedule([...newSchedule]);
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
            setSelectedItem(null);
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
          setSelectedItemIndex(null);
          setSelectedItem(null);
        }}
        handleUpdateItem={handleUpdateItem}
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
    height: window.innerHeight * 0.84,
    alignItems: "center",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  floatingAddButton: {
    position: "fixed",
    bottom: window.innerHeight * 0.1,
    right: 8,
  },
});
