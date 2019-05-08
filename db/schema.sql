/* File: schema.sql */

CREATE DATABASE cat_diet_tracker_db;
USE cat_diet_tracker_db;

CREATE TABLE cats
(
	cat_id INT NOT NULL AUTO_INCREMENT,
	cat_name VARCHAR(64) NOT NULL,
	cat_starting_weight INT NOT NULL,
	cat_alert_flag BOOLEAN DEFAULT false,
	cat_notes VARCHAR(255),

	/* refactor below */	
	cat_location_id_fk INT NOT NULL,	/* used to link: 'location' with 'cat' details */

	/* probably a better design via lookup using cat_location_id_fk above */
	cat_location_room INT NOT NULL,
	cat_location_kennel INT NOT NULL,

	PRIMARY KEY (cat_id)
);

CREATE TABLE servers
(
	server_id INT NOT NULL AUTO_INCREMENT,
	server_username VARCHAR(64) NOT NULL,
	server_password VARCHAR(255) NOT NULL,
	server_name VARCHAR(64) NOT NULL,

	PRIMARY KEY (server_id)
);

CREATE TABLE locations
(
	location_id INT NOT NULL AUTO_INCREMENT,
	room_number INT NOT NULL,
	kennel_number INT NOT NULL,

	location_cat_id_fk INT NOT NULL, 	/* used to lookup: 'cat' by 'location' */
	PRIMARY KEY (location_id) 
);

CREATE TABLE meals
(
	meal_id INT NOT NULL AUTO_INCREMENT,
	meal_date_time DATETIME NOT NULL,

	meal_cat_id_fk INT NOT NULL,		/* used to lookup: 'cat' by 'meal' */
	meal_server_id_fk INT NOT NULL, 	/* used to lookup: 'server' by 'meal' */
	meal_location_id_fk INT NOT NULL, 	/* used to lookup: 'location' by 'meal' */
	PRIMARY KEY (meal_id)	
);

CREATE TABLE meal_contents
(
	meal_content_id INT NOT NULL AUTO_INCREMENT,
	meal_content_description VARCHAR(128) NOT NULL,
	meal_content_consumed INT NOT NULL,
	
	meal_id_fk INT NOT NULL,			/* used to link: 'meal' with 'meal_content' details */
	PRIMARY KEY (meal_content_id)
);

CREATE TABLE meal_content_items (
	meal_content_item_id INT NOT NULL AUTO_INCREMENT,
	meal_content_item_description VARCHAR(128) NOT NULL,

	PRIMARY KEY (meal_content_item_id)
);
