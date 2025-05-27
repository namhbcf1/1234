/**
 * TRUONG PHAT COMPUTER - Modern UI Enhancements
 * This file adds modern UI interactions, animations, and smart features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modern UI enhancements
    initModernUI();
    
    // Initialize config table buttons
    initConfigTableButtons();
});

function initModernUI() {
    // Add animation classes to elements
    animateElements();
    
    // Initialize dark mode
    initDarkMode();
    
    // Initialize smart step progress
    initProgressSteps();
    
    // Initialize floating effects
    initFloatingEffects();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize budget slider enhanced behavior
    initBudgetSlider();
    
    // Initialize game selection enhancements
    initGameSelection();
    
    // Initialize component selection enhancements
    initComponentSelection();
    
    // Add visual feedback on interactions
    initVisualFeedback();
    
    // Initialize CPU-based theme
    initCpuTheme();
    
    // Fix configuration table display
    fixConfigTableDisplay();
}

// Add animation classes to elements for entrance animations
function animateElements() {
    const animationElements = [
        { selector: '.selection-section', animation: 'slideUp', delay: 0.1 },
        { selector: '.build-progress', animation: 'fadeIn', delay: 0.2 },
        { selector: '.game-card', animation: 'fadeIn', delay: 0.05, staggered: true },
        { selector: '.brand-option', animation: 'fadeIn', delay: 0.1, staggered: true },
        { selector: '.component', animation: 'slideUp', delay: 0.08, staggered: true },
        { selector: '.action-button', animation: 'fadeIn', delay: 0.2 },
        { selector: '.total-price', animation: 'slideUp', delay: 0.3 }
    ];
    
    animationElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        
        elements.forEach((el, index) => {
            // Add animation class
            el.classList.add(`animate__${item.animation}`);
            
            // Add animation delay (staggered or uniform)
            const delay = item.staggered ? (index * item.delay) : item.delay;
            el.style.animationDelay = `${delay}s`;
            
            // Make sure animations only play once on page load
            el.style.animationFillMode = 'backwards';
        });
    });
}

// Initialize dark mode functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeSetting = localStorage.getItem('darkMode');
    
    // Check for saved dark mode preference
    if (darkModeSetting === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Add dark mode toggle functionality
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
}

// Initialize progress steps functionality
function initProgressSteps() {
    const steps = document.querySelectorAll('.progress-step');
    
    if (steps.length === 0) return;
    
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Get the associated section
            const stepNumber = this.getAttribute('data-step');
            let targetSection;
            
            switch(stepNumber) {
                case '1':
                    targetSection = document.getElementById('budget-range-selection');
                    break;
                case '2':
                    targetSection = document.getElementById('cpu-type-selection');
                    break;
                case '3':
                    targetSection = document.getElementById('game-selection');
                    break;
                case '4':
                    targetSection = document.getElementById('component-selection');
                    break;
                case '5':
                    targetSection = document.getElementById('selected-components');
                    break;
            }
            
            if (targetSection) {
                // Scroll to the section
                targetSection.scrollIntoView({behavior: 'smooth'});
                
                // Update active step
                steps.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                
                // Mark previous steps as completed
                for (let i = 0; i < index; i++) {
                    steps[i].classList.add('completed');
                }
            }
        });
    });
    
    // Automatically update progress based on scroll position
    window.addEventListener('scroll', function() {
        const sections = [
            document.getElementById('budget-range-selection'),
            document.getElementById('cpu-type-selection'),
            document.getElementById('game-selection'),
            document.getElementById('component-selection'),
            document.getElementById('selected-components')
        ].filter(Boolean);
        
        if (sections.length === 0) return;
        
        // Find the current section
        let currentSectionIndex = 0;
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach((section, index) => {
            if (section.offsetTop <= scrollPosition) {
                currentSectionIndex = index;
            }
        });
        
        // Update the progress steps
        steps.forEach((step, index) => {
            if (index <= currentSectionIndex) {
                step.classList.add('active');
                if (index < currentSectionIndex) {
                    step.classList.add('completed');
                }
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    });
}

// Initialize floating effects for logos and icons
function initFloatingEffects() {
    const floatingElements = [
        '.logo i',
        '.section-header i'
    ];
    
    floatingElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((el, index) => {
            el.style.animation = `float ${2 + (index % 3) * 0.5}s ease-in-out infinite`;
            el.style.animationDelay = `${index * 0.2}s`;
        });
    });
}

// Initialize hover effects for interactive elements
function initHoverEffects() {
    const hoverElements = [
        '.game-card',
        '.brand-option',
        '.component-card',
        '.action-button',
        '.contact-button',
        'a[href*="zalo"]',
        'a[href*="tel:"]',
        'a[href*="facebook"]'
    ];
    
    hoverElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
            });
            
            el.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    });
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('to-top-button');
    
    if (!backToTopButton) {
        // Create back to top button if it doesn't exist
        const button = document.createElement('div');
        button.id = 'to-top-button';
        button.className = 'to-top-button';
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(button);
    }
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        const backToTopButton = document.getElementById('to-top-button');
        if (backToTopButton) {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    });
    
    // Add click event to back to top button
    document.addEventListener('click', function(e) {
        if (e.target.closest('#to-top-button')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// Initialize tooltips for information elements
function initTooltips() {
    const tooltipElements = [
        { selector: '.compatibility-icon', text: 'Tính tương thích với các linh kiện khác' },
        { selector: '.component-header h3', text: 'Chọn linh kiện từ danh sách' },
        { selector: '#calculate-button', text: 'Xem chi tiết và đánh giá cấu hình' },
        { selector: '#save-button', text: 'Lưu cấu hình để tham khảo sau' },
        { selector: '#reset-button', text: 'Đặt lại tất cả các lựa chọn' }
    ];
    
    // Create tooltip container
    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'tooltip-container';
    tooltipContainer.style.position = 'absolute';
    tooltipContainer.style.background = 'rgba(0,0,0,0.8)';
    tooltipContainer.style.color = 'white';
    tooltipContainer.style.padding = '8px 12px';
    tooltipContainer.style.borderRadius = '4px';
    tooltipContainer.style.fontSize = '14px';
    tooltipContainer.style.zIndex = '1000';
    tooltipContainer.style.pointerEvents = 'none';
    tooltipContainer.style.opacity = '0';
    tooltipContainer.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(tooltipContainer);
    
    tooltipElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        
        elements.forEach(el => {
            el.addEventListener('mouseenter', function(e) {
                tooltipContainer.textContent = item.text;
                tooltipContainer.style.opacity = '1';
                
                const rect = this.getBoundingClientRect();
                tooltipContainer.style.left = `${rect.left + rect.width / 2 - tooltipContainer.offsetWidth / 2}px`;
                tooltipContainer.style.top = `${rect.bottom + 10 + window.scrollY}px`;
            });
            
            el.addEventListener('mouseleave', function() {
                tooltipContainer.style.opacity = '0';
            });
        });
    });
}

// Initialize enhanced budget slider
function initBudgetSlider() {
    const budgetSlider = document.getElementById('budget-range');
    const budgetValue = document.getElementById('budget-value');
    
    if (!budgetSlider || !budgetValue) return;
    
    // Format price function
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Update the budget value display
    budgetSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        budgetValue.textContent = formatPrice(value / 1000000) + ' triệu';
        
        // Calculate percentage for gradient background
        const percent = (value - this.min) / (this.max - this.min) * 100;
        this.style.background = `linear-gradient(to right, #ff6b6b 0%, #ff9b6b ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)`;
    });
    
    // Trigger input event to initialize slider
    const event = new Event('input');
    budgetSlider.dispatchEvent(event);
}

// Initialize game selection enhancements
function initGameSelection() {
    const gameCards = document.querySelectorAll('.game-card');
    const gameDropdown = document.getElementById('game-genre');
    
    if (gameCards.length === 0 || !gameDropdown) return;
    
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle selection
            const wasSelected = this.classList.contains('selected');
            
            // Clear all selections
            gameCards.forEach(c => c.classList.remove('selected'));
            
            if (!wasSelected) {
                // Add selection to clicked card
                this.classList.add('selected');
                
                // Update dropdown value
                const gameId = this.getAttribute('data-game');
                if (gameDropdown && gameId) {
                    gameDropdown.value = gameId;
                    
                    // Dispatch change event
                    gameDropdown.dispatchEvent(new Event('change'));
                }
                
                // Add selection animation
                this.animate([
                    { transform: 'scale(0.95)' },
                    { transform: 'scale(1.05)' },
                    { transform: 'scale(1)' }
                ], {
                    duration: 300,
                    easing: 'ease-in-out'
                });
            }
        });
    });
}

// Initialize component selection enhancements
function initComponentSelection() {
    const componentDropdowns = document.querySelectorAll('.dropdown');
    
    componentDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function() {
            // Add visual feedback on selection
            this.animate([
                { boxShadow: '0 0 0 3px rgba(0, 102, 204, 0.5)' },
                { boxShadow: '0 0 0 3px rgba(0, 102, 204, 0)' }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            // Find parent component and highlight
            const component = this.closest('.component');
            if (component) {
                component.style.transform = 'translateY(-3px)';
                setTimeout(() => {
                    component.style.transform = '';
                }, 300);
            }
        });
    });
}

// Add visual feedback on interactions
function initVisualFeedback() {
    document.addEventListener('click', function(e) {
        // Create ripple effect for buttons
        if (e.target.closest('.action-button, .btn-configure, .contact-button, a[href*="zalo"], a[href*="tel:"], a[href*="facebook"]')) {
            const button = e.target.closest('.action-button, .btn-configure, .contact-button, a[href*="zalo"], a[href*="tel:"], a[href*="facebook"]');
            
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            button.appendChild(ripple);
            
            // Set ripple position
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
    
    // Add ripple keyframes
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to update progress steps based on component selection
function updateProgressSteps() {
    const steps = document.querySelectorAll('.progress-step');
    if (steps.length === 0) return;
    
    // Check budget selection
    const budgetSlider = document.getElementById('budget-range');
    if (budgetSlider && budgetSlider.value > budgetSlider.min) {
        steps[0].classList.add('completed');
    }
    
    // Check CPU selection
    const cpuSelect = document.getElementById('cpu-type');
    if (cpuSelect && cpuSelect.value) {
        steps[1].classList.add('completed');
    }
    
    // Check game selection
    const gameSelect = document.getElementById('game-genre');
    if (gameSelect && gameSelect.value) {
        steps[2].classList.add('completed');
    }
    
    // Check component selection
    const componentSelects = [
        document.getElementById('cpu'),
        document.getElementById('mainboard'),
        document.getElementById('ram'),
        document.getElementById('vga')
    ];
    
    const componentsSelected = componentSelects.filter(Boolean).some(select => select.value);
    if (componentsSelected) {
        steps[3].classList.add('completed');
    }
    
    // Find current active step
    let activeStepIndex = 0;
    for (let i = 0; i < steps.length; i++) {
        if (steps[i].classList.contains('completed')) {
            activeStepIndex = i + 1;
        }
    }
    
    // Make sure activeStepIndex doesn't exceed steps length
    if (activeStepIndex >= steps.length) {
        activeStepIndex = steps.length - 1;
    }
    
    // Update active step
    steps.forEach(step => step.classList.remove('active'));
    steps[activeStepIndex].classList.add('active');
}

// Initialize CPU-based theme
function initCpuTheme() {
    // Define theme colors
    const themes = {
        'Intel': {
            primary: '#0071c5',
            secondary: '#00c7fd',
            gradient: 'linear-gradient(135deg, #0071c5, #00c7fd)',
            accentLight: 'rgba(0, 113, 197, 0.1)',
            accentMedium: 'rgba(0, 113, 197, 0.3)'
        },
        'Amd': {
            primary: '#ED1C24',
            secondary: '#ff4c4c',
            gradient: 'linear-gradient(135deg, #ED1C24, #ff4c4c)',
            accentLight: 'rgba(237, 28, 36, 0.1)',
            accentMedium: 'rgba(237, 28, 36, 0.3)'
        }
    };
    
    // Create style element for dynamic theming
    const themeStyle = document.createElement('style');
    themeStyle.id = 'cpu-theme-style';
    document.head.appendChild(themeStyle);
    
    // Function to apply theme based on CPU type
    function applyCpuTheme(cpuType) {
        const theme = themes[cpuType] || themes['Intel']; // Default to Intel if not found
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--primary-gradient', theme.gradient);
        
        // Update header background
        const header = document.querySelector('header');
        if (header) {
            header.style.background = theme.gradient;
        }
        
        // Add theme class to body
        document.body.classList.remove('intel-theme', 'amd-theme');
        document.body.classList.add(`${cpuType.toLowerCase()}-theme`);
        
        // Update theme styles
        themeStyle.textContent = `
            .selection-section::before {
                background: ${theme.gradient};
            }
            .section-header i {
                background: ${theme.gradient};
            }
            .brand-option.selected {
                border-color: ${theme.primary};
                box-shadow: 0 0 15px ${theme.primary}80;
                background-color: ${theme.accentLight};
            }
            .progress-step.active {
                background: ${theme.gradient} !important;
            }
            .primary-btn, .btn-configure {
                background: ${theme.gradient} !important;
            }
            
            /* Game card selection */
            .game-card.selected {
                border: 3px solid ${theme.primary} !important;
                box-shadow: 0 10px 20px ${theme.primary}50 !important;
            }
            
            /* Dropdown focus */
            .dropdown:focus {
                border-color: ${theme.primary};
                box-shadow: 0 0 0 3px ${theme.primary}40;
            }
            
            /* Config table header */
            #config-table table thead tr {
                background-color: ${theme.primary};
            }
        `;
    }
    
    // Listen for CPU type selection changes
    const cpuTypeDropdown = document.getElementById('cpu-type');
    if (cpuTypeDropdown) {
        // Apply initial theme
        applyCpuTheme(cpuTypeDropdown.value || 'Intel');
        
        // Listen for changes
        cpuTypeDropdown.addEventListener('change', function() {
            applyCpuTheme(this.value);
        });
    }
    
    // Add direct click handler for CPU options
    const intelOption = document.getElementById('intel-option');
    const amdOption = document.getElementById('amd-option');
    
    if (intelOption) {
        intelOption.addEventListener('click', function() {
            applyCpuTheme('Intel');
        });
    }
    
    if (amdOption) {
        amdOption.addEventListener('click', function() {
            applyCpuTheme('Amd');
        });
    }
}

/**
 * Fix configuration table display issues
 */
function fixConfigTableDisplay() {
    console.log('Fixing config table display');
    
    // Ensure we run this when the document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyConfigTableFixes);
    } else {
        applyConfigTableFixes();
    }
    
    // Apply fixes on load event as well
    window.addEventListener('load', applyConfigTableFixes);
    
    // Apply fixes again after a delay
    setTimeout(applyConfigTableFixes, 1500);
    setTimeout(applyConfigTableFixes, 3000);
    
    function applyConfigTableFixes() {
        // Fix tables display
        const tables = document.querySelectorAll('#component-table, #configuration-table, .config-table, table');
        tables.forEach(table => {
            if (table) {
                table.style.display = 'table';
                table.style.visibility = 'visible';
                table.style.opacity = '1';
            }
        });
        
        // Fix table containers
        const tableContainers = document.querySelectorAll('.table-container, .table-responsive');
        tableContainers.forEach(container => {
            if (container) {
                container.style.display = 'block';
                container.style.visibility = 'visible';
                container.style.opacity = '1';
            }
        });
        
        // Fix any other container that might hide tables
        document.querySelectorAll('.component-selection-container, .config-section').forEach(section => {
            if (section) {
                section.style.display = 'block';
                section.style.visibility = 'visible';
                section.style.opacity = '1';
            }
        });
        
        // Simulate click on calculate button if it exists
        const calculateButtons = document.querySelectorAll('#calculate-btn, .calculate-btn, button[onclick*="showConfig"]');
        calculateButtons.forEach(button => {
            if (button && typeof button.click === 'function') {
                try {
                    button.click();
                } catch (err) {
                    console.warn('Error clicking calculate button:', err);
                }
            }
        });
        
        console.log('Config table visibility enforced');
    }
}

// Call the function
document.addEventListener('DOMContentLoaded', fixConfigTableDisplay);

// Add global event listener for dropdown changes to update progress
document.addEventListener('change', function(e) {
    if (e.target.tagName === 'SELECT') {
        updateProgressSteps();
    }
});

// Initialize progress tracking on page load
window.addEventListener('load', function() {
    setTimeout(updateProgressSteps, 500);
});

// Initialize button handlers for the config table
function initConfigTableButtons() {
    // Get the refresh table button
    const refreshTableButton = document.getElementById('refresh-table');
    if (refreshTableButton) {
        refreshTableButton.addEventListener('click', function() {
            // Force update table data if available
            if (typeof window.updateConfigTableImages === 'function') {
                window.updateConfigTableImages();
            }
            
            // Get config table
            const configTable = document.getElementById('config-table');
            if (configTable) {
                // Add refresh animation
                configTable.animate([
                    { opacity: 0.5 },
                    { opacity: 1 }
                ], {
                    duration: 500,
                    easing: 'ease-out'
                });
                
                // Make sure it's visible
                configTable.style.display = 'block';
                
                // Scroll to it
                configTable.scrollIntoView({behavior: 'smooth'});
            }
        });
    }
    
    // Get the show config details button
    const showConfigDetailsButton = document.getElementById('show-config-details');
    if (showConfigDetailsButton) {
        showConfigDetailsButton.addEventListener('click', function() {
            // Try to find and click the existing calculate button to trigger the modal
            const calculateButton = document.getElementById('calculate-button');
            if (calculateButton) {
                calculateButton.click();
            }
            
            // As a fallback, try to show the modal directly
            const summaryModal = document.getElementById('summary-modal');
            if (summaryModal) {
                summaryModal.style.display = 'block';
            }
        });
    }
} 