const express = require('express');
const router = express.Router();
const employeesController = require('../app/controllers/employees.controller');

const checkoutController = require('../app/controllers/checkout.controller');
const orderController = require('../app/controllers/order.controller');

// forbidden if req.session.user.role != "admin"
const checkEmp = (req, res, next) => {
    if (!req.session.role) {
        res.status(401).redirect('/login');
    } else
        next();
}

router.use(checkEmp);

// [GET] /employee
router.get('/', employeesController.index);

// [POST] /employee
// router.post('/', employeesController.check);

// [GET] /employee/customers
router.get('/customers', employeesController.customers);

// [GET] /employee/stat
router.get('/stat', employeesController.viewStatistical);

// [POST] /employee/stat
router.post('/stat', employeesController.chooseStatistical);

// [POST] /employee/c
router.post('/c', employeesController.checkNew);

// [GET] /employee/p/update
router.get('/p/update', employeesController.passUpdate);


// [POST] /employee/p/update
router.post('/p/update', employeesController.passC);




// [GET] /employee/avt/update
router.get('/avt/update', employeesController.avtUpdate);


// [POST] /employee/avt/update
router.post('/avt/update', employeesController.avtC)


router.get('/checkout', checkoutController.index);
router.post('/checkout', checkoutController.findCtm);
router.post('/checkout/add', checkoutController.addCus);
router.post('/checkout/choose', checkoutController.chooseCtm);




router.get('/order', orderController.index);
router.post('/order/f', orderController.findPrd);
router.post('/order/create', orderController.createOrder);


module.exports = router;