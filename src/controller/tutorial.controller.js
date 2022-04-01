const db = require("../models");

const Tutorial = db.tutorials;

exports.create = (req, res) => {
  const { text, age, country, owner } = req.body;
  if (text && age && owner && country) {
    const tutorial = {
      text,
      age,
      country,
      owner,
    };
    Tutorial.create(tutorial)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Some error occurred while create.`,
        });
      });
  } else {
    res.send("task not found");
  }
};

exports.findAge = (req, res) => {
  const { age } = req.query;
  Tutorial.findAll({ where: { age } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving tutorials.`,
      });
    });
};

exports.findFiltr = (req, res) => {
  const { country, owner } = req.query;
  let checkCountry = req.query.hasOwnProperty("country");
  let checkOwner = req.query.hasOwnProperty("owner");

  if (checkCountry && checkOwner) {
    Tutorial.findAll({ where: { country, owner } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving tutorials.`,
        });
      });
  } else {
    res.send("country and owner not found");
  }
};

exports.findSort = (req, res) => {
  const currentValue = req.query.currentValue;
  const currentValueSort = req.query.currentValueSort;
  if(currentValueSort == -1){
  Tutorial.findAll({ order: [[currentValue, "DESC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving tutorials.`,
      });
    });
  } 
  if(currentValueSort == 1 || !(currentValueSort)){
    Tutorial.findAll({ order: [[currentValue]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving tutorials.`,
      });
    });
  } 
  }
;

exports.findPagination = (req, res) => {
  const { limit, offset } = req.query;
  let checkLimit = req.query.hasOwnProperty("limit");
  let checkOffset = req.query.hasOwnProperty("offset");

  if (checkLimit & checkOffset) {
    Tutorial.findAll({ limit, offset })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving tutorials.`,
        });
      });
  } else {
    res.send("limit and offset not found");
  }
};

exports.findSortPag = (req, res) => {
  const { country, limit, offset } = req.query;
  let checkLimit = req.query.hasOwnProperty("limit");
  let checkOffset = req.query.hasOwnProperty("offset");
  let checkCountry = req.query.hasOwnProperty("country");
  const currentValue = req.query.currentValue;
  const currentValueSort = req.query.currentValueSort

  if (checkLimit & checkOffset & checkCountry) {
    if(currentValueSort == -1){
    Tutorial.findAll(
      { where: { country } },
      { limit, offset },
      { order: [[currentValue, "DESC"]] }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving tutorials.`,
        });
      });
  }
  if(currentValueSort == 1 || !(currentValueSort)){
    Tutorial.findAll(
      { where: { country } },
      { limit, offset },
      { order: [[currentValue]] }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving tutorials.`,
        });
      });
  } 
}
  else {
    res.send("limit, country and offset not found");
  }
}
;

exports.findSampling = (req, res) => {
  const currentValueOne = req.query.currentValueOne;
  const currentValueTwo = req.query.currentValueTwo;
  Tutorial.findAll({ attributes: [currentValueOne, currentValueTwo] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving tutorials.`,
      });
    });
};
