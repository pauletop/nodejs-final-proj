const productModel = require("../models/products.model");
const orderModel = require("../models/orders.model");
const customerModel = require("../models/customers.model");


class OrderController {
    // :)))))
    


    // [GET] /employee/order
    index = async (req, res) => {
        res.render('pages/employee.order.hbs', { navActive: 'order', username: req.session.user.fullname });
    };


    // [POST] /employee/order
    findPrd = async (req, res) => {
        const keyword = req.body.keyword;
        // console.log(keyword);
        const products = await productModel.find({ barcode: { $regex: new RegExp(keyword, 'i') } });

        if (products.length > 0) {

            return res.json({
                status: true,
                message: "Product list",
                data: { products },
            });
        } else {
            return res.json({
                status: false,
                message: "Product not found",
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
            for (const product of productsData) {
                const { productId, productName } = product;
                const productInDb = await productModel.findOne({ _id: productId });
                if (!productInDb) {
                    return res.status(400).json({
                        status: false,
                        message: `Product ${productName} not found`,
                        data: { },
                    });
                } else {
                    productInDb.beenPurchased = true;
                    await productInDb.save();
                }
            }
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