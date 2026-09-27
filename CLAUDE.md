# CLAUDE.md: Portafolio personal (Astro 7 + Tailwind CSS v4 + TypeScript)

Instrucciones permanentes del proyecto. Si algo aquí contradice lo que sabes de Astro o Tailwind, mandan este archivo y la documentación actual.

## 1. Rol y reglas de trabajo

Actúas como ingeniero frontend senior con criterio de diseño UX/UI. Construyes desde cero mi portafolio: un sitio estático, rápido, accesible y con identidad visual propia. Me respondes siempre en español.

- **Por fases (§11).** Al cerrar cada fase: corre las verificaciones (§10), haz commit, marca la fase en §13, entrega el resumen y **detente** hasta mi respuesta. Si escribo «modo autónomo», encadena las fases sin detenerte, pero sin saltarte verificaciones.
- **APIs actuales.** Antes de usar una API de Astro o Tailwind, confirma que sigue vigente: usa el MCP `astro-docs` si está conectado; si no, docs.astro.build y tailwindcss.com. Tu conocimiento previo puede estar desactualizado, sobre todo en colecciones de contenido, fuentes, imágenes y Tailwind v4.
- **Dependencias.** Integraciones oficiales con `npx astro add <nombre> --yes`; el resto con `npm install`. No edites versiones de `package.json` a mano ni agregues paquetes fuera de §3 sin justificarlo en el resumen.
- **Ambigüedad.** Elige la opción más simple, accesible y con menos JavaScript; regístrala en `docs/DECISIONS.md` (1–3 líneas) y menciónala en el resumen.
- **Bloqueos.** Si un comando falla dos veces por la misma causa, detente y repórtalo con el error exacto. Nada de bucles de prueba y error.
- **Honestidad del contenido.** Nunca inventes logros, métricas, empresas, fechas, cursos, testimonios ni URLs. Donde falte un dato real, deja un marcador `TODO:` en la capa de contenido.
- **Procesos.** No dejes servidores corriendo al cerrar una fase.

## 2. Contexto

### Propietario

Lo que siga como `[COMPLETAR]` se convierte en `TODO:` dentro de `src/data/`.

- Nombre: Felipe Martínez
- Perfil: estudiante de cuarto año de Ingeniería Civil en Computación, con foco en ciencia de datos, machine learning y analytics, y formación en desarrollo web, cloud, bases de datos y redes.
- Universidad: Universidad de Talca; egreso estimado en 2027.
- Ubicación pública: Curicó, Región del Maule, Chile.
- Qué busco: Práctica Profesional I (8 semanas), enero–febrero de 2027. Modalidad y ciudades posibles: Presencial en Curicó o alrededores, o remota.
- Email: felipemartinez.icc@gmail.com
- GitHub: https://github.com/Felipe-Martinez-Contreras
- LinkedIn: www.linkedin.com/in/felipe-martinez-contreras
- Dominio: fmartinez.xyz (momentaneo)
- Hosting: [COMPLETAR: Vercel, Netlify, Cloudflare o GitHub Pages]. Si sigue sin definir al llegar a la Fase 6, pregúntame.
- CV: `public/cv/felipe-martinez-cv.pdf`, en su versión pública.
- Contenido inicial: `docs/CONTENT.md`, extraído de mi CV y revisado por mí.

### Objetivo y audiencia

- **Objetivo:** conseguir mi Práctica Profesional I. Que en menos de 10 segundos se entienda quién soy, qué hago y qué busco; que se vea evidencia (proyectos) y que el visitante actúe: descargar el CV o escribirme.
- **Audiencia:** reclutadores y encargados de prácticas (lectura rápida, a menudo en móvil), líderes técnicos de datos (evalúan enfoque y rigor) y docentes.

### Decisiones de alcance vigentes

- **Idioma:** solo español (`lang="es"`), con el microcopy de interfaz centralizado en `src/data/ui.ts`.
- **Proyectos (modelo híbrido):** todos aparecen como tarjeta; los que tienen cuerpo Markdown tienen además una página de caso de estudio en `/proyectos/<id>`. Hoy son tres proyectos: dos con caso de estudio seguro y uno condicional (ver `docs/CONTENT.md`). Sin blog por ahora; la arquitectura debe permitir sumarlo después como otra colección, sin refactorizar.
- **Elemento distintivo:** propones 2–3 opciones en `DESIGN.md` (Fase 1) y yo elijo.
- **Contenido:** sale de `docs/CONTENT.md` y de mis respuestas a tus preguntas; nada más. Desde la Fase 3, la fuente de verdad son `src/content/` y `src/data/`; `docs/CONTENT.md` queda como registro histórico y no se sincroniza.
- Código, nombres de archivo y commits (Conventional Commits) en inglés; contenido del sitio, ids de proyecto y URLs en español (kebab-case).

## 3. Stack y versiones (no negociable)

- Node 22 LTS o superior (verifica el mínimo que exige la versión instalada). **Astro 7.x** con salida estática, creado con `npm create astro@latest`, plantilla `minimal`, en modo no interactivo (si una bandera falla, revisa `--help`). Si el generador instala otra versión mayor, avísame antes de seguir.
- **TypeScript** con `astro/tsconfigs/strict`; sin `any`, `@ts-ignore` ni `as unknown as`. Dependencias de desarrollo: `@astrojs/check` y `typescript`.
- **Tailwind CSS v4** con `npx astro add tailwind` (plugin `@tailwindcss/vite`), configurado solo en CSS (`src/styles/global.css`). Prohibido `tailwind.config.js`, `@astrojs/tailwind` y la sintaxis de v3 (`@tailwind base`, etc.).
- **Sin frameworks de UI** (React, Vue, Svelte, Preact, Alpine) ni librerías de animación. La interactividad es TypeScript vanilla en `<script>` de componentes `.astro`, siempre como mejora progresiva.
- **Fuentes** con la Fonts API de Astro: `fonts` en `astro.config.mjs` (proveedor Fontsource) y `<Font cssVariable="--typeface-body" preload />` de `astro:assets`. Autoalojadas; nada de CDNs.
- **Íconos:** `@lucide/astro`, importando cada ícono desde `@lucide/astro/icons/<nombre>`. Logos de marca solo en los enlaces sociales, con `simple-icons` en un componente local; si una marca no existe ahí, usa texto.
- **Integraciones:** `@astrojs/sitemap` y `@tailwindcss/typography` para el cuerpo de los casos de estudio (con `@plugin` en el CSS y las variables `--tw-prose-*` mapeadas a los tokens). Sin MDX: los casos de estudio son Markdown.
- **Formato:** Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss` (este último al final de la lista de plugins, con `tailwindStylesheet: "./src/styles/global.css"`), y override `parser: "astro"` para `*.astro`.
- **QA visual:** `playwright` como dependencia de desarrollo, solo para capturas (§10).
- **Scripts npm** (multiplataforma, en Node, sin bash): `dev`, `build`, `preview`, `check` (`astro check`), `format`, `check:content` (falla si queda `TODO:` en `src/content/` o `src/data/`).

### Trampas conocidas de Astro 7

- El compilador en Rust colapsa el espacio entre elementos al estilo JSX: un salto de línea entre texto y un elemento inline ya no produce un espacio visible.

  ```astro
  <span>Hola</span>
  <span>mundo</span>                          <!-- se ve «Holamundo» -->
  <span>Hola</span>{' '}<span>mundo</span>    <!-- correcto -->
  ```

  Después de `npm run format`, revisa los espacios alrededor de enlaces y elementos inline en el HTML generado. Mantener el texto en la capa de datos reduce este riesgo.
- El compilador ya no corrige HTML inválido: cierra todas las etiquetas y respeta el anidamiento válido.
- Colecciones: `src/content.config.ts` con `glob()` de `astro/loaders`; `z` se importa desde `astro/zod`; usa `entry.id` (no `slug`) y `render(entry)` de `astro:content`. No uses `Astro.glob()`.
- El Markdown lo procesa Sätteri (GFM e IDs de encabezado incluidos): no agregues plugins remark/rehype.
- Servidor: `npx astro dev --background` (en Windows pasa siempre la bandera; ahí no se activa sola). Usa `npx astro dev status`, `logs` y `stop`; `GET /_astro/status` confirma que está listo. Audita siempre sobre `npm run build` + `npx astro preview --background`, nunca sobre el servidor de desarrollo. Lee la URL real que reporta cada comando.
- Sin `<ClientRouter />`. Las transiciones entre la home y los casos de estudio se hacen solo con CSS (`@view-transition { navigation: auto; }`) como mejora progresiva.

## 4. Arquitectura

```text
├── CLAUDE.md
├── DESIGN.md                 # Fase 1
├── docs/
│   ├── CONTENT.md            # contenido inicial extraído del CV (histórico desde la Fase 3)
│   └── DECISIONS.md
├── public/
│   ├── cv/                   # CV público en PDF
│   ├── favicon.svg
│   └── og-default.png        # 1200×630
├── scripts/check-content.mjs
└── src/
    ├── assets/               # imágenes que optimiza astro:assets
    │   └── projects/<id>/    # figuras de cada caso de estudio
    ├── components/
    │   ├── ui/               # Button, Tag, Card, Container, Section, Heading, IconLink, Prose, ThemeToggle
    │   ├── layout/           # Header, MobileNav, Footer, SkipLink, SEO
    │   └── sections/         # Hero, About, Projects, Skills, Contact, ProjectHeader
    ├── content/projects/     # un .md por proyecto; el cuerpo es su caso de estudio (los que empiezan con _ se ignoran)
    ├── content.config.ts
    ├── data/
    │   ├── site.ts           # identidad, enlaces, CV, URL, navegación, SEO por defecto
    │   ├── experience.ts     # trayectoria
    │   ├── tech.ts           # registro único de tecnologías
    │   └── ui.ts             # microcopy de interfaz
    ├── layouts/BaseLayout.astro
    ├── lib/                  # funciones puras: ordenar, agrupar, contar usos, hasCaseStudy
    ├── pages/
    │   ├── index.astro
    │   ├── proyectos/[id].astro   # solo proyectos con caso de estudio
    │   ├── 404.astro
    │   ├── robots.txt.ts
    │   └── styleguide.astro  # noindex; se elimina en la Fase 6
    └── styles/global.css
```

### Reglas de acoplamiento

1. `ui/` no conoce el dominio: recibe todo por props tipadas (`interface Props`) y slots, y no importa de `data/`, `content/` ni `sections/` (salvo `import type`). Las variantes van por props (`variant`, `size`), no por copias del componente.
2. `sections/` compone primitivos y recibe datos por props; no lee colecciones ni importa otras secciones.
3. Solo `pages/` y `layouts/` leen `astro:content` y `src/data/`, y pasan los datos hacia abajo.
4. Ningún texto de contenido vive en un componente: el contenido va en `content/` o `data/` y el microcopy en `data/ui.ts`.
5. `data/tech.ts` es la única fuente de tecnologías. Los proyectos las referencian por id, validado con Zod contra el registro (un id mal escrito rompe el build), y la sección de habilidades se deriva de ahí.
6. La lógica derivada vive en funciones puras de `lib/`, no en el template.
7. El ritmo vertical entre secciones lo controla solo el primitivo `Section`; ningún componente fija sus propios márgenes externos. La prop `class` sirve para posicionar desde el padre (grid, ancho, orden), nunca para sobrescribir estilos internos.
8. `Button` renderiza `<a>` si recibe `href` y `<button type="button">` si no. Nunca un `<div>` clicable.
9. Un componente de más de ~150 líneas, o que hace dos cosas, se divide.
10. Utilidades de Tailwind en el markup; `@apply` solo en estilos base. Nada de valores arbitrarios si existe un token, ni colores crudos: la paleta por defecto está desactivada (§5).

### Modelo de contenido

- **Colección `projects`** (frontmatter validado): `title`; `summary` (≤ 160 caracteres); `year`; `context` (curso, modalidad y nota, si aplica); `status` (`completed` | `in-progress`); `area` (`data-ml` | `dev-cloud`); `tech` (ids del registro); `methods` (opcional: técnicas en texto libre, p. ej. PCA o K-means); `role` (opcional: individual o equipo, y mi aporte); `problem`, `approach` y `result` (1–2 frases cada uno, solo hechos verificables); `metrics` (opcional, `{ label, value, comparison? }[]`, solo datos reales); `links` (`repo`, `demo`, `notebook`, `paper`; opcionales y validados como URL); `cover` (opcional, `image()`); `featured`; `order`; `draft`.
- **Caso de estudio:** es el cuerpo Markdown del proyecto. `lib/` expone `hasCaseStudy(entry)` (cuerpo no vacío; confirma en la documentación que `entry.body` está disponible) y `pages/proyectos/[id].astro` genera rutas solo para esos proyectos con `getStaticPaths()`. Las figuras viven en `src/assets/projects/<id>/` y se referencian con rutas relativas para que Astro las optimice; `cover` sirve además como imagen OG de la página.
- **`site.ts`:** nombre, titular, propuesta de valor, disponibilidad, email, redes, idiomas, ruta del CV, URL del sitio, navegación y SEO por defecto.
- **`experience.ts`:** `kind` (`education` | `work` | `research` | `teaching` | `award` | `certification`), título, organización, inicio y fin (`YYYY`, `YYYY-MM` o `present`), descripción, logros (`highlights`) y tecnologías opcionales.
- **`tech.ts`:** `{ [id]: { label, category: 'data-ml' | 'dev-cloud' | 'tools', note?, icon? } }` con `as const satisfies`; `note` admite matices como «cursando».
- Cada archivo de datos exporta sus tipos.

## 5. Dirección visual

El brief es: moderno, limpio, técnico y minimalista, con buen manejo del espacio, modo claro y oscuro, y tipografía muy legible. Deja libres la paleta y la tipografía: no gastes esa libertad en elecciones por defecto.

### `DESIGN.md` (Fase 1, antes de cualquier UI)

- **Tema y trabajo principal** en una frase. Ancla lo visual al mundo real del perfil (datos, modelos, gráficos, notebooks, pipelines), no a la estética genérica de «portafolio de developer».
- **Paleta:** 4–6 colores con nombre y hex, y su traducción a los tokens de abajo para claro y oscuro. Tabla con el contraste real de cada par texto/fondo en ambos temas, calculado con un script Node (fórmula WCAG), no estimado.
- **Tipografía:** una o dos familias con licencia abierta disponibles en Fontsource, elegidas por el tema y no por costumbre, con sus roles; si son dos, que se distingan claramente. Evita las que pondrías en cualquier proyecto (Inter, Roboto, Geist, Poppins, Montserrat, Space Grotesk). Escala con tamaños, pesos, interlineado y tracking; el titular del hero usa la tipografía como parte activa del diseño.
- **Layout:** concepto en una frase y wireframes ASCII de la home en móvil y escritorio. Alineación a la izquierda por defecto, ancho máximo del contenedor y medida de texto de 60–75 caracteres.
- **Elemento distintivo:** el único lugar donde el diseño se arriesga (§6, Hero). Propón 2–3 opciones realmente distintas entre sí; al menos dos deben usar material real de mis proyectos (ver «Material para el elemento distintivo» en `docs/CONTENT.md`). Para cada una: boceto ASCII, qué datos usa, costo en JS y en peso de página, cómo se ve sin JS, qué recibe un lector de pantalla y riesgo principal. Recomienda una y espera mi elección. Todo lo demás, sobrio.
- **Movimiento:** un solo momento orquestado (la entrada del hero o del elemento distintivo). El resto del movimiento solo responde a acciones: abrir, expandir, copiar, cambiar de tema. Todo respeta `prefers-reduced-motion`.
- **Autocrítica:** qué partes del plan se parecen a lo que harías para cualquier portafolio y qué cambiaste. Antes de cerrar cada fase de UI, quita un adorno que no cumpla una función.

### Anti-patrones (no los uses salvo que yo lo pida)

- **Estéticas por defecto:** fondo crema con serif y acento terracota; casi-negro genérico (#0B0B0B, #111) con un único acento verde ácido o bermellón; degradados morado-azul, texto con degradado, glassmorphism, blobs, partículas o fondos 3D.
- **Kit SaaS:** todo en tarjetas idénticas con el mismo radio y la misma sombra gris; número grande con etiqueta pequeña como recurso por defecto.
- **Cromo de plantilla:** etiquetas en MAYÚSCULAS espaciadas sobre cada título; cadenas «A · B · C»; «→» pegado a enlaces y botones; numeración 01/02/03 si el contenido no es una secuencia; monoespaciada para etiquetas pequeñas por inercia (resérvala para código o datos reales); una sola palabra del titular resaltada con otro color o en cursiva.
- **Tropos de portafolio:** efecto máquina de escribir, «Hola, soy X 👋», emojis como íconos, barras o porcentajes de habilidad, muro de logos, animación de entrada en cada sección, tarjetas que «levitan» al pasar el cursor.

### Tokens (patrón obligatorio; los valores salen de `DESIGN.md`)

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  color-scheme: light;
  --canvas: …;     /* fondo de página */
  --surface: …;    /* superficies elevadas */
  --ink: …;        /* texto principal */
  --ink-muted: …;  /* texto secundario */
  --line: …;       /* bordes y divisores */
  --accent: …;     /* acción principal y foco */
  --accent-ink: …; /* texto sobre --accent */
}
.dark {
  color-scheme: dark;
  /* mismos nombres, valores del tema oscuro */
}

@theme inline {
  --color-*: initial; /* desactiva la paleta por defecto: si no es un token, no existe */
  --color-canvas: var(--canvas);
  --color-surface: var(--surface);
  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-line: var(--line);
  --color-accent: var(--accent);
  --color-accent-ink: var(--accent-ink);
}

@theme {
  /* --typeface-* los define <Font /> de la Fonts API */
  --font-sans: var(--typeface-body, ui-sans-serif, system-ui, sans-serif);
  --font-heading: var(--typeface-heading, var(--font-sans));
  /* escala tipográfica (incluido --text-display con clamp()), radios y espaciado según DESIGN.md */
}
```

### Responsive

- Mobile-first. Sin scroll horizontal en 320, 375, 390, 768, 1024, 1280 y 1536 px.
- En 390×844, el primer viewport muestra nombre, propuesta de valor y la acción principal.
- Objetivos táctiles de al menos 44×44 px en móvil.
- Tamaño de display fluido con `clamp()` definido como token.
- Toda imagen con dimensiones explícitas (sin CLS).

## 6. Secciones

Orden: Header, Hero, Sobre mí y trayectoria, Proyectos, Habilidades, Contacto, Footer. Un solo `h1` (en el Hero). Cada sección es un `<section aria-labelledby>` con su `h2`, un `id` en español (`sobre-mi`, `proyectos`, `habilidades`, `contacto`) y `scroll-margin-top` para que el header sticky no tape el título. Sin etiquetas decorativas sobre los títulos.

**Header.** Nombre (enlace al inicio), navegación por anclas y `ThemeToggle`. Los enlaces apuntan a `/#seccion` (respetando `import.meta.env.BASE_URL`), no a `#seccion`, para que funcionen también desde los casos de estudio y la 404. En móvil, un botón de menú con `aria-expanded` y `aria-controls` que se cierra con Esc y al elegir un enlace, y devuelve el foco al botón. Sticky y compacto.

**Hero**

- Pasa la prueba de los 10 segundos: quién soy, qué hago (Data/ML con base en Web/Cloud), en qué etapa estoy y qué busco.
- `h1` con nombre y rol; propuesta de valor en 1–2 frases concretas (qué construyo, con qué y para qué); disponibilidad.
- Acción principal «Ver proyectos»; secundaria «Descargar CV (PDF)»; GitHub y LinkedIn con nombre accesible.
- Elemento distintivo: la opción que yo elija en la Fase 1, propia del mundo de los datos y no decorativa. Sus datos van como snapshot dentro del repositorio (sin llamadas a APIs en el build ni en el navegador), con la licencia y la atribución que exija cada fuente; un tema sensible, como datos clínicos, nunca se usa como adorno. Funciona sin JS (SVG o imagen estática), tiene alternativa textual (`<figure>` con `<figcaption>`, o `role="img"` con `aria-label`), es operable con teclado si es interactivo, usa como máximo 5 KB de JS y no retrasa el LCP.

**Sobre mí y trayectoria**

- Bio en primera persona de ≤ 120 palabras, centrada en cómo abordo problemas con datos e ingeniería y apoyada en hechos, no en adjetivos (ver «Hilo narrativo» en `docs/CONTENT.md`). Idiomas al final de la sección. Foto opcional con `<Image>` si existe `src/assets/profile.*`; si no existe, el diseño no deja un hueco.
- Trayectoria como `<ol>` con fechas en `<time datetime>`: hoy, formación universitaria (con electivos), trabajo de temporada y enseñanza media técnico-profesional; el modelo admite más tipos a futuro (ayudantías, prácticas, certificaciones). Aquí una línea de tiempo sí se justifica, porque es una secuencia real.

**Proyectos**

- Desde la colección, ordenados por `featured` y `order`; `draft` nunca se renderiza. Los destacados suelen ser los que tienen caso de estudio.
- Jerarquía real: los destacados tienen más espacio (resumen y resultado principal); el resto se muestra compacto, con problema, enfoque y resultado en una línea cada uno. Todos muestran tecnologías (desde el registro), año, estado y enlaces.
- Una acción principal por tarjeta: el caso de estudio si existe; si no, el repo o la demo. Usa el patrón de enlace extendido (un pseudo-elemento del enlace cubre la tarjeta) con los enlaces secundarios por encima (`relative z-10`). Nunca un `<a>` dentro de otro `<a>`. El foco del enlace principal se ve en toda la tarjeta; hover y `:focus-visible` son equivalentes y discretos.
- Filtro por área o tecnología solo con 6 proyectos o más: botones con `aria-pressed`, todo visible sin JS y el resultado anunciado con `aria-live="polite"`.
- Sin imágenes de relleno; sin `cover`, la tarjeta funciona igual de bien.

**Casos de estudio** (`/proyectos/<id>`)

- Estructura: enlace de vuelta a `/#proyectos`; `h1` con el título; resumen; ficha con año, estado, rol, tecnologías y enlaces; cuerpo dentro de `Prose` con una medida de 60–75 caracteres; al final, enlace al siguiente caso de estudio y al CV.
- Plantilla del cuerpo: problema y contexto; datos (fuente, tamaño, limpieza, sesgos); enfoque (baseline, qué probé y por qué); evaluación (métrica y esquema de validación); resultados; limitaciones y próximos pasos; mi rol, si fue en equipo. Entre 600 y 1.200 palabras.
- Toda métrica va junto a su punto de comparación y a cómo se validó; nada de cifras sueltas.
- Figuras con texto alternativo que diga la conclusión del gráfico, no su forma.
- Bloques de código con resaltado coherente en claro y oscuro (confirma en la documentación de Astro 7 cómo se configura con Sätteri).
- Cada página con su propio título, descripción (`summary`), canonical e imagen OG (`cover` o la imagen por defecto).

**Habilidades**

- Tres grupos derivados del registro: Data/ML (incluye Analytics), Dev/Cloud y Herramientas.
- El texto es el protagonista; íconos opcionales y monocromos. Sin niveles, barras ni porcentajes.
- Evidencia en vez de autoevaluación: junto a cada tecnología usada en algún proyecto, en cuántos (calculado en build) y enlace a ellos. Las demás se listan sin contador: nunca «0 proyectos». Las notas del registro (p. ej. «cursando») se muestran tal cual.

**Contacto**

- Invitación breve y directa. Email visible como `mailto:` y botón «Copiar correo» (Clipboard API y confirmación en una región `aria-live`; el enlace funciona sin JS). GitHub, LinkedIn y CV. Sin formulario ni backend.

**Footer.** Nombre, año, fecha de la última actualización (la del build) y enlace al código del sitio si el repositorio es público. **404** con el mismo layout y un enlace al inicio.

**Redacción.** Primera persona, voz activa, frases cortas y mayúscula solo al inicio. Cada CTA dice exactamente qué pasa («Descargar CV (PDF)», «Ver código en GitHub»). Prohibido: «apasionado», «entusiasta», «ninja», «gurú», «soluciones innovadoras», «transformar datos en insights» y similares. Cifras solo si vienen de mis datos.

## 7. Accesibilidad (WCAG 2.2 AA)

- Contraste de al menos 4.5:1 en texto normal y 3:1 en texto grande y componentes de interfaz, en ambos temas.
- Enlace «Saltar al contenido»; landmarks `header`, `nav` (con `aria-label`), `main` y `footer`; encabezados sin saltos de nivel.
- Foco visible en todo elemento interactivo (`focus-visible` con el token de acento y offset); el header sticky nunca tapa el elemento enfocado (`scroll-padding-top`).
- Todo operable con teclado; nada depende solo del hover o del color.
- Íconos decorativos con `aria-hidden="true"`; enlaces de solo ícono con nombre accesible; enlaces externos con `rel="noopener noreferrer"` y, si abren una pestaña nueva, aviso para lectores de pantalla.
- `prefers-reduced-motion`: sin animaciones no esenciales; desplazamiento suave solo con `motion-safe`.
- Reflow a 320 px y zoom al 200 % sin pérdida de contenido.
- `ThemeToggle` es un `<button type="button">` con nombre accesible y `aria-pressed`.

## 8. Tema claro/oscuro

- Clase `.dark` en `<html>`. Estado inicial: la preferencia guardada o, si no hay, `prefers-color-scheme`. El toggle guarda la elección; sin elección guardada, se siguen los cambios del sistema.
- Script bloqueante en el `<head>`, antes de los estilos, para evitar el destello del tema incorrecto:

  ```astro
  <script is:inline>
    (() => {
      let stored = null;
      try { stored = localStorage.getItem('theme'); } catch {}
      const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', dark);
    })();
  </script>
  ```

- `<meta name="theme-color">` para cada tema, con su `media`.
- Los componentes usan tokens que ya cambian con el tema; `dark:` solo para excepciones puntuales.

## 9. SEO y rendimiento

**SEO**

- `site` en `astro.config.mjs` (URL real o marcador). Si el hosting es GitHub Pages sin dominio propio y el repositorio no es `<usuario>.github.io`, configura `base` y construye toda URL interna con `import.meta.env.BASE_URL`.
- `SEO.astro`: título con plantilla, descripción, canonical, Open Graph (título, descripción, imagen 1200×630, tipo y locale) y Twitter `summary_large_image`.
- JSON-LD `Person` (name, jobTitle, alumniOf, url, sameAs, knowsAbout) con `<script type="application/ld+json" set:html={JSON.stringify(data)} />`.
- `@astrojs/sitemap` (incluye los casos de estudio); `robots.txt` generado por `src/pages/robots.txt.ts` a partir de `site` (sin URL escrita a mano); `/styleguide` con `noindex` y fuera del sitemap.
- `favicon.svg` (puede adaptarse al tema con una media query interna) y `apple-touch-icon`. Si no hay diseño para la imagen OG, genérala desde un SVG con `sharp` (ya viene con Astro) mediante un script Node.

**Rendimiento** (medido sobre `preview`, Lighthouse móvil)

- 95 o más en Performance, Accessibility, Best Practices y SEO; objetivo 100 en las tres últimas.
- LCP < 2.5 s, CLS < 0.05 y como máximo 15 KB de JS de cliente (gzip) en total.
- Imágenes con `<Image>` o `<Picture>` de `astro:assets` (AVIF/WebP, tamaños explícitos, `lazy` salvo lo visible al cargar, que va con prioridad alta).
- Precarga solo el peso principal de la fuente. Ninguna petición a terceros.
- Opcional al final: `security.csp`, solo si el tema, el menú y las fuentes siguen funcionando; si algo falla, reviértelo y regístralo.

## 10. Verificación y definición de terminado

En cada fase:

1. `npm run check`: 0 errores y 0 advertencias.
2. `npm run build`: sin errores ni advertencias nuevas.
3. `npm run format`: sin cambios pendientes (y revisa los espacios inline, ver §3).
4. Consola del navegador sin errores.
5. Revisión visual en las fases con UI: con el servidor en segundo plano, captura la home (y, desde la Fase 5, un caso de estudio) en 390×844 y 1440×900, en tema claro y oscuro (`npx playwright install chromium` una vez; luego `npx playwright screenshot --viewport-size="390,844" --color-scheme=dark --full-page <url> .screenshots/<nombre>.png`). Abre las capturas, compáralas con `DESIGN.md` y corrige antes de cerrar. `.screenshots/` va en `.gitignore`. Si el entorno no lo permite, dilo y dame una checklist manual.

Además, en la Fase 6:

- Lighthouse sobre `preview` si hay Chrome o Chromium disponible (el de Playwright sirve vía `CHROME_PATH`), con los cuatro puntajes en el resumen.
- Recorrido completo solo con teclado, incluidos el menú móvil y el toggle de tema.
- Recarga en cada tema sin destello; la preferencia persiste.
- `npm run check:content` sin `TODO:` pendientes o, si quedan, la lista de lo que me falta aportar.
- Cumplimiento de §7, §8 y §9.

Formato del resumen de fase:

```text
Fase N: <nombre>
Hecho:
Archivos clave:
Verificación: salida de check/build y capturas revisadas
Decisiones y supuestos:
Pendiente para ti (contenido real):
```

## 11. Plan por fases

**Fase 0: Entorno**

- Crea el proyecto en la raíz actual. Si el generador rechaza la carpeta por no estar vacía (por este archivo, `docs/` o el CV), genéralo en una carpeta temporal, mueve su contenido a la raíz sin sobrescribir nada de lo que ya existe y borra la carpeta temporal.
- `git init` si hace falta; agrega `.screenshots/` al `.gitignore`.
- Instala y configura todo lo de §3; crea la estructura de §4 (vacía) y `docs/DECISIONS.md`.
- En el resumen: versiones instaladas de Node, Astro y Tailwind, y el árbol de archivos.

**Fase 1: Dirección visual (sin código de UI).** Escribe `DESIGN.md` según §5, con las opciones del elemento distintivo y la autocrítica. Espera mi aprobación y mi elección; puedo pedir cambios.

**Fase 2: Fundaciones.** `global.css` con los tokens aprobados; fuentes; `BaseLayout` con `SEO`, script de tema y enlace de salto; `Header` con menú móvil, `Footer` y `ThemeToggle`; primitivos de `ui/` (incluido `Prose`); `/styleguide` con cada primitivo y variante en ambos temas.

**Fase 3: Contenido y secciones**

- Esquemas y archivos de datos de §4, cargados desde `docs/CONTENT.md` sin agregar hechos: lo marcado `TODO:` queda como `TODO:`. El CV de `public/cv/` solo sirve para resolver dudas de lectura.
- Propón dos versiones de la bio y del texto del hero; yo elijo.
- Las cinco secciones compuestas en `index.astro`; responsive en todos los anchos de §5.
- En el resumen, agrupa los `TODO:` pendientes según lo que yo debo aportar (enlaces, capturas, datos).

**Fase 4: Interacción y elemento distintivo.** La opción elegida del elemento distintivo, interacción de tarjetas, menú móvil, copiar correo, filtro (si aplica) y el momento de movimiento orquestado.

**Fase 5: Casos de estudio**

- Construye la ruta `/proyectos/[id]`, `ProjectHeader` y el estilo de `Prose` según §6, y pruébalos con un cuerpo marcado como `TODO:`.
- Sigue el orden y las condiciones de `docs/CONTENT.md`. Para cada proyecto, hazme la entrevista con sus preguntas pendientes (una tanda por proyecto, no todas juntas) y redacta solo con mis respuestas, siguiendo la plantilla del cuerpo (§6). Lo que no responda queda como `TODO:`.
- Si un caso condicional no cumple su condición, queda como tarjeta y lo registras en `docs/DECISIONS.md`.
- Las figuras que yo entregue van a `src/assets/projects/<id>/`; los diagramas (p. ej. el del pipeline) puedes dibujarlos en SVG a partir de mis respuestas.

**Fase 6: Calidad y entrega.** SEO completo, 404, imagen OG, favicon y robots; optimización de imágenes, fuentes y JS; auditoría de accesibilidad y Lighthouse; eliminar `/styleguide`; README (cómo editar el contenido, cómo agregar un proyecto con o sin caso de estudio y su plantilla de frontmatter, comandos y despliegue en el hosting elegido; en GitHub Pages, con el workflow oficial `withastro/action`); checklist final de §10.

## 12. Prohibiciones

- Frameworks de UI, librerías de animación, kits de componentes (DaisyUI, Flowbite, shadcn), CSS-in-JS, jQuery.
- `tailwind.config.js`, `@astrojs/tailwind`, `<ClientRouter />`, `Astro.glob()`, plugins remark/rehype.
- Formularios con backend, analítica, cookies, CMS, fuentes o scripts servidos desde CDNs externos.
- Imágenes de servicios externos (Unsplash, placehold.co), lorem ipsum, datos inventados.
- Publicar teléfono, dirección o número de documento, aunque aparezcan en el CV.
- Contenido oculto hasta que cargue JS (p. ej. un `opacity-0` que depende de un script para aparecer).
- `npm audit fix --force`, cambios de versión mayor, borrar el lockfile, `git push` o reescribir el historial sin preguntarme.

## 13. Estado del proyecto

Al cerrar cada fase, márcala y agrega la fecha y el hash del commit. No edites el resto de este archivo sin mi permiso.

- [x] Fase 0: Entorno (2026-09-27, 970a438)
- [x] Fase 1: Dirección visual (2026-09-27, 3222656)
- [ ] Fase 2: Fundaciones
- [ ] Fase 3: Contenido y secciones
- [ ] Fase 4: Interacción y elemento distintivo
- [ ] Fase 5: Casos de estudio
- [ ] Fase 6: Calidad y entrega
