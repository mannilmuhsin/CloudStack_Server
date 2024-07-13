const SearchHistory = require('../models/SearchHistory');

exports.addSearchHistory = async (req, res) => {
  try {
    const { searchTerm, latitude, longitude } = req.body;
    const userId = req.user.userId;

    const searchHistory = await SearchHistory.findOneAndUpdate(
      { userId, searchTerm },
      { $set: { createdAt: new Date(), latitude, longitude } },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: 'Search history saved', searchHistory });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = await SearchHistory.find({ userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteSearchHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await SearchHistory.findOneAndDelete({ _id: id, userId });
    if (!result) {
      return res.status(404).json({ error: 'Search history item not found' });
    }

    res.json({ message: 'Search history item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};