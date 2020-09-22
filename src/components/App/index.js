import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import {
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Typography,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

//components
import EditWorkout from "../EditWorkout";
import Home from "../Home";
import Settings from "../Settings";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState([
    {
      title: "Treino A",
      workouts: [
        { title: "Flexão", series: "3", reps: "5" },
        { title: "Supino", series: "3", reps: "10" },
      ],
    },
    {
      title: "Treino B",
      workouts: [
        { title: "Leg press", series: "3", reps: "5" },
        { title: "Agachamento", series: "3", reps: "10" },
      ],
    },
    {
      title: "Treino C",
      workouts: [
        { title: "Rosca direta", series: "3", reps: "5" },
        { title: "Triceps corda", series: "3", reps: "10" },
      ],
    },
  ]);
  const [navigation, setNavigation] = useState("edit");

  const classes = useStyles();

  const renderTitle = {
    edit: () => "Edit Workout",
    home: () => "Home",
    settings: () => "Settings",
  };

  const renderComponent = {
    edit: () => <EditWorkout schedule={schedule} setSchedule={setSchedule} />,
    home: () => <Home />,
    settings: () => <Settings />,
  };

  return (
    <div className={classes.App}>
      <AppBar position="static" className={classes.appBar}>
        <Typography variant="h6" className={classes.title}>
          {renderTitle[navigation]()}
        </Typography>
      </AppBar>
      <div className={classes.main}>{renderComponent[navigation]()}</div>
      <BottomNavigation
        value={navigation}
        onChange={(e, newValue) => setNavigation(newValue)}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Edit"
          value="edit"
          icon={<Icon>add_circle</Icon>}
        />
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<Icon>home</Icon>}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<Icon>settings</Icon>}
        />
      </BottomNavigation>
    </div>
  );
};

//styles
const useStyles = createUseStyles({
  App: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
  main: { flex: 1 },
  root: {
    color: "#c3c3c3",
    justifyContent: "flex-end",
  },
  appBar: {
    height: 50,
    justifyContent: "center",
  },
  title: {
    paddingLeft: 16,
  },
});

export default App;
