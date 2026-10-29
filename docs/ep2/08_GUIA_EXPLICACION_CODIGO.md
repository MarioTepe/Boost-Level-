# Guía para explicar el código de Boost Level

**Fecha:** 25-10-2026  
**Integrantes:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez.  
**Propósito:** recorrer el código implementado relacionándolo con las instrucciones de la evaluación, el ejercicio de clases y las guías de FullStack II. Esta guía sirve para estudiar y comprobar cada explicación sobre el proyecto real.

## 1. De dónde parte la implementación

La guía EP2 pide migrar HTML a React, crear componentes reutilizables, manejar props/estado, usar Bootstrap, mantener una fuente de datos JS con CRUD y verificar componentes. El ejercicio `clase-tienda-react` muestra `useState`, `map`, `find`, `filter`, `reduce`, actualización inmutable, props, callbacks, React Bootstrap y pruebas Vitest/Testing Library.

El frontend usa esos mismos fundamentos con el catálogo y recursos de Boost Level. Los archivos de EP1 y el ejercicio de clases se mantienen como referencias separadas. El código nuevo está en `frontend/`.

La carpeta FullStack II amplía el material de referencia: su guía de React, clase 5, enseña formularios controlados, useEffect, datos derivados y localStorage. La guía Router enseña Routes/Route, Link/NavLink, Outlet, useParams, useNavigate, useSearchParams, useLocation, 404 y Navigate. Son contenidos vistos en clase, aunque no aparezcan todavía en el ejercicio inicial. La [comparación por sección](09_CORRESPONDENCIA_GUIAS_CLASE.md) registra su aplicación: BrowserRouter y páginas/componentes en archivos separados.

## 2. Recorrido de diez minutos por el código

Prioridad de estudio: componentes, props, map/key, useState, eventos, formularios, rutas y las diez pruebas seleccionadas. Los módulos de guardado y compra ya existentes se explican por su función en el recorrido; este ajuste no añade nuevos patrones ni funcionalidades.

| Paso | Archivo relativo a frontend/ | Relación con clases y evaluación | Qué demostrar |
|---|---|---|---|
| 1 | src/main.jsx | Montaje React, StrictMode e importación de Bootstrap, como en main.jsx de clases | Explicar dónde comienza la aplicación y qué monta React. |
| 2 | src/App.jsx | Routes/Route y rutas anidadas de la guía Router, aplicadas al diagrama EP2 | Mostrar rutas públicas y administrativas; un parámetro identifica producto o pedido. |
| 3 | src/data/productos.js y categorias.js | Archivo JS que simula una base de datos, pedido por la guía | Identificar Catan, código JM001 y stock inicial 15. |
| 4 | src/componentes/catalogo/TarjetaProducto.jsx y GrillaProductos.jsx | map, props y Card/Button/Badge/Row/Col de React Bootstrap | TarjetaProducto recibe datos; una tarjeta por ID; botón agotado deshabilitado. |
| 5 | src/contexto/TiendaProvider.jsx | useState como en App de clases | Mostrar estado compartido y cómo la UI recibe el estado confirmado tras un cambio. |
| 6 | src/domain/carrito.reducer.js | find/map/filter y actualización sin mutar el original | Mostrar agregar repetido, cambiar cantidad y rechazo cuando excede stock. |
| 7 | src/domain/precios.js | reduce y formateo separado, como el total de clases | Calcular subtotal, descuento y total sin guardar contadores duplicados. |
| 8 | src/repositories/tienda.repository.js | localStorage/JSON de clase 5, con repositorio propio | Explicar leer, validar y guardar un documento completo; distinguirlo del efecto de escritura del ejemplo. |
| 9 | src/paginas/CheckoutPage.jsx y services/tienda.service.js | Checkout y vistas éxito/error de EP2 | Datos de entrega, pago simulado, nueva validación, pedido, stock y carrito. |
| 10 | src/componentes/catalogo/TarjetaProducto.test.jsx y GrillaProductos.test.jsx | Diez pruebas según la guía docente S13 | Ejecutar, abrir el caso del clic y explicar qué comprueba vi.fn(). |

Cada componente y página JSX está en un archivo con su nombre y exportación por defecto. App.jsx importa las páginas y declara el mapa de rutas; componentes/ contiene las piezas reutilizables, como propone la guía Router.

## 3. Conceptos que debemos distinguir

### Props y estado

`producto`, `cantidadEnCarrito` y `onAgregarProducto` son props de `TarjetaProducto`: llegan desde el padre. La tarjeta utiliza esos datos y avisa al padre mediante el callback.

El carrito, el aviso y la sesión son estado compartido. Los campos del formulario, el filtro y la modalidad son estado cercano a la vista. Se utiliza `useState`; cuando se llama al setter, React vuelve a renderizar con los datos nuevos.

Ejemplo del contrato usado:

```jsx
onClick={() => onAgregarProducto(producto.id)}
```

Se pasa el identificador estable. El servicio busca el producto vigente antes de modificar el carrito, evitando usar un precio o stock antiguo de una tarjeta.

### Actualización inmutable

Como en el ejemplo de clase, se crea un arreglo nuevo mediante `map`, `filter` o spread. No se aumenta directamente una propiedad del arreglo anterior. Las pruebas verifican que el estado original siga igual después de calcular el siguiente.

### Cantidad y stock

El stock se comprueba en dos momentos: al agregar/cambiar cantidad y al confirmar compra. El botón deshabilitado ayuda al usuario, mientras la regla compartida evita que otro camino acepte cantidades inválidas.

Con stock 15, cantidad 15 es válida y 16 se rechaza. Agregar al carrito no reserva stock. Solo una compra confirmada lo descuenta.

### Persistencia y compra

React mantiene la vista en memoria; `localStorage` permite recuperar los datos después de recargar. Productos, usuarios, categorías, carrito y pedidos se guardan en un documento versionado. Si falla la escritura, la aplicación conserva el estado previo y no muestra compra exitosa.

La sesión demo se guarda en `sessionStorage`. El registro guarda una cuenta ficticia utilizable en login; el rol público siempre es cliente.

## 4. Contenidos de clase y decisiones adicionales

Las nuevas guías corrigen la comparación inicial basada solo en clase-tienda-react: efectos, persistencia y navegación sí están enseñados. Su aplicación concreta y las ampliaciones quedan separadas a continuación.

| Ampliación | Razón y explicación breve |
|---|---|
| Context y useContext | El encabezado, catálogo, carrito y checkout necesitan los mismos datos. Los providers los comparten sin copiar el carrito en cada página. |
| useEffect | Enseñado en clase 5. Aquí conecta el estado React a las notificaciones del repositorio y limpia la suscripción al desmontar. Esa suscripción es una aplicación adicional del concepto. |
| React Router | Routes/Route, Link/NavLink, Outlet, parámetros, hooks y Navigate están en la guía Router. Las rutas se aplican a las pantallas EP2. |
| BrowserRouter | Se usa el router de la guía, montado en main.jsx. El alojamiento debe devolver index.html para las rutas de la SPA. |
| Páginas y componentes separados | paginas/ contiene las vistas de rutas y componentes/ las piezas reutilizables, cada una en su archivo. Context y hooks se guardan aparte. |
| Función reducer | Es una función JavaScript pura para calcular el carrito siguiente. No consulta DOM, reloj ni almacenamiento. No se incorporó Redux. |
| Repositorio y servicios | Son módulos de funciones del proyecto: ordenan lectura/escritura y reglas. No son microservicios ni un backend. |
| useRef en checkout | Bloquea el doble clic inmediatamente y conserva el ID del intento mientras permanece la página. El pedido guardado permite detectar un intento ya confirmado. |
| Adaptador de almacenamiento | Permite probar fallos y usar datos en memoria durante tests sin modificar el almacenamiento real. |

## 5. Cómo explicar las pruebas

La referencia principal es S13, la guía de pruebas indicada por el profesor. El plan identifica diez casos de componentes para estudiar, dentro de una suite de 33. Las matrices extensas y repeticiones fueron retiradas. No se añaden librerías, capas o funcionalidades para la exposición.

1. **Preparar:** crear un producto o estado ficticio conocido.
2. **Actuar:** renderizar el componente, hacer clic o ejecutar una regla.
3. **Comprobar:** usar `expect` sobre un resultado visible y, para compra, sobre pedido/stock/carrito.

`vi.fn()` comprueba si se llamó al callback con el ID correcto. Un almacenamiento fake permite provocar JSON roto o un fallo de escritura. El simulador de pago se controla para reproducir éxito y rechazo.

La cobertura indica qué código se ejecutó. No garantiza ausencia de errores. Se fijó el 80% de sentencias, ramas, funciones y líneas antes de medir, según la plantilla revisada; abrir el detalle de ramas es tan importante como leer el total.

Se utiliza Vitest como enseña la [guía de pruebas del profesor](https://vihgo.github.io/repaso-dsy1104-2026/#guia-pruebas), sección 1. describe agrupa, it define un caso y expect comprueba el resultado. vi.fn() registra las llamadas; no es un servicio real. userEvent.setup() crea un usuario simulado y await usuario.click(...) espera la interacción. beforeEach prepara un producto nuevo para cada caso. No se instala Jasmine/Karma: la guía compara su vocabulario con el de Vitest.

## 6. Recorrido funcional para exposición

1. Abrir catálogo, buscar Catan y agregarlo.
2. Cambiar cantidad a 15: se permite. Intentar 16: permanece en 15 y muestra el límite.
3. Volver a 1 y abrir checkout. Completar datos ficticios; escoger retiro.
4. Probar rechazo: conserva carrito. Reintentar con aceptación: guarda pedido, descuenta una unidad y vacía carrito.
5. Recargar el comprobante: sigue disponible.
6. Consultar la cuenta de administrador en el README, iniciar sesión, ver el pedido y editar un producto. Mostrar el cambio en catálogo. La pantalla de login no publica las credenciales.
7. Ejecutar pruebas y explicar un caso de componente y uno de regla/integridad.

La rúbrica pide diez pruebas para el nivel máximo y diez para demostrar en la presentación (S2, páginas 7 y 9). El [plan, sección 4](05_PLAN_PRUEBAS.md), selecciona diez casos reales del inventario para estudiar. Cada integrante debe poder explicar preparación, acción y aserciones de esos casos. La plantilla de cobertura exige además 80% en las cuatro métricas; son criterios distintos.

La lista de cotejo de la nueva guía Router es de esa actividad de clases, no reemplaza la rúbrica EP2. Sirve para revisar correspondencia técnica; consultar su contraste con el código en el documento 09.

## 7. Preguntas para practicar individualmente

- ¿Qué props recibe la tarjeta y qué estado mantiene el padre?
- ¿Por qué no se modifica el arreglo original del carrito?
- ¿Qué diferencia hay entre deshabilitar un botón y validar stock en una función?
- ¿Qué ocurre si el stock cambia antes de confirmar?
- ¿Cómo se evita descontar dos veces el mismo intento?
- ¿Qué se conserva en un pedido si luego se modifica el catálogo?
- ¿Qué efecto tiene un fallo de localStorage?
- ¿Qué prueba usa un mock y qué comportamiento verifica?
- ¿Qué diferencia hay entre cobertura de líneas y de ramas?
- ¿Por qué este login y esta compra son una demostración y qué faltaría en un backend real?

Cada respuesta debe acompañarse del archivo o prueba que la demuestra. El reparto del backlog organiza el trabajo, pero los tres integrantes deben comprender el flujo completo.

La revisión local del 26-10-2026 conserva 33 pruebas en cinco archivos; resultados y alcance en el [informe](06_INFORME_COBERTURA_BORRADOR.md). 

## Ofertas e identificadores de compra

`precioOferta` es un monto menor al precio original. `precioVigente` elige ese monto y `porcentajeOferta` calcula y redondea su reducción. La tarjeta recibe el producto por props y muestra fotografía, ambos precios y porcentaje; el servicio calcula el carrito con el mismo precio vigente.

`aplicarOfertasIniciales` adapta una sola vez el almacenamiento anterior, conservando carrito y pedidos. Su indicador evita restaurar una oferta retirada después desde administración. `crearId` combina Math.random con Date.now para los pedidos de demostración y funciona en HTTP. P-09 y P-11 comprueban estos recorridos sin aumentar los 33 casos.
