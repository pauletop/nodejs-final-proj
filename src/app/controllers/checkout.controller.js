const productModel = require("../models/products.model");
const orderModel = require("../models/orders.model")
const customerModel = require("../models/customers.model");


class CheckoutController {
    // [GET] /employee/checkout
    index = async (req, res) => {
        const orderId = req.query.id;
        
        const orderCheck = await orderModel.findOne({ _id: orderId });
        let orderCheckObj = orderCheck.toObject();

        // console.log(orderCheck);
        const totalAll = orderCheckObj.totalAll;

        const productList = orderCheck.products.toObject();


        res.render('pages/employee.checkout.hbs', { productList: productList, totalAll: totalAll });
    };


    // [POST] /employee/checkout
    findCtm = async (req, res) => {
        const phoneNum = req.body.phoneNum;
        // console.log(phoneNum);

        const customerCheck = await customerModel.findOne({ phoneNumber: phoneNum });
        
        
        
        
        if (!customerCheck) {
            return res.json({
                status: false,
                message: "Customer not found",
                data: {},
            }); 
        } else {
            const customerId = customerCheck.id;
            const fullname = customerCheck.fullname;
            const address = customerCheck.address;

            return res.json({
                status: true,
                message: "",
                data: { fullname, address, phoneNum, ctmId: customerId },
            });
        }
    };
    chooseCtm = async (req, res) => {
        const { ctmId, orId } = req.body;
        // console.log(req.body);
        let orderCheck = await orderModel.findOne({ _id: orId });
        customerModel.findOne({ _id: ctmId }).then((customer) => {
            console.log(customer);
            orderCheck.customerId = customer;
            orderCheck.save();
        });
        return res.json({
            status: true,
            message: "Choose customer successfully",
            data: { orId },
        });
    }


    addCus = async (req, res) => {
        const { orId, fullname, address, phoneNum } = req.body;
        // console.log(req.body);
        let orderCheck = await orderModel.findOne({ _id: orId });
        
        let ctm = await customerModel.create({
            fullname: fullname,
            address: address,
            phoneNumber: phoneNum,
        });
        orderModel.updateOne({ _id: orId }, { customerId: ctm._id });
        let ctmId = ctm._id;
        return res.json({
            status: true,
            message: "Add customer successfully",
            data: { fullname, address, phoneNum, ctmId },
        });

    }
}


module.exports = new CheckoutController();