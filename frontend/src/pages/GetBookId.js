import * as React from "react";

export async function GetBookId(props) {
  var book = "";
  var myreq = "http://188.121.123.235:10022/book/" + props.bookId;
  const res = await fetch(myreq, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    },
  })
  .then((res) => res.json())
  .then((post) => {
    console.log(post);
    book = post;
  })
  .catch((err) => {
    console.log(err.message);
  });
  return(book);
}
