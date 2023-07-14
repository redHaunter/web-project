import * as React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReactDOM, { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigation,
} from "react-router-dom";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";
import BookPage from "./pages/BookPage";
import SearchPage from "./pages/SearchPage";
import Category from "./pages/Category";
import Shop from "./pages/Shop";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Container,
  CssBaseline,
  GlobalStyles,
  Grid,
  Input,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createTheme, fontSize } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

let shopList = [];
export function MyShop(props) {
  shopList = [...shopList, props];
  // console.log(shopList);
}
function getShopList() {
  return shopList;
}
export default function App() {
  const [sendShop, setSendShop] = React.useState([]);
  const [dummy, setDummy] = React.useState(false);
  const [userLogged, setUserLogged] = React.useState(false);
  const [mySearch, setMySearch] = React.useState("");
  const [hover, setHover] = useState(false);
  const [cat, setCat] = React.useState(null);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorUser, setAnchorUser] = React.useState(null);
  const openUser = Boolean(anchorUser);

  const handleClickUser = (event) => {
    setAnchorUser(event.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorUser(null);
  };

  return (
    <BrowserRouter>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar
          sx={{
            direction: "rtl",
          }}
        >
          <Link to={"/"} style={{ paddingRight: 170, paddingLeft: 40 }}>
            <img src={require("./pages/images/logo.svg")} />
          </Link>
          <Box
            width={650}
            bgcolor={"white"}
            paddingRight={"10px"}
            borderRadius={3}
          >
            <Input
              placeholder={"جست‌وجوی کتاب‌ها"}
              sx={{ width: "95%" }}
              onChange={(e) => {
                setMySearch(e.target.value);
              }}
            ></Input>
            <Link to={"/SearchPage"}>
              <SearchIcon />
            </Link>
          </Box>

          <nav style={{ paddingRight: 250 }}>
            <Link
              variant="button"
              onClick={() => {
                setSendShop(getShopList());
                setDummy(!dummy);

                // console.log(sendShop);
              }}
              to={"/Shop"}
              style={{
                fontSize: 14,
                color: "black",
                textDecoration: "none",
              }}
            >
              <ShoppingBagIcon color="action" />
            </Link>
          </nav>

          {!userLogged ? (
            <Button>
              <Link
                to={"/Login"}
                style={{
                  color: localStorage.getItem("userIsLogOn") ? "blue" : "black",
                  textDecoration: "none",
                }}
              >
                <Typography>
                  <AccountCircleIcon
                    sx={{ fontSize: "27px" }}
                    color={"action"}
                  />
                  <Typography
                    variant="p"
                    color={"gray"}
                    style={{ paddingRight: 10 }}
                  >
                    ورود و ثبت نام
                  </Typography>
                </Typography>
              </Link>
            </Button>
          ) : (
            <Box>
              <Button
                id="basic-button"
                aria-controls={openUser ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openUser ? "true" : undefined}
                onClick={handleClickUser}
                sx={{
                  textDecoration: "none",
                  color: openUser ? "skyblue" : "gray",
                  border: "0",
                  borderBottom: openUser ? "1px solid" : "0",
                  borderColor: "skyblue",
                  direction: "rtl",
                  fontSize: "120%",
                }}
              >
                <Typography>
                  <AccountCircleIcon
                    sx={{ fontSize: "27px" }}
                    color={"action"}
                  />
                  <Typography
                    variant="p"
                    color={"gray"}
                    style={{ paddingRight: 10 }}
                  >
                    {localStorage.getItem("userName")}
                  </Typography>
                </Typography>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorUser}
                open={openUser}
                onClose={handleCloseUser}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Box
                  paddingRight={1}
                  sx={{
                    direction: "rtl",
                  }}
                >
                  <MenuItem>
                    <Link
                      to={"/UserPage"}
                      onClick={handleCloseUser}
                      style={{
                        textDecoration: "none",
                        color: "gray",
                        width: "100%",
                      }}
                    >
                      پنل کاربری
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setUserLogged(false);
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                    style={{ color: "gray" }}
                  >
                    خروج از حساب کاربری
                  </MenuItem>
                </Box>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <AppBar position="relative" color="default" elevation={0}>
        <Toolbar
          container
          style={{ paddingInline: 190 }}
          sx={{
            direction: "rtl",
          }}
        >
          <Link
            to={"./"}
            style={{
              paddingInline: 20,
              fontSize: 20,
              color: hover ? "skyblue" : "gray",
              border: "0",
              borderBottom: hover ? "1px solid" : "0",
              borderColor: "skyblue",
              textDecoration: "none",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            خانه
          </Link>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              textDecoration: "none",
              color: open ? "skyblue" : "gray",
              border: "0",
              borderBottom: open ? "1px solid" : "0",
              borderColor: "skyblue",
              direction: "rtl",
              fontSize: "120%",
            }}
          >
            دسته بندی کتاب‌ها
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Typography
              variant="h6"
              sx={{ direction: "rtl", width: "100px" }}
              paddingRight={1}
              fontWeight={"bolder"}
              fontSize={17}
            >
              رمان‌ها
            </Typography>
            <Box
              paddingRight={1}
              sx={{
                direction: "rtl",
              }}
            >
              <Container>
                <Box>
                  <Link
                    style={{ textDecoration: "none", color: "gray" }}
                    onClick={() => {
                      setCat(1);
                    }}
                    to={"/Category"}
                  >
                    دسته اول
                  </Link>
                </Box>
                <Box>
                  <Link
                    style={{ textDecoration: "none", color: "gray" }}
                    onClick={() => {
                      setCat(2);
                    }}
                    to={"/Category"}
                  >
                    دسته دوم
                  </Link>
                </Box>
                <Box>
                  <Link
                    style={{ textDecoration: "none", color: "gray" }}
                    onClick={() => {
                      setCat(3);
                    }}
                    to={"/Category"}
                  >
                    دسته سوم
                  </Link>
                </Box>
              </Container>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route
          path="/"
          element={
            <Layout userLogged={userLogged} setUserLogged={setUserLogged} />
          }
          exact
        />
        <Route
          path="/Login"
          element={<SignIn setUserLog={setUserLogged} />}
          exact
        />
        <Route path="/SignUp" element={<SignUp />} exact />
        <Route path="/BookPage" element={<BookPage />} exact />
        <Route path="/UserPage" element={<UserPage />} exact />
        <Route path="/Shop" element={<Shop MyShop={sendShop} />} exact />
        <Route
          path="/SearchPage"
          element={<SearchPage Mysearch={mySearch} />}
          exact
        />
        <Route path="/Category" element={<Category cat={cat} />} exact />
      </Routes>
      <footer>
        <Grid
          bgcolor={"whitesmoke"}
          container
          wrap="nowrap"
          paddingInline={27}
          paddingBottom={5}
          marginTop={20}
        >
          <Grid item md="2" paddingTop={8}>
            <Link to={"#"}>
              <img src={require("./pages/images/enamad.png")} />
            </Link>
          </Grid>
          <Grid item md="2" paddingTop={8}>
            <Link to={"#"}>
              <img src={require("./pages/images/neshan.png")} />
            </Link>
          </Grid>
          <Grid item md="8" sx={{ direction: "rtl" }} color={"gray"}>
            <Typography variant="h6" marginTop={3} marginBottom={3}>
              فیدیبو بزرگترین سامانه خرید کتاب الکترونیک، کتاب صوتی و مجله در
              ایران
            </Typography>
            <Typography variant="p">
              فیدیبو می‌کوشد با گستره‌ای از کتاب‌ها و مجلات متنوع برای طیف وسیعی
              از کاربران تجربه فوق‌العاده خریدکتاب و خواندن آن در دستگاه‌های
              هوشمند را فراهم کند.در فیدیبو با خرید کتاب از بهترین ناشران ایرانی
              در موضوعات مختلف، کاربران می‌توانند در اپلیکیشن کتابخانه‌ای‌ شخصی
              برای خود بسازند و از امکانات منحصر به فرد آن استفاده کنند. برای
              تیم فیدیبو هدف خرید کتاب نیست بلکه ایجاد محیطی بری ارتباط بیشتر
              اهالی کتاب است.شایان ذکر است که فیدیبو بعد از خرید کتاب، با تیم
              پشتیبانی همیشه پاسخگوی کاربران محترم خواهد بود. با دانلود هزاران
              کتاب صوتی، کتاب دانشگاهی، شعر عاشقانه، رمان عاشقانه ، مادر و کودک
              و پادکست از فیدیبو، خواندن کتاب را به گونه ای متفاوت تجربه کنیم.
            </Typography>
          </Grid>
        </Grid>
        <Box bgcolor={"gray"} align={"center"}>
          <Typography variant="p" color={"white"} sx={{ direction: "rtl" }}>
            .کلیه حقوق این وب‌سایت متعلق به فیدیبو می‌باشد ©
          </Typography>
        </Box>
      </footer>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
