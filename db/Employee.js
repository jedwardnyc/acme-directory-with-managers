const conn = require('./conn');
const Sequelize = require('sequelize');

const Employee = conn.define('employee', {
  email: {
    type:Sequelize.STRING,
    validate:{
      isEmail: true
    },
    unique: true
  }
},{
  getterMethods:{
    name: function(){
      let name = this.email.split('@')[0]
      return name.split('.').join(' ')
    },
    emailProvider: function(){
      return this.email.split('@')[1]
    }
  },
  timestamps: false
})

Employee.createFromForm = function(body){
  if(body.managerId === '-1'){
    delete body.managerId;
  }
  return this.create(body)
}

Employee.prototype.updateFromForm = function(body){
  if(body.managerId === '-1'){
    body.managerId = null;
  }
  return this.update(body)
}

module.exports = Employee
