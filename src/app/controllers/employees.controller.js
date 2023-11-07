const usersModel = require('../models/users.model');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

class EmployeesController {
  // [GET] /employees
  index = async (req, res, next) => {
    var employeeList = await usersModel.find( {role: 'employee'} );
    var empls = employeeList.map(empl => {
      var emplObj = empl.toObject();
      return emplObj;
    })

    employeeList.forEach(empl => {
      console.log(empl.email);
    });
    res.render('pages/employees.hbs', { employeeList: empls });
  };

  // [POST] /employees
  add = async (req, res, next) => {
    try {
      console.log(req.body);
      const {fullname, email} = req.body;
      let password = email.split('@')[0];
    
      // check email
      const emailCheck = await usersModel.findOne({ email });
      if (emailCheck) return res.json({ msg: "Email đã tồn tại", status: false });

      // send mail to new employee
      
      

      const hashedPassword = await bcrypt.hash(password, 10);
      const User = usersModel.create({
        fullname,
        email,
        password: hashedPassword,
        role: 'employee',
      });

    
      delete (await User).password;
      return res.json({ msg: "Thêm thành công", status: true, User });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new EmployeesController();
