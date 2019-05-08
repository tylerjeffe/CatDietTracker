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
	(1, "2019-05-04T06:00:00", 1, 1001, 101),
	(2, "2019-05-04T18:00:00", 1, 1001, 101),

	(3, "2019-05-05T06:00:00", 1, 1001, 101),
	(4, "2019-05-05T18:00:00", 1, 1001, 101),

	(5, "2019-05-06T06:00:00", 1, 1001, 101),
	(6, "2019-05-06T18:00:00", 1, 1001, 101),

	(7, "2019-05-07T06:00:00", 1, 1001, 101),
	(8, "2019-05-07T18:00:00", 1, 1001, 101),

	(9, "2019-05-08T06:00:00", 1, 1001, 101),
	(10, "2019-05-08T18:00:00", 1, 1001, 101),

	(11, "2019-05-09T06:00:00", 1, 1001, 101),
	(12, "2019-05-09T18:00:00", 1, 1001, 101),

	(13, "2019-05-10T06:00:00", 1, 1001, 101),
	(14, "2019-05-10T18:00:00", 1, 1001, 101),

	(15, "2019-05-11T06:00:00", 1, 1001, 101),
	(16, "2019-05-11T18:00:00", 1, 1001, 101),

	(17, "2019-05-12T06:00:00", 1, 1001, 101),
	(18, "2019-05-12T18:00:00", 1, 1001, 101);


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
	(1, "A1 - Premium", 4, 1),
	(2, "A2 - Generic", 2, 1),
	(3, "A3 - Premium", 3, 2),
	(4, "A4 - Generic", 3, 2),

	(5, "A5 - Premium", 3, 3),
	(6, "A6 - Premium", 3, 3),
	(7, "A7 - Premium", 3, 4),
	(8, "A8 - Premium", 3, 4),

	(9, "A9 - Premium", 3, 5),
	(10, "A10 - Premium", 3, 5),
	(11, "A11 - Premium", 3, 6),
	(12, "A12 - Premium", 3, 6),

	(13, "A13 - Premium", 3, 7),
	(14, "A14 - Premium", 3, 7),
	(15, "A15 - Premium", 3, 8),
	(16, "A16 - Premium", 3, 8),

	(17, "A17 - Premium", 3, 9),
	(18, "A18 - Premium", 3, 9),
	(19, "A19 - Premium", 3, 10),
	(20, "A20 - Premium", 3, 10),

	(21, "A21 - Premium", 3, 11),
	(22, "A22 - Premium", 3, 11),
	(23, "A23 - Premium", 3, 12),
	(24, "A24 - Premium", 3, 12),

	(25, "A25 - Premium", 3, 13),
	(26, "A26 - Premium", 3, 13),
	(27, "A27 - Premium", 3, 14),
	(28, "A28 - Premium", 3, 14),


	(29, "A29 - Premium", 3, 15),
	(30, "A30 - Premium", 3, 15),
	(31, "A31 - Premium", 3, 16),
	(32, "A32 - Premium", 3, 16),

	(33, "A33 - Premium", 3, 17),
	(34, "A34 - Premium", 3, 17),
	(35, "A35 - Premium", 3, 18),
	(36, "A36 - Premium", 3, 18);

/*
CREATE TABLE meal_content_items (
	meal_content_item_id INT NOT NULL AUTO_INCREMENT,
	meal_content_item_description VARCHAR(128) NOT NULL,

	PRIMARY KEY (meal_content_item_id)
);
*/

INSERT INTO meal_content_items
	(meal_content_item_id, meal_content_item_description)
VALUES 
	(1, "Friskies"),
	(2, "Purina"),
	(3, "Science Diet"),
	(4, "Wiskas");
	