# Registro de evidencias locales

**Fecha:** 24-10-2026. **Paquete:** frontend de Boost Level. Las evidencias corresponden a comprobaciones técnicas locales; falta la revisión cruzada del equipo y el cierre de entrega.

## Ejecución automatizada

La corrida iniciada el **24-10-2026 a las 19:50:55 CLST (22:50:55 UTC)** produjo 144 pruebas aprobadas, 0 fallidas, 0 omitidas y 0 todo en tres archivos. Duración de terminal: 42,48 s. Código de salida: 0. Esta ejecución corresponde al commit de código **97c23a8**, con BrowserRouter y páginas/componentes separados. Sustituye la medición anterior; el informe registra también la corrección de sincronización de la prueba de checkout durante esta iteración.

| Evidencia | Contenido |
|---|---|
| [pruebas-cobertura.log](pruebas-cobertura.log) | Salida completa de esa corrida y sus cuatro métricas. |
| [vitest.json](vitest.json) | Nombre y resultado de cada caso, tiempos y resumen. |
| [coverage-summary.json](coverage-summary.json) | Totales y cobertura por archivo, copiados de la misma corrida. |
| [fuentes-sha256.json](fuentes-sha256.json) | Identidad del código versionado, lock, configuración y recursos medidos. |
| [lint.log](lint.log) | Lint sin errores ni advertencias. |
| [build.log](build.log) | Compilación de producción finalizada, código 0. |
| [formato.log](formato.log) | Comprobación Prettier aprobada, código 0. |

El detalle HTML y coverage-final.json están en frontend/coverage/, excluidos de Git. Se regeneran con `npm run test:cobertura`. El informe 06 registra cifras, exclusiones y caminos no recorridos. Un porcentaje alto no acredita accesibilidad completa ni aprobación académica. La selección de diez pruebas para explicar y las páginas de la rúbrica están en el plan de pruebas, sección 3.

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

Código medido identificado por commit y documentación preparada para versionarse en un commit posterior. Pendiente para la entrega académica: revisión entre integrantes, preparar fuente/coverage.zip, instalar con npm ci desde el paquete limpio y ensayar exposición. No se atribuye revisión cruzada o autoría individual todavía no registrada. El despliegue público del sitio se realiza por separado de la subida del repositorio.
