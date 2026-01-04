# Mapa de Carreteras de Soria

Aplicación web interactiva para visualizar el mapa de carreteras de la provincia de Soria (España) y gestionar puntos de interés personalizados.

## 🌐 Demo en Vivo

**[https://jagonre.github.io/road-issues/](https://jagonre.github.io/road-issues/)**

## Características

- **Mapa interactivo** de la provincia de Soria con datos de OpenStreetMap
- **Geolocalización del dispositivo** para ver tu ubicación actual en el mapa
- **Añadir puntos de interés** haciendo click en el mapa
- **Categorías predefinidas**: Señal de tráfico, Bache, Obra, Accidente, Otro
- **Almacenamiento local** de todos los puntos de interés
- **Búsqueda y filtrado** de puntos por nombre, descripción o categoría
- **Exportar/Importar** datos en formato JSON
- **Editar y eliminar** puntos de interés existentes
- **Diseño responsivo** que funciona en móviles y escritorio

## Cómo usar la aplicación

### Instalación

No requiere instalación. Simplemente abre el archivo `index.html` en tu navegador web preferido.

```bash
# Opción 1: Abrir directamente el archivo
open index.html

# Opción 2: Servir con un servidor local (opcional)
python -m http.server 8000
# Luego visita http://localhost:8000
```

### Uso básico

#### 1. Añadir un punto de interés

1. Haz **click en cualquier ubicación** del mapa
2. Se mostrará un marcador temporal y aparecerá un formulario en el panel lateral
3. Rellena los campos:
   - **Nombre**: Título descriptivo del punto (ej: "Bache en N-234")
   - **Descripción**: Detalles adicionales (opcional)
   - **Categoría**: Selecciona entre Señal de tráfico, Bache, Obra, Accidente u Otro
4. Haz click en **Guardar**
5. El punto aparecerá en el mapa con un icono según su categoría

#### 2. Ver puntos de interés

- Todos los puntos guardados aparecen en la lista del panel lateral
- Haz **click en un punto de la lista** para centrar el mapa en esa ubicación
- Haz **click en un marcador del mapa** para ver su información en un popup

#### 3. Buscar y filtrar

- Usa la **barra de búsqueda** para encontrar puntos por nombre o descripción
- Usa el **filtro de categorías** para mostrar solo puntos de una categoría específica

#### 4. Editar un punto

1. Localiza el punto en la lista del panel lateral
2. Haz click en el botón **Editar**
3. Modifica el nombre y/o descripción
4. Los cambios se guardan automáticamente

#### 5. Eliminar un punto

1. Localiza el punto en la lista del panel lateral
2. Haz click en el botón **Eliminar**
3. Confirma la eliminación

#### 6. Exportar datos

1. Haz click en **Exportar datos**
2. Se descargará un archivo JSON con todos tus puntos de interés
3. Guarda este archivo como copia de seguridad

#### 7. Importar datos

1. Haz click en **Importar datos**
2. Selecciona un archivo JSON previamente exportado
3. Elige si quieres:
   - **Combinar** con los datos existentes
   - **Reemplazar** los datos actuales

#### 8. Ver tu ubicación actual

1. Haz click en el botón **Mi Ubicación** 📍 (esquina inferior derecha del mapa)
2. Acepta los permisos de ubicación si el navegador los solicita
3. El mapa se centrará en tu ubicación actual
4. Verás un marcador azul con un círculo de precisión
5. Haz click en el marcador para ver tus coordenadas exactas

**Nota:** La geolocalización requiere HTTPS o localhost y permisos del navegador.

### Categorías de puntos de interés

Cada categoría tiene un icono y color distintivo:

- 🚦 **Señal de tráfico** (Azul): Señales de tráfico, semáforos o señalización vial
- 🕳️ **Bache** (Rojo): Desperfectos en el pavimento
- 🚧 **Obra** (Naranja): Obras en la carretera
- ⚠️ **Accidente** (Rojo oscuro): Zonas de accidentes o peligro
- 📍 **Otro** (Gris): Cualquier otro punto de interés

## Tecnologías utilizadas

- **HTML5/CSS3/JavaScript**: Desarrollo vanilla (sin frameworks)
- **Leaflet.js**: Librería de mapas interactivos
- **OpenStreetMap**: Proveedor de tiles y datos cartográficos
- **LocalStorage**: Almacenamiento persistente en el navegador

## Características técnicas

- ✅ Funciona completamente offline (después de la carga inicial)
- ✅ No requiere servidor backend
- ✅ Los datos se guardan en el navegador
- ✅ Responsive design para móviles y tablets
- ✅ Compatibilidad con navegadores modernos

## Estructura del proyecto

```
road-issues/
├── index.html      # Página principal
├── styles.css      # Estilos de la aplicación
├── app.js          # Lógica de la aplicación
└── README.md       # Este archivo
```

## Navegación en el mapa

- **Zoom**: Usa la rueda del ratón o los botones +/- en el mapa
- **Desplazamiento**: Arrastra el mapa con el ratón o el dedo (en móvil)
- **Panel lateral**: Haz click en el botón ☰ para mostrar/ocultar el panel (también disponible como botón flotante en el mapa cuando el panel está colapsado)
- **Mi ubicación**: Haz click en el botón 📍 para ver tu ubicación actual en el mapa

## Notas importantes

1. **Almacenamiento local**: Los datos se guardan en el navegador. Si limpias el caché o usas modo incógnito, los datos se perderán.
2. **Copia de seguridad**: Usa la función de exportar para crear copias de seguridad de tus datos.
3. **Límites del mapa**: El mapa está configurado para enfocarse en la provincia de Soria, pero puedes navegar por áreas cercanas.
4. **Geolocalización**: Requiere conexión HTTPS (o localhost) y permisos del navegador. Funciona mejor en dispositivos con GPS.

## Soporte de navegadores

- Chrome/Edge: ✅ Totalmente compatible
- Firefox: ✅ Totalmente compatible
- Safari: ✅ Totalmente compatible
- Opera: ✅ Totalmente compatible

## Privacidad

- Todos los datos se almacenan localmente en tu navegador
- No se envía información a ningún servidor externo (excepto las tiles del mapa desde OpenStreetMap)
- No se recopila información de usuario

## Créditos

- **Mapas**: [OpenStreetMap](https://www.openstreetmap.org/) contributors
- **Librería de mapas**: [Leaflet.js](https://leafletjs.com/)
- **Desarrollado con**: HTML, CSS y JavaScript vanilla

## Licencia

Este proyecto es de código abierto y está disponible para uso libre.

---

**¡Disfruta explorando las carreteras de Soria!** 🗺️
