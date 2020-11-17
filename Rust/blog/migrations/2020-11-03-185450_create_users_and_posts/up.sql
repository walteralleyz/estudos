-- Your SQL goes here

CREATE TABLE busers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE bposts (
  id SERIAL PRIMARY KEY,
  buser_id INTEGER NOT NULL,
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT 'f'
);
