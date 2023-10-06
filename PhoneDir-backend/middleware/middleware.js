const fs = require("fs");
var jwt = require("jsonwebtoken");
const jwtKey = "placementadda";

function req_history(req, res, next) {
  let token = req.headers["token"];
  if (token) {
    // console.log("token==>", token);
    jwt.verify(token, jwtKey, (err, result) => {
      console.log("Verify Token Successfull");
      if (err) {
        res.status(401).send({ msg: "invalid token" });
      } else {
        let a = new Date(Date.now());
        fs.appendFile(
          "log-history-text",
          `\n=> ${req.originalUrl},${req.method},${a}`,
          (err, success) => {
            next();
          }
        );
      }
    });
  } else {
    let a = new Date(Date.now());
    fs.appendFile(
      "log-history-text",
      `\n=> ${req.originalUrl},${req.method},${a}`,
      (err, success) => {
        next();
      }
    );
  }
}

// function verifyToken(req, res, next) {
//   let token = req.headers["token"];
//   console.log("token==>", token);
//   if (token) {
//     jwt.verify(token, jwtKey, (err, result) => {
//       if (err) {
//         res.status(401).send({ msg: "invalid token" });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.status(403).send({ msg: " token can not we match" });
//   }
// }
module.exports = { req_history };
