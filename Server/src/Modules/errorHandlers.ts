import { ErrorRequestHandler } from "express";

// Catches generic errors which are not handled directly within the controller
export const backupErrorHandler: ErrorRequestHandler = function (
  err,
  req,
  res,
  next
) {
  console.error(err);
  // TODO: use switch statement
  if (err.type === "duplicate value") {
    res.status(400).json({ message: `duplicate ${err.duplicateKey}` });
  } else if (err.type === "auth") {
    res.status(403);
    res.json({ message: "Not authorized" });
  } else if (err.type === "input") {
    res.status(400);
    res.json({ message: "Invalid input" });
  } else {
    res.status(500);
    res.json({ message: "Internal server error. That's on us!" });
  }
};
