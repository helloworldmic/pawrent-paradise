CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username varchar(255),
    password varchar(255),
    email varchar (255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE TABLE districts(
    id SERIAL PRIMARY KEY,
    district VARCHAR(255)
);
CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    image VARCHAR(255),
    shop_id INTEGER
);
CREATE TABLE shops(
    id SERIAL PRIMARY KEY,
    shop_name varchar(255),
    description TEXT,
    district_id INTEGER,
    FOREIGN KEY (district_id) REFERENCES districts(id),
    address VARCHAR(255),
    district TEXT,
    -- image_id INTEGER,
    -- FOREIGN KEY (image_id) REFERENCES images(id),
    category varchar(255),
    phone_number INTEGER,
    email_address varchar(255),
    opening_hours varchar(255),
    price_range varchar(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    shop_id INTEGER,
    review_text TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);
CREATE TABLE review_images(
    id SERIAL PRIMARY KEY,
    url varchar(255) UNIQUE,
    review_id INTEGER,
    foreign key (review_id) references reviews(id)
);
CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    review_id INTEGER,
    comment_text text,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);
CREATE TABLE comment_images(
    id SERIAL PRIMARY KEY,
    url varchar(255) UNIQUE,
    comment_id INTEGER,
    foreign key (comment_id) references comments(id)
);
CREATE TABLE like_dislike_count(
    id serial primary key,
    like_dislike BOOLEAN,
    review_id INTEGER,
    user_id INTEGER,
    shop_id INTEGER,
    foreign key (review_id) references reviews(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);
CREATE TABLE ratings(
    id SERIAL PRIMARY KEY,
    rating INTEGER,
    user_id INTEGER,
    shop_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);
insert into users(username, password)
values ('alvin', 1234);
insert into users(username, password)
values ('mich', 5678);
insert into users(username, password)
values ('janet', 5678);


-- insert rating
INSERT INTO ratings (rating,user_id,shop_id) values (1,(select id from users where username = 'alvin'),(select id from shops WHERE shop_name = 'Honey Pet Shop'));
INSERT INTO ratings (rating,user_id,shop_id) values (1,(select id from users where username = 'mich'),(select id from shops WHERE shop_name = 'Honey Pet Shop'));
INSERT INTO ratings (rating,user_id,shop_id) values (5,(select id from users where username = 'janet'),(select id from shops WHERE shop_name = 'Honey Pet Shop'));
-- caculate avg rating
SELECT shop_id,AVG(rating) from ratings GROUP BY shop_id;
SELECT *
from users;
select * from ratings;
-- SELECT *
-- from districts;
SELECT *
from shops;

-- SELECT *
-- from images;
-- ALTER TABLE images
-- ADD COLUMN shop_id integer;
insert into images(image)
VALUES ('images.jpeg');
insert into districts(district)
values ('Tai Po');
insert into districts(district)
values ('Shatin');
insert into districts(district)
values ('Central');
insert into districts(district)
values ('Tsuen Wan');
insert into districts(district)
values ('Mong Kok'),
    ('Causeway Bay');

SELECT * from shops;
insert into shops(
        shop_name,
        description,
        district,
        address,
        category,
        phone_number,
        email_address,
        opening_hours,
        price_range
    )
values (
        'Mega Pet',
        'Services include nail trimming, eyes and ears cleaning, and fur conditioning. Poodle owners will be pleased to know that there is a special leg hair-shaping service catering specifically for your pooch - ensuring that thick, wavy coat is cut into a manageable shape.',
        'Ho Man Tin',
        'G/F, Peace Avenue',
        'Pet groomer',
        '26260406',
        null,
        '10:30 - 19:30',
        '300-499'
    );
insert into shops(
        shop_name,
        description,
        district,
        address,
        category,
        phone_number,
        email_address,
        opening_hours,
        price_range
    )
values (
        'Dogotel & SPA',
        'Offers attentive care for all doggy guests with five-star boarding, doggy daycare, pampering services, organic meals, and play sessions. All dogs must be fully vaccinated prior to boarding.',
        'Mong Kok',
        '124E Argyle Street',
        'Pet groomer',
        '27110019',
        null,
        '10:30 - 19:30',
        '300-499'
    );
insert into shops(
        shop_name,
        description,
        district,
        address,
        category,
        phone_number,
        email_address,
        opening_hours,
        price_range
    )
values (
        'Bobs Paradise',
        'We at Bobs Paradise set out to find and provide awesome goods and services for Bob and other furry friends that you won’t find in other regular pet shops.',
        'Central',
        'G/F, 2 Elgin Street, Central, Hong Kong',
        'Pet groomer',
        '25292544',
        null,
        '11:00-20:00',
        '300-400'
    );
insert into shops(
        shop_name,
        description,
        district,
        address,
        category,
        phone_number,
        email_address,
        opening_hours,
        price_range
    )
values (
        'JacksPetGroomingShop',
        '新界荃灣荃景圍208號荃德花園10A 地舖 📞點擊即可Signal, WHATSAPP我哋預約啦 : https://api.whatsapp.com/send?phone=85252862990',
        'Tsuen Wan',
        '新界荃灣荃景圍208號荃德花園10A 地舖',
        'Pet groomer',
        '52862990',
        null,
        '11:00-18:00',
        '300-400'
    );
insert into shops(
        shop_name,
        description,
        district,
        address,
        category,
        phone_number,
        email_address,
        opening_hours,
        price_range
    )
values (
        'Hot Tails Salon',
        'Want the best for your dog? Hot Tails Salon is where you ought to be.',
        'Happy Valley',
        '1/F, 1 Sing Woo Road, Happy Valley, Hong Kong',
        'Pet groomer',
        '28922226',
        'htsgrace@gmail.com',
        '10:30 - 19:30',
        '300-350'
    );
insert into shops(
        shop_name,
        description,
        district,
        address,
        category,
        phone_number,
        email_address,
        opening_hours,
        price_range
    )
values (
        'Paw Palace',
        'Paw Palace... a Holistic Wellness Retreat for your Pampered Pet!',
        'Causeway Bay',
        'Unit 4A, Po Foo Building, 1 Foo Ming St, Causeway Bay, Hong Kong',
        'Pet groomer',
        '25767999',
        'pawpalace@gmail.com',
        '10:00 - 21:00',
        '300-350'
    );
insert into shops(
        shop_name,
        description,
        district,
        address,
        category,
        phone_number,
        email_address,
        opening_hours,
        price_range
    )
values (
        'Whiskers N Paws',
        'Welcome to Whiskers N Paws!',
        'Ap Lei Chau',
        '10/F, Horizon Plaza, 2 Lee Wing Street',
        'Pet groomer',
        '28922226',
        'htsgrace@gmail.com',
        '10:30 - 19:30',
        '300-353'
    );
insert into shops(
        shop_name,
        description,
        district,
        address,
        category,
        phone_number,
        email_address,
        opening_hours,
        price_range
    )
values (
        'Honey Pet Shop',
        'With 30 years experiences we offer the best',
        'Aberdeen',
        'Abba Commercial Building No.223-227 Aberdeen Main Rd Aberdeen',
        'Pet groomer',
        '25180022',
        null,
        '10:30 - 19:30',
        '300-499'
    );


select * from reviews;
SELECT * from shops;
