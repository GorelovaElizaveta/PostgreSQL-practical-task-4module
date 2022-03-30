module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial",{
    text: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.NUMBER
    },
    country: {
      type: Sequelize.STRING
    },
    owner: {
      type: Sequelize.STRING
    }
  })

  return Tutorial;
}