CREATE DATABASE red_social;

USE red_social;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR (100),
    name VARCHAR (100),
    lastname VARCHAR (100),
    password VARCHAR(200)
);

CREATE TABLE post (
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    post VARCHAR(240),
    photo VARCHAR(150),
    date TIME,
    FOREIGN KEY (id_user) REFERENCES users (id)
);
 



