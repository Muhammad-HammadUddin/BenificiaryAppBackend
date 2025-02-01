import jwt from 'jsonwebtoken';


// Hardcoded admin credentials
const adminEmail = 'admin@gmail.com';
const adminPassword = 'admin123';

// Signin Controller
const Signin = (req, res, next) => {
  const { email, password } = req.body;
console.log("idhar hun")
  try {
    
    if (email === adminEmail && password === adminPassword) {
      
      const token = jwt.sign({ email: adminEmail }, "1232fdsfas", );

     
      res.cookie("access_token", token, {
        httpOnly: true,  // Makes the cookie inaccessible to JavaScript (security feature)
        secure: true,
        sameSite: 'None',  // Prevents cross-site request forgery (CSRF) attacks
        maxAge: 3600 * 1000,  // Expiry time in milliseconds (1 hour in this case)
        path: '/',  // Ensure the cookie is accessible throughout the entire domain
      });
      console.log(token);
      
     
      return res.status(200).json({ message: 'Login successful', success: true });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    next(createError(500, err.message));  
  }
};

export default Signin;
