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
  const [schedule, setSchedule] = useState([]);
  const [navigation, setNavigation] = useState("home");
  const [session, setSession] = useState(null);
  const [checkboxes, setCheckboxes] = useState({});

  const classes = useStyles();
  useEffect(() => {
    if (!!session) {
      let checkboxList = {};
      session.workouts.forEach(
        (ex) => (checkboxList = { ...checkboxList, [ex.title]: false })
      );

      setCheckboxes(checkboxList);
    }
  }, [session]);

  useEffect(() => {
    let localStorageSchedule = localStorage.getItem("scheduleList");
    if (!!localStorageSchedule) {
      setSchedule(JSON.parse(localStorageSchedule));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("scheduleList", JSON.stringify([...schedule]));
  }, [schedule]);

  const renderTitle = {
    edit: () => "Manage Workouts",
    home: () => "Home",
    settings: () => "Settings",
  };

  const renderComponent = {
    edit: () => <EditWorkout schedule={schedule} setSchedule={setSchedule} />,
    home: () => (
      <Home
        schedule={schedule}
        session={session}
        setSession={setSession}
        checkboxes={checkboxes}
        setCheckboxes={setCheckboxes}
      />
    ),
    settings: () => <Settings />,
  };

  return loading ? (
    <div>cu</div>
  ) : (
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
