import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { SetFavorites } from "./SetFavorites.js";
import { MyShop } from "../index.js";
import StarIcon from "@mui/icons-material/Star";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

function PricingContent(props) {
  const [shopList, setShopList] = React.useState([]);
  const [isFirst, setIsFirst] = React.useState(true);
  const navigate = useNavigate();
  const [books, setBook] = React.useState([]);
  const [dummy, setDummy] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("userName") != null) {
      props.setUserLogged(true);
    }
    var myreq = "http://188.121.123.235:10022/book/";
    fetch(myreq, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    })
      .then((res) => res.json())
      .then((post) => {
        post.forEach((element) => {
          element["favorite"] = true;
        });
        console.log(post);
        setBook(post);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // const getBook = () => {
  //   var myreq = "http://188.121.123.235:10022/book/";
  //   fetch(myreq, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Authorization: "Bearer " + localStorage.getItem("userToken"),
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((post) => {
  //       post.forEach((element) => {
  //         element["favorite"] = true;
  //       });
  //       console.log(post);
  //       setBook(post);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  // if (isFirst) {
  //   getBook();
  //   setIsFirst(false);
  // }

  return (
    <React.Fragment>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6, fontFamily: "sans-serif" }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          فیدیبو
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          fontSize={20}
          
        >
          بزرگترین سامانه خرید کتاب الکترونیک، کتاب صوتی و مجله در ایران، فیدیبو
          می‌کوشد با گستره‌ای از کتاب‌ها و مجلات متنوع برای طیف وسیعی از کاربران
          تجربه فوق‌العاده خریدکتاب و خواندن آن در دستگاه‌های هوشمند را فراهم
          کند.در فیدیبو با خرید کتاب از بهترین ناشران ایرانی در موضوعات مختلف،
          کاربران می‌توانند در اپلیکیشن کتابخانه‌ای‌ شخصی برای خود بسازند و از
          امکانات منحصر به فرد آن استفاده کنند.
        </Typography>
      </Container>

      <Container>
        <Grid container>
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
                          // setShopList((shopList) => [...shopList, ebook]);
                          MyShop(ebook);
                        }}
                      >
                        افزودن به سبد خرید
                      </Button>
                      <Button
                        size="medium"
                        onClick={() => {
                          if (props.userLogged) {
                            ebook.favorite = false;
                            SetFavorites({ bookId: ebook.Id });
                            setDummy(!dummy);
                          }
                        }}
                      >
                        {ebook.favorite ? (
                          <StarBorderIcon color="success" />
                        ) : (
                          <StarIcon color="success" />
                        )}
                      </Button>
                    </CardActions>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

class Pricing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <PricingContent
        userLogged={this.props.userLogged}
        setUserLogged={this.props.setUserLogged}
      />
    );
  }
}
export default Pricing;
