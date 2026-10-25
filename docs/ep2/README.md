# Documentación de Boost Level EP2

**Revisión:** 0.6 · **Fecha:** 25-10-2026  
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
| [10 Flujo Git y entrega](10_FLUJO_GIT_Y_ENTREGA.md) | Registro del incremento y forma de preparar los cambios siguientes y la entrega académica. |

## Decisiones para comenzar

- React con JavaScript/JSX y Vite, Bootstrap, Router declarativo, Vitest/Testing Library/jsdom/V8.
- Repositorio único con persistencia de pedido, stock y carrito en un documento local versionado. Reducers y cálculos puros; servicios realizan operaciones de almacenamiento.
- Checkout como invitado o cliente demo, compra aceptada/rechazada determinista e intento identificable para evitar duplicados.
- Ofertas editables y descuento institucional con reglas de cálculo explícitas en la ERS.
- Conservación de EP1 y del ejercicio independiente de clases; responsables del backlog son una propuesta, no atribución de trabajo ya realizado.

Los paquetes se verifican con pruebas, lint, build y revisión del navegador. La [guía de pruebas del profesor](https://vihgo.github.io/repaso-dsy1104-2026/#guia-pruebas) (S13) confirma Vitest. Queda contrastar la frase sobre backend; las reglas de entrega/descuento requieren revisión del equipo. No se atribuye una revisión docente de la entrega.

## Estado de los documentos

La revisión 0.2 corrigió inconsistencias de alcance, nombres de rutas/módulos, callback de tarjeta, pureza del reducer, persistencia conjunta y umbral de cobertura. Incorporó ofertas y descuento como requisitos propios y vinculó los requisitos a pruebas. El diagnóstico conserva los resultados iniciales del ejercicio de clase como referencia histórica.

Los documentos son una base técnica versionada. La ERS y el informe final deberán emitirse con el contenido/evidencia revisados y los formatos que solicite el docente. Ninguna tabla de resultados pendiente acredita pruebas aprobadas.

La revisión 0.3 incorpora el código React y una guía para estudiarlo: useState, props, eventos, actualización inmutable y componentes Card/Button/Badge/Row/Col de React Bootstrap utilizados en clases. Context, rutas, repositorio y control de intentos se explican como ampliaciones del proyecto. Registra 144 pruebas aprobadas y cobertura real de 99,37% sentencias, 97,95% ramas, 100% funciones y 99,56% líneas. Lint y build pasan. Las capturas y revisiones parciales están en [evidencias](evidencias/README.md); el cierre académico requiere revisión del equipo y paquete final.

La revisión 0.4 incorporó FullStack II como fuentes S9–S12 y corrigió esa clasificación inicial: useEffect, localStorage y Router ya están desarrollados en el material de clase. Identificó dos diferencias que aún estaban pendientes en esa revisión: router y organización de archivos.

La revisión 0.5 aplica BrowserRouter, traslada App.jsx a src/, separa páginas/componentes por archivo y pasa datos/callbacks a la grilla y tarjetas. Context, servicios y consistencia de compra siguen siendo decisiones adicionales. La nueva corrida sobre código versionado conserva 144 pruebas aprobadas: 99,37% sentencias, 97,95% ramas, 100% funciones y 99,56% líneas. El informe registra el SHA exacto; las capturas antiguas se distinguen del recorrido nuevo con BrowserRouter.

La revisión 0.6 incorpora la guía de pruebas del profesor como S13 y limita el ajuste a diez casos concretos de catálogo: datos nuevos por caso, Preparar/Actuar/Comprobar y userEvent con await. No cambia código de producción ni añade funcionalidades. La suite completa tiene 153 pruebas aprobadas; las cuatro métricas conservan los porcentajes de la revisión anterior. Para estudiar, comenzar por esos diez casos y el recorrido de fundamentos de la guía de explicación.
