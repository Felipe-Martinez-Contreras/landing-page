---
title: Clustering exploratorio sobre el dataset Wisconsin Breast Cancer
shortTitle: Clustering Wisconsin
summary: "Análisis exploratorio en R del dataset Wisconsin Breast Cancer: comparación de cuatro algoritmos de clustering tras detectar atípicos y reducir dimensiones."
year: 2025
context: Proyecto individual del curso Análisis Exploratorio de Datos, 2025-1
status: completed
area: data-ml
tech: [r]
methods:
  - Estandarización
  - LOF
  - PCA
  - Estadístico de Hopkins
  - K-means
  - DBSCAN
  - Clustering jerárquico
  - Mean Shift
  - Coeficiente de silueta
role: Individual
problem: Explorar si los 569 casos del dataset público Wisconsin Breast Cancer (30 variables) forman agrupamientos naturales.
approach: Estandarización, detección de atípicos con LOF y reducción de dimensionalidad con PCA; tendencia a agruparse validada con el estadístico de Hopkins y comparación de K-means, DBSCAN, jerárquico y Mean Shift.
result: Tendencia a agruparse validada (Hopkins de 0,79) y silueta de 0,52 con K-means y con el jerárquico.
metrics:
  - label: Estadístico de Hopkins
    value: "0,79"
  # TODO: comparison = silueta de DBSCAN y Mean Shift.
  - label: Silueta (K-means y jerárquico)
    value: "0,52"
# TODO: enlace al informe o al repositorio con los scripts de R.
links: {}
featured: false
order: 3
---
