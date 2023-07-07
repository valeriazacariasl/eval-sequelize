const db = require('../database/db.js');



let homeController = {
    mostrarhome: function (req, res) {
        if (req.session.loggedIn) {
            res.render('home', { name: req.session.name })
        } else {
            res.redirect('/')
        }
    },

    // sendForm: function (req, res) {
    //     const postContent = req.body.post;
    //     let postPhoto = null;
    //     if (req.file) {
    //       postPhoto = req.file.filename;
    //     }
    //     const userEmail = req.session.email;

    //     db.query(
    //       'CALL InsertPost(?, ?, ?)',
    //       [userEmail, postContent, postPhoto],
    //       (error, results) => {
    //         if (error) {
    //           console.log(error);
    //         } else {
    //           res.redirect('/home/post');
    //         }
    //       }
    //     );
    //   },

    sendForm: function (req, res) {
        const post = req.body.post;
        let photoName = null; // el valor inicial de photoName es null
        const userId = req.session.userId;

        if (!post) {
            res.render('home', { name: req.session.name });
            return;
          }


        if (req.file) { //si se adjunto una foto en el form se asigna el nombre del archivo de la foto
            photoName = req.file.filename;
        }

        db.query(
            'INSERT INTO post (id_user, post, photo, date) VALUES (?, ?, ?, NOW())', //consulta para insertar un nuevo registro
            [userId, post, photoName],
            (error, results) => {
                if (error) {
                    console.log(error); //si hay un error me d muestre error en consola
                } else {

                    res.redirect('/home/post');
                }
            })

    },
    postFromUser: function (req, res) {
        if (req.session.loggedIn) {

            const userEmail = req.session.email; //obtengo el mail del usuario
            console.log(userEmail);
            db.query(
                'SELECT post.id, post.id_user, post.post, post.photo, post.date, users.name FROM post INNER JOIN users ON post.id_user = users.id WHERE users.email = ?',
                [userEmail], //consulta para traer los post asociados al usuario
                (error, results) => {
                    if (error) {
                        console.log(error);

                    } else {
                        res.render('post', { posts: results }); //guardo el resultado de la consulta en posts

                    }
                }
            );
        } else {
            console.log('Usuario no logueado');
            res.redirect('/');
        }
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
        const id = req.params.id; //tomo el id del parametro
        console.log(req.body);
        console.log(id);
        //AL HACER CLICK LLAMA ESTE CONTROLADOR
        const query = `UPDATE post SET post = "${req.body.post}" WHERE id = ${id}`; //guardo mi consulta de actualizacion dentro de query

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
    showEditView: function (req, res) {
        const { id } = req.params;
        const idPost = req.body.id;
        console.log(idPost);
        console.log(id);
        db.query(
            'SELECT * FROM post WHERE id = ?',
            [id],
            (error, results) => {
                console.log(results);
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

