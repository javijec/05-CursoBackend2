import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil } from "../utils/token.util.js";
import { sentVerifyEmail } from "../utils/nodemailer.util.js";
import crypto from "crypto";
import UserService from "../services/user.services.js";

const userService = new UserService();
//register
passport.use(
  "register",
  new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
    try {
      const one = await userService.readUserbyEmailServices(email);
      if (one) {
        const info = { message: "USER ALREADY EXISTS", statusCode: 401 };
        return done(null, false, info);
      }
      const hashedPassword = createHashUtil(password);
      const verifyCode = crypto.randomBytes(16).toString("hex");
      const user = await userService.createUserServices({
        email,
        password: hashedPassword,
        name: req.body.name || "Default Name",
        verifyCode,
      });

      await sentVerifyEmail({ to: user.email, verifyCode });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
//login
passport.use(
  "login",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await userService.readUserbyEmailServices(email);
      if (!user) {
        const info = { message: "USER NOT FOUND", statusCode: 401 };
        return done(null, false, info);
      }
      if (!user.verify) {
        const info = { message: "USER NOT VERIFIED", statusCode: 401 };
        return done(null, false, info);
      }
      const passwordForm = password;
      const passwordDb = user.password;
      const verifyHash = verifyHashUtil(passwordForm, passwordDb);
      if (!verifyHash) {
        const info = { message: "INVALID CREDENTIALS", statusCode: 401 };
        return done(null, false, info);
      }
      const data = { user_id: user.id, role: user.role };
      const token = createTokenUtil(data);
      user.token = token;
      await userService.updateUserServices(user.id, { isOnline: true });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

//online
passport.use(
  "online",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await userService.readOnebyIdServices(user_id);
        const { isOnline } = user;
        if (!isOnline) {
          const info = { message: "USER IS NOT ONLINE", statusCode: 401 };
          return done(null, false, info);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
//signout
passport.use(
  "signout",
  new JwtStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]), secretOrKey: process.env.SECRET_KEY },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await userService.readOnebyIdServices(user_id);
        await userService.updateUserServices(user_id, { isOnline: false });
        user.token = createTokenUtil({ user_id: null });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
