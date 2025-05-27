// Global adapter for buildsan.js functions
// This file loads after buildsan.js module and makes the functions globally available

document.addEventListener('DOMContentLoaded', function() {
  // Wait for window.cpuData and other data to be available
  const checkDataInterval = setInterval(function() {
    if (window.cpuData && window.mainboardData && window.ramData) {
      clearInterval(checkDataInterval);
      console.log('✅ Component data detected, initializing compatibility functions');

      // Export the compatibility functions globally if they're defined in the module
      if (typeof window.filterMainboardsByCpu !== 'function') {
        window.filterMainboardsByCpu = function(cpuKey) {
          console.log(`Filtering mainboards for CPU: ${cpuKey}`);
          if (!cpuKey || !window.cpuData[cpuKey]) return;
          
          const cpu = window.cpuData[cpuKey];
          const cpuSocket = cpu.socket || getCPUSocketFromName(cpu.name);
          
          // Filter and populate mainboard dropdown
          const mainboardDropdown = document.getElementById('mainboard');
          if (!mainboardDropdown) return;
          
          // Clear existing options except the first placeholder
          while (mainboardDropdown.options.length > 1) {
            mainboardDropdown.remove(1);
          }
          
          // Add compatible mainboards
          for (const mainboardKey in window.mainboardData) {
            const mainboard = window.mainboardData[mainboardKey];
            const mbSocket = mainboard.socket || getMainboardSocketFromName(mainboard.name);
            
            // Check compatibility
            if (mbSocket === cpuSocket || (Array.isArray(mainboard.sockets) && mainboard.sockets.includes(cpuSocket))) {
              const option = document.createElement('option');
              option.value = mainboardKey;
              option.text = `${mainboard.name} - ${formatPrice(mainboard.price)} VNĐ`;
              mainboardDropdown.add(option);
            }
          }
          
          console.log(`Added ${mainboardDropdown.options.length - 1} compatible mainboards for ${cpuSocket}`);
        };
        console.log('✅ Created global filterMainboardsByCpu function');
      }
      
      if (typeof window.updateRamOptionsBasedOnMainboard !== 'function') {
        window.updateRamOptionsBasedOnMainboard = function(mainboardKey) {
          console.log(`Updating RAM options for mainboard: ${mainboardKey}`);
          if (!mainboardKey || !window.mainboardData[mainboardKey]) return;
          
          const mainboard = window.mainboardData[mainboardKey];
          const ramDropdown = document.getElementById('ram');
          if (!ramDropdown) return;
          
          // Determine memory type from mainboard
          let memoryType = mainboard.memoryType;
          if (!memoryType) {
            // Guess based on socket
            if (mainboard.socket === 'AM5') {
              memoryType = 'DDR5';
            } else if (mainboard.socket === 'AM4') {
              memoryType = 'DDR4';
            } else if (mainboard.socket === 'LGA1700') {
              memoryType = mainboard.name.includes('DDR4') ? 'DDR4' : 'DDR5';
            } else if (['LGA1151', 'LGA1200'].includes(mainboard.socket)) {
              memoryType = 'DDR4';
            } else if (['LGA1155', 'LGA1150'].includes(mainboard.socket)) {
              memoryType = 'DDR3';
            } else if (mainboard.name.includes('DDR5')) {
              memoryType = 'DDR5';
            } else if (mainboard.name.includes('DDR4')) {
              memoryType = 'DDR4';
            } else if (mainboard.name.includes('DDR3')) {
              memoryType = 'DDR3';
            } else {
              memoryType = 'DDR4'; // Default
            }
          }
          
          // Update socket info with memory type
          const socketInfoDiv = document.getElementById('socket-info');
          if (socketInfoDiv) {
            socketInfoDiv.innerHTML = `Socket: <strong>${mainboard.socket || 'Unknown'}</strong> | Memory Type: <strong>${memoryType}</strong>`;
          }
          
          // Reset RAM dropdown
          while (ramDropdown.options.length > 0) {
            ramDropdown.remove(0);
          }
          
          // Add placeholder option
          const placeholderOption = document.createElement('option');
          placeholderOption.value = '';
          placeholderOption.text = 'Chọn RAM';
          placeholderOption.disabled = true;
          placeholderOption.selected = true;
          ramDropdown.add(placeholderOption);
          
          // Add compatible RAM options
          let compatibleCount = 0;
          for (const ramKey in window.ramData) {
            const ram = window.ramData[ramKey];
            
            // Determine RAM type
            let ramType = ram.type;
            if (!ramType) {
              if (ram.name.includes('DDR5') || ram.name.includes('Bus 6000')) {
                ramType = 'DDR5';
              } else if (ram.name.includes('DDR4') || ram.name.includes('Bus 3200')) {
                ramType = 'DDR4';
              } else if (ram.name.includes('DDR3')) {
                ramType = 'DDR3';
              } else {
                ramType = 'DDR4'; // Default
              }
            }
            
            // Add if compatible
            if (ramType === memoryType) {
              const option = document.createElement('option');
              option.value = ramKey;
              option.text = `${ram.name} - ${formatPrice(ram.price)} VNĐ`;
              ramDropdown.add(option);
              compatibleCount++;
            }
          }
          
          console.log(`Added ${compatibleCount} compatible ${memoryType} RAM options`);
          ramDropdown.disabled = false;
        };
        console.log('✅ Created global updateRamOptionsBasedOnMainboard function');
      }

      // Helper functions
      if (typeof window.formatPrice !== 'function') {
        window.formatPrice = function(price) {
          return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
      }
      
      if (typeof window.getCPUSocketFromName !== 'function') {
        window.getCPUSocketFromName = function(name) {
          if (!name) return '';
          
          // Extract socket from CPU name
          if (name.includes('AM4')) return 'AM4';
          if (name.includes('AM5')) return 'AM5';
          if (name.includes('LGA1700')) return 'LGA1700';
          if (name.includes('LGA1200')) return 'LGA1200';
          if (name.includes('LGA1151')) return 'LGA1151';
          if (name.includes('LGA1150')) return 'LGA1150';
          if (name.includes('LGA1155')) return 'LGA1155';
          
          // Check for CPU series to determine socket
          if (name.includes('Ryzen')) {
            if (name.includes('5000') || name.includes('3000')) return 'AM4';
            if (name.includes('7000') || name.includes('9000')) return 'AM5';
          }
          
          if (name.includes('Core i')) {
            if (name.includes('12th') || name.includes('13th') || name.includes('14th')) {
              return 'LGA1700';
            }
            if (name.includes('10th') || name.includes('11th')) {
              return 'LGA1200';
            }
            if (name.includes('8th') || name.includes('9th')) {
              return 'LGA1151';
            }
          }
          
          return '';
        };
      }
      
      if (typeof window.getMainboardSocketFromName !== 'function') {
        window.getMainboardSocketFromName = function(name) {
          if (!name) return '';
          
          // Extract socket from mainboard name
          if (name.includes('AM4')) return 'AM4';
          if (name.includes('AM5')) return 'AM5';
          if (name.includes('LGA1700')) return 'LGA1700';
          if (name.includes('LGA1200')) return 'LGA1200';
          if (name.includes('LGA1151')) return 'LGA1151';
          if (name.includes('LGA1150')) return 'LGA1150';
          if (name.includes('LGA1155')) return 'LGA1155';
          
          // Check for mainboard chipsets to determine socket
          if (name.includes('B550') || name.includes('X570')) return 'AM4';
          if (name.includes('B650') || name.includes('X670')) return 'AM5';
          if (name.includes('Z690') || name.includes('B660') || name.includes('H610')) return 'LGA1700';
          if (name.includes('Z590') || name.includes('B560') || name.includes('H510')) return 'LGA1200';
          if (name.includes('Z390') || name.includes('B360') || name.includes('H310')) return 'LGA1151';
          
          return '';
        };
      }
      
      console.log('✅ All component compatibility functions initialized');
      
      // Add a function to manually force update the component table
      window.forceUpdateComponentTable = function() {
        console.log('Force updating component table with all selected components');
        
        // Get all selected components
        const cpuKey = document.getElementById('cpu')?.value;
        const mainboardKey = document.getElementById('mainboard')?.value;
        const vgaKey = document.getElementById('vga')?.value;
        const ramKey = document.getElementById('ram')?.value;
        const ssdKey = document.getElementById('ssd')?.value;
        const psuKey = document.getElementById('psu')?.value;
        const caseKey = document.getElementById('case')?.value;
        const cpuCoolerKey = document.getElementById('cpuCooler')?.value;
        
        // Make sure updateComponentTable is defined
        if (typeof window.updateComponentTable === 'function') {
          window.updateComponentTable(cpuKey, mainboardKey, vgaKey, ramKey, ssdKey, psuKey, caseKey, cpuCoolerKey);
        } else {
          console.error('updateComponentTable function not found');
        }
        
        // Also directly update CPU cooler cell
        if (cpuCoolerKey && window.cpuCoolerData) {
          const cooler = window.cpuCoolerData[cpuCoolerKey];
          if (cooler) {
            // Update image cell
            const imageCell = document.getElementById('cpu-cooler-image');
            if (imageCell) {
              const img = document.createElement('img');
              
              // Try to use the image from the data first
              if (cooler.image) {
                img.src = cooler.image;
              } else {
                // Try with component-specific folder
                img.src = `images/coolers/${cpuCoolerKey}.jpg`;
              }
              
              // Add error handler
              img.onerror = function() {
                if (cooler.name) {
                  const cleanName = cooler.name.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]/g, '');
                  
                  this.src = `images/coolers/${cleanName}.jpg`;
                  
                  // Final fallback
                  this.onerror = function() {
                    // Try to find any CPU cooler image that exists
                    this.src = 'images/coolers/cr-1000.jpg';
                    
                    // If that fails, use a placeholder
                    this.onerror = function() {
                      if (window.getPlaceholder) {
                        this.src = window.getPlaceholder('cpucooler');
                      } else {
                        console.warn('Failed to load CPU cooler image');
                      }
                    };
                  };
                }
              };
              
              img.alt = cooler.name;
              img.style.maxWidth = '100px';
              img.style.maxHeight = '60px';
              img.style.objectFit = 'contain';
              
              // Clear and add the image
              imageCell.innerHTML = '';
              imageCell.appendChild(img);
            }
            
            // Update name cell
            const nameCell = document.getElementById('cpu-cooler-name');
            if (nameCell) {
              nameCell.textContent = cooler.name;
            }
            
            // Update price cell
            const priceCell = document.getElementById('cpu-cooler-price');
            if (priceCell) {
              priceCell.textContent = window.formatPrice(cooler.price) + ' VND';
            }
            
            // Update total cell
            const totalCell = document.getElementById('cpu-cooler-total');
            if (totalCell) {
              totalCell.textContent = window.formatPrice(cooler.price) + ' VND';
            }
          }
        }
        
        // Ensure the configuration table is visible
        const configTable = document.getElementById('config-table');
        if (configTable) {
          configTable.style.display = 'block';
          configTable.style.visibility = 'visible';
          configTable.style.opacity = '1';
        }
      };
      
      // Set up an event listener to force update when the configuration button is clicked
      document.querySelectorAll('[id$="nhật-bảng-cấu-hình"], button').forEach(button => {
        if (button.textContent.includes('Cập nhật')) {
          button.addEventListener('click', function() {
            // Wait a moment for other handlers to complete
            setTimeout(() => window.forceUpdateComponentTable(), 500);
          });
        }
      });
      
      // Run once to ensure the table is properly filled on initial load
      setTimeout(() => {
        if (window.forceUpdateComponentTable) {
          window.forceUpdateComponentTable();
        }
      }, 2000);

      // Load the official CPU cooler data from js/data/cpuCooler.js
      fetch('js/data/cpuCooler.js')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch CPU cooler data: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          try {
            // Extract the data object from the module
            const dataText = data.replace('export const cpuCoolerData =', 'window.cpuCoolerData =');
            // Create a script element to evaluate the code
            const script = document.createElement('script');
            script.textContent = dataText;
            document.head.appendChild(script);
            console.log('✅ CPU cooler data loaded from js/data/cpuCooler.js:', Object.keys(window.cpuCoolerData).length, 'items');
          } catch (error) {
            console.error('Error processing CPU cooler data:', error);
          }
        })
        .catch(error => {
          console.error('Error loading CPU cooler data:', error);
        });
      
      // Ensure the CPU cooler row exists in the configuration table
      window.ensureCpuCoolerRow = function() {
        console.log('Ensuring CPU cooler row exists in the configuration table');
        
        // Find the configuration table body
        const configTable = document.getElementById('config-table');
        if (!configTable) {
          console.warn('Configuration table not found');
          return;
        }
        
        // Find the table body
        const tableBody = configTable.querySelector('tbody');
        if (!tableBody) {
          console.warn('Table body not found in configuration table');
          return;
        }
        
        // Check if the CPU cooler row already exists
        let cpuCoolerRow = null;
        const rows = tableBody.querySelectorAll('tr');
        for (const row of rows) {
          if (row.querySelector('#cpu-cooler-image') || 
              row.querySelector('#cpu-cooler-name') || 
              row.querySelector('#cpucooler-image') || 
              row.querySelector('#cpuCooler-image')) {
            cpuCoolerRow = row;
            break;
          }
        }
        
        // If the row doesn't exist, create it
        if (!cpuCoolerRow) {
          console.log('CPU cooler row not found, creating it');
          
          // Create a new row
          cpuCoolerRow = document.createElement('tr');
          
          // Create the cells
          const indexCell = document.createElement('td');
          indexCell.style.padding = '10px';
          indexCell.style.textAlign = 'center';
          indexCell.style.border = '1px solid #ddd';
          indexCell.textContent = '7'; // Adjust as needed
          
          const imageCell = document.createElement('td');
          imageCell.id = 'cpu-cooler-image';
          imageCell.style.padding = '10px';
          imageCell.style.textAlign = 'center';
          imageCell.style.border = '1px solid #ddd';
          
          const nameCell = document.createElement('td');
          nameCell.id = 'cpu-cooler-name';
          nameCell.style.padding = '10px';
          nameCell.style.border = '1px solid #ddd';
          
          const unitCell = document.createElement('td');
          unitCell.style.padding = '10px';
          unitCell.style.textAlign = 'center';
          unitCell.style.border = '1px solid #ddd';
          unitCell.textContent = 'Chiếc';
          
          const quantityCell = document.createElement('td');
          quantityCell.style.padding = '10px';
          quantityCell.style.textAlign = 'center';
          quantityCell.style.border = '1px solid #ddd';
          quantityCell.textContent = '1';
          
          const priceCell = document.createElement('td');
          priceCell.id = 'cpu-cooler-price';
          priceCell.style.padding = '10px';
          priceCell.style.textAlign = 'right';
          priceCell.style.border = '1px solid #ddd';
          
          const totalCell = document.createElement('td');
          totalCell.id = 'cpu-cooler-total';
          totalCell.style.padding = '10px';
          totalCell.style.textAlign = 'right';
          totalCell.style.border = '1px solid #ddd';
          
          const warrantyCell = document.createElement('td');
          warrantyCell.style.padding = '10px';
          warrantyCell.style.textAlign = 'center';
          warrantyCell.style.border = '1px solid #ddd';
          warrantyCell.textContent = '12T';
          
          const statusCell = document.createElement('td');
          statusCell.style.padding = '10px';
          statusCell.style.textAlign = 'center';
          statusCell.style.border = '1px solid #ddd';
          statusCell.textContent = 'NEW';
          
          // Add cells to the row
          cpuCoolerRow.appendChild(indexCell);
          cpuCoolerRow.appendChild(imageCell);
          cpuCoolerRow.appendChild(nameCell);
          cpuCoolerRow.appendChild(unitCell);
          cpuCoolerRow.appendChild(quantityCell);
          cpuCoolerRow.appendChild(priceCell);
          cpuCoolerRow.appendChild(totalCell);
          cpuCoolerRow.appendChild(warrantyCell);
          cpuCoolerRow.appendChild(statusCell);
          
          // Add the row to the table
          // Find the 6th row (PSU or case) and insert after it
          if (rows.length >= 6) {
            tableBody.insertBefore(cpuCoolerRow, rows[6].nextSibling);
          } else {
            tableBody.appendChild(cpuCoolerRow);
          }
          
          console.log('CPU cooler row added to configuration table');
        } else {
          console.log('CPU cooler row already exists');
        }
        
        // Return the row
        return cpuCoolerRow;
      };
      
      // Call the function to ensure the row exists
      setTimeout(window.ensureCpuCoolerRow, 1500);
    }
  }, 500);
}); 