import * as React from "react";

export function SetFavorites(props){
    var myreq = "http://188.121.123.235:10022/favorite";
    fetch(myreq, {
      method: "POST",
      body: JSON.stringify({
        bookId: props.bookId,
        userId: parseInt(localStorage.getItem("userId")),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    })
      .then((res) => res.json())
      .then((post) => {
      })
      .catch((err) => {
        console.log(err.message);
      });
}