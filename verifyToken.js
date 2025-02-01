import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  
  console.log(token)
  
  if (!token) {
    console.log("Nh hun")
    return res.status(401).json({ message: 'You are not authenticated' });
  }

  jwt.verify(token,"1232fdsfas", (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid, try again' });
    }

    req.user = user;
    next();
  });
};
