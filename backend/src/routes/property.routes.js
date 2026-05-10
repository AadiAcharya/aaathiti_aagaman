// property.routes.js
const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/property.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

router.get('/',      ctrl.getProperties);
router.get('/:id',   ctrl.getPropertyById);
router.post('/',     protect, authorize('host', 'admin'), ctrl.createProperty);
router.put('/:id',   protect, authorize('host', 'admin'), ctrl.updateProperty);
router.delete('/:id',protect, authorize('host', 'admin'), ctrl.deleteProperty);

module.exports = router;
