const express = require('express');
const router = express.Router();
const { getServices, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/services
router.get('/', getServices);

// @route   GET /api/services/:id
router.get('/:id', getServiceById);

// @route   POST /api/services
router.post('/', protect, createService);

// @route   PUT /api/services/:id
router.put('/:id', protect, updateService);

// @route   DELETE /api/services/:id
router.delete('/:id', protect, deleteService);

module.exports = router;