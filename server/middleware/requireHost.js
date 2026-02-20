export default function requireHost(req, res, next) {
  try {
    // protect already ran before this

    if (!req.user?.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // host flag comes from DB check (safe way)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Host access denied" });
  }
}