import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

export default function SearchPage(props) {
  const [books, setBooks] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    // console.log(props.Mysearch);
    var myreq = "http://188.121.123.235:10022/book/byCondition";
    axios
      .put(
        myreq,
        {
          title: props.Mysearch,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      )
      .then((post) => {
        post.data.forEach((element) => {
          setBooks((books) => [...books, element]);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Container sx={{marginBlock:20, direction:"rtl"}} >
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
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}
