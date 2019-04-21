const { parse } = require("url");
const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    server = express();

    server.all("*", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      let m = pathname.match(/^\/tasks\/(\d+)$/);
      if (m) {
        parsedUrl.pathname = "/task/detail";
        parsedUrl.query.id = m[1];
      }

      handle(req, res, parsedUrl);
    });

    server.listen(port, "0.0.0.0", err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.log("An error occurred, unable to start the server");
    console.log(err);
  });
