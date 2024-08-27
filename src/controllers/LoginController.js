const bcrypt = require('bcrypt');

function index(req, res) {
  if (req.session.loggedin) {
    res.redirect('/');
  } else {
    res.render('login/index');
  }
}

function register(req, res) {
  res.render('login/register');
}

function auth(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      res.redirect('/login');
      return;
    }

    conn.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
      if (err) {
        console.error(err);
        res.redirect('/login');
        return;
      }

      if (rows.length > 0) {
        const user = rows[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.error(err);
            res.redirect('/login');
            return;
          }

          if (isMatch) {
            req.session.loggedin = true;
            req.session.name = user.email;  // O cualquier dato relevante del usuario
            res.redirect('/');
          } else {
            res.redirect('/login');
          }
        });
      } else {
        res.redirect('/login');
      }
    });
  });
}

function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
      }
      res.redirect('/login');
    });
  } else {
    res.redirect('/login');
  }
}

module.exports = {
  index,
  register,
  auth,
  logout
};
