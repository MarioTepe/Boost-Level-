# Boost Level React

Tienda académica de Desarrollo Fullstack II. Continúa la entrega HTML usando React y los componentes Bootstrap trabajados en clases. Conserva el catálogo de once productos y los recursos locales de Boost Level.

## Iniciar

Requiere Node.js 22.12 o superior y npm. La verificación local usa Node 24.21.0 y npm 11.19.0.

Desde esta carpeta:

```powershell
npm ci
npm run dev
```

Abrir la dirección que muestra Vite, normalmente [localhost:5173](http://127.0.0.1:5173/). Se usa `BrowserRouter`, como en la guía del profesor: `/productos`, `/carrito`, `/login` y `/admin`. El mapa está en `src/App.jsx`; las páginas se separan en `src/paginas/` y los componentes reutilizables en `src/componentes/`, con un componente por archivo y exportación por defecto.

El estado compartido está en `src/contexto/` y el acceso a ese estado en `src/hooks/useApp.js`. Tarjeta y grilla reciben datos y callbacks por props; las páginas conectan las acciones con los servicios.

## Cuentas de demostración

| Perfil | Correo | Clave |
|---|---|---|
| Administrador | admin@duoc.cl | 1234 |
| Cliente | usuario@gmail.com | 1234 |

El enlace “Acceso de administrador” está en el pie de página. El registro crea clientes ficticios utilizables en login. Usa exclusivamente datos y claves de demostración: este frontend no proporciona autenticación de servidor.

Los correos y claves de acceso para revisión se documentan en los README; la pantalla de login no los publica ni los precarga.

## Flujos implementados

- Inicio, catálogo con búsqueda/filtros/orden, categorías, detalle y ofertas.
- Carrito con cantidades, eliminación, stock máximo y totales CLP.
- Registro/login/logout y descuento de 20% para cliente activo `@duoc.cl`.
- Checkout con domicilio/retiro, precarga de cliente y pago simulado aceptado o rechazado.
- Pedido persistido con resumen histórico, stock descontado una vez y carrito vaciado al confirmar.
- Administración de productos, categorías y clientes con bajas lógicas; pedidos, historial, críticos, reportes y perfil.
- Nosotros, blogs y contacto con validación sin envío de mensajes.

Ofertas y umbrales críticos comienzan sin configurar, respetando los datos EP1. Se pueden activar desde edición de producto. Entrega gratuita y descuento acumulable sobre ofertas son las reglas de demostración precisadas en la ERS.

## Datos y recuperación

`localStorage` conserva `boostLevel:tienda:v1`; `sessionStorage` conserva `boostLevel:sesion:v1`. Pedido, stock y carrito se guardan juntos; si falla el guardado no se informa éxito. Datos inválidos muestran un error y permiten restablecer la demo con confirmación. El botón de restablecer también está en el pie de página.

La consistencia de inventario se limita a una pestaña local. No hay pago bancario, despacho, correo, API ni base de datos de producción. El comprobante no tiene validez tributaria.

## Comandos

```powershell
npm run lint
npm run test:ejecutar
npm run test:cobertura
npm run build
npm run preview
npm run format:check
```

Para ejecutar las siete pruebas pequeñas del catálogo:

```powershell
npm run test:ejecutar -- src/componentes/catalogo --reporter=verbose
```

Vitest y `@vitest/coverage-v8` usan la misma versión. La cobertura incluye el código de producción y exige 80% en sentencias, ramas, funciones y líneas, siguiendo la plantilla revisada del profesor. El HTML se genera en `coverage/index.html` y se regenera al ejecutar las pruebas.

La rúbrica EP2, página 7 (IE2.2.1), exige 10/10 pruebas bien estructuradas para el nivel máximo; la página 9 (IE2.2.2) pide demostrar 10 en la presentación. No es un límite máximo de pruebas. En el [plan de pruebas](../docs/ep2/05_PLAN_PRUEBAS.md) se identifican diez casos existentes para estudiar y explicar. Se comprueban renderizado, props, eventos, estado, validación y resultados; la suite completa conserva las verificaciones adicionales de reglas y persistencia.

## Explicar el proyecto

Leer la [guía de explicación](../docs/ep2/08_GUIA_EXPLICACION_CODIGO.md) y la [documentación EP2](../docs/ep2/README.md). Allí se relacionan los archivos con props, `useState`, eventos, actualización inmutable, React Bootstrap, persistencia y tests. Las ampliaciones respecto del ejercicio de clases se justifican por las nuevas vistas.

La [correspondencia con FullStack II](../docs/ep2/09_CORRESPONDENCIA_GUIAS_CLASE.md) incorpora las nuevas guías React/Router. Confirma que efectos, almacenamiento local, rutas, parámetros, filtros en URL y Navigate ya forman parte de clases. BrowserRouter y la separación de páginas/componentes están aplicados. Context, repositorio y servicios se justifican como decisiones adicionales.

La [guía de pruebas del profesor](https://vihgo.github.io/repaso-dsy1104-2026/#guia-pruebas) confirma Vitest, Testing Library, jsdom y V8. Las siete pruebas del catálogo están al lado de TarjetaProducto y GrillaProductos, con Preparar/Actuar/Comprobar, beforeEach, vi.fn() y userEvent con await. El plan conserva la referencia histórica a Jasmine/Karma sin afirmar que Vitest ejecute esas herramientas.

## Publicación y próximos cambios

`npm run build` genera dist/. Al usar BrowserRouter, el alojamiento debe devolver index.html para las rutas de la SPA. `public/_redirects` prepara esa regla para un alojamiento compatible como Netlify. Vite y su preview sirven las rutas al ejecutar localmente; AWS EC2 ya fue publicado; la revisión final del servidor se registra por separado.

Por defecto se publica en la raíz. Si el alojamiento usa una subcarpeta, definir su ruta durante la compilación; el router usa la misma base para los enlaces:

```powershell
$env:VITE_BASE_PATH = '/Boost-Level-/'
npm run build
Remove-Item Env:VITE_BASE_PATH
```

GitHub Pages necesita además su tratamiento de fallback; subir código a GitHub no configura ese alojamiento. La guía docente, sección 18, explica ese requisito.

El workflow `.github/workflows/frontend.yml` ejecuta instalación, formato, lint, cobertura y compilación en cada cambio del frontend enviado a main o a una solicitud de cambios. Los incrementos posteriores deben tener un objetivo pequeño, su prueba y un commit que describa el cambio real. La entrega formal aún requiere revisión del equipo y los adjuntos académicos.

Suite vigente: **33 casos**, distribuidos en 16 de interfaz, 7 de catálogo, 6 de dominio y 4 de servicios. Diez casos de componentes para ensayar se identifican en el plan. Ejecutar la suite completa con `npm run test:ejecutar` y medir con `npm run test:cobertura`. El 80% se exige en las cuatro métricas globales; los caminos retirados quedan documentados.

AWS Academy / Learner Lab sirve la versión final en la instancia EC2 existente. El checkout usa crearId, compatible con HTTP, y la página muestra cuatro ofertas. El 29-10-2026 se comprobaron públicamente Ofertas y el checkout hasta el comprobante simulado; no hay cobro real. La dirección pública es dinámica y el equipo la comunicará directamente al profesor el día de la presentación. Vite permanece en 8.3.5.