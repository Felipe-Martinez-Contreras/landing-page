# Decisiones

Registro breve de decisiones tomadas ante ambigüedades (1–3 líneas cada una).

## Fase 0: Entorno

- **Generación en carpeta temporal.** `create-astro` se ejecutó fuera del repo y se movió a la raíz sin sobrescribir nada. No se copiaron el `README.md`, `CLAUDE.md`, `AGENTS.md` ni `.vscode/` que trae la plantilla: ya existen o duplican instrucciones de `CLAUDE.md`.
- **`.gitignore` combinado.** Se conservó el existente (convertido de ISO-8859-1/CRLF a UTF-8/LF) y se sumaron las entradas de la plantilla de Astro que faltaban y `.screenshots/`.
- **Finales de línea.** `.gitattributes` con `* text=auto eol=lf` y Prettier con `endOfLine: "lf"`, para trabajar en Windows sin diferencias de CRLF.
- **Prettier ignora `CLAUDE.md` y `docs/CONTENT.md`.** Son documentos editados a mano; reformatearlos cambiaría archivos que no debo tocar sin permiso.
- **Fuentes (Fonts API) se configuran en la Fase 2.** Las familias se eligen en `DESIGN.md` (Fase 1); configurar una provisional sería una elección por defecto.
- **`content.config.ts` se crea en la Fase 3**, junto con los esquemas; una colección sin esquema real no aporta nada ahora.
- **`site` provisional:** `https://fmartinez.xyz` (dominio marcado como momentáneo). Hosting pendiente hasta la Fase 6.
- **Carpetas vacías con `.gitkeep`** para que la estructura de §4 quede versionada.

## Fase 1: Dirección visual

- **Token extra `--highlight`** (guinda) para el dato resaltado en figuras, separado de `--accent` (acción). Evita que un punto de un gráfico parezca pulsable.
- **Código con monoespaciada de sistema**, no una tercera familia: solo aparece en bloques de código de los casos de estudio.
- **Clustering descartado como elemento distintivo:** son datos clínicos (§6).
- **SINCA no se usa** para la opción B: su sitio declara «Todos los derechos reservados» y no publica una licencia abierta.
- **`scripts/contrast.mjs`** queda en el repo para recalcular la tabla de contraste si cambia la paleta.
- **Elemento distintivo elegido: opción A («Chile en puntos»)**, con el dataset de establecimientos del MINSAL (CC0). Paleta y tipografía aprobadas sin cambios.

## Fase 2: Fundaciones

- **Archivo con eje `wdth`.** Fontsource entrega el archivo `standard` (wght + wdth, 90 KB, sin precarga); se declara `stretch: "62% 125%"` para que `font-stretch` funcione. El condensado de DESIGN.md §3 queda activo; su costo se mide con Lighthouse en la Fase 6.
- **Variante `js:`** (clase `.js` que pone el script del `<head>`). El botón de menú y el toggle de tema solo se muestran con JS; sin JS, la navegación aparece como segunda fila del header y el tema sigue siendo el claro. Nada de contenido depende de JS.
- **Enlaces externos en la misma pestaña**, con `rel="noopener noreferrer"`. Así no hace falta aviso para lectores de pantalla (§7).
- **Menú móvil:** Esc lo cierra y devuelve el foco al botón; al elegir un enlace se cierra y el foco sigue al ancla (devolverlo al botón haría perder la sección elegida).
- **`CardLink`** como primitivo adicional de `ui/` para el patrón de enlace extendido; el anillo de foco va en el `::after`, así rodea la tarjeta completa.
- **Mapa de logos en `lib/brands.ts`.** LinkedIn no existe en `simple-icons`, así que se muestra como texto.
- **`site.ts` y `ui.ts` mínimos** (identidad, enlaces, navegación y SEO por defecto); la Fase 3 agrega el resto. `sourceUrl` queda como `TODO:`.
- **Fechas en `America/Santiago`**, para que la «última actualización» coincida con el día local y no con UTC.
- **Resaltado de código (Shiki, temas duales) se configura en la Fase 5**, junto con los casos de estudio que lo usan.
- **Adorno quitado:** el fondo en hover del botón secundario; el borde que se oscurece ya basta como señal.
