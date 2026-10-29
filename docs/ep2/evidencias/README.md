# Registro de evidencias locales

**Fecha:** 29-10-2026. **Paquete:** frontend de Boost Level. Las evidencias corresponden a comprobaciones técnicas locales; falta la revisión cruzada del equipo y el cierre de entrega.

## Ejecución automatizada

La corrida final comenzó el **29-10-2026 05:19:19 CLST (2026-10-29T08:19:19.948Z)**: **33 aprobadas**, cero fallos/skip/todo y cinco archivos; 23,97 s, salida 0. Cobertura: 93,12% sentencias; 90,46% ramas; 94,32% funciones; 94,22% líneas. Se conservan los umbrales del 80% y las exclusiones. El manifiesto identifica 110 archivos fuente, incluido utils/identificador.js. Las capturas del informe se obtienen del HTML de esta misma corrida.

| Evidencia | Contenido |
|---|---|
| [pruebas-cobertura.log](pruebas-cobertura.log) | Salida completa de esa corrida y sus cuatro métricas. |
| [vitest.json](vitest.json) | Nombre y resultado de cada caso, tiempos y resumen. |
| [coverage-summary.json](coverage-summary.json) | Totales y cobertura por archivo, copiados de la misma corrida. |
| [fuentes-sha256.json](fuentes-sha256.json) | Hashes del árbol local, incluidos tests, lock, configuración y recursos medidos. |
| [lint.log](lint.log) | Lint sin errores ni advertencias. |
| [dependencias.json](dependencias.json) | npm audit: cero avisos detectados después del parche Vite. |
| [build.log](build.log) | Compilación de producción finalizada, código 0. |
| [formato.log](formato.log) | Comprobación Prettier aprobada, código 0. |

El detalle HTML y coverage-final.json están en frontend/coverage/, excluidos de Git. Se regeneran con `npm run test:cobertura`. El informe 06 registra cifras, exclusiones y caminos no recorridos. Un porcentaje alto no acredita accesibilidad completa ni aprobación académica. La selección de diez pruebas para explicar y las páginas de la rúbrica están en el plan de pruebas, sección 4.

## TM-01: diseño adaptable

Navegador Chromium integrado de Codex, dirección local http://127.0.0.1:5173/. Se revisaron portada, catálogo, carrito con Catan, checkout y resumen administrativo. El [registro de anchos](revision-responsive.json) conserva mediciones DOM de carrito/checkout/admin y tabla administrativa; en todas ellas el contenido de página cabe en el viewport. La tabla y la navegación administrativa tienen desplazamiento horizontal dentro de su contenedor en móvil.

| Vista | 375 px | 768 px | 1280 px |
|---|---|---|---|
| Portada | [Captura](portada-375.png) | [Captura](portada-768.png) | [Captura](portada-1280.png) |
| Catálogo | [Captura](catalogo-375.png) | [Captura](catalogo-768.png) | [Captura](catalogo-1280.png) |
| Carrito | [Captura](carrito-375.png) | [Captura](carrito-768.png) | [Captura](carrito-1280.png) |
| Checkout | [Captura](checkout-375.png) | [Captura](checkout-768.png) | [Captura](checkout-1280.png) |
| Administración | [Captura](admin-375.png) | [Captura](admin-768.png) | [Captura](admin-1280.png) |

Se abrió el menú móvil y se navegó al catálogo. También se revisó [la tabla de productos a 375 px](admin-productos-375.png): página sin desborde, tabla desplazable internamente. Estas capturas corresponden al recorrido previo con HashRouter; la alineación posterior conserva los estilos. Las capturas con prefijo router- documentan el nuevo recorrido con BrowserRouter. No se declara una matriz completa de dispositivos o navegadores.

## Recorrido funcional local

Se comprobó Catan con stock inicial 15: aceptar 15, impedir aumento y rechazar 16; volver a 1; compra invitada con datos ficticios y retiro; rechazo conserva carrito; reintento aceptado crea pedido, deja stock 14 y vacía carrito. La recarga mantiene el comprobante. Login administrador permite ver el pedido y ventas por $29.990.

Las capturas [compra-confirmada.png](compra-confirmada.png) y [administracion.png](administracion.png) pertenecen a ese primer recorrido local del 23-10-2026. Las capturas con dimensiones del 24-10-2026 corresponden a la versión final con React Bootstrap y muestran el mismo pedido persistido. No son pruebas de un segundo cobro ni evidencia de cobertura de código. Durante la revisión final se agregó una unidad al carrito y se comprobó la precarga de datos demo en checkout.

## TM-02: teclado y accesibilidad

Revisión parcial: “Saltar al contenido” con Enter enfoca el elemento `contenido` y conserva la ruta; se abrió administración de productos mediante teclado. En el diálogo de restablecer, Shift+Tab desde Cancelar llevó el foco a Confirmar; Enter confirmó y el foco volvió al botón original. Los formularios muestran labels y las imágenes tienen texto alternativo en el DOM. Las pruebas de UI verifican mensajes, Escape y extremos del ciclo de foco del diálogo. Falta un recorrido manual completo de teclado, errores y formularios administrativos por otra persona. No se declara una auditoría de accesibilidad terminada.

## TM-03: ejecución y navegación

Se comprobaron el arranque local, acceso demo, catálogo, carrito, compra, administración y recarga de comprobante y de `/#/admin/productos`. Tras la recarga de productos administrativos, la consulta de consola del navegador devolvió 0 errores y 0 advertencias. El README incluye comandos, cuentas y límites de simulación. Falta que un lector nuevo repita las instrucciones y comprobar rutas en el alojamiento que se elija.

El recorrido posterior a la alineación comprueba `/productos`, agregar Catan, `/carrito`, validación del checkout vacío, datos ficticios/retiro y compra confirmada. El comprobante y `/productos/JM001` se abren y recargan directamente con BrowserRouter; no usan hash. El filtro `/productos?q=Catan` conserva consulta, valor del campo y una tarjeta al recargar. No hubo errores ni advertencias de consola después de recargar el comprobante.

| Evidencia de BrowserRouter | Comprobación |
|---|---|
| [Comprobante](router-comprobante-1280.png) | Compra invitada con retiro, pedido persistido y carrito vacío. |
| [Detalle](router-detalle-1280.png) | Acceso directo y recarga del producto JM001; stock 14 tras la compra. |
| [Administración](router-admin-1280.png) | /admin redirige al login sin sesión; cuenta admin abre el resumen y muestra el pedido. |
| [Paquete compilado](router-preview-1280.png) | Acceso directo y recarga de /productos/JM001 en Vite preview (5174), usando /assets/index-Zo3wW29F.js, sin imágenes rotas ni errores/advertencias. |
| [Portada final](router-portada-final.png) | Datos iniciales restablecidos, sesión cerrada y carrito vacío; lista para un nuevo recorrido. |

El servidor de desarrollo y el preview del paquete compilado sirvieron index.html para esas rutas. El fallback del alojamiento público se debe comprobar cuando se despliegue; public/_redirects solo prepara la regla para un servicio compatible.

Al finalizar se restablecieron los datos creados durante la prueba: catálogo inicial, Catan stock 15, carrito vacío y sesión cerrada. La portada quedó preparada para comenzar una demostración nueva.

Revisión del login corregido: se retiró el bloque de correos/claves y su CSS. Las credenciales de revisión se consultan en los README. Se comprobó que el texto visible no contiene las dos cuentas ni la clave; los campos del formulario se dejaron vacíos. [Captura del acceso](login-sin-credenciales.png). Se conservan las capturas anteriores como evidencia de los recorridos indicados; la regresión automatizada corresponde a la última corrida identificada arriba.

## TM-04: entrega

Fuentes de la suite reducida identificadas por hashes. Las copias Word/Excel y coverage.zip ya están actualizados. El paquete fuente se extrajo en una carpeta nueva: npm ci y build aprobaron con Vite 8.3.5, sin avisos de dependencias. Los registros se adjuntan como instalacion-limpia.log y compilacion-limpia.log. Falta revisión entre integrantes y ensayo de exposición. No se atribuye una revisión cruzada todavía no realizada. El despliegue público del sitio se realiza por separado de la subida del repositorio.

## Revisión de presentación del 27-10-2026

El [informe de revisión](../11_REVISION_PRESENTACION.md) registra el recorrido actual sobre el paquete de producción: pantallas públicas y administrativas, compra aceptada/rechazada, recarga, ofertas, stock crítico, rutas inexistentes y anchos 375/768/1280. Sus registros se conservan por separado de las capturas históricas. La nueva tabla móvil permite desplazamiento horizontal interno y el texto secundario usa el color legible de la interfaz. Los resultados de navegador no incrementan los 33 casos automatizados.

## Publicación HTTP en AWS del 28-10-2026

El 28-10-2026 se comprobaron portada, catálogo y recarga en EC2; el checkout de esa versión falló en HTTP. Los archivos revision-aws-http.json, aws-portada-http.png y aws-checkout-http-errores.json conservan ese resultado histórico. El código final corrige el fallo con crearId. AWS EC2 se actualizó el 29-10-2026 en la instancia existente. AWS_29-10-2026/ofertas-publicadas.png y checkout-publicado.png son capturas auténticas de la versión pública; publicacion-aws-2026-10-29.json registra el build y el recorrido hasta el comprobante simulado con datos ficticios, sin cobro ni errores de consola. La dirección pública es dinámica y el equipo la comunicará directamente al profesor el día de la presentación.

## Evidencias finales del 29 de octubre

| Archivo | Procedencia real |
|---|---|
| recorrido-final-http.json | Navegador sobre HTTP local, build final; migración de datos, cuatro ofertas, rechazo y compra confirmada. |
| catalogo-final-http.png | Once productos con sus fotografías, HTTP local. |
| ofertas-final-http.png / ofertas-movil-http.png | Ofertas con importes y porcentaje, escritorio y móvil, HTTP local. |
| carrito-final-http.png / checkout-final-http.png / compra-final-http.png | Compra ficticia por $77.982, HTTP local. |
| administracion-final-http.png | Pedido guardado en el mismo navegador, HTTP local. |
| componentes-react.html / componentes-react.png | Código fuente final de TarjetaProducto y TiendaProvider, props, estado y React Bootstrap. |
| registro-vitest.html / vitest-final.png | Vista del log real de Vitest, sin simular una nueva ejecución en terminal. |
| cobertura-final.png / cobertura-detalle-final.png | Reporte HTML generado por la corrida final. |

Las capturas locales no se presentan como una publicación en AWS. Su ejecución no modifica la cobertura medida por Vitest.
