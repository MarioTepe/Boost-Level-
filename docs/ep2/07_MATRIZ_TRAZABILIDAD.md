# Matriz de requisitos, desarrollo y pruebas

**Versión:** 0.3 · **Fecha:** 24-10-2026  
**Estado:** RF-01 a RF-22 implementados y verificados mediante los casos automatizados asociados. RNF sujetos a revisión manual conservan el estado detallado al final. Fuentes S1–S8 en diagnóstico, paquetes B en backlog y casos TU/TC/TI/TM en plan de pruebas.

La evidencia común de las filas automatizadas es la corrida del 24-10-2026 22:50:55 UTC: **144 aprobadas, 0 fallos, 0 skip/todo**, en [vitest.json](evidencias/vitest.json). Los nombres agrupan los IDs del plan; sus variantes parametrizadas comprueban límites y alternativas. [El informe](06_INFORME_COBERTURA_BORRADOR.md) y [el manifiesto](evidencias/fuentes-sha256.json) identifican métricas y commit del código medido. La columna de evidencia describe el comportamiento comprobado o la revisión manual requerida, según el estado de cierre.

## Funcionales

| Requisito | Fuente | Paquete | Módulo principal | Casos | Evidencia prevista |
|---|---|---|---|---|---|
| RF-01 | S1/S6 | B-03 | catalogo, data | TC-01, TI-01 | Lista y estado vacío, datos originales |
| RF-02 | S1/S6 | B-03 | catalogo | TC-13, TI-10 | Filtros combinados/categoría |
| RF-03 | S1/S6 | B-03 | catalogo | TC-02, TC-03, TI-10 | Detalle válido/no encontrado |
| RF-04 | S6/S8 | B-04 | domain/carrito.reducer.js | TU-01, TU-02, TU-03, TU-04, TU-05, TC-04, TC-05, TI-02 | Stock 15 acepta 15 y rechaza 16 |
| RF-05 | S1/S6/S8 | B-04 | carrito, domain/precios.js | TU-06, TU-07, TC-06, TC-07, TC-08, TI-01 | Líneas, cantidades, totales y gratuito |
| RF-06 | S1/S6 | B-02 | repositories | TU-08, TU-18, TI-05 | Recuperación JSON/versión y fallo storage |
| RF-07 | S1/diseño | B-06 | checkout, domain/validaciones.js | TC-09, TU-25, TI-03 | Datos, modalidades y precarga |
| RF-08 | S1/S8 | B-06 | services/tienda.service.js | TU-09, TU-19, TI-02, TI-04 | Stock/precio cambiado sin compra parcial |
| RF-09 | S1 | B-06 | services/tienda.service.js, repositories | TU-10, TU-18, TC-11, TI-03 | Pedido/stock/carrito guardados juntos |
| RF-10 | S1 | B-06 | checkout, simulador | TU-11, TC-10, TI-04 | Rechazo mantiene estado |
| RF-11 | S8/integridad | B-06 | tienda.service.js, pedidos | TU-12, TI-03 | Intento repetido/recarga sin descuento doble |
| RF-12 | S6/S8 | B-05 | autenticacion, SessionProvider | TU-17, TC-12, TI-07, TM-03 | Login/rol/logout y acceso documentado |
| RF-13 | S1/S6 | B-05 | autenticacion, validaciones | TU-16, TU-22, TC-15, TI-07 | Alta única → login |
| RF-14 | S1/S6 | B-07 | administracion, repository | TU-14, TU-24, TC-14, TI-06 | Alta/edición/baja y persistencia |
| RF-15 | S1/diseño | B-07 | administracion, repository | TU-15, TI-06 | Categoría sin huérfanos |
| RF-16 | S1/S6 | B-07 | administracion, repository | TU-16, TU-24, TC-15, TI-08 | Usuario correcto por ID y baja lógica |
| RF-17 | S1 | B-08 | administracion/pedidos | TU-23, TI-03, TI-09 | Pedido por ID y snapshot histórico |
| RF-18 | S1/S6 | B-08 | selectores admin | TU-23, TI-08, TI-09 | Críticos e historial filtrado |
| RF-19 | S1/diseño | B-08 | reportes, perfil | TU-23, TU-24, TI-08, TI-09 | Indicadores derivados y perfil protegido |
| RF-20 | S1/S6 | B-08 | contenido | TC-18, TI-10, TM-03 | Páginas y contacto simulado |
| RF-21 | S1/diseño | B-03/B-07 | catalogo, precios | TU-21, TC-16, TI-06 | Oferta/base coherentes |
| RF-22 | S6/diseño | B-05 | domain/precios.js | TU-20, TC-17, TI-07 | Elegibilidad, redondeo y totales |

## No funcionales

| Requisito | Fuente | Paquete | Casos y revisión | Evidencia prevista |
|---|---|---|---|---|
| RNF-01 | S1/S2, diseño | B-01/B-02/B-09 | TU-01, TU-02, TC-05; revisión de pureza y propiedad del estado | Código revisado y pruebas de inmutabilidad/props |
| RNF-02 | S1/S2 | B-01/B-09 | TM-01 | Capturas a 375/768/1280 px |
| RNF-03 | S1/S2/S5 | B-09 | TC-01 a TC-18; suite completa | Resumen real de ejecución con 0 fallos/skip/todo |
| RNF-04 | S5 | B-09/B-10 | Configuración coverage y suite | 4 métricas, cubiertos/total y archivos incluidos/excluidos |
| RNF-05 | Usabilidad/diseño | B-09 | TC-09, TM-02 | Revisión teclado/labels/foco/alt |
| RNF-06 | S8 | B-01/B-10 | TM-03 | README recorrido por lector nuevo |
| RNF-07 | Límite de la demo | B-05/B-06/B-10 | TU-17, TC-12, TM-03 | Aviso de demo, cuentas ficticias y guardas |
| RNF-08 | S8/diseño | B-02/B-04/B-06 | TU-06, TU-07, TU-13, TU-18, TU-19, TU-20, TI-04 | Cálculos e integridad ante error |
| RNF-09 | S1/S2/diseño | B-01/B-09 | TI-10, TM-03 | Build, rutas/refresco y consola |
| RNF-10 | S1/S2/S5/S8 | B-10 | TM-04 | SHA, GitHub, ZIP y documentos finales |

## Control de criterios de cierre

1. Cada RF/RNF tiene caso o revisión explícita.
2. Cada caso citado está definido en el plan; sus grupos de pruebas están en dominio.test.js, servicios.test.js y App.test.jsx. Las revisiones manuales tienen su registro separado.
3. El reporte usa una sola ejecución sobre código versionado y un manifiesto de fuentes. Los porcentajes no sustituyen esta verificación funcional; repetir la medición si cambia el código/configuración.
4. Si cambian reglas de precios, entrega o sesión, actualizar ERS, contratos, casos y esta matriz en el mismo cambio.

## Estado de los requisitos no funcionales

RNF-01/03/04/07/08: implementados y comprobados mediante código, reglas, pruebas y métricas registradas. RNF-02: revisión adaptable local realizada a 375/768/1280 px; capturas y límites en [evidencias](evidencias/README.md). RNF-05: verificación de UI automatizada y revisión parcial de teclado; falta recorrido manual completo por otra persona. RNF-06: README actualizado; falta lectura por un integrante que no haya preparado el arranque. RNF-09: lint/build y recarga local con BrowserRouter comprobados; hosting pendiente. RNF-10: documentación técnica preparada y código versionado; formatos finales y paquete académico pendientes. No se declara revisión cruzada, aprobación docente ni entrega final.
