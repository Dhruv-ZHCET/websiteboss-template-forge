
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    await fs.ensureDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: (req, file, cb) => {
    // Allow images only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Upload image
router.post('/image', authenticateToken, (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File too large' });
        }
      }
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      // Save upload record to database
      const uploadRecord = await prisma.upload.create({
        data: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          path: req.file.path,
          userId: req.user.userId
        }
      });

      // Return the file URL
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      res.json({
        id: uploadRecord.id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: req.file.size
      });
    } catch (error) {
      console.error('Upload error:', error);
      
      // Clean up the uploaded file if database save fails
      fs.remove(req.file.path).catch(console.error);
      
      res.status(500).json({ message: 'Failed to save upload record' });
    }
  });
});

// Get user uploads
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const uploads = await prisma.upload.findMany({
      where: { userId },
      select: {
        id: true,
        filename: true,
        originalName: true,
        mimetype: true,
        size: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Add URLs to uploads
    const uploadsWithUrls = uploads.map(upload => ({
      ...upload,
      url: `${req.protocol}://${req.get('host')}/uploads/${upload.filename}`
    }));

    res.json(uploadsWithUrls);
  } catch (error) {
    console.error('Get uploads error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete upload
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Find upload
    const upload = await prisma.upload.findFirst({
      where: { id, userId }
    });

    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' });
    }

    // Delete file from filesystem
    await fs.remove(upload.path).catch(console.error);

    // Delete record from database
    await prisma.upload.delete({
      where: { id }
    });

    res.json({ message: 'Upload deleted successfully' });
  } catch (error) {
    console.error('Delete upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
