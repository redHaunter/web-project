import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";

export default function Shop(props) {
  console.log(props.MyShop);
  return (
    <Container style={{ direction: "rtl" }}>
      <Box>
        {props.MyShop.map((ebook) => {
          return (
            <Grid container bgcolor={"whitesmoke"} marginY={5} padding={3}>
              <Grid item md={3}>
                <img src={ebook.Image} alt="Logo" />
              </Grid>
              <Grid item md={3} paddingTop={3}>
                <Typography variant="h5" marginBottom={18}>{ebook.Title}</Typography>
                <Typography variant="body2" fontSize={18} color={"gray"}>نویسنده {ebook.Author}</Typography>
                <Typography variant="body2" fontSize={18} color={"gray"}>هزارتومان{ebook.Price}</Typography>
              </Grid>
              <Grid item md={6} padding={5}>
                <Typography variant="body2" fontSize={18} color={"gray"}>{ebook.Description}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Container>
  );
}
