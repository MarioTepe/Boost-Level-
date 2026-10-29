# Documentación de Boost Level EP2

**Revisión:** 0.11 · **Fecha:** 29-10-2026  
**Integrantes:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez.

Esta carpeta reúne problemas detectados, requisitos, arquitectura, organización del equipo y pruebas. La migración React está implementada en `frontend/`; las páginas HTML se conservan como referencia de EP1. El estado de verificación se registra junto a las evidencias de ejecución.

## Lectura recomendada

| Documento | Uso |
|---|---|
| [01 Diagnóstico y fuentes](01_DIAGNOSTICO_Y_FUENTES.md) | Revisar feedback, código existente y diferencia entre la pauta y las herramientas de clases. |
| [02 ERS V2](02_ERS_v2_requerimientos.md) | Consultar los 22 requisitos funcionales, 10 no funcionales y reglas de negocio. |
| [03 Arquitectura](03_ARQUITECTURA_PROPUESTA.md) | Ubicación del paquete React, módulos, estado, datos, contratos y rutas. |
| [04 Backlog y roles](04_BACKLOG_Y_ROLES.md) | Primer incremento, dependencias y reparto propuesto entre integrantes. |
| [05 Plan de pruebas](05_PLAN_PRUEBAS.md) | Escenarios de unidad, componentes, integración y revisión manual; configuración utilizada. |
| [06 Informe de cobertura](06_INFORME_COBERTURA_BORRADOR.md) | Resultados medidos, caminos no cubiertos y revisión de entrega pendiente. |
| [07 Matriz de trazabilidad](07_MATRIZ_TRAZABILIDAD.md) | Relacionar cada requisito con módulo, paquete, caso y evidencia. |
| [08 Guía de explicación del código](08_GUIA_EXPLICACION_CODIGO.md) | Recorrido por el código y su relación con lo visto en clases, para preparar la exposición. |
| [09 Correspondencia con FullStack II](09_CORRESPONDENCIA_GUIAS_CLASE.md) | Nuevas guías React/Router, contenidos ya enseñados y diferencias de router/organización del código. |
| [10 Entrega y despliegue](10_FLUJO_GIT_Y_ENTREGA.md) | Revisión final, paquetes, presentación y despliegue en AWS Academy / Learner Lab. |
| [11 Revisión de presentación](11_REVISION_PRESENTACION.md) | Resultado actual de rúbrica, pantallas, pruebas, instalación limpia y pendientes. |

## Decisiones para comenzar

- React con JavaScript/JSX y Vite, Bootstrap, Router declarativo, Vitest/Testing Library/jsdom/V8.
- Repositorio único con persistencia de pedido, stock y carrito en un documento local versionado. Reducers y cálculos puros; servicios realizan operaciones de almacenamiento.
- Checkout como invitado o cliente demo, compra aceptada/rechazada determinista e intento identificable para evitar duplicados.
- Ofertas editables y descuento institucional con reglas de cálculo explícitas en la ERS.
- Conservación de EP1 y del ejercicio independiente de clases; responsables del backlog son una propuesta, no atribución de trabajo ya realizado.

Los paquetes se verifican con pruebas, lint, build y revisión del navegador. La [guía de pruebas del profesor](https://vihgo.github.io/repaso-dsy1104-2026/#guia-pruebas) (S13) confirma Vitest. El equipo confirmó el 28-10-2026 que el profesor exige solo frontend; las reglas de entrega/descuento requieren revisión del equipo. No se atribuye una revisión docente de la entrega.

## Estado actual

La suite se redujo de 153 a **33 pruebas aprobadas**, cero fallos, skip y todo, en cinco archivos. Cobertura global: **93,12% sentencias, 90,46% ramas, 94,32% funciones y 94,22% líneas**. Se mantienen los 72 archivos productivos y el umbral del 80% en las cuatro métricas.

El plan identifica diez casos para ensayar. La matriz y el informe distinguen los caminos conservados de las variantes retiradas. Las copias Word/Excel y coverage.zip corresponden a la corrida final del 29-10-2026, con checkout HTTP y ofertas persistentes.

Se recorrieron las pantallas y se verificó instalación/compilación desde una extracción limpia. Falta revisión por otra persona y ensayo individual. AWS Academy / Learner Lab aloja la versión final en la instancia existente desde el 29-10-2026. La validación pública de Ofertas y checkout está registrada en evidencias; la revisión por otro integrante y el ensayo individual siguen pendientes.

## Cierre técnico del 29 de octubre

Cuatro ofertas de demostración, precios y porcentajes visibles, carrito preservado al actualizar y checkout compatible con HTTP. AWS EC2 se actualizó el 29-10-2026 en la instancia existente. La validación pública comprobó Ofertas con cuatro productos y el checkout por HTTP hasta el comprobante simulado; no se realizan cobros. La dirección es dinámica y el equipo se la comunicará directamente al profesor el día de la presentación. No se requiere HTTPS para esta demostración. Consulte la revisión 11 y las evidencias públicas para distinguir la corrida Vitest local del recorrido manual en AWS.
