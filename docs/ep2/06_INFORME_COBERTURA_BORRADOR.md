# Informe de cobertura de pruebas de Boost Level

**Código:** BL-EP2-ICP-001  
**Versión:** 0.6, pruebas acotadas según la guía docente S13  
**Fecha:** 25-10-2026  
**Integrantes:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez  
**Repositorio:** [MarioTepe/Boost-Level-](https://github.com/MarioTepe/Boost-Level-)  
**Sección:** pendiente de registrar. **Rama:** main. **Commit del código medido:** e093648acae1d2b4851857991200a94cde654110.

Los resultados corresponden al código de ese commit, con BrowserRouter y páginas/componentes separados conforme a las guías. [El manifiesto de fuentes](evidencias/fuentes-sha256.json) conserva los hashes de código, configuración, lock y recursos. Agregado SHA-256: `88bc7e73b0df9a63ffe29fac0c23891ae21e3772be8e755eacde1e45e06cc677`. Este informe y las evidencias se registran después, en un commit de documentación, sin cambiar las fuentes medidas.

## Control del documento

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 23-10-2026 | Estructura inicial sin resultados. |
| 0.2 | 23-10-2026 | Alineación con arquitectura, plan y plantilla S5. |
| 0.3 | 24-10-2026 | Medición real de 144 pruebas, análisis de cobertura y evidencias locales. |
| 0.4 | 24-10-2026 | Credenciales retiradas del login; mínimos de rúbrica explicitados; nueva corrida de verificación. |
| 0.5 | 24-10-2026 | BrowserRouter y páginas/componentes por archivo; código versionado; evidencia nueva sobre el commit indicado. |
| 0.6 | 25-10-2026 | Diez casos concretos de catálogo según S13; se conserva el resto de la suite y no cambia código de producción. |

| Función | Persona / fecha | Estado |
|---|---|---|
| Elaboración y validación técnica | Evidencias locales del 25-10-2026 | Informe técnico para revisión del equipo |
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

El paquete medido es `frontend/`, con `src/**/*.{js,jsx}`: reglas, repositorio, servicios, datos, utilidades, contexto/hooks, rutas, páginas y componentes de tienda/administración. Se midieron 71 archivos productivos. Las pruebas cubren unidad, componentes e integración con almacenamiento controlado.

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
| Inicio local / zona | 25-10-26, 12:40:04; America/Santiago |
| Inicio UTC de la corrida | 2026-10-25T15:40:04.873Z |
| Sistema | Windows 11, win32 10.0.26200 |
| Node / npm | 24.21.0 / 11.19.0 |
| React / React DOM / Vite | 19.3.0 / 19.3.0 / 8.3.0 |
| Bootstrap / React Bootstrap | 5.3.8 / 2.10.10 |
| Vitest / coverage-v8 | 5.0.5 / 5.0.5 |
| jsdom / Testing Library React | 30.1.3 / 16.3.3 |
| Fuentes | main, commit indicado en cabecera, código sin cambios pendientes al medir |

Las versiones exactas están fijadas en package.json y package-lock.json. El servidor local se revisó en el navegador Chromium integrado de Codex; no se atribuye una versión de navegador no consultada.

### 3.2 Configuración de la cobertura

Configuración efectiva en frontend/vite.config.js: entorno jsdom, setup src/test/setup.js, provider V8 y reporters text/html/json/json-summary. Incluye src/**/*.{js,jsx} con las tres exclusiones de 1.2. Umbrales globales de sentencias, ramas, funciones y líneas: 80% cada uno. allowOnly=false; clearMocks y restoreMocks activos.

El mínimo del 80% procede de S5, sección 3.2. La guía docente S13 confirma Vitest, Testing Library, jsdom y V8; sus secciones 4–5 y 9–13 orientan los diez casos seleccionados. Las menciones antiguas de Jasmine/Karma permanecen identificadas en el diagnóstico. Compartir vocabulario no significa ejecutar Jasmine ni acreditar una evaluación docente.

### 3.3 Procedimiento de ejecución

1. Ejecutar formato, lint y build, registrar el commit de código y conservar la salida.
2. Desde frontend/, ejecutar la corrida única del informe:

```powershell
npm run test:cobertura -- --reporter=verbose --reporter=json --outputFile=../docs/ep2/evidencias/vitest.json
```

3. Guardar salida completa, JSON de casos, coverage-summary.json, coverage-final.json y reporte HTML generados por esa corrida.
4. Compilar con npm run build; no cambiar fuentes entre medición y compilación.
5. Registrar hashes de las fuentes, analizar ramas pendientes y revisar las vistas en navegador.

La salida completa se conserva en [pruebas-cobertura.log](evidencias/pruebas-cobertura.log). Lint y build terminaron con código 0. No se hizo una instalación desde un ZIP limpio: esa verificación sigue pendiente.

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
| Corrida | 2026-10-25T15:40:04.873Z |
| Archivos de prueba | 5 |
| Casos ejecutados / aprobados / fallidos | 153 / 153 / 0 |
| Omitidos / todo | 0 / 0 |
| Duración de terminal / salida | 57,28 s / código 0 |
| src/App.test.jsx | 52 casos |
| src/domain/dominio.test.js | 72 casos |
| src/services/servicios.test.js | 19 casos |
| src/componentes/catalogo/GrillaProductos.test.jsx | 3 casos |
| src/componentes/catalogo/TarjetaProducto.test.jsx | 7 casos |

Los 153 casos incluyen variantes parametrizadas; no equivalen a 153 requisitos diferentes. El contador de suites del JSON incluye grupos describe; los 5 archivos constan en testResults. Los diez casos de catálogo están junto a sus componentes, usan Preparar/Actuar/Comprobar y userEvent con await. Los otros archivos conservan su organización agrupada y las interacciones anteriores.

### 5.2 Cobertura global

| Métrica | Cubiertos / total | Porcentaje | Umbral | Resultado |
|---|---|---|---|---|
| Sentencias | 795 / 800 | 99,37% | 80% | Cumple |
| Ramas | 672 / 686 | 97,95% | 80% | Cumple |
| Funciones | 331 / 331 | 100,00% | 80% | Cumple |
| Líneas | 694 / 697 | 99,56% | 80% | Cumple |

### 5.3 Cobertura por elemento de prueba

Porcentajes con dos decimales. La última columna indica sentencias no ejecutadas; también hay ramas sin recorrer en archivos con líneas al 100%.

| Archivo relativo a frontend/ | % sentencias | % ramas | % funciones | % líneas | Líneas de sentencias sin ejecutar |
|---|---|---|---|---|---|
| src/componentes/ui/ErrorMensaje.jsx | 100,00 | 75,00 | 100,00 | 100,00 | — |
| src/componentes/ui/FotoProducto.jsx | 66,66 | 75,00 | 100,00 | 66,66 | 11 |
| src/paginas/admin/ProductosPage.jsx | 100,00 | 75,00 | 100,00 | 100,00 | — |
| src/hooks/useApp.js | 85,71 | 83,33 | 100,00 | 91,66 | 19, 24 |
| src/paginas/admin/PedidosPage.jsx | 100,00 | 87,50 | 100,00 | 100,00 | — |
| src/contexto/SessionProvider.jsx | 100,00 | 90,00 | 100,00 | 100,00 | — |
| src/componentes/formularios/UsuarioForm.jsx | 100,00 | 91,66 | 100,00 | 100,00 | — |
| src/componentes/ui/Confirmacion.jsx | 100,00 | 91,66 | 100,00 | 100,00 | — |
| src/paginas/DetallePage.jsx | 100,00 | 91,66 | 100,00 | 100,00 | — |
| src/paginas/admin/UsuarioFormPage.jsx | 100,00 | 92,30 | 100,00 | 100,00 | — |
| src/componentes/layout/Layout.jsx | 100,00 | 94,11 | 100,00 | 100,00 | — |
| src/paginas/CatalogoPage.jsx | 97,14 | 96,00 | 100,00 | 96,29 | 29 |
| src/paginas/CheckoutPage.jsx | 97,43 | 96,87 | 100,00 | 100,00 | 38 |
| src/App.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/administracion/BajaButton.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/administracion/Estado.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/administracion/Tabla.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/carrito/LineaCarrito.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/catalogo/GrillaProductos.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/catalogo/TarjetaProducto.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/contenido/BlogCards.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/formularios/Direccion.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/layout/AdminLayout.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/navegacion/RutaAdmin.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/pedidos/Comprobante.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/ui/Campo.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/ui/Icono.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/ui/NoEncontrado.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/ui/PageTitle.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/ui/Resumen.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/componentes/ui/Vacio.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
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
| src/domain/precios.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/domain/validaciones.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/CategoriasAdminPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/CriticosPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/DashboardPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/PedidoDetallePage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/PerfilPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/ProductoDetallePage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/ProductoFormPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/UsuarioDetallePage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/admin/UsuariosPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/ArticuloPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/BlogsPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/CarritoPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/CategoriasPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/CompraExitosaPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/CompraRechazadaPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/ContactoPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/InicioPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/LoginPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/NosotrosPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/paginas/RegistroPage.jsx | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/repositories/storage.adapter.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/repositories/tienda.repository.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/services/sesion.service.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/services/tienda.service.js | 100,00 | 100,00 | 100,00 | 100,00 | — |
| src/utils/moneda.js | 100,00 | 100,00 | 100,00 | 100,00 | — |

## 6. Evaluación de completitud

### 6.1 Cumplimiento de los criterios

| ID | Valor obtenido | Evaluación |
|---|---|---|
| CC-01 | 0 fallos | Cumple |
| CC-02 | 0 omitidos, 0 todo | Cumple |
| CC-03 | 99,37% | Cumple |
| CC-04 | 97,95% | Cumple |
| CC-05 | 100,00% | Cumple |
| CC-06 | 99,56% | Cumple |
| CC-07 | Diez casos seleccionados de componentes más 52 casos de UI/integración: props, clics, formularios, rutas y estados | Cumple |
| CC-08 | Límite 15/16, revalidación, aceptación/rechazo, escritura fallida, intento repetido y snapshot histórico | Cumple en entorno automatizado local |
| CC-09 | Responsive y recorrido local registrados; accesibilidad y entrega aún parciales | Pendiente de cierre |

### 6.2 Elementos no cubiertos

| ID | Archivo/línea | Camino no ejecutado | Acción y riesgo |
|---|---|---|---|
| NC-01 | src/componentes/formularios/UsuarioForm.jsx:22 | Confirmación vacía para valores iniciales sin clave; camino defensivo. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-02 | src/componentes/layout/Layout.jsx:105 | Presentación del error de sesión sin error de tienda. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-03 | src/componentes/ui/Confirmacion.jsx:17 | Alternativa de Tab intermedio en el diálogo; extremos y Escape están probados. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-04 | src/componentes/ui/ErrorMensaje.jsx:4 | Texto alternativo error.message cuando no hay error.mensaje. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-05 | src/componentes/ui/FotoProducto.jsx:10, 11 | Reemplazar una imagen rota por el logo; la guarda que evita el ciclo del fallback sí se ejecuta. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-06 | src/contexto/SessionProvider.jsx:21 | Logout que falla al eliminar sesión; el adaptador sí se comprueba con fallos en servicios. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-07 | src/hooks/useApp.js:19, 24 | Cancelación del reset por logout fallido y catch del reset; falta comprobar esos avisos por UI. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-08 | src/paginas/CatalogoPage.jsx:28, 29, 97 | Eliminar un parámetro de filtro y alternativa de limpiar filtros en ofertas. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-09 | src/paginas/CheckoutPage.jsx:38 | Retorno temprano del ref por un segundo submit bloqueado; el servicio idempotente sí está comprobado. | RR-07; ampliar el caso correspondiente si cambia este camino. |
| NC-10 | src/paginas/DetallePage.jsx:42 | Rótulo de detalle sin stock; catálogo agotado y reglas de stock sí están probados. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-11 | src/paginas/admin/PedidosPage.jsx:24 | Rótulo Cliente del pedido en administración frente a Invitado. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-12 | src/paginas/admin/ProductosPage.jsx:40 | Fallback del nombre de categoría en la lista administrativa. | RR-06; ampliar el caso correspondiente si cambia este camino. |
| NC-13 | src/paginas/admin/UsuarioFormPage.jsx:16 | Guardar cliente fallido desde esa pantalla; validación/servicio sí están probados. | RR-06; ampliar el caso correspondiente si cambia este camino. |

### 6.3 Análisis de los resultados

La métrica global menor es ramas: quedan 14 caminos sin ejecutar de 686. Se concentran en alternativas defensivas y presentación de UI. Reglas de stock/precios/validación, repositorio y servicios tienen 100% en las cuatro métricas de esta corrida. Ello acredita ejecución de esos caminos con las aserciones existentes; no garantiza ausencia de defectos.

Los tests contrastan cantidades/totales y el documento persistido, además de mensajes visibles. Se prueban estado previo intacto ante rechazo o fallo de escritura e identidad del pedido ante un intento repetido.

### 6.4 Desviaciones e impedimentos

El código ya está implementado y versionado. El ajuste de S13 reemplaza un caso de tarjeta que mezclaba varios comportamientos por diez casos concretos, sin cambiar código de producción ni añadir funcionalidades. La nueva guía sustenta Vitest como ejecutor. No existe backend: la entrega actual es una demostración local conforme al alcance documentado. Falta revisión por un integrante diferente y verificación de los paquetes finales. Los resultados iniciales de clase-tienda-react pertenecen al diagnóstico y no se mezclan con estos resultados.

## 7. Riesgos residuales

| ID | Riesgo | Probabilidad / impacto | Tratamiento |
|---|---|---|---|
| RR-01 | Menciones antiguas de Jasmine/Karma en los PDF | Baja / Media | S13 documenta Vitest; usar esa guía como referencia técnica y mantener identificadas las fuentes. |
| RR-02 | Estado local no compartido de forma transaccional entre pestañas o dispositivos | Alta / Alta fuera de demo | Demostración en una pestaña; futura API. |
| RR-03 | jsdom y recorrido local no acreditan accesibilidad completa ni todos los navegadores | Media / Media | Completar TM-02 y revisión cruzada. |
| RR-04 | Roles y claves demo en cliente no son autenticación de servidor | Alta / Alta para producción | Datos ficticios; backend futuro si se amplía alcance. |
| RR-05 | Reglas de entrega/descuento propuestas requieren revisión del equipo | Media / Media | Revisar ERS antes de cerrar documentos. |
| RR-06 | Alternativas de interfaz identificadas en 6.2 no recorridas | Baja / Media | Revisar caminos y ampliar pruebas si cambia esa UI. |
| RR-07 | Bloqueo de doble submit no cubierto directamente en componente | Baja / Alta | Conservar idempotencia del servicio, ya comprobada; revisar doble interacción en navegador. |
| RR-08 | Paquete de entrega no verificado desde una copia limpia | Media / Alta para entrega | Fuentes medidas tienen commit y manifiesto; completar ZIP e instalación limpia. |

## 8. Conclusiones y recomendaciones

### 8.1 Dictamen

**La implementación satisface los criterios automatizados locales; todavía no cumple el cierre completo de entrega.** CC-01 a CC-08 cumplen; CC-09 y la revisión formal permanecen pendientes. No se declara aprobación del equipo ni del docente.

### 8.2 Recomendaciones

Revisar código y guía de explicación entre los tres integrantes, completar teclado/formularios con una segunda persona, confirmar herramienta y alcance con el profesor y verificar la instalación desde el paquete final. Repetir cobertura si cambian código/configuración. El umbral es global: algunos archivos individuales tienen menos del 80%; sus caminos pendientes figuran en 6.2 y no se ocultaron mediante exclusiones.

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
| Informe académico / adjuntos | Revisión final, formato exigido y coverage.zip pendientes |

## Anexo A. Evidencias

A.1: salida completa, JSON de casos y resumen V8 enlazados en sección 9. A.2: HTML local frontend/coverage/index.html con los totales de 5.2. A.3: FotoProducto.jsx muestra una alternativa de fallback no recorrida y menor cobertura de líneas (66,66%); su detalle figura en HTML y sección 6.2. El [registro de navegador](evidencias/README.md) identifica rutas, dimensiones y límites de la revisión manual.

## Anexo B. Guía de llenado

Las cifras de secciones 5 y 6 proceden de una sola corrida, identificada por su inicio UTC. Las versiones proceden del entorno y lock. No sustituir resultados por los del ejercicio de clases ni convertir propuestas de revisión en firmas. Tras un cambio de fuentes, generar nueva evidencia y conservar historial documental.

## Anexo C. Correspondencia con la plantilla

Se conserva el orden de secciones 1–9 y anexos A/B/C de S5. La plantilla declara correspondencia con ISO/IEC/IEEE 29119-3:2021; este documento no certifica independientemente esa norma. El formato académico final y su revisión dependen de las instrucciones del docente.
