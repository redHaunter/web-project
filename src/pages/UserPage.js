import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const navigate = useNavigate();
  const [books, setBooks] = React.useState([]);
  const [firstLoad, setFirstLoad] = React.useState(false);
  const [dummy, setDummy] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [updatePage, setUpdatePage] = React.useState(false);


  const GetBookId = (props) => {
    var myreq = "http://188.121.123.235:10022/book/" + props;
    fetch(myreq, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setBooks((books) => [...books, post]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  React.useEffect(() => {
    var myreq = "http://188.121.123.235:10022/favorite";
    axios
      .put(
        myreq,
        {
          userId: parseInt(localStorage.getItem("userId")),
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
      .then((post) => {
        // console.log(post.data);
        post.data.forEach((element) => {
          GetBookId(element.BookId);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });

    if (localStorage.getItem("userIsAdmin")) {
      var myreq2 = "http://188.121.123.235:10022/user/byCondition";
      axios
        .put(myreq2, {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        })
        .then((post) => {
          console.log(post.data);
          post.data.forEach((element) => {
            element = { ...element, toShow: true };
            setUsers((users) => [...users, element]);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return (
    <Container sx={{ direction: "rtl" }} style={{ marginTop: 40 }}>
      <Typography variant="h5" style={{ marginBottom: 30 }}>
        مشخصات فردی
      </Typography>
      <Container>
        <Typography fontSize={20}>
          نام کاربری : {localStorage.getItem("userName")}
        </Typography>
        <Typography fontSize={20}>
          {localStorage.getItem("userIsAdmin") ? (
            <p> سطح دسترسی : ادمین</p>
          ) : (
            <p> سطح دسترسی : کاربر معمولی</p>
          )}
        </Typography>
      </Container>
      <Divider light style={{ marginBlock: 100 }}></Divider>
      <Typography variant="h5" style={{ marginBottom: 30 }} align={"center"}>
        کتاب های مورد علاقه
      </Typography>
      <Swiper slidesPerView={3} spaceBetween={5}>
        {books.map((ebook) => {
          return (
            <SwiperSlide>
              <Card
                sx={{
                  width: 300,
                  height: 600,
                  padding: 3,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
                style={{
                  direction: "rtl",
                  border: "1px ridge black",
                  fontFamily: "sans-serif",
                }}
              >
                <CardMedia style={{ width: "100%" }} align={"center"}>
                  <img src={ebook.Image} alt="Logo" />
                </CardMedia>
                <CardContent>
                  <Box align={"center"} marginBottom={5}>
                    <Button
                      onClick={() => {
                        navigate("/BookPage", { state: { book: ebook } });
                      }}
                      style={{
                        fontSize: 20,
                        color: "black",
                        boxShadow: "skyblue 1px 0 6px",
                      }}
                      component="div"
                    >
                      {ebook.Title}
                    </Button>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    marginY={1}
                  >
                    نویسنده : {ebook.Author}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    marginY={1}
                  >
                    قیمت : {ebook.Price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    marginY={1}
                  >
                    {ebook.Description.slice(0, 120)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    style={{ marginLeft: 100, color: "black" }}
                    onClick={() => {
                      console.log(ebook.Title);
                    }}
                  >
                    افزودن به سبد خرید
                  </Button>
                </CardActions>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Divider light style={{ marginBlock: 100 }} />
      <Grid
        container
        style={{ direction: "rtl" }}
        direction={"row"}
        align={"center"}
      >
        <Grid item md={1} style={{ border: "1px solid black" }}>
          <Typography variant="body2">آیدی</Typography>
        </Grid>
        <Grid item md={3} style={{ border: "1px solid black" }}>
          <Typography variant="body1">اسم</Typography>
        </Grid>
        <Grid item md={3} style={{ border: "1px solid black" }}>
          <Typography variant="body1">نام مستعار</Typography>
        </Grid>
        <Grid item md={3} style={{ border: "1px solid black" }}>
          <Typography variant="body1">سطح دسترسی</Typography>
        </Grid>
        <Grid item md={2} style={{ border: "1px solid black" }}>
          <Typography variant="body1">حذف کاربر</Typography>
        </Grid>
      </Grid>
      {updatePage ? (
        <Box>
          {users.map((user) => {
            if (localStorage.getItem("userIsAdmin")) {
              if (user.toShow) {
                return (
                  <Grid
                    container
                    style={{ direction: "rtl" }}
                    direction={"row"}
                    align={"center"}
                  >
                    <Grid item md={1} style={{ border: "1px solid black" }}>
                      <Typography variant="body2">{user.Id}</Typography>
                    </Grid>
                    <Grid item md={3} style={{ border: "1px solid black" }}>
                      <Typography variant="body1">{user.Name}</Typography>
                    </Grid>
                    <Grid item md={3} style={{ border: "1px solid black" }}>
                      <Typography variant="body1">{user.Username}</Typography>
                    </Grid>
                    <Grid item md={3} style={{ border: "1px solid black" }}>
                      {user.IsAdmin ? (
                        <Typography variant="body1">ادمین</Typography>
                      ) : (
                        <Typography variant="body1">کاربر</Typography>
                      )}
                    </Grid>
                    <Grid item md={2} style={{ border: "1px solid black" }}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                          user.toShow = false;
                          setUpdatePage(!updatePage);
                        }}
                      >
                        delete
                      </Button>
                    </Grid>
                  </Grid>
                );
              }
            }
          })}
        </Box>
      ) : (
        <Box>
          {users.map((user) => {
            if (localStorage.getItem("userIsAdmin")) {
              if (user.toShow) {
                return (
                  <Grid
                    container
                    style={{ direction: "rtl" }}
                    direction={"row"}
                    align={"center"}
                  >
                    <Grid item md={1} style={{ border: "1px solid black" }}>
                      <Typography variant="body2">{user.Id}</Typography>
                    </Grid>
                    <Grid item md={3} style={{ border: "1px solid black" }}>
                      <Typography variant="body1">{user.Name}</Typography>
                    </Grid>
                    <Grid item md={3} style={{ border: "1px solid black" }}>
                      <Typography variant="body1">{user.Username}</Typography>
                    </Grid>
                    <Grid item md={3} style={{ border: "1px solid black" }}>
                      {user.IsAdmin ? (
                        <Typography variant="body1">ادمین</Typography>
                      ) : (
                        <Typography variant="body1">کاربر</Typography>
                      )}
                    </Grid>
                    <Grid item md={2} style={{ border: "1px solid black" }}>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                          user.toShow = false;
                          setUpdatePage(!updatePage);
                        }}
                      >
                        delete
                      </Button>
                    </Grid>
                  </Grid>
                );
              }
            }
          })}
        </Box>
      )}
    </Container>
  );
}
