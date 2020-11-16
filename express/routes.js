const express = require("express");
const app = express.Router();

var admin = require("firebase-admin");
var bodyParser = require("body-parser");
var cors = require("cors");
var cookieParser = require("cookie-parser");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser());
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "chatter-app-790fa",
    private_key_id: "da382a85f24bb461a60dbd160db50edf65093dab",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCTLA4Aq09wjZ7i\nVJxso3I6RrQSBBmnQZc81B+7u3xU520Hywm+H+74WP63PErWrCa6pqJcMspPXgwS\nXwfLi3dGt/IHzAzMR3J5VcJYta1oFeNcrb/l8Ovpg8il2kT5Qj1F9cZmwUIRtpyC\n03UpI1kpV0IAcB3q2IMQ+QgHbfUv8BubIJEyOyjOKsaByR0h7lyEO6mwXGXSU7mO\nOm6z+psGXtkw3xIpCisEQ6U/Hjr22Buu2gyPJaWASrTUEPt3uL9ZmOPxecE37xh3\ndhzrk6PNkc4fZu365JIMO48GWX/ON1mPi/vRQPZjlPbmEvqm8ilr+Gn0vuOq0bqp\nGgauQl7nAgMBAAECggEADUTOc5X+Zz3r4lw372PvFqNgQc2Rbu7iQhw35J07N1mk\nKJM2nifssjX7EeDDa8ZnbLJwXSxBHDwoJ3hE6iX5WFL/5PirLYT1iuX5MmlMdV/T\nBclhtBgI4dIjwxXb3FALpf6XAPwRYMQPj7+dedq56hj3ybVSC5kYrzn2O0E/kJVy\nVsVDIAl0AoxiywVKiZ8vcCj7tOZIeTdeSYprrzSqLGm5GQp1QLPkW1HRBHwiFeGt\neARRhHNgcoEjP4WzAkIPUBLbwGT0TjYHfU7//MIeXqW3azwvVyF3Wq6FB/isdQSo\n3QqYwaEw9kN6NVZ47BF6PRiwgnpxlFBTWZdWYgQhnQKBgQDO8+2UXooT8/sYIjq7\nZuUFn5HY8YJK9u9s5nfjA0i7+anFq3vOpJB6uX8LAQCJYMe+ThSbtVAUHI5vRzVc\n0429g1MMpTEtyNM5QCNCGMDzEKQX09drcbys4fXEUQAV3RQl0g9VX6XxJV6ecEID\nEBrLyzVVRhgQuUB+Eju4Z0lWuwKBgQC2DSh2w3Q/8tNuBEGP9XXk8as6sg3OkrKd\ngWYYfnpYfSfXhUBC0B7ZUSADqcvM30prWdKD3jXeW+PHQKQjtK0xuUWMtKw63CZt\nFdQttlKsi6eRoE03yyL6dBM+LlvBrEmbZb/Qa8+RCT+7LX9Y3gEP9FCdBqp+28UT\n5rXA+dxTxQKBgAdd/Z4jg2zUaaLhTQ/wyMRbetirOEUs5zcMOUZWjpdKevWzdhPU\nHeSQh+o/XeKGFHY811T3rmMY5SUm9spYKZqOez1fABIuLP7Dvr2SngPJGt5SRz/m\n652H6bTUYVll5lq2UJ9saT7dYrHnMyJix2Fr2Xkwppipz5btVTzqSF0TAoGAI6l0\nMb+b+CLzM+v1g+PLkmuc5USX281029HLVCUChm8N7PQXYH8wa9Wudck/OQTMqTbR\nPC+9Ua+icRfCj5QHEWR/sU57JpSVmmzaQZIjo9U/oBFMzw8l7PXsBxRBuTCswpot\n9wAHixvKtjn1Zk0m3B8542i44VzfwERDemf3txkCgYA/X7xfyAyVgK9EqsNokv8g\nu7x2Eau4kba5MDRWEpnXA6PrC6ALreAftVt1RZ2nkXpjWVy6I8QMCK4NTMHEhBSB\nvFBEwMDmnmQeYWdNqbk3evVaelCe8gVIbjINFw8brQD3nT+m8La459ue/fEJno9Z\nLAzXimqlTx+r+anWl0S3lw==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-hwy1r@chatter-app-790fa.iam.gserviceaccount.com",
    client_id: "113529581669408274701",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hwy1r%40chatter-app-790fa.iam.gserviceaccount.com"
  })
});

app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        admin
          .auth()
          .verifyIdToken(idToken)
          .then(function (decodedClaims) {
            res.statusCode = 200;
            res.json({ session: sessionCookie });
          });
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});
app.post("/profile", (req, res, next) => {
  const sessionCookie = req.body.session;
  // console.log(sessionCookie);

  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      res.send(decodedClaims);
    })
    .catch((error) => res.send(error));
});
module.exports = app;
