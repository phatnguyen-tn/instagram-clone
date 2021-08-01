import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useHistory } from "react-router-dom";
import postApi from "../../api/postApi";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    margin: "60px auto",
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  submit: {
    display: "block",
    margin: "10px auto",
  },
}));

CreatePost.propTypes = {};

function CreatePost(props) {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const data = { title, body, pic: url };
        const response = await postApi.createPost(data);
        console.log(response);
        history.push("/");
      } catch (error) {
        console.log(error);
      }
    };

    if (url) {
      handleSubmit();
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "tanphat171");
    fetch("https://api.cloudinary.com/v1_1/tanphat171/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((error) => console.log(error));
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Title"
          variant="outlined"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Body"
          variant="outlined"
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="default"
            component="span"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </label>
        <span> {image.name}</span>
        <br />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => postDetails()}
        >
          Create Post
        </Button>
      </CardContent>
    </Card>
  );
}

export default CreatePost;
