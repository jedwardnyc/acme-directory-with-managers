const router = require('express').Router();
const db = require('../db');
const  { Employee }  = db.models;

router.use((req,res,next)=>{
  let managerCount = 0;
  Employee.findAll({})
    .then((employees)=>{
      let mgmtArr = []
      employees.forEach((employee)=>{
        if(!mgmtArr.includes(employee.managerId) && employee.managerId){
          mgmtArr.push(employee.managerId)
          managerCount++
        } 
      })
      res.locals.path = req.url;
      res.locals.managerCount = managerCount;
      res.locals.employeeCount = employees.length;
      next();
    })
})

router.get('/', (req,res,next)=>{
  res.render('index', {title: 'Home'})
})

router.get('/employees', (req,res,next)=>{
  Employee.findAll()
  .then((employees)=>{
    res.render('employees', {title: 'All Employees', employees})
  })
  .catch(next)
})

router.post('/employees', (req,res,next)=>{
  return Employee.createFromForm(req.body)
  .catch(next)
  .then(()=> res.redirect('/employees'))
})
 
router.delete('/employees/:id', (req,res,next)=>{
  return Employee.findById(req.params.id)
    .then((employee)=>{
      employee.destroy()
    })
    .then(()=> res.redirect('/employees'))
    .catch(next)
})

router.put('/employees/:id', (req,res,next)=>{
  return Employee.findById(req.params.id)
    .then((employee)=>{
      console.log(req.body)
      employee.updateFromForm(req.body)
    })
    .then(()=> res.redirect('/employees'))
    .catch(next)
})

module.exports = router