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

## Fase 3: Contenido y secciones

- **Textos elegidos por el propietario:** hero A (herramientas y base), bio A (planillero primero, ángulo validado), título «Clustering exploratorio sobre el dataset Wisconsin Breast Cancer» y sin línea personal.
- **Campos extra en `projects`:** `shortTitle` (nombre corto para los enlaces de evidencia en Habilidades) y `coverAlt` (texto alternativo de `cover`). Ambos opcionales.
- **Encuadre del clustering:** el `problem` dice «casos» y omite «que puedan apoyar el diagnóstico médico», para no sugerir utilidad clínica (encuadre obligatorio de `CONTENT.md`).
- **Sin cuerpo Markdown todavía:** los casos de estudio se escriben en la Fase 5 tras la entrevista. Hoy ninguna tarjeta tiene acción principal (faltan enlaces), así que el título se muestra sin enlace.
- **Métricas fuera de las tarjetas:** el `result` ya contiene las cifras; las métricas con su comparación se muestran en el caso de estudio (§6).
- **Trayectoria de la más reciente a la más antigua.** Sin año de ingreso, la universidad muestra «En curso» en lugar de un rango.
- **Idiomas:** solo inglés, porque `CONTENT.md` no declara el español.
- **Habilidades:** dentro de cada grupo, primero las tecnologías con evidencia en proyectos y luego el resto, en el orden del registro.
- **Hero con ranura `figure`** vacía hasta la Fase 4 (elemento distintivo); sin ella, el texto ocupa la columna de lectura sin dejar hueco.
- **«Copiar correo» se agrega en la Fase 4** con su script; hoy el `mailto:` funciona solo.
- **Adorno quitado:** el ícono de sobre junto al correo.

## Notas para la Fase 6

- **CLS del `h1` con Archivo** (pedido del propietario): medir el CLS del titular mientras carga Archivo (sin precarga). Si hay salto, precargar su archivo o reducirla a latin (la configuración ya pide `subsets: ["latin"]`; verificar qué archivo sirve realmente Fontsource).

## Fase 4: Interacción y elemento distintivo

- **Año de ingreso: 2019** (dato del propietario); la trayectoria muestra 2019–hoy. **Idiomas:** se mantiene solo inglés, por indicación del propietario.
- **Mapa como SVG inline, no como imagen de `sharp`.** Un `path` por capa con un segmento de largo cero por punto (extremos redondeados, `non-scaling-stroke`), deduplicado en una rejilla de 600 unidades de alto: 12,5 KB sin comprimir y 2,6 KB con gzip, frente a 15–35 KB por imagen y tema. Toma los colores de los tokens (sin una imagen por tema), se ve nítido en cualquier densidad y no compite por el LCP.
- **Snapshot en `scripts/data/health-facilities.csv`** (lat, lon, urgencia y región de los 5.288 vigentes con coordenadas, corte 22-09-2026, CC0). Lo procesa `scripts/build-health-map.mjs`, que genera `src/data/health-map.json`; el pie se compone en `src/data/health-map.ts` a partir de esos conteos, sin cifras escritas a mano.
- **Solo Chile continental (5.284 establecimientos, 1.520 puntos):** quedan fuera Rapa Nui, Juan Fernández y un registro con latitud inválida, y el pie lo dice. Las celdas con al menos una de las 755 urgencias (442 puntos) van en guinda y con un punto más grande, para que el color no sea la única señal.
- **Afirmación del pie calculada:** el 57 % queda entre 32° y 38,5° S y la RM reúne 1.069. Reemplaza el «se concentran en el valle central» del boceto, que era una impresión.
- **Móvil:** el mapa es una franja de 56–64 px a la derecha del texto y el pie va después de las acciones; los rótulos (Arica, Santiago, Punta Arenas) solo aparecen desde `lg`.
- **`DotMap` en `ui/`**, genérico (capas, rótulos y pie por props); `Hero` lo recibe como prop `figure` en lugar de una ranura, para controlar su posición.
- **Copiar correo:** el botón nace con `hidden` y el script lo muestra solo si existe la Clipboard API; la confirmación va en un `role="status"`. JS total de cliente: 0,9 KB con gzip.
- **Sin filtro de proyectos:** hay 3 y el filtro se exige desde 6 (§6).
- **Adorno quitado:** una leyenda de color aparte del pie; el pie ya nombra la guinda y el tamaño del punto.

## Antes de la Fase 5

- **Pie del mapa corregido:** decía «uno por punto», pero la rejilla (~7 km por celda) agrupa hasta 222 establecimientos en un punto: son 1.520 puntos para 5.284 establecimientos. El pie ahora lo dice y aclara que el mapa muestra dónde hay establecimientos, no cuántos; el script exporta `grid` (tamaño de celda y puntos por capa) para que esas cifras no se escriban a mano. Se mantiene la agrupación: dibujar un punto por establecimiento superpondría puntos idénticos sin cambiar lo que se ve.

## Fase 5: Casos de estudio

- **Resaltado de código:** Shiki (el que usa Astro 7 con Sätteri) con `github-light-default` y `github-dark-default`. Medí sus colores contra `--surface`: todos los de sintaxis pasan 4,5:1 en ambos temas (los de `github-light`/`github-dark` no). El fondo del bloque se fuerza a `--surface` y el tema oscuro se activa con `.dark`.
- **Ficha en el margen de anotaciones:** en escritorio ocupa las 4 columnas de la derecha junto al cuerpo; en móvil va entre el resumen y el cuerpo, en el orden de §6. Muestra año, estado, contexto, rol, tecnologías, métodos y enlaces externos. Las `metrics` no van en la ficha: una cifra suelta en un margen incumple «toda métrica con su comparación»; van en el cuerpo, con su contexto.
- **«Siguiente caso de estudio» circular** (el último enlaza al primero), en el orden de la home; si hay un solo caso, no aparece.
- **Esqueleto `TODO:` de la plantilla** en los dos casos seguros, para probar la ruta; el clustering queda sin cuerpo hasta su entrevista (caso condicional).
- **Adorno quitado:** las viñetas de «Métodos» en la ficha.
