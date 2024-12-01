import { genSaltSync, hashSync, compareSync } from "bcrypt";

function createHashUtil(password) {
  const salt = genSaltSync(10);
  const hashPassword = hashSync(String(password), salt);
  return hashPassword;
}

function verifyHashUtil(password, dbPass) {
  return compareSync(String(password), dbPass);
}

export { createHashUtil, verifyHashUtil };
