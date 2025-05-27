/**
 * Modal Handler - Xử lý các popup trong ứng dụng
 */

(function() {
    // Tạo window.modalHandler để các module khác có thể truy cập
    window.modalHandler = {
        showModal: showModal,
        hideModal: hideModal,
        setupConfigDetailModal: setupConfigDetailModal
    };
    
    // Hàm khởi tạo
    function initModalHandlers() {
        console.log('Initializing modal handlers');
        
        // Xử lý popup cấu hình chi tiết
        setupConfigDetailModal();
        
        // Xử lý các popup khác nếu cần
    }
    
    // Configuration detail modal setup removed
function setupConfigDetailModal() {
    console.log('Configuration detail modal setup has been removed');
    // This function is kept as a stub to prevent errors in existing code
}
    
    // Modal view buttons setup removed
function setupDetailViewButtons() {
    console.log('Detail view buttons setup has been removed');
    // This function is kept as a stub to prevent errors in existing code
}
    
    // Lấy cấu hình hiện tại từ bảng
    function getCurrentConfig() {
        const config = {};
        
        // Lấy thông tin từ bảng
        const componentRows = [
            'cpu', 'mainboard', 'ram', 'vga', 'ssd', 
            'cpu-cooler', 'psu', 'case', 'additional-component', 'monitor'
        ];
        
        componentRows.forEach(component => {
            const nameCell = document.getElementById(`${component}-name`);
            const priceCell = document.getElementById(`${component}-price`);
            const totalCell = document.getElementById(`${component}-total`);
            
            if (nameCell && priceCell) {
                config[component] = {
                    name: nameCell.textContent || '',
                    price: priceCell.textContent || '',
                    total: totalCell ? totalCell.textContent || '' : ''
                };
            }
        });
        
        // Lấy tổng giá
        const totalPriceCell = document.getElementById('total-price-cell');
        if (totalPriceCell) {
            config.totalPrice = totalPriceCell.textContent || '';
        }
        
        return config;
    }
    
    // Modal detail function removed
function showConfigDetailModal(configData) {
    console.log("Configuration detail modal has been removed");
    // This function is kept as a stub to prevent errors in existing code
}

// Hàm định dạng giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
    
    // Modal functions removed
    function showModal() {
        console.log('Show modal function has been removed');
        // This function is kept as a stub to prevent errors in existing code
    }
    
    // Modal functions removed
    function hideModal() {
        console.log('Hide modal function has been removed');
        // This function is kept as a stub to prevent errors in existing code
    }
    
    // Khởi tạo khi tài liệu đã tải xong
    document.addEventListener('DOMContentLoaded', initModalHandlers);
})(); 