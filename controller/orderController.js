const orderModel = require('../models/order');
const orderId = require('otp-generator');

exports.createOrder = async(req,res,next)=>{
    try {
        const {id} = req.user;
        const cusId = req.params.id
        const { item, specification, amount, quantity, paymentMode, address } = req.body 
        const generatedOrderId = `SC-${orderId.generate(7, { lowerCase: false, upperCase: false, specialChars: false, alphabets: false, digits: true })}`;
        const date = new Date();
        const ready = date.setDate(date.getDate() + 2);
        const setReady = new Date(ready);


        const order = await orderModel.create({
            adminId: id,
            customerId: cusId,
            orderId: generatedOrderId,
            item,
            specification,
            amount,
            quantity,
            paymentMode,
            bookingDate: new Date(Date.now()),
            readyDate: setReady,
            address
        })

        res.status(201).json({
            message: 'Order created successfully',
            order
        })
    } catch (error) {
        next(error)
    }
}

exports.getAllOrders = async(req,res,next)=>{
    try {
        const orders = await orderModel.find() 
        res.status(200).json({
            message: 'Orders retrieved successfully',
            orders
        })
    } catch (error) {
        next(error)
    }
};

exports.getNewRequests = async(req,res,next)=>{
    try {
        const orders = await orderModel.find({ status: 'new request' })
        res.status(200).json({
            message: 'New requests retrieved successfully',
            orders
        })
    } catch (error) {
        next(error)
    }
}

exports.getInProgress = async(req,res,next)=>{
    try {
        const orders = await orderModel.find({ status: 'in-progress' })
        res.status(200).json({
            message: 'In-progress orders retrieved successfully',
            orders
        })
    } catch (error) {
        next(error)
    }
}

exports.getCompleted = async(req,res,next)=>{
    try {
        const orders = await orderModel.find({ status: 'completed' })
        res.status(200).json({
            message: 'Completed orders retrieved successfully',
            orders
        })
    } catch (error) {
        next(error)
    }
};

exports.getCancelled = async(req,res,next)=>{
    try {
        const orders = await orderModel.find({ status: 'cancelled' })
        res.status(200).json({
            message: 'Cancelled orders retrieved successfully',
            orders
        })
    } catch (error) {
        next(error)
    }
}

exports.getOneOrder = async(req,res,next)=>{
    try {
        const {id} = req.params
        const order = await orderModel.findById(id)
        if(!order){
            return res.status(404).json({   
                message: 'Order not found'
            })
        }
        res.status(200).json({
            message: 'Order retrieved successfully',
            order
        })
    } catch (error) {
        next(error)
    }
}

exports.updateOrder = async(req,res,next)=>{
    try {
        const { deliveryMode, readyDate, status } = req.body
        const {id} = req.user;
        const orderId = req.params.id

            const orderUpdate = {
            deliveryMode,
            readyDate,
            status
        }
        const order = await orderModel.findOneAndUpdate({ orderId: orderId, adminId: id } , orderUpdate, {new: true})
        if(!order){
            return res.status(404).json({   
                message: 'Order not found'
            })
        }
        res.status(200).json({
            message: 'Order updated successfully',
            order
        })
    } catch (error) {
        next(error)
    }
};
 
exports.deleteOrder = async(req,res,next)=>{
    try {
        const {id} = req.user;  
        const orderId = req.params.id
        const order = await orderModel.findOneAndDelete({ orderId: orderId, adminId: id })
        if(!order){
            return res.status(404).json({   
                message: 'Order not found'
            })
        }
        res.status(200).json({
            message: 'Order deleted successfully',
            order
        })
    } catch (error) {
        next(error)
    }
};
