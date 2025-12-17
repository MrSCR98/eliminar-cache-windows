# 🧹 Limpiador de Caché para Windows

Esta herramienta limpia automáticamente las carpetas temporales y de caché de Windows, evitando que tengas que hacerlo manualmente. Funciona en segundos y muestra qué archivos se han eliminado y cuáles se han omitido.

> [!TIP]
> La versión con Rust genera un ejecutable muy ligero (<1 MB). La versión con Bun ocupa alrededor de 110 MB, ya que incluye todo el runtime de JavaScript/TypeScript. Rust se utilizó por eficiencia, pero Bun se usó para probar y familiarizarse con su compilador.

---

## ⚡ Qué hace esta herramienta

- Borra automáticamente las carpetas de caché y temporales de Windows:  
    - %temp%
    - temp
    - PREFETCH
- Omite archivos y carpetas que estén en uso o bloqueados.
- Muestra un registro en pantalla de lo que se ha eliminado y lo que se ha omitido.

> Esto reemplaza tener que abrir cada carpeta manualmente y borrar archivos uno por uno.

---

## 🖥️ Uso para usuarios (sin conocimientos de programación)

1. Descarga el ejecutable: [Descargar Borrar Cache](https://github.com/MrSCR98/eliminar-cache-windows/releases/download/Ejecutable/borrar-cache.exe)
2. Haz doble clic en **borrar-cache.exe**.
3. El programa limpiará automáticamente las carpetas temporales.
4. Verás un mensaje al finalizar:

```
✅ Limpieza completada (archivos/carpetas bloqueadas fueron omitidos)
```

> ⚠️ La ventana se cerrará automáticamente al terminar la limpieza.

---

## 🎨 Cómo cambiar el icono del ejecutable (opcional)

Si quieres personalizar el icono del archivo .exe:

1. Descarga la herramienta **rcedit**:  
   [Descargar rcedit](https://github.com/electron/rcedit/releases)
2. Crea tu imagen en formato PNG y luego conviértela a .ICO (por ejemplo, 64x64px).
3. Ejecuta el siguiente comando en la misma carpeta donde esté tu .exe e icono:

```
.rcedit-x64.exe "borrar-cache.exe" --set-icon "favicon_64x64.ico" --set-file-version "1.0.0" --set-product-version "1.0.0"
```

**Consejo:** Para que el icono se vea bien en todos los tamaños, asegúrate de usar un archivo .ICO que contenga varias resoluciones (16x16, 32x32, 64x64, etc.).

---

## 🤝 Contribuciones

¡Tu ayuda puede hacer que esta herramienta sea aún mejor! Si quieres colaborar, puedes:

- Enviar **pull requests** con mejoras en el código.
- Proponer nuevas funcionalidades o ideas para optimizar la limpieza.
- Ayudar a **mejorar la experiencia del usuario**, haciendo la herramienta más simple y rápida de usar.
- Trabajar en **detalles visuales**, como el icono del ejecutable o la presentación de los logs.

Algunas ideas específicas para mejorar:

- Hacer que el icono se vea correctamente en todos los tamaños (actualmente se ve pequeño cuando debería mostrarse grande).
- Simplificar la forma de añadir el icono al .exe, para que cualquier usuario pueda personalizarlo fácilmente.

¡Cualquier contribución, por pequeña que sea, ayuda a que esta herramienta sea más útil para todos!

---

## 📝 Notas importantes

- Ejecuta el programa como administrador, si la limpieza no funciona correctamente.
- Durante la limpieza verás mensajes como:

🧹 Limpiando: C:\Windows\Temp  
📄 Archivo eliminado: C:\Windows\Temp\archivo.tmp  
📂 Carpeta eliminada: C:\Windows\Temp\CarpetaVieja  
⚠️ Omitido: C:\Windows\Temp\archivoEnUso.tmp  
✔ Finalizado: C:\Windows\Temp

