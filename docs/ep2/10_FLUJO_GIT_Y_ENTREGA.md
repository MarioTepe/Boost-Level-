# Flujo Git y preparación de entrega

**Fecha:** 25-10-2026. **Equipo:** Jordán Guzmán Parra, Mario Tepe Espinoza y Luis Contreras Gonzalez.

Repositorio compartido: [MarioTepe/Boost-Level-](https://github.com/MarioTepe/Boost-Level-), rama principal main. README raíz presenta EP2 y conserva EP1 como referencia. El incremento React está en frontend/ y la documentación en docs/ep2/.

## Incremento actual

| Commit | Trabajo registrado |
|---|---|
| 9ed9401 | Implementación React: tienda, administración, pruebas, BrowserRouter, páginas/componentes separados, README y validación de frontend en GitHub Actions. |
| 97c23a8 | Sincronización explícita de las actualizaciones asíncronas en la prueba de compra. Fue el commit medido en la revisión 0.5 del informe. |
| Commit de documentación posterior | ERS, arquitectura, casos, matriz, correspondencia con clases, guía de explicación y evidencias de esa medición. Su SHA se consulta en el historial del repositorio. |
| e093648 | Ajuste acotado según la guía de pruebas S13: diez casos de catálogo, junto a los componentes y con userEvent/await. Código medido en la revisión 0.6. |

Son cambios realizados en este incremento, con las fechas e identidad configuradas en Git. Las responsabilidades del backlog siguen siendo una propuesta de organización; no acreditan revisión cruzada realizada. El informe conserva el SHA del código medido aunque después se agregue documentación.

## Cómo avanzar de a poco

1. Elegir una mejora concreta y anotar el comportamiento esperado: por ejemplo, un ajuste de filtro o una validación de formulario.
2. Actualizar la copia local desde main y trabajar en una rama del tema. No mezclar cambios ajenos al objetivo.
3. Implementar y probar ese comportamiento; revisar formato, lint, pruebas pertinentes y build. Si cambian reglas o configuración, regenerar cobertura y evidencia del informe.
4. Revisar el diff, crear un commit que describa lo que cambió y subir la rama. Usar una solicitud de cambios para que otro integrante revise antes de integrar a main.
5. Registrar la revisión real, integrar el cambio y comprobar la validación de GitHub. Repetir el flujo para el siguiente incremento.

El workflow de frontend se ejecuta cuando cambian frontend/ o su configuración. Instala con npm ci y comprueba formato, lint, cobertura y compilación. No publica un sitio ni realiza cobros.

## Qué falta para la entrega académica

- Revisar entre los tres la guía de explicación y los diez casos seleccionados; cada integrante debe poder explicar el flujo completo.
- Revisar el alcance backend con el profesor. La guía de pruebas S13 ya documenta Vitest; no equivale a una aprobación de la entrega.
- Completar revisión manual de teclado/formularios y lectura del README por otra persona.
- Emitir los formatos académicos finales y preparar fuente y coverage.zip según la pauta.
- Verificar instalación desde una copia limpia del paquete y ensayar la presentación.

El código se comparte mediante GitHub; el despliegue público de la aplicación se prepara por separado y requiere la regla de fallback de BrowserRouter. La guía de clases, sección 18, explica esa configuración.
