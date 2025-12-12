import Podcast from '../models/Podcast.js';

// @desc    Get all podcasts (public)
// @route   GET /api/podcasts
// @access  Public
export const getPodcasts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', featured } = req.query;
    const query = { published: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const podcasts = await Podcast.find(query)
      .populate('section')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Podcast.countDocuments(query);

    res.json({
      podcasts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single podcast
// @route   GET /api/podcasts/:id
// @access  Public
export const getPodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id).populate('section');

    if (!podcast || !podcast.published) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    res.json(podcast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get latest podcast
// @route   GET /api/podcasts/latest
// @access  Public
export const getLatestPodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findOne({ published: true })
      .populate('section')
      .sort({ createdAt: -1 });

    if (!podcast) {
      return res.status(404).json({ message: 'No podcasts found' });
    }

    res.json(podcast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get featured podcasts
// @route   GET /api/podcasts/featured
// @access  Public
export const getFeaturedPodcasts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;
    const podcasts = await Podcast.find({ published: true, featured: true })
      .populate('section')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get related podcasts
// @route   GET /api/podcasts/:id/related
// @access  Public
export const getRelatedPodcasts = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    const related = await Podcast.find({
      _id: { $ne: req.params.id },
      published: true,
      $or: [
        { tags: { $in: podcast.tags } },
        { name: { $regex: podcast.name.split(' ')[0], $options: 'i' } },
      ],
    })
      .populate('section')
      .limit(4)
      .sort({ createdAt: -1 });

    res.json(related);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create podcast (admin)
// @route   POST /api/podcasts
// @access  Private/Admin
export const createPodcast = async (req, res) => {
  try {
    const podcast = await Podcast.create(req.body);
    res.status(201).json(podcast);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update podcast (admin)
// @route   PUT /api/podcasts/:id
// @access  Private/Admin
export const updatePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    res.json(podcast);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete podcast (admin)
// @route   DELETE /api/podcasts/:id
// @access  Private/Admin
export const deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);

    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    res.json({ message: 'Podcast deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all podcasts (admin - includes unpublished)
// @route   GET /api/admin/podcasts
// @access  Private/Admin
export const getAllPodcastsAdmin = async (req, res) => {
  try {
    const podcasts = await Podcast.find().populate('section').sort({ createdAt: -1 });
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

