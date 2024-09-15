// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use std::time::Duration;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").expect("Failed to get main window");
            
            // Attempt to load the URL with retry logic
            let mut retry_count = 0;
            let max_retries = 3;
            
            while retry_count < max_retries {
                match reqwest::blocking::get("https://deadshot.io") {
                    Ok(_) => {
                        println!("Successfully connected to deadshot.io");
                        if let Err(e) = window.eval("window.location.href = 'https://deadshot.io'") {
                            eprintln!("Failed to set window location: {:?}", e);
                        }
                        break;
                    },
                    Err(e) => {
                        eprintln!("Failed to connect to deadshot.io (attempt {}): {:?}", retry_count + 1, e);
                        retry_count += 1;
                        std::thread::sleep(Duration::from_secs(2));
                    }
                }
            }

            if retry_count == max_retries {
                eprintln!("Failed to connect to deadshot.io after {} attempts", max_retries);
                if let Err(e) = window.eval("document.body.innerHTML = '<h1>Error</h1><p>Failed to connect to deadshot.io. Please check your internet connection and try again.</p>'") {
                    eprintln!("Failed to set error message: {:?}", e);
                }
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}