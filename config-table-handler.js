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
    const button = document.createElement('button');
    button.id = 'show-config-table-button';
    button.className = 'action-button primary-btn';
    button.innerHTML = '<i class="fas fa-table"></i> Hiển Thị Bảng Cấu Hình';
    button.style.marginTop = '20px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#e53935';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';
    button.style.fontWeight = 'bold';
    
    // Add event listener
    button.addEventListener('click', function() {
        updateAndShowConfigTable();
    });
    
    // Add the button to the page
    const componentSelection = document.getElementById('component-selection');
    if (componentSelection) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.textAlign = 'center';
        buttonContainer.style.margin = '20px 0';
        buttonContainer.appendChild(button);
        
        // Add after component selection section
        componentSelection.parentNode.insertBefore(buttonContainer, componentSelection.nextSibling);
    } else {
        // If component selection section not found, add to body
        const container = document.querySelector('.container');
        if (container) {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.textAlign = 'center';
            buttonContainer.style.margin = '20px 0';
            buttonContainer.appendChild(button);
            container.appendChild(buttonContainer);
        }
    }
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
    
    // Update table cells for each component
    updateComponentCell('cpu', cpuDropdown ? cpuDropdown.value : '');
    updateComponentCell('mainboard', mainboardDropdown ? mainboardDropdown.value : '');
    updateComponentCell('vga', vgaDropdown ? vgaDropdown.value : '');
    updateComponentCell('ram', ramDropdown ? ramDropdown.value : '');
    updateComponentCell('ssd', ssdDropdown ? ssdDropdown.value : '');
    updateComponentCell('cpu-cooler', cpuCoolerDropdown ? cpuCoolerDropdown.value : '');
    updateComponentCell('psu', psuDropdown ? psuDropdown.value : '');
    updateComponentCell('case', caseDropdown ? caseDropdown.value : '');
    
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
    // Skip if no component selected
    if (!componentKey) return;
    
    // Get component data
    const dataType = alternativeType || componentType.replace('-', '');
    const dataObj = window[`${dataType}Data`];
    if (!dataObj) {
        console.warn(`Data object not found for ${dataType}`);
        return;
    }
    
    const component = dataObj[componentKey];
    if (!component) {
        console.warn(`Component not found for key ${componentKey} in ${dataType}Data`);
        return;
    }
    
    // Update name cell
    const nameCell = document.getElementById(`${componentType}-name`);
    if (nameCell) {
        nameCell.textContent = component.name;
    }
    
    // Update price cell
    const priceCell = document.getElementById(`${componentType}-price`);
    if (priceCell) {
        priceCell.textContent = formatPrice(component.price) + ' VNĐ';
    }
    
    // Update total cell (price is the same as price for single quantity)
    const totalCell = document.getElementById(`${componentType}-total`);
    if (totalCell) {
        totalCell.textContent = formatPrice(component.price) + ' VNĐ';
    }
    
    // Update image cell with icon
    const imageCell = document.getElementById(`${componentType}-image`);
    if (imageCell) {
        // Use Font Awesome icon
        const iconClass = getIconClassForComponent(componentType);
        imageCell.innerHTML = `<i class="${iconClass}" style="font-size: 32px; color: #0053b4;"></i>`;
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
            totalPriceCell.textContent = formatPrice(totalPrice) + ' VNĐ';
        }
        
        // Update remaining price cell (same as total for now)
        const remainingPriceCell = document.getElementById('remaining-price-cell');
        if (remainingPriceCell) {
            remainingPriceCell.textContent = formatPrice(totalPrice) + ' VNĐ';
        }
        
        console.log(`Total price calculated: ${formatPrice(totalPrice)} VNĐ`);
    } catch (error) {
        console.error('Error calculating total price:', error);
    }
}

// Helper function to format price with commas
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 