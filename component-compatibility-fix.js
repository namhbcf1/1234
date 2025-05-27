// Component compatibility fix
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔄 Initializing component compatibility fix');
  
  // Fix for "Unable to update config table - functions not found"
  setTimeout(function() {
    // Define the updateComponentTable function if it's missing
    if (typeof window.updateComponentTable !== 'function') {
      window.updateComponentTable = function(cpuKey, mainboardKey, vgaKey, ramKey, ssdKey, psuKey, caseKey, cpuCoolerKey) {
        console.log('Updating component table with:', {
          cpu: cpuKey,
          mainboard: mainboardKey,
          vga: vgaKey,
          ram: ramKey,
          ssd: ssdKey,
          psu: psuKey,
          case: caseKey,
          cpuCooler: cpuCoolerKey
        });
        
        // Get selected components from dropdowns if not provided
        cpuKey = cpuKey || document.getElementById('cpu')?.value;
        mainboardKey = mainboardKey || document.getElementById('mainboard')?.value;
        vgaKey = vgaKey || document.getElementById('vga')?.value;
        ramKey = ramKey || document.getElementById('ram')?.value;
        ssdKey = ssdKey || document.getElementById('ssd')?.value;
        psuKey = psuKey || document.getElementById('psu')?.value;
        caseKey = caseKey || document.getElementById('case')?.value;
        cpuCoolerKey = cpuCoolerKey || document.getElementById('cpuCooler')?.value;
        
        // Update each component cell
        updateComponentCell('cpu', cpuKey);
        updateComponentCell('mainboard', mainboardKey);
        updateComponentCell('vga', vgaKey);
        updateComponentCell('ram', ramKey);
        updateComponentCell('ssd', ssdKey);
        updateComponentCell('psu', psuKey);
        updateComponentCell('case', caseKey);
        updateComponentCell('cpucooler', cpuCoolerKey, 'cpu-cooler'); // Note the mapping difference
        
        // Update total price
        updateTotalPrice();
        
        // Show the configuration table
        const configTable = document.getElementById('config-table');
        if (configTable) {
          configTable.style.display = 'block';
        }
      };
      console.log('✅ Created updateComponentTable function');
    }
    
    // Define the updateComponentCell function if it's missing
    if (typeof window.updateComponentCell !== 'function') {
      window.updateComponentCell = function(componentType, componentKey, alternativeType) {
        console.log(`Updating component cell: ${componentType} with key ${componentKey}`);
        
        // Handle the case where cpucooler is called cpuCooler in some places
        const type = componentType.toLowerCase();
        const dataKey = type === 'cpucooler' ? 'cpuCooler' : type;
        
        // Get component data
        const componentData = window[`${dataKey}Data`] || {};
        const component = componentKey && componentData[componentKey];
        
        if (!component) {
          console.warn(`Data object not found for ${dataKey}`);
          return;
        }
        
        // Update image cell
        const imageCell = document.getElementById(`${alternativeType || type}-image`);
        if (imageCell) {
          const img = document.createElement('img');
          
          // Determine correct image path - try multiple possible paths
          if (component.image) {
            // Use explicitly defined image path first
            img.src = component.image;
          } else {
            // Try component-specific folder
            img.src = `images/${type}/${componentKey}.jpg`;
          }
          
          // Map component types to folder names for alternative paths
          const folderMap = {
            'cpu': 'cpu',
            'mainboard': 'mainboard',
            'ram': 'ram',
            'vga': 'vga',
            'ssd': 'ssd',
            'psu': 'psu',
            'case': 'case',
            'cpucooler': 'coolers',
            'cpu-cooler': 'coolers',
            'hdd': 'hdd',
            'monitor': 'monitor'
          };
          
          // Add error handler to try alternative paths if the image fails to load
          img.onerror = function() {
            const folder = folderMap[type] || type;
            const componentName = component.name || '';
            
            // Try different naming patterns
            // First try with the component name
            const cleanName = componentName.toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w\-]/g, '');
            
            if (cleanName) {
              this.src = `images/${folder}/${cleanName}.jpg`;
              
              // If that fails, try with component key again
              this.onerror = function() {
                // Try direct path with product name
                if (componentName.includes('Ryzen')) {
                  this.src = `images/amd-${cleanName}.jpg`;
                } else if (componentName.includes('Intel')) {
                  this.src = `images/intel-${cleanName}.jpg`;
                } else if (type === 'cpucooler' || type === 'cpu-cooler') {
                  // For CPU coolers, try the name directly
                  this.src = `images/coolers/${cleanName.replace('jonsbo-', '')}.jpg`;
                  
                  // Final fallback for coolers
                  this.onerror = function() {
                    // Use canvas-generated placeholder if available
                    if (window.getPlaceholder) {
                      this.src = window.getPlaceholder('cpucooler');
                    } else {
                      this.src = `images/coolers/jonsbo-cr1000.jpg`;
                    }
                    console.log(`Using fallback image for CPU cooler: ${componentName}`);
                  };
                } else {
                  // Final fallback - use a placeholder
                  if (window.getPlaceholder) {
                    this.src = window.getPlaceholder(folder);
                  } else {
                    this.src = `images/${folder}-placeholder.jpg`;
                  }
                  console.log(`Unable to find image for ${componentName}, using placeholder`);
                }
              };
            } else {
              this.src = `images/${folder}-placeholder.jpg`;
            }
          };
          
          img.alt = component.name;
          img.style.maxWidth = '100px';
          img.style.maxHeight = '60px';
          img.style.objectFit = 'contain';
          
          // Clear previous content
          imageCell.innerHTML = '';
          imageCell.appendChild(img);
        }
        
        // Update name cell
        const nameCell = document.getElementById(`${alternativeType || type}-name`);
        if (nameCell) {
          nameCell.textContent = component.name;
        }
        
        // Update price cell
        const priceCell = document.getElementById(`${alternativeType || type}-price`);
        if (priceCell) {
          priceCell.textContent = formatPrice(component.price) + ' VND';
        }
        
        // Update total cell (same as price for quantity 1)
        const totalCell = document.getElementById(`${alternativeType || type}-total`);
        if (totalCell) {
          totalCell.textContent = formatPrice(component.price) + ' VND';
        }
      };
      console.log('✅ Created updateComponentCell function');
    }
    
    // Define the updateTotalPrice function if it's missing
    if (typeof window.updateTotalPrice !== 'function' && typeof window.calculateTotalPrice !== 'function') {
      window.updateTotalPrice = function() {
        console.log('Calculating total price');
        
        let total = 0;
        
        // Get all component prices
        const components = ['cpu', 'mainboard', 'vga', 'ram', 'ssd', 'psu', 'case', 'cpu-cooler'];
        
        components.forEach(comp => {
          const priceCell = document.getElementById(`${comp}-price`);
          if (priceCell && priceCell.textContent) {
            const priceText = priceCell.textContent.replace(/[^\d]/g, '');
            const price = parseInt(priceText, 10);
            if (!isNaN(price)) {
              total += price;
            }
          }
        });
        
        // Update total price cell
        const totalPriceCell = document.getElementById('total-price-cell');
        if (totalPriceCell) {
          totalPriceCell.textContent = formatPrice(total) + ' VND';
        }
        
        // Update remaining price cell
        const remainingPriceCell = document.getElementById('remaining-price-cell');
        if (remainingPriceCell) {
          remainingPriceCell.textContent = formatPrice(total) + ' VND';
        }
        
        return total;
      };
      window.calculateTotalPrice = window.updateTotalPrice;
      console.log('✅ Created updateTotalPrice function');
    }
    
    // Define the formatPrice function if it's missing
    if (typeof window.formatPrice !== 'function') {
      window.formatPrice = function(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
      console.log('✅ Created formatPrice function');
    }
    
    console.log('✅ Component compatibility fix initialized');
  }, 1000);
}); 