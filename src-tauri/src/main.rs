// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{sync::Mutex, env, fs, path};


#[macro_use]
extern crate diesel;
#[macro_use] 
extern crate diesel_migrations;

use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use diesel::prelude::*;
pub mod schema;
pub mod db;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");

#[tauri::command]
fn note_create(title: String, body: String, folder : Option<i32>, state: tauri::State<AppState>) -> String {
    let conn = state.conn.lock().unwrap();
    db::note_create(&conn, &title, &body, folder)
}


#[tauri::command]
fn notes_list(state: tauri::State<AppState>) -> String{
    let con = state.conn.lock().unwrap();
    db::notes_list(&con)
}


#[tauri::command]
fn update_note(id: i32, title: String, body: String, word_count:i32, state: tauri::State<AppState>) -> String{
    let conn = state.conn.lock().unwrap();
    db::update_note(&conn, id, &title, &body, &word_count)
}

#[tauri::command]
fn update_accent(id: i32, accent_color: String, state: tauri::State<AppState>) -> String{
    let conn = state.conn.lock().unwrap();
    db::update_note_accent(&conn, id, &accent_color)
}

#[tauri::command]
fn delete_note(id: i32, state: tauri::State<AppState>) -> String {
    let conn = state.conn.lock().unwrap();
    db::delete_note(&conn, id);
    String::from("")
}

// -------------------------------------------
// Folders Commands
#[tauri::command]
fn create_folder(title: String, state: tauri::State<AppState>) -> String {
    let conn = state.conn.lock().unwrap();
    db::create_folder(&conn, &title)
}

#[tauri::command]
fn folders_list(state: tauri::State<AppState>) -> String {
    let con = state.conn.lock().unwrap();
    db::folders_list(&con)
}

#[tauri::command]
fn update_folder(id: i32, title: String, state: tauri::State<AppState>) -> String{
    let conn = state.conn.lock().unwrap();
    db::update_folder(&conn, id, &title)
}

#[tauri::command]
fn delete_folder(id: i32, state: tauri::State<AppState>) -> String {
    let conn = state.conn.lock().unwrap();
    db::delete_folder(&conn, id);
    String::from("")
}


// #[derive(Debug, Serialize, Deserialize)]
// pub struct UserConfig {
//   pub threads: i32,
// }

// impl Default for UserConfig {
//     fn default() -> Self { todo!() }
// }

/// init use config
pub fn init_config() {
    let home_dir = tauri::api::path::home_dir();

    match home_dir {
      Some(home_dir) => {
        let app_config = path::Path::new(&home_dir);
        let app_config = app_config.join(".noite");

        println!("{:?}", app_config);
        fs::create_dir_all(app_config).unwrap();

        println!("{:?}", env::current_dir());
        println!("{:?}", env::current_exe());
      }
      None => (),
    }
}

struct AppState {
    conn: Mutex<SqliteConnection>,
}

fn main() {
    init_config();

    let mut conn = db::establish_connection();

    let state = AppState {
        conn: Mutex::new(db::establish_connection()),
    };

    // embedded_migrations::run(&conn);
    // diesel_migrations::run_pending_migrations(&conn).expect("Error migrating");
    conn
    .run_pending_migrations(MIGRATIONS)
    .expect("Error migrating");

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            delete_note, 
            notes_list, 
            note_create, 
            update_note, 
            update_accent, 
            create_folder, 
            folders_list,
            update_folder,
            delete_folder
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
