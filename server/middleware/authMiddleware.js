import jwt from "jsonwebtoken";

export default function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ⭐ ENSURE ALL FIELDS AVAILABLE
    req.user = {
      id: decoded.id,
      isHost: decoded.isHost || false,
      isAdmin: decoded.isAdmin || false,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}