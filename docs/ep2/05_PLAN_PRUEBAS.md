# Plan de pruebas de Boost Level

**Versión:** 0.7 · **Fecha:** 29-10-2026  
**Estado:** 33 casos conservados y ejecutados; revisión cruzada pendiente.  
**Integrantes:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez.

## 1. Objetivo y alcance

Comprobar los comportamientos principales que los tres integrantes deben poder explicar: props y eventos, carrito, formularios, compra simulada, administración y reglas de stock. Se reducen los 153 casos anteriores a 33 bloques `it`: 23 de componentes/interfaz, 6 de dominio y 4 de servicios. No se trasladan los casos retirados a bucles ni se añade funcionalidad.

La cobertura global es un criterio independiente del número de casos. Se mantiene el mínimo del 80% en las cuatro métricas y se mide toda la aplicación. No se afirma que todos los requisitos y sus variantes estén totalmente probados.

## 2. Entorno y configuración

Se usa Vitest, Testing Library, jsdom y coverage-v8, conforme a la [guía del profesor](https://vihgo.github.io/repaso-dsy1104-2026/#guia-pruebas) (S13). Las referencias antiguas a Jasmine/Karma se identifican en el diagnóstico; no son el ejecutor de este paquete.

`frontend/vite.config.js` conserva `include: ['src/**/*.test.{js,jsx}']`, entorno jsdom, `setupFiles: './src/test/setup.js'`, `allowOnly: false`, limpieza y restauración de mocks. V8 incluye `src/**/*.{js,jsx}`; excluye únicamente `src/main.jsx` (montaje), los propios tests y `src/test/**` (infraestructura). Sentencias, ramas, funciones y líneas exigen 80% global cada una. Se incluyen también páginas sin pruebas para no inflar el porcentaje.

El setup limpia DOM y almacenamiento después de cada caso. Las pruebas de catálogo crean datos con beforeEach y usan Preparar/Actuar/Comprobar, render, screen, vi.fn y userEvent con await. Las pruebas de App mantienen sus flujos con fireEvent; no se declara una migración total a userEvent. Los servicios reciben almacenamiento en memoria nuevo para cada prueba.

## 3. Inventario vigente

Cada fila identifica un bloque `it` real; sus nombres proceden de la ejecución. Las rutas son relativas a `frontend/src/`. Los grupos TC/TU/TI que permanecen en títulos describe corresponden a la numeración del plan anterior; P-01 a P-33 identifican los casos vigentes.

| ID | Archivo | Nombre exacto del caso |
|---|---|---|
| P-01 | componentes/catalogo/TarjetaProducto.test.jsx | muestra el nombre y la categoría recibidos por props |
| P-02 | componentes/catalogo/TarjetaProducto.test.jsx | muestra el precio con formato de pesos chilenos |
| P-03 | componentes/catalogo/TarjetaProducto.test.jsx | avisa una sola vez con el ID del producto al agregar |
| P-04 | componentes/catalogo/TarjetaProducto.test.jsx | no permite agregar un producto sin stock |
| P-05 | componentes/catalogo/TarjetaProducto.test.jsx | no permite agregar cuando el carrito alcanza el stock |
| P-06 | componentes/catalogo/TarjetaProducto.test.jsx | muestra la oferta y conserva visible el precio original |
| P-07 | componentes/catalogo/GrillaProductos.test.jsx | dibuja una tarjeta por producto con su enlace de detalle |
| P-08 | App.test.jsx | catálogo renderiza los once activos y permite combinar, ordenar y limpiar filtros |
| P-09 | App.test.jsx | ofertas refleja precio configurado; detalle agrega y respeta el stock |
| P-10 | App.test.jsx | renderiza, cambia cantidades, quita y vacía sin perder consistencia |
| P-11 | App.test.jsx | muestra validaciones y completa compra invitado con retiro |
| P-12 | App.test.jsx | precarga cliente, rechaza sin modificar, conserva formulario al reintentar y confirma domicilio |
| P-13 | App.test.jsx | registro exige datos y crea cliente utilizable en login |
| P-14 | App.test.jsx | no administra sin rol y el login admin sí abre dashboard |
| P-15 | App.test.jsx | formulario de cliente permite edición con datos iniciales |
| P-16 | App.test.jsx | producto nuevo valida y guarda oferta y stock compartidos |
| P-17 | App.test.jsx | edita producto y desactiva con confirmación sin borrar historial |
| P-18 | App.test.jsx | categorías valida, crea, edita, cancela y desactiva una categoría vacía |
| P-19 | App.test.jsx | crea cliente desde admin, muestra detalle/historial y permite edición y baja |
| P-20 | App.test.jsx | perfil guarda campos permitidos y muestra errores reales |
| P-21 | App.test.jsx | contacto valida y deja explícito que no envía mensajes |
| P-22 | App.test.jsx | menú, acceso al contenido, avisos y reset son operables por UI |
| P-23 | App.test.jsx | storage corrupto ofrece recuperar sin borrado automático |
| P-24 | domain/dominio.test.js | agrega unidades sin modificar el carrito anterior |
| P-25 | domain/dominio.test.js | acepta el stock máximo y rechaza una unidad adicional |
| P-26 | domain/dominio.test.js | calcula el total y aplica el descuento al cliente Duoc |
| P-27 | domain/dominio.test.js | normaliza el RUN y correo de un usuario válido |
| P-28 | domain/dominio.test.js | rechaza el registro de un menor de edad |
| P-29 | domain/dominio.test.js | calcula ventas confirmadas y productos con stock crítico |
| P-30 | services/servicios.test.js | confirma el pedido y no descuenta stock al repetir el mismo intento |
| P-31 | services/servicios.test.js | conserva el estado cuando se rechaza el pago |
| P-32 | services/servicios.test.js | conserva el estado cuando falla el guardado |
| P-33 | services/servicios.test.js | impide administrar categorías sin una sesión de administrador |

## 4. Diez casos para explicar en la presentación

La rúbrica S2, página 7, IE2.2.1, contempla 10/10 pruebas estructuradas para el nivel máximo; página 9, IE2.2.2, pide demostrar diez. No impone un máximo de diez ni reemplaza el mínimo de cobertura de S5, sección 3.2.

Seleccionar **P-01 a P-07, P-10, P-11 y P-15**. Son diez casos distintos de componentes: tarjeta y grilla (datos, precio, evento, stock y oferta), actualización del carrito, validación/compra como invitado y formulario controlado de usuario. Para cada uno explicar dato inicial, acción y resultado esperado, y mostrar las aserciones en el archivo.

Ejecutar los siete casos pequeños del catálogo desde frontend/:

```powershell
npm run test:ejecutar -- src/componentes/catalogo --reporter=verbose
```

Ejecutar los 33 y medir la cobertura:

```powershell
npm run test:ejecutar
npm run test:cobertura
```

No se incorpora el IVA del ejemplo docente a las reglas del negocio. Para estudiar las otras tres pruebas seleccionadas, abrir App.test.jsx y localizar sus nombres de la tabla.

## 5. Criterios de cierre automatizado

- 33 casos ejecutados y aprobados; cero fallos, skip y todo.
- Al menos diez casos de componentes significativos y explicables.
- 80% global en cada métrica, sin ampliar exclusiones ni bajar umbrales.
- Cantidades/totales, stock 15/16, aceptación/rechazo, escritura fallida y repetición de intento comprobados con aserciones.
- Formato, lint y compilación correctos.
- Informe, manifiesto y adjuntos referidos a una misma corrida.

La corrida iniciada el 29-10-2026 05:19:19 CLST (2026-10-29T08:19:19.948Z) aprobó los 33 casos. Cobertura: 93,12% sentencias, 90,46% ramas, 94,32% funciones y 94,22% líneas. Ver [informe](06_INFORME_COBERTURA_BORRADOR.md) y [evidencias](evidencias/README.md). Los hashes identifican los bytes medidos en esa corrida.

## 6. Variantes retiradas y revisión pendiente

Se retiraron series extensas de campos inválidos, pruebas repetidas de rutas y callbacks, y comprobaciones de recuperaciones excepcionales. La suite actual no visita automáticamente Nosotros, Blogs, artículos, categorías públicas, stock crítico ni el detalle administrativo del pedido. Tampoco verifica todas las combinaciones de cambio de precio/stock durante la confirmación, recarga de intento, errores de sesión o teclado. Esto reduce el respaldo automatizado; no cambia el comportamiento implementado.

| ID manual | Actividad | Estado |
|---|---|---|
| TM-01 | Responsive a 375/768/1280 px | Repetido a 375/768/1280; tabla móvil corregida. Ver informe 11. |
| TM-02 | Recorrido con teclado, labels, foco, errores y alt | Menú, salto, foco y diálogo revisados; falta recorrido completo por otra persona. |
| TM-03 | Abrir pantallas públicas/admin, resultado y detalle de pedido; arrancar según README | Pantallas públicas/admin recorridas en producción local; instalación limpia registrada en informe 11. |
| TM-04 | Revisar Word/Excel, hashes, paquetes, instalación y entrega | Copias y paquete verificados técnicamente; revisión del equipo y ensayo pendientes. |

La [matriz](07_MATRIZ_TRAZABILIDAD.md) distingue el respaldo actual por requisito. La cobertura no garantiza ausencia de errores ni acredita una revisión docente. Las firmas y la revisión por una persona diferente permanecen pendientes hasta que ocurran.

La revisión final amplía las aserciones existentes de P-09 para comprobar cuatro ofertas, porcentaje y actualización de datos anteriores; conserva el carrito previo. P-11 ejecuta el checkout con crypto sin randomUUID. El inventario sigue teniendo 33 casos; no se añadieron pruebas ocultas ni se rebajaron los umbrales. El recorrido HTTP local del 29-10-2026 se conserva en evidencias/recorrido-final-http.json; su resultado no acredita el servidor AWS.
