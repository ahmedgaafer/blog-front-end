import React from "react";
import withContainer from "../../Utils/HOC/withContainer";
import withState from "../../Utils/HOC/withState";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import  API from '../../actions/API/index';
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
                    <Typography>{children}</Typography>
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

const useStyles = makeStyles((theme) => ({
    root: {
        
        margin: "-15px",
        [theme.breakpoints.down("sm")]: {
            margin: "-1px",
            
        },
        
    },
    tabColor:{
        backgroundColor: "#393e46",
        color: "#eeeeee"
    },
    menuColor:{
        backgroundColor: "#232931",
        borderColor:"white",
        color: "#4ecca3"
    },
    btnColor:{
        backgroundColor: "#eeeeee",
        color:"#4ecca3",
        borderRadius: "5px",
        marginBottom: "5px",
    },
    inputGroup:{
        display:"flex",
        justifyContent: "space-around",
        flexDirection: "column",
        
    },
    submit:{
        backgroundColor:"#4ecca3",
        color:"#232931",
        "&:hover":{
            color:"#2baa81",
            backgroundColor:"#eeeeee",
            border: "2px solid #2baa81",
        }
    }
}));

const SignIn = props => {
    const classes = useStyles();
    function handleClick(){
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        API.login({email, password})(props.dispatch);
        
    }
    return(
        <div className={classes.inputGroup}>
            <TextField type="email" className={classes.btnColor} id="email" label="E-mail" variant="filled" />
            <TextField type="password" className={classes.btnColor} id="password" label="Password" variant="filled" />
            <Button className={classes.submit} onClick={handleClick}> Login </Button>
        </div>
    )
}


export default withState(
    withContainer(function Login(props) {
        const classes = useStyles();
        const theme = useTheme();
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const handleChangeIndex = (index) => {
            setValue(index);
        };
        return (
            <div className={classes.root}>
                <AppBar position="static" >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        className={classes.menuColor}
                        TabIndicatorProps={{style:{background: '#4ecca3'}}}
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Login" icon={<ExitToAppTwoToneIcon/>} {...a11yProps(0)} />
                        <Tab label="Register" icon={<VpnKeyIcon/>} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                    className={classes.tabColor}
                >
                    <TabPanel value={value} index={0} dir={theme.direction} className={classes.tabColor}>
                        <SignIn {...props}/>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction} className={classes.tabColor}>
                        Register
                    </TabPanel>
                </SwipeableViews>
            </div>
        );
    })
);
