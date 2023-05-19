extern crate dotenv;

pub mod models;
use crate::schema::*;
use diesel::prelude::*;
use dotenv::dotenv;
use models::{ NewNote, Note, NewFolder, Folder };
use std::env;

// creates a new connection to the DB and returns reference
pub fn establish_connection() -> SqliteConnection { 
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

// creates a new note
pub fn note_create(conn: &SqliteConnection, title: &str, body: &str, folder : Option<i32>) -> String {
    use notes::dsl::{ id };
    let new_note = NewNote { title, body, folder };
    diesel::insert_into(notes::table)
        .values(&new_note)
        .execute(conn)
        .expect("Error creating new note");

    no_arg_sql_function!(last_insert_rowid, diesel::sql_types::Integer);
    let qid: i32 = diesel::select(last_insert_rowid).first(conn).unwrap();
    let inserted_note = notes::dsl::notes
        .filter(id.eq(&qid))
        .first::<Note>(conn)
        .expect("Note not found");

    let note_str = serde_json::to_string(&inserted_note).unwrap();
    note_str
}

// Get all notes
pub fn notes_list(conn: &SqliteConnection) -> String {
    let all_notes = notes::dsl::notes
        .load::<Note>(conn)
        .expect("Expect loading notes");
    let serialized = serde_json::to_string(&all_notes).unwrap();
    serialized
}


pub fn update_note(conn: &SqliteConnection, qid: i32, new_title: &str, new_body: &str) -> String {
    use notes::dsl::{ id, title, body };

    notes::dsl::notes
        .filter(id.eq(&qid))
        .first::<Note>(conn)
        .expect("Note not found");

    diesel::update(notes::dsl::notes.filter(id.eq(&qid)))
        .set((
            title.eq(new_title),
            body.eq(new_body),
        ))
        .execute(conn)
        .expect("Error updating");

    let updated = notes::dsl::notes
        .filter(id.eq(&qid))
        .first::<Note>(conn)
        .expect("Note not found");

    serde_json::to_string(&updated).unwrap()
}


pub fn update_note_accent(conn: &SqliteConnection, qid: i32, new_accent_color: &str) -> String {
    use notes::dsl::{ id, accent_color };

    let updated = diesel::update(notes::dsl::notes.filter(id.eq(&qid)))
        .set((
            accent_color.eq(new_accent_color),
        ))
        .execute(conn)
        .expect("Error updating accent color");

    serde_json::to_string(&updated).unwrap()
}


pub fn delete_note(conn: &SqliteConnection, qid: i32) {
    use notes::dsl::{ id };
    let t = notes::dsl::notes.filter(id.eq(&qid));
    diesel::delete(t)
        .execute(conn)
        .expect("Error deleting note");
}

// *********************************************************************************
// creates a new note
pub fn create_folder(conn: &SqliteConnection, title: &str) -> String {
    use folders::dsl::{ id };
    let new_folder = NewFolder { title };
    diesel::insert_into(folders::table)
        .values(&new_folder)
        .execute(conn)
        .expect("Error creating new folder");

    no_arg_sql_function!(last_insert_rowid, diesel::sql_types::Integer);
    let qid: i32 = diesel::select(last_insert_rowid).first(conn).unwrap();
    let inserted_folder = folders::dsl::folders
        .filter(id.eq(&qid))
        .first::<Folder>(conn)
        .expect("Folder not found");

    let folder_str = serde_json::to_string(&inserted_folder).unwrap();
    folder_str
}


// Get all folder
pub fn folders_list(conn: &SqliteConnection) -> String {
    let all_folders = folders::dsl::folders
        .load::<Folder>(conn)
        .expect("Expect loading folders");
    let serialized = serde_json::to_string(&all_folders).unwrap();
    serialized
}

// Udate foolder -- title
pub fn update_folder(conn: &SqliteConnection, qid: i32, new_title: &str) -> String {
    use folders::dsl::{ id, title };

    folders::dsl::folders
        .filter(id.eq(&qid))
        .first::<Folder>(conn)
        .expect("Folder not found");

    diesel::update(folders::dsl::folders.filter(id.eq(&qid)))
        .set((
            title.eq(new_title),
        ))
        .execute(conn)
        .expect("Error updating");

    let updated = folders::dsl::folders
        .filter(id.eq(&qid))
        .first::<Folder>(conn)
        .expect("Folder not found");

    serde_json::to_string(&updated).unwrap()
}

pub fn delete_folder(conn: &SqliteConnection, qid: i32) {
    use folders::dsl::{ id };
    let t = folders::dsl::folders.filter(id.eq(&qid));
    diesel::delete(t)
        .execute(conn)
        .expect("Error deleting folder");
}