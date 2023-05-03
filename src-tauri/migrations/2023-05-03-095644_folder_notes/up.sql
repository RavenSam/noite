-- Your SQL goes here
CREATE TABLE folders (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  created_at timestamp  NOT NULL  DEFAULT current_timestamp,
  updated_at timestamp  NOT NULL  DEFAULT current_timestamp
);

CREATE TRIGGER tg_folders_updated_at
AFTER UPDATE
ON folders FOR EACH ROW
BEGIN
  UPDATE folders SET updated_at = current_timestamp
    WHERE id = old.id;
END;