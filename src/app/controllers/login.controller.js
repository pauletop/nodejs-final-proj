const usersModel = require('../models/users.model');
const bcrypt = require("bcrypt");

class LoginController {
  // [GET] /login
  index = (req, res) => {
    res.render('pages/login.hbs');
  };

  // [POST] /login
  check = async (req, res, next) => {
    // console.log(req.body);
    try {
      const { role, username, password } = req.body;
      if (role === 'admin') {
        if (username === 'admin' && password === 'admin') {
          res.json({
            status: true,
            data: { role, username, password },
          })


          
        } else {
          const useremail = username + '@gmail.com';
          const userCheck = await usersModel.findOne({ email: useremail });
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

          res.json({
            status: true,
            data: { role, username, password },
          })
        }
      }

      else if (role === 'employee') {
        const useremail = username + '@gmail.com';
        const userCheck = await usersModel.findOne({ email: useremail });
        if (!userCheck) return res.json({
          msg: "k có username",
          status: false,
        })

        const isPasswordValid = await bcrypt.compare(password, userCheck.password);
        if (!isPasswordValid) return res.json({
          msg: "pass sai",
          status: false,
        });

        delete userCheck.password;
        res.redirect('/');
      }

      else {

      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new LoginController();
