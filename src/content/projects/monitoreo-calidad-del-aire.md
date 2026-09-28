---
title: Sistema de monitoreo en tiempo real de movilidad y calidad del aire
shortTitle: Calidad del aire
summary: Dashboard en Dash que monitorea tráfico, contaminación y clima por zona de Santiago, con ingesta desde APIs externas y actualización cada 10 segundos.
year: 2026
context: Proyecto en pareja del curso Visualización de Datos, 2026-1; nota 7,0
status: completed
area: data-ml
tech: [python, dash, plotly, pandas, sqlite, rest-apis, docker, pytest]
methods:
  - Ingesta desde APIs con fallback
  - Normalización de datos
  - Orquestación con Docker Compose
  - Tests automatizados
# TODO: mi parte concreta en el proyecto en pareja (el CV habla en plural).
role: En pareja
problem: Reunir en un solo tablero, por zona de Santiago, datos de tráfico, contaminación (PM2.5, NO₂ y O₃) y clima que vienen de distintas fuentes.
approach: Un pipeline de ingesta consume APIs externas (Open-Meteo, OpenAQ) con fallback automático, normaliza los datos con Pandas y los guarda en SQLite; el dashboard en Dash se actualiza solo cada 10 segundos y Docker Compose orquesta los servicios.
result: Dashboard interactivo con actualización automática cada 10 segundos y un sistema validado con tests automatizados en pytest.
# TODO: métricas opcionales (cantidad de tests o de zonas).
# TODO: enlace al repositorio y a una demo (o capturas / video corto).
links: {}
featured: true
order: 1
---

## Problema y contexto

TODO: redactar con las respuestas de la entrevista.

## Datos

TODO: fuente, tamaño, limpieza y sesgos.

## Enfoque

TODO: baseline, qué probé y por qué.

## Evaluación

TODO: métrica y esquema de validación.

## Resultados

TODO: cada cifra con su punto de comparación.

## Limitaciones y próximos pasos

TODO: qué mejoraría o haría distinto hoy.

## Mi rol

TODO: qué parte hice yo y cuál mi compañero o compañera.
