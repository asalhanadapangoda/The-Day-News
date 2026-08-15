import Program from '../models/Program.js';

// @desc    Fetch all programs
// @route   GET /api/programs
// @access  Public
const getPrograms = async (req, res) => {
  try {
    const { page = 1, limit = 50, search } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const total = await Program.countDocuments(query);
    const totalPages = Math.ceil(total / limitNumber);

    const programs = await Program.find(query)
      .skip(skip)
      .limit(limitNumber);

    res.set({
      'X-Total-Count': total,
      'X-Total-Pages': totalPages,
      'X-Current-Page': pageNumber
    });

    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch single program by ID or Slug
// @route   GET /api/programs/:idOrSlug
// @access  Public
const getProgramByIdOrSlug = async (req, res) => {
  try {
    const isObjectId = req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/);
    const query = isObjectId ? { _id: req.params.idOrSlug } : { slug: req.params.idOrSlug };
    
    const program = await Program.findOne(query);

    if (program) {
      res.json(program);
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a program
// @route   POST /api/programs
// @access  Private (Admin)
const createProgram = async (req, res) => {
  try {
    const { title, slug, description, coverImage, logoImage, posterImage, isFeatured, metaTitle, metaDescription, metaKeywords, metaImage } = req.body;

    // Auto-generate slug from title if not provided
    const generateSlug = (str) =>
      str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    
    let finalSlug = slug ? slug.trim() : generateSlug(title);

    // Check for existing slug and make unique if needed
    let slugExists = await Program.findOne({ slug: finalSlug });
    let counter = 1;
    while (slugExists) {
      finalSlug = `${generateSlug(slug || title)}-${counter}`;
      slugExists = await Program.findOne({ slug: finalSlug });
      counter++;
    }

    const program = new Program({
      title,
      slug: finalSlug,
      description,
      coverImage,
      logoImage,
      posterImage,
      isFeatured,
      metaTitle: metaTitle || '',
      metaDescription: metaDescription || '',
      metaKeywords: metaKeywords || '',
      metaImage: metaImage || '',
    });

    const createdProgram = await program.save();
    res.status(201).json(createdProgram);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a program
// @route   PUT /api/programs/:id
// @access  Private (Admin)
const updateProgram = async (req, res) => {
  try {
    const { title, slug, description, coverImage, logoImage, posterImage, isFeatured, metaTitle, metaDescription, metaKeywords, metaImage } = req.body;

    const program = await Program.findById(req.params.id);

    if (program) {
      program.title = title || program.title;
      program.slug = slug || program.slug;
      program.description = description || program.description;
      program.coverImage = coverImage || program.coverImage;
      program.logoImage = logoImage || program.logoImage;
      program.posterImage = posterImage !== undefined ? posterImage : program.posterImage;
      program.isFeatured = isFeatured !== undefined ? isFeatured : program.isFeatured;
      if (metaTitle !== undefined) program.metaTitle = metaTitle;
      if (metaDescription !== undefined) program.metaDescription = metaDescription;
      if (metaKeywords !== undefined) program.metaKeywords = metaKeywords;
      if (metaImage !== undefined) program.metaImage = metaImage;

      const updatedProgram = await program.save();
      res.json(updatedProgram);
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a program
// @route   DELETE /api/programs/:id
// @access  Private (Admin)
const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (program) {
      await program.deleteOne();
      res.json({ message: 'Program removed' });
    } else {
      res.status(404).json({ message: 'Program not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getPrograms, getProgramByIdOrSlug, createProgram, updateProgram, deleteProgram };
