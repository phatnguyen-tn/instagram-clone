import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Link, useHistory } from "react-router-dom";
import authApi from "../../api/authApi";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

Signup.propTypes = {};

function Signup(props) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        setMessage("Invalid email, try again !!");
        setOpen(true);
        return;
      }
      const data = { email, name, password };
      const response = await authApi.signUp(data);
      if (response) {
        console.log(response);
        history.push("/signin");
      }
    } catch (error) {
      console.log("Error in Sign up: ", error);
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
          type="email"
          variant="outlined"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => handleSubmit()}
        >
          Sign up
        </Button>
        <h3>
          Already have an account ? <Link to="/signin">Sign in</Link>
        </h3>
      </CardContent>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default Signup;
