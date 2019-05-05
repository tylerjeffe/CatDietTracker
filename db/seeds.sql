### Seeds
/*
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
	(cat_name, cat_starting_weight, cat_alert_flag, cat_notes, cat_location_id_fk)
VALUES 	
	("Snowball", 9.2, false, "Awesome Cat", 101),
	("Duke", 9.2, false, "Awesome Cat", 102),
	("Fluffy", 9.2, false, "Awesome Cat", 103),
	("Oreo", 9.2, false, "Awesome Cat", 104),
	("Griffin", 10.3, false, "Awesome Cat", 105),
	("James", 10.3, false, "Awesome Cat", 106),
	("Hobie", 10.3, false, "Awesome Cat", 107),
	("Theo", 10.3, false, "Awesome Cat", 108);

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
 