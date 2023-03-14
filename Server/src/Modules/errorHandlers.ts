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
  if (err.cause === "duplicate value") {
    res.status(400).json({ message: `duplicate ${err.duplicateKey}` });
  } else if (err.cause === "invalid jwt") {
    res.status(401).json({ message: "invalid bearer token" });
    // } else if (err.cause === "auth") {
    //   res.status(403);
    //   res.json({ message: "Not authorised" });
    // } else if (err.cause === "input") {
    //   res.status(400);
    //   res.json({ message: "Invalid input" });
  } else {
    res.status(500);
    res.json({ message: "Internal server error. That's on us!" });
  }
};
