const FoundItem = require("../models/foundItem.model");

// GET /api/items - Retrieve all items from MongoDB
const getItems = async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error: error.message });
  }
};

// POST /api/items - Save a new item report into MongoDB
const createItem = async (req, res) => {
  try {
    const {
      type,
      title,
      category,
      date,
      location,
      campus,
      building,
      room,
      description,
      status,
    } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({
        message: "Title, category, and description are required.",
      });
    }

    const itemLocation = location || [building, room, campus].filter(Boolean).join(", ") || "Main Campus";
    const itemDate = date ? new Date(date) : new Date();

    const newItem = new FoundItem({
      type: type || "found",
      title,
      category,
      date: itemDate,
      foundAt: itemDate,
      location: itemLocation,
      campusLocation: itemLocation,
      campus,
      building,
      room,
      description,
      status: status || "active",
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      message: "Report created successfully.",
      item: savedItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save report", error: error.message });
  }
};

module.exports = {
  getItems,
  createItem,
};
