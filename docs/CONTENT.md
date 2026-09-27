# CONTENT.md: contenido inicial del portafolio

Extraído de mi CV (septiembre de 2026). Reglas para Claude Code:

- Usa solo estos hechos. Lo marcado `TODO:` no se completa con supuestos: me lo preguntas.
- Desde la Fase 3, la fuente de verdad es `src/content/` y `src/data/`. Este archivo queda como registro histórico y no se sincroniza.
- No se publican mi teléfono ni la sección de referencias del CV.

## Identidad (`src/data/site.ts`)

- Nombre: Felipe Martínez
- Titular: estudiante de Ingeniería Civil en Computación
- Universidad: Universidad de Talca; cursando cuarto año, egreso estimado en 2027
- Interés declarado: ciencia de datos e inteligencia artificial, con formación en desarrollo web, bases de datos y redes
- Disponibilidad: Práctica Profesional I (8 semanas), enero–febrero de 2027
- Modalidad y ciudades posibles para la práctica: Presencial en Curicó o alrededores, o remota.
- Ubicación pública: Curicó, Región del Maule, Chile
- Email: felipemartinez.icc@gmail.com
- GitHub: https://github.com/Felipe-Martinez-Contreras
- LinkedIn: www.linkedin.com/in/felipe-martinez-contreras
- Idiomas: inglés intermedio (B1), lectura técnica
- CV: `public/cv/felipe-martinez-cv.pdf`

## Hechos para el hero

- Quién: Felipe Martínez, estudiante de cuarto año de Ingeniería Civil en Computación en la Universidad de Talca.
- Qué hago, con respaldo en mis proyectos: dashboards y pipelines de datos (Python, Dash, Power BI) y análisis exploratorio con clustering (R).
- Qué busco: mi Práctica Profesional I, de 8 semanas, entre enero y febrero de 2027.

## Hilo narrativo para «Sobre mí»

Hechos disponibles (no agregues otros):

- Cómo abordo los problemas, según mi CV: los analizo por partes, busco alternativas y no me detengo hasta resolverlos; tomo la iniciativa cuando el equipo lo necesita, comunico mis ideas con fundamento y estoy abierto a la retroalimentación.
- Trabajo fuera del aula: más de 8 temporadas agrícolas consecutivas (2017–2026), primero al egresar de la enseñanza media y luego en paralelo a la universidad. En cereza fui cosechero, seleccionador, planillero (registro y control de producción) y jefe de cuadrilla; en tabaco, responsable del semillero y de las labores del cultivo. El empleador me vuelve a llamar cada temporada.
- Base técnica previa: enseñanza media técnico-profesional, especialidad Electrónica.
- Personal (opcional, una línea como máximo): gimnasio, fútbol y trompeta.

Enfoque: mostrar con hechos lo que el CV dice con adjetivos («responsable», «perseverante»). Más de ocho temporadas seguidas, el rol de jefe de cuadrilla y que el empleador me vuelva a llamar cada año dicen más que cualquier adjetivo. Un ángulo posible, que yo debo validar: antes de analizar datos, ya los registraba y controlaba en terreno como planillero.

## Trayectoria (`src/data/experience.ts`)

1. Universidad
   - kind: `education`
   - Organización: Universidad de Talca
   - Título: Ingeniería Civil en Computación
   - Inicio: `TODO:` año de ingreso
   - Fin: `present` (egreso estimado en 2027)
   - Descripción: cursando cuarto año. Electivos: Análisis y Extracción de Datos; Visualización de Datos; Procesamiento de Lenguaje Natural (en curso).
2. Trabajo de temporada
   - kind: `work`
   - Organización: fundos y contratistas agrícolas, Provincia de Curicó
   - Título: trabajador de temporada agrícola
   - Inicio: 2017. Fin: 2026 (por temporadas)
   - Highlights:
     - Más de 8 temporadas consecutivas en cosecha de cereza y producción de tabaco; empecé al egresar de la enseñanza media y seguí en paralelo a la universidad.
     - En cereza: cosechero, seleccionador, planillero (registro y control de producción) y jefe de cuadrilla, coordinando al equipo de trabajo.
     - En tabaco: responsable del semillero y de las distintas labores del cultivo; el empleador me vuelve a llamar cada temporada.
3. Enseñanza media
   - kind: `education`
   - Organización: Colegio Politécnico San José, Curicó
   - Título: enseñanza media técnico-profesional, especialidad Electrónica
   - Fin: 2017

## Proyectos (`src/content/projects/`)

| order | id | featured | Caso de estudio |
|---|---|---|---|
| 1 | `monitoreo-calidad-del-aire` | sí | sí |
| 2 | `dashboard-red-de-salud` | sí | sí |
| 3 | `clustering-cancer-de-mama` | no | condicional |

Los tres tienen `status: completed` y `area: data-ml`.

### 1. `monitoreo-calidad-del-aire`

- **title:** Sistema de monitoreo en tiempo real de movilidad y calidad del aire
- **summary:** Dashboard en Dash que monitorea tráfico, contaminación y clima por zona de Santiago, con ingesta desde APIs externas y actualización cada 10 segundos.
- **year:** 2026
- **context:** proyecto en pareja del curso Visualización de Datos, 2026-1; nota 7,0
- **tech:** `python`, `dash`, `plotly`, `pandas`, `sqlite`, `rest-apis`, `docker`, `pytest`
- **methods:** ingesta desde APIs con fallback, normalización de datos, orquestación con Docker Compose, tests automatizados
- **problem:** reunir en un solo tablero, por zona de Santiago, datos de tráfico, contaminación (PM2.5, NO₂ y O₃) y clima que vienen de distintas fuentes.
- **approach:** un pipeline de ingesta consume APIs externas (Open-Meteo, OpenAQ) con fallback automático, normaliza los datos con Pandas y los guarda en SQLite; el dashboard interactivo en Dash se actualiza solo cada 10 segundos, y Docker Compose orquesta los servicios.
- **result:** dashboard interactivo con actualización automática cada 10 segundos y un sistema validado con tests automatizados en pytest.
- **metrics:** ninguna en el CV (`TODO:` opcional: cantidad de tests o de zonas).
- **role:** en pareja. `TODO:` mi parte concreta; el CV habla en plural.
- **links:** repo `TODO:`; demo `TODO:` (si no hay demo pública, sirven capturas o un video corto).
- **Recursos pendientes:** 2–3 capturas del dashboard (`TODO:`). El diagrama del pipeline puede dibujarse en SVG a partir de mis respuestas.
- **Preguntas para la entrevista:**
  1. ¿Qué parte hiciste tú y cuál tu compañero o compañera?
  2. ¿De dónde salen los datos de tráfico?
  3. ¿Cómo funciona el fallback? ¿Qué pasa si una API no responde?
  4. ¿Por qué cada 10 segundos? ¿Cada cuánto cambian realmente los datos de cada fuente?
  5. ¿Cómo definieron las zonas de Santiago?
  6. ¿Qué cubren los tests?
  7. ¿Qué mejorarías o harías distinto hoy?

### 2. `dashboard-red-de-salud`

- **title:** Dashboard de gestión de la red de salud de Chile
- **summary:** Dashboard en Power BI sobre los 5.623 establecimientos de salud del MINSAL para analizar cobertura, acceso a urgencias y complejidad de la red por región.
- **year:** 2026
- **context:** proyecto individual del curso Visualización de Datos, 2026-1; nota 7,0
- **tech:** `power-bi`, `power-query`, `dax`, `excel`
- **methods:** limpieza con reglas de negocio, diseño de KPIs, principios de la Gestalt
- **problem:** analizar la cobertura, el acceso a urgencias y la complejidad de la red de salud por región, a partir de los 5.623 establecimientos del MINSAL publicados en datos.gob.cl.
- **approach:** limpieza y transformación en Power Query (categorías inconsistentes normalizadas, nulos tratados, jerarquía asistencial reclasificada con reglas de negocio y 5 variables nuevas, entre ellas direcciones normalizadas); medidas DAX para KPIs de gestión (centros activos, % de cobertura de urgencia, composición público/privado); cada gráfico justificado con las leyes de la Gestalt.
- **result:** dashboard de 10 visualizaciones con tarjetas KPI; las direcciones normalizadas permitieron mapear el 100 % de los establecimientos.
- **metrics:**
  - Establecimientos analizados: 5.623
  - Establecimientos mapeados: 100 % (comparison: `TODO:` porcentaje que se podía mapear antes de normalizar las direcciones)
- **role:** individual
- **links:** `TODO:` (¿publicado desde Power BI? Si no, capturas).
- **Recursos pendientes:** 3–4 capturas del dashboard en buena resolución (`TODO:`).
- **Preguntas para la entrevista:**
  1. ¿Qué porcentaje de establecimientos se podía mapear antes de normalizar las direcciones? Es la cifra de comparación del caso.
  2. ¿Qué reglas de negocio usaste para reclasificar la jerarquía asistencial?
  3. ¿Cuáles son las 5 variables nuevas?
  4. ¿Cómo se calcula la medida de cobertura de urgencia?
  5. ¿Qué hallazgo concreto mostró el dashboard?
  6. Un ejemplo de ley de la Gestalt aplicada a un gráfico y qué problema resolvió.
  7. ¿Qué harías distinto hoy?

### 3. `clustering-cancer-de-mama`

- **title:** Análisis de clustering para apoyo al diagnóstico de cáncer de mama. Título alternativo, más preciso, a decidir por mí: «Clustering exploratorio sobre el dataset Wisconsin Breast Cancer».
- **summary:** Análisis exploratorio en R del dataset Wisconsin Breast Cancer: comparación de cuatro algoritmos de clustering tras detectar atípicos y reducir dimensiones.
- **year:** 2025
- **context:** proyecto individual del curso Análisis Exploratorio de Datos, 2025-1
- **tech:** `r`
- **methods:** estandarización, LOF, PCA, estadístico de Hopkins, K-means, DBSCAN, clustering jerárquico, Mean Shift, coeficiente de silueta
- **Paquetes de R** (para el cuerpo del caso, no como tecnologías): cluster, dbscan, factoextra, clValid, GGally
- **problem:** explorar si los 569 pacientes del dataset Wisconsin Breast Cancer (30 variables) forman agrupamientos naturales que puedan apoyar el diagnóstico médico.
- **approach:** estandarización, detección de atípicos con LOF y reducción de dimensionalidad con PCA; validación de la tendencia a agruparse con el estadístico de Hopkins; comparación de cuatro algoritmos: K-means, DBSCAN, jerárquico y Mean Shift.
- **result:** tendencia a agruparse validada (Hopkins de 0,79) y silueta de 0,52 con K-means y con el jerárquico.
- **metrics:**
  - Estadístico de Hopkins: 0,79
  - Silueta (K-means y jerárquico): 0,52 (comparison: `TODO:` silueta de DBSCAN y Mean Shift)
- **role:** individual
- **links:** `TODO:` (¿informe o repositorio con los scripts de R?)
- **Encuadre obligatorio:** análisis exploratorio sobre un dataset público de referencia; ni la tarjeta ni el caso afirman utilidad clínica.
- **Condición para el caso de estudio:** que la entrevista aporte (a) la comparación de los clusters con el diagnóstico real y (b) los resultados de los cuatro algoritmos. Si no, queda como tarjeta.
- **Preguntas para la entrevista:**
  1. ¿Comparaste los clusters con el diagnóstico real (benigno o maligno)? ¿Con qué medida y qué resultado?
  2. ¿Qué silueta obtuvieron DBSCAN y Mean Shift, y por qué crees que rindieron distinto?
  3. ¿Cuántos atípicos detectó LOF y qué hiciste con ellos?
  4. ¿Cuántos componentes de PCA usaste y cuánta varianza explicaban?
  5. ¿Cómo elegiste el número de clusters?
  6. ¿Qué limitaciones ves en el análisis?

## Registro de tecnologías (`src/data/tech.ts`)

Formato: `id` y la etiqueta tal como se muestra en el sitio.

- **data-ml:** `python` Python, `pandas` Pandas, `numpy` NumPy, `scikit-learn` Scikit-learn, `r` R, `nlp` NLP (nota: cursando el electivo), `matplotlib` Matplotlib, `seaborn` Seaborn, `plotly` Plotly, `power-bi` Power BI, `power-query` Power Query, `dax` DAX, `tableau` Tableau, `sql` SQL, `mysql` MySQL, `postgresql` PostgreSQL, `sqlite` SQLite
- **dev-cloud:** `django` Django, `flask` Flask, `dash` Dash, `html` HTML, `css` CSS, `bootstrap` Bootstrap, `javascript` JavaScript, `rest-apis` APIs REST, `google-cloud` Google Cloud (nota: Cloud Run, Cloud SQL, Cloud Storage), `docker` Docker, `linux` Linux, `tcp-ip` Redes TCP/IP, `java` Java, `c-cpp` C/C++
- **tools:** `git` Git y GitHub, `jupyter` Jupyter, `excel` Excel, `pytest` pytest, `scrum` Scrum

## Material para el elemento distintivo (Fase 1)

Solo datos reales. Antes de proponer una opción, verifica que el dato exista, su licencia y la atribución que exige:

- **Red de salud:** los establecimientos del MINSAL sobre el mapa de Chile, si el dataset trae coordenadas. La forma alargada del país encaja con una composición vertical en móvil. Ojo con el peso: más de cinco mil puntos piden una imagen generada en build con una capa SVG liviana encima, no miles de nodos SVG.
- **Calidad del aire:** una serie de PM2.5, NO₂ u O₃ de Santiago (de mi propio sistema o de OpenAQ), guardada como snapshot en el repositorio.
- **Clustering:** la proyección PCA de los 569 pacientes con los grupos de cada algoritmo. Son datos clínicos: tratamiento sobrio o nada.
- **El propio sitio:** tecnologías por proyecto o la línea de tiempo 2017–2027.
