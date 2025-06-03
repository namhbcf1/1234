/**
 * Component Connector - kết nối tất cả các thành phần của trang web
 */

// Import the loadComponentData function from import-loader.js
import { loadComponentData } from './import-loader.js';

// Định dạng giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Function to get component data from the data files
function getComponentData(componentType, componentId) {
    if (!componentId) return null;
    
    // Map componentType đến đúng đối tượng dữ liệu toàn cục
    const dataMap = {
        'CPU': window.cpuData,
        'Mainboard': window.mainboardData,
        'RAM': window.ramData,
        'VGA': window.vgaData,
        'SSD': window.ssdData,
        'PSU': window.psuData,
        'Case': window.caseData,
        'Cooler': window.cpuCoolerData,
        'HDD': window.hddData,
        'Monitor': window.monitorData
    };
    
    // Lấy đối tượng dữ liệu
    const dataObj = dataMap[componentType];
    if (!dataObj) return null;
    
    // Trả về dữ liệu component
    return dataObj[componentId];
}

// Function to get component specs from component data
function getComponentSpecs(componentType, componentId) {
    const component = getComponentData(componentType, componentId);
    if (!component) return {};
    
    // Trả về thuộc tính specs của component nếu có
    return component.specs || {};
}

// Lấy URL hình ảnh linh kiện (mặc định)
function getComponentImageUrl(componentType, componentId) {
    const component = getComponentData(componentType, componentId);
    if (!component || !component.image) {
        // Trả về đường dẫn hình ảnh mặc định nếu không tìm thấy hình ảnh
        return 'images/placeholder.jpg';
    }
    
    return component.image;
}

// Thu thập dữ liệu cấu hình
function collectConfigData() {
    const configData = {};
    
    // CPU
    const cpuSelect = document.getElementById('cpu');
    if (cpuSelect && cpuSelect.value) {
        const cpuData = getComponentData('CPU', cpuSelect.value);
        if (cpuData) {
            configData.CPU = {
                name: cpuData.name,
                price: cpuData.price,
                specs: getComponentSpecs('CPU', cpuSelect.value),
                image: cpuData.image
            };
        }
    }
    
    // Mainboard
    const mainboardSelect = document.getElementById('mainboard');
    if (mainboardSelect && mainboardSelect.value) {
        const mainboardData = getComponentData('Mainboard', mainboardSelect.value);
        if (mainboardData) {
            configData.Mainboard = {
                name: mainboardData.name,
                price: mainboardData.price,
                specs: getComponentSpecs('Mainboard', mainboardSelect.value),
                image: mainboardData.image
            };
        }
    }
    
    // RAM
    const ramSelect = document.getElementById('ram');
    if (ramSelect && ramSelect.value) {
        const ramData = getComponentData('RAM', ramSelect.value);
        if (ramData) {
            configData.RAM = {
                name: ramData.name,
                price: ramData.price,
                specs: getComponentSpecs('RAM', ramSelect.value),
                image: ramData.image
            };
        }
    }
    
    // VGA
    const vgaSelect = document.getElementById('vga');
    if (vgaSelect && vgaSelect.value) {
        const vgaData = getComponentData('VGA', vgaSelect.value);
        if (vgaData) {
            configData.VGA = {
                name: vgaData.name,
                price: vgaData.price,
                specs: getComponentSpecs('VGA', vgaSelect.value),
                image: vgaData.image
            };
        }
    }
    
    // SSD
    const ssdSelect = document.getElementById('ssd');
    if (ssdSelect && ssdSelect.value) {
        const ssdData = getComponentData('SSD', ssdSelect.value);
        if (ssdData) {
            configData.SSD = {
                name: ssdData.name,
                price: ssdData.price,
                specs: getComponentSpecs('SSD', ssdSelect.value),
                image: ssdData.image
            };
        }
    }
    
    // PSU
    const psuSelect = document.getElementById('psu');
    if (psuSelect && psuSelect.value) {
        const psuData = getComponentData('PSU', psuSelect.value);
        if (psuData) {
            configData.PSU = {
                name: psuData.name,
                price: psuData.price,
                specs: getComponentSpecs('PSU', psuSelect.value),
                image: psuData.image
            };
        }
    }
    
    // Case
    const caseSelect = document.getElementById('case');
    if (caseSelect && caseSelect.value) {
        const caseData = getComponentData('Case', caseSelect.value);
        if (caseData) {
            configData.Case = {
                name: caseData.name,
                price: caseData.price,
                specs: getComponentSpecs('Case', caseSelect.value),
                image: caseData.image
            };
        }
    }
    
    // CPU Cooler
    const coolerSelect = document.getElementById('cpuCooler');
    if (coolerSelect && coolerSelect.value) {
        const coolerData = getComponentData('Cooler', coolerSelect.value);
        if (coolerData) {
            configData.Cooler = {
                name: coolerData.name,
                price: coolerData.price,
                specs: getComponentSpecs('Cooler', coolerSelect.value),
                image: coolerData.image
            };
        }
    }
    
    // HDD
    const hddSelect = document.getElementById('hdd');
    if (hddSelect && hddSelect.value) {
        const hddData = getComponentData('HDD', hddSelect.value);
        if (hddData) {
            configData.HDD = {
                name: hddData.name,
                price: hddData.price,
                specs: getComponentSpecs('HDD', hddSelect.value),
                image: hddData.image
            };
        }
    }
    
    // Monitor
    const monitorSelect = document.getElementById('monitor');
    if (monitorSelect && monitorSelect.value) {
        const monitorData = getComponentData('Monitor', monitorSelect.value);
        if (monitorData) {
            configData.Monitor = {
                name: monitorData.name,
                price: monitorData.price,
                specs: getComponentSpecs('Monitor', monitorSelect.value),
                image: monitorData.image
            };
        }
    }
    
    console.log('Collected config data:', configData);
    return configData;
}

// Function to update total price
function updateTotalPrice() {
    // Calculate total price
    let totalPrice = 0;
    const configData = collectConfigData();
    
    for (const key in configData) {
        if (configData[key] && configData[key].price) {
            totalPrice += configData[key].price;
        }
    }
    
    // Update total price cells
    const totalPriceCell = document.getElementById('total-price-cell');
    const remainingPriceCell = document.getElementById('remaining-price-cell');
    
    if (totalPriceCell) {
        totalPriceCell.textContent = formatPrice(totalPrice) + ' VNĐ';
    }
    
    if (remainingPriceCell) {
        remainingPriceCell.textContent = formatPrice(totalPrice) + ' VNĐ';
    }
    
    // Also update main total price section
    const totalPriceSection = document.querySelector('#total-price p');
    if (totalPriceSection) {
        totalPriceSection.textContent = formatPrice(totalPrice) + ' VNĐ';
    }
}

// Add the function to update table images
function updateConfigTableImages() {
    // Component types and their corresponding table cells
    const componentImageCells = {
        'cpu': 'cpu-image',
        'mainboard': 'mainboard-image',
        'ram': 'ram-image',
        'vga': 'vga-image',
        'ssd': 'ssd-image',
        'cpuCooler': 'cpu-cooler-image',
        'psu': 'psu-image',
        'case': 'case-image',
        'hdd': 'hdd-image',
        'monitor': 'monitor-image'
    };
    
    // Component names and price cells
    const componentNameCells = {
        'cpu': ['cpu-name', 'cpu-price', 'cpu-total'],
        'mainboard': ['mainboard-name', 'mainboard-price', 'mainboard-total'],
        'ram': ['ram-name', 'ram-price', 'ram-total'],
        'vga': ['vga-name', 'vga-price', 'vga-total'],
        'ssd': ['ssd-name', 'ssd-price', 'ssd-total'],
        'cpuCooler': ['cpu-cooler-name', 'cpu-cooler-price', 'cpu-cooler-total'],
        'psu': ['psu-name', 'psu-price', 'psu-total'],
        'case': ['case-name', 'case-price', 'case-total'],
        'hdd': ['additional-component-name', 'additional-component-price', 'additional-component-total'],
        'monitor': ['monitor-name', 'monitor-price', 'monitor-total']
    };
    
    // Update images and text for each component
    for (const [componentId, cellId] of Object.entries(componentImageCells)) {
        const select = document.getElementById(componentId);
        const cell = document.getElementById(cellId);
        
        if (select && cell && select.value) {
            // Get component data
            const typeMap = {
                'cpu': 'CPU',
                'mainboard': 'Mainboard',
                'ram': 'RAM',
                'vga': 'VGA',
                'ssd': 'SSD',
                'cpuCooler': 'Cooler',
                'psu': 'PSU',
                'case': 'Case',
                'hdd': 'HDD',
                'monitor': 'Monitor'
            };
            
            const componentType = typeMap[componentId];
            const componentData = getComponentData(componentType, select.value);
            
            if (componentData) {
                // Create an image element
                const img = document.createElement('img');
                img.src = componentData.image || getComponentImageUrl(componentType, select.value);
                img.alt = componentData.name;
                img.style.maxWidth = '50px';
                img.style.maxHeight = '50px';
                img.onerror = function() {
                    this.src = getComponentImageUrl(componentType, select.value); // Fallback image
                };
                
                // Clear cell and append the image
                cell.innerHTML = '';
                cell.appendChild(img);
                
                // Update name and price cells
                const namePriceCells = componentNameCells[componentId];
                if (namePriceCells && namePriceCells.length === 3) {
                    const nameCell = document.getElementById(namePriceCells[0]);
                    const priceCell = document.getElementById(namePriceCells[1]);
                    const totalCell = document.getElementById(namePriceCells[2]);
                    
                    if (nameCell) nameCell.textContent = componentData.name;
                    if (priceCell) {
                        const price = componentData.price;
                        priceCell.textContent = formatPrice(price) + ' VNĐ';
                    }
                    if (totalCell && priceCell) {
                        totalCell.textContent = priceCell.textContent;
                    }
                }
            }
        } else if (cell) {
            // Clear the cell if no component selected
            cell.innerHTML = '';
        }
    }
    
    // Update total price
    updateTotalPrice();
}

// Make functions available globally
window.updateConfigTableImages = updateConfigTableImages;
window.updateTotalPrice = updateTotalPrice;
window.collectConfigData = collectConfigData;
window.getComponentData = getComponentData;
window.getComponentSpecs = getComponentSpecs;
window.getComponentImageUrl = getComponentImageUrl;
window.formatPrice = formatPrice;
window.showConfigDetailModal = showConfigDetailModal;

(function() {
    // Kiểm tra DOM đã sẵn sàng chưa
    document.addEventListener('DOMContentLoaded', initConnector);
    
    // Khởi tạo tất cả các kết nối
    function initConnector() {
        console.log('Initializing component connector');
        
        // Đảm bảo dữ liệu linh kiện được tải
        ensureComponentsDataLoaded();
        
        // Sửa lỗi exportToExcel
        fixExportToExcel();
        
        // Kết nối modal
        connectModalHandlers();
        
        // Sửa lỗi dropdown
        enhanceDropdowns();
        
        // Sửa lỗi Component ID mapping
        enhanceComponentIDMapping();
        
        console.log('Component connector initialized');
    }
    
    // Đảm bảo dữ liệu linh kiện được tải
    function ensureComponentsDataLoaded() {
        // Lấy dữ liệu linh kiện từ window object
        const componentsData = {
            'cpu': window.cpuData,
            'mainboard': window.mainboardData,
            'vga': window.vgaData,
            'ram': window.ramData,
            'ssd': window.ssdData,
            'psu': window.psuData,
            'case': window.caseData,
            'cpuCooler': window.cpuCoolerData,
            'hdd': window.hddData,
            'monitor': window.monitorData
        };
        
        // Kiểm tra xem tất cả dữ liệu đã tồn tại chưa
        const allDataLoaded = Object.values(componentsData).every(data => data !== undefined && Object.keys(data).length > 0);
        
        if (!allDataLoaded) {
            console.log('Dữ liệu linh kiện chưa được tải hoàn tất, đang thử tải lại từ js/data...');
            
            // Thử tải lại dữ liệu linh kiện từ module
            if (typeof loadComponentData === 'function') {
                loadComponentData().then(success => {
                    if (success) {
                        console.log('Dữ liệu linh kiện đã được tải thành công từ js/data');
                        // Sau khi tải xong, gọi lại hàm populateDropdowns nếu có
                        if (typeof window.populateDropdowns === 'function') {
                            window.populateDropdowns();
                        }
                    } else {
                        console.error('Không thể tải dữ liệu linh kiện từ js/data');
                    }
                });
            } else {
                console.error('Không tìm thấy hàm loadComponentData');
            }
        } else {
            console.log('Dữ liệu linh kiện đã được tải thành công');
        }
    }
    
    // Sửa lỗi exportToExcel không hoạt động
    function fixExportToExcel() {
        // Đảm bảo window.XLSX tồn tại
        if (typeof XLSX !== 'undefined' && !window.XLSX) {
            window.XLSX = XLSX;
            console.log('Fixed XLSX reference in window object');
        }
        
        // Kiểm tra và đảm bảo nút "Lưu cấu hình" hoạt động
        setTimeout(() => {
            const downloadButton = document.getElementById('download-config');
            if (downloadButton) {
                console.log('Found download-config button, ensuring it works');
                
                // Loại bỏ tất cả event listeners cũ
                const newButton = downloadButton.cloneNode(true);
                downloadButton.parentNode.replaceChild(newButton, downloadButton);
                
                // Thêm event listener mới
                newButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Download config button clicked');
                    
                    // Thu thập dữ liệu cấu hình
                    const configData = collectConfigData();
                    
                    // Xuất ra Excel
                    if (typeof window.exportToExcel === 'function') {
                        window.exportToExcel(configData);
                    } else {
                        console.error('exportToExcel function not found');
                        alert('Chức năng xuất Excel không hoạt động. Vui lòng làm mới trang và thử lại.');
                    }
                });
            }
        }, 2000);
    }
    
    // Create a basic fallback modal handler if none is found
    function createFallbackModalHandler() {
        console.log('Creating fallback modal handler');
        
        // First check if we already have a modal element
        let modalElement = document.getElementById('component-detail-modal');
        
        if (!modalElement) {
            // Create a basic modal structure if it doesn't exist
            modalElement = document.createElement('div');
            modalElement.id = 'component-detail-modal';
            modalElement.className = 'modal fade';
            modalElement.setAttribute('tabindex', '-1');
            modalElement.setAttribute('role', 'dialog');
            modalElement.setAttribute('aria-labelledby', 'componentModalLabel');
            modalElement.setAttribute('aria-hidden', 'true');
            
            modalElement.innerHTML = `
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="componentModalLabel">Chi tiết linh kiện</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="component-detail-content">
                            <!-- Component details will be displayed here -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modalElement);
            
            // Ensure Bootstrap's modal functionality is available
            if (typeof $ !== 'undefined' && typeof $.fn.modal !== 'undefined') {
                // Bootstrap is available
                console.log('Bootstrap modal functions found');
            } else {
                // Basic modal functionality
                console.log('Adding basic modal functionality');
                const closeButtons = modalElement.querySelectorAll('[data-dismiss="modal"]');
                closeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        modalElement.style.display = 'none';
                    });
                });
            }
        }
        
        // Create and return the handler function
        return function(componentData) {
            const modalContent = document.getElementById('component-detail-content');
            if (!modalContent) {
                console.error('Modal content element not found');
                return;
            }
            
            // Build details HTML
            let detailsHtml = '';
            if (componentData && typeof componentData === 'object') {
                detailsHtml = `
                    <div class="component-details">
                        <h4>${componentData.name || 'Unknown Component'}</h4>
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${componentData.image || ''}" alt="${componentData.name || 'Component'}" 
                                    style="max-width: 100%; height: auto;" 
                                    onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0NDQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHJ4PSIyIiByeT0iMiI+PC9yZWN0Pjx0ZXh0IHg9IjEyIiB5PSIxNCIgZm9udC1zaXplPSI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNDQ0Ij5QQzwvdGV4dD48L3N2Zz4=';">
                            </div>
                            <div class="col-md-8">
                                <table class="table table-striped">
                                    <tbody>`;
                
                // Add all properties to the table
                for (const [key, value] of Object.entries(componentData)) {
                    if (key !== 'image' && key !== 'name') { // Skip image and name as they're shown separately
                        detailsHtml += `
                                        <tr>
                                            <th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>
                                            <td>${value}</td>
                                        </tr>`;
                    }
                }
                
                detailsHtml += `
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>`;
            } else {
                detailsHtml = '<div class="alert alert-warning">No component data available</div>';
            }
            
            // Update modal content
            modalContent.innerHTML = detailsHtml;
            
            // Show the modal
            if (typeof $ !== 'undefined' && typeof $.fn.modal !== 'undefined') {
                $('#component-detail-modal').modal('show');
            } else {
                modalElement.style.display = 'block';
            }
        };
    }
    
    // Update connectModalHandlers function to use the fallback if needed
    function connectModalHandlers() {
        if (window.showComponentModal) {
            console.log('Modal handler already connected');
            return true;
        }
        
        // Try to find a modal handler in the global scope
        const potentialHandlers = ['showConfigDetailModal', 'showComponentDetailModal', 'openComponentModal'];
        let found = false;
        
        for (const handlerName of potentialHandlers) {
            if (typeof window[handlerName] === 'function') {
                window.showComponentModal = window[handlerName];
                console.log(`Found modal handler: ${handlerName}`);
                found = true;
                break;
            }
        }
        
        if (!found) {
            console.log('Modal handler not found, creating fallback handler');
            window.showComponentModal = createFallbackModalHandler();
            found = true;
        }
        
        return found;
    }
    
    // Cập nhật nội dung modal
    function updateModalContent() {
        const modal = document.getElementById('component-detail-modal');
        if (!modal) return;
        
        // Lấy dữ liệu từ bảng chính
        const configData = collectConfigData();
        
        // Kiểm tra xem có bất kỳ linh kiện nào được chọn chưa
        const hasAnyComponent = Object.keys(configData).length > 0;
        
        // Nếu không có linh kiện nào được chọn, không hiển thị modal
        if (!hasAnyComponent) {
            console.log("Không có linh kiện nào được chọn, không hiển thị modal");
            return;
        }
        
        // Tính tổng tiền
        let totalPrice = 0;
        for (const key in configData) {
            if (configData[key] && configData[key].price) {
                totalPrice += configData[key].price;
            }
        }
        
        // Cập nhật tổng tiền
        const totalPriceElement = document.getElementById('modal-total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `${formatPrice(totalPrice)} VNĐ`;
        }
        
        // Ánh xạ từ loại linh kiện sang các ID trong modal
        const componentMappings = {
            'CPU': {
                name: 'modal-cpu-name',
                price: 'modal-cpu-price',
                image: 'modal-cpu-image',
                warranty: 'modal-cpu-warranty',
                status: 'modal-cpu-status'
            },
            'Mainboard': {
                name: 'modal-mainboard-name',
                price: 'modal-mainboard-price',
                image: 'modal-mainboard-image',
                warranty: 'modal-mainboard-warranty',
                status: 'modal-mainboard-status'
            },
            'RAM': {
                name: 'modal-ram-name',
                price: 'modal-ram-price',
                image: 'modal-ram-image',
                warranty: 'modal-ram-warranty',
                status: 'modal-ram-status'
            },
            'VGA': {
                name: 'modal-vga-name',
                price: 'modal-vga-price',
                image: 'modal-vga-image',
                warranty: 'modal-vga-warranty',
                status: 'modal-vga-status'
            },
            'SSD': {
                name: 'modal-ssd-name',
                price: 'modal-ssd-price',
                image: 'modal-ssd-image',
                warranty: 'modal-ssd-warranty',
                status: 'modal-ssd-status'
            },
            'PSU': {
                name: 'modal-psu-name',
                price: 'modal-psu-price',
                image: 'modal-psu-image',
                warranty: 'modal-psu-warranty',
                status: 'modal-psu-status'
            },
            'Case': {
                name: 'modal-case-name',
                price: 'modal-case-price',
                image: 'modal-case-image',
                warranty: 'modal-case-warranty',
                status: 'modal-case-status'
            },
            'Cooler': {
                name: 'modal-cooler-name',
                price: 'modal-cooler-price',
                image: 'modal-cooler-image',
                warranty: 'modal-cooler-warranty',
                status: 'modal-cooler-status'
            }
        };
        
        // Cập nhật thông tin từng linh kiện
        for (const [componentType, component] of Object.entries(configData)) {
            const mapping = componentMappings[componentType];
            if (mapping && component) {
                // Cập nhật tên
                const nameElement = document.getElementById(mapping.name);
                if (nameElement) nameElement.textContent = component.name || '';
                
                // Cập nhật giá
                const priceElement = document.getElementById(mapping.price);
                if (priceElement) priceElement.textContent = component.price ? `${formatPrice(component.price)} VNĐ` : '';
                
                // Cập nhật hình ảnh
                const imageElement = document.getElementById(mapping.image);
                if (imageElement) {
                    if (component.image) {
                        imageElement.innerHTML = `<img src="${component.image}" alt="${componentType}" style="width: 40px; height: 40px; object-fit: cover;">`;
                    } else {
                        // Sử dụng icon cho từng loại linh kiện
                        const iconClass = 
                            componentType === 'CPU' ? 'fas fa-microchip' :
                            componentType === 'Mainboard' ? 'fas fa-server' :
                            componentType === 'VGA' ? 'fas fa-tv' :
                            componentType === 'RAM' ? 'fas fa-memory' :
                            componentType === 'SSD' ? 'fas fa-hdd' :
                            componentType === 'PSU' ? 'fas fa-bolt' :
                            componentType === 'Case' ? 'fas fa-cube' :
                            componentType === 'Cooler' ? 'fas fa-wind' :
                            'fas fa-desktop';
                        
                        imageElement.innerHTML = `<i class="${iconClass}" style="font-size: 32px; color: #0053b4;"></i>`;
                    }
                }
                
                // Cập nhật bảo hành
                const warrantyElement = document.getElementById(mapping.warranty);
                const componentData = getComponentData(componentType, document.getElementById(componentType.toLowerCase())?.value);
                if (warrantyElement) {
                    warrantyElement.textContent = componentData?.warranty || '36 tháng';
                }
                
                // Cập nhật tình trạng
                const statusElement = document.getElementById(mapping.status);
                if (statusElement) {
                    const status = componentData?.condition || 'Mới';
                    const statusColor = status.toLowerCase().includes('mới') || status.toLowerCase() === 'new' ? '#4CAF50' : '#FFC107';
                    statusElement.innerHTML = `<span style="color: ${statusColor}; font-weight: bold;">${status.toUpperCase()}</span>`;
                }
            }
        }
        
        // Hiển thị modal
        if (typeof $ !== 'undefined' && typeof $.fn.modal !== 'undefined') {
            $('#component-detail-modal').modal('show');
        } else {
            modal.style.display = 'block';
        }
    }
    
    // Cải thiện dropdowns
    function enhanceDropdowns() {
        // Đảm bảo rằng khi dropdown thay đổi, data-price được cập nhật
        const dropdowns = document.querySelectorAll('select[id^="cpu"], select[id="mainboard"], select[id="ram"], select[id="vga"], select[id="ssd"], select[id="psu"], select[id="case"], select[id="cpuCooler"]');
        
        dropdowns.forEach(dropdown => {
            // Clone để loại bỏ event listeners cũ
            const newDropdown = dropdown.cloneNode(true);
            dropdown.parentNode.replaceChild(newDropdown, dropdown);
            
            newDropdown.addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                if (selectedOption) {
                    // Cập nhật data-price
                    const priceText = selectedOption.getAttribute('data-price') || '0';
                    const price = parseInt(priceText.replace(/\D/g, ''));
                    this.dataset.price = price;
                    
                    console.log(`Updated ${this.id} price to: ${price}`);
                }
            });
        });
    }
    
    // Cải thiện component ID mapping
    function enhanceComponentIDMapping() {
        // Kiểm tra xem hàm autoSelectConfig đã tồn tại chưa
        if (typeof window.autoSelectConfig === 'function') {
            console.log('Enhancing component ID mapping in autoSelectConfig');
            
            const originalAutoSelectConfig = window.autoSelectConfig;
            
            // Override hàm autoSelectConfig
            window.autoSelectConfig = function(gameId, budget, cpuType) {
                console.log('Enhanced autoSelectConfig intercepted:', gameId, budget, cpuType);
                
                // Đảm bảo ID được ánh xạ tới đúng ID trong dropdown
                const result = originalAutoSelectConfig(gameId, budget, cpuType);
                
                // Thêm xử lý sau khi đã chọn cấu hình
                setTimeout(() => {
                    updateDropdownsWithAvailableValues();
                }, 500);
                
                return result;
            };
        } else {
            console.warn('autoSelectConfig not found, will try again later');
            setTimeout(enhanceComponentIDMapping, 1000);
        }
    }
    
    // Cập nhật các dropdown với giá trị có sẵn
    function updateDropdownsWithAvailableValues() {
        const dropdowns = {
            'cpu': document.getElementById('cpu'),
            'mainboard': document.getElementById('mainboard'),
            'ram': document.getElementById('ram'),
            'vga': document.getElementById('vga'),
            'ssd': document.getElementById('ssd'),
            'case': document.getElementById('case'),
            'cpuCooler': document.getElementById('cpuCooler'),
            'psu': document.getElementById('psu')
        };
        
        // Kiểm tra xem dropdown đã có giá trị chưa
        for (const [key, dropdown] of Object.entries(dropdowns)) {
            if (dropdown && !dropdown.value && dropdown.options.length > 0) {
                // Chọn phần tử đầu tiên không phải placeholder
                for (let i = 0; i < dropdown.options.length; i++) {
                    if (dropdown.options[i].value && !dropdown.options[i].value.includes('Chọn')) {
                        dropdown.selectedIndex = i;
                        dropdown.dispatchEvent(new Event('change'));
                        console.log(`Auto-selected first valid option for ${key}: ${dropdown.options[i].text}`);
                        break;
                    }
                }
            }
        }
    }
})();

// Auto-trigger configuration table display when all selections are made
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if all main components are selected
    const checkAllComponentsSelected = () => {
        const requiredComponents = ['cpu', 'mainboard', 'vga', 'ram', 'ssd'];
        let allSelected = true;
        
        for (const component of requiredComponents) {
            const select = document.getElementById(component);
            if (!select || !select.value || select.value === '') {
                allSelected = false;
                break;
            }
        }
        
        return allSelected;
    };
    
    // Function to show the configuration table
    const showConfigTable = () => {
        if (typeof window.showConfigDetailModal === 'function') {
            console.log('All main components selected, auto-triggering config display');
            window.showConfigDetailModal();
        }
    };
    
    // Add event listeners to all component dropdowns
    const componentDropdowns = [
        'cpu', 'mainboard', 'vga', 'ram', 'ssd', 'cpuCooler', 'psu', 'case', 'hdd', 'monitor'
    ];
    
    componentDropdowns.forEach(component => {
        const dropdown = document.getElementById(component);
        if (dropdown) {
            dropdown.addEventListener('change', function() {
                if (checkAllComponentsSelected()) {
                    setTimeout(showConfigTable, 500);
                }
            });
        }
    });
});

// Setup event listener for "XEM CHI TIẾT VÀ ĐÁNH GIÁ" button
document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculate-button');
    const configTable = document.getElementById('config-table');
    
    if (calculateButton && configTable) {
        calculateButton.addEventListener('click', function() {
            // Check if any components are selected
            const componentIds = ['cpu', 'mainboard', 'ram', 'vga', 'ssd', 'cpuCooler', 'psu', 'case', 'hdd', 'monitor'];
            let anyComponentSelected = false;
            
            for (const id of componentIds) {
                const select = document.getElementById(id);
                if (select && select.value) {
                    anyComponentSelected = true;
                    break;
                }
            }
            
            if (anyComponentSelected) {
                // Update the config table images and text
                updateConfigTableImages();
                
                // Show the config table
                configTable.style.display = 'block';
                console.log('Configuration table shown with updated component data');
                
                // Scroll to the config table
                configTable.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // No components selected
                alert('Vui lòng chọn ít nhất một linh kiện trước khi xem chi tiết.');
                console.log('No components selected, not showing table');
            }
        });
        
        console.log('✅ Calculate button handler configured to update component images');
    }
    
    // Add event listeners to all component select elements
    const componentIds = ['cpu', 'mainboard', 'ram', 'vga', 'ssd', 'cpuCooler', 'psu', 'case', 'hdd', 'monitor'];
    for (const id of componentIds) {
        const select = document.getElementById(id);
        if (select) {
            select.addEventListener('change', function() {
                if (configTable.style.display === 'block') {
                    // If table is already visible, update it
                    updateConfigTableImages();
                }
                
                // Also update price display
                updateTotalPrice();
            });
        }
    }
});

// Replace images with Font Awesome icons in component tables
function replaceImagesWithIcons() {
    // Image cells in the config table and their corresponding Font Awesome icon classes
    const imageMappings = {
        'cpu-image': 'fas fa-microchip',
        'mainboard-image': 'fas fa-server',
        'vga-image': 'fas fa-tv',
        'ram-image': 'fas fa-memory',
        'ssd-image': 'fas fa-hdd',
        'cpu-cooler-image': 'fas fa-wind',
        'psu-image': 'fas fa-bolt',
        'case-image': 'fas fa-cube',
        'hdd-image': 'fas fa-hdd',
        'monitor-image': 'fas fa-desktop'
    };
    
    // Replace each image cell with an icon
    Object.entries(imageMappings).forEach(([cellId, iconClass]) => {
        const cell = document.getElementById(cellId);
        if (cell) {
            cell.innerHTML = `<i class="${iconClass}" style="font-size: 32px; color: #0053b4;"></i>`;
        }
    });
    
    // Also replace images in the modal
    const modal = document.getElementById('component-detail-modal');
    if (modal) {
        // CPU
        const cpuCell = modal.querySelector('tr:nth-child(1) td:nth-child(2)');
        if (cpuCell) cpuCell.innerHTML = '<i class="fas fa-microchip" style="font-size: 32px; color: #0053b4;"></i>';
        
        // Mainboard
        const mainboardCell = modal.querySelector('tr:nth-child(2) td:nth-child(2)');
        if (mainboardCell) mainboardCell.innerHTML = '<i class="fas fa-server" style="font-size: 32px; color: #0053b4;"></i>';
        
        // VGA
        const vgaCell = modal.querySelector('tr:nth-child(3) td:nth-child(2)');
        if (vgaCell) vgaCell.innerHTML = '<i class="fas fa-tv" style="font-size: 32px; color: #0053b4;"></i>';
        
        // RAM
        const ramCell = modal.querySelector('tr:nth-child(4) td:nth-child(2)');
        if (ramCell) ramCell.innerHTML = '<i class="fas fa-memory" style="font-size: 32px; color: #0053b4;"></i>';
        
        // SSD
        const ssdCell = modal.querySelector('tr:nth-child(5) td:nth-child(2)');
        if (ssdCell) ssdCell.innerHTML = '<i class="fas fa-hdd" style="font-size: 32px; color: #0053b4;"></i>';
        
        // PSU
        const psuCell = modal.querySelector('tr:nth-child(6) td:nth-child(2)');
        if (psuCell) psuCell.innerHTML = '<i class="fas fa-bolt" style="font-size: 32px; color: #0053b4;"></i>';
        
        // Case
        const caseCell = modal.querySelector('tr:nth-child(7) td:nth-child(2)');
        if (caseCell) caseCell.innerHTML = '<i class="fas fa-cube" style="font-size: 32px; color: #0053b4;"></i>';
        
        // Cooler
        const coolerCell = modal.querySelector('tr:nth-child(8) td:nth-child(2)');
        if (coolerCell) coolerCell.innerHTML = '<i class="fas fa-wind" style="font-size: 32px; color: #0053b4;"></i>';
    }
}

// Ensure the component table is visible
function ensureComponentTableVisible() {
    // Show the config-table
    const configTable = document.getElementById('config-table');
    if (configTable) {
        configTable.style.cssText = 'display: table !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; border-collapse: collapse !important;';
    }
    
    // Show the component selection section
    const componentSelection = document.getElementById('component-selection');
    if (componentSelection) {
        componentSelection.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important;';
    }
    
    // Don't automatically show the modal - this should be user-triggered
    // const detailModal = document.getElementById('component-detail-modal');
    // if (detailModal) {
    //     detailModal.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important; position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; background-color: rgba(0,0,0,0.5) !important; z-index: 10000 !important; overflow-y: auto !important;';
    //     
    //     // Find modal dialog and set its style
    //     const modalDialog = detailModal.querySelector('.modal-dialog');
    //     if (modalDialog) {
    //         modalDialog.style.cssText = 'margin: 30px auto !important; max-width: 800px !important; background: white !important; border-radius: 5px !important; overflow: hidden !important; box-shadow: 0 5px 15px rgba(0,0,0,0.5) !important;';
    //     }
    // }
    
    // Run after a short delay to ensure icons are applied
    setTimeout(replaceImagesWithIcons, 100);
}

// Add this to the document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Replace console.log with a no-op function for less verbose output
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        // Only log critical messages, filter out verbose ones
        const message = args.join(' ');
        if (message.includes('ERROR') || 
            message.includes('CRITICAL') || 
            message.includes('IMPORTANT') ||
            message.includes('✅')) {
            originalConsoleLog.apply(console, args);
        }
    };
    
    // Add event listener to the calculate button
    const calculateButton = document.getElementById('calculate-button');
    if (calculateButton) {
        calculateButton.addEventListener('click', function() {
            ensureComponentTableVisible();
        });
    }
    
    // Add event listener to the show-config-details button
    const showConfigDetailsButton = document.getElementById('show-config-details');
    if (showConfigDetailsButton) {
        showConfigDetailsButton.addEventListener('click', function() {
            ensureComponentTableVisible();
        });
    }
    
    // Enhance all buttons with HIỆN or HIỂN THỊ in their text
    document.querySelectorAll('button').forEach(button => {
        const buttonText = button.textContent || button.innerText;
        if (buttonText.includes('HIỆN') || buttonText.includes('HIỂN THỊ')) {
            button.addEventListener('click', ensureComponentTableVisible);
        }
    });
    
    // Don't automatically run on page load
    // setTimeout(ensureComponentTableVisible, 1000);
});

// Hàm kiểm tra xem đã chọn đủ linh kiện cơ bản chưa
function hasRequiredComponents() {
    const requiredComponents = ['cpu', 'mainboard', 'ram', 'vga', 'ssd'];
    for (const component of requiredComponents) {
        const select = document.getElementById(component);
        if (!select || !select.value) {
            return false;
        }
    }
    return true;
}

// Hiển thị modal khi người dùng chọn đủ linh kiện
function showConfigDetailModal() {
    if (hasRequiredComponents()) {
        updateModalContent();
    } else {
        alert('Vui lòng chọn ít nhất các linh kiện cơ bản (CPU, Mainboard, RAM, VGA, SSD) trước khi xem chi tiết cấu hình.');
    }
} 