import jwt from "jsonwebtoken";

const getJwtToken = (userId) => {
  return jwt.sign({ userId: userId }, "umar", {
    expiresIn: "1 day",
  });
};

export default getJwtToken;
