import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import postApi from "../../api/postApi";
import userApi from "../../api/userApi";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Button,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

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
}));

UserProfile.propTypes = {};

function UserProfile(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [userProfile, setProfile] = useState(null);
  const [showFollow, setShowFollow] = useState(
    state ? !state.followings.includes(userid) : true
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.getProfile(userid);
        console.log(response);
        setProfile(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const followUser = async () => {
    try {
      const response = await userApi.follow(userid);
      console.log(response);
      dispatch({
        type: "UPDATE",
        payload: {
          followings: response.followings,
          followers: response.followers,
        },
      });
      localStorage.setItem("user", JSON.stringify(response));
      setProfile((prevState) => {
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, response._id],
          },
        };
      });
      setShowFollow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUser = async () => {
    try {
      const response = await userApi.unfollow(userid);
      console.log(response);
      dispatch({
        type: "UPDATE",
        payload: {
          followings: response.followings,
          followers: response.followers,
        },
      });
      localStorage.setItem("user", JSON.stringify(response));
      setProfile((prevState) => {
        const newFollowers = prevState.user.followers.filter(
          (item) => item !== response._id
        );
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: newFollowers,
          },
        };
      });
      setShowFollow(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userProfile ? (
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
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                  src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
                  alt="Avatar"
                />
              </div>
              <div>
                <h2 style={{ display: "inline-block", marginRight: "10px" }}>
                  {userProfile.user.name}
                </h2>
                {showFollow ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => followUser()}
                  >
                    Follow
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => unfollowUser()}
                  >
                    Unfollow
                  </Button>
                )}

                <h3>{userProfile.user.email}</h3>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                  <h4>{userProfile.posts.length} posts</h4>
                  <h4>{userProfile.user.followers.length} followers</h4>
                  <h4>{userProfile.user.followings.length} followings</h4>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.root}>
            <GridList cellHeight={180} cols={3}>
              {userProfile.posts.map((tile, index) => (
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
      ) : (
        <h2>Loading... !!!</h2>
      )}
    </>
  );
}

export default UserProfile;
