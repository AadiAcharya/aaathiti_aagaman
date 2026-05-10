const Property = require('../models/Property.model');

// ─── GET /api/properties ──────────────────────────────────────────────────────
// Supports: ?category=villas&isTopRated=true&isFeatured=true&search=Miami&page=1&limit=9
exports.getProperties = async (req, res) => {
  try {
    const { category, isTopRated, isFeatured, search, page = 1, limit = 9 } = req.query;
    const query = { isActive: true };

    if (category && category !== 'all') query.category = category;
    if (isTopRated === 'true') query.isTopRated = true;
    if (isFeatured === 'true') query.isFeatured = true;
    if (search) {
      query.$or = [
        { title:    { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Property.countDocuments(query);

    const properties = await Property.find(query)
      .populate('host', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, count: properties.length, total, properties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/properties/:id ──────────────────────────────────────────────────
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('host', 'name avatar email phone');
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
    res.json({ success: true, property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/properties ─────────────────────────────────────────────────────
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, host: req.user.id });
    res.status(201).json({ success: true, property });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── PUT /api/properties/:id ──────────────────────────────────────────────────
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });

    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    res.json({ success: true, property });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ─── DELETE /api/properties/:id ───────────────────────────────────────────────
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });

    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await property.deleteOne();
    res.json({ success: true, message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
