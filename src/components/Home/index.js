import React, { useState, useEffect } from "react";
import { Button, Typography, Paper, Checkbox } from "@material-ui/core";
import { createUseStyles } from "react-jss";

function Home({ schedule, session, setSession, checkboxes, setCheckboxes }) {
  const [endedSession, setEndedSession] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!!session) {
      let condition = true;
      for (let cb in checkboxes) {
        if (checkboxes[cb] === false) {
          condition = false;
        }
      }
      setEndedSession(condition);
    }
  }, [checkboxes]);

  const renderWorkoutSession = () => {
    return (
      <div className={classes.session}>
        <Typography variant="h5">{session.title}</Typography>
        {session.workouts.map((exercise, index) => (
          <div className={classes.exercisesList} key={index}>
            <Typography variant="h6" className={classes.flexGrow}>
              {exercise.title}
            </Typography>
            <Typography variant="h6">
              {exercise.series} x {exercise.reps}
            </Typography>
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              onChange={(event) => {
                setCheckboxes({
                  ...checkboxes,
                  [exercise.title]: event.target.checked,
                });
              }}
            />
          </div>
        ))}
        {endedSession ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.finishButton}
            onClick={() => {
              setEndedSession(false);
              setSession(null);
              setCheckboxes(null);
            }}
          >
            Finish session
          </Button>
        ) : null}
      </div>
    );
  };

  const renderSchedule = () => {
    return !!schedule ? (
      <>
        {schedule.map((workout, index) => (
          <Paper elevation={3} className={classes.paperContainer} key={index}>
            <Typography variant="h5">{workout.title}</Typography>
            {workout.workouts.map((exercise, index) => (
              <div className={classes.exercisesList} key={index}>
                <Typography variant="h6" className={classes.flexGrow}>
                  {exercise.title}
                </Typography>
                <Typography variant="h6">
                  {exercise.series} x {exercise.reps}
                </Typography>
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              className={classes.startButton}
              onClick={() => setSession(workout)}
            >
              Start
            </Button>
          </Paper>
        ))}
      </>
    ) : null;
  };

  return (
    <div className={classes.container}>
      {!!session ? renderWorkoutSession() : renderSchedule()}
    </div>
  );
}

export default Home;

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "84vh",
    alignItems: "center",
    overflowY: "scroll",
  },
  paperContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "auto",
    width: "90%",
    padding: 8,
    marginTop: 12,
  },
  session: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "auto",
    width: "90%",
    backgroundColor: "#e5e5e5",
    padding: 8,
    marginTop: 12,
  },
  exercisesList: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  flexGrow: { display: "flex", flexGrow: 1 },
  startButton: { display: "flex", alignSelf: "flex-end" },
  finishButton: { display: "flex", alignSelf: "center", justifySelf: "center" },
});
