import React from "react";
import { NavLink } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Avatar from "@material-ui/core/Avatar";
import MoreIcon from "@material-ui/icons/MoreVert";
import Switcher from "./Switch";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { userLogout } from "../../actions"

const useStyles = makeStyles((theme) => ({
  colors: {
    backgroundColor: "#393e46",
    color: "#eee",
  },
  active: {
    color: "#4ecca3 !important",
  },
  logo: {
    display: "flex !important",
    width: "6vw",
    "&:hover": {
      backgroundColor: fade("#4ecca3", 0.25),
      borderRadius: "5px",
    },
  },
  left: {
    marginLeft: "90vw",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "75vw",
    },
  },
  logoSize: {
    maxWidth: "20px",
    minWidth: "15px",
    display: "inline",
    paddingLeft: "2px",
    marginRight: theme.spacing(1),
  },
  links: {
    textDecoration: "none",
    color: "#eeeeee",
  },
  grow: {
    flexGrow: 1,
  },
  appBarRes: {
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      marginBottom: "50px",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    letterSpacing: theme.spacing(1),
    [theme.breakpoints.up(theme.breakpoints.values.lg + 500)]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(4),
    marginLeft: 0,
    width: "40vw%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      maxWidth: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));


export default function Nav() {
  //#region state and handleEvents
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const userID = useSelector(state => state.authReducer.id);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = () =>{
    setAnchorEl(null);
    handleMobileMenuClose();
    dispatch(userLogout());
  }

  const menuItem = (closeFn, logoutFn) => (

    <div>
      <NavLink
          exact
          className={classes.links}
          activeClassName={classes.active}
          to="/timeline"
        >
          <MenuItem onClick={closeFn}>Timeline</MenuItem>
        </NavLink>
        <NavLink
          exact
          className={classes.links}
          activeClassName={classes.active}
          to={{
            pathname:"/profile",
            state:{id: userID}
          }}
        >
          <MenuItem onClick={closeFn}>Profile</MenuItem>
        </NavLink>
        <MenuItem onClick={logoutFn}>Logout</MenuItem>
    </div>
  )
  //#region responsive views
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      classes={{ paper: classes.colors }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuItem(handleMenuClose, logOut)}
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      classes={{ paper: classes.colors }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      {menuItem(handleMobileMenuClose, logOut)}
    </Menu>
  );
  //#endregion
  //#endregion
  
  const user = useSelector(state => state.authReducer);

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        className={clsx(classes.colors, classes.appBarRes)}
      >
        <Toolbar>
          <NavLink className={clsx(classes.links, classes.logo)} to="/">
            <img src="logo.svg" className={classes.logoSize} alt="logo" />
            <Typography className={classes.title} variant="h6">
              ossip
            </Typography>
          </NavLink>
          {user.isLogged ? (
            <React.Fragment>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    alt={user.username}
                    src={`https://www.gravatar.com/avatar/${user.profileImageUrl}`}
                  />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  className={classes.colors}
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </React.Fragment>
          ) : (
            <div>
              <div className={classes.left}>
                <NavLink className={classes.links} to="/user">
                  <IconButton
                    edge="end"
                    aria-label="Login/ Register"
                    color="inherit"
                  >
                    <AddCircleIcon />
                  </IconButton>
                </NavLink>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div>
        <Switcher {...user} />
      </div>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )};
