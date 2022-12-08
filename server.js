const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/graphql", (req, res) => {
  console.log("REquest", req.body);
  const fetchReq = axios
    .post(
      "https://integration-5ojmyuq-kaprizac2nszu.ap-4.magentosite.cloud/graphql",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("Response", response.headers["content-type"], response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.error("Error", error);
      res.send({ error: "Error" });
    });
});
app.listen(PORT, () => console.log("Server runiing"));
