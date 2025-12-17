use std::env;
use std::fs;
use std::io;
use std::path::{Path, PathBuf};

/// Limpia recursivamente todos los archivos y carpetas
/// contenidos dentro de una carpeta dada
fn limpiar_contenido_de_carpeta(ruta_carpeta: &Path) {
    println!("\n🧹 Limpiando carpeta: {}", ruta_carpeta.display());

    let elementos_del_directorio = match fs::read_dir(ruta_carpeta) {
        Ok(elementos) => elementos,
        Err(_) => {
            println!("✖ No se pudo acceder a la carpeta: {}", ruta_carpeta.display());
            return;
        }
    };

    for elemento in elementos_del_directorio {
        let elemento = match elemento {
            Ok(e) => e,
            Err(_) => continue,
        };

        let ruta_elemento = elemento.path();

        let metadatos_elemento = match fs::metadata(&ruta_elemento) {
            Ok(metadatos) => metadatos,
            Err(_) => {
                println!("⚠️ Omitido (no se pudieron leer metadatos): {}", ruta_elemento.display());
                continue;
            }
        };

        if metadatos_elemento.is_dir() {
            // Si el elemento es una carpeta, limpiarla primero
            limpiar_contenido_de_carpeta(&ruta_elemento);

            match fs::remove_dir_all(&ruta_elemento) {
                Ok(_) => println!("📂 Carpeta eliminada: {}", ruta_elemento.display()),
                Err(_) => println!("⚠️ Carpeta omitida (bloqueada): {}", ruta_elemento.display()),
            }
        } else {
            // Si el elemento es un archivo, eliminarlo
            match fs::remove_file(&ruta_elemento) {
                Ok(_) => println!("📄 Archivo eliminado: {}", ruta_elemento.display()),
                Err(_) => println!("⚠️ Archivo omitido (bloqueado): {}", ruta_elemento.display()),
            }
        }
    }

    println!("✔ Limpieza finalizada para: {}", ruta_carpeta.display());
}

/// Obtiene las rutas temporales importantes del sistema Windows
fn obtener_rutas_temporales_de_windows()
    -> (Option<PathBuf>, Option<PathBuf>, Option<PathBuf>)
{
    let ruta_temp_del_usuario = env::var_os("TEMP")
        .or_else(|| env::var_os("TMP"))
        .map(PathBuf::from);

    if ruta_temp_del_usuario.is_none() {
        println!("\n⚠️ No se detectó la carpeta TEMP del usuario");
    }

    let ruta_directorio_windows = env::var_os("WINDIR").map(PathBuf::from);

    if ruta_directorio_windows.is_none() {
        println!("\n⚠️ No se detectó el directorio de Windows");
    }

    let ruta_temp_del_sistema = ruta_directorio_windows
        .as_ref()
        .map(|ruta| ruta.join("Temp"));

    let ruta_prefetch = ruta_directorio_windows
        .as_ref()
        .map(|ruta| ruta.join("Prefetch"));

    (
        ruta_temp_del_usuario,
        ruta_temp_del_sistema,
        ruta_prefetch
    )
}

fn main() -> io::Result<()> {
    let (
        ruta_temp_del_usuario,
        ruta_temp_del_sistema,
        ruta_prefetch
    ) = obtener_rutas_temporales_de_windows();

    if let Some(ruta) = ruta_temp_del_usuario {
        println!(
            "\n🟢 LIMPIANDO CARPETA TEMP DEL USUARIO: {}",
            ruta.display().to_string().to_uppercase()
        );
        limpiar_contenido_de_carpeta(&ruta);
    }

    if let Some(ruta) = ruta_temp_del_sistema {
        println!(
            "\n🟢 LIMPIANDO CARPETA TEMP DEL SISTEMA: {}",
            ruta.display().to_string().to_uppercase()
        );
        limpiar_contenido_de_carpeta(&ruta);
    }

    if let Some(ruta) = ruta_prefetch {
        println!(
            "\n🟢 LIMPIANDO CARPETA PREFETCH: {}",
            ruta.display().to_string().to_uppercase()
        );
        limpiar_contenido_de_carpeta(&ruta);
    }

    println!(
        "\n✅ Limpieza completada (los archivos o carpetas bloqueados fueron omitidos)"
    );

    Ok(())
}

