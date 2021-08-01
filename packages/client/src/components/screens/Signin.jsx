import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import authApi from "../../api/authApi";
import { UserContext } from "../../App";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    textAlign: "center",
    margin: "60px auto",
  },
  title: {
    marginTop: 10,
    fontSize: 40,
  },
  pos: {
    marginBottom: 12,
  },
});

Signin.propTypes = {};

function Signin(props) {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const data = { email, password };
      console.log(data);
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        return;
      }
      const response = await authApi.signIn(data);
      console.log(response);
      localStorage.setItem("jwt", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch({ type: "USER", payload: response.user });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title}>Instagram</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          variant="outlined"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => handleSubmit()}
        >
          Sign In
        </Button>
        <h3>
          Don't have an account ? <Link to="/signup">Sign up</Link>
        </h3>
      </CardContent>
    </Card>
  );
}

export default Signin;
