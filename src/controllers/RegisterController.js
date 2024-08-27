const bcrypt = require('bcrypt');

function index(req, res) {
  res.render('login/register');
}

function register(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.redirect('/register');
      return;
    }

    req.getConnection((err, conn) => {
      if (err) {
        console.error(err);
        res.redirect('/register');
        return;
      }

      conn.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
        if (err) {
          console.error(err);
          res.redirect('/register');
        } else {
          res.redirect('/login');
        }
      });
    });
  });
}

module.exports = {
  index,
  register
};
