# Guía de entrega y despliegue

**Fecha:** 29-10-2026. **Proyecto:** Boost Level, DSY1104. **Entrega:** 29-10-2026.

## Resultado técnico actual

La suite tiene 33 casos aprobados, sin fallos, skip ni todo. Las cuatro métricas globales superan el 80%: 93,12% sentencias, 90,46% ramas, 94,32% funciones y 94,22% líneas. Los datos del informe y los adjuntos proceden de la misma corrida local.

## Cierre de revisión

1. Revisar los Word y la planilla entre los integrantes. Designar un revisor diferente de quien elaboró el informe y registrar firmas solo cuando se complete esa revisión.
2. Consultar la revisión local del informe 11 y repetir el recorrido con otro integrante: teclado, formularios, artículos, categorías públicas, stock crítico y detalle de pedido.
3. Consultar el registro de extracción limpia con npm ci y build; formato, lint y cobertura también quedaron aprobados. Recorrer la aplicación usando las instrucciones del README.
4. Ensayar las diez pruebas seleccionadas y el flujo catálogo → carrito → compra aceptada/rechazada → administración. Los tres integrantes deben explicar preparación, acción, aserción y límites de la demostración.
5. Alcance aclarado por el equipo el 28-10-2026: el profesor exige solo frontend. La aplicación conserva datos simulados y persistencia local.

## Publicación final en AWS

El destino confirmado es **AWS Academy / Learner Lab**. AWS EC2 se actualizó el 29-10-2026 en la instancia existente. La validación pública comprobó Ofertas con cuatro productos y el checkout por HTTP hasta el comprobante simulado; no se realizan cobros. La dirección es dinámica y el equipo se la comunicará directamente al profesor el día de la presentación. No se requiere HTTPS para esta demostración.

Nginx conserva el puerto 5173 y el fallback a index.html para BrowserRouter. No crear otra instancia ni cambiar reglas sin una necesidad comprobada. La guía PUBLICACION_AWS.md del paquete explica la actualización y la comprobación posterior.

## Archivos de entrega

Las copias completadas están en Documentacion_DSY1104_EvaluaciónParcial2/Completadas_Boost_Level_EP2: ERS, informe de cobertura, planilla de requisitos y coverage.zip. El paquete Boost_Level_EP2_fuentes.zip incluye package-lock.json y fuentes, sin node_modules ni cachés. Su extracción, instalación y compilación se verifican en el informe 11.
