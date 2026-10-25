# Plan de pruebas de Boost Level

**Versión:** 0.4 · **Fecha:** 25-10-2026  
**Estado:** escenarios implementados en pruebas de dominio/servicios y componentes; resultados locales en el informe y carpeta evidencias.  
**Integrantes:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez.

## 1. Objetivo y alcance

Verificar el límite de stock, compra simulada, persistencia y CRUD compartido; comprobar renderizado, props, eventos, estado y condiciones de los componentes React. La [matriz](07_MATRIZ_TRAZABILIDAD.md) vincula cada requisito con casos y paquetes de trabajo.

Hay 18 escenarios de componentes, 25 de unidad, 10 de integración y 4 de revisión manual. El resultado de la suite implementada está en el informe; sus variantes parametrizadas no equivalen a requisitos diferentes. No confundir cantidad de pruebas con porcentaje de cobertura.

## 2. Entorno y configuración

Se adopta Vitest/Testing Library/jsdom/V8 de la clase, S5 y la [guía de pruebas del profesor](https://vihgo.github.io/repaso-dsy1104-2026/#guia-pruebas) (S13, secciones 1 y 15). La nueva guía confirma la herramienta pese a las menciones antiguas de Jasmine/Karma en los PDF. `@vitest/coverage-v8` debe tener exactamente la versión instalada de Vitest. Registrar versiones reales de Node/npm y dependencias del nuevo paquete; no copiar números de ejemplo del informe docente.

Configuración de pruebas aplicada en `frontend/vite.config.js` (extracto):

```js
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.test.{js,jsx}'],
    clearMocks: true,
    restoreMocks: true,
    allowOnly: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'json-summary'],
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/main.jsx',
        'src/**/*.test.{js,jsx}',
        'src/test/**',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
})
```

Esta configuración se aplica en el paquete frontend. `main.jsx` se excluye porque se limita al montaje. Los tests y helpers de `src/test/` son infraestructura de pruebas. No excluir dominio, repositorios, rutas, providers, componentes o datos de producción para elevar el porcentaje. `coverage.include` incorpora también módulos sin importar por tests.

Setup previsto: `@testing-library/jest-dom/vitest`, limpieza del DOM tras cada caso y repositorios in-memory nuevos por prueba. Se pueden preparar wrappers de providers/MemoryRouter para probar rutas y vistas. [Configuración Vitest](https://vitest.dev/config/coverage), [setup Testing Library](https://testing-library.com/docs/react-testing-library/setup/).

Scripts del paquete: `test: vitest`, `test:ejecutar: vitest run`, `test:cobertura: vitest run --coverage`. Dev/build/preview y lint se definen con Vite/Oxlint al crear el paquete.

## 3. Pruebas de componentes

Usar roles/labels/texto significativo y aserciones del comportamiento. No intentar verificar keys internas de React mediante consultas DOM. Callback único: `onAgregarProducto(productoId)`.

| ID | Requisitos | Escenario y resultado esperado |
|---|---|---|
| TC-01 | RF-01 | Catálogo recibe tres activos y renderiza tres tarjetas con sus datos; conjunto vacío muestra estado vacío. |
| TC-02 | RF-03 | Detalle ID válido muestra ese producto y precio vigente. |
| TC-03 | RF-03 | ID desconocido/inactivo muestra no encontrado y enlace de vuelta, sin excepción. |
| TC-04 | RF-04 | Stock cero: Agregar deshabilitado y disponibilidad visible. |
| TC-05 | RF-04 | Clic en tarjeta elegible llama una vez a onAgregarProducto con el ID exacto. |
| TC-06 | RF-05 | Dos líneas muestran cantidades/subtotales/total literales correctos; un producto gratuito no produce mensaje de vacío. |
| TC-07 | RF-05 | Cambiar cantidad/eliminar entrega ID y cantidad absoluta correctos; tras actualizar provider, UI muestra nuevo resumen. |
| TC-08 | RF-05 | Carrito sin líneas muestra vacío y no permite confirmar compra. |
| TC-09 | RF-07 | Checkout incompleto no confirma pedido ni modifica la tienda; campos y errores asociados visibles. La validación está en el servicio. Domicilio exige dirección; retiro no. |
| TC-10 | RF-10 | Simulación rechazada muestra motivo y regreso a checkout; mantiene líneas. |
| TC-11 | RF-09 | Respuesta confirmada muestra ID/resumen del pedido guardado; no presenta rechazo. |
| TC-12 | RF-12 | Visitante/cliente que abre /admin va a login; admin activo puede entrar. |
| TC-13 | RF-02 | Escribir búsqueda y elegir categoría combina filtros; limpiar restaura resultados; sin coincidencias muestra vacío. |
| TC-14 | RF-14 | Formulario producto inválido muestra errores y no guarda; válido llama acción con campos definidos. |
| TC-15 | RF-13/RF-16 | Registro valida campos y crea solo cliente; formulario admin edita el usuario seleccionado por ID. |
| TC-16 | RF-21 | Oferta muestra precio original y vigente; lista sin ofertas muestra vacío; quitar oferta devuelve precio base. |
| TC-17 | RF-22 | Sesión duoc.cl muestra descuento; logout recalcula sin descuento antes de confirmar. |
| TC-18 | RF-20 | Contacto valida límites/vacíos y muestra mensaje explícito de simulación, sin prometer envío. |

TC-01, TC-06 y otros agrupan variantes para legibilidad del plan; escribir casos separados cuando un fallo pueda ocultar otra variante. La fuente S2, **página 7, IE2.2.1**, describe el nivel máximo como “Crea todas las pruebas (10/10)” y los niveles inferiores como 8/10, 5/10 y 3/10. En **página 9, IE2.2.2**, pide demostrar 10 pruebas en la presentación. Por ello se fija un objetivo de al menos diez pruebas significativas de componentes para aspirar al nivel máximo; no se interpreta como una obligación de tener exactamente diez ni como un porcentaje de cobertura.

### Diez pruebas concretas para explicar en la presentación

Son diez bloques `it` distintos junto a sus componentes, siguiendo S13, secciones 4–5 y 9–13. Sustituyen el antiguo caso que mezclaba render, clic, agotado y oferta. Se usa beforeEach para datos nuevos, comentarios Preparar/Actuar/Comprobar y consultas por rol o texto visible. Cada interacción lleva userEvent.setup() y await. MemoryRouter permite renderizar los enlaces del componente durante el test.

| N.º | Archivo en frontend/src/componentes/catalogo/ | Nombre del caso y qué comprueba |
|---|---|---|
| 1 | TarjetaProducto.test.jsx | muestra el nombre y la categoría recibidos por props |
| 2 | TarjetaProducto.test.jsx | muestra el precio con formato de pesos chilenos |
| 3 | TarjetaProducto.test.jsx | muestra las unidades disponibles |
| 4 | TarjetaProducto.test.jsx | avisa una sola vez con el ID del producto al agregar |
| 5 | TarjetaProducto.test.jsx | no permite agregar un producto sin stock |
| 6 | TarjetaProducto.test.jsx | no permite agregar cuando el carrito alcanza el stock |
| 7 | TarjetaProducto.test.jsx | muestra la oferta y conserva visible el precio original |
| 8 | GrillaProductos.test.jsx | dibuja una tarjeta por producto con su enlace de detalle |
| 9 | GrillaProductos.test.jsx | no dibuja tarjetas cuando la lista está vacía |
| 10 | GrillaProductos.test.jsx | entrega al padre el ID del producto elegido |

Ejecutar los diez desde frontend/:

```powershell
npm run test:ejecutar -- src/componentes/catalogo --reporter=verbose
```

No se incorporan componentes ficticios ni reglas del ejemplo docente, como sumar IVA, al negocio del proyecto. Las verificaciones ya existentes de formularios, estado, rutas, compra, cálculos y persistencia se conservan como respaldo en App.test.jsx, domain/dominio.test.js y services/servicios.test.js. Esos archivos agrupan varios módulos y algunos flujos usan fireEvent; no se afirma haber migrado toda la suite a la convención nueva. El ajuste acotado no modifica código de producción ni añade funcionalidades.

La plantilla S5, **sección 3.2**, añade un criterio independiente: mínimo 80% en sentencias, ramas, funciones y líneas. También exige 0 fallos; su tabla de completitud fija 0 skip/todo. Tener diez pruebas no asegura por sí solo alcanzar la cobertura ni demostrar que las aserciones sean correctas.

## 4. Pruebas unitarias de dominio y datos

| ID | Requisitos | Entrada y expectativa |
|---|---|---|
| TU-01 | RF-04 | Agregar producto nuevo con stock 15 crea línea cantidad 1 sin mutar estado original. |
| TU-02 | RF-04 | Agregar mismo producto incrementa y conserva una sola línea; otro producto no se modifica. |
| TU-03 | RF-04 | Cantidad final exactamente 15 con stock 15 se acepta. |
| TU-04 | RF-04 | Intento de 16 con stock 15 devuelve SIN_STOCK y conserva estado/importe. |
| TU-05 | RF-04 | Producto desconocido, inactivo o agotado rechaza agregado. |
| TU-06 | RF-05 | Cantidad cero, negativa, fraccionaria, texto o NaN se rechaza; quitar permite eliminar la línea. |
| TU-07 | RF-05/RNF-08 | Dos productos a 29.990 ×2 y 10.000 ×1 dan subtotal 69.980; total sin descuento 69.980. Vacío y productos gratuitos también se calculan. |
| TU-08 | RF-06 | JSON truncado, tipo/esquema inválido y versión desconocida devuelven error recuperable; no sobrescribir datos sin confirmación. |
| TU-09 | RF-08 | Carrito pide 4, stock vigente es 3: sin pedido/descuento de stock/borrado de carrito. |
| TU-10 | RF-09 | Estado válido aceptado genera snapshot, descuenta cantidad exacta y vacía carrito en un solo candidato guardado. |
| TU-11 | RF-10 | Pago demo rechazado conserva todo el documento de tienda. |
| TU-12 | RF-11 | Mismo intentoId repetido devuelve mismo pedido y no descuenta dos veces; nueva instancia del repository tras recarga conserva esta regla. |
| TU-13 | RNF-08 | Formato CLP muestra cero, miles y valor alto sin decimales. Esperado literal; normalizar espacios no separables de Intl si procede. |
| TU-14 | RF-14 | Código duplicado, categoría inválida, precio negativo y stock decimal bloquean guardado. Alta/edición válidas persisten y desactivación mantiene historial. |
| TU-15 | RF-15 | Categoría vacía/duplicada no se guarda; baja con producto activo bloqueada; sin asociados permite baja lógica. |
| TU-16 | RF-13/RF-16 | Correo/RUN normalizados duplicados se rechazan. Alta cliente, edición por ID y baja mantienen integridad. |
| TU-17 | RF-12 | Login valida credencial demo/activo; logout elimina sesión. Usuario desactivado o rol inválido bloquea comando administrativo. |
| TU-18 | RF-06/RF-09 | Storage lanza al leer/escribir: mensaje PERSISTENCIA; escritura fallida conserva estado previo y no emite éxito. |
| TU-19 | RF-08 | Precio/oferta o elegibilidad cambió después del resumen: PRECIO_CAMBIO; no confirmar hasta que se revise nuevo resumen. |
| TU-20 | RF-22 | Elegibilidad: cliente activo duoc.cl sí; invitado/gmail/profesor.duoc.cl/sufijo engañoso no. Subtotal 69.980: descuento 13.996 y total 55.984. Redondear subtotal 1 a descuento 0. |
| TU-21 | RF-21 | Oferta menor válida cambia precio vigente; null vuelve a base; oferta negativa o >=base rechazada. Descuento institucional se aplica sobre oferta. |
| TU-22 | RF-13 | Cumple 18 hoy: válido; cumple mañana: inválido; fecha imposible/futura inválida. Probar límites de campos, clave demo y estructura/normalización de RUN sin afirmar verificación de identidad. |
| TU-23 | RF-17/RF-18/RF-19 | Historial filtra clienteId; reporte suma confirmados; críticos usa <=umbral y excluye null/inactivos; cero datos produce ceros y listas vacías coherentes. |
| TU-24 | RF-14/RF-16/RF-19 | Admin inicial no se desactiva ni cambia rol; perfil solo permite campos autorizados. Baja lógica no borra órdenes históricas. |
| TU-25 | RF-07 | Domicilio exige región/comuna relacionada/dirección; retiro omite dirección, costo es cero. Cambio de región limpia comuna incompatible. |

## 5. Integración

Usar servicios reales de aplicación con almacenamiento fake. No sustituir la regla o servicio que el caso quiere comprobar.

| ID | Requisitos | Flujo y resultado |
|---|---|---|
| TI-01 | RF-01/RF-04/RF-05 | Catálogo → agregar → contador encabezado → carrito → editar/quitar: mismos IDs, cantidades y totales. |
| TI-02 | RF-04/RF-08 | Fixture Catan stock 15: llegar a 15, intentar 16 y cambiar stock antes de checkout; límites y revalidación bloquean compra inválida. |
| TI-03 | RF-07/RF-09/RF-11/RF-17 | Entrega válida → aceptar → pedido → recargar comprobante → repetir intento: mismo pedido, stock/carrito coherentes. Probar invitado y cliente. |
| TI-04 | RF-08/RF-10 | Rechazo simulado, cambio de precio y fallo de guardado muestran mensajes distintos, sin compra parcial. Corregir/reintentar permite completar. |
| TI-05 | RF-06 | Recarga conserva tienda; datos corruptos ofrecen recuperación; restablecer requiere confirmar y reinicia datos demo/sesión. |
| TI-06 | RF-14/RF-15/RF-21 | Crear categoría/producto/oferta en admin → catálogo/detalle/carrito reflejan precio y stock; recarga conserva cambios. |
| TI-07 | RF-12/RF-13/RF-22 | Registrar → login → descuento → precarga → logout: rol/total y formularios cambian correctamente. Admin/cliente no confunden permisos. |
| TI-08 | RF-16/RF-18/RF-19 | Editar un segundo cliente no altera el primero; baja bloquea login, mantiene historial; perfil admin conserva rol e identidad. |
| TI-09 | RF-17/RF-18/RF-19 | Compra confirmada aparece en pedidos/historial/reportes; críticos se actualiza cuando cambia stock; producto luego editado no cambia orden anterior. |
| TI-10 | RF-02/RF-03/RF-20/RNF-09 | Recorrer categorías, ofertas, blogs y artículo; ID/slug desconocidos tienen estado definido; guardas y rutas lógicas funcionan. |

## 6. Revisión manual

| ID | Requisitos | Procedimiento/evidencia |
|---|---|---|
| TM-01 | RNF-02 | Navegador real a 375/768/1280 px: catálogo/carrito/checkout/admin, sin overflow de página; capturar vistas y estado del menú/tablas. |
| TM-02 | RNF-05 | Teclado, foco, labels/errores y alt en flujos de compra y formularios admin; registrar pasos y defectos. |
| TM-03 | RNF-06/RNF-07/RNF-09 | Lector nuevo sigue README, encuentra cuentas y simulación; abre y refresca rutas del hosting elegido y revisa consola. |
| TM-04 | RNF-10 | Instalar fuente del ZIP con npm ci, build y prueba; confirmar URL/commit, ERS e informe, coverage.zip aparte. |

## 7. Aislamiento y mocks

- Crear estado/factories y Storage fake nuevos por caso; restaurar mocks y limpiar DOM.
- Controlar fallos mediante adaptador, no silenciar excepciones de forma global.
- Reducers reciben producto/stock y no acceden a storage; probar inmutabilidad.
- Inyectar simulador de pago, reloj e IDs; provocar cambio de inventario/precio durante espera.
- Inspeccionar pedido, stock, carrito y revisión persistidos, además del mensaje visible.
- Evitar tests que usan la misma función de precio/total para producir el esperado y el resultado.

## 8. Ejecución y evidencia

Comandos desde `frontend/`:

```powershell
npm ci
npm run lint
npm run build
npm run test:ejecutar -- --reporter=verbose
npm run test:cobertura -- --reporter=verbose
```

La última corrida es la referencia del informe: resumen de casos, duración, cuatro métricas, cubiertos/total y detalle por archivo. Registrar SHA, Node/npm/dependencias, fecha/hora/zona y salida completa de esa misma ejecución. Usar `coverage/coverage-summary.json`, `coverage/coverage-final.json` y HTML para completar cifras y NC. La corrida unitaria anterior ayuda al desarrollo; no mezclar sus cifras con coverage.

Cierre: 0 fallos, 0 skip/todo y >=80% global en las cuatro métricas; todos los escenarios críticos de stock/compra/persistencia verificados; ninguna prueba enfocada con only; revisión manual documentada. Si no se cumplen, corregir y volver a medir con evidencia actualizada.

Los fallos iniciales de la clase se describen solo en diagnóstico. Las pruebas de Boost Level se ejecutan en frontend/; el informe y la carpeta evidencias identifican la corrida local correspondiente.
