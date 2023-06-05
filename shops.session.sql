CREATE TABLE user(
    id SERIAL PRIMARY KEY,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255)NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

CREATE TABLE shop(
    id SERIAL PRIMARY KEY,
    shop_name varchar(255) UNIQUE,
    description TEXT,
    location varchar(255),
    phone_number INTEGER,
    email_address varchar(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)



CREATE TABLE shop_image(
    id SERIAL PRIMARY KEY,
    url varchar(255) UNIQUE,
    shop_id INTEGER,
    FOREIGN KEY (shop_id) REFERENCES shop(id)
)

CREATE TABLE review(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    shop_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (shop_id) REFERENCES shop(id),
)

CREATE TABLE review_image(
    id SERIAL PRIMARY KEY,
    url varchar(255) UNIQUE,
    review_id INTEGER,
    FOREIGN KEY (review_id) REFERENCES review(id)
)

CREATE TABLE comment(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    review_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (review_id) REFERENCES review(id)
)

CREATE TABLE rating(
    id SERIAL PRIMARY KEY,
    rating INTEGER,
    user_id INTEGER,
    shop_id INTEGER,
    review_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (shop_id) REFERENCES shop(id)
)



SELECT * FROM user;
SELECT * FROM shop;
SELECT * FROM review;
SELECT * FROM comment;
SELECT * FROM rating;

INSERT into shop(id, 
shop_name, 
description, 
location_id,  
category, 
phone_number, 
email_address, 
opening_hours)
VALUES (1, 
'Bobs Paradise',
'We at Bobs Paradise set out to find and provide awesome goods and services for Bob and other furry friends that you won’t find in other regular pet shops.',
1, 
'Pet groomer',
25292544,
NULL,
'11:00 - 20:00');

INSERT into location(
    id,
    destrict,
    address
)VALUES(
    1, 
    'Central',
    'G/F, 2 Elgin Street, Central, Hong Kong'
);
INSERT into users(
    id,
    username,
    email,
    password,
)VALUES(
    1, 
    'janet',
    'janetsoong.0124@gmail.com',
    '12345'
);

