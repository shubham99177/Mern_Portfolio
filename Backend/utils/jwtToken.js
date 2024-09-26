export const generateToken = (user, message, statusCode, res) => {
  const token = user.genratejsonwebtoken();

  // Cookie options
  const cookieOptions = {
    httpOnly: true, // Prevents access by client-side scripts
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // Valid Date object for expiration
  };

  // Send token as a cookie and in the JSON response
  res
    .status(statusCode)
    .cookie("token", token, cookieOptions) // Setting the cookie with the JWT token
    .json({
      success: true,
      message,
      user,
      token,
    });
};
