import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import postApi from "../../api/postApi";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Button,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import userApi from "../../api/userApi";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  button: {
    marginLeft: "140px",
    marginBottom: "10px",
  },
  input: {
    display: "none",
  },
  submit: {
    display: "block",
    margin: "10px auto",
  },
}));

Profile.propTypes = {};

function Profile(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  const [mypics, setPics] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.myPost();
        console.log(response);
        setPics(response.mypost);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async (pic) => {
      try {
        const response = await userApi.updatePic(pic);
        console.log(response);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, pic: response.pic })
        );
        dispatch({ type: "UPDATEPIC", payload: response.pic });
      } catch (error) {
        console.log(error);
      }
    };

    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "tanphat171");
      fetch("https://api.cloudinary.com/v1_1/tanphat171/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetchData(data.url);
        })
        .catch((err) => console.log(err));
    }
  }, [image]);

  return (
    <div style={{ width: "60%", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : "loading"}
              alt="Avatar"
            />
          </div>
          <div>
            <h2>{state ? state.name : "loading"}</h2>
            <h3>{state ? state.email : "loading"}</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h4>{mypics.length} posts</h4>
              <h4>{state ? state.followers.length : "0"} followers</h4>
              <h4>{state ? state.followings.length : "0"} following</h4>
            </div>
          </div>
        </div>

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
          >
            Upload
          </Button>
        </label>
      </div>
      <div className={classes.root}>
        <GridList cellHeight={180} cols={3} spacing={10}>
          {mypics.map((tile, index) => (
            <GridListTile key={index} cols={1}>
              <img src={tile.pic} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

export default Profile;
