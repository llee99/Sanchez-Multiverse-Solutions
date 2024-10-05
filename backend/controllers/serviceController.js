const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
    
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a new service
// @route   POST /api/services
// @access  Private
const createService = async (req, res) => {
    const { title, description } = req.body;

    try {
        const service = new Service({
            title,
            description,
            // Add more fields as necessary
        });
    
        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private
const updateService = async (req, res) => {
    const { title, description } = req.body;

    try {
        const service = await Service.findById(req.params.id);
    
        if (service) {
            service.title = title || service.title;
            service.description = description || service.description;
            // Update other fields as necessary

        const updatedService = await service.save();
        res.json(updatedService);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
    
        if (service) {
            await service.remove();
            res.json({ message: 'Service removed' });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getServices, getServiceById, createService, updateService, deleteService };