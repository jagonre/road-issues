// Global variables
let map;
let markers = [];
let pois = [];
let tempMarker = null;
let selectedLocation = null;

// Category icons configuration
const categoryIcons = {
    señal: {
        icon: '🚦',
        color: '#3498db'
    },
    bache: {
        icon: '🕳️',
        color: '#ff6b6b'
    },
    obra: {
        icon: '🚧',
        color: '#ffa502'
    },
    accidente: {
        icon: '⚠️',
        color: '#ff4757'
    },
    otro: {
        icon: '📍',
        color: '#747d8c'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadPOIs();
    setupEventListeners();
});

// Initialize Leaflet map
function initMap() {
    // Center on Soria province
    const soriaCenter = [41.766, -2.479];
    const initialZoom = 10;

    map = L.map('map').setView(soriaCenter, initialZoom);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 8
    }).addTo(map);

    // Set max bounds to keep focus on Soria region
    const soriaBounds = [
        [40.9, -3.5],  // Southwest coordinates
        [42.2, -1.7]   // Northeast coordinates
    ];
    map.setMaxBounds(soriaBounds);

    // Add click event to map for adding POIs
    map.on('click', onMapClick);
}

// Handle map click
function onMapClick(e) {
    const { lat, lng } = e.latlng;

    // Remove previous temp marker if exists
    if (tempMarker) {
        map.removeLayer(tempMarker);
    }

    // Create temporary marker
    tempMarker = L.marker([lat, lng], {
        icon: createCustomIcon('📍', '#667eea'),
        opacity: 0.6
    }).addTo(map);

    // Store selected location
    selectedLocation = { lat, lng };

    // Update form
    document.getElementById('selectedLat').textContent = lat.toFixed(6);
    document.getElementById('selectedLng').textContent = lng.toFixed(6);

    // Show form
    document.getElementById('poiForm').classList.remove('hidden');
}

// Create custom icon
function createCustomIcon(emoji, color) {
    const iconHtml = `
        <div style="
            font-size: 24px;
            text-align: center;
            background-color: ${color};
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        ">${emoji}</div>
    `;

    return L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });
}

// Setup event listeners
function setupEventListeners() {
    // POI form submit
    document.getElementById('poiForm').addEventListener('submit', handleFormSubmit);

    // Cancel button
    document.getElementById('cancelBtn').addEventListener('click', cancelAddPOI);

    // Search input
    document.getElementById('searchInput').addEventListener('input', filterPOIs);

    // Category filter
    document.getElementById('categoryFilter').addEventListener('change', filterPOIs);

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportPOIs);

    // Import button
    document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });

    // Import file input
    document.getElementById('importFile').addEventListener('change', importPOIs);

    // Toggle sidebar
    document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);
}

// Handle form submit
function handleFormSubmit(e) {
    e.preventDefault();

    if (!selectedLocation) {
        alert('Por favor, selecciona una ubicación en el mapa');
        return;
    }

    const name = document.getElementById('poiName').value.trim();
    const description = document.getElementById('poiDescription').value.trim();
    const category = document.getElementById('poiCategory').value;

    if (!name) {
        alert('Por favor, ingresa un nombre');
        return;
    }

    // Create POI object
    const poi = {
        id: Date.now().toString(),
        name,
        description,
        category,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        date: new Date().toISOString()
    };

    // Add to array
    pois.push(poi);

    // Save to localStorage
    savePOIs();

    // Add marker to map
    addMarkerToMap(poi);

    // Update POI list
    renderPOIList();

    // Reset form
    resetForm();

    // Show success message
    alert('Punto de interés añadido correctamente');
}

// Cancel adding POI
function cancelAddPOI() {
    resetForm();
}

// Reset form
function resetForm() {
    document.getElementById('poiForm').reset();
    document.getElementById('poiForm').classList.add('hidden');
    document.getElementById('selectedLat').textContent = '-';
    document.getElementById('selectedLng').textContent = '-';

    if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = null;
    }

    selectedLocation = null;
}

// Add marker to map
function addMarkerToMap(poi) {
    const config = categoryIcons[poi.category];
    const marker = L.marker([poi.lat, poi.lng], {
        icon: createCustomIcon(config.icon, config.color)
    }).addTo(map);

    // Create popup content
    const popupContent = `
        <div style="min-width: 200px;">
            <h3 style="margin: 0 0 10px 0; color: ${config.color};">${poi.name}</h3>
            ${poi.description ? `<p style="margin: 5px 0;"><strong>Descripción:</strong> ${poi.description}</p>` : ''}
            <p style="margin: 5px 0;"><strong>Categoría:</strong> ${poi.category}</p>
            <p style="margin: 5px 0; font-size: 0.85rem; color: #999;">
                ${new Date(poi.date).toLocaleDateString('es-ES')}
            </p>
        </div>
    `;

    marker.bindPopup(popupContent);

    // Store marker reference
    marker.poiId = poi.id;
    markers.push(marker);
}

// Load POIs from localStorage
function loadPOIs() {
    const stored = localStorage.getItem('soria-pois');
    if (stored) {
        try {
            pois = JSON.parse(stored);
            pois.forEach(poi => addMarkerToMap(poi));
            renderPOIList();
        } catch (e) {
            console.error('Error loading POIs:', e);
            pois = [];
        }
    }
}

// Save POIs to localStorage
function savePOIs() {
    localStorage.setItem('soria-pois', JSON.stringify(pois));
}

// Render POI list
function renderPOIList() {
    const listContainer = document.getElementById('poiList');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    // Filter POIs
    let filteredPOIs = pois.filter(poi => {
        const matchesSearch = poi.name.toLowerCase().includes(searchTerm) ||
                             (poi.description && poi.description.toLowerCase().includes(searchTerm));
        const matchesCategory = categoryFilter === 'all' || poi.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Sort by date (newest first)
    filteredPOIs.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredPOIs.length === 0) {
        listContainer.innerHTML = '<p class="empty-message">No se encontraron puntos de interés</p>';
        return;
    }

    listContainer.innerHTML = filteredPOIs.map(poi => {
        const config = categoryIcons[poi.category];
        return `
            <div class="poi-item" data-poi-id="${poi.id}" onclick="focusPOI('${poi.id}')">
                <div class="poi-item-header">
                    <span class="poi-item-name">${config.icon} ${poi.name}</span>
                    <span class="poi-category ${poi.category}">${poi.category}</span>
                </div>
                ${poi.description ? `<div class="poi-item-description">${poi.description}</div>` : ''}
                <div class="poi-item-footer">
                    <span>${new Date(poi.date).toLocaleDateString('es-ES')}</span>
                    <div class="poi-item-actions">
                        <button class="poi-action-btn" onclick="event.stopPropagation(); editPOI('${poi.id}')">Editar</button>
                        <button class="poi-action-btn delete" onclick="event.stopPropagation(); deletePOI('${poi.id}')">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Focus on POI
function focusPOI(poiId) {
    const poi = pois.find(p => p.id === poiId);
    if (poi) {
        map.setView([poi.lat, poi.lng], 15);

        // Find and open popup
        const marker = markers.find(m => m.poiId === poiId);
        if (marker) {
            marker.openPopup();
        }
    }
}

// Edit POI
function editPOI(poiId) {
    const poi = pois.find(p => p.id === poiId);
    if (!poi) return;

    const newName = prompt('Nuevo nombre:', poi.name);
    if (newName !== null && newName.trim()) {
        poi.name = newName.trim();

        const newDescription = prompt('Nueva descripción:', poi.description || '');
        if (newDescription !== null) {
            poi.description = newDescription.trim();
        }

        savePOIs();
        renderPOIList();

        // Update marker popup
        const marker = markers.find(m => m.poiId === poiId);
        if (marker) {
            map.removeLayer(marker);
            const index = markers.indexOf(marker);
            markers.splice(index, 1);
            addMarkerToMap(poi);
        }

        alert('Punto de interés actualizado');
    }
}

// Delete POI
function deletePOI(poiId) {
    if (!confirm('¿Estás seguro de que quieres eliminar este punto de interés?')) {
        return;
    }

    // Remove from array
    pois = pois.filter(p => p.id !== poiId);

    // Remove marker from map
    const marker = markers.find(m => m.poiId === poiId);
    if (marker) {
        map.removeLayer(marker);
        markers = markers.filter(m => m.poiId !== poiId);
    }

    // Save and re-render
    savePOIs();
    renderPOIList();

    alert('Punto de interés eliminado');
}

// Filter POIs
function filterPOIs() {
    renderPOIList();
}

// Export POIs
function exportPOIs() {
    if (pois.length === 0) {
        alert('No hay puntos de interés para exportar');
        return;
    }

    const dataStr = JSON.stringify(pois, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `soria-pois-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);

    alert('Datos exportados correctamente');
}

// Import POIs
function importPOIs(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedPOIs = JSON.parse(event.target.result);

            if (!Array.isArray(importedPOIs)) {
                throw new Error('Formato inválido');
            }

            // Validate POI structure
            const valid = importedPOIs.every(poi =>
                poi.id && poi.name && poi.category && poi.lat && poi.lng
            );

            if (!valid) {
                throw new Error('Formato de datos inválido');
            }

            // Ask user if they want to merge or replace
            const merge = confirm('¿Quieres combinar con los datos existentes?\n\nOK = Combinar\nCancelar = Reemplazar');

            if (merge) {
                // Merge: add new POIs, avoid duplicates by ID
                importedPOIs.forEach(imported => {
                    if (!pois.find(p => p.id === imported.id)) {
                        pois.push(imported);
                        addMarkerToMap(imported);
                    }
                });
            } else {
                // Replace: remove all existing markers and POIs
                markers.forEach(marker => map.removeLayer(marker));
                markers = [];
                pois = importedPOIs;
                pois.forEach(poi => addMarkerToMap(poi));
            }

            savePOIs();
            renderPOIList();

            alert(`Importados ${importedPOIs.length} puntos de interés correctamente`);
        } catch (error) {
            alert('Error al importar datos: ' + error.message);
        }
    };

    reader.readAsText(file);

    // Reset file input
    e.target.value = '';
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}
