require("dotenv").config();

const express = require("express")
const app = express()

const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        // Save user profile info in database (or session)
        return done(null, profile);
      }
    )
  );


passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });


app.get('/', (req, res) => {
    res.send("Hi")
})

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );


  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );

  app.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/");
    }
    res.send(`Welcome ${req.user.displayName}! <a href="/logout">Logout</a>`);
  });


  app.get("/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  });


app.listen(5000, () => {
    console.log("App is listening on PORT 5000")
})