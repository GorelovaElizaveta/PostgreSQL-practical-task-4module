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
        if(data){
        res.send(data);
        }
        else {
          res.status(500).send("task not created")
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

  Tutorial.findAll({ where: req.query })
    .then((data) => {
      if(data){
      res.send(data)
      } else {
        res.status(500).send("data retrieval problem") 
      };
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

  if(req.query){
    Tutorial.findAll({ where: req.query })
      .then((data) => {
        if(data){
        res.send(data)
        } else {
          res.status(500).send("filtering not found")
        };
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
  const currentValue = req.query.currentValue;
  const currentValueSort = req.query.currentValueSort;
  if (currentValueSort == -1) {
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
  if (currentValueSort == 1 || !currentValueSort) {
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
};

//пагинация
exports.findPagination = (req, res) => {
  const { limit, page } = req.query;
  const offset = limit * (page - 1)

  if(!limit || !page){
  res.status(500).send("value cannot be empty")
  }
  let checkLimit = req.query.hasOwnProperty("limit");
  let checkPage = req.query.hasOwnProperty("page");

    if (checkLimit & checkPage) {
    
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
      res.status(500).send("limit and offset not found");
  }
};





//Сорт и паг
exports.findSortPag = (req, res) => {

  const {limit, page, currentValue, currentValueSort} = req.body;
  const offset = limit * (page - 1)
  const value = req.query

  if (limit && page && currentValue && currentValueSort) {
    if (currentValueSort == false) {
      Tutorial.findAll(
        { where: value },
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
    if (currentValueSort == true) {
      Tutorial.findAll(
        { where: value },
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
  } else {
    res.send("limit, country and offset not found");
  }
};

//получение всех записей, но у записи только несколько полей из всех предоставленных,
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
