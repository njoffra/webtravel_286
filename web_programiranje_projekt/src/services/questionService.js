const Question = require('../models/question');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.create = (req, res) => {
  const questionIn = req.body;
  let question = new Travel(questionIn);
  question
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

exports.list = (req, res) => {
  Question.find({})
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      if ((err = null)) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.read = (req, res) => {
  const questionId = req.params.questionId;
  Question.findOne({ _id: questionId })
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
  const questionId = req.params.questionId;
  Question.findOneAndDelete({ _id: questionId })
    .then(() => {
      res.json({
        message: "Question deleted sucessfully",
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
  const questionIn = req.body;
  const questionId = req.params.questionId;

  Question.findOneAndUpdate({ _id: questionId }, questionIn, {
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

