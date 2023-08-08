
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- PROJECTS TABLE

CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(120) NOT NULL,
  "comments" TEXT NOT NULL,
  "status"  BOOLEAN,
  "share" TEXT NOT NULL,
  "coverImage" VARCHAR(120) NOT NULL,
  "user_id" INT REFERENCES "user"
);

-- IMAGES TABLE

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80) NOT NULL,
  "url" TEXT NOT NULL
);
-- JUNCTION TABLE

CREATE TABLE "projects_images" (
  "id" SERIAL PRIMARY KEY,
  "project_id" INT REFERENCES "projects" NOT NULL,
  "image_id" INT REFERENCES "images" NOT NULL
);

-- SQL text to join tables

 `SELECT images.id FROM projects 
  JOIN projects_images ON projects.id = projects_images.project_id
  JOIN  images ON images.id = projects_images.images_id
  WHERE projects.id = $1;`

--------[ DATA! ]---------

--starter project--
INSERT INTO "projects" ("title", "comments", "status", "share", "coverImage")
VALUES
('Rey Mono', 'this is a monkey sticker', 'false', 'link', 'mico1.png');

--starter images from project--
INSERT INTO "images" ("name", "url")
VALUES
('outline mono', 'mico1.png'),
('black and white mono', 'mico2.png'),
('final mono', 'mico3.png');
