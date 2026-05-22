const router = require('express').Router();
const { createOrder, getAllOrders, getOneOrder, updateOrder, deleteOrder } = require('../controller/orderController');
const { checkAdmin } = require('../middleware/validation');

router.post('/create-order/:id', checkAdmin, createOrder);
router.get('/orders', checkAdmin, getAllOrders);
router.get('/orders/:id', checkAdmin, getOneOrder);
router.put('/orders/:id', checkAdmin, updateOrder);
router.delete('/orders/:id', checkAdmin, deleteOrder);

module.exports = router;