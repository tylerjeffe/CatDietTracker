### Schema

CREATE DATABASE cat_diet_tracker_db;
USE cat_diet_tracker_db;

CREATE TABLE cats
(
	cat_id INT NOT NULL AUTO_INCREMENT,
	cat_name VARCHAR(64) NOT NULL,
	cat_starting_weight INT NOT NULL,
	cat_alert_flag BOOLEAN DEFAULT false,
	cat_notes VARCHAR(255),
	PRIMARY KEY (cat_id)
);

CREATE TABLE servers
(
	server_id INT NOT NULL AUTO_INCREMENT,
	server_name VARCHAR(64) NOT NULL,
	PRIMARY KEY (server_id)
);

CREATE TABLE locations
(
	location_id INT NOT NULL AUTO_INCREMENT,
	kennel_name VARCHAR(64) NOT NULL,
	room_number INT NOT NULL,
	PRIMARY KEY (location_id) 
);

CREATE TABLE meals
(
	meal_id INT NOT NULL AUTO_INCREMENT,
	date_time_stamp DATETIME NOT NULL,

	cat_id_fk INT NOT NULL,
	server_id_fk INT NOT NULL,
	location_id_fk INT NOT NULL,
	PRIMARY KEY (meal_id)	
);

CREATE TABLE meal_contents
(
	meal_content_id INT NOT NULL AUTO_INCREMENT,
	meal_content_description VARCHAR(128) NOT NULL,

	meal_id_fk INT NOT NULL,
	PRIMARY KEY (meal_content_id)
);
