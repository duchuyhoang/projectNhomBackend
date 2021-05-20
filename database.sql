create schema project_nhom CHARACTER SET utf8 COLLATE utf8_unicode_ci

CREATE Table user_account(
id INT(10) unsigned auto_increment primary KEY,
user_account_status tinyint,
email varchar(50) NOT NULL,
user_name varchar(50) NOT NULL,
permission tinyint
);


CREATE Table user_profile(
id_profile INT(10) unsigned auto_increment primary KEY,
id_user INT unsigned ,
phone varchar(20),
avatar varchar(255),
address varchar(255),
FOREIGN KEY(id_user) references user_account(id)
);

CREATE TABLE room_types(
id int unsigned auto_increment primary key,
type varchar(50)
);

CREATE TABLE room_images(
id_room int unsigned ,
link varchar(250),
foreign key(id_room) references room(id)
);


CREATE TABLE room (
id INT(10) unsigned auto_increment primary KEY,
capacity INT(5),
acreage INT(10),
overview varchar(255),
price float,
rent_or_sale tinyint,
longitude float,
latitude  float,
city varchar(50),
district varchar(50),
house_number varchar(10),
region varchar(30),
isShow boolean,
room_type int,
FOREIGN KEY(room_type) REFERENCES room_types(id)
);


CREATE TABLE admin(
id int unsigned auto_increment primary key,
email varchar(50) not null unique ,
name varchar(50),
phone varchar(20),
avatar varchar(255),
facebook_link varchar(255),
isActive boolean
);

CREATE TABLE facilities(
id int unsigned primary key,
name varchar(50)
);


CREATE TABLE facilities_in_room(
id_room int unsigned ,
id_facility int unsigned,
foreign key(id_room) references room(id),
foreign key(id_facility) references facilities(id)
);

CREATE TABLE review(
id_room int unsigned,
id_user int unsigned,
point float,
foreign key(id_room) references room(id),
foreign key(id_user) references user_account(id)
);

CREATE TABLE comments(
id_comment int unsigned auto_increment primary key ,
id_room int unsigned,
id_user int unsigned,
content varchar(255),
foreign key(id_room) references room(id),
foreign key(id_user) references user_account(id)
);


CREATE TABLE booking(
day_created timestamp not null,
day_come timestamp not null,
day_out timestamp not null,
id_room int unsigned,
id_user int unsigned,
deposit float not null,
foreign key(id_room) references room(id),
foreign key(id_user) references user_account(id)
);

CREATE TABLE current_user_in_room(
id_room int unsigned,
id_user int unsigned,
status tinyint default 1,
foreign key(id_room) references room(id),
foreign key(id_user) references user_account(id)
);

create table lease_update_user_history(
    id_lease int unsigned,
    id_user int unsigned,
    time timestamp not null,
foreign key(id_lease) references user_account(id),
foreign key(id_user) references user_account(id)
);

create table admin_update_user_status(
    id_admin int unsigned,
    id_user int unsigned,
    action_time timestamp not null,
foreign key(id_admin) references admin(id),
foreign key(id_user) references user_account(id)
);

create table user_promotion_request(
    id_admin int unsigned,
    id_user int unsigned,
    action_time timestamp not null,
	promotion_status tinyint default -1,
foreign key(id_admin) references admin(id),
foreign key(id_user) references user_account(id)
);