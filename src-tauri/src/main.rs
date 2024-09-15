// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
    .setup(|app| {
        let window = app.get_window("main").unwrap();
        if let Err(e) = window.eval("window.location.replace('./index.html')") {
            eprintln!("Failed to load URL: {}", e);
        }
        Ok(())
      })
      .run(tauri::generate_context!())
      .expect("error running tauri app");
}
