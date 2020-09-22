import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, TextField } from "@material-ui/core";
import { createUseStyles } from "react-jss";
import Icon from "@material-ui/core/Icon";

function RegisterWorkoutModal({
  open,
  handleClose,
  prevRoutine,
  handleSaveForm,
  handleUpdateItem,
}) {
  const [routine, setRoutine] = useState({ title: "", workouts: [] });
  const classes = useStyles();

  const handleNewWorkout = () => {
    let newWorkouts = [...routine.workouts];
    newWorkouts.push({ title: "", series: "", reps: "" });
    setRoutine({ ...routine, workouts: newWorkouts });
  };

  useEffect(() => {
    setRoutine(
      !!prevRoutine ? { ...prevRoutine } : { title: "", workouts: [] }
    );
  }, [open, prevRoutine]);

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h6" className={classes.title}>
            {!!prevRoutine ? "Edit Workout" : "New Workout"}
          </Typography>
          <Icon className={classes.closeIcon} onClick={handleClose}>
            close
          </Icon>
        </div>
        <div className={classes.body}>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              value={routine.title}
              label="Workout Name"
              placeholder="Workout A"
              className={classes.inputText}
              onChange={(e) =>
                setRoutine({ ...routine, title: e.target.value })
              }
            />
            <div className={classes.divisor}>
              <Typography className={classes.divisorTitle}>
                Exercises
              </Typography>
              <Icon
                fontSize="large"
                className={classes.addWorkout}
                onClick={() => handleNewWorkout()}
              >
                add_circle
              </Icon>
            </div>
            <div className={classes.workoutList}>
              {!!routine.workouts.length ? (
                routine.workouts.map((workout, index) => (
                  <div className={classes.workoutForm} key={index}>
                    <TextField
                      variant="outlined"
                      value={workout.title}
                      label="Name"
                      placeholder="Push ups"
                      className={classes.inputTextWorkoutTitle}
                      onChange={(e) => {
                        let newRoutine = { ...routine };
                        newRoutine.workouts[index].title = e.target.value;
                        setRoutine({ ...newRoutine });
                      }}
                    />
                    <TextField
                      type="number"
                      variant="outlined"
                      value={workout.series}
                      label="Series"
                      placeholder="4"
                      className={classes.inputTextWorkout}
                      onChange={(e) => {
                        let newRoutine = { ...routine };
                        newRoutine.workouts[index].series = e.target.value;
                        setRoutine({ ...newRoutine });
                      }}
                    />
                    <TextField
                      type="number"
                      variant="outlined"
                      value={workout.reps}
                      label="Reps"
                      placeholder="10"
                      className={classes.inputTextWorkout}
                      onChange={(e) => {
                        let newRoutine = { ...routine };
                        newRoutine.workouts[index].reps = e.target.value;
                        setRoutine({ ...newRoutine });
                      }}
                    />
                  </div>
                ))
              ) : (
                <Typography>
                  Press the green button to add a new exercise
                </Typography>
              )}
            </div>
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              !!prevRoutine
                ? handleUpdateItem(routine)
                : handleSaveForm(routine);
              handleClose();
            }}
          >
            <Typography>Save</Typography>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default RegisterWorkoutModal;

const useStyles = createUseStyles({
  modal: { display: "flex", justifyContent: "center", alignItems: "center" },
  container: {
    height: window.innerHeight * 0.8,
    width: "50vw",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  "@media (max-width: 900px)": {
    container: {
      height: window.innerHeight * 0.8,
      width: "100vw",
      backgroundColor: "#f5f5f5",
      borderRadius: 12,
    },
  },

  header: {
    display: "flex",
    flexDirection: "row",
    height: window.innerHeight * 0.05,
    backgroundColor: "#3f51b5",
    padding: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: "center",
  },
  title: { color: "#fff", flexGrow: 1 },
  closeIcon: {
    color: "#fff",
    cursor: "pointer",
    "&:active": {
      color: "#e5e5e5",
    },
  },
  body: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
    height: window.innerHeight * 0.7,
  },
  inputText: {
    width: "100%",
  },
  form: {
    paddingTop: 8,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "scroll",
  },

  divisor: {
    height: window.innerHeight * 0.02,
    padding: 8,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    borderBottom: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#a1a1a1",
  },
  divisorTitle: { flexGrow: 1 },
  workoutList: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
  },
  addWorkout: {
    color: "forestGreen",
    cursor: "pointer",
    "&:active": { color: "green" },
  },
  workoutForm: {
    paddingTop: 8,
    paddingBottom: 4,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  inputTextWorkout: {
    flex: 1,
  },
  inputTextWorkoutTitle: {
    flex: 3,
  },
});
