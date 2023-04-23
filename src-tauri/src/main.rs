// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{sync::Mutex};

#[macro_use]
extern crate diesel;
#[macro_use] 
extern crate diesel_migrations;
embed_migrations!("./migrations/");

use diesel::prelude::*;
pub mod schema;
pub mod db;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command


#[tauri::command]
fn note_create(title: String, body: String, state: tauri::State<AppState>) -> String {
    let conn = state.conn.lock().unwrap();
    db::note_create(&conn, &title, &body).to_string()
}


#[tauri::command]
fn notes_list(state: tauri::State<AppState>) -> String{
    let con = state.conn.lock().unwrap();
    db::notes_list(&con)
}

#[tauri::command]
fn update_note(id: i32, title: String, body: String, state: tauri::State<AppState>) -> String{
    let conn = state.conn.lock().unwrap();
    db::update_note(&conn, id, &title, &body)
}

#[tauri::command]
fn delete_note(id: i32, state: tauri::State<AppState>) -> String {
    let conn = state.conn.lock().unwrap();
    db::delete_note(&conn, id);
    String::from("")
}


struct AppState {
    conn: Mutex<SqliteConnection>,
}

fn main() {
    let conn = db::establish_connection();
    let state = AppState {
        conn: Mutex::new(db::establish_connection()),
    };

    // embedded_migrations::run(&conn);
    diesel_migrations::run_pending_migrations(&conn).expect("Error migrating");

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![delete_note, notes_list, note_create, update_note])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
