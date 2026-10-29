# Plan de desarrollo y organización del equipo

**Versión:** 0.3 · **Fecha:** 25-10-2026  
**Estado:** implementación local completada; reparto y calendario conservados como propuesta, pendientes de revisión entre los integrantes.

## 1. Responsabilidades

| Integrante | Foco propuesto | Revisión cruzada |
|---|---|---|
| Jordán Guzmán Parra | Reglas de carrito, stock y servicio de compra | Revisa catálogo y contratos de componentes con Mario. |
| Mario Tepe Espinoza | Estructura React, navegación, catálogo y adaptación visual | Revisa formularios y administración con Luis. |
| Luis Contreras Gonzalez | Repositorio local, sesión, CRUD administrativo y consolidación del informe | Revisa cálculos y persistencia de compra con Jordán. |

Cada integrante escribe pruebas de su parte y participa en la integración. La consolidación del informe no concentra toda la responsabilidad de calidad en una persona. Registrar las revisiones cuando realmente se completen.

## 2. Paquetes de trabajo

| ID | Trabajo / requisitos | Depende de | Criterio de término |
|---|---|---|---|
| B-01 | Base React, router, layouts, scripts y Vitest; RNF-01/02/03/06/09 | ERS/arquitectura | Paquete frontend/ propio; pantalla inicial, enlace docs y prueba de componente ejecutable. |
| B-02 | Datos, repositorio único y adaptador; RF-06, RNF-08 | B-01 | Importa once productos/categorías; lectura validada y guardado completo; prueba de JSON inválido y escritura fallida. |
| B-03 | Catálogo, filtros, detalle y ofertas; RF-01/02/03/21 | B-02 | Rutas públicas, filtro combinado, precio vigente y estados vacíos/no encontrado. |
| B-04 | Carrito y stock; RF-04/05 | B-02/B-03 | Agregar/modificar/quitar/vaciar, máximo stock, importes y persistencia. No existe vía de agregar 16 si stock es 15. |
| B-05 | Sesión, registro, roles y descuento; RF-12/13/22 | B-02 | Registro→login, cuenta demo admin accesible, logout, guardas y cálculo de elegibilidad. |
| B-06 | Entrega, compra y resultado; RF-07–RF-11 | B-04/B-05 | Resumen, rechazo/success deterministas, revalidación final, orden/stock/carrito guardados juntos, intento único. |
| B-07 | CRUD productos/categorías/usuarios; RF-14/15/16 | B-02/B-05 | Acciones por ID, validación, baja lógica y datos comunes entre admin y tienda. |
| B-08 | Pedidos, críticos, historial, reportes, perfil y contenido; RF-17–RF-20 | B-06/B-07 | Vistas del diagrama completas con datos reales de la demo; contenido institucional migrado. |
| B-09 | Revisión integrada de pruebas, responsive y accesibilidad; RNF-01–RNF-09 | Incrementos anteriores | Todos los escenarios críticos pasan, >=80% en cuatro métricas y revisión manual documentada. |
| B-10 | ERS, informe, evidencia y entrega; RNF-06/RNF-10 | B-09 | SHA final, README verificado, formatos solicitados, ZIP fuente y coverage.zip aparte, exposición ensayada. |

Las pruebas acompañan B-01 a B-08. B-09 reúne la regresión final. Ningún paquete se cierra solo por agregar archivos: debe demostrarse el comportamiento del requisito.

## 3. Orden sugerido para una semana

S2 establece una semana; las fechas de entrega efectivas se obtienen de AVA/docente. La siguiente distribución es orientativa, sin imponer fechas calendario:

| Jornada | Objetivo |
|---|---|
| 1 | B-01/B-02: base, datos y contrato de almacenamiento; repartir trabajo y revisar decisiones. |
| 2 | B-03/B-04: catálogo, detalle, ofertas y carrito con límite de stock. |
| 3 | B-05 y comienzo B-07: sesión, registro y CRUD; probar descuento y formularios. |
| 4 | B-06: compra y resultados, fallo de guardado e intentos repetidos. |
| 5 | Completar B-07/B-08: administración, reportes y contenido heredado. |
| 6 | B-09: corregir regresiones, revisar responsive y analizar cobertura. |
| 7 | B-10: documentos finales, evidencia, verificación del ZIP y exposición. |

Si el tiempo no alcanza, registrar qué requisito se difiere, impacto y acuerdo del equipo/docente. P1 determina secuencia, no una eliminación automática de vistas.

## 4. Primer incremento para comenzar

1. Revisar estado Git de ambos repositorios. Trabajar en `ProyectoFull/Boost-Level-`; conservar los cambios locales de `clase-tienda-react`.
2. Crear `frontend/` con React/JSX, versiones compatibles verificadas y lock propio. Copiar recursos/datos seleccionados; no copiar la carpeta `.git` ni sobrescribir EP1.
3. Crear scripts dev/build/preview/lint/test/test:ejecutar/test:cobertura y setup de pruebas según el plan.
4. Montar layout y una ruta de catálogo con datos Boost Level.
5. Verificar una tarjeta: nombre, precio, agotado y callback con ID correcto. Corregir el contrato onAgregar/onAgregarProducto que falla en la referencia de clases.
6. Agregar repositorio validado y prueba de stock al límite antes de extender el resto de páginas.

**Estado actual:** este primer incremento y los módulos B-02 a B-08 están implementados. El recorrido se conserva para explicar el orden de construcción; ya no representa trabajo pendiente de iniciar.

## 5. Evidencia y revisión

Repositorio común: [MarioTepe/Boost-Level-](https://github.com/MarioTepe/Boost-Level-). README raíz es la entrada para revisar el proyecto.

- Relacionar cada paquete B con sus IDs RF/RNF.
- Revisar cada cambio entre integrantes.
- Vincular los casos P-01 a P-33 y las revisiones TM-01 a TM-04 con la matriz.
- Conservar hashes de las fuentes, fecha, comandos y salida de una misma corrida de cobertura.
- Excluir node_modules/dist/coverage y archivos privados del código versionado; adjuntar coverage.zip como pide S5. El ZIP fuente sí lleva package-lock.json.
- Verificar instalación desde una copia de entrega y enlace/visibilidad del repo compartido. El informe conserva la medición real y los hashes de las fuentes.

## 6. Definición de terminado

Un requisito se marca implementado cuando cumple su aceptación, tiene pruebas pertinentes, pasa revisión del código y se integra con las otras vistas. Un requisito se marca verificado al registrar la evidencia sobre la versión correspondiente. Los escenarios manuales deben identificar navegador, dimensiones, ruta y resultado.

Se emiten ERS/informe finales tras revisión real del equipo. Documentar una elección o proponer un responsable no acredita aprobación, firma ni desarrollo realizado.

## 7. Presentación

| Tiempo | Demostración |
|---|---|
| 0–2 min | Feedback EP1 y objetivos de la segunda entrega. |
| 2–5 min | Componentes/props/estado, repositorio y Bootstrap. |
| 5–9 min | Catálogo → límite stock → checkout → rechazo → éxito y resumen. |
| 9–12 min | Producto modificado desde admin y reflejado en tienda; pedidos/críticos. |
| 12–14 min | Casos de componentes y reglas, mocks y reporte de cobertura real. |
| 14–15 min | Trazabilidad, documentación y límites de la demostración. |
| 5 min adicionales | Preguntas individuales al equipo. |

Los tres deben explicar una prueba, una decisión técnica, el manejo de errores y cómo los requisitos se reflejan en el código.

## 8. Avance comprobado del incremento

- B-01 a B-08: código implementado en frontend/, con 33 pruebas automatizadas aprobadas. No implica atribución de contribuciones individuales ni revisión cruzada realizada.
- B-09: lint y build correctos; cuatro métricas sobre 80%; responsive local registrado. Falta completar revisión manual de teclado/formularios por otra persona.
- B-10: ERS, arquitectura, plan, matriz, informe medido y guía de explicación preparados; fuentes y suite identificadas por hashes. Copias Word/Excel y coverage.zip preparados; falta revisión del equipo e instalación limpia. La [guía de entrega](10_FLUJO_GIT_Y_ENTREGA.md) organiza los incrementos posteriores.

Las evidencias y sus límites se consultan en [el informe](06_INFORME_COBERTURA_BORRADOR.md) y [el registro local](evidencias/README.md). La siguiente actividad del equipo es recorrer la [guía del código](08_GUIA_EXPLICACION_CODIGO.md) y repetir la demostración antes de preparar la entrega académica.

La revisión local del 26-10-2026 conserva 33 pruebas en cinco archivos; resultados y alcance en el [informe](06_INFORME_COBERTURA_BORRADOR.md). 
