import Event from '../models/Event.js';

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'published' }).sort({ eventDate: -1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Fetch all events for admin (including drafts)
// @route   GET /api/events/admin
// @access  Private (Admin)
const getAdminEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch single event by slug
// @route   GET /api/events/:slug
// @access  Public
const getEventBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private (Admin)
const createEvent = async (req, res) => {
  try {
    const { title, tagline, eventDate, location, heroImages, videoUrl, galleryImages, status, albumUrl } = req.body;

    if (!title || !eventDate || !location || !heroImages || !galleryImages) {
      return res.status(400).json({ message: 'Please provide all required fields (Hero images, title, date...)' });
    }

    const slug = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const existing = await Event.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const event = new Event({
      title,
      slug: finalSlug,
      tagline,
      eventDate,
      location,
      heroImages,
      videoUrl,
      galleryImages,
      status: status || 'draft',
      albumUrl,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Admin)
const updateEvent = async (req, res) => {
  try {
    const { title, tagline, eventDate, location, heroImages, videoUrl, galleryImages, status, albumUrl } = req.body;

    const event = await Event.findById(req.params.id);

    if (event) {
      if (title && title !== event.title) {
        event.title = title;
        const slug = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const existing = await Event.findOne({ slug, _id: { $ne: event._id } });
        event.slug = existing ? `${slug}-${Date.now()}` : slug;
      }
      
      if (tagline !== undefined) event.tagline = tagline;
      if (eventDate) event.eventDate = eventDate;
      if (location) event.location = location;
      if (heroImages) event.heroImages = heroImages;
      if (videoUrl) event.videoUrl = videoUrl;
      if (galleryImages) event.galleryImages = galleryImages;
      if (status) event.status = status;
      if (albumUrl !== undefined) event.albumUrl = albumUrl;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      await event.deleteOne();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getEvents, getAdminEvents, getEventBySlug, createEvent, updateEvent, deleteEvent };
