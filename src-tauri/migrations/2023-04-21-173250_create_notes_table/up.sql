-- Your SQL goes here
CREATE TABLE notes (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  accent_color TEXT NOT NULL DEFAULT 'transparent',
  words_count INTEGER NOT NULL DEFAULT 0,
  created_at timestamp  NOT NULL  DEFAULT current_timestamp,
  updated_at timestamp  NOT NULL  DEFAULT current_timestamp
);

CREATE TRIGGER tg_notes_updated_at
AFTER UPDATE
ON notes FOR EACH ROW
BEGIN
  UPDATE notes SET updated_at = current_timestamp
    WHERE id = old.id;
END;