/*
### Seeds

CREATE TABLE cats
(
	cat_id INT NOT NULL AUTO_INCREMENT,
	cat_name VARCHAR(64) NOT NULL,
	cat_starting_weight INT NOT NULL,
	cat_alert_flag BOOLEAN DEFAULT false,
	cat_notes VARCHAR(255),
	
	cat_location_id_fk INT NOT NULL,
	PRIMARY KEY (cat_id)
);
*/

INSERT INTO cats 
	(cat_name, cat_starting_weight, cat_alert_flag, cat_notes, cat_location_id_fk, cat_location_room, cat_location_kennel)
VALUES 	

	("Snowball", 9.2, false, "Awesome Cat", 101, 1, 1),
	("Duke", 9.2, false, "Awesome Cat", 102, 1, 2),
	("Fluffy", 9.2, false, "Awesome Cat", 103, 1,3),
	("Oreo", 9.2, false, "Awesome Cat", 104, 1, 4),
	("Griffin", 10.3, false, "Awesome Cat", 105, 1, 5),
	("James", 10.3, false, "Awesome Cat", 106, 1, 6),
	("Hobie", 10.3, false, "Awesome Cat", 107, 1, 7),
	("Theo", 10.3, false, "Awesome Cat", 108, 1, 8);

/*	
CREATE TABLE locations
(
	location_id INT NOT NULL AUTO_INCREMENT,
	room_number INT NOT NULL,
	kennel_number INT NOT NULL,

	location_cat_id_fk INT NOT NULL,
	PRIMARY KEY (location_id) 
);
*/

INSERT INTO locations
	(location_id, room_number, kennel_number, location_cat_id_fk)
VALUES 
	(101, 1, 1, 1),
	(102, 1, 2, 2),
	(103, 1, 3, 3),
	(104, 1, 4, 4),
	(105, 1, 5, 5),
	(106, 1, 6, 6),
	(107, 1, 7, 7),
	(108, 1, 8, 8);

-- notes
	-- residency date/time data based on served - consumed 'meals' 
	-- update cat_starting_weight to DECIMAL datatype
 
 /*
 CREATE TABLE meals
(
	meal_id INT NOT NULL AUTO_INCREMENT,
	meal_date_time DATETIME NOT NULL,

	meal_cat_id_fk INT NOT NULL,		 used to lookup: 'cat' by 'meal' 
	meal_server_id_fk INT NOT NULL,		 used to lookup: 'server' by 'meal' 
	meal_location_id_fk INT NOT NULL, 	 used to lookup: 'location' by 'meal' 
	PRIMARY KEY (meal_id)	
);
*/

INSERT INTO meals
	(meal_id, meal_date_time, meal_cat_id_fk, meal_server_id_fk, meal_location_id_fk)
VALUES 
	(1, "2019-04-28T06:00:00", 1, 1001, 101),
	(2, "2019-04-28T18:00:00", 1, 1001, 101),
	(3, "2019-05-01T06:00:00", 1, 1001, 101),
	(4, "2019-05-01T18:00:00", 1, 1001, 101);


/*
CREATE TABLE meal_contents
(
	meal_content_id INT NOT NULL AUTO_INCREMENT,
	meal_content_description VARCHAR(128) NOT NULL,
	meal_content_consumed INT NOT NULL,
	
	meal_id_fk INT NOT NULL,			 used to link: 'meal' with 'meal_content' details 
	PRIMARY KEY (meal_content_id)
);
 */

INSERT INTO meal_contents
	(meal_content_id, meal_content_description, meal_content_consumed, meal_id_fk)
VALUES 
	(1, "Wet Food - Premium", 4, 1),
	(2, "Dry Food - Generic", 2, 2),
	(3, "Wet Food - Generic", 3, 3),
	(4, "Dry Food - Premium", 3, 4);

