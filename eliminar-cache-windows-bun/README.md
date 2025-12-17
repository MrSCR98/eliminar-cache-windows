# 🧹 Limpiador de Caché para Windows

> [!TIP]
> Si hubieras usado Rust, el ejecutable probablemente pesaría entre 1 y 10 MB. Sin embargo, elegí Bun porque JavaScript/TypeScript me resulta más familiar y quería probar su compilador. En el futuro, es posible que Bun optimice la creación de ejecutables para no incluir todo el runtime si no se utiliza.

---

## ⚡ Qué hace esta herramienta

Esta herramienta limpia automáticamente las carpetas de caché y temporales de Windows, evitando tener que hacerlo manualmente. Sustituye el procedimiento tradicional de:

1. Presionar **Win + R** (Ejecutar) o buscar "Ejecutar".
2. Escribir cada carpeta para abrirla y eliminar su contenido manualmente:

- %temp%
- temp
- PREFETCH

El script:

- Recorre todas las carpetas de forma recursiva.
- Elimina archivos y carpetas automáticamente.
- Omite los archivos o carpetas que estén en uso o bloqueados.
- Muestra un registro de lo que se va eliminando y lo que se omite.

---

## 🖥️ Uso para usuarios

1. Descarga el ejecutable generado (`borrar-cache.exe`).
2. Ejecuta el archivo y el script limpiará automáticamente las carpetas temporales mencionadas.
3. Verás en pantalla qué archivos y carpetas se han eliminado y cuáles han sido omitidos.
4. Una vez finalizado, el script mostrará:

```
✅ Limpieza completada (archivos/carpetas bloqueadas fueron omitidos)
```

> ⚠️ La consola se cerrará automáticamente al terminar la limpieza.

---

## 💻 Uso para desarrolladores / pruebas

Si quieres probar o desarrollar el script, puedes ejecutarlo directamente con Bun:

1. Instalar dependencias:

```bash
bun install
```

2. Ejecutar el script en modo desarrollo (para probarlo sin generar un ejecutable):

```bash
bun run dev
```

> Esto mostrará en pantalla los logs de eliminación y omisión en tiempo real.  
> A diferencia del ejecutable, la ventana no se cerrará automáticamente, lo que permite depurar o probar cambios en el script.

3. Ejecutar tests:

```bash
bun test
# o también
bun run test
```

4. Crear el ejecutable optimizado para Windows:

```bash
bun run exe
```

---

## 🤝 Contribuciones

Si quieres mejorar el código o añadir nuevas funcionalidades, tu colaboración es bienvenida. Puedes enviar pull requests o sugerencias para hacer que el proyecto sea más eficiente y útil para todos.

---

## 📝 Notas adicionales

- El script omite archivos y carpetas que estén en uso o bloqueados.
- Se recomienda ejecutar el ejecutable con permisos de administrador para una limpieza más completa.
- Durante la ejecución, se mostrarán logs como:

```
🧹 Limpiando: C:\\Windows\\Temp
📄 Archivo eliminado: C:\\Windows\\Temp\\archivo.tmp
📂 Carpeta eliminada: C:\\Windows\\Temp\\CarpetaVieja
⚠️ Omitido: C:\\Windows\\Temp\\archivoEnUso.tmp
✔ Finalizado: C:\\Windows\\Temp
```
