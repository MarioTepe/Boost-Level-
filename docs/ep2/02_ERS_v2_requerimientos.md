# Especificación de requisitos de Boost Level V2

**Asignatura:** DSY1104 Desarrollo Fullstack II  
**Versión:** 0.3, base implementada para revisión EP2  
**Fecha:** 24-10-2026  
**Integrantes:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez  
**Estado:** código implementado en frontend/; la verificación local se documenta con sus resultados y evidencias. La revisión del equipo y evaluación docente siguen pendientes.

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 23-10-2026 | Diagnóstico y propuesta inicial. |
| 0.2 | 23-10-2026 | Alcance completo, ofertas y descuento, reglas verificables y contratos alineados con arquitectura y pruebas. |
| 0.3 | 24-10-2026 | Implementación React y guía de explicación vinculada a clases; resultados locales documentados aparte. |

## 1. Introducción

### 1.1 Propósito

Boost Level continuará como tienda de tecnología y gaming desarrollada en React. Esta ERS define qué debe funcionar en la segunda entrega, los datos de cada flujo y cómo comprobar el resultado. Las prioridades son resolver los problemas de compra y stock señalados por el docente, convertir las páginas en componentes y documentar el acceso a tienda y administrador.

### 1.2 Ámbito

La entrega comprende catálogo, categorías, ofertas, carrito, checkout, resultados de compra, cuentas de demostración y administración. Se conservan inicio, nosotros, blogs y contacto. Los datos se inicializan desde archivos JavaScript y se guardan localmente. Compras, cuentas y comprobantes son simulados para la evaluación.

API, pagos bancarios, despacho real y autenticación de producción quedan para una etapa posterior. El alcance local corresponde a una pestaña de navegador; no se garantiza inventario compartido entre dispositivos o pestañas.

### 1.3 Definiciones

| Término | Significado |
|---|---|
| Compra simulada | Operación local que registra un pedido y actualiza inventario sin realizar un cobro. |
| Carrito | Referencias a productos y cantidades; importes calculados desde el catálogo vigente. |
| Pedido u orden | Registro confirmado con fecha, cliente o invitado, entrega, líneas y totales conservados al comprar. |
| Comprobante | Resumen del pedido de demostración, sin validez tributaria. |
| Repositorio de datos | Módulo JavaScript que consulta y modifica datos mediante una interfaz definida. |
| P0 / P1 | P0 se implementa primero por su relación con feedback e indicadores; P1 completa las vistas y reglas. Ambas prioridades pertenecen al alcance. |

### 1.4 Referencias

El [diagnóstico](01_DIAGNOSTICO_Y_FUENTES.md) identifica fuentes S1–S8: instrucciones EP2, pauta evaluativa, plantilla ERS, planillas, plantilla revisada de cobertura, proyecto EP1, ejercicio React y captura del feedback. Las páginas se refieren al número impreso de los PDF.

### 1.5 Documentos relacionados

La [arquitectura](03_ARQUITECTURA_PROPUESTA.md) fija módulos, datos y contratos. El [backlog](04_BACKLOG_Y_ROLES.md) ordena el trabajo. El [plan de pruebas](05_PLAN_PRUEBAS.md) y la [matriz](07_MATRIZ_TRAZABILIDAD.md) vinculan requisitos y verificaciones. El [informe de cobertura](06_INFORME_COBERTURA_BORRADOR.md) se completará después de implementar.

## 2. Descripción general

### 2.1 Perspectiva

EP1 contiene páginas HTML, estilos, catálogo JavaScript y carrito local. EP2 transformará esa base en una SPA con React, Bootstrap y React Router. Las vistas compartirán catálogo, inventario y pedidos mediante un repositorio local. `clase-tienda-react` se conserva como referencia de los patrones enseñados.

### 2.2 Funciones y usuarios

| Actor | Funciones |
|---|---|
| Visitante | Navegación pública, carrito, registro, contacto y compra como invitado. |
| Cliente | Acciones del visitante, sesión y precarga de sus datos; descuento si resulta elegible. |
| Administrador | Productos, categorías, usuarios, pedidos, stock crítico, reportes y perfil. |
| Docente | Recorrido reproducible mediante README, cuentas de prueba y evidencias. |

### 2.3 Restricciones

- React/JavaScript/JSX, Vite y Bootstrap, en `frontend/` dentro del repositorio Boost Level.
- Fuente de datos JavaScript y persistencia local conforme a S1 pp. 1–2.
- Vitest, Testing Library, jsdom y V8 para pruebas, según la elección del usuario y S5/S7. S1/S2 conservan menciones a Jasmine/Karma: registrar respuesta docente antes de cerrar la entrega. La elección del usuario no acredita aprobación docente.
- Umbral global de 80% para sentencias, ramas, funciones y líneas, fijado antes de medir conforme a S5 sección 3.2.
- Las guardas React controlan navegación de la demostración. Cuentas y datos guardados deben ser ficticios.

### 2.4 Suposiciones y decisiones de diseño

Se conservan los once productos y la marca de EP1. Se propone mantener la promesa de 20% de descuento a clientes `@duoc.cl` e implementar su cálculo, ausente en EP1. Para concretar checkout se proponen retiro y domicilio sin costo en esta demostración. Las ofertas se configuran desde administración; el catálogo original se importa sin rebajas inventadas. Estas son decisiones de diseño revisables por el equipo, no instrucciones atribuidas al docente.

S1 p. 12 incluye una frase sobre presentación integrada con backend, aunque el resto especifica frontend y fuente JS simulada. Confirmar esa frase con el docente; la base disponible no contiene un backend.

### 2.5 Evolución prevista

API y base de datos, autorización de servidor, transacciones de inventario compartido, pago, despacho y correo reales. Los contratos del repositorio permitirán sustituir el adaptador local.

## 3. Requisitos específicos

Los requisitos conservan sus criterios de aceptación. El código funcional está en frontend/ y los resultados de verificación se registran en el informe y las evidencias; los pasos de entrega/publicación aún deben revisarse. La existencia de una página EP1 no acredita cumplimiento en React. Cualquier reducción de alcance se registra como cambio de ERS.

### 3.1 Interfaces

- **Usuario:** navegador, vistas en español, precios CLP, navegación compartida, formularios etiquetados y estados vacío/error/éxito.
- **Hardware:** escritorio y móvil con navegador; sin periféricos especiales.
- **Software:** React, Router, Bootstrap y repositorio JavaScript. Rutas y contratos en arquitectura.
- **Comunicación:** servidor Vite o alojamiento estático HTTP/HTTPS. La demostración no envía pedidos o credenciales a servicios externos.

### 3.2 Requisitos funcionales

FU = funcional de usuario; FS = funcional de sistema.

| ID | Nombre / prioridad | Clase y actor | Criterio de aceptación | Origen |
|---|---|---|---|---|
| RF-01 | Catálogo / P0 | FU, visitante | Una tarjeta por producto activo con código, nombre, imagen, precio vigente y stock. Si no hay productos, estado vacío. | S6; S1 pp. 1–2 |
| RF-02 | Búsqueda y categorías / P1 | FU, visitante | Busca nombre/código sin distinguir mayúsculas y combina búsqueda y categoría con AND. Limpiar filtros restaura resultados. Hay listado de categorías y vista por categoría. | S1 p. 4; S6 |
| RF-03 | Detalle / P0 | FU, visitante | ID válido muestra el producto correspondiente; desconocido o inactivo presenta mensaje y regreso al catálogo. | S6; S1 p. 3 |
| RF-04 | Agregar con stock / P0 | FU, comprador | Agregar incorpora una unidad o incrementa la línea existente. Si supera stock, rechaza, mantiene estado/importe y explica el límite. Stock cero impide agregar. | S8; S6 |
| RF-05 | Editar carrito / P0 | FU, comprador | Muestra cantidades, precios, subtotales, descuento y total; permite cambiar cantidades enteras positivas, quitar y vaciar. Vacío se determina por líneas, incluso con productos gratuitos. | S8; S1 pp. 4–5 |
| RF-06 | Recuperar datos / P0 | FS, comprador | Recarga conserva cambios guardados. JSON inválido, esquema desconocido o fallo de acceso muestra error y ofrece restablecer demo con confirmación. Línea con producto retirado o stock insuficiente se señala y bloquea checkout hasta corregirla. | S1 p. 2; defecto S6 |
| RF-07 | Entrega / P0 | FU, comprador | Nombre, apellidos, correo y modalidad obligatorios; domicilio exige región, comuna y dirección; retiro no exige dirección. Sesión precarga datos disponibles, editables para ese pedido. Errores aparecen junto al campo e impiden confirmar. | S1 pp. 5–6; diseño |
| RF-08 | Validar compra / P0 | FS, comprador | Relee estado y valida carrito, productos, cantidades, stock y formulario. Falla conserva pedidos/stock/carrito e informa motivo. Si precio cambió desde el resumen mostrado, solicita revisar importe antes de continuar. | S8; S1 pp. 5–8 |
| RF-09 | Registrar compra / P0 | FS, comprador | Guarda ID, fecha, cliente/invitado, entrega, líneas y totales; en la misma actualización descuenta stock y vacía carrito. Solo muestra éxito al persistir el conjunto. Recargar resultado muestra la misma orden. | S1 pp. 5–7 |
| RF-10 | Rechazo simulado / P0 | FU, comprador | Opción visible de simulación permite reproducir rechazo con motivo y regreso al checkout. No crea pedido confirmado, descuenta stock ni borra carrito. | S1 p. 8 |
| RF-11 | Confirmación única / P0 | FS, comprador | Doble clic o reenvío del mismo ID de intento devuelve la orden existente o se bloquea. Tras recarga no vuelve a descontar stock para ese intento confirmado. | Integridad; S8 |
| RF-12 | Sesión y admin / P0 | FU, cliente/admin | Login valida cuenta demo activa; cliente va a catálogo, admin a panel. Ruta admin sin rol válido redirige a login; logout cierra sesión. README indica acceso, cuentas y límite local. | S8; S6 |
| RF-13 | Registro / P1 | FU, visitante | Valida reglas de 3.3 y unicidad de correo/RUN normalizados. Crea cliente activo que puede iniciar sesión; nunca asigna admin desde registro público. | S6; S1 p. 2 |
| RF-14 | CRUD productos / P0 | FU, admin | Lista, crea, consulta, edita y desactiva. Valida código único, categoría activa, precio/stock. Cambios visibles en catálogo y tras recarga. Baja retira producto de venta y conserva historial. | S1 pp. 1, 10; S6 |
| RF-15 | CRUD categorías / P1 | FU, admin | Crea/lista/edita nombres únicos; desactiva solo categorías sin productos activos asociados. Rechaza vacío e indica asociaciones que impiden baja. | S1 p. 10 |
| RF-16 | Gestión usuarios / P1 | FU, admin | Lista/crea/consulta/edita/desactiva clientes por ID. Rechaza duplicados. Admin inicial protegido contra baja/cambio de rol. Baja cliente preserva pedidos y bloquea login. | S1 p. 10; S6 |
| RF-17 | Pedidos / P1 | FU, admin | Lista confirmados y abre ID seleccionado con líneas/totales guardados; ID inexistente muestra no encontrado. Comprobante identificado como simulado. | S1 p. 10 |
| RF-18 | Críticos e historial / P1 | FU, admin | Críticos: activos con umbral configurado y stock <= umbral. Historial filtra por clienteId; no mezcla invitados u otros clientes. | S1 p. 10; S6 |
| RF-19 | Reportes y perfil / P1 | FU, admin | Dashboard/reportes muestran número de pedidos confirmados, suma de totales y productos críticos desde datos guardados. Perfil edita nombre/apellidos/dirección sin alterar ID/correo/rol/clave del admin inicial. | S1 pp. 9–10; diseño |
| RF-20 | Contenido y contacto / P1 | FU, visitante | Migra inicio, nosotros, listado de blogs y dos artículos. Contacto valida nombre/correo/comentario y muestra que la demostración no envía mensajes. | S6; S1 p. 3 |
| RF-21 | Ofertas / P1 | FU, visitante/admin | /ofertas lista activos con precioOferta menor a precio; muestra precio anterior/actual. Detalle y carrito usan el vigente. Admin fija/retira oferta; sin ofertas muestra vacío. | S1 p. 8; diseño |
| RF-22 | Descuento / P1 | FS, cliente | Cliente autenticado activo con dominio exacto duoc.cl recibe 20% sobre subtotal vigente. Visitante, gmail.com y profesor.duoc.cl no. Se muestran y guardan subtotal/descuento/total. | Promesa S6; regla precisada |

### 3.3 Reglas de datos y negocio

| ID | Regla |
|---|---|
| RB-01 | Cantidad: entero positivo; stock: entero no negativo. Una línea por producto. Agregar no reserva inventario; revalidar al confirmar. |
| RB-02 | precioVigente = precioOferta ?? precio. Enteros CLP no negativos; oferta estrictamente menor al precio base. Se admite precio cero como en EP1. |
| RB-03 | subtotal = suma(precioVigente × cantidad). descuento = Math.round(subtotal × 0.20) solo si RF-22; costoEntrega = 0 en demo; total = subtotal - descuento + costoEntrega. Aplica sobre precios en oferta. No se agrega otro impuesto al precio mostrado. Son decisiones de cálculo de esta propuesta. |
| RB-04 | Pedido conserva nombre/código, precio de lista, precio cobrado, cantidad y subtotales al confirmar. Editar catálogo no cambia pedidos previos. |
| RB-05 | Correo con trim/minúsculas, parte local no vacía y dominio exacto duoc.cl, profesor.duoc.cl o gmail.com, heredados de EP1. No basta coincidencia por sufijo. |
| RB-06 | Registro: RUN, nombre obligatorio máx. 50, apellidos máx. 100, correo máx. 100, nacimiento, clave demo, región/comuna y dirección máx. 300. Textos requieren contenido tras trim; edad mínima 18 cumplidos, fecha válida no futura. |
| RB-07 | RUN sin puntos/guion, K mayúscula; 7 u 8 dígitos de cuerpo más dígito final 0–9/K. Se comprueba estructura y unicidad, sin afirmar validación de identidad o dígito verificador. Clave demo de 4–10 y confirmación coincidente. |
| RB-08 | Región/comuna provienen de js/regiones.js; comuna debe pertenecer a región. Cambiar región limpia comuna incompatible. Checkout domicilio usa misma relación. |
| RB-09 | Producto: código inmutable y único sin distinguir mayúsculas, mínimo 3; nombre obligatorio máx. 100; descripción opcional máx. 500; categoría activa; umbral opcional entero >=0. Sin umbral no entra a críticos. Contacto: nombre/correo máx. 100, comentario obligatorio máx. 500. |
| RB-10 | Sesión demo: sessionStorage con ID de usuario; tienda: único documento versionado en localStorage. Logout elimina precarga y descuento del resumen. No se solicitan tarjetas. |
| RB-11 | Rechazo de pago simulado no genera pedido. Error técnico de persistencia usa un mensaje distinto; no publica cambios ni éxito. |
| RB-12 | Bajas lógicas. Admin inicial protegido. No desactivar categorías mientras tengan productos activos; no borrar referencias de pedidos. |

### 3.4 Requisitos no funcionales

NP = no funcional de producto; NO = no funcional de organización.

| ID | Requisito / clase | Criterio de aceptación | Prioridad |
|---|---|---|---|
| RNF-01 | Mantenibilidad / NP | Páginas componen vistas; dominio/reducer puros sin DOM ni storage; estado compartido con un propietario; tarjeta recibe props y callback. | P0 |
| RNF-02 | Adaptabilidad / NP | Bootstrap utilizable a 375/768/1280 px en catálogo, carrito, checkout y admin, sin desbordar página. Tablas pueden desplazar dentro de su contenedor. | P0 |
| RNF-03 | Pruebas / NO | Al menos 10 casos significativos de componentes: render, props, eventos, estado y condiciones. Ejecución final con 0 fallos/omitidas/pendientes. Casos críticos verifican integridad, no solo mensajes. | P0 |
| RNF-04 | Cobertura / NO | >=80% global en sentencias/ramas/funciones/líneas; glob explícito incluye código no importado por tests. Informe registra cubiertos/total y detalle por archivo, exclusiones justificadas y misma corrida. | P0 |
| RNF-05 | Accesibilidad básica / NP | Teclado, etiquetas, foco visible, errores asociados y alt de imágenes revisados en flujos principales. | P1 |
| RNF-06 | Documentación / NO | README permite abrir EP1 y, cuando exista, instalar/iniciar frontend/, encontrar cuentas, rutas y docs. Comandos planeados se identifican como pendientes. | P0 |
| RNF-07 | Datos demo / NP | UI de login/checkout y README identifican simulación. Datos ficticios, sin claves reales ni tarjetas; roles locales no se presentan como seguridad de servidor. | P0 |
| RNF-08 | Fiabilidad / NP | Totales finitos, enteros y no negativos; resumen y pedido coinciden; escritura fallida no produce éxito ni cambios parciales. | P0 |
| RNF-09 | Ejecución/rutas / NP | npm ci, lint y build funcionan desde frontend/; enlaces y refresco funcionan con base/router del alojamiento documentado; sin errores de consola en flujos revisados. | P1 |
| RNF-10 | Entrega / NO | Repo común y evidencia por SHA/fecha/comando. ZIP fuente con lockfile, ERS y cobertura final; HTML de coverage comprimido aparte según S1/S2/S5. | P0 |

## 4. Justificación de decisiones

| Elección | Motivo | Base |
|---|---|---|
| React + JSX/Vite | Continuar componentes, estado/props de clases. | S1/S2/S7 |
| Bootstrap | Adaptar grilla/formularios conservando identidad. | S1/S2/S6 |
| Router declarativo | Páginas y parámetros de producto/usuario/orden. | Diagramas S1; dependencia S7 |
| Reducer puro + Context | Centralizar transiciones y compartir estado; lectura/escritura fuera del reducer. | RF-04–RF-11; referencia React |
| Un repositorio/documento local | Evitar catálogo duplicado y cambios separados de pedido/stock/carrito; sustituible por API. | S1; defectos S6 |
| Resultado de pago elegible en UI demo | Reproducir aceptación/rechazo durante pruebas/exposición. | S1 pp. 5–8 |
| Vitest/RTL/jsdom/V8 | Continuidad con clase y plantilla revisada; diferencia con PDF registrada. | Usuario, S5/S7 |

## 5. Criterios de cierre

Cumplir RF-01–RF-22 y RNF-01–RNF-10 o registrar cada requisito diferido con su impacto. La [matriz](07_MATRIZ_TRAZABILIDAD.md) define verificación por requisito. Revisar aplicación integrada, umbrales, responsive y guía antes de emitir documentos finales.

Estos Markdown son la base versionada de desarrollo. Al preparar la entrega, traspasar contenidos/evidencias a las plantillas Word/Excel si el docente exige esos formatos. Revisión, firmas y aprobación se registran solo cuando se realicen.
