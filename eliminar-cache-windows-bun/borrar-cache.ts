import { readdir, rm, stat } from "fs/promises";
import { join } from "path";

/**
 * Limpia una carpeta recursivamente, mostrando logs
 */
async function limpiarCarpeta(ruta: string) {
  console.log(`\n🧹 Limpiando: ${ruta}`);

  try {
    const items = await readdir(ruta);
    for (const item of items) {
      const fullPath = join(ruta, item);
      try {
        const s = await stat(fullPath);
        if (s.isDirectory()) {
          await limpiarCarpeta(fullPath); // recursión
          await rm(fullPath, { recursive: true, force: true });
          console.log(`📂 Carpeta eliminada: ${fullPath}`);
        } else {
          await rm(fullPath, { force: true });
          console.log(`📄 Archivo eliminado: ${fullPath}`);
        }
      } catch (e) {
        console.log(`⚠️ Omitido: ${fullPath}`);
      }
    }
    console.log(`✔ Finalizado: ${ruta}`);
  } catch (e) {
    console.log(`✖ No se pudo acceder a: ${ruta}`);
  }
}

function detectarRutasWindows() {
  const userTemp = process.env.TEMP || process.env.TMP;
  if (!userTemp) console.log("\n⚠️ TEMP/TMP NO DEFINIDA, SE OMITIRÁ LA CARPETA %TEMP%");

  const windowsDir = process.env.WINDIR;
  if (!windowsDir) console.log("\n⚠️ WINDIR NO DEFINIDA, SE OMITIRÁ EL TEMP DEL SISTEMA Y EL PREFETCH");

  const systemTemp = windowsDir ? join(windowsDir, "Temp") : null;
  const prefetch = windowsDir ? join(windowsDir, "Prefetch") : null;

  return { userTemp, systemTemp, prefetch };
}

async function principal() {
  /** Limpiar carpetas */
  const { userTemp, systemTemp, prefetch } = detectarRutasWindows();

  // Limpiar carpetas de manera segura
  
  // %temp%
  if (userTemp) {
    console.log(`\n🟢 LIMPIANDO CARPETA %TEMP%: ${userTemp.toUpperCase()}`);
    await limpiarCarpeta(userTemp);
  } else {
    console.log(`\n⚠️ CARPETA %TEMP% NO DETECTADA, SE OMITIRÁ`);
  }

  // temp
  if (systemTemp) {
    console.log(`\n🟢 LIMPIANDO CARPETA TEMP: ${systemTemp.toUpperCase()}`);
    await limpiarCarpeta(systemTemp);
  } else {
    console.log(`\n⚠️ CARPETA TEMP NO DETECTADA, SE OMITIRÁ`);
  }

  // PREFETCH
  if (prefetch) {
    console.log(`\n🟢 LIMPIANDO CARPETA PREFETCH: ${prefetch.toUpperCase()}`);
    await limpiarCarpeta(prefetch);
  } else {
    console.log(`\n⚠️ CARPETA PREFETCH NO DETECTADA, SE OMITIRÁ`);
  }

  console.log("\n✅ Limpieza completada (archivos/carpetas bloqueadas fueron omitidos)");
  // Evitar que la ventana de CMD se cierre
  //console.log("\nPresiona Enter para salir...");
  //prompt(""); // Espera a que el usuario presione Enter
}

// Ejecutar la función principal
principal().catch(err => console.error(err));


