// config-table-handler.js
// This script ensures the configuration table is visible and properly updated

document.addEventListener('DOMContentLoaded', function() {
    console.log('Config table handler initialized');
    
    // Create a button to force show the configuration table
    createShowConfigButton();
    
    // Add event listeners to all component dropdowns
    setupComponentChangeListeners();
    
    // Initialize the display after a delay
    setTimeout(function() {
        updateAndShowConfigTable();
    }, 2000);
});

// Function to create and add a button to show the config table
function createShowConfigButton() {
    // Button creation has been disabled as requested
    console.log('Show config table button has been disabled');
}

// Function to setup event listeners for component dropdowns
function setupComponentChangeListeners() {
    const componentDropdowns = document.querySelectorAll('#cpu, #mainboard, #vga, #ram, #ssd, #psu, #case, #cpuCooler, #hdd, #monitor');
    componentDropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('change', function() {
            updateAndShowConfigTable();
        });
    });
}

// Function to update and show the configuration table
function updateAndShowConfigTable() {
    // First clear any existing data in the table to avoid showing outdated information
    clearConfigTable();
    
    // Set default values for warranty and condition cells for HDD and Monitor
    setDefaultHddMonitorValues();
    
    // Get component values from dropdowns
    const cpuDropdown = document.getElementById('cpu');
    const mainboardDropdown = document.getElementById('mainboard');
    const vgaDropdown = document.getElementById('vga');
    const ramDropdown = document.getElementById('ram');
    const ssdDropdown = document.getElementById('ssd');
    const psuDropdown = document.getElementById('psu');
    const caseDropdown = document.getElementById('case');
    const cpuCoolerDropdown = document.getElementById('cpuCooler');
    const hddDropdown = document.getElementById('hdd');
    const monitorDropdown = document.getElementById('monitor');
    
    // Get the config table
    const configTable = document.getElementById('config-table');
    if (!configTable) {
        console.error('Config table not found in the DOM');
        return;
    }
    
    // Make sure the table is visible
    configTable.style.display = 'block';
    configTable.style.visibility = 'visible';
    
    // Ensure CPU cooler row exists
    if (window.ensureCpuCoolerRow) {
        window.ensureCpuCoolerRow();
    }
    
    // Update table cells for each component - only update if there's a value selected
    if (cpuDropdown && cpuDropdown.value) {
        updateComponentCell('cpu', cpuDropdown.value);
    }
    
    if (mainboardDropdown && mainboardDropdown.value) {
        updateComponentCell('mainboard', mainboardDropdown.value);
    }
    
    if (vgaDropdown && vgaDropdown.value) {
        updateComponentCell('vga', vgaDropdown.value);
    }
    
    if (ramDropdown && ramDropdown.value) {
        updateComponentCell('ram', ramDropdown.value);
    }
    
    if (ssdDropdown && ssdDropdown.value) {
        updateComponentCell('ssd', ssdDropdown.value);
    }
    
    if (psuDropdown && psuDropdown.value) {
        updateComponentCell('psu', psuDropdown.value);
    }
    
    if (caseDropdown && caseDropdown.value) {
        updateComponentCell('case', caseDropdown.value);
    }
    
    // Special handling for CPU cooler
    if (cpuCoolerDropdown && cpuCoolerDropdown.value) {
        const coolerKey = cpuCoolerDropdown.value;
        
        // First try the official data source from js/data/cpuCooler.js
        if (window.cpuCoolerData && window.cpuCoolerData[coolerKey]) {
            const cooler = window.cpuCoolerData[coolerKey];
            console.log('Found CPU cooler in official data:', cooler.name);
            
            // Update image
            const imageCell = document.getElementById('cpu-cooler-image');
            if (imageCell) {
                const img = document.createElement('img');
                img.src = cooler.image;
                img.alt = cooler.name;
                img.style.maxWidth = '100px';
                img.style.maxHeight = '60px';
                
                // Handle image loading error
                img.onerror = function() {
                    console.warn(`Failed to load CPU cooler image: ${cooler.image}`);
                    this.src = 'images/placeholder.jpg';
                };
                
                imageCell.innerHTML = '';
                imageCell.appendChild(img);
            }
            
            // Update name
            const nameCell = document.getElementById('cpu-cooler-name');
            if (nameCell) {
                nameCell.textContent = cooler.name;
            }
            
            // Update price
            const priceCell = document.getElementById('cpu-cooler-price');
            if (priceCell) {
                priceCell.textContent = formatPriceForDisplay(cooler.price);
            }
            
            // Update total
            const totalCell = document.getElementById('cpu-cooler-total');
            if (totalCell) {
                totalCell.textContent = formatPriceForDisplay(cooler.price);
            }
            
            // Update warranty
            const warrantyCell = document.getElementById('cpu-cooler-warranty');
            if (warrantyCell && cooler.warranty) {
                warrantyCell.textContent = cooler.warranty;
                console.log(`Updated CPU cooler warranty to: ${cooler.warranty}`);
            }
            
            // Update condition
            const conditionCell = document.getElementById('cpu-cooler-condition');
            if (conditionCell && cooler.condition) {
                conditionCell.textContent = cooler.condition;
                console.log(`Updated CPU cooler condition to: ${cooler.condition}`);
            }
        } else {
            console.warn(`CPU cooler not found: ${coolerKey}`);
        }
    }
    
    // Update additional components
    if (hddDropdown && hddDropdown.value) {
        updateComponentCell('additional-component', hddDropdown.value, 'hdd');
    }
    
    if (monitorDropdown && monitorDropdown.value) {
        updateComponentCell('monitor', monitorDropdown.value);
    }
    
    // Calculate and update total price
    calculateTotalPrice();
    
    // Scroll to the table
    configTable.scrollIntoView({ behavior: 'smooth' });
    
    console.log('Config table updated and displayed');
}

// Function to update a component cell in the table
function updateComponentCell(componentType, componentKey, alternativeType) {
    console.log(`Updating component cell: ${componentType} with key ${componentKey}`);
    
    // Skip empty component keys
    if (!componentKey) {
        console.log(`Empty component key for ${componentType}, skipping update`);
        return;
    }
    
    // Handle case differences and aliases
    const type = componentType.toLowerCase();
    let dataKey = type;
    
    // Special handling for CPU cooler which has naming inconsistencies
    if (type === 'cpucooler' || type === 'cpu-cooler') {
        dataKey = 'cpuCooler';
    }
    
    // Get component data - try to use the official data from js/data directory
    let componentData = null;
    
    // Try getting data from global objects (populated from js/data)
    if (window[`${dataKey}Data`]) {
        componentData = window[`${dataKey}Data`];
    }
    
    // If no data is found for cpuCooler, try specific sources
    if (!componentData && dataKey === 'cpuCooler') {
        // Try window.cpuCoolerData which might have been loaded directly
        if (window.cpuCoolerData) {
            componentData = window.cpuCoolerData;
            console.log('Using direct global cpuCoolerData:', Object.keys(componentData).length, 'items');
        }
    }
    
    // If still no data, log error and return
    if (!componentData) {
        console.warn(`Data object not found for ${dataKey}`);
        return;
    }
    
    // Get the component from the data
    const component = componentData[componentKey];
    if (!component) {
        console.warn(`Component ${componentKey} not found in ${dataKey} data`);
        return;
    }
    
    // Format cell ID - handle special cases
    let cellId = type;
    if (alternativeType) {
        cellId = alternativeType;
    } else if (type === 'cpucooler') {
        cellId = 'cpu-cooler';
    }
    
    console.log(`Found ${dataKey} component:`, component.name);
    
    // Update image cell
    const imageCell = document.getElementById(`${cellId}-image`);
    if (imageCell) {
        const img = document.createElement('img');
        
        // Determine image path - use the image property from data if available
        if (component.image) {
            img.src = component.image;
        } else {
            // Construct fallback path based on type
            const typePath = {
                'cpu': 'cpu',
                'mainboard': 'mainboard',
                'ram': 'ram',
                'vga': 'vga',
                'ssd': 'ssd',
                'psu': 'psu',
                'case': 'case',
                'cpucooler': 'coolers',
                'cpu-cooler': 'coolers'
            }[type] || type;
            
            // Try using component key as filename
            img.src = `images/${typePath}/${componentKey}.jpg`;
        }
        
        // Error handler for images
        img.onerror = function() {
            console.warn(`Failed to load image for ${componentType}: ${componentKey} (${this.src})`);
            
            // Try a generic placeholder
            this.src = 'images/placeholder.jpg';
            
            // Handle error for placeholder
            this.onerror = function() {
                this.style.display = 'none';
                console.error('Failed to load placeholder image');
            };
        };
        
        img.alt = component.name;
        img.style.maxWidth = '100px';
        img.style.maxHeight = '60px';
        img.style.objectFit = 'contain';
        
        // Clear and add the image
        imageCell.innerHTML = '';
        imageCell.appendChild(img);
    } else {
        console.warn(`Image cell not found for ${cellId}-image`);
    }
    
    // Update name cell
    const nameCell = document.getElementById(`${cellId}-name`);
    if (nameCell) {
        nameCell.textContent = component.name;
    } else {
        console.warn(`Name cell not found for ${cellId}-name`);
    }
    
    // Update price cell
    const priceCell = document.getElementById(`${cellId}-price`);
    if (priceCell) {
        priceCell.textContent = formatPriceForDisplay(component.price);
    }
    
    // Update total cell
    const totalCell = document.getElementById(`${cellId}-total`);
    if (totalCell) {
        totalCell.textContent = formatPriceForDisplay(component.price);
    }
    
    // Update warranty cell - Use exact warranty from component data
    const warrantyCell = document.getElementById(`${cellId}-warranty`);
    if (warrantyCell) {
        if (component.warranty) {
            warrantyCell.textContent = component.warranty;
            console.log(`Updated warranty for ${cellId} to: ${component.warranty}`);
        } else {
            warrantyCell.textContent = '';
            console.warn(`No warranty data found for ${componentKey}`);
        }
    } else {
        console.warn(`Warranty cell not found for ${cellId}-warranty`);
    }
    
    // Update condition/status cell
    const conditionCell = document.getElementById(`${cellId}-condition`);
    if (conditionCell) {
        if (component.condition) {
            conditionCell.textContent = component.condition;
            console.log(`Updated condition for ${cellId} to: ${component.condition}`);
        } else {
            conditionCell.textContent = '';
            console.warn(`No condition data found for ${componentKey}`);
        }
    } else {
        console.warn(`Condition cell not found for ${cellId}-condition`);
    }
}

// Helper function to get icon class for component type
function getIconClassForComponent(componentType) {
    switch (componentType) {
        case 'cpu': return 'fas fa-microchip';
        case 'mainboard': return 'fas fa-server';
        case 'vga': return 'fas fa-tv';
        case 'ram': return 'fas fa-memory';
        case 'ssd': return 'fas fa-hdd';
        case 'psu': return 'fas fa-bolt';
        case 'case': return 'fas fa-cube';
        case 'cpu-cooler': return 'fas fa-wind';
        case 'hdd': return 'fas fa-hdd';
        case 'monitor': return 'fas fa-desktop';
        case 'additional-component': return 'fas fa-hdd';
        default: return 'fas fa-microchip';
    }
}

// Helper function to format price with commas
function formatPrice(price) {
    try {
        // Format price with commas and remove trailing zeros if needed
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedPrice;
    } catch (error) {
        console.error('Error formatting price:', error);
        return price.toString();
    }
}

// Format price for display in the table
function formatPriceForDisplay(price) {
    const formattedPrice = formatPrice(price);
    return formattedPrice + ' VND';
}

// Calculate total price of all components
function calculateTotalPrice() {
    try {
        let totalPrice = 0;
        
        // Get prices from all price cells
        const priceCells = document.querySelectorAll('[id$="-price"]');
        priceCells.forEach(cell => {
            if (cell && cell.textContent) {
                // Extract numeric value from price text
                const priceText = cell.textContent;
                const priceMatch = priceText.match(/(\d{1,3}(,\d{3})*)/);
                if (priceMatch) {
                    const price = parseInt(priceMatch[1].replace(/,/g, ''));
                    if (!isNaN(price)) {
                        totalPrice += price;
                    }
                }
            }
        });
        
        // Update total price cell
        const totalPriceCell = document.getElementById('total-price-cell');
        if (totalPriceCell) {
            totalPriceCell.textContent = formatPriceForDisplay(totalPrice);
        }
        
        // Update remaining price cell (same as total for now)
        const remainingPriceCell = document.getElementById('remaining-price-cell');
        if (remainingPriceCell) {
            remainingPriceCell.textContent = formatPriceForDisplay(totalPrice);
        }
        
        console.log(`Total price calculated: ${formatPrice(totalPrice)} VND`);
    } catch (error) {
        console.error('Error calculating total price:', error);
    }
}

function updateComponentTable(cpuKey, mainboardKey, vgaKey, ramKey, ssdKey, psuKey, caseKey, cpuCoolerKey) {
    console.log('Updating component table with selected components:');
    console.log({cpuKey, mainboardKey, vgaKey, ramKey, ssdKey, psuKey, caseKey, cpuCoolerKey});
    
    try {
        // Update each component cell
        updateComponentCell('cpu', cpuKey);
        updateComponentCell('mainboard', mainboardKey);
        updateComponentCell('vga', vgaKey);
        updateComponentCell('ram', ramKey);
        updateComponentCell('ssd', ssdKey);
        updateComponentCell('psu', psuKey);
        updateComponentCell('case', caseKey);
        
        // Special handling for CPU cooler
        if (cpuCoolerKey && window.cpuCoolerData && window.cpuCoolerData[cpuCoolerKey]) {
            const cooler = window.cpuCoolerData[cpuCoolerKey];
            console.log('Found CPU cooler:', cooler.name);
            
            // Update image
            const imageCell = document.getElementById('cpu-cooler-image');
            if (imageCell) {
                const img = document.createElement('img');
                img.src = cooler.image || `images/coolers/${cpuCoolerKey}.jpg`;
                img.alt = cooler.name;
                img.style.maxWidth = '100px';
                img.style.maxHeight = '60px';
                img.onerror = function() {
                    this.src = 'images/coolers/cr-1000.jpg';
                };
                
                imageCell.innerHTML = '';
                imageCell.appendChild(img);
            }
            
            // Update name
            const nameCell = document.getElementById('cpu-cooler-name');
            if (nameCell) {
                nameCell.textContent = cooler.name;
            }
            
            // Update price
            const priceCell = document.getElementById('cpu-cooler-price');
            if (priceCell) {
                priceCell.textContent = formatPriceForDisplay(cooler.price);
            }
            
            // Update total
            const totalCell = document.getElementById('cpu-cooler-total');
            if (totalCell) {
                totalCell.textContent = formatPriceForDisplay(cooler.price);
            }
        } else {
            console.warn(`CPU cooler ${cpuCoolerKey} not found in data:`, window.cpuCoolerData);
        }
        
        // Calculate and update total price
        calculateTotalPrice();
        
        // Show the configuration table
        const configTable = document.getElementById('config-table');
        if (configTable) {
            configTable.style.display = 'block';
        }
    } catch (error) {
        console.error('Error updating component table:', error);
    }
}

// Function to clear the configuration table data (keeping structure)
function clearConfigTable() {
    // List of component types
    const componentTypes = ['cpu', 'mainboard', 'vga', 'ram', 'ssd', 'psu', 'case', 'cpu-cooler', 'hdd', 'monitor'];
    
    // List of cell types to clear
    const cellTypes = ['name', 'price', 'total', 'warranty', 'condition'];
    
    // Clear each cell
    componentTypes.forEach(componentType => {
        cellTypes.forEach(cellType => {
            const cell = document.getElementById(`${componentType}-${cellType}`);
            if (cell) {
                cell.textContent = '';
            }
        });
        
        // Clear images
        const imageCell = document.getElementById(`${componentType}-image`);
        if (imageCell) {
            imageCell.innerHTML = '';
        }
    });
    
    console.log('Configuration table cleared');
}

// Set default values for HDD and Monitor warranty and condition
function setDefaultHddMonitorValues() {
    // Default values for HDD
    const hddWarrantyCell = document.getElementById('additional-component-warranty');
    const hddConditionCell = document.getElementById('additional-component-condition');
    
    if (hddWarrantyCell && !hddWarrantyCell.textContent) {
        hddWarrantyCell.textContent = '12T';
    }
    
    if (hddConditionCell && !hddConditionCell.textContent) {
        hddConditionCell.textContent = 'NEW';
    }
    
    // Default values for Monitor
    const monitorWarrantyCell = document.getElementById('monitor-warranty');
    const monitorConditionCell = document.getElementById('monitor-condition');
    
    if (monitorWarrantyCell && !monitorWarrantyCell.textContent) {
        monitorWarrantyCell.textContent = '36T';
    }
    
    if (monitorConditionCell && !monitorConditionCell.textContent) {
        monitorConditionCell.textContent = 'NEW';
    }
} 