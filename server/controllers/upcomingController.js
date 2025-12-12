import Upcoming from '../models/Upcoming.js';

// @desc    Get all upcoming podcasts
// @route   GET /api/upcoming
// @access  Public
export const getUpcoming = async (req, res) => {
  try {
    const upcoming = await Upcoming.find().sort({ createdAt: -1 });
    res.json(upcoming);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create upcoming podcast (admin)
// @route   POST /api/upcoming
// @access  Private/Admin
export const createUpcoming = async (req, res) => {
  try {
    const upcoming = await Upcoming.create(req.body);
    res.status(201).json(upcoming);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update upcoming podcast (admin)
// @route   PUT /api/upcoming/:id
// @access  Private/Admin
export const updateUpcoming = async (req, res) => {
  try {
    const upcoming = await Upcoming.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!upcoming) {
      return res.status(404).json({ message: 'Upcoming podcast not found' });
    }

    res.json(upcoming);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete upcoming podcast (admin)
// @route   DELETE /api/upcoming/:id
// @access  Private/Admin
export const deleteUpcoming = async (req, res) => {
  try {
    const upcoming = await Upcoming.findByIdAndDelete(req.params.id);

    if (!upcoming) {
      return res.status(404).json({ message: 'Upcoming podcast not found' });
    }

    res.json({ message: 'Upcoming podcast deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

