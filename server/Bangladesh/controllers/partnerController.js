import Partner from '../models/Partner.js';

// @desc    Fetch active partners
// @route   GET /api/partners
// @access  Public
const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find({ isActive: true }).sort('order');
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch all partners (admin)
// @route   GET /api/partners/admin
// @access  Private (Admin)
const getPartnersAdmin = async (req, res) => {
  try {
    const partners = await Partner.find({}).sort('order');
    res.json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a partner
// @route   POST /api/partners
// @access  Private (Admin)
const createPartner = async (req, res) => {
  try {
    const { name, logoUrl, websiteUrl, logoSize, order, isActive } = req.body;

    const partner = new Partner({
      name,
      logoUrl,
      websiteUrl,
      logoSize: logoSize || '200x80',
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    const createdPartner = await partner.save();
    res.status(201).json(createdPartner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a partner
// @route   PUT /api/partners/:id
// @access  Private (Admin)
const updatePartner = async (req, res) => {
  try {
    const { name, logoUrl, websiteUrl, logoSize, order, isActive } = req.body;

    const partner = await Partner.findById(req.params.id);

    if (partner) {
      partner.name = name || partner.name;
      partner.logoUrl = logoUrl || partner.logoUrl;
      partner.websiteUrl = websiteUrl !== undefined ? websiteUrl : partner.websiteUrl;
      partner.logoSize = logoSize || partner.logoSize;
      partner.order = order !== undefined ? order : partner.order;
      partner.isActive = isActive !== undefined ? isActive : partner.isActive;

      const updatedPartner = await partner.save();
      res.json(updatedPartner);
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a partner
// @route   DELETE /api/partners/:id
// @access  Private (Admin)
const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (partner) {
      await partner.deleteOne();
      res.json({ message: 'Partner removed' });
    } else {
      res.status(404).json({ message: 'Partner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getPartners, getPartnersAdmin, createPartner, updatePartner, deletePartner };
