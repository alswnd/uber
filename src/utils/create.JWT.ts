import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const JWT_TOKEN = JSON.stringify(process.env.JWT_TOKEN);

/**
 * @param {number} id
 * @returns {string} token
 */
const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id: id,
    },
    process.env.JWT_TOKEN || ""
  );

  return token;
};

export default createJWT;
