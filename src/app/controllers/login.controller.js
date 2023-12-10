const userModel = require("../models/users.model");
const bcrypt = require('bcrypt');


class LoginController {
    // [GET] /login
    index = async (req, res) => {
        res.render('pages/login.hbs', { sflash: req.flash('error') });

        // add root administrator (admin/admin)
        const adminCheck = await userModel.find({ username: 'admin' });
        if (adminCheck.length === 0) {

            userModel.create({
                fullname: 'Nguyen Van Admin',
                username: 'admin',
                email: 'admin@gmail.com',
                password: await bcrypt.hash('admin', 10),
                role: 'admin',
                avtImage: '',

                isConfirmed: true,
                isActive: true,
                isLocked: false,
                
                emailConfirmed: true,
                token: '',
                startTime: 0,
            });

            userModel.create({
                fullname: 'Nguyen Hiep',
                username: 'deptrai',
                email: 'deptrai@gmail.com',
                password: await bcrypt.hash('nguyenhiep', 10),
                role: 'admin',
                avtImage: '',

                isConfirmed: true,
                isActive: true,
                isLocked: false,
                
                emailConfirmed: true,
                token: '',
                startTime: 0,
            });
        }
    };


    // [POST] /login
    check = async (req, res) => {
        try {
            console.log(req.body);
            const {username, password} = req.body;

            console.log(req.body);

            const userCheck = await userModel.findOne({ username: username });
            if (!userCheck) {
                req.flash('error', 'Incorrect username or password!');
                return res.redirect('/login');
            };

            const isPasswordValid = await bcrypt.compare(password, userCheck.password);
            if (!isPasswordValid) {
                console.log('Incorrect password!');
                req.flash('error', 'Incorrect username or password!');
                return res.redirect('/login');
            };

            // role check
            if (userCheck.role === 'admin') {
                console.log('Welcome administator!!!');
                const fullname = userCheck.fullname;
                const role = userCheck.role;
                req.session.role = 'admin';
                return res.redirect('/admin');
            } else {
                console.log('Welcome employee!!!');
                
                // check if login with link in email
                if (userCheck.emailConfirmed ) {
                    console.log('Email confirmed');
                    const fullname = userCheck.fullname;
                    const role = userCheck.role;
                    req.session.role = 'employee';
                    req.session.user = userCheck;
                    return res.redirect('/employee');
                    // return res.json({
                    //     status: true,
                    //     role: 'employee',
                    //     data: {fullname, username, role}
                    // });

                } else {
                    req.flash('error', 'You have not confirmed your email yet!');
                    return res.redirect('/login');
                    // return res.json({
                    //     status: false,
                    //     message: "You have not confirmed your email yet!",
                    //     data: {}
                    // })
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = new LoginController();