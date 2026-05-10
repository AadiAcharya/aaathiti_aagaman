// admin.routes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const admin = [protect, authorize('admin')];

router.get('/stats',         admin, ctrl.getStats);
router.get('/users',         admin, ctrl.getUsers);
router.put('/users/:id',     admin, ctrl.updateUser);
router.delete('/users/:id',  admin, ctrl.deleteUser);
router.get('/bookings',      admin, ctrl.getAllBookings);

module.exports = router;
