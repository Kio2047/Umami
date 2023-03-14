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
  } else if (err.cause === "not authorised") {
    res.status(403);
    res.json({ message: "not authorised" });
    // } else if (err.cause === "input") {
    //   res.status(400);
    //   res.json({ message: "Invalid input" });
  } else if (err.cause === "user id not valid") {
    res.status(404);
    res.json({ message: "invalid user id" });
  } else if (err.cause === "user-to-follow id not valid") {
    res.status(404);
    res.json({ message: "invalid user-to-follow id" });
  } else {
    res.status(500);
    res.json({ message: "internal server error. that one's on us :(" });
  }
};
