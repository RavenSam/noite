extern crate dotenv;

use std::path;

pub mod models;
use crate::schema::*;
use diesel::prelude::*;
use dotenv::dotenv;
use models::{ NewNote, Note, NewFolder, Folder };
use std::env;
use diesel::sqlite::SqliteConnection;

// creates a new connection to the DB and returns reference
// pub fn establish_connection() -> SqliteConnection { 
//     // dotenv().ok();
//     // let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

//     let database_url = "./store.sqlite";

//     SqliteConnection::establish(&database_url)
//         .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
// }

pub fn establish_connection() -> SqliteConnection {
  dotenv().ok();

  let _dev = env::var("NOITE_DEV");

  match _dev {
    Ok(_dev) => {
      let database_url = &env::var("DATABASE_URL").unwrap();

      SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", &database_url))
    }
    Err(_) => {
      println!("no NOITE_DEV");

      let database_url = path::Path::new(&tauri::api::path::home_dir().unwrap())
        .join(".noite")
        .join("store.sqlite");

      let database_url = database_url.to_str().clone().unwrap();

      SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", &database_url))
    }
  }
}

// creates a new note
pub fn note_create(conn: &SqliteConnection, title: &str, body: &str, folder : Option<i32>) -> String {
    let mut connection = establish_connection();
    use notes::dsl::{ id };
    let new_note = NewNote { title, body, folder };
    diesel::insert_into(notes::table)
        .values(&new_note)
        .execute(&mut connection)
        .expect("Error creating new note");

    no_arg_sql_function!(last_insert_rowid, diesel::sql_types::Integer);
    let qid: i32 = diesel::select(last_insert_rowid).first(&mut connection).unwrap();
    let inserted_note = notes::dsl::notes
        .filter(id.eq(&qid))
        .first::<Note>(&mut connection)
        .expect("Note not found");

    let note_str = serde_json::to_string(&inserted_note).unwrap();
    note_str
}

// Get all notes
pub fn notes_list(conn: &SqliteConnection) -> String {
    let mut connection = establish_connection();
    let all_notes = notes::dsl::notes
        .load::<Note>(&mut connection)
        .expect("Expect loading notes");
    let serialized = serde_json::to_string(&all_notes).unwrap();
    serialized
}


pub fn update_note(conn: &SqliteConnection, qid: i32, new_title: &str, new_body: &str, new_words_count:&i32) -> String {
    let mut connection = establish_connection();
    use notes::dsl::{ id, title, body, words_count };

    notes::dsl::notes
        .filter(id.eq(&qid))
        .first::<Note>(&mut connection)
        .expect("Note not found");

    diesel::update(notes::dsl::notes.filter(id.eq(&qid)))
        .set((
            title.eq(new_title),
            body.eq(new_body),
            words_count.eq(new_words_count)
        ))
        .execute(&mut connection)
        .expect("Error updating");

    let updated = notes::dsl::notes
        .filter(id.eq(&qid))
        .first::<Note>(&mut connection)
        .expect("Note not found");

    serde_json::to_string(&updated).unwrap()
}


pub fn update_note_accent(conn: &SqliteConnection, qid: i32, new_accent_color: &str) -> String {
    let mut connection = establish_connection();
    use notes::dsl::{ id, accent_color };

    let updated = diesel::update(notes::dsl::notes.filter(id.eq(&qid)))
        .set((
            accent_color.eq(new_accent_color),
        ))
        .execute(&mut connection)
        .expect("Error updating accent color");

    serde_json::to_string(&updated).unwrap()
}


pub fn delete_note(conn: &SqliteConnection, qid: i32) {
    let mut connection = establish_connection();
    use notes::dsl::{ id };
    let t = notes::dsl::notes.filter(id.eq(&qid));
    diesel::delete(t)
        .execute(&mut connection)
        .expect("Error deleting note");
}

// *********************************************************************************
// creates a new note
pub fn create_folder(conn: &SqliteConnection, title: &str) -> String {
    let mut connection = establish_connection();
    
    use folders::dsl::{ id };
    let new_folder = NewFolder { title };
    diesel::insert_into(folders::table)
        .values(&new_folder)
        .execute(&mut connection)
        .expect("Error creating new folder");

    no_arg_sql_function!(last_insert_rowid, diesel::sql_types::Integer);
    let qid: i32 = diesel::select(last_insert_rowid).first(&mut connection).unwrap();
    let inserted_folder = folders::dsl::folders
        .filter(id.eq(&qid))
        .first::<Folder>(&mut connection)
        .expect("Folder not found");

    let folder_str = serde_json::to_string(&inserted_folder).unwrap();
    folder_str
}


// Get all folder
pub fn folders_list(conn: &SqliteConnection) -> String {
    let mut connection = establish_connection();

    let all_folders = folders::dsl::folders
        .load::<Folder>(&mut connection)
        .expect("Expect loading folders");
    let serialized = serde_json::to_string(&all_folders).unwrap();
    serialized
}

// Udate foolder -- title
pub fn update_folder(conn: &SqliteConnection, qid: i32, new_title: &str) -> String {
    let mut connection = establish_connection();
    use folders::dsl::{ id, title };

    folders::dsl::folders
        .filter(id.eq(&qid))
        .first::<Folder>(&mut connection)
        .expect("Folder not found");

    diesel::update(folders::dsl::folders.filter(id.eq(&qid)))
        .set((
            title.eq(new_title),
        ))
        .execute(&mut connection)
        .expect("Error updating");

    let updated = folders::dsl::folders
        .filter(id.eq(&qid))
        .first::<Folder>(&mut connection)
        .expect("Folder not found");

    serde_json::to_string(&updated).unwrap()
}

pub fn delete_folder(conn: &SqliteConnection, qid: i32) {
    let mut connection = establish_connection();

    use folders::dsl::{ id };
    let t = folders::dsl::folders.filter(id.eq(&qid));
    diesel::delete(t)
        .execute(&mut connection)
        .expect("Error deleting folder");
}