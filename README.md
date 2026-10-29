# Boost Level — Full Stack II

## Evaluación 2 con React

La implementación React está en [frontend/](frontend/README.md). Incluye tienda, filtros, carrito con stock, compra simulada, cuentas demo y administración con datos compartidos.

```powershell
cd frontend
npm ci
npm run dev
```

Abrir la dirección local indicada por Vite. Login: `/login`; administración: `/admin`. Cuentas ficticias: **admin@duoc.cl / 1234** y **usuario@gmail.com / 1234**. Las credenciales de revisión están documentadas aquí y no se publican en la pantalla de acceso.

La [guía de explicación del código](docs/ep2/08_GUIA_EXPLICACION_CODIGO.md) relaciona la implementación con los contenidos de clases. El [índice EP2](docs/ep2/README.md) reúne requisitos, arquitectura, pruebas y evidencias. Los pagos y las cuentas son de demostración local.

Se utiliza `BrowserRouter`, con el mapa de rutas en `src/App.jsx`, páginas en `src/paginas/` y un componente por archivo en `src/componentes/`, siguiendo las nuevas guías FullStack II. La [correspondencia con las clases](docs/ep2/09_CORRESPONDENCIA_GUIAS_CLASE.md) explica lo aplicado y las decisiones adicionales del proyecto.

## Referencia de la evaluación 1

Proyecto frontend desarrollado con HTML, CSS y JavaScript.

Boost Level es una tienda de tecnología y gaming creada para la primera evaluación de Full Stack II. El proyecto busca mantener una estructura simple y fácil de comprender, utilizando principalmente los contenidos trabajados durante las clases.

## Cómo abrir el proyecto

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Abrir `index.html` utilizando Live Server.
3. Navegar por las distintas secciones utilizando el menú principal.

## Vistas públicas

- `index.html`
- `productos.html`
- `detalle-producto.html`
- `registro.html`
- `login.html`
- `nosotros.html`
- `blogs.html`
- `blog1.html`
- `blog2.html`
- `contacto.html`
- `carrito.html`

## Vistas administrador

Dentro de la carpeta `/admin`:

- `index.html`
- `productos.html`
- `nuevo-producto.html`
- `editar-producto.html`
- `mostrar-producto.html`
- `usuarios.html`
- `nuevo-usuario.html`
- `editar-usuario.html`
- `mostrar-usuario.html`

## JavaScript utilizado

- `datos.js`: contiene el arreglo principal de productos.
- `productos.js`: muestra los productos y permite realizar un filtro simple.
- `detalle.js`: muestra la información del producto seleccionado.
- `carrito.js`: controla el carrito de compras y utiliza `localStorage`.
- `login.js`: realiza las validaciones del inicio de sesión.
- `contacto.js`: valida el formulario de contacto.
- `regiones.js`: contiene el arreglo de regiones y comunas.
- `usuario-form.js`: contiene las validaciones de registro y usuarios.
- `producto-form.js`: contiene las validaciones de los formularios de productos.
- `admin-productos.js`: muestra el catálogo de productos dentro del administrador.
- `admin-mostrar-productos.js`: muestra el detalle del producto seleccionado desde el administrador.
- `admin-editar-producto.js`: carga los datos del producto seleccionado en el formulario de edición.

## Productos

Los productos se encuentran almacenados en el arreglo de `js/datos.js`.

El catálogo público y el panel administrador utilizan esta información para mostrar los productos disponibles.

Cada producto contiene datos como:

- Código.
- Categoría.
- Nombre.
- Precio.
- Imagen.
- Descripción.
- Stock.

## Imágenes

Las imágenes utilizadas por los productos se encuentran guardadas localmente dentro de la carpeta `/img`.

Entre los recursos principales se encuentran:

- `boost-level-horizontal.png`: logo horizontal principal.
- `fondo-setup.png`: fondo principal del Home.
- `fondo-neon.png`: fondo secundario.
- `icono-boost.png`: icono alternativo.
- `icono-boost-limpio.png`: icono utilizado en navbar y administrador.
- `logo-boost-level.png`: logo utilizado en login y secciones de marca.

También se incluyen fotografías locales para los productos, por ejemplo:

- PlayStation 5.
- Xbox Series X.
- Monitor LG.
- PC Gamer.
- Mouse.
- Mousepad.
- Silla Gamer.
- Audífonos.
- Control Xbox.
- Catan.
- Polera Gamer.

De esta manera, las imágenes principales del catálogo pueden visualizarse sin depender de enlaces externos.

## Organización del CSS

Los estilos están separados según su responsabilidad:

- `css/style.css`: estilos generales, colores, botones, navbar, footer y paneles.
- `css/home.css`: portada, hero y fondos del inicio.
- `css/productos.css`: tarjetas, detalle de producto y carrito.
- `css/formularios.css`: inputs, select y mensajes de validación.
- `css/admin.css`: menú lateral, tablas y diseño del administrador.

Esta organización permite evitar un solo archivo CSS demasiado grande y facilita la comprensión del proyecto.

## Almacenamiento local

El carrito de compras utiliza `localStorage` para conservar temporalmente los productos agregados dentro del navegador.

Como esta evaluación corresponde a un proyecto frontend, no se utiliza una base de datos ni un backend.

## Inicio de sesión

El inicio de sesión es demostrativo.

El código actual compara los datos con dos cuentas ficticias:

| Perfil | Correo | Contraseña de demostración | Destino |
|---|---|---|---|
| Administrador | admin@duoc.cl | 1234 | `admin/index.html` |
| Cliente | usuario@gmail.com | 1234 | `index.html` |

El acceso está en `login.html`. En EP1 la comparación solo redirige: no se guarda una sesión ni se protegen las páginas administrativas. El registro tampoco crea todavía una cuenta utilizable para iniciar sesión.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- LocalStorage
- Git
- GitHub

## Integrantes

- Jordán Guzmán Parra
- Mario Tepe Espinoza
- Luis Contreras Gonzalez

## Proyecto académico

Proyecto desarrollado para la asignatura Full Stack II.

## Planificación de la evaluación 2

La [documentación EP2](docs/ep2/README.md) reúne diagnóstico, ERS V2, arquitectura, backlog, plan de pruebas, borrador de cobertura y matriz de trazabilidad.

El incremento React está implementado en `frontend/` con React, Vite, React Bootstrap y Vitest. Las páginas HTML anteriores siguen disponibles como referencia de EP1 y se abren con Live Server. El informe de cobertura se actualiza con la ejecución local y queda sujeto a revisión del equipo antes de la entrega.

La [revisión de presentación](docs/ep2/11_REVISION_PRESENTACION.md) reúne las comprobaciones actuales y lo pendiente antes de la entrega.
