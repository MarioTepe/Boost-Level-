# Diagnóstico y fuentes de Boost Level

**Versión:** 0.3 · **Fecha:** 25-10-2026  
**Integrantes:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez.  
**Base del diagnóstico:** EP1 en commit `e073268`; ejercicio React con cambios locales pendientes. Las comprobaciones iniciales fueron realizadas durante una revisión asistida y deben repetirse sobre el incremento que se entregue.

## 1. Observaciones del docente

La captura del feedback reconoce un diseño simple y efectivo y señala problemas al procesar la venta, posibilidad de agregar más unidades que el stock, dificultad para encontrar la cuenta administrativa y necesidad de dejar el material de revisión en GitHub o README. Estas observaciones se reflejan en RF-04–RF-12 y RNF-06/RNF-10.

La captura muestra un separador “Sep 25”; el nombre del archivo indica cuándo se capturó. No se asume que el mensaje fue enviado el 22 de octubre.

## 2. Registro de fuentes

Rutas relativas a la carpeta de trabajo `ProyectoFullStack/`. Los originales se conservan; estos documentos Markdown sirven de base versionada de desarrollo.

| ID | Archivo / ubicación | Contenido usado |
|---|---|---|
| S1 | Documentacion_DSY1104_EvaluaciónParcial2/DSY1104 Evaluación Parcial 2 - Anexo 1 Instrucciones.pdf | pp. 1–2 React/JS CRUD/persistencia/Bootstrap; pp. 3–10 vistas; p. 11 pruebas; p. 12 ERS, cobertura, GitHub, ZIP y exposición. |
| S2 | Documentacion_DSY1104_EvaluaciónParcial2/DSY1104 Evaluación Parcial 2_EE_EP_Estudiante.pdf | pp. 2–4 alcance y entregables; pp. 6–9 rúbrica de encargo y presentación. |
| S3 | Documentacion_DSY1104_EvaluaciónParcial2/DSY1104 Evaluación Parcial 1 - Anexo 4 ERS-Especificacion de Requisitos del software.docx | Estructura ERS: propósito, contexto, actores, restricciones, requisitos/interfaces y atributos de calidad. |
| S4 | Documentacion_DSY1104_EvaluaciónParcial2/DSY1104 Evaluación Parcial 1 - Anexo 2 Planilla de Requerimientos.xlsx y Anexo 3 Ejemplo Planilla de Requerimientos.xlsx | Campos ID, nombre, tipo, clasificación, actores, descripción y estado; instrucciones de criterios de aceptación. |
| S5 | Documentacion_DSY1104_EvaluaciónParcial2/Plantilla_Informe_Cobertura_DSY1104_revisada.docx | Vitest/V8; 80% en cuatro métricas; secciones 1–9 y anexos A/B/C; cifras de una misma corrida; control/revisión documental. |
| S6 | ProyectoFull/Boost-Level-/README.md, HTML, js/, css/, img/ | Equipo, funcionalidades implementadas y limitaciones EP1. |
| S7 | clase-tienda-react/package.json, package-lock.json, vite.config.js, src/ | Patrones trabajados en clase y configuración React/Vitest. |
| S8 | Captura de pantalla 2026-10-22 212520.png | Feedback docente. |
| S9 | FullStack II/Introduccion a react/guia-react-alumnos.html | Cinco clases: Vite/JSX, componentes, props/listas, estado/eventos, formularios controlados, useEffect, datos derivados, localStorage y build. |
| S10 | FullStack II/guia-react-router/guia-react-router-alumnos.html | Router declarativo: BrowserRouter, Routes/Route, Link/NavLink, Outlet, parámetros, useNavigate, useSearchParams, useLocation, 404, rutas protegidas, estructura de páginas/componentes y publicación. |
| S11 | FullStack II/Introduccion a react/React_5_clases_DSY1104.pptx | 52 diapositivas que acompañan las cinco clases. Diaps. 18–22: componentes/imports/Bootstrap; 38–40: inmutabilidad y estado compartido; 43–48: formularios, efectos, persistencia y build. |
| S12 | FullStack II/guia-react-router/01-punto-de-partida/ | Código inicial de la actividad: navegación simulada con useState, tarjeta y datos. Aún no monta Router; S10 explica cómo incorporarlo. |

**S13:** [guía de pruebas del profesor](https://vihgo.github.io/repaso-dsy1104-2026/#guia-pruebas), compartida por el usuario y revisada el 25-10-2026. El original está en [guias/guia-pruebas-alumnos.html](https://github.com/vihgo/repaso-dsy1104-2026/blob/a360d63152a9509a7b24a29a37c4d74ee97dd3c1/guias/guia-pruebas-alumnos.html). Secciones 1, 4–5 y 9–17: configuración Vitest, pruebas junto al código, preparar/actuar/comprobar, aislamiento, espías, Testing Library, userEvent y cobertura. El ejemplo de IVA y los límites de formularios son ejercicios; no sustituyen las reglas de Boost Level.

### Exigencias que condicionan el plan

S2 establece una semana de trabajo, máximo tres estudiantes, encargo 40% y presentación individual 60% dentro de la evaluación. S1 p. 12 señala 15 minutos de exposición y 5 de preguntas. Para cada integrante se debe preparar explicación de componentes, props/estado, Bootstrap, pruebas, mocks y resultados.

S1 incluye categorías, checkout, éxito/error y ofertas. El diagrama administrativo agrega pedidos/comprobantes, críticos, reportes, categorías, historial y perfil. Son parte de la propuesta documentada; la prioridad ordena su desarrollo, no equivale a descartarlos.

S5 exige usar 80% como umbral antes de medir; no es una cobertura obtenida. El informe final debe presentar sentencias, ramas, funciones y líneas con cubiertos/total, porcentajes y exclusiones justificadas.

### Diferencias entre fuentes

| Tema | Evidencia | Tratamiento |
|---|---|---|
| Testing | S1/S2 mencionan Jasmine/Karma; S5/S7 y la guía docente S13 usan Vitest. | S13 es la referencia técnica indicada por el usuario: se ejecuta Vitest con Testing Library, jsdom y V8. describe/it/expect comparten vocabulario con Jasmine; no se instala ni ejecuta Jasmine/Karma. La guía sustenta la herramienta, no acredita una nota o revisión docente. |
| Backend | S1 p. 12 incluye una frase sobre presentación integrada; pp. 1–2 describen frontend con datos JS simulados. | Base de desarrollo local; solicitar aclaración docente si pide integración. No hay API/backend en las carpetas inspeccionadas. |
| Categorías admin | Figura de S1 p. 10 enlaza categoría a “Editar usuario”. | Interpretación de diseño: editar categoría. Revisar template HTML/docente si surge diferencia. |
| Descuento/entrega/ofertas | EP1 anuncia 20% duoc.cl, no lo calcula; S1 añade entrega/ofertas sin reglas numéricas completas. | ERS 3.3 concreta decisiones revisables del equipo; no se atribuyen esos valores al docente. |

## 3. Estado de EP1

Raíz: `ProyectoFull/Boost-Level-/`. HTML/CSS/JavaScript, Bootstrap, imágenes locales, once productos y nueve categorías. Código de catálogo en `js/datos.js`; filtro en `js/productos.js`; detalle por código en `js/detalle.js`; carrito con clave `boostLevelCarrito`. El README identifica al equipo y declara alcance frontend sin backend.

| Hallazgo | Ubicación en la revisión inicial | Consecuencia |
|---|---|---|
| Pagar muestra una alerta, sin venta | carrito.html:57 | RF-07–RF-11 deben incorporar compra simulada completa. |
| Agregar/aumentar no consultan stock | js/carrito.js:52–76 y 151–164 | Controlar límite en ambos caminos y revalidar al confirmar. |
| JSON.parse sin recuperación | js/carrito.js:14 | Error recuperable y validación de esquema. |
| Login compara fixtures y redirige sin sesión | js/login.js:6–19 y 95–127 | Cuenta, rol, logout y guardas de navegación demo. |
| README explica login de forma distinta al código | README.md:119–125 | Actualizar guía y cuentas. |
| Formulario de producto valida y redirige, sin persistir | js/producto-form.js:86–93 | CRUD debe modificar fuente compartida. |
| Registro no guarda una cuenta utilizable | js/usuario-form.js:318–337 | Registro y login deben usar el mismo repositorio. |
| Admin usuarios usa filas y datos fijos | admin/usuarios.html:40–52; mostrar-usuario.html:28–34; editar-usuario.html:100–104 | Operaciones por ID y datos persistidos. |
| Descuento anunciado sin cálculo en total | registro.html y js/usuario-form.js:323–329; js/carrito.js:212–213 | Precisar elegibilidad, redondeo y totales. |
| Contacto solo alerta y limpia campos | js/contacto.js:54–60 | Identificar el envío como simulación. |

Cuentas públicas del prototipo: `admin@duoc.cl / 1234` y `usuario@gmail.com / 1234`. Son datos ficticios para reproducir el recorrido, no secretos de producción.

### Comprobación inicial de lógica

Durante la revisión asistida, un agente ejecutó `datos.js` y `carrito.js` en Node VM con DOM y almacenamiento en memoria. Se informó: Catan `JM001` con stock 15 admitió cantidad 16; una llamada posterior `cambiarCantidad('JM001',100)` dejó 116. Persistencia con texto inválido produjo `SyntaxError`. Son reproducciones de la lógica, no una ejecución visual del navegador. No hay log archivado de esa corrida: sirven de diagnóstico y deben respaldarse con pruebas de regresión en el incremento React.

## 4. Estado del ejercicio de clase

`clase-tienda-react` usa React/JSX, Vite, Bootstrap/React Bootstrap, Vitest, jsdom y Testing Library. Router está instalado pero no implementado. `App.jsx` mantiene carrito con useState, pasa cantidad al encabezado y callback al catálogo; tarjetas muestran datos y desactivan el botón cuando stock es cero.

| Brecha | Evidencia |
|---|---|
| Carrito con artículos no dibuja líneas | src/components/Carrito.jsx |
| Quitar está definido pero no conectado | src/App.jsx |
| Carrito solo en memoria y sin máximo de stock | src/App.jsx |
| Navegación con anclas erradas y botón sin acción | src/components/Encabezado.jsx |
| Variables Mouse/MOUSE con errores de nombre/alcance | src/components/TarjetaProducto.test.jsx:20,26 |
| Test usa onAgregar, componente espera onAgregarProducto | test de tarjeta y TarjetaProducto.jsx |
| Falta proveedor de cobertura | package.json sin @vitest/coverage-v8 |
| Comentario llama Jasmine a Vitest | vite.config.js |

Resultados informados durante la revisión inicial asistida:

| Comando en clase-tienda-react | Resultado inicial |
|---|---|
| npm run test:ejecutar -- --reporter=verbose | 3 casos: 1 pasa, 2 fallan por referencias de variables. |
| npm run lint | 0 errores y 4 advertencias. |
| npm run test:cobertura | Proveedor @vitest/coverage-v8 ausente; sin informe de cobertura. |

Estos resultados no corresponden a Boost Level React ni tienen evidencia final adjunta. El informe de entrega exige una nueva corrida sobre código identificado. Adoptar patrones de clase con pruebas de contrato/evento; conservar el trabajo de clase sin sobreescribirlo.

## 5. Repositorios y siguiente paso

Remoto del proyecto: [MarioTepe/Boost-Level-](https://github.com/MarioTepe/Boost-Level-). HEAD auditado: `e073268`. Las nuevas fuentes de planificación están en `docs/ep2/`; el código React se desarrollará en `frontend/`. La carpeta de clase ya tenía modificaciones y archivos sin seguimiento al iniciar esta revisión.

Leer [ERS](02_ERS_v2_requerimientos.md), [arquitectura](03_ARQUITECTURA_PROPUESTA.md), [backlog](04_BACKLOG_Y_ROLES.md), [plan de pruebas](05_PLAN_PRUEBAS.md) y [matriz](07_MATRIZ_TRAZABILIDAD.md). Implementar por incrementos verificables y actualizar el estado de los requisitos al terminar cada uno.

## 6. Material de clases incorporado el 24-10-2026

La carpeta FullStack II amplía la evidencia inicial S7. Que useEffect, persistencia y Router no estuvieran desarrollados en ese ejercicio no significa que no se hayan enseñado: S9/S10/S11 los explican con ejemplos. S10 incluye además rutas protegidas con Navigate y replace, filtros compartibles en la URL y una estructura con páginas separadas de componentes reutilizables.

La [comparación con estas guías](09_CORRESPONDENCIA_GUIAS_CLASE.md) registra correspondencias y diferencias reales del frontend. No se atribuye al docente Context, repositorio único, servicios, simulador idempotente o adaptadores de prueba, que son decisiones del proyecto. Tampoco se presenta la lista de cotejo de la actividad Router como sustituto de la rúbrica EP2.

La revisión inicial identificó HashRouter y componentes agrupados como diferencias respecto de S10/S11. En el incremento posterior se aplicaron BrowserRouter y páginas/componentes en archivos separados, además de trasladar App.jsx a src/. La documentación de correspondencia y el informe identifican la estructura y la nueva medición. Las observaciones de EP1 y del ejercicio de clase anteriores se conservan como diagnóstico histórico.
