const productModel = require("../models/products.model");
const orderModel = require("../models/orders.model");
const customerModel = require("../models/customers.model");


class OrderController {
    // :)))))
    


    // [GET] /employee/order
    index = async (req, res) => {
        res.render('pages/employee.order.hbs');
    };


    // [POST] /employee/order
    findPrd = async (req, res) => {
        const keyword = req.body.keyword;
        // console.log(keyword);
        const products = await productModel.find({ barcode: { $regex: new RegExp(keyword, 'i') } });

        if (products.length > 0) {

            return res.json({
                status: true,
                message: "cac san pham",
                data: { products },
            });
        } else {
            return res.json({
                status: false,
                message: "khong thay san pham",
                data: { },
            });
        }
    }
    

    // [POST] /employee/order/create
    createOrder = async (req, res) => {
        const { productsData, totalAll } = req.body;
        
        const salesperson = req.session.user;
        if (!salesperson) {
            return res.status(401).json({
                status: false,
                message: "You must login to use this feature",
                data: { },
            });
        }
        const newOrder = new orderModel({
            customerId: null,
            products: productsData,
            totalAll: totalAll,
            createdBy: salesperson._id,
        });
        try {
            await newOrder.save();
            const orderId = newOrder._id;

            return res.json({
                status: true,
                message: "Create order successfully",
                data: { orderId },
            });
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = new OrderController();