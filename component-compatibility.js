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
        
        // 1. Ensure only compatible components are shown
        console.log('Setting up strict component compatibility');
        
        // 2. Disable mainboard until CPU is selected
        mainboardDropdown.disabled = true;
        
        // 3. Disable RAM until mainboard is selected
        ramDropdown.disabled = true;
        
        // 4. Set up event listeners for enabling dropdowns
        // When CPU changes, enable mainboard and filter compatible options
        cpuDropdown.addEventListener('change', function() {
            if (this.value) {
                // Don't enable directly - the filterMainboardsByCpu function will handle it
                // after filtering compatible options
                filterMainboardsByCpu(this.value);
                
                // Reset mainboard and RAM if we change CPU
                if (mainboardDropdown.value) {
                    // Check if current mainboard is compatible with new CPU
                    const cpu = window.cpuData[this.value];
                    const mainboard = window.mainboardData[mainboardDropdown.value];
                    
                    if (cpu && mainboard) {
                        const isCompatible = window.determineCpuMainboardCompatibility(cpu, mainboard);
                        if (!isCompatible) {
                            mainboardDropdown.value = '';
                            ramDropdown.value = '';
                            ramDropdown.disabled = true;
                        }
                    }
                }
            } else {
                mainboardDropdown.disabled = true;
                mainboardDropdown.value = '';
                ramDropdown.disabled = true;
                ramDropdown.value = '';
            }
        });
        
        // When mainboard changes, enable RAM and filter compatible options
        mainboardDropdown.addEventListener('change', function() {
            if (this.value) {
                // Don't enable directly - the updateRamOptionsBasedOnMainboard function will handle it
                // after filtering compatible options
                updateRamOptionsBasedOnMainboard(this.value);
                
                // Check compatibility with selected CPU
                const cpuValue = cpuDropdown ? cpuDropdown.value : null;
                if (cpuValue) {
                    checkSocketCompatibility(cpuValue, this.value);
                }
            } else {
                ramDropdown.disabled = true;
                ramDropdown.value = '';
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
        
        console.log('Strict component compatibility setup complete');
    }
    
    // Run initialization
    setupStrictComponentCompatibility();
}); 