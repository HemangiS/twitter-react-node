const express = require('express');
const path = require('path');
const multer = require('multer');
const DB = require('../helpers/db');

const router = express.Router();

const upload = multer({ dest: path.resolve(__dirname, '../public/images/') });

// router.get('/login', (req, res) => {
//   res.render('login');
// });

router.get('/profile/:id', (req, res, next) => {
  const profileid = req.params.id;
  // const session = req.session;
  const userId = req.body.user_id;
  let query;
  if (userId) {
    // if (profileid == user_id) {
    //   res.redirect('/profilechange');
    // } else {
    query = DB.builder()
    .select()
    .from('users')
    .where('user_id = ?', profileid)
    .toParam();
    DB.executeQuery(query, (error, profile) => {
      if (error) {
        next(error);
        return;
      }
      query = DB.builder()
      .select()
      .field('tweet')
      .field('time')
      .field('username')
      .field('image')
      .field('imagetweet')
      .field('user_id')
      .field('id')
      .from('tweet', 't')
      .join(DB.builder()
      .select()
      .from('users'), 'u', 't.userid = u.user_id')
      .where('user_id = ?', profileid)
      .order('time', false)
      .toParam();
      DB.executeQuery(query, (errorusers, tweets) => {
        if (errorusers) {
          next(errorusers);
          return;
        }
        query = DB.builder()
        .select()
        .from('follower')
        .where('login_user_id = ?', profileid)
        .toParam();
        DB.executeQuery(query, (errortweets, c) => {
          if (errortweets) {
            next(errortweets);
            return;
          }
          const object = {
            profile: profile.rows[0],
            count: c.rows.length,
            tweets: tweets.rows,
          };

          res.end(JSON.stringify(object));

          // console.log(object)
          //  res.end( JSON.stringify(object));
          // res.render('profile', {
          //   profile: profile.rows[0],
          //   count: c.rows.length,
          //   tweets: tweets.rows,
          // });
        });
      });
    });
  // }
  } else {
    // res.redirect('/login');
  }
});

router.get('/followers/:id', (req, res) => {
  // const session = req.session;
  const userId = req.params.id;
  console.log('----apifollowers');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  let query;
  if (userId) {
    query = DB.builder()
    .select()
    .from('users')
    .where('user_id = ?', userId)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      query = DB.builder()
      .select()
      .field('username')
      .field('follower_id')
      .field('user_id')
      .field('image')
      .field('id')
      .from('users', 'r')
      .join(DB.builder()
      .select()
      .from('follower'), 'f', 'r.user_id = f.follower_id')
      .where('login_user_id = ?', userId)
      .toParam();
      DB.executeQuery(query, (errorresults, users) => {
        if (errorresults) {
          console.log(errorresults);
          return;
        }
        query = DB.builder()
        .select()
        .from('follower')
        .where('login_user_id = ?', userId)
        .toParam();
        DB.executeQuery(query, (errorusers, c) => {
          if (errorusers) {
            console.log(errorusers);
            return;
          }
          query = DB.builder()
          .select()
          .field('id')
          .from('tweet', 't')
          .join(DB.builder()
          .select()
          .from('users'), 'u', 't.userid = u.user_id')
          .where('user_id = ?', userId)
          .order('time', false)
          .toParam();
          DB.executeQuery(query, (errorc, tweets) => {
            if (errorc) {
              console.log(errorc);
              return;
            }
            const object = {
              count: c.rows.length,
              users: users.rows,
              results: results.rows[0],
              tweets: tweets.rows,
            };
            console.log(object);
            res.end(JSON.stringify(object));
          // res.render('followers', {
          //   count: c.rows.length,
          //
          //   results: results.rows,
          // });
          });
        });
      });
    });
  } else {
    // res.redirect('/login');
  }
});

router.post('/login', (req, res, next) => {
  console.log('----apilogin');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const email = req.body.userdata.email;
  const password = req.body.userdata.password;
  // const email = req.sanitize('email').trim();
  // const password = req.sanitize('password').trim();
  // if (req.body.email) {
  //   req.checkBody('email', 'Email is not valid').isEmail();
  // } else {
  //   req.checkBody('email', 'Email is required').notEmpty();
  // }
  // req.checkBody('password', 'Password is required').notEmpty();
  const session = req.session;

  let query;

  // const errors = req.validationErrors();

  // if (errors) {
  //   res.render('login', {
  //     errors,
  //   });
  // } else {
  query = DB.builder()
  .select()
  .from('users')
  .where('email = ?', email)
  .toParam();
  DB.executeQuery(query, (error, results) => {
    if (error) {
      next(error);
      return;
    }

    if (results.rowCount) {
      query = DB.builder()
      .select()
      .from('users')
      .where('email = ?', email)
      .where('password = ?', password)
      .toParam();
      DB.executeQuery(query, (err, results1) => {
        if (err) {
          next(err);
          return;
        }

        if (results1.rowCount) {
          session.user_id = results1.rows[0].user_id;
          // res.redirect('/welcome');
          const dataobject = {
            user_id: session.user_id,
          };
          res.end(JSON.stringify(dataobject));
        } else {
          // res.redirect('/login');
        }
      });
    } else {
      // res.redirect('/register');
    }
  });
  // }
});

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/register', (req, res) => {
  // , upload.single('photo')
  console.log('----apiregister called');
// , upload.single('profile')
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // console.log('####profilepictureupload API called');
  // console.log('imgfile is ---> ', req.file);
  // console.log('imgfilename is ---> ', req.file.filename);
  // const user_id = req.params.id;
  // const photo = req.file.filename;

  const username = req.body.userdata.username;
  const email = req.body.userdata.email;
  const mobilenumber = req.body.userdata.mobilenumber;
  const password = req.body.userdata.password;

  console.log('username is ---> ', username);
  console.log('email is ---> ', email);
  console.log('mobilenumber is ---> ', mobilenumber);
  console.log('password is ---> ', password);
  // const username = req.sanitize('username').trim();
  // const email = req.sanitize('email').trim();
  // const mobilenumber = req.sanitize('mobilenumber').trim();
  // const password = req.sanitize('password').trim();

  // req.checkBody('username', 'Username is required').notEmpty();
  // req.checkBody('mobilenumber', 'Mobile Number is required').notEmpty();
  // if (req.body.email) {
  //   req.checkBody('email', 'Email is not valid').isEmail();
  // } else {
  //   req.checkBody('email', 'Email is required').notEmpty();
  // }
  // req.checkBody('password', 'Password is required').notEmpty();
  // req.checkBody('confirmpassword', 'Password do not match').equals(password);

  // const errors = req.validationErrors();

  // if (errors) {
  //   res.render('register', {
  //     errors,
  //   });
  // } else {
    // let photo = '';

    // if (req.file) {
    //   photo = req.file.filename;
    // } else {
    //   photo = 'cover.jpg';
    // }

  const query = DB.builder()
  .insert()
  .into('users')
  .set('username', username)
  .set('email', email)
  .set('image', '8e5323f97f734fe7016955cc8df10be6')
  .set('mobilenumber', mobilenumber)
  .set('password', password)
  .toParam();
  console.log(query);
  DB.executeQuery(query, (error) => {
    if (error) {
      console.log(error);
    }
    res.send('----register called successfully----');

  });
  // }
});

router.post('/tweet', upload.single('imagetweet'), (req, res) => {
  console.log('----apitweet called');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const userId = req.body.user_id;
  const tweet = req.body.userdata.tweet;
  // const session = req.session;
  // req.checkBody('tweet', 'Invalid length of tweet min= 8 max= 140').notEmpty().len(2, 140);

  // const errors = req.validationErrors();

  // if (errors) {
  //   res.render('register', {
  //     errors,
  //   });
  // } else {
  //   let photo = '';
  //   if (req.file) {
  //     photo = req.file.filename;
  //   } else {
  //     photo = '';
  //   }
  const query = DB.builder()
  .insert()
  .into('tweet')
  .set('tweet', tweet)
  .set('userid', userId)
  // .set('imagetweet', 'photo')
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      console.log(error);
    }
    res.send('tweet api successfully called');
    // res.redirect('/welcome');
  });
  // }
});

router.get('/deletetweet/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const tweetid = req.params.id;
  console.log('----apiDeletetweet called');
  console.log('----tweetiddelete --->', tweetid);

  const query = DB.builder()
  .delete()
  .from('tweet')
  .where('id = ?', tweetid)
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      console.log(error);
    }
    res.send('Deletetweet api successfully called');
    // res.redirect('/profilechange');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    // res.redirect('/login');
  });
  res.send('logout successfully');
});

router.get('/welcome/:id', (req, res, next) => {
  const userId = req.params.id;
  // const session = req.session;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  let query;
  if (userId) {
    query = DB.builder()
    .select()
    .from('users')
    .where('user_id = ?', userId)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }

      query = DB.builder()
      .select()
      .from('users')
      .where('user_id != ?', userId)
      .where('user_id NOT IN ?',
      DB.builder()
      .select()
      .field('follower_id')
      .from('follower')
      .where('login_user_id = ?', userId))
      .toParam();
      DB.executeQuery(query, (errorresults, follow) => {
        if (errorresults) {
          next(errorresults);
          return;
        }
        query = DB.builder()
        .select()
        .field('username')
        .field('tweet')
        .field('imagetweet')
        .field('time')
        .field('id')
        .field('user_id')
        .field('image')
        .from('users', 'u')
        .join(DB.builder().select().from('tweet'), 't', 'u.user_id = t.userid')
        .where('u.user_id IN ? OR u.user_id= ? ',
        (DB.builder()
        .select()
        .field('follower_id')
        .from('follower')
        .where('login_user_id = ?', userId)), userId)
        .order('time', false)
        .toParam();
        DB.executeQuery(query, (errorfollow, tweets) => {
          if (errorfollow) {
            next(errorfollow);
            return;
          }
          query = DB.builder()
          .select()
          .from('follower')
          .where('login_user_id = ?', userId)
          .toParam();
          DB.executeQuery(query, (errortweets, c) => {
            if (errortweets) {
              next(errortweets);
              return;
            }
            const object = {
              count: c.rows.length,
              follow: follow.rows,
              results: results.rows[0],
              tweets: tweets.rows,
            };
            console.log(object);
            res.end(JSON.stringify(object));
            // res.render('welcome', {
            //   count: c.rows.length,
            //   follow: follow.rows,
            //   results: results.rows,
            //   tweets: tweets.rows,
            // });
          });
        });
      });
    });
  } else {
    // res.redirect('/login');
  }
});

router.get('/yourprofile/:id', (req, res, next) => {
  console.log('----apiyourprofile called');
  const userId = req.params.id;
  // const session = req.session;
  let query;
  if (userId) {
    query = DB.builder()
    .select()
    .from('users')
    .where('user_id = ?', userId)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      query = DB.builder()
      .select()
      .field('username')
      .field('follower_id')
      .field('user_id')
      .field('image')
      .field('id')
      .from('users', 'r')
      .join(DB.builder()
      .select()
      .from('follower'), 'f', 'r.user_id = f.follower_id')
      .where('login_user_id = ?', userId)
      .toParam();
      DB.executeQuery(query, (errorresults, users) => {
        if (errorresults) {
          next(errorresults);
          return;
        }
        query = DB.builder()
        .select()
        .field('tweet')
        .field('time')
        .field('username')
        .field('image')
        .field('imagetweet')
        .field('user_id')
        .field('id')
        .from('tweet', 't')
        .join(DB.builder()
        .select()
        .from('users'), 'u', 't.userid = u.user_id')
        .where('user_id = ?', userId)
        .order('time', false)
        .toParam();
        DB.executeQuery(query, (errorusers, tweets) => {
          if (errorusers) {
            next(errorusers);
            return;
          }
          query = DB.builder()
          .select()
          .from('follower')
          .where('login_user_id = ?', userId)
          .toParam();
          DB.executeQuery(query, (errortweets, c) => {
            if (errortweets) {
              next(errortweets);
              return;
            }
            const object = {
              count: c.rows.length,
              users: users.rows,
              results: results.rows[0],
              tweets: tweets.rows,
            };
            console.log(object);
            res.end(JSON.stringify(object));
            // res.render('profilechange', {
            //   count: c.rows.length,
            //   tweets: tweets.rows,
            //   users: users.rows,
            //   results: results.rows,
            // });
          });
        });
      });
    });
  } else {
    // res.redirect('/login');
  }
});

router.get('/editprofile/:id', (req, res, next) => {
  console.log('----apieditprofile called');
  const userId = req.params.id;
  // const session = req.session;
  let query;
  if (userId) {
    query = DB.builder()
    .select()
    .from('users')
    .where('user_id = ?', userId)
    .toParam();
    DB.executeQuery(query, (error, results) => {
      if (error) {
        next(error);
        return;
      }
      const object = {
        results: results.rows[0],
      };
      console.log(object);
      res.end(JSON.stringify(object));
      // res.render('profilepictureupload', {
      //   results: results.rows,
      // });
    });
  }
});

router.post('/follow', (req, res) => {
// console.log('callledd', req.body.data.data);
  const userId = req.body.user_id;
  console.log('----apifollow called');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const id = req.body.followerId;
  console.log('followerid--->', id);
  console.log('user_id--->', userId);
  // const id = req.body.followerId;
  // const session = req.session;
  const query = DB.builder()
  .insert()
  .into('follower')
  .set('login_user_id', userId)
  .set('follower_id', id)
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      console.log(error);
    }

    // let object={
    //   results: results.rows[0],

    // }
    // console.log(object);
    res.send('API Follow called');
    // res.redirect('/welcome');
  });
});

router.post('/unfollow', (req, res) => {
  console.log('----api Unfollow called');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const id = req.body.followerId;
  const query = DB.builder()
  .delete()
  .from('follower')
  .where('follower_id = ?', id)
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      console.log(error);
    }
    res.send('API UnFollow called');
    // res.redirect('/profilechange');
  });
});

router.post('/profilepictureupload/:id', upload.single('photo'), (req, res, next) => {
  // console.log('request -----> ', req);
  console.log('####profilepictureupload API called');
  console.log('imgfile is ---> ', req.file);
  console.log('imgfilename is ---> ', req.file.filename);
  const user_id = req.params.id;
  const photo = req.file.filename;

  // const session = req.session;
  // let photo = req.file.filename;
  // // if (req.file) {
  // //   photo = req.file.filename;
  // // } else {
  // //   photo = '';
  // // }
  const query = DB.builder()
  .update()
  .table('users')
  .set('image', photo)
  .where('user_id = ?', user_id)
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      next(error);
      return;
    }
      res.send('image upload api called ');
  //   res.redirect('/profilechange');
  });
});

router.post('/editprofile/:id', (req, res) => {
  // const session = req.session;
  console.log('----api editprofile called');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const username = req.body.userdata.username;
  const email = req.body.userdata.email;
  const mobileno = req.body.userdata.mobilenumber;
  const userId = req.body.user_id;
  // let password = '';
  // if (req.body.confirmpassword !== '') {
  //   password = req.body.confirmpassword;
  // } else {
  //   password = req.body.password;
  // }
  const query = DB.builder()
  .update()
  .table('users')
  .set('username', username)
  .set('email', email)
  .set('mobilenumber', mobileno)
  // .set('password', password)
  .where('user_id = ?', userId)
  .toParam();
  DB.executeQuery(query, (error) => {
    if (error) {
      console.log(error);
    }
    res.send('Profile updated successfully');
    // res.redirect('/welcome');
  });
});

module.exports = router;
