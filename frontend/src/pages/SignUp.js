import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios, { isCancel, AxiosError } from "axios";

const theme = createTheme();

// class SignUp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       username: "",
//       password: "",
//     };
//   }
//   render() {
//     const navigate = useNavigate();
//     const fillInput = (event) => {
//       if (event.target.name == "name") {
//         this.setState({ name: event.target.value });
//       } else if (event.target.name == "username") {
//         this.setState({ username: event.target.value });
//       } else if (event.target.name == "password") {
//         this.setState({ password: event.target.value });
//       }
//     };
//     const SignMe = (e) => {
//       e.preventDefault();
//       fetch("http://188.121.123.235:10022/user", {
//         method: "POST",
//         body: JSON.stringify({
//           name: this.state.name,
//           username: this.state.username,
//           password: this.state.password,
//         }),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       })
//         .then((res) => res.json())
//         .then((post) => {
//           console.log(post);
//           navigate("/Login");
//         })
//         .catch((err) => {
//           console.log(err.message);
//         });
//     };
//     return (
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign up
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               //onSubmit={handleSubmit}
//               sx={{ mt: 3 }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     label="Full Name"
//                     id="name"
//                     name="name"
//                     autoFocus
//                     onChange={fillInput}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="username"
//                     label="User Name"
//                     name="username"
//                     onChange={fillInput}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     onChange={fillInput}
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 onClick={SignMe}
//               >
//                 Sign Up
//               </Button>
//               <Grid container justifyContent="flex-start">
//                 <Grid item>
//                   <Link to={"/Login"} variant="body2">
//                     Already have an account? Sign in
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     );
//   }
// }

//export default SignUp;
export default function SignUp() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const SignMe = (e) => {
    e.preventDefault();
    fetch("http://188.121.123.235:10022/user", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post);
        navigate("/Login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            //onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  id="name"
                  name="name"
                  autoFocus
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={SignMe}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link to={"/Login"} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
