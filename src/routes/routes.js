module.exports = (app) => {
  const tutorialControllers = require("../controller/tutorial.controller.js");
  const router = require("express").Router();

  router.post("/", tutorialControllers.create);
  router.get("/getFiltr", tutorialControllers.findFiltr);
  router.get("/findSort", tutorialControllers.findSort);
  router.get("/findPagination", tutorialControllers.findPagination);
  router.get("/findSortPag", tutorialControllers.findSortPag);
  router.get("/findSampling", tutorialControllers.findSampling);
  router.get("/findAge", tutorialControllers.findAge);

  router.delete("/", tutorialControllers.remove);

  app.use("/api/tutorials", router);
};
