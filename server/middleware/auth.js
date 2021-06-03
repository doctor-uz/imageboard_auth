import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  //in the try block we have to see if the user is really who is claiming to be. We can do that using jsonwebtoken.

  try {
    //1. we have to get token after user sign in or sign up
    const token = req.headers.authorization.split(" ")[1];

    //2. Check if token is from Google or our own, which means custom token
    const isCustomAuth = token.length < 500; // >500 token is belongs to GOOGLE Auth, <500 is belongs our token

    //3. Get data from token itself
    let decodedData;
    if (token && isCustomAuth) {
      //if it is our token
      decodedData = jwt.verify(token, "test"); //we know here who is logged in
      req.userId = decodedData?.id; //we are storing his ID in the req.userId
    } else {
      //if it is GOOGLE token
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; //sub is come from Google, it is an ID
    }

    next(); //click the like button => auth middleware(NEXT) => like controller
  } catch (error) {
    console.log();
  }
};

export default auth;
