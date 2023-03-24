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
    res
      .status(400)
      .json({ error: { message: `duplicate ${err.duplicateKey}` } });
  } else if (err.cause === "invalid jwt") {
    res.status(401).json({ error: { message: "invalid bearer token" } });
  } else if (err.cause === "not authorised") {
    res.status(403);
    res.json({ error: { message: "not authorised" } });
    // } else if (err.cause === "input") {
    //   res.status(400);
    //   res.json({ error: {message: "Invalid input" }});
  } else if (err.cause === "invalid user id") {
    res.status(404);
    res.json({ error: { message: "invalid user id provided" } });
  } else if (err.cause === "no cloudinary API secret") {
    res.status(502);
    res.json({
      error: { message: "internal server error. that one's on us :(" }
    });
  } else if (err.cause === "no jwt secret") {
    res.status(500);
    res.json({
      error: { message: "internal server error. that one's on us :(" }
    });
  } else {
    res.status(500);
    res.json({
      error: { message: "internal server error. that one's on us :(" }
    });
  }
};
