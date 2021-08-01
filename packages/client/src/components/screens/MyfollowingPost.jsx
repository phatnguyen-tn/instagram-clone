import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Container,
  Input,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import postApi from "../../api/postApi";
import { UserContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "40px auto",
    border: "1px solid #efefef",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  likeBtn: {
    color: "red",
  },
  unlikeBtn: {
    color: "grey",
  },
}));

MyfollowingPost.propTypes = {};

function MyfollowingPost(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.getFollowingPost();
        console.log(response);
        setData(response.posts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const likePost = async (id) => {
    try {
      const response = await postApi.like(id);
      console.log(response);
      const newData = data.map((item) => {
        if (item._id === response._id) {
          return response;
        } else {
          return item;
        }
      });
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const unlikePost = async (id) => {
    try {
      const response = await postApi.unlike(id);
      console.log(response);
      const newData = data.map((item) => {
        if (item._id === response._id) {
          return response;
        } else {
          return item;
        }
      });
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const makeComment = async (text, postId) => {
    try {
      const response = await postApi.comment(text, postId);
      console.log(response);
      const newData = data.map((item) => {
        if (item._id === response._id) {
          return response;
        } else {
          return item;
        }
      });
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await postApi.delete(postId);
      console.log(response);
      const newData = data.filter((item) => {
        return item._id !== response._id;
      });
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {data.map((item, index) => (
        <Card className={classes.root} key={index}>
          <CardHeader
            avatar={
              <Link to={"profile/" + item.postedBy._id}>
                <Avatar src="https://images.unsplash.com/photo-1548946526-f69e2424cf45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80"></Avatar>
              </Link>
            }
            title="demoTV"
            style={{ color: "#000", fontWeight: "bold" }}
            action={
              item.postedBy._id === state._id && (
                <IconButton onClick={() => deletePost(item._id)}>
                  <DeleteIcon />
                </IconButton>
              )
            }
          />

          <CardMedia
            className={classes.media}
            image={item.pic}
            title="Photo Post"
          />
          {item.likes.includes(state._id) ? (
            <IconButton
              className={classes.likeBtn}
              size="medium"
              onClick={() => likePost(item._id)}
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton size="medium" onClick={() => unlikePost(item._id)}>
              <FavoriteIcon />
            </IconButton>
          )}

          <CardContent style={{ paddingTop: 0 }}>
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.body}
            </Typography>

            {item.comments.map((record) => {
              return (
                <h6 key={record._id}>
                  <span style={{ fontWeight: "500" }}>
                    {record.postedBy.name}
                  </span>{" "}
                  {record.text}
                </h6>
              );
            })}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(e.target[0].value, item._id);
              }}
            >
              <Input fullWidth type="text" placeholder="add a comment" />
            </form>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default MyfollowingPost;
