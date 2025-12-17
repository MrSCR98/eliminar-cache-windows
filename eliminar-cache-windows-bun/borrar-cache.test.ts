// test/rutas.test.ts
import { describe, it, expect } from "bun:test";
import fs from "fs";
import path from "path";

//console.log(process.env.WINDIR)
//console.log(process.env.TEMP)
//console.log(process.env.TMP)
//console.log(process.env);

// Carpeta temporal del usuario
const userTemp = process.env.TEMP || process.env.TMP;
if (!userTemp) throw new Error("No se pudo detectar la carpeta temporal del usuario (TEMP/TMP no definida)");

// Carpeta de Windows
const windowsDir = process.env.WINDIR;
if (!windowsDir) throw new Error("No se pudo detectar la carpeta de Windows (WINDIR no definida)");

// Carpetas a comprobar
const systemTemp = path.join(windowsDir, "Temp");   // Temp del sistema
const prefetch = path.join(windowsDir, "Prefetch"); // Prefetch

const rutas = [userTemp, systemTemp, prefetch];

describe("Comprobar rutas de Windows", () => {
  rutas.forEach((ruta) => {
    it(`La ruta "${ruta}" debería existir y ser accesible`, () => {
      const existe = fs.existsSync(ruta);
      expect(existe).toBe(true);

      const stats = fs.statSync(ruta);
      expect(stats.isDirectory()).toBe(true);
    });
  });
});
