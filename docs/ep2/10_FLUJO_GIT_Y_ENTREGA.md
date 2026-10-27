# Guía de entrega y despliegue

**Fecha:** 27-10-2026. **Proyecto:** Boost Level, DSY1104. **Entrega:** 29-10-2026.

## Resultado técnico actual

La suite tiene 33 casos aprobados, sin fallos, skip ni todo. Las cuatro métricas globales superan el 80%: 93,00% sentencias, 90,23% ramas, 94,25% funciones y 94,11% líneas. Los datos del informe y los adjuntos proceden de la misma corrida local.

## Cierre de revisión

1. Revisar los Word y la planilla entre los integrantes. Designar un revisor diferente de quien elaboró el informe y registrar firmas solo cuando se complete esa revisión.
2. Completar TM-02/TM-03: teclado, formularios y páginas fuera de la suite reducida, incluidos artículos, categorías públicas, stock crítico y detalle de pedido.
3. Instalar desde una copia limpia con npm ci; ejecutar formato, lint, cobertura y build. Recorrer la aplicación usando las instrucciones del README.
4. Ensayar las diez pruebas seleccionadas y el flujo catálogo → carrito → compra aceptada/rechazada → administración. Los tres integrantes deben explicar preparación, acción, aserción y límites de la demostración.
5. Aclarar con el profesor la frase sobre backend de S1, página 12. La aplicación actual conserva un alcance de frontend con datos simulados.

## Publicación final en AWS

El destino confirmado es **AWS Academy / Learner Lab**. La publicación se realizará después de cerrar lo anterior, usando el servicio indicado por el profesor y permitido por el laboratorio. Todavía no se han creado recursos ni se ha desplegado la página en AWS.

Comprobar acceso público, carga de imágenes/estilos y recarga directa de las rutas de BrowserRouter. Registrar la URL final, fecha y capturas reales. Incorporar esa evidencia al informe únicamente cuando exista y se haya verificado. El alojamiento no convierte las sesiones, pagos o almacenamiento locales de la demostración en servicios de producción.

## Archivos de entrega

Las copias completadas están en Documentacion_DSY1104_EvaluaciónParcial2/Completadas_Boost_Level_EP2: ERS, informe de cobertura, planilla de requisitos y coverage.zip. Preparar además el paquete fuente según las instrucciones del profesor, con package-lock.json y sin node_modules, cachés ni datos privados. Verificar su extracción e instalación antes de entregar.
