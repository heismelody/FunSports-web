CREATE TABLE user(	
user_id			int				NOT NULL  auto_increment,
email			varchar(20)		NOT NULL  UNIQUE ,
nick			varchar(20)		NOT NULL,
pw				varchar(32)		NOT NULL,
icon			varchar(20) ,
address			varchar(35) ,
weight			int,
height			int,
birthday		timestamp,
gender			char(2),
record_count	int 			NOT NULL	DEFAULT'0',
PRIMARY KEY 	(user_id)
);

CREATE TABLE admin(
admin_id		int				NOT NULL,
pw				varchar(32)		NOT NULL,
PRIMARY KEY		(admin_id)
);

CREATE TABLE route(
route_id		int				NOT NULL  auto_increment,
start_lat		numeric(10,7)	NOT NULL,
start_lng		numeric(10,7)	NOT NULL,
end_lat			numeric(10,7)	NOT NULL,
end_lng			numeric(10,7)	NOT NULL,
point_count		int				NOT NULL	DEFAULT'0',
PRIMARY KEY 	(route_id)
);

CREATE TABLE sports_record(
record_id		int				NOT NULL  auto_increment,
total_time		varchar(20)		NOT NULL	DEFAULT'0-0',
start_time		timestamp		NOT NULL,
end_time		timestamp		NOT NULL,
activity_type	varchar(20)		NOT NULL	DEFAULT'NULL',
total_length	int				NOT NULL	DEFAULT'0',
route_id		int				NOT NULL	DEFAULT'0',
PRIMARY KEY		(record_id),
FOREIGN KEY 	(route_id)		references	route(route_id)
);

CREATE TABLE route_point(
route_id		int 			NOT NULL,
point_id	   	int				NOT NULL  auto_increment,
lat				numeric(10,7)	NOT NULL,
lng				numeric(10,7)	NOT NULL,
PRIMARY KEY		(point_id),
FOREIGN KEY 	(route_id)		references	route(route_id)
);

CREATE TABLE user_record(
user_id			int				NOT NULL,
record_id		int				NOT NULL,
);

CREATE TABLE task(
task_id 		int 			NOT NULL  auto_increment,
task_name 		varchar(20)		NOT NULL	DEFAULT'NULL',
goal_type		varchar(10)		NOT NULL	DEFAULT'NULL',
goal_value		varchar(10)		NOT NULL	DEFAULT'0',
start_time		timestamp		NOT NULL,
end_time		timestamp		NOT NULL
);	

CREATE TABLE task_completion(
task_id 		int 			NOT NULL  auto_increment,
record_time		timestamp		NOT NULL,
completion_rate	varchar(10)		NOT NULL	DEFAULT'0',
finish_type	    varchar(10),
finish_time     timestamp,
PRIMARY KEY 	(task_id),
FOREIGN KEY 	(task_id)		references	task(task_id)
);

CREATE TABLE user_task(
user_id			int 			NOT NULL,
task_id			int,
PRIMARY KEY		(user_id),
FOREIGN KEY 	(task_id)		references	task(task_id)
);