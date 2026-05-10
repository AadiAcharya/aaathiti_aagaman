const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/host.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const host = [protect, authorize('host', 'admin')];

router.get('/dashboard',                host, ctrl.getDashboard);
router.get('/listings',                 host, ctrl.getHostListings);
router.get('/reservations',             host, ctrl.getHostReservations);
router.put('/reservations/:id',         host, ctrl.updateReservationStatus);
router.get('/transactions',             host, ctrl.getHostTransactions);
router.get('/messages',                 host, ctrl.getHostMessages);
router.post('/messages',                host, ctrl.sendMessage);
router.get('/notifications',            host, ctrl.getNotifications);
router.put('/notifications/read-all',   host, ctrl.markAllNotificationsRead);

module.exports = router;
