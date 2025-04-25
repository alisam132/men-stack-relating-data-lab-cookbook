// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//index
router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      console.log(currentUser.pantry);
      
      res.render('foods/index.ejs', {
        pantry: currentUser.pantry,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  //new
  router.get('/new', (req, res) => {
      res.render('foods/new.ejs');
  });
  
  router.post('/', async (req, res) => {
      try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
    });

    //show
    router.get('/:iteamId', async (req, res) => {
      try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.iteamId);
        res.render('foods/show.ejs', {
          pantry: pantry,
        });
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
    });

    //delete
    router.delete('/:iteamId', async (req, res) => {
      try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.iteamId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
    });
  //edit
    router.get('/:iteamId/edit', async (req, res) => {
      try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.iteamId);
        res.render('foods/edit.ejs', {
          pantry: pantry,
        });
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
    });
  
  //update
    router.put('/:iteamId', async (req, res) => {
      try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.iteamId);
        pantry.set(req.body);
        await currentUser.save();
        res.redirect(
          `/users/${currentUser._id}/foods/${req.params.iteamId}`
        );
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
    });
module.exports = router;
