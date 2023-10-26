const usersModel = require('../models/users.model');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const userModel = require('../models/users.model');

class AdminController {
  // [GET] /admin
  index = async (req, res) => {
    res.render('pages/admin.hbs');
    const hashedPassword = await bcrypt.hash('admin', 10);

      // add admin/admin to database
    usersModel.create({
        fullname: 'admin',
        email: 'nodejsadmtest@gmail.com',
        password: hashedPassword,
        role: 'admin',
        isConfirm: true,
    });
  }

  // [GET] /admin/login
  login = (req, res) => {
    res.render('pages/login.hbs');
  }

  // [POST] /admin/login
  check = async (req, res) => {
    try {
      const {username, password} = req.body;
      console.log(req.body);
      console.log('deptrai');

      const userCheck = await userModel.findOne({ username: username });
      if (!userCheck) return res.json({
        status: false,
        message: "email sai",
        data: {}
      })

      const isPasswordValid = await bcrypt.compare(password, userCheck.password);
      if (!isPasswordValid) return res.json({
        status: false,
        message: "pass sai",
        data: {},
      });

      // check role
      if (userCheck.role === 'admin') {
        console.log('dung la admin roi');
      } else {
        console.log('nhan vien quen, deo phai admin');
      }


    } catch (error) {
        
    }
  }
}

module.exports = new AdminController();
