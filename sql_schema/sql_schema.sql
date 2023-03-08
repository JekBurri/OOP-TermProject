create database devhouse;

CREATE TABLE user (
	id varchar(8) primary key not null,
    firstName varchar(20) not null,
    lastName varchar(20) not null,
    email varchar(40) not null unique,
    username varchar(20) not null
);

CREATE TABLE post (
	id varchar(10) primary key not null,
    message varchar(1020) not null,
    userId varchar(8) not null,
    createdAt date not null,
    likes int null,
    foreign key (userId) references user(id)
);

CREATE TABLE comment (
	id varchar(10) primary key not null,
    message varchar(1020) not null,
    userId varchar(8) not null,
    createdAt date not null,
    postId varchar(10) not null,
    foreign key (userId) references user(id),
    foreign key (postId) references post(id)
);