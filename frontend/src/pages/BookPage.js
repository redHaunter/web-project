import {
  Button,
  Divider,
  Grid,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { render } from "react-dom";
import { useLocation } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axios from "axios";

var items = [
  {
    name: "Random Name #1",
    description: "Probably the most random thing you have ever seen!",
  },
  {
    name: "Random Name #2",
    description: "Hello World!",
  },
  {
    name: "Random Name #3",
    description: "thusasdfow",
  },
  {
    name: "Random Name #4",
    description: "444444444444444444444444",
  },
  {
    name: "Random Name #5",
    description: "555555555555555555",
  },
  {
    name: "Random Name #6",
    description: "666666666666666666666666",
  },
];

var commnetor = [
  {
    username: "user1",
    commnet:
      "بسم الله رحمن رحیم این یک کامنت بسیار زیبا برای یک کتاب زیباتر است",
  },
  {
    username: "user2 with last name",
    commnet: "this is the comment number 1 and I liked this book",
  },
  {
    username: "user3 hamed",
    commnet:
      "this is the comment number 1 IAM hamed and i AM hame 1 IAM hamed and i AM hame 1 IAM hamed and i AM hame 1 IAM hamed and i AM hame",
  },
  {
    username: "u4",
    commnet: "eh.",
  },
];

export default function BookPage(props) {
  const [pageComment, setPageComment] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const location = useLocation();
  var ebook = location.state.book;
  const sendComment = () => {
    var myreq = "http://188.121.123.235:10022/comment";
    fetch(myreq, {
      method: "POST",
      body: JSON.stringify({
        bookId: ebook.Id,
        message: comment,
        userId: parseInt(localStorage.getItem("userId")),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    })
      .then((res) => res.json())
      .then((post) => {})
      .catch((err) => {
        console.log(err.message);
      });
  };

  React.useEffect(() => {
    var myreq = "http://188.121.123.235:10022/comment/byCondition";
    axios
      .put(
        myreq,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
      .then((post) => {
        setPageComment(post.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Container>
      <Grid
        style={{ paddingTop: 80 }}
        container
        spacing={5}
        sx={{ direction: "rtl" }}
      >
        <Grid item md={3}>
          <img src={ebook.Image} alt="Logo" />
        </Grid>
        <Grid item md={6} align={"start"}>
          <Typography variant="h4">{ebook.Title}</Typography>
          <div style={{ marginBlock: 20 }}>
            <Typography variant="h6">نویسنده : {ebook.Author}</Typography>
          </div>
          <div style={{ marginBlock: 30 }}>
            <Typography variant="p" fontSize={14}>
              {ebook.Description}
            </Typography>
          </div>
        </Grid>
        <Grid item md={3}>
          <Card style={{ backgroundColor: "whitesmoke" }}>
            <CardContent>
              <Box align={"center"}>
                <Typography
                  variant="h6"
                  style={{ marginTop: 20, marginBottom: 40 }}
                >
                  {ebook.Price} هزارتومان
                </Typography>
                <Box>
                  <Button variant="contained">خرید نسخه الکترونیکی</Button>
                </Box>
                <Box marginTop={3}>
                  <Button color="primary" size="medium">
                    <StarBorderIcon color="success" />
                  </Button>
                </Box>
                <Typography variant="p" style={{ color: "gray", fontSize: 13 }}>
                  افزودن به مورد علاقه‌ها
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider style={{ marginBlock: 100 }} light />
      <Grid container bgcolor={"whitesmoke"}>
        {/* <Swiper slidesPerView={3}>
        {items.map((item, i) => (
          <SwiperSlide>
            <Item key={i} item={item} />
          </SwiperSlide>
        ))}
      </Swiper> */}
      </Grid>
      <Divider style={{ marginBlock: 100 }} light />
      <Box container style={{ marginBottom: 100 }} sx={{ direction: "rtl" }}>
        <Typography variant="h5" marginBottom={10}>نظرات کاربران</Typography>
        {pageComment.map((item) =>{
          return(
          <Container sx={{direction:"rtl"}}>
            <Typography variant="body1" marginY={5} paddingY={2} paddingX={3}>
              {item.Message}
            </Typography>
            <Divider light/>
          </Container>
          )
        })}
        {localStorage.getItem("userId") != null ? (
          <Box>
            <Divider style={{ marginBlock: 40 }} light></Divider>
            <Typography variant="h6" marginTop={3}>
              نظر خود را بنویسید:
            </Typography>
            <Container>
              <InputBase
                fullWidth
                style={{
                  border: "1px inset black",
                  borderRadius: "4px",
                  paddingInline: "10px",
                  marginTop: 20,
                  backgroundColor: "whitesmoke",
                }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              ></InputBase>
            </Container>
            <Button
              variant="outlined"
              style={{ marginTop: 40 }}
              onClick={sendComment}
            >
              ثبت نظر
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Container>
  );
}
