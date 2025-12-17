# 🧹 Limpiador de Caché para Windows

Este proyecto es un limpiador de carpetas temporales de Windows escrito en Rust. Borra archivos y carpetas de `%TEMP%`, `Temp` del sistema y `Prefetch`, mostrando mensajes en consola.

## Requisitos de Desarrollo
- Rust instalado: https://rust-lang.org

## Cómo probar el código en desarrollo
Para ejecutar el programa en modo desarrollo (rápido, sin optimización):
```bash
cargo run
```
- Útil para probar y depurar.
- Los mensajes se muestran en consola indicando qué archivos y carpetas se eliminan.

## Cómo hacer la build en modo release
Para obtener un ejecutable optimizado y rápido:
```bash
cargo build --release
```
- El ejecutable generado estará en `target/release/eliminar-cache-windows-rust.exe`
- Para limpiar carpetas del sistema o Prefetch, ejecutar desde una terminal como administrador.
- Puedes modificar el `Cargo.toml` para optimizar el ejecutable:
```toml
[profile.release]
opt-level = 3
lto = true
codegen-units = 1
panic = "abort"
debug = false
```
- Esta configuración hace que el ejecutable sea más rápido, más pequeño y eficiente.

## Ejecución del ejecutable
Después de la build release:
```bash
./target/release/eliminar-cache-windows-rust.exe
```
- Los mensajes se muestran en consola mientras limpia las carpetas temporales.
