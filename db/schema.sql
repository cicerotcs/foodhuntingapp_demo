CREATE DATABASE foodhuntingapp;

CREATE TABLE dishes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    img_url TEXT
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100)
)

INSERT INTO dishes(title,img_url) VALUES('Funfetti Cake', 'https://preppykitchen.com/wp-content/uploads/2018/04/Funfetti-cake-recipe-new.jpg');
INSERT INTO dishes(title,img_url) VALUES('Birthday Cake', 'https://cdn.shopify.com/s/files/1/0362/1653/articles/Birthday_Cake_Square_5_1600x.jpg?v=1566642810');