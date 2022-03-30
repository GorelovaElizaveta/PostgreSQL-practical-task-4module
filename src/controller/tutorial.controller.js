const db = require("../models");

const Tutorial = db.tutorials;

exports.create = (req, res) => {
  
  const { text, age, country, owner} = req.body;
  if (text && age && owner && country) {
  const tutorial = {
    text,
    age,
    country,
    owner
  };
  Tutorial.create(tutorial).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || `Some error occurred while create.`,
    });
  });
} else {
  res.send("task not found")
}
};



exports.findFiltr = (req, res) => {
  const {country, owner} = req.query;
  let checkCountry = req.query.hasOwnProperty("country")
  let checkOwner = req.query.hasOwnProperty("owner")
  
  if(checkCountry & checkOwner){
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
    res.send("country and owner not found")
  }
};

exports.findSort = (req, res) => {
  Tutorial.findAll({   order: [['text', 'DESC'], ]})
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

exports.findPagination = (req, res) => {
  const {limit, offset} = req.query;
  let checkLimit = req.query.hasOwnProperty("limit")
  let checkOffset = req.query.hasOwnProperty("offset")

  if(checkLimit & checkOffset){
  Tutorial.findAll({limit: limit, offset: offset})
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
    res.send("limit and offset not found")
  }
};

exports.findSortPag = (req, res) => {
  const {country, limit, offset} = req.query;
  let checkLimit = req.query.hasOwnProperty("limit")
  let checkOffset = req.query.hasOwnProperty("offset")
  let checkCountry = req.query.hasOwnProperty("country")

  if(checkLimit & checkOffset & checkCountry){
  Tutorial.findAll({ where: { country } },
    {limit: limit, offset: offset},
    {order: [['text', 'DESC']]}
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
  } else {
    res.send("limit, country and offset not found")
  }
};

exports.findSampling = (req, res) => {
  Tutorial.findAll({  attributes: ["age", "text"],})
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

exports.remove = (req, res) => {
  const { id } = req.query;

  let present = req.query.hasOwnProperty("id");
  if(present){
  Tutorial.destroy({ where: { id: id } }).then((data) => {
    Tutorial.findAll().then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error while deleting record.`,
      });
    });;
  });
} else {
  res.status(500).send("deletion is not possible");
}
};
