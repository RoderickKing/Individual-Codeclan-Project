DROP TABLE locations;
DROP TABLE note;

CREATE TABLE locations
(id  SERIAL PRIMARY KEY,
  placename     VARCHAR(40),
  photo_notes VARCHAR(255),
  lat           DECIMAL(8,5),
  long          DECIMAL(8,5)
);

CREATE TABLE note (
id SERIAL PRIMARY KEY,
location_id       INTEGER,
general_notes VARCHAR(255)
);


INSERT INTO locations
(placename,photo_notes,lat,long)
values('Queensferry Bridge','Great for sunsets at high tide in the bay',56.01210,-3.40649);

INSERT INTO note
(location_id,general_notes)
values (1,'Ferry Hotel is a great place for a hot drink');

INSERT INTO note
(location_id,general_notes)
values (1,'Club meets here every Friday @6pm');


INSERT INTO locations
(placename,photo_notes,lat,long)
values('Calton Hill','Great for sunsets but better just after dark',55.95550,-3.1827);

INSERT INTO note
(location_id,general_notes)
values (2,'Can be very crowded for events');

INSERT INTO note
(location_id,general_notes)
values (2,'Starbucks coffee shop is 2 mins away');

INSERT INTO note
(location_id,general_notes)
values (2,'Coke etc can be obtained from Waverley mall');
