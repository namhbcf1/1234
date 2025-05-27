// component-compatibility-bridge.js
// This file serves as a compatibility bridge between different JavaScript modules

document.addEventListener('DOMContentLoaded', function() {
    console.log('Component compatibility bridge initialized');
    
    // Wait for all scripts to load
    setTimeout(function() {
        // Make buildsan.js functions globally available
        if (typeof filterMainboardsByCpu === 'function') {
            window.filterMainboardsByCpu = filterMainboardsByCpu;
            console.log('✅ filterMainboardsByCpu function exposed globally');
        } else {
            console.warn('⚠️ filterMainboardsByCpu function not found');
            
            // Create fallback function
            window.filterMainboardsByCpu = function(cpuKey) {
                console.log('Using fallback filterMainboardsByCpu function');
                const mainboardDropdown = document.getElementById('mainboard');
                if (mainboardDropdown) {
                    mainboardDropdown.disabled = false;
                }
            };
            console.log('✅ Created fallback filterMainboardsByCpu function');
        }
        
        if (typeof updateRamOptionsBasedOnMainboard === 'function') {
            window.updateRamOptionsBasedOnMainboard = updateRamOptionsBasedOnMainboard;
            console.log('✅ updateRamOptionsBasedOnMainboard function exposed globally');
        } else {
            console.warn('⚠️ updateRamOptionsBasedOnMainboard function not found');
            
            // Create fallback function
            window.updateRamOptionsBasedOnMainboard = function(mainboardKey) {
                console.log('Using fallback updateRamOptionsBasedOnMainboard function');
                const ramDropdown = document.getElementById('ram');
                if (ramDropdown) {
                    ramDropdown.disabled = false;
                }
            };
            console.log('✅ Created fallback updateRamOptionsBasedOnMainboard function');
        }
        
        // Create a determineCpuMainboardCompatibility function if it doesn't exist
        if (typeof window.determineCpuMainboardCompatibility !== 'function') {
            window.determineCpuMainboardCompatibility = function(cpu, mainboard) {
                console.log('Using fallback determineCpuMainboardCompatibility function');
                // Basic socket compatibility check
                if (cpu && mainboard && cpu.socket && mainboard.socket) {
                    return cpu.socket === mainboard.socket;
                }
                // Default to allowing compatibility if we can't determine
                return true;
            };
            console.log('✅ Created fallback determineCpuMainboardCompatibility function');
        }
        
        console.log('Component compatibility bridge setup complete');
    }, 1000); // Wait 1 second for all scripts to load
}); 