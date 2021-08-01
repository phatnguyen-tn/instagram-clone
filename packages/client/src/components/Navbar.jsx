import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: "#ffffff",
    textDecoration: "none",
    fontFamily: "Grand Hotel",
    fontSize: "38px",
  },
  bg: {
    backgroundColor: "#f50057",
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <Button key={1} color="inherit" component={Link} to="/profile">
          Profile
        </Button>,
        <Button key={2} color="inherit" component={Link} to="/myfollowingpost">
          My Following Post
        </Button>,
        <Button key={3} color="inherit" component={Link} to="/createpost">
          Create Post
        </Button>,
        <Button
          key={4}
          color="inherit"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history.push("/signin");
          }}
        >
          Log out
        </Button>,
      ];
    } else {
      return [
        <Button key={1} color="inherit" component={Link} to="/signin">
          Sign in
        </Button>,
        <Button key={2} color="inherit" component={Link} to="/signup">
          Sign up
        </Button>,
      ];
    }
  };

  return (
    <AppBar position="static" className={classes.bg}>
      <Container>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.title}>
              Instagram
            </Link>
          </Typography>
          {renderList()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
