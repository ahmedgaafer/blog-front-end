import React, { useState } from "react";
import { Container } from "../Container";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import API from "../../actions/API/index";
import { useDispatch } from "react-redux";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    margin: "0 auto",
    marginTop: "30px",
    [theme.breakpoints.down("sm")]: {
      margin: "-1px",
    },
  },
  tabColor: {
    backgroundColor: "#393e46",
    color: "#eeeeee",
  },
  menuColor: {
    backgroundColor: "#232931",
    borderColor: "white",
    color: "#4ecca3",
  },
  btnColor: {
    backgroundColor: "#eeeeee",
    color: "#4ecca3",
    borderRadius: "5px",
    marginBottom: "5px",
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  submit: {
    backgroundColor: "#4ecca3",
    color: "#232931",
    "&:hover": {
      color: "#2baa81",
      backgroundColor: "#eeeeee",
      border: "2px solid #2baa81",
    },
  },
}));

const SignIn = ({dispatch}) => {
  const classes = useStyles();
  const [state, setState] = useState({email:'', password:''});

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    API.Auth.login(state)(dispatch);

  }
  return (
    <ValidatorForm
      className={classes.inputGroup}
      onSubmit={handleSubmit}
      >
      <TextValidator
        type="email"
        className={classes.btnColor}
        onChange={handleChange}
        value={state.email}
        name="email"
        id="email"
        variant="filled"
        label="E-mail"
        autoComplete="username"
        validators={['required', 'isEmail']}
        errorMessages={['this field is required', 'email is not valid']}
      />
      <TextValidator
        type="password"
        className={classes.btnColor}
        onChange={handleChange}
        value={state.password}
        name="password"
        id="password"
        label="Password"
        variant="filled"
        autoComplete="current-password"
        validators={['minStringLength:4', 'maxStringLength:10']}
        errorMessages={['Password must contain 4 - 10 characters', 'Password must contain 4 - 10 characters']}
      />
      <Button type="submit" className={classes.submit}>
        Login
      </Button>
    </ValidatorForm>
  );
};

const SignUp = ({dispatch}) => {
  const classes = useStyles();
  const [state, setState] = useState({email:'', password:'', username:''});

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  function handleSubmit(e) {
    e.preventDefault();
    
    API.register(state)(dispatch);
  }
  return (
    <ValidatorForm
      className={classes.inputGroup}
      onSubmit={handleSubmit}
      >
      <TextValidator
        type="text"
        className={classes.btnColor}
        onChange={handleChange}
        value={state.username}
        name="username"
        id="username"
        label="Username"
        variant="filled"
        validators={["matchRegexp:^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$","minStringLength:8", "maxStringLength:20"]}
        errorMessages={
          [  `Can only contain alphanumeric characters, _ , . and not start or end with ( _ or . )`,
              "Must contain 8 - 20 characters",
              "Must contain 8 - 20 characters"
        ]}
      />
      <TextValidator
        type="email"
        className={classes.btnColor}
        onChange={handleChange}
        value={state.email}
        name="email"
        id="email"
        label="E-mail"
        variant="filled"
        autoComplete="username"
        validators={['required', 'isEmail']}
        errorMessages={['this field is required', 'email is not valid']}
      />
      <TextValidator
        type="password"
        className={classes.btnColor}
        onChange={handleChange}
        value={state.password}
        name="password"
        id="password"
        label="Password"
        variant="filled"
        autoComplete="current-password"
        validators={['minStringLength:4', 'maxStringLength:10']}
        errorMessages={['Password must contain 4 - 10 characters', 'Password must contain 4 - 10 characters']}
      />
      <Button type="submit" className={classes.submit} onClick={handleSubmit}>
        Login
      </Button>
    </ValidatorForm>
  );
}

export default function Login() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    
    const handleChangeIndex = (index) => {
      setValue(index);
    };
    return (
      <Container className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.menuColor}
            TabIndicatorProps={{ style: { background: "#4ecca3" } }}
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label="Login"
              icon={<ExitToAppTwoToneIcon />}
              {...a11yProps(0)}
            />
            <Tab label="Register" icon={<VpnKeyIcon />} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.tabColor}
        >
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            className={classes.tabColor}
          >
            <div>
              <SignIn dispatch={dispatch} /> 
            </div>
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            className={classes.tabColor}
          >
            <SignUp dispatch={dispatch}/>

          </TabPanel>
        </SwipeableViews>
      </Container>
    );
  };
