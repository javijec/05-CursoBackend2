import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil } from "../utils/token.util.js";
import { sentVerifyEmail } from "../utils/nodemailer.util.js";
import crypto from "crypto";
import UsersController from "../controller/user.controller.js";

const userController = new UsersController();

passport.use(
  "register",
  new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, email, password, done) => {
    try {
      const one = await userController.readUserbyEmailController(email);
      if (one) {
        const info = { message: "USER ALREADY EXISTS", statusCode: 401 };
        return done(null, false, info);
      }
      const hashedPassword = createHashUtil(password);
      const verifyCode = crypto.randomBytes(16).toString("hex");
      const user = await userController.createUserController({
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

passport.use(
  "login",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await userController.readUserbyEmailController(email);
      if (!user) {
        const info = { message: "USER NOT FOUND", statusCode: 401 };
        return done(null, false, info);
      }
      const passwordForm = password;
      const passwordDb = user.password;
      const verify = verifyHashUtil(passwordForm, passwordDb);
      if (!verify) {
        const info = { message: "INVALID CREDENTIALS", statusCode: 401 };
        return done(null, false, info);
      }
      const data = { user_id: user._id, role: user.role };
      const token = createTokenUtil(data);
      user.token = token;
      const update = await userController.updateUserController(user._id, { isOnline: true });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  "admin",
  new JwtStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]), secretOrKey: process.env.SECRET_KEY },
    async (data, done) => {
      try {
        const { user_id, role } = data;
        if (role !== "ADMIN") {
          const info = { message: "NOT AUTHORIZED", statusCode: 403 };
          return done(null, false, info);
        }
        const user = await userController.readOnebyIdController(user_id);
        return done(null, user);
      } catch (error) {}
    }
  )
);

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
        const user = await userController.readOnebyIdController(user_id);
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

passport.use(
  "signout",
  new JwtStrategy(
    { jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]), secretOrKey: process.env.SECRET_KEY },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await userController.readOnebyIdController(user_id);
        await userController.updateUserController(user_id, { isOnline: false });
        user.token = createTokenUtil({ user_id: null });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
