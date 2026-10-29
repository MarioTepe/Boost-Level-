# Matriz de requisitos, desarrollo y pruebas

**Versión:** 0.4 · **Fecha:** 26-10-2026  
**Estado:** implementación existente; respaldo automatizado acotado a 33 casos. No equivale a verificar todos los criterios de cada requisito.

Los IDs P corresponden al [plan vigente](05_PLAN_PRUEBAS.md). La corrida de [vitest.json](evidencias/vitest.json) aprueba los 33; el [informe](06_INFORME_COBERTURA_BORRADOR.md) registra métricas y caminos no recorridos. Las fuentes de la corrida se identifican mediante [hashes](evidencias/fuentes-sha256.json).

## Funcionales

| Requisito | Paquete | Módulo | Respaldo vigente | Alcance y pendiente |
|---|---|---|---|---|
| RF-01 | B-03 | Catálogo y datos | P-07, P-08 | Lista de productos; las variantes de datos iniciales no tienen casos separados. |
| RF-02 | B-03 | Filtros | P-08 | Búsqueda, categoría, orden y limpieza; página pública y filtro por categoría revisados manualmente en TM-03. |
| RF-03 | B-03 | Detalle | P-09 | Detalle válido; ID inexistente pendiente de revisión. |
| RF-04 | B-04 | Carrito y tarjeta | P-03 a P-05, P-24, P-25 | Evento y límites de stock; variantes inactivo/desconocido retiradas. |
| RF-05 | B-04 | Carrito y precios | P-10, P-26 | Cantidad, quitar, vaciar y totales; producto gratuito retirado. |
| RF-06 | B-02 | Repositorio | P-23, P-32 | Datos corruptos y fallo de escritura; otras versiones/esquemas sin caso separado. |
| RF-07 | B-06 | Checkout | P-11, P-12 | Validación, retiro y domicilio con precarga. |
| RF-08 | B-06 | Compra | P-25, P-30 | Stock normal y límite comprobados; cambio durante confirmación pendiente. |
| RF-09 | B-06 | Compra y persistencia | P-11, P-30, P-32 | Pedido/stock/carrito y fallo de guardado. |
| RF-10 | B-06 | Rechazo | P-12, P-31 | Pago rechazado y conservación del estado. |
| RF-11 | B-06 | Intento de compra | P-30 | Mismo intento secuencial no duplica; concurrencia y recarga retiradas. |
| RF-12 | B-05 | Sesión y guarda | P-14, P-33 | Login y acceso administrador; matriz de errores de sesión retirada. |
| RF-13 | B-05 | Registro | P-13, P-27, P-28 | Registro, login, normalización y edad; no todas las variantes de campos. |
| RF-14 | B-07 | Productos admin | P-16, P-17 | Alta, edición y baja lógica con resultado compartido. |
| RF-15 | B-07 | Categorías admin | P-18, P-33 | Crear, editar y desactivar vacía; categoría ocupada pendiente. |
| RF-16 | B-07 | Usuarios admin | P-15, P-19 | Formulario, alta, detalle, edición y baja; protección de todos los campos pendiente. |
| RF-17 | B-08 | Pedidos admin | P-30 y TM-03 | Pedido persistido en servicio; pantalla de detalle no visitada por la suite. |
| RF-18 | B-08 | Stock e historial | P-19, P-29 y TM-03 | Selector crítico e historial de usuario; pantalla de críticos revisada manualmente en TM-03. |
| RF-19 | B-08 | Reportes y perfil | P-20, P-29 | Indicadores y perfil; no todas las combinaciones de datos. |
| RF-20 | B-08 | Contenido y contacto | P-21 y TM-03 | Contacto simulado probado; páginas informativas fuera de la suite reducida. |
| RF-21 | B-03/B-07 | Ofertas, precios y persistencia | P-06, P-09, P-16; recorrido HTTP local 29-10 | Cuatro ofertas iniciales, precio original/rebajado y porcentaje; carrito y edición persistente revisados localmente. |
| RF-22 | B-05 | Descuento | P-26 | Total Duoc y visitante; matriz de elegibilidad y logout retirada. |

## No funcionales

| Requisito | Respaldo y estado |
|---|---|
| RNF-01 | P-01 a P-07 y P-24: componentes, props, callback e inmutabilidad. Revisión del código por el equipo pendiente. |
| RNF-02 | TM-01: nueva revisión a 375/768/1280 y corrección del desplazamiento de tabla móvil; ver informe 11. |
| RNF-03 | 33 aprobadas; diez casos de componentes seleccionados en el plan. Presentación individual pendiente. |
| RNF-04 | Las cuatro métricas globales superan el 80%; 72 archivos productivos incluidos. |
| RNF-05 | Formularios y diálogo recorridos por tests; TM-02 completo con otra persona pendiente. |
| RNF-06 | README preparado; lectura y arranque por otra persona pendientes. |
| RNF-07 | P-14/P-33 y README: acceso local de demostración; no autentica contra servidor. |
| RNF-08 | P-25/P-26/P-30 a P-32: límites, total e integridad básica; variantes retiradas documentadas. |
| RNF-09 | Formato/lint/build correctos. Instalación y build del paquete final comprobados; EC2 publicado, actualización final por verificar. |
| RNF-10 | Documentos y adjuntos actualizados; sin revisión cruzada, firma ni entrega final. |

## Control de cierre

Cada fila distingue el comportamiento probado de las alternativas pendientes. No se hereda la verificación exhaustiva de la suite anterior. La cobertura se calcula con la misma configuración y no sustituye aserciones o revisión manual. Cuando cambien código, configuración o reglas, repetir pruebas y actualizar informe/manifiesto. La revisión del equipo se registrará cuando se realice.

La compra de P-11 comprueba un entorno sin crypto.randomUUID; el recorrido HTTP local confirma rechazo, reintento, comprobante y recarga. La versión actual también se verificó públicamente en AWS hasta el comprobante simulado; la prueba automatizada sigue siendo local.
