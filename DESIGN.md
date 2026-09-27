# DESIGN.md: dirección visual

Fase 1. Documento de diseño previo a cualquier código de UI. Los valores de este archivo se trasladan tal cual a `src/styles/global.css` en la Fase 2.

## 1. Tema y trabajo principal

**Un cuaderno de análisis: cada sección se lee como una figura bien anotada (título que afirma algo, datos, pie con la fuente), porque así presento un trabajo con datos.**

El anclaje es el mundo real del perfil, no la estética de «portafolio de developer»: la planilla de producción que llenaba en terreno, el gráfico con sus ejes y su fuente, el notebook donde el texto y el resultado conviven. De ahí salen tres reglas que atraviesan todo el sitio:

1. **Anatomía de figura.** Título que dice algo, contenido y un pie discreto (fuente, fecha, contexto). Se aplica al hero, a los proyectos y a los casos de estudio.
2. **Margen de anotaciones.** En escritorio, la columna de lectura va a la izquierda y un margen derecho lleva metadatos: año, estado y tecnologías. Es el margen de un cuaderno, no una barra lateral.
3. **El color es tinta, no decoración.** Un azul de tinta para actuar (enlaces, botones, foco) y un solo color de dato (guinda) reservado para el valor que importa dentro de una figura.

## 2. Paleta

### Colores con nombre

| Nombre            | Hex       | Por qué existe                                                                                                  |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| Papel             | `#F3F5F4` | Fondo claro frío, apenas verdoso, como papel de planilla o milimetrado. No es crema.                            |
| Tinta de planilla | `#15202B` | Texto principal: negro azulado de tinta, no gris neutro ni `#111`.                                              |
| Grafito           | `#4D5A66` | Texto secundario, pies de figura y metadatos.                                                                   |
| Cuadrícula        | `#C9D1D5` | Divisores y reglas de tabla, siempre decorativos.                                                               |
| Cobalto           | `#2346B0` | Acción: enlaces, botón principal y anillo de foco.                                                              |
| Guinda            | `#A11D3A` | Color de dato: el valor destacado dentro de una figura y nada más. Guiño a la temporada de cereza, sin decirlo. |

### Tokens

Además de los siete tokens obligatorios, agrego `--highlight` para el color de dato. Así las figuras no reutilizan el acento de acción, que significa «esto se puede pulsar».

| Token          | Claro                  | Oscuro    | Uso                                                                                 |
| -------------- | ---------------------- | --------- | ----------------------------------------------------------------------------------- |
| `--canvas`     | `#F3F5F4` (Papel)      | `#0F161D` | Fondo de página. El oscuro es un azul noche, no un casi-negro genérico.             |
| `--surface`    | `#FFFFFF`              | `#17212A` | Superficies elevadas: menú móvil, bloques de código y la ficha del caso de estudio. |
| `--ink`        | `#15202B` (Tinta)      | `#E5EAEE` | Texto principal.                                                                    |
| `--ink-muted`  | `#4D5A66` (Grafito)    | `#9AA7B3` | Texto secundario y bordes de controles secundarios (≥ 3:1).                         |
| `--line`       | `#C9D1D5` (Cuadrícula) | `#2B3845` | Divisores decorativos. Nunca como único borde de un control.                        |
| `--accent`     | `#2346B0` (Cobalto)    | `#94AEFF` | Enlaces, botón principal y foco.                                                    |
| `--accent-ink` | `#FFFFFF`              | `#0C1633` | Texto sobre `--accent`.                                                             |
| `--highlight`  | `#A11D3A` (Guinda)     | `#F2899C` | Dato resaltado en figuras. Nunca en texto de interfaz ni en botones.                |

### Contraste real (WCAG 2.x)

Calculado con `node scripts/contrast.mjs`, que implementa la fórmula de luminancia relativa de WCAG y termina con error si un par queda bajo su mínimo.

| Par (texto / fondo)     | Uso                                    | Claro   | Oscuro  | Mínimo |
| ----------------------- | -------------------------------------- | ------- | ------- | ------ |
| `ink` / `canvas`        | texto principal                        | 15.06:1 | 15.04:1 | 4.5:1  |
| `ink` / `surface`       | texto sobre superficie                 | 16.49:1 | 13.47:1 | 4.5:1  |
| `ink-muted` / `canvas`  | texto secundario                       | 6.46:1  | 7.42:1  | 4.5:1  |
| `ink-muted` / `surface` | texto secundario sobre superficie      | 7.07:1  | 6.64:1  | 4.5:1  |
| `accent` / `canvas`     | enlaces y anillo de foco               | 7.45:1  | 8.46:1  | 4.5:1  |
| `accent` / `surface`    | enlaces sobre superficie               | 8.16:1  | 7.58:1  | 4.5:1  |
| `accent-ink` / `accent` | texto del botón principal              | 8.16:1  | 8.28:1  | 4.5:1  |
| `highlight` / `canvas`  | dato resaltado del elemento distintivo | 6.97:1  | 7.66:1  | 4.5:1  |
| `highlight` / `surface` | dato resaltado sobre superficie        | 7.63:1  | 6.86:1  | 4.5:1  |
| `line` / `canvas`       | divisores (decorativos, sin mínimo)    | 1.41:1  | 1.52:1  | —      |

Todos los pares de texto superan AA con margen, y los de acento y dato superan incluso AAA (7:1) salvo `highlight` / `canvas` en claro (6.97:1). Los bordes de controles usan `--ink-muted` (≥ 6.4:1), no `--line`. Cobalto y guinda se distinguen también con daltonismo rojo-verde (difieren en luminosidad y en el eje azul-amarillo), y en las figuras el dato resaltado lleva además una etiqueta de texto: el color nunca es la única señal.

## 3. Tipografía

Dos familias, ambas con licencia OFL 1.1 y disponibles en Fontsource (verificado en su API), con papeles que no se cruzan:

| Familia                                                                      | Rol                                                                      | Por qué esta                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Archivo** (Omnibus-Type), variable: `wght` 100–900, `wdth` 62–125          | Titulares, `h1`–`h3` y rótulos de gráficos (ejes, cifras de las figuras) | Es una grotesca pensada para textos de alto rendimiento, con anchos condensados que sirven para rotular datos densos. El `h1` y los ejes de la figura comparten familia, y así texto y dato se leen como una sola pieza. |
| **Atkinson Hyperlegible Next** (Braille Institute), variable: `wght` 200–800 | Cuerpo, interfaz, pies de figura y fichas                                | Está diseñada para maximizar la diferencia entre caracteres parecidos (`l`, `I`, `1`; `0`, `O`). En un sitio donde se leen cifras, tiene una razón funcional, más allá del gusto.                                        |

- **Código:** pila de sistema (`ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace`). Solo aparece en los bloques de código de los casos de estudio, así que no justifica una tercera descarga. La monoespaciada no se usa en etiquetas.
- **Distinción:** Archivo aparece condensada, pesada y apretada; Atkinson, abierta y de peso regular. No se confunden.
- **Precarga:** solo Atkinson 400 (latin). Archivo se carga sin precarga, con el fallback métrico que genera Astro.
- **Riesgo que se verifica en la Fase 2:** si el proveedor Fontsource de la Fonts API no entrega el eje `wdth`, los titulares usan Archivo en ancho normal (800, tracking −0.03em). La escala está pensada para funcionar también así; el condensado es una mejora, no una dependencia.

### Escala

`1rem = 16px`. Los tamaños fluidos van como tokens con `clamp()`.

| Token            | Tamaño                                                  | Familia y peso              | Interlineado | Tracking | Uso                                                |
| ---------------- | ------------------------------------------------------- | --------------------------- | ------------ | -------- | -------------------------------------------------- |
| `--text-display` | `clamp(2.75rem, 1.5rem + 5.5vw, 5.75rem)` (44→92 px)    | Archivo 800, `wdth` 75      | 0.95         | −0.02em  | `h1` del hero                                      |
| `--text-h1`      | `clamp(2.25rem, 1.6rem + 2.8vw, 3.5rem)` (36→56 px)     | Archivo 750, `wdth` 80      | 1.05         | −0.015em | `h1` de caso de estudio y 404                      |
| `--text-h2`      | `clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)` (28→40 px)     | Archivo 700, `wdth` 85      | 1.1          | −0.01em  | Títulos de sección                                 |
| `--text-h3`      | `1.3125rem` (21 px)                                     | Archivo 650                 | 1.25         | −0.005em | Proyectos y entradas de trayectoria                |
| `--text-lead`    | `clamp(1.1875rem, 1.1rem + 0.4vw, 1.375rem)` (19→22 px) | Atkinson 400                | 1.5          | 0        | Propuesta de valor y resúmenes destacados          |
| `--text-base`    | `1.0625rem` (17 px)                                     | Atkinson 400 / 700          | 1.6          | 0        | Cuerpo                                             |
| `--text-sm`      | `0.9375rem` (15 px)                                     | Atkinson 400                | 1.5          | 0.005em  | Pies de figura, metadatos, etiquetas de tecnología |
| `--text-axis`    | `0.8125rem` (13 px)                                     | Archivo 500, `tabular-nums` | 1.2          | 0.01em   | Solo rótulos de ejes dentro de figuras SVG         |

Nada de texto de interfaz bajo 15 px. Los 13 px quedan para rótulos de ejes, que siempre tienen su equivalente en el pie o en el texto alternativo.

**El titular como parte activa del diseño.** El `h1` del hero es el título de la figura: nombre en dos líneas, grande, condensado y alineado a la izquierda, con el rol debajo en Archivo 500. No lleva palabras resaltadas en otro color ni en cursiva. Lo activo es la relación: el bloque del titular y el elemento distintivo comparten línea base superior e inferior, y los rótulos de la figura usan la misma familia. Es una lámina, no «texto a la izquierda e imagen a la derecha».

## 4. Layout

**Concepto: una columna de lectura anclada a la izquierda y un margen de anotaciones a la derecha, como la página de un cuaderno de análisis.**

- **Contenedor:** `max-width: 72rem` (1152 px), con margen lateral de 16 px en móvil, 24 px en tableta y 32 px en escritorio.
- **Rejilla de escritorio (≥ 1024 px):** 12 columnas. La lectura ocupa 7 y el margen de anotaciones, 4, con una columna de aire entre ambos.
- **Medida:** los párrafos se limitan a `65ch` (entre 60 y 75 caracteres con Atkinson a 17 px). `Prose` usa la misma medida.
- **Alineación:** todo a la izquierda. Nada centrado, salvo el contenido de los botones.
- **Ritmo vertical:** lo controla solo `Section`, con `padding-block: clamp(4rem, 2.5rem + 5vw, 7rem)` y una regla superior de 1 px en `--line`, como el separador de una planilla. No hay fondos alternos por sección.
- **Radios:** `--radius-sm: 4px` (etiquetas y controles) y `--radius-md: 8px` (botones y superficies). Sin sombras: la elevación se marca con `--surface` y un borde.
- **Proyectos:** no hay rejilla de tarjetas idénticas. Los destacados son filas anchas con resumen, resultado y margen de metadatos; el resto es una lista compacta con regla entre filas, cercana a una tabla.
- **Header sticky:** 56 px de alto, fondo `--canvas` con borde inferior `--line`, con `scroll-padding-top: 72px`.

### Móvil (390 × 844, primer viewport)

Con la opción A, la franja del mapa acompaña al titular en el borde derecho. Con B o C, la figura baja y queda después de las acciones (ver §5).

```text
┌────────────────────────────────────┐
│ Felipe Martínez          [◐] [≡]  │ header sticky 56 px
├────────────────────────────────────┤
│                                    │
│ Felipe                       ·:·   │ h1 display (Archivo 800,
│ Martínez                     :·:   │ condensada), 2 líneas
│                              ·::   │
│ Estudiante de Ingeniería     ::·   │ rol (Archivo 500)
│ Civil en Computación         ·:    │
│                              ::    │ franja del elemento
│ Construyo dashboards y       :·    │ distintivo (opción A:
│ pipelines de datos con       ·:    │ Chile en puntos,
│ Python y Power BI...         :     │ 64 px de ancho)
│                              ·     │
│ Disponible para práctica     :     │ disponibilidad (texto,
│ ene–feb 2027                 ·     │ sin badge)
│                                    │
│ [ Ver proyectos          ]         │ acción principal, 48 px
│ Descargar CV (PDF)   [gh] [in]     │ secundaria y redes (44 px)
├────────────────────────────────────┤ ← límite del primer viewport
│ Fuente: DEIS MINSAL...             │ pie de la figura
└────────────────────────────────────┘
```

### Escritorio (1440 × 900)

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Felipe Martínez         Sobre mí  Proyectos  Habilidades  Contacto [◐]│
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Felipe                                        │        ·:·          │
│  Martínez                                      │       ·::·          │
│                                                │        :·:          │
│  Estudiante de Ingeniería Civil en Computación │        ·::  ← rótulo│
│                                                │         ::·         │
│  Construyo dashboards y pipelines de datos     │         ·:          │
│  con Python, Dash y Power BI, y hago análisis  │         :·          │
│  exploratorio en R.                            │          ·          │
│                                                │  (figura del        │
│  Busco mi Práctica Profesional I,              │   elemento          │
│  enero–febrero de 2027.                        │   distintivo)       │
│                                                │                     │
│  [ Ver proyectos ]  Descargar CV (PDF)  gh in  │  Fuente y fecha     │
│  ─────────── 7 columnas ───────────            │  ─── 4 columnas ─── │
├──────────────────────────────────────────────────────────────────────┤
│  Sobre mí y trayectoria                                              │
│  Bio (65ch) ...........................        │  Idiomas            │
│  ┃ 2027  Práctica Profesional I (búsqueda)     │                     │
│  ┃ hoy   Ingeniería Civil en Computación       │                     │
│  ┃ 2017–2026  Temporadas agrícolas             │                     │
├──────────────────────────────────────────────────────────────────────┤
│  Proyectos                                                           │
│  Título del destacado                          │ 2026, completado    │
│  Resumen + resultado principal                 │ Python  Dash  ...   │
│  ─────────────────────────────────────────────────────────────────── │
│  Proyecto compacto   problema / enfoque / resultado │ 2025  R        │
└──────────────────────────────────────────────────────────────────────┘
```

(Los «·» del boceto son puntos del mapa y separadores del esquema, no texto del sitio.)

## 5. Elemento distintivo

Tres opciones realmente distintas: un mapa, una serie temporal y un registro biográfico. Las dos primeras usan material real de los proyectos, con fuente y licencia verificadas el 27-09-2026.

**Descartada: la proyección PCA del clustering.** Son datos de pacientes con cáncer de mama. Ponerlos en el hero los convierte en adorno, justo lo que prohíbe §6. Se quedan en su tarjeta o caso de estudio.

### Opción A. «Chile en puntos»: la red de salud dibuja el país (elegida)

```text
  Felipe                                 ·:·   Arica
  Martínez                               :·:
                                          ·::
  Estudiante de Ingeniería ...            ::·
                                          ·:
  ...                                     :::·  ← Santiago (la mayor densidad)
                                         ::·:
                                          :·
                                           ·:
                                           · ·
                                            ·  Punta Arenas
  5.288 establecimientos de salud vigentes, cada uno en su coordenada.
  Fuente: DEIS, Ministerio de Salud, datos.gob.cl (CC0), corte 22-09-2026.
```

- **Qué datos usa:** el dataset «Establecimientos de Salud» del MINSAL en datos.gob.cl, que es la base del proyecto `dashboard-red-de-salud`. Licencia **CC0** (verificada en la API del portal); igual se cita la fuente por honestidad. El corte actual tiene 5.743 filas y 5.328 vigentes; **5.288 vigentes tienen latitud y longitud** (99,2 %), y 757 de ellas tienen servicio de urgencia. Las urgencias se pintan en `--highlight` y se nombran en el pie.
- **Cómo se construye:** un script Node (`scripts/build-health-map.mjs`) lee un snapshot recortado del CSV que queda en el repo (solo latitud, longitud, urgencia y estado, unos 100 KB, no se publica), proyecta los puntos y genera con `sharp` una imagen por tema (AVIF/WebP, unos 64 × 440 px en móvil y 180 × 620 en escritorio, con 2× para pantallas densas). Encima va un SVG liviano con 3–4 rótulos (Arica, Santiago, Punta Arenas) en Archivo 13 px. **No se dibujan fronteras**, solo puntos: la forma del país sale de los datos, y así se evita publicar límites internacionales.
- **Costo:** 0 KB de JS. Peso estimado de 15–35 KB por imagen (se mide en la Fase 4). Una imagen por tema, cambiada con `<picture>` y `prefers-color-scheme`, o una sola imagen de puntos neutros con los tonos en el SVG superpuesto: se decide midiendo.
- **Sin JS:** idéntica; no depende de JS.
- **Lector de pantalla:** `<figure>` con `<figcaption>` visible: «Mapa de Chile formado por los 5.288 establecimientos de salud vigentes con coordenadas; en guinda, los 757 con servicio de urgencia. Se concentran en el valle central y en Santiago. Fuente: DEIS, MINSAL (CC0), corte del 22-09-2026». La imagen lleva `alt=""` porque el pie ya la describe, y el SVG de rótulos, `aria-hidden`.
- **Movimiento orquestado:** los puntos aparecen de norte a sur en unos 900 ms (`clip-path` animado con CSS, solo con `motion-safe`). Sin animación, la figura está completa desde el primer pintado: nada queda oculto a la espera de JS.
- **Riesgo principal:** que la imagen se convierta en el LCP en escritorio. Se mitiga con una imagen pequeña, con dimensiones explícitas y `fetchpriority="high"`, y el LCP se mide antes de cerrar la Fase 4. **Riesgo secundario:** el corte actual no coincide con los 5.623 establecimientos de tu proyecto (otra fecha y otro filtro). La figura declara su propio corte y no reutiliza cifras del proyecto, como el «100 % mapeado».

### Opción B. «Una semana de aire en Santiago»: serie horaria de PM2.5

```text
  Felipe                                  PM2,5 en Santiago (µg/m³)
  Martínez                             60 ┤        ╭╮
                                          │   ╭╮  ╭╯╰╮     ╭╮
  Estudiante de ...                    30 ┤╭─╯╰──╯   ╰─╮ ╭╯╰─╮
                                          │╯           ╰─╯   ╰
                                        0 ┼──┬──┬──┬──┬──┬──┬─
                                           lu ma mi ju vi sá do
                                          [━━━━━━━●━━━━━━━━━━]  mi 21:00: 48 µg/m³
  Modelo CAMS vía Open-Meteo (CC BY 4.0). Semana del ... de julio de 2026.
```

- **Qué datos usa:** 168 valores horarios de PM2.5 (y opcionalmente NO₂ u O₃) para Santiago, de una semana de invierno de 2026, guardados como snapshot JSON en el repo. Hay dos fuentes posibles:
  1. **Open-Meteo Air Quality**, que tu proyecto ya usa: licencia CC BY 4.0, con atribución obligatoria a CAMS y a Open-Meteo (verificado). Ojo: son **datos modelados** (CAMS global, unos 45 km), no mediciones de estación, y el pie debe decirlo.
  2. **Datos de tu propio sistema**, si guardaste lecturas en SQLite. Sería la opción más auténtica, pero su licencia depende de la fuente original (OpenAQ exige la atribución de cada proveedor). SINCA, la red oficial, dice «Todos los derechos reservados» y no publica una licencia abierta: **no se usa sin permiso**.
- **Costo:** SVG inline de unos 4–6 KB (una `polyline` con 168 puntos redondeados). JS opcional de unos 1,5 KB: un `<input type="range">` que recorre las horas y muestra el valor en una región `aria-live`.
- **Sin JS:** el gráfico completo y estático, con el máximo de la semana anotado en `--highlight`. El control deslizante no se renderiza (se inserta desde el script) o queda oculto con `hidden` hasta que el script lo activa.
- **Lector de pantalla:** `<figure>` con un pie que resume (mínimo, máximo, en qué momento ocurrió el máximo y el ciclo diario) y un `<details>` con la tabla de datos por día. El control deslizante es un `input range` nativo con etiqueta y `aria-valuetext` («miércoles 21:00, 48 microgramos por metro cúbico»).
- **Movimiento orquestado:** la línea se dibuja de izquierda a derecha una vez (`stroke-dashoffset` con CSS, solo `motion-safe`).
- **Riesgo principal:** que se lea como una sparkline decorativa. Hay que anotarla bien, con ejes, unidad, fuente y el pico explicado. **Riesgo secundario:** el tema es de salud ambiental, así que el pie debe evitar juicios («aire peligroso») que un modelo de 45 km no sostiene.

### Opción C. «Registro de temporadas 2017–2027»: el propio recorrido como dato

```text
          2017  2018  2019  2020  2021  2022  2023  2024  2025  2026  2027
  Campo   ▮     ▮     ▮     ▮     ▮     ▮     ▮     ▮     ▮     ▮
  Univ.               ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┥
  Práctica                                                          ┊▯┊ ← ene–feb 2027
```

- **Qué datos usa:** solo tus hechos: las temporadas agrícolas 2017–2026, los años de universidad y el hueco de enero–febrero de 2027, marcado en `--highlight` como el espacio que busca llenar la práctica. No hay licencias en juego.
- **Costo:** 0 KB de JS; SVG o HTML de unos 3 KB.
- **Sin JS:** idéntica.
- **Lector de pantalla:** `role="img"` con un `aria-label` que narra el recorrido, más el texto visible del pie.
- **Movimiento orquestado:** las barras aparecen año a año (CSS, `motion-safe`).
- **Riesgo principal:** hoy faltan datos. El año de ingreso a la universidad es `TODO:` y los meses de cada temporada no están en `CONTENT.md`, y no se pueden inventar. Además, repite la línea de tiempo de «Sobre mí» y aporta menos evidencia técnica que A o B.

### Comparación

|                         | A. Chile en puntos | B. Aire en Santiago                    | C. Temporadas                |
| ----------------------- | ------------------ | -------------------------------------- | ---------------------------- |
| Material de un proyecto | Sí (red de salud)  | Sí (calidad del aire)                  | No (biografía)               |
| Licencia                | CC0, verificada    | CC BY 4.0 (Open-Meteo) o por confirmar | No aplica                    |
| JS                      | 0 KB               | 0 KB (+1,5 KB si es interactiva)       | 0 KB                         |
| Peso estimado           | 15–35 KB de imagen | 4–6 KB de SVG                          | ~3 KB                        |
| Datos listos hoy        | Sí                 | Sí (Open-Meteo)                        | No (faltan fechas)           |
| Riesgo principal        | LCP de la imagen   | Parecer decorativa; datos modelados    | Datos incompletos; se repite |

**Recomendación: A.** Es la única que no se puede confundir con otro portafolio. Usa el dataset de tu proyecto destacado, tiene licencia CC0, no necesita JS y la forma de Chile, estrecha y vertical, cabe al costado del titular incluso en móvil sin sacrificar el primer viewport. B es una buena segunda opción si prefieres algo interactivo o quieres destacar el proyecto de calidad del aire. En ese caso necesito saber si tienes lecturas guardadas de tu sistema.

## 6. Movimiento

- **Un solo momento orquestado:** la entrada del elemento distintivo (la de la opción elegida en §5). Dura 900 ms o menos, ocurre una vez por carga, usa solo CSS y va dentro de `@media (prefers-reduced-motion: no-preference)`. El estado final es el estado sin animación, así que nada queda oculto.
- **Todo lo demás responde a una acción:**
  - Abrir y cerrar el menú móvil: 150 ms de opacidad y desplazamiento de 4 px.
  - Copiar el correo: el texto de confirmación aparece, sin animación extra.
  - Cambiar de tema: cambio inmediato, sin transiciones de color que produzcan parpadeos.
  - Hover y foco en proyectos: cambia el color del título y aparece el subrayado. Sin elevación, sin sombra y sin escala.
- Transiciones entre páginas con `@view-transition { navigation: auto; }`, solo como mejora progresiva y desactivadas con `prefers-reduced-motion: reduce`.
- Desplazamiento suave solo con `motion-safe:scroll-smooth`.

## 7. Autocrítica

**Qué se parece a cualquier portafolio**

- **Header sticky con anclas y conmutador de tema, más un hero con dos botones.** Se queda, porque es lo que el reclutador espera y funciona. Lo cambié en el orden: la figura es parte del hero, no un adorno debajo.
- **Proyectos como tarjetas.** El reflejo era una rejilla de 3 tarjetas iguales con sombra. Lo cambié por filas con jerarquía real (destacado ancho y compacto tipo tabla) y el margen de metadatos. La tarjeta sigue siendo clicable entera por el patrón de enlace extendido, pero no parece un producto SaaS.
- **Habilidades.** El reflejo era un muro de íconos de colores. Lo cambié por un índice de texto en tres grupos, con el conteo de proyectos enlazado como evidencia. Sin íconos en esta sección: las etiquetas son el contenido, y los íconos de marca quedan solo en los enlaces sociales.
- **Acento azul.** Es el color de enlace de siempre. Lo moví hacia un cobalto de tinta, cercano a `--ink` en carácter, y le di un papel estricto: solo acción. El único color «propio» es la guinda, y solo aparece en datos.
- **Modo oscuro casi-negro.** Evitado: el fondo oscuro es un azul noche (`#0F161D`) que conserva la temperatura de la tinta.

**Adornos quitados**

- Un fondo de papel milimetrado (rejilla de 8 px) sobre todo el sitio. Era el guiño más obvio al tema, pero bajaba el contraste percibido del cuerpo y no aportaba información. Queda solo como el nombre del color de fondo.
- Etiquetas pequeñas sobre cada título de sección («Proyectos seleccionados», etc.). Las prohíbe §6 y no aportaban nada que el `h2` no diga.
- Un indicador de disponibilidad con punto verde «en línea». Era un tropo de SaaS. La disponibilidad va como una frase dentro del hero.

## 8. Decisiones del propietario

Aprobado el 27-09-2026:

1. **Elemento distintivo: opción A, «Chile en puntos».** Las opciones B y C quedan como registro y no se implementan.
2. **Paleta y tipografía aprobadas** tal como están en §2 y §3.
