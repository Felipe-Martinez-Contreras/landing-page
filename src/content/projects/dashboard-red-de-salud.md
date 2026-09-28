---
title: Dashboard de gestión de la red de salud de Chile
shortTitle: Red de salud
summary: Dashboard en Power BI sobre los 5.623 establecimientos de salud del MINSAL para analizar cobertura, acceso a urgencias y complejidad de la red por región.
year: 2026
context: Proyecto individual del curso Visualización de Datos, 2026-1; nota 7,0
status: completed
area: data-ml
tech: [power-bi, power-query, dax, excel]
methods:
  - Limpieza con reglas de negocio
  - Diseño de KPIs
  - Principios de la Gestalt
role: Individual
problem: Analizar la cobertura, el acceso a urgencias y la complejidad de la red de salud por región, a partir de los 5.623 establecimientos del MINSAL publicados en datos.gob.cl.
approach: Limpieza y transformación en Power Query (categorías normalizadas, nulos tratados, jerarquía asistencial reclasificada con reglas de negocio y 5 variables nuevas, entre ellas direcciones normalizadas), medidas DAX para los KPIs de gestión y cada gráfico justificado con las leyes de la Gestalt.
result: Dashboard de 10 visualizaciones con tarjetas KPI; las direcciones normalizadas permitieron mapear el 100 % de los establecimientos.
metrics:
  - label: Establecimientos analizados
    value: "5.623"
  # TODO: comparison = porcentaje que se podía mapear antes de normalizar las direcciones.
  - label: Establecimientos mapeados
    value: 100 %
# TODO: enlace (¿publicado desde Power BI?) o capturas del dashboard.
links: {}
featured: true
order: 2
---
