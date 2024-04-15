const Sauce = require('../models/Sauce')
const fs = require('fs')

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Sauce registered!' }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`
      }
    : { ...req.body }
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Sauce modified!' }))
    .catch(error => res.status(400).json({ error }))
}

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted!'
      })
    })
    .catch(error => res.status(500).json({ error }))
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }))
}

exports.likeSauce = (req, res, next) => {
  //get the sauce using params.id
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      console.log('returns the description of the sauce')
      console.log(sauce)

      // like action
      if (req.body.like === 1) {
        //start the condition to set the like to 1
        if (!sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
              $push: { usersLiked: req.body.userId }
            }
          )
            .then(() => res.status(201).json({ message: 'sauce like +1' }))
            .catch(error => res.status(400).json({ error }))
        }
        //dislike action
      } else if (req.body.like === -1) {
        if (!sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.body.userId }
            }
          )
            .then(() => res.status(201).json({ message: 'sauce like -1' }))
            .catch(error => res.status(400).json({ error }))
        }
      } else if (req.body.like === 0) {
        // action of removing a like/dislike
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId }
            }
          )
            .then(() => res.status(201).json({ message: 'sauce like 0' }))
            .catch(error => res.status(400).json({ error }))
        } else if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId }
            }
          )
            .then(() => res.status(201).json({ message: 'sauce dislike 0' }))
            .catch(error => res.status(400).json({ error }))
        }
      }
    })
    .catch(error => res.status(404).json({ error }))
}
