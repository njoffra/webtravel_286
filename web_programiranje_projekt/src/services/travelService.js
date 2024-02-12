const Travel = require('../models/travel');
const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.create = (req, res) => {
  const travelIn = req.body;
  let travel = new Travel(travelIn);
  travel
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.list = async (req, res) => {
  try {
      const travels = await Travel.find().populate('category', 'name'); 
      res.json(travels);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.read = (req, res) => {
  const travelId = req.params.travelId;
  Travel.findOne({ _id: travelId })
    .then((data) => {
      return res.json(data);
    })
    .catch((err, data) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.remove = (req, res) => {
  const travelId = req.params.travelId;
  Travel.findOneAndDelete({ _id: travelId })
    .then(() => {
      res.json({
        message: "Travel deleted sucessfully",
      });
    })
    .catch((err) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.edit = (req, res) => {
  const travelIn = req.body;
  const travelId = req.params.travelId;

  Travel.findOneAndUpdate({ _id: travelId }, travelIn, {
    new: true,
    upsert: true,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

