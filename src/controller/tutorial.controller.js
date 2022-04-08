const db = require("../models");

const Tutorial = db.tutorials;

exports.create = (req, res) => {
  if (!(text && age && country && owner)) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

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
        if (data) {
          res.send(data);
        } else {
          res.status(500).send("task not created");
        }
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

// получение данных по определенному полю
exports.findValue = (req, res) => {
  if (!req.query) {
    res.status(500).send("data not found");
  }

  Tutorial.findAll({ where: req.query })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(500).send("data retrieval problem");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while retrieving tutorials.`,
      });
    });
};

//создание фильтрации данных по нескольким полям
exports.findFiltr = (req, res) => {

  const filtr = {
    value: req.query.value,
    value2: req.query.value2
  }

  if(!filtr) {
  res.status(500).send( "p error occurred while retrieving tutorials")
  }

  if (filtr) {
    Tutorial.findAll({ where: filtr })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(500).send("filtering not found");
        }
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

//создание сортировки функционалом sequelize
exports.findSort = (req, res) => {
  const Sort = req.params.filter;
  const direction = req.params.direction;

  if (!Sort || !direction) {
    res.status(500).send("data not found");
  }

  if (Sort && direction) {
    Tutorial.findAll({ order: [[Sort, direction]] })
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
    res.status(500).send("value cannot be empty");
  }
};

//пагинация
exports.findPagination = (req, res) => {
  const { limit, page } = req.query;
  const offset = limit * (page - 1);

  if (!limit || !page) {
    res.status(500).send("value cannot be empty");
  }
  const checkLimit = req.query.hasOwnProperty("limit");
  const checkPage = req.query.hasOwnProperty("page");

  if (checkLimit && checkPage) {
    Tutorial.findAll({ limit, offset }, { order: ["id"] })
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
    res.status(500).send("data not found");
  }
};

//Сорт и паг
exports.findSortPag = (req, res) => {
  const filter = req.params.filter;
  const direction = req.params.direction;
  const page = req.params.page;
  const limit = req.params.limit;

  if (!filter || !direction || !page || !limit) {
    res.status(500).send("data not found");
  }

  if (filter && direction && page && limit) {
    Tutorial.findAll({
      order: [[filter, direction]],
      offset: limit * (page - 1),
      limit: limit,
    })
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
    res.status(500).send("data not found");
  }
};

//получение всех записей, но у записи только несколько полей из всех предоставленных,
exports.findSampling = (req, res) => {
  const currentValueOne = req.query.currentValueOne;
  const currentValueTwo = req.query.currentValueTwo;

  if (!currentValueOne || !currentValueTwo) {
    res.status(500).send("data not found");
  }

  if (currentValueOne && currentValueTwo) {
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
  } else {
    res.status(500).send("data not found");
  }
};
