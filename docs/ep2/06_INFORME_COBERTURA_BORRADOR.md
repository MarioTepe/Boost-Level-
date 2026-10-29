# Informe de cobertura de pruebas de Boost Level

**Código:** BL-EP2-ICP-001  
**Versión:** 0.11, checkout HTTP y ofertas de demostración  
**Fecha:** 29-10-2026  
**Integrantes:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez  
**Repositorio:** [MarioTepe/Boost-Level-](https://github.com/MarioTepe/Boost-Level-)  
**Sección:** DSY1104. **Docente:** Víctor Hugo Gómez Atabales. **Entrega:** 29-10-2026. **Identidad de fuentes:** manifiesto SHA-256 de la corrida.

Los resultados corresponden a la ejecución final de 33 pruebas después de corregir el checkout HTTP y añadir cuatro ofertas persistentes. Se mantienen Vitest, React Testing Library, V8, las exclusiones y los umbrales del 80%. [El manifiesto](evidencias/fuentes-sha256.json) identifica 110 fuentes medidas. Agregado SHA-256: `3104eeac14c1a1ed3c73ebf5a521f259495260fd08137643da8c4e65f848fb97`.

## Control del documento

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 23-10-2026 | Estructura inicial sin resultados. |
| 0.2 | 23-10-2026 | Alineación con arquitectura, plan y plantilla S5. |
| 0.3 | 24-10-2026 | Medición real de 144 pruebas, análisis de cobertura y evidencias locales. |
| 0.4 | 24-10-2026 | Credenciales retiradas del login; mínimos de rúbrica explicitados; nueva corrida de verificación. |
| 0.5 | 24-10-2026 | BrowserRouter y páginas/componentes por archivo; fuentes identificadas; evidencia de esa medición. |
| 0.6 | 25-10-2026 | Medición histórica de 153 pruebas. |
| 0.7 | 25-10-2026 | Copias de las plantillas del profesor completadas. |
| 0.8 | 26-10-2026 | Suite reducida a 33 casos y nueva medición sin cambios productivos. |
| 0.9 | 27-10-2026 | Revisión de documentos de entrega con los mismos resultados; AWS Academy como etapa final. |
| 0.10 | 27-10-2026 | Correcciones visuales, parche Vite 8.3.5, nueva corrida y verificación del paquete fuente. |
| 0.11 | 29-10-2026 | Checkout HTTP, cuatro ofertas persistentes y nueva medición de los 33 casos. |

| Función | Persona / fecha | Estado |
|---|---|---|
| Elaboración y validación técnica | Evidencias locales del 29-10-2026 | Informe técnico para revisión del equipo |
| Revisión por otro integrante | Pendiente de asignar | No realizada |
| Evaluación docente | Pendiente | No realizada |

## Índice

1. Objeto y alcance
2. Términos, definiciones y abreviaturas
3. Entorno y método de medición
4. Criterios de completitud
5. Resultados de la medición
6. Evaluación de completitud
7. Riesgos residuales
8. Conclusiones y recomendaciones
9. Entregables de prueba
10. Anexos A, B y C

## 1. Objeto y alcance

### 1.1 Objeto

Informar la ejecución automatizada de Boost Level React y contrastarla con los criterios fijados antes de medir. Se distingue el resultado técnico local del cierre académico y documental.

### 1.2 Alcance

El paquete medido es `frontend/`, con `src/**/*.{js,jsx}`: reglas, repositorio, servicios, datos, utilidades, contexto/hooks, rutas, páginas y componentes de tienda/administración. Se midieron 72 archivos productivos. Las pruebas cubren unidad, componentes e integración con almacenamiento controlado.

| Exclusión efectiva | Justificación |
|---|---|
| src/main.jsx | Montaje de React y carga de estilos, sin reglas propias. |
| src/**/*.test.{js,jsx} | Código de pruebas. |
| src/test/** | Setup, factories y helpers de pruebas. |

No se excluye lógica por falta de pruebas. CSS, diseño adaptable, accesibilidad completa y paquete de entrega requieren revisión separada; no forman parte del porcentaje de código.

## 2. Términos, definiciones y abreviaturas

### 2.1 Términos y definiciones

| Término | Significado |
|---|---|
| Caso de prueba | Preparación, acción y expectativa verificable. |
| Sentencias | Sentencias ejecutadas al menos una vez. |
| Ramas | Caminos de decisión recorridos. |
| Funciones | Funciones invocadas. |
| Líneas | Líneas ejecutables recorridas. |
| Umbral | Mínimo fijado antes de medir. |
| Riesgo residual | Riesgo que permanece tras las verificaciones realizadas. |

### 2.2 Abreviaturas

CC: criterio de completitud; NC: elemento no cubierto; RR: riesgo residual; ICP: informe de cobertura de pruebas.

### 2.3 Formas verbales

“Debe” expresa requisito; “debería”, recomendación; “puede”, opción permitida.

## 3. Entorno y método de medición

### 3.1 Entorno de ejecución

| Dato | Valor registrado |
|---|---|
| Inicio local / zona | 29-10-2026 05:19:19 CLST; America/Santiago |
| Inicio UTC de la corrida | 2026-10-29T08:19:19.948Z |
| Sistema | Windows 11, win32 10.0.26200 |
| Node / npm | 24.21.0 / 11.19.0 |
| React / React DOM / Vite | 19.3.0 / 19.3.0 / 8.3.5 |
| Bootstrap / React Bootstrap | 5.3.8 / 2.10.10 |
| Vitest / coverage-v8 | 5.0.5 / 5.0.5 |
| jsdom / Testing Library React | 30.1.3 / 16.3.3 |
| Fuentes | Manifiesto SHA-256 de fuentes, configuración y recursos de la corrida |

Las versiones exactas están fijadas en package.json y package-lock.json. El build final se revisó en un navegador Chromium sobre HTTP local; no se atribuye una versión de navegador no consultada.

### 3.2 Configuración de la cobertura

Configuración efectiva en frontend/vite.config.js: entorno jsdom, setup src/test/setup.js, provider V8 y reporters text/html/json/json-summary. Incluye src/**/*.{js,jsx} con las tres exclusiones de 1.2. Umbrales globales de sentencias, ramas, funciones y líneas: 80% cada uno. allowOnly=false; clearMocks y restoreMocks activos.

El mínimo del 80% procede de S5, sección 3.2. La guía docente S13 confirma Vitest, Testing Library, jsdom y V8; sus secciones 4–5 y 9–13 orientan los casos seleccionados. Las menciones antiguas de Jasmine/Karma permanecen identificadas en el diagnóstico. Compartir vocabulario no significa ejecutar Jasmine ni acreditar una evaluación docente.

### 3.3 Procedimiento de ejecución

1. Ejecutar formato, lint y build, registrar la identidad de las fuentes y conservar la salida.
2. Desde frontend/, ejecutar la corrida única del informe:

```powershell
npm run test:cobertura -- --reporter=verbose --reporter=json --outputFile=../docs/ep2/evidencias/vitest.json
```

3. Guardar salida completa, JSON de casos, coverage-summary.json, coverage-final.json y reporte HTML generados por esa corrida.
4. Compilar con npm run build; no cambiar fuentes entre medición y compilación.
5. Registrar hashes de las fuentes, analizar ramas pendientes y revisar las vistas en navegador.

La salida completa se conserva en [pruebas-cobertura.log](evidencias/pruebas-cobertura.log). Lint y build terminaron con código 0. Se extrajo el ZIP final en una carpeta nueva: npm ci y build finalizaron con código 0. Los 25 archivos compilados coinciden byte por byte con el build principal; registros instalacion-final.log y compilacion-paquete-final.log en evidencias.

## 4. Criterios de completitud

| ID | Criterio | Valor exigido |
|---|---|---|
| CC-01 | Pruebas fallidas | 0 |
| CC-02 | Omitidas o pendientes | 0 skip y 0 todo |
| CC-03 | Sentencias | >=80% |
| CC-04 | Ramas | >=80% |
| CC-05 | Funciones | >=80% |
| CC-06 | Líneas | >=80% |
| CC-07 | Casos de componentes significativos | Al menos 10 |
| CC-08 | Stock, compra e integridad | Escenarios críticos verificados |
| CC-09 | Revisión manual | TM-01 a TM-04 registrados y cerrados |

Los criterios son conjuntos: el porcentaje no reemplaza la verificación funcional ni la revisión de entrega.

## 5. Resultados de la medición

### 5.1 Resumen de la ejecución

| Dato | Resultado |
|---|---|
| Corrida | 2026-10-29T08:19:19.948Z |
| Archivos de prueba | 5 |
| Casos ejecutados / aprobados / fallidos | 33 / 33 / 0 |
| Omitidos / todo | 0 / 0 |
| Duración de terminal / salida | 23,97 s / código 0 |
| src/App.test.jsx | 16 casos |
| src/domain/dominio.test.js | 6 casos |
| src/services/servicios.test.js | 4 casos |
| src/componentes/catalogo/GrillaProductos.test.jsx | 1 casos |
| src/componentes/catalogo/TarjetaProducto.test.jsx | 6 casos |

Hay 33 bloques it, sin matrices it.each, omitidos ni todo. Se distribuyen en 16 casos de interfaz, 7 de catálogo, 6 de dominio y 4 de servicios. Las siete pruebas junto a TarjetaProducto/GrillaProductos usan datos nuevos y Preparar/Actuar/Comprobar; los clics usan userEvent con await. Los flujos de App mantienen fireEvent. El plan identifica diez casos de componentes para ensayar.

### 5.2 Cobertura global

| Métrica | Cubiertos / total | Porcentaje | Umbral | Resultado |
|---|---|---|---|---|
| Sentencias | 759 / 815 | 93,12% | 80% | Cumple |
| Ramas | 636 / 703 | 90,46% | 80% | Cumple |
| Funciones | 316 / 335 | 94,32% | 80% | Cumple |
| Líneas | 669 / 710 | 94,22% | 80% | Cumple |

### 5.3 Cobertura por elemento de prueba

Porcentajes con dos decimales. La última columna indica sentencias no ejecutadas; también hay ramas sin recorrer en archivos con líneas al 100%.

| Archivo relativo a frontend/ | % sentencias | % ramas | % funciones | % líneas | Líneas de sentencias sin ejecutar |
|---|---|---|---|---|---|
| src/componentes/ui/NoEncontrado.jsx | 0,00 | 0,00 | 0,00 | 0,00 | 4 |
| src/paginas/ArticuloPage.jsx | 0,00 | 0,00 | 0,00 | 0,00 | 8, 9, 10, 11, 16, 25 |
| src/paginas/CategoriasPage.jsx | 0,00 | 0,00 | 0,00 | 0,00 | 7, 8, 13, 15, 21 |
| src/paginas/admin/PedidoDetallePage.jsx | 0,00 | 0,00 | 0,00 | 0,00 | 8, 9, 10, 11 |
| src/componentes/ui/FotoProducto.jsx | 33,33 | 25,00 | 50,00 | 33,33 | 10, 11 |
| src/paginas/admin/PedidosPage.jsx | 60,00 | 37,50 | 33,33 | 60,00 | 11, 19 |
| src/componentes/ui/Resumen.jsx | 100,00 | 50,00 | 100,00 | 100,00 | — |
| src/paginas/CompraExitosaPage.jsx | 85,71 | 50,00 | 100,00 | 83,33 | 12 |
| src/paginas/CompraRechazadaPage.jsx | 100,00 | 50,00 | 100,00 | 100,00 | — |
| src/componentes/ui/Icono.jsx | 100,00 | 66,66 | 100,00 | 100,00 | — |
| src/paginas/admin/DashboardPage.jsx | 100,00 | 66,66 | 100,00 | 100,00 | — |
| src/paginas/admin/UsuarioDetallePage.jsx | 85,71 | 66,66 | 100,00 | 100,00 | 13 |
| src/componentes/carrito/LineaCarrito.jsx | 100,00 | 75,00 | 100,00 | 100,00 | — |
| src/componentes/ui/ErrorMensaje.jsx | 100,00 | 75,00 | 100,00 | 100,00 | — |
| src/domain/precios.js | 93,33 | 78,26 | 100,00 | 95,83 | 11, 13 |
| src/paginas/CatalogoPage.jsx | 88,57 | 80,00 | 92,85 | 92,59 | 20, 21, 29, 30 |
| src/hooks/useApp.js | 85,71 | 83,33 | 100,00 | 91,66 | 19, 24 |
| src/paginas/admin/ProductoDetallePage.jsx | 87,50 | 83,33 | 100,00 | 100,00 | 14 |
| src/paginas/admin/UsuarioFormPage.jsx | 92,30 | 84,61 | 100,00 | 100,00 | 13 |
| src/paginas/DetallePage.jsx | 90,90 | 85,71 | 100,00 | 88,88 | 15 |
| src/componentes/ui/Vacio.jsx | 100,00 | 87,50 | 100,00 | 100,00 | — |
| src/paginas/CarritoPage.jsx | 100,00 | 87,50 | 100,00 | 100,00 | — |
| src/contexto/SessionProvider.jsx | 100,00 | 90,00 | 100,00 | 100,00 | — |
| src/componentes/formularios/UsuarioForm.jsx | 100,00 | 91,66 | 100,00 | 100,00 | — |
| src/componentes/ui/Confirmacion.jsx | 100,00 | 91,66 | 100,00 | 100,00 | — |
| src/domain/validaciones.js | 90,10 | 91,96 | 100,00 | 91,54 | 25, 40, 42, 46, 77, 79, 90, 92, 96 |
| src/paginas/CheckoutPage.jsx | 94,87 | 93,75 | 100,00 | 97,29 | 39, 72 |
| src/componentes/layout/Layout.jsx | 100,00 | 94,11 | 100,00 | 100,00 | — |
| src/services/tienda.service.js | 98,11 | 96,87 | 97,87 | 98,92 | 117, 225 |
| src/paginas/admin/ProductoFormPage.jsx | 97,05 | 97,43 | 100,00 | 100,00 | 28 |
| src/App.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/administracion/BajaButton.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/administracion/Estado.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/administracion/Tabla.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/catalogo/GrillaProductos.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/catalogo/TarjetaProducto.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/contenido/BlogCards.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/formularios/Direccion.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/layout/AdminLayout.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/navegacion/RutaAdmin.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/pedidos/Comprobante.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/ui/Campo.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/ui/PageTitle.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/contexto/SesionContext.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/contexto/TiendaContext.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/contexto/TiendaProvider.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/data/blogs.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/data/categorias.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/data/inicial.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/data/productos.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/data/regiones.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/data/usuarios.demo.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/domain/carrito.reducer.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/domain/compra.rules.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/domain/errores.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/domain/esquema.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/BlogsPage.jsx | 0,00 | 100,00 | 0,00 | 0,00 | 5 |
| src/paginas/ContactoPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/InicioPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/LoginPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/NosotrosPage.jsx | 0,00 | 100,00 | 0,00 | 0,00 | 5 |
| src/paginas/RegistroPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/CategoriasAdminPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/CriticosPage.jsx | 0,00 | 100,00 | 0,00 | 0,00 | 8, 9, 10, 18 |
| src/paginas/admin/PerfilPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/ProductosPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/UsuariosPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/repositories/storage.adapter.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/repositories/tienda.repository.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/services/sesion.service.js | 94,73 | 100,00 | 100,00 | 94,44 | 38 |
| src/utils/identificador.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/utils/moneda.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| Total All files | 93,12 | 90,46 | 94,32 | 94,22 | Ver sección 6.2 |

## 6. Evaluación de completitud

### 6.1 Cumplimiento de los criterios

| ID | Valor obtenido | Evaluación |
|---|---|---|
| CC-01 | 0 fallos | Cumple |
| CC-02 | 0 omitidos, 0 todo | Cumple |
| CC-03 | 93,12% | Cumple |
| CC-04 | 90,46% | Cumple |
| CC-05 | 94,32% | Cumple |
| CC-06 | 94,22% | Cumple |
| CC-07 | 23 casos de componentes/interfaz; diez seleccionados en el plan: props, clics, formularios y estado | Cumple |
| CC-08 | Límite 15/16, aceptación/rechazo, escritura fallida e intento repetido | Cumple en entorno automatizado local |
| CC-09 | Responsive y recorrido local registrados; accesibilidad y entrega aún parciales | Pendiente de cierre |

### 6.2 Elementos no cubiertos

| ID | Archivo/línea | Camino no ejecutado | Acción y riesgo |
|---|---|---|---|
| NC-01 | src/componentes/carrito/LineaCarrito.jsx:5,13 | Alternativas de stock insuficiente o producto ya no disponible en una línea. | RR-06; revisar este camino al modificarlo. |
| NC-02 | src/componentes/formularios/UsuarioForm.jsx:22 | Valor inicial alternativo de confirmación de clave. | RR-06; revisar este camino al modificarlo. |
| NC-03 | src/componentes/layout/Layout.jsx:105 | Mensaje de error de sesión sin error de tienda. | RR-06; revisar este camino al modificarlo. |
| NC-04 | src/componentes/ui/Confirmacion.jsx:17 | Alternativa de Tab intermedio en el diálogo. | RR-06; revisar este camino al modificarlo. |
| NC-05 | src/componentes/ui/ErrorMensaje.jsx:4 | Texto alternativo de error sin propiedad mensaje. | RR-06; revisar este camino al modificarlo. |
| NC-06 | src/componentes/ui/FotoProducto.jsx:6,10,11 | Callback de imagen rota y guarda del logo alternativo. | RR-06; revisar este camino al modificarlo. |
| NC-07 | src/componentes/ui/Icono.jsx:27 | Ruta del icono alternativo para un nombre desconocido. | RR-06; revisar este camino al modificarlo. |
| NC-08 | src/componentes/ui/NoEncontrado.jsx:3,4 | Componente no encontrado no renderizado por la suite reducida. | RR-06; revisar este camino al modificarlo. |
| NC-09 | src/componentes/ui/Resumen.jsx:14,15 | Rótulo y monto del resumen cuando existe descuento Duoc. | RR-06; revisar este camino al modificarlo. |
| NC-10 | src/componentes/ui/Vacio.jsx:11 | Alternativa del enlace del estado vacío. | RR-06; revisar este camino al modificarlo. |
| NC-11 | src/contexto/SessionProvider.jsx:21 | Logout fallido: la sesión no se limpia en el estado del provider. | RR-06; revisar este camino al modificarlo. |
| NC-12 | src/domain/precios.js:3,11,12,13,17,18 | Producto ausente, descuento de cliente y protección del cálculo porcentual con precio base cero. | RR-06; revisar este camino al modificarlo. |
| NC-13 | src/domain/validaciones.js:24,25,40,41,42,46,76,77,79,84,90,91,92,95,96 | Validaciones alternativas de campos y límites fuera del conjunto esencial. | RR-06; revisar este camino al modificarlo. |
| NC-14 | src/hooks/useApp.js:19,24 | Fallo al recuperar o restablecer datos locales. | RR-06; revisar este camino al modificarlo. |
| NC-15 | src/paginas/ArticuloPage.jsx:8,9,10,11,16,25 | Página de artículo no visitada por la suite reducida. | RR-06; revisar este camino al modificarlo. |
| NC-16 | src/paginas/BlogsPage.jsx:5 | Página de blogs no visitada por la suite reducida. | RR-06; revisar este camino al modificarlo. |
| NC-17 | src/paginas/CarritoPage.jsx:54 | Presentación alternativa del carrito vacío. | RR-06; revisar este camino al modificarlo. |
| NC-18 | src/paginas/CatalogoPage.jsx:20,21,28,29,30,97,112 | Alternativas de filtro en URL, orden y ofertas sin coincidencias. | RR-06; revisar este camino al modificarlo. |
| NC-19 | src/paginas/CategoriasPage.jsx:7,8,13,15,21 | Página pública de categorías no visitada por la suite reducida. | RR-06; revisar este camino al modificarlo. |
| NC-20 | src/paginas/CheckoutPage.jsx:39,71,72 | Segundo submit bloqueado por ref y cambios de datos antes de confirmar. | RR-07; revisar este camino al modificarlo. |
| NC-21 | src/paginas/CompraExitosaPage.jsx:11,12 | Acceso al resultado sin un pedido confirmado. | RR-06; revisar este camino al modificarlo. |
| NC-22 | src/paginas/CompraRechazadaPage.jsx:15 | Resultado de rechazo con datos de navegación incompletos. | RR-06; revisar este camino al modificarlo. |
| NC-23 | src/paginas/DetallePage.jsx:14,15,45 | ID inválido o disponibilidad alternativa del detalle. | RR-06; revisar este camino al modificarlo. |
| NC-24 | src/paginas/NosotrosPage.jsx:5 | Página informativa no visitada por la suite reducida. | RR-06; revisar este camino al modificarlo. |
| NC-25 | src/paginas/admin/CriticosPage.jsx:8,9,10,18 | Pantalla administrativa de stock crítico no visitada; selector probado por separado. | RR-06; revisar este camino al modificarlo. |
| NC-26 | src/paginas/admin/DashboardPage.jsx:16 | Alternativa de indicador cuando no existen ventas. | RR-06; revisar este camino al modificarlo. |
| NC-27 | src/paginas/admin/PedidoDetallePage.jsx:8,9,10,11 | Detalle administrativo del pedido no visitado por la suite reducida. | RR-06; revisar este camino al modificarlo. |
| NC-28 | src/paginas/admin/PedidosPage.jsx:11,16,19,24 | Filas de pedidos y enlace al detalle administrativo. | RR-06; revisar este camino al modificarlo. |
| NC-29 | src/paginas/admin/ProductoDetallePage.jsx:14 | Producto no encontrado en administración. | RR-06; revisar este camino al modificarlo. |
| NC-30 | src/paginas/admin/ProductoFormPage.jsx:28 | Retorno de producto no encontrado al abrir un ID inexistente. | RR-06; revisar este camino al modificarlo. |
| NC-31 | src/paginas/admin/UsuarioDetallePage.jsx:13,33 | Usuario no encontrado y presentación alternativa del historial. | RR-06; revisar este camino al modificarlo. |
| NC-32 | src/paginas/admin/UsuarioFormPage.jsx:13,16 | Usuario inexistente o fallo de guardado. | RR-06; revisar este camino al modificarlo. |
| NC-33 | src/services/sesion.service.js:38 | Error al eliminar la sesión persistida. | RR-06; revisar este camino al modificarlo. |
| NC-34 | src/services/tienda.service.js:112,117,225 | Alternativas de datos iniciales y validación del servicio no conservadas en los cuatro casos. | RR-06; revisar este camino al modificarlo. |

### 6.3 Análisis de los resultados

La métrica global menor es ramas: quedan 67 caminos sin ejecutar de 703. Incluyen páginas informativas no visitadas por esta suite, detalles administrativos, validaciones alternativas y recuperación de errores. No todos los archivos alcanzan el 80% individual: el umbral exigido es global. Ello acredita ejecución de esos caminos con las aserciones existentes; no garantiza ausencia de defectos.

Los tests contrastan cantidades/totales y el documento persistido, además de mensajes visibles. Se prueban estado previo intacto ante rechazo o fallo de escritura e identidad del pedido ante un intento repetido.

### 6.4 Desviaciones e impedimentos

La aplicación está implementada. La reducción histórica dejó 33 casos; esta revisión conserva ese número y los umbrales/exclusiones. El código productivo final añade ofertas y sustituye la generación del identificador para funcionar en HTTP. No redistribuye los casos retirados en un bucle o test gigante. Las variantes retiradas dejan de tener comprobación automática; el plan distingue ese alcance.  La nueva guía sustenta Vitest como ejecutor. No existe backend: la entrega actual es una demostración frontend con persistencia en el navegador. AWS EC2 fue publicado el 28-10-2026; la actualización final necesita nueva verificación pública. Instalación y compilación limpias registradas en informe 11; falta revisión por un integrante diferente. Los resultados iniciales de clase-tienda-react pertenecen al diagnóstico y no se mezclan con estos resultados.

## 7. Riesgos residuales

| ID | Riesgo | Probabilidad / impacto | Tratamiento |
|---|---|---|---|
| RR-01 | Menciones antiguas de Jasmine/Karma en los PDF | Baja / Media | S13 documenta Vitest; usar esa guía como referencia técnica y mantener identificadas las fuentes. |
| RR-02 | Estado local no compartido de forma transaccional entre pestañas o dispositivos | Alta / Alta fuera de demo | Demostración en una pestaña; futura API. |
| RR-03 | jsdom y recorrido local no acreditan accesibilidad completa ni todos los navegadores | Media / Media | Completar TM-02 y revisión cruzada. |
| RR-04 | Roles y claves demo en cliente no son autenticación de servidor | Alta / Alta para producción | Datos ficticios; backend futuro si se amplía alcance. |
| RR-05 | Reglas de entrega/descuento propuestas requieren revisión del equipo | Media / Media | Revisar ERS antes de cerrar documentos. |
| RR-06 | Alternativas de código identificadas en 6.2 no recorridas por la suite | Baja / Media | Incluye todos los NC de 6.2 excepto NC-20; revisar cada camino al modificarlo. |
| RR-07 | Bloqueo de doble submit no cubierto directamente en componente | Baja / Alta | Incluye NC-20. Conservar idempotencia del servicio y revisar doble interacción en navegador. |
| RR-08 | La instalación reproducible depende del entorno Node y del lockfile | Media / Alta para entrega | Conservar lockfile y registro de instalación limpia; repetir si cambia el paquete. |

## 8. Conclusiones y recomendaciones

### 8.1 Dictamen

**La suite reducida supera los criterios automatizados locales; el cierre completo de entrega sigue pendiente.** CC-01 a CC-08 cumplen; CC-09 y la revisión formal permanecen pendientes. No se declara aprobación del equipo ni del docente.

### 8.2 Recomendaciones

Revisar código y guía de explicación entre los tres integrantes, completar teclado/formularios con una segunda persona, conservar la aclaración de alcance solo frontend comunicada por el equipo y consultar el registro de instalación desde el paquete final. Repetir cobertura si cambian código/configuración. El umbral es global: algunos archivos individuales tienen menos del 80%; sus caminos pendientes figuran en 6.2 y no se ocultaron mediante exclusiones.

### 8.3 Lecciones aprendidas

Separar regla de stock del botón permitió probar el límite aunque cambie la interfaz. Guardar pedido, stock y carrito en un documento evitó estados parciales al simular un fallo. La retrospectiva personal del equipo queda pendiente; estas observaciones proceden de las verificaciones técnicas.

## 9. Entregables de prueba

| Artefacto | Ubicación y estado |
|---|---|
| Plan y matriz | 05_PLAN_PRUEBAS.md y 07_MATRIZ_TRAZABILIDAD.md |
| Tests y configuración | frontend/src y frontend/vite.config.js |
| Ejecución | [vitest.json](evidencias/vitest.json) y [salida completa](evidencias/pruebas-cobertura.log) |
| Totales archivados | [coverage-summary.json](evidencias/coverage-summary.json) |
| Identidad de fuentes | [fuentes-sha256.json](evidencias/fuentes-sha256.json) |
| HTML y JSON detallado | frontend/coverage/index.html y coverage-final.json, generados localmente y excluidos de Git |
| Lint / compilación | [lint.log](evidencias/lint.log), [build.log](evidencias/build.log) |
| Revisión manual y capturas | [Registro de evidencias](evidencias/README.md) |
| Informe académico / adjuntos | Copias Word/Excel completadas y coverage.zip; revisión por otro integrante pendiente |

## Anexo A. Evidencias

A.1: salida completa, JSON de casos y resumen V8 enlazados en sección 9. A.2: HTML local frontend/coverage/index.html con los totales de 5.2. A.3: FotoProducto.jsx muestra el fallback de imagen no recorrido y 33,33% de cobertura de líneas; su detalle figura en HTML y sección 6.2. El [registro de navegador](evidencias/README.md) identifica rutas, dimensiones y límites de la revisión manual.

## Anexo B. Guía de llenado

Las cifras de secciones 5 y 6 proceden de una sola corrida, identificada por su inicio UTC. Las versiones proceden del entorno y lock. No sustituir resultados por los del ejercicio de clases ni convertir propuestas de revisión en firmas. Tras un cambio de fuentes, generar nueva evidencia y conservar historial documental.

## Anexo C. Correspondencia con la plantilla

Se conserva el orden de secciones 1–9 y anexos A/B/C de S5. La plantilla declara correspondencia con ISO/IEC/IEEE 29119-3:2021; este documento no certifica independientemente esa norma. El formato académico final y su revisión dependen de las instrucciones del docente.
