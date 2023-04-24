-- Your SQL goes here
CREATE TABLE notes (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  excerpt VARCHAR,
  accent_color TEXT,
  words_count INTEGER DEFAULT 0,
  created_at timestamp  NOT NULL  DEFAULT current_timestamp,
  updated_at timestamp  NOT NULL  DEFAULT current_timestamp
);

CREATE TRIGGER tg_somethings_updated_at
AFTER UPDATE
ON notes FOR EACH ROW
BEGIN
  UPDATE somethings SET updated_at = current_timestamp
    WHERE id = old.id;
END;