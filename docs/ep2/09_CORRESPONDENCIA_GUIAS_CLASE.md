# Correspondencia con las guías de FullStack II

**Fecha:** 25-10-2026. **Revisión:** 0.3, pruebas según S13 y alcance acotado. **Integrantes:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez.

## 1. Material revisado

Las rutas de los originales son relativas a la carpeta de trabajo ProyectoFullStack; se conservan sin modificaciones.

| Fuente | Original | Contenido |
|---|---|---|
| S9 | FullStack II/Introduccion a react/guia-react-alumnos.html | Guía de cinco clases con código y ejercicios editables. |
| S10 | FullStack II/guia-react-router/guia-react-router-alumnos.html | Tres módulos sobre Router y diseño adaptable; secciones 1–23. |
| S11 | FullStack II/Introduccion a react/React_5_clases_DSY1104.pptx | 52 diapositivas de las cinco clases de introducción. |
| S12 | FullStack II/guia-react-router/01-punto-de-partida/ | Proyecto inicial de catálogo/detalle mediante estado; punto de partida anterior a instalar Router. |

El archivo HTML de Router explica etapas posteriores que no están implementadas en S12. La guía contiene ejemplos ejecutables; no es correcto limitar el contenido enseñado a lo que ya aparece en App.jsx del punto de partida.

## 2. Fundamentos de React

Rutas de implementación relativas a frontend/.

| Contenido de clase | Ubicación docente | Implementación actual | Correspondencia y límite |
|---|---|---|---|
| Vite, main.jsx, App.jsx y JSX | S9, clase 1; S11, diaps. 8–11 | main.jsx, App.jsx, vite.config.js | Mismo arranque y compilación; main y App están en src/. |
| Componentes funcionales, import/export | S9, clase 2; S11, diaps. 18–22 | componentes/ y paginas/ | Cada componente/página JSX está en su archivo, con export default e import correspondiente. |
| React Bootstrap | S9, clases 2–3; S11, diaps. 20–21 | componentes/catalogo/TarjetaProducto.jsx y GrillaProductos.jsx | Card, Button, Badge, Row y Col; otros elementos usan HTML y clases Bootstrap propias. No se afirma que toda la UI use componentes React Bootstrap. |
| Props, map y key | S9, clase 3 | TarjetaProducto.jsx y GrillaProductos.jsx | Reciben datos y callback del padre; key usa ID estable en Col. La página conecta el servicio de carrito. |
| Estado y eventos | S9, clase 4; S11, diaps. 35–40 | contexto/ y formularios en paginas/ | useState y handlers onClick/onChange/onSubmit. Se comparte el estado por Context, una decisión adicional. |
| Actualización inmutable | S9, clase 4; S11, diap. 38 | domain/carrito.reducer.js | find, map, filter y spread; no modifica las líneas originales. |
| Datos derivados | S9, clase 5; S11, diap. 44 | domain/precios.js y paginas/CatalogoPage.jsx | Totales y lista filtrada se calculan desde los datos vigentes. No hay un useState duplicado para el total. |
| Formularios controlados | S9, clase 5; S11, diap. 43 | UsuarioForm.jsx, CheckoutPage.jsx y páginas de administración | value enlazado a estado y onChange que lo actualiza. |
| useEffect y limpieza | S9, clase 5; S11, diap. 45 | TiendaProvider.jsx, Layout.jsx y Confirmacion.jsx | Efectos para suscripción/limpieza, navegación visual y foco de diálogo. La suscripción al repositorio es una aplicación adicional del concepto. |
| localStorage y JSON | S9, clase 5; S11, diap. 46 | repositories/storage.adapter.js y tienda.repository.js | Mismo mecanismo de persistencia. El proyecto añade validación y guardado conjunto antes de publicar el estado; no usa el efecto de escritura del ejemplo literalmente. |
| build y preview | S9, cierre de clase 5; S11, diap. 47 | Scripts en package.json | npm run build y npm run preview; evidencia local en informe. |

## 3. React Router

| Contenido de S10 | Sección | Código actual | Evaluación de correspondencia |
|---|---|---|---|
| BrowserRouter en main.jsx | 4 y 22 | main.jsx monta BrowserRouter | Aplicado como en la guía; basename utiliza la base configurada por Vite. |
| Routes y Route en App | 5 | App.jsx | Misma forma element={<Componente />}, rutas públicas y administrativas. |
| Link/NavLink | 6 | Layout.jsx y enlaces de paginas/ | Navegación de la SPA sin recargar. El único a interno es el salto accesible al contenido; mueve foco, no cambia de página. |
| Layout con Outlet | 7 | componentes/layout/Layout.jsx y AdminLayout.jsx | Layout público y administrativo anidados; las páginas aparecen en Outlet. |
| 404 con path="*" | 8 | App.jsx y NoEncontrado.jsx | Estado definido para ruta desconocida. También se manejan IDs y slugs inexistentes. |
| Parámetro :id con useParams | 10 | Catálogo, detalle, usuarios y pedidos | Mismo concepto. Los IDs de productos son códigos de texto; no se convierten a Number como los IDs numéricos del ejemplo docente. |
| useNavigate | 11 | Login, formularios y checkout | Navegación tras eventos/resultados; no se llama durante render. |
| Grilla responsiva | 12 | componentes/catalogo/GrillaProductos.jsx | Row/Col con puntos de corte para una, dos, tres o cuatro columnas según ancho. |
| Páginas y componentes; Atomic Design | 13 | paginas/ y componentes/ | Páginas por archivo y piezas reutilizables separadas. Se aplicó la estructura simple de la guía, sin carpetas vacías por nivel. |
| useSearchParams | 14 | CatalogoPage | Búsqueda q, categoría y orden se guardan en URL. El nombre del parámetro puede variar sin cambiar el concepto. |
| useLocation | 15 | CheckoutPage.jsx, Layout.jsx y App.jsx | Datos de reintento, cambios de ruta y claves de formularios. |
| Estado compartido y localStorage | 16 | Providers y repositorio | El estado está sobre las rutas; usa Context en lugar de entregar todo mediante props desde App. Persistencia validada y recuperación de errores. |
| Navigate y replace | 17 | componentes/navegacion/RutaAdmin.jsx | Redirige al login si no hay rol admin; protección de navegación local. Checkout vacío muestra estado y enlace, en vez de redirigir como el ejemplo de la guía. |
| Compilación y publicación | 18 | build/preview y public/_redirects | Compilación y recarga local comprobadas. Regla de fallback preparada para un alojamiento compatible; despliegue público pendiente. |

## 4. Diferencias que debemos poder explicar

### Router y alojamiento

S10 usa BrowserRouter y lo incluye en su lista de cotejo. La primera versión del proyecto tenía HashRouter; el incremento actual adopta BrowserRouter en main.jsx y rutas como /productos/JM001. Se comprobó el acceso directo y la recarga del comprobante en el servidor local.

Como explica S10, sección 18, el alojamiento debe devolver index.html al acceder a una ruta de la SPA. public/_redirects prepara esa regla para un alojamiento compatible; VITE_BASE_PATH permite compilar para una subcarpeta y el router utiliza la misma base. Subir el código a GitHub no equivale a desplegar el sitio ni a verificar el alojamiento público.

La lista de cotejo de S10 pertenece a la actividad de Router. La rúbrica EP2 y sus diez pruebas siguen en S2; no se suman ni se intercambian sus puntajes automáticamente.

### Organización de componentes y páginas

S11, diapositiva 18, propone un componente por archivo. S10, sección 13, distingue componentes reutilizables de páginas por ruta. La implementación aplica ese criterio: las páginas están en paginas/, las piezas reutilizables en componentes/ y el mapa de rutas en App.jsx.

Se actualizaron imports, pruebas y documentación. TarjetaProducto y GrillaProductos reciben datos y callbacks por props; las páginas conectan el estado y los servicios. La propia guía aterriza Atomic Design con una estructura simple de componentes y páginas; se aplicó esa organización sin introducir carpetas vacías de átomos/moléculas.

### Estado, persistencia y compra

useEffect y localStorage sí forman parte de las clases. La diferencia está en cómo se usan: el profesor muestra guardar el carrito después de un cambio de estado; el proyecto valida y guarda primero pedido/stock/carrito, y solo después comunica el estado confirmado a React. La elección permite conservar el estado anterior si falla el almacenamiento, comportamiento que está probado.

Context/useContext, repositorio único, servicios, validación completa del documento, useRef de bloqueo e idempotencia del intento de compra no aparecen desarrollados en estas guías. Son ampliaciones para los requisitos de EP2 y deben explicarse desde el código y sus pruebas.

## 5. Pruebas según la nueva guía docente

S13 es la [guía de pruebas del profesor](https://vihgo.github.io/repaso-dsy1104-2026/#guia-pruebas), revisada el 25-10-2026. Se toma como referencia principal para estudiar y escribir las pruebas. Se mantiene el alcance requerido y no se incorporan funciones nuevas a la tienda.

| Guía S13 | Aplicación acotada |
|---|---|
| Sección 1: Vitest, jsdom, setup y scripts | La configuración ya usa esas herramientas; Vitest y coverage-v8 tienen la misma versión. |
| Secciones 4–5: prueba junto al código y Preparar/Actuar/Comprobar | TarjetaProducto.test.jsx y GrillaProductos.test.jsx están junto a sus componentes y separan los tres pasos. |
| Sección 9: aislamiento | beforeEach crea datos nuevos en los siete casos de catálogo; el setup limpia el DOM. |
| Secciones 10–12: espías, render y consultas | vi.fn(), render, screen y consultas por rol/texto visible. |
| Sección 13: interacción | userEvent.setup() por caso y await para cada clic en los dos archivos seleccionados. |
| Secciones 15 y 17: cobertura y conducta observable | Se conservan las cuatro métricas y las aserciones del comportamiento. No se añaden pruebas de estilos, constantes o detalles internos. |

La guía no fija por sí sola el mínimo de diez ni el umbral del 80%: proceden de S2 y S5 respectivamente. Los ejemplos de IVA y formularios sirven para aprender el método; no reemplazan las reglas de Boost Level. Vitest ejecuta nuestras pruebas con su API; la comparación con Jasmine es de vocabulario.

La suite vigente conserva siete casos de catálogo y dieciséis de interfaz; el plan elige diez para explicar. Se retiran las matrices extensas y repeticiones; no se afirma una migración total a userEvent. No se cambian componentes, arquitectura ni reglas de negocio.

## 6. Orden de estudio entre los tres integrantes

1. S9, clases 2–4: explicar tarjeta, props, eventos y actualización inmutable comparando con el catálogo/carrito del proyecto.
2. S9, clase 5: explicar formularios controlados, datos derivados, efecto y persistencia; distinguir el guardado del ejemplo del repositorio implementado.
3. S10, secciones 4–8: recorrer main.jsx, App.jsx, Layout/Outlet, Link/NavLink y 404; explicar BrowserRouter y su necesidad de fallback al publicar.
4. S10, secciones 10–17: abrir detalle por ID, filtrar en URL, volver al checkout y probar la guarda de administración.
5. Abrir los diez casos elegidos en el plan de pruebas y explicar preparación, acción y aserciones; repetir con datos ficticios.

La alineación modificó estructura, imports, conexión por props y montaje del router. [El informe](06_INFORME_COBERTURA_BORRADOR.md) identifica la ejecución, las pruebas, la cobertura y los caminos pendientes. Cada cambio posterior debe tener un objetivo pequeño y su validación.

La revisión local del 26-10-2026 conserva 33 pruebas en cinco archivos; resultados y alcance en el [informe](06_INFORME_COBERTURA_BORRADOR.md). 
