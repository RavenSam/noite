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


-- Your SQL goes here
CREATE TABLE notes (
  id INTEGER NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  accent_color VARCHAR NOT NULL DEFAULT 'transparent',
  words_count INTEGER NOT NULL DEFAULT 0,
  favorited BOOLEAN NOT NULL DEFAULT 'f',
  created_at timestamp  NOT NULL  DEFAULT current_timestamp,
  updated_at timestamp  NOT NULL  DEFAULT current_timestamp,

  folder INT REFERENCES folders(id) ON DELETE CASCADE
);



CREATE TRIGGER tg_notes_updated_at
AFTER UPDATE
ON notes FOR EACH ROW
BEGIN
  UPDATE notes SET updated_at = current_timestamp
    WHERE id = old.id;
END;

-- CREATE TRIGGER tg_notes_delete_folder
-- BEFORE DELETE
-- ON folders FOR EACH ROW
-- BEGIN
--   delete from notes where folder=OLD.folder;
-- END;

