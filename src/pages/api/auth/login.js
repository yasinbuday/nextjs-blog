export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;


  setTimeout(() => {
  
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      res.status(200).json({
        message: "Login successful",
        user: {
          email: email,
          role: "admin"
        },
        token: "mock-jwt-token-" + Date.now()
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password"
      });
    }
  }, 1000);
}