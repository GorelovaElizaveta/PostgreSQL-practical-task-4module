module.exports = (app) => {
  const router = require("express").Router();
  const tutorialControllers = require("../controller/tutorial.controller.js");

  router.post("/", tutorialControllers.create);
  router.get("/getFiltr", tutorialControllers.findFiltr);
  router.get("/findSort/:Sort/:direction", tutorialControllers.findSort);
  router.get("/findPagination", tutorialControllers.findPagination);
  router.get("/findSortPag/:filter/:direction/:page/:limit", tutorialControllers.findSortPag);
  router.get("/findSampling", tutorialControllers.findSampling);
  router.get("/findValue", tutorialControllers.findValue);

  app.use("/api/tutorials", router);
};
