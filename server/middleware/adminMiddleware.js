export default function adminOnly(req, res, next) {
  try {
    // protect middleware already attached user
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // ⭐ CRITICAL CHECK
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: "Admin check failed" });
  }
}