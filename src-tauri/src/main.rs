// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{env, fs, path};

#[macro_use]
extern crate diesel;

use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

pub mod cmd;
pub mod db;
pub mod schema;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("./migrations");

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

fn main() {
    init_config();

    let mut conn = db::establish_connection();

    conn.run_pending_migrations(MIGRATIONS)
        .expect("Error migrating");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            cmd::delete_note,
            cmd::notes_list,
            cmd::note_create,
            cmd::update_note,
            cmd::update_accent,
            cmd::create_folder,
            cmd::folders_list,
            cmd::update_folder,
            cmd::delete_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
