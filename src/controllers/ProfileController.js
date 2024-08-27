// controllers/ProfileController.js
function profile(req, res) {
    if (req.session.loggedin) {
      res.render('profile/index', { user: req.session.user });
    } else {
      res.redirect('/login');
    }
  }
  
  module.exports = {
    profile
  };
  