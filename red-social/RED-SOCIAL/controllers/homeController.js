const db = require('../database/db.js');
const bcrypt = require('bcrypt');
let session = require('express-session')

let homeController = {
    mostrarhome: function (req, res) {
        if (req.session.loggedIn) {
            res.render('home', {
                loggedIn: true,
                name: req.session.name
            })
        } else {
            res.redirect('/')
        }
    },
    sendForm: function (req, res) {
        const post = req.body.post;
        let photoName = null; // Establece el valor inicial de photoName como null

        if (req.file) {
            photoName = req.file.filename;
        }
    
        db.query(
            'INSERT INTO post (post, photo, date) VALUES (?, ?, NOW())',
            [post, photoName], //le paso el valor de hashing para que lo guarde de forma encripatada
            (error, results) => {
                if (error) {
                    console.log(error); //si hay un error me d muestre error en consola
                } else {
                   
                    res.redirect('/home/post');
                }
            })
        

    },
    postFromUser: function (req, res) {

        db.query(
            'SELECT * FROM post',
            (error, results) => {
                console.log(results);
                if (error) {
                    console.log(error); //si hay un error me d muestre error en consola
                } else {
                    res.render('post', { posts: results })
                }
            }
        )

    },
    deletePostUser: function (req, res) {
        const id = req.params.id;
        db.query(
            'DELETE FROM post WHERE id = ? ',
            [id],
            (error, results) => {
                if (error) {
                    console.log(error); //si hay un error me d muestre error en consola
                } else {
                    res.redirect('/home/post')
                }
            }
        )
    },
    updatePostUser: function (req, res) {
          const id = req.params.id;
          console.log(req.body);
          console.log(id);
            //AL HACER CLICK LLAMA ESTE CONTROLADOR
          const query = `UPDATE post SET post = "${req.body.post}" WHERE id = ${id}`;

           db.query(
              query,
              (error, results) => {
                  if (error) {
                      console.log(error); //si hay un error me d muestre error en consola
                  } else {                    
                      res.redirect('/home/post')
                  }
              }
          )
        },
        showEditView: function(req, res) {
            const { id } = req.params;
            db.query(
                'SELECT * FROM post WHERE id = ?',
                [id],
                (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.render('edit', { id: id, post: results[0] });
                    }
                }
            );
        }
        
      
}

    

module.exports = homeController

// showEditView: function(req, res) {
//     const { id } = req.params;

//     console.log(id);
//     res.render('edit', {id:id})
//   }
  

// updatePostUser: function (req, res) {
//   const id = req.params.id;
//   console.log(id);
//    db.query(
//       'SELECT * FROM post WHERE id = ?',
//       [id],
//       (error, results) => {
//           if (error) {
//               console.log(error); //si hay un error me d muestre error en consola
//           } else {
             
//               res.render('edit', {post: results[0]})
//           }
  
//       }
//   )
// }

// postFromUser: function (req, res) {

//     db.query(
//         'SELECT * FROM post',
//         (error, results) => {
//             console.log(results);
//             if (error) {
//                 console.log(error); //si hay un error me d muestre error en consola
//             } else {
//                 res.render('post', { posts: results })
//             }
//         }
//     )

// },
// deletePostUser: function (req, res) {
//     const id = req.params.id;
//     db.query(
//         'DELETE FROM post WHERE id = ? ',
//         [id],
//         (error, results) => {
//             if (error) {
//                 console.log(error); //si hay un error me d muestre error en consola
//             } else {
//                 res.redirect('/home/post')
//             }
//         }
//     )
// }