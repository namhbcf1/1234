// Enhanced Component Compatibility Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced component compatibility module loaded');
    
    // Ensure strict compatibility between components
    function setupStrictComponentCompatibility() {
        // Get all dropdowns
        const cpuDropdown = document.getElementById('cpu');
        const mainboardDropdown = document.getElementById('mainboard');
        const ramDropdown = document.getElementById('ram');
        
        if (!cpuDropdown || !mainboardDropdown || !ramDropdown) {
            console.error('Could not find all required dropdowns');
            return;
        }
        
        // Ensure socket info is visible
        const socketInfoDiv = document.getElementById('socket-info');
        if (socketInfoDiv) {
            socketInfoDiv.style.display = 'block';
        }
        
        // Socket message div for user feedback
        const socketMessageDiv = document.getElementById('socket-message');
        
        // 1. Ensure only compatible components are shown
        console.log('Setting up strict component compatibility');
        
        // 2. Disable mainboard until CPU is selected
        mainboardDropdown.disabled = true;
        
        // 3. Disable RAM until mainboard is selected
        ramDropdown.disabled = true;
        
        // 4. Set up event listeners for enabling dropdowns
        // When CPU changes, enable mainboard and filter compatible options
        cpuDropdown.addEventListener('change', function() {
            // Clear existing socket message
            if (socketMessageDiv) {
                socketMessageDiv.textContent = '';
                socketMessageDiv.style.display = 'none';
            }
            
            if (this.value) {
                // Get CPU data
                const cpuKey = this.value;
                const cpu = window.cpuData && window.cpuData[cpuKey];
                
                if (cpu) {
                    // Get CPU socket
                    let cpuSocket = cpu.socket;
                    if (!cpuSocket && typeof window.getCPUSocketFromName === 'function') {
                        cpuSocket = window.getCPUSocketFromName(cpu.name);
                        cpu.socket = cpuSocket; // Save for future use
                    }
                    
                    if (cpuSocket) {
                        // Display socket info
                        if (socketMessageDiv) {
                            socketMessageDiv.textContent = `CPU Socket: ${cpuSocket}`;
                            socketMessageDiv.style.display = 'block';
                            socketMessageDiv.style.color = '#155724';
                            socketMessageDiv.style.backgroundColor = '#d4edda';
                            socketMessageDiv.style.border = '1px solid #c3e6cb';
                        }
                    }
                }
                
                // Enable mainboard dropdown
                mainboardDropdown.disabled = false;
                
                // Filter compatible mainboards
                if (typeof window.filterMainboardsByCpu === 'function') {
                    console.log('Filtering mainboards by CPU:', cpuKey);
                    window.filterMainboardsByCpu(cpuKey);
                } else {
                    console.warn('filterMainboardsByCpu function not found, using fallback');
                    enableAllMainboardOptions(mainboardDropdown);
                }
                
                // Reset mainboard and RAM if we change CPU
                mainboardDropdown.value = '';
                ramDropdown.value = '';
                ramDropdown.disabled = true;
            } else {
                // Disable and reset mainboard and RAM if no CPU selected
                mainboardDropdown.disabled = true;
                mainboardDropdown.value = '';
                ramDropdown.disabled = true;
                ramDropdown.value = '';
            }
            
            // Force update the config table
            if (typeof window.forceShowConfigTable === 'function') {
                window.forceShowConfigTable();
            }
        });
        
        // When mainboard changes, enable RAM and filter compatible options
        mainboardDropdown.addEventListener('change', function() {
            if (this.value) {
                // Get mainboard data
                const mainboardKey = this.value;
                const mainboard = window.mainboardData && window.mainboardData[mainboardKey];
                
                if (mainboard) {
                    // Get mainboard socket
                    let mbSocket = mainboard.socket;
                    if (!mbSocket && typeof window.getMainboardSocketFromName === 'function') {
                        mbSocket = window.getMainboardSocketFromName(mainboard.name);
                        mainboard.socket = mbSocket; // Save for future use
                    }
                    
                    // Check compatibility with selected CPU
                    const cpuKey = cpuDropdown.value;
                    const cpu = window.cpuData && window.cpuData[cpuKey];
                    
                    if (cpu && mbSocket) {
                        // Get CPU socket
                        let cpuSocket = cpu.socket;
                        if (!cpuSocket && typeof window.getCPUSocketFromName === 'function') {
                            cpuSocket = window.getCPUSocketFromName(cpu.name);
                            cpu.socket = cpuSocket; // Save for future use
                        }
                        
                        // Display compatibility info
                        if (socketMessageDiv) {
                            if (cpuSocket === mbSocket) {
                                socketMessageDiv.textContent = `Compatible: CPU Socket ${cpuSocket} matches Mainboard Socket ${mbSocket}`;
                                socketMessageDiv.style.display = 'block';
                                socketMessageDiv.style.color = '#155724';
                                socketMessageDiv.style.backgroundColor = '#d4edda';
                                socketMessageDiv.style.border = '1px solid #c3e6cb';
                            } else {
                                socketMessageDiv.textContent = `WARNING: CPU Socket ${cpuSocket} does NOT match Mainboard Socket ${mbSocket}`;
                                socketMessageDiv.style.display = 'block';
                                socketMessageDiv.style.color = '#856404';
                                socketMessageDiv.style.backgroundColor = '#fff3cd';
                                socketMessageDiv.style.border = '1px solid #ffeeba';
                            }
                        }
                    }
                }
                
                // Enable RAM dropdown
                ramDropdown.disabled = false;
                
                // Filter compatible RAM options
                if (typeof window.updateRamOptionsBasedOnMainboard === 'function') {
                    console.log('Updating RAM options based on mainboard:', mainboardKey);
                    window.updateRamOptionsBasedOnMainboard(mainboardKey);
                } else {
                    console.warn('updateRamOptionsBasedOnMainboard function not found, using fallback');
                    enableAllRamOptions(ramDropdown);
                }
            } else {
                // Disable and reset RAM if no mainboard selected
                ramDropdown.disabled = true;
                ramDropdown.value = '';
            }
            
            // Force update the config table
            if (typeof window.forceShowConfigTable === 'function') {
                window.forceShowConfigTable();
            }
        });
        
        // When RAM changes, update config table
        ramDropdown.addEventListener('change', function() {
            // Force update the config table
            if (typeof window.forceShowConfigTable === 'function') {
                window.forceShowConfigTable();
            }
        });
        
        // 5. Highlight socket info
        if (socketInfoDiv) {
            socketInfoDiv.style.border = '2px solid #4CAF50';
            socketInfoDiv.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.5)';
        }
        
        // 6. Add validation to prevent incompatible selection
        mainboardDropdown.addEventListener('focus', function() {
            if (!cpuDropdown.value) {
                // Show message to select CPU first
                alert('Vui lòng chọn CPU trước khi chọn Mainboard');
                cpuDropdown.focus();
                return false;
            }
        });
        
        ramDropdown.addEventListener('focus', function() {
            if (!mainboardDropdown.value) {
                // Show message to select mainboard first
                alert('Vui lòng chọn Mainboard trước khi chọn RAM');
                mainboardDropdown.focus();
                return false;
            }
        });
        
        // Fallback functions
        function enableAllMainboardOptions(dropdown) {
            if (!dropdown) return;
            
            // Enable all options
            for (let i = 0; i < dropdown.options.length; i++) {
                dropdown.options[i].disabled = false;
            }
        }
        
        function enableAllRamOptions(dropdown) {
            if (!dropdown) return;
            
            // Enable all options
            for (let i = 0; i < dropdown.options.length; i++) {
                dropdown.options[i].disabled = false;
            }
        }
        
        console.log('Strict component compatibility setup complete');
    }
    
    // Run initialization
    setupStrictComponentCompatibility();
});

// Add a button to update the configuration table
document.addEventListener('DOMContentLoaded', function() {
    // Create the button
    const updateButton = document.createElement('button');
    updateButton.id = 'update-config-button';
    updateButton.className = 'action-button primary-btn';
    updateButton.innerHTML = '<i class="fas fa-sync-alt"></i> Cập Nhật Bảng Cấu Hình';
    updateButton.style.marginTop = '20px';
    updateButton.style.marginBottom = '20px';
    updateButton.style.padding = '10px 20px';
    updateButton.style.backgroundColor = '#4CAF50';
    updateButton.style.color = 'white';
    updateButton.style.border = 'none';
    updateButton.style.borderRadius = '4px';
    updateButton.style.cursor = 'pointer';
    
    // Add event listener
    updateButton.addEventListener('click', function() {
        if (typeof window.forceShowConfigTable === 'function') {
            window.forceShowConfigTable();
        } else if (typeof window.updateComponentTable === 'function') {
            window.updateComponentTable();
            
            // Show the config table
            const configTable = document.getElementById('config-table');
            if (configTable) {
                configTable.style.display = 'block';
                configTable.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            console.error('Unable to update config table - functions not found');
        }
    });
    
    // Find a suitable place to insert the button
    const componentSelection = document.getElementById('component-selection');
    if (componentSelection) {
        const container = componentSelection.querySelector('.container');
        if (container) {
            // Create a div to center the button
            const buttonDiv = document.createElement('div');
            buttonDiv.style.textAlign = 'center';
            buttonDiv.appendChild(updateButton);
            
            // Insert after the components grid
            const componentsGrid = container.querySelector('.components-grid');
            if (componentsGrid) {
                componentsGrid.after(buttonDiv);
            } else {
                container.appendChild(buttonDiv);
            }
        }
    }
}); 