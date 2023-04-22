extern crate dotenv;

pub mod models;
use crate::schema::*;
use diesel::prelude::*;
use dotenv::dotenv;
use models::{NewNote, Note};
use std::env;

// creates a new connection to the DB and returns reference
pub fn establish_connection() -> SqliteConnection { 
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

// creates a new note
pub fn note_create(conn: &SqliteConnection, title: &str, body: &str) -> String {
    let new_note = NewNote { title, body };
    let note = diesel::insert_into(notes::table)
        .values(&new_note)
        .execute(conn)
        .expect("Error saving new post");
    let note_json  =serde_json::to_string(&note).unwrap();
    note_json
}

// Get all notes
pub fn notes_list(conn: &SqliteConnection) -> String {
    let all_notes = notes::dsl::notes
        .load::<Note>(conn)
        .expect("Expect loading posts");
    let serialized = serde_json::to_string(&all_notes).unwrap();
    serialized
}

// Get a single note
// pub fn get_note(conn: &SqliteConnection, id:&i32 ) -> String {
//     use notes::dsl::{ id };
//     let t = notes::dsl::notes.filter(id.eq(&qid));
//     let single_notes = notes::dsl::notes(id)
//         .load::<Note>(conn)
//         .expect("Expect loading posts");
//     let serialized = serde_json::to_string(&single_notes).unwrap();
//     serialized
// }


pub fn delete_note(conn: &SqliteConnection, qid: i32) {
    use notes::dsl::{ id };
    let t = notes::dsl::notes.filter(id.eq(&qid));
    diesel::delete(t)
        .execute(conn)
        .expect("error deleting note");
}