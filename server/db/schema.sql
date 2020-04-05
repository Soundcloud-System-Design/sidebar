CREATE DATABASE sidebar;

use sidebar;

create table likedsongs
(
  id int not null
  auto_increment,
  song_name varchar
  (40) not null,
  artist_name varchar
  (25) not null,
  plays int,
  likes int,
  reposts int,
  comments int,
  album_art text,
  location text,
  artist_pic text,
  primary key
  (id)
);

  create table artist
  (
    id int not null
    auto_increment,
  name varchar
    (25) not null,
  track_count int not null,
  follower_count int not null,
  following_count int not null,
  links varchar
    (255),
  about text,
  liked_songs int not null,
  primary key
    (id)
);
