const conn = require('./conn')
const Employee = require('./Employee')

const sync = ()=>{
  return conn.sync({force:true})
}

const seed = ()=>{
  return Promise.all([
    Employee.create({email: 'jacob@gmail.com', name: 'jacob@gmail.com', emailProvider:'jacob@gmail.com'})
  ])  
}

Employee.belongsTo(Employee, {as: 'manager'})
Employee.hasMany(Employee, {as: 'direct', foreignKey: 'managerId'})

module.exports = {
  sync,
  seed,
  models: {
    Employee
  }
}