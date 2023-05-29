use tauri::command;

use crate::db;

#[command]
pub fn note_create(title: String, body: String, folder: Option<i32>) -> String {
    db::note_create(&title, &body, folder)
}

#[command]
pub fn notes_list() -> String {
    db::notes_list()
}

#[command]
pub fn update_note(id: i32, title: String, body: String, word_count: i32) -> String {
    db::update_note(id, &title, &body, &word_count)
}

#[command]
pub fn update_accent(id: i32, accent_color: String) -> String {
    db::update_note_accent(id, &accent_color)
}

#[command]
pub fn delete_note(id: i32) -> String {
    db::delete_note(id);
    String::from("")
}

// -------------------------------------------
// Folders Commands
#[command]
pub fn create_folder(title: String) -> String {
    db::create_folder(&title)
}

#[command]
pub fn folders_list() -> String {
    db::folders_list()
}

#[command]
pub fn update_folder(id: i32, title: String) -> String {
    db::update_folder(id, &title)
}

#[command]
pub fn delete_folder(id: i32) -> String {
    db::delete_folder(id);
    String::from("")
}
