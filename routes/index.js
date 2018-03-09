const router = require('express').Router();
const db = require('../db');
const  { Employee }  = db.models;

router.use((req,res,next)=>{
  let managerCount = 0;
  Employee.findAll({
    include: [ { model: Employee, as:'direct'} ]
  })
  .then((employees)=>{
    employees.forEach((employee)=>{
      if(employee.direct.length){
        employee.direct.push(employee.email)
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
  Employee.findAll({
    include: [ { model: Employee, as:'direct'} ]
  })
  .then((employees)=>{
    res.render('employees', {title: 'All Employees', employees})
  })
  .catch((err)=>res.render('index', {err}))
})

router.post('/employees', (req,res,next)=>{
  return Employee.createFromForm(req.body)
  .then(()=> res.redirect('/employees'))
  .catch((err)=>res.render('index', {err}))
})
 
router.delete('/employees/:id', (req,res,next)=>{
  return Employee.findById(req.params.id)
  .then((employee)=>{
    employee.destroy()
  })
  .then(()=> res.redirect('/employees'))
  .catch((err)=>res.render('index', {err}))
})

router.put('/employees/:id', (req,res,next)=>{
  return Employee.findById(req.params.id)
  .then((employee)=>{
    console.log(req.body)
    employee.updateFromForm(req.body)
  })
  .then(()=> res.redirect('/employees'))
  .catch((err)=>res.render('index', {err}))
})

module.exports = router