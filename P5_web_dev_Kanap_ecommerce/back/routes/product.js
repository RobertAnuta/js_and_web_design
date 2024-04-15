const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
router.post('/order', productCtrl.orderProducts);

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });

module.exports = router;