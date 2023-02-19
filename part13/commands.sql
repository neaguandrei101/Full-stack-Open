CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0
);

INSERT INTO blogs
(author, url, title)
VALUES
(NULL, 'localhost', 'MongoDB is webscale');

INSERT INTO blogs
(author, url, title, likes)
VALUES
('Andrei Neagu', 'localhost', 'My title', 1);