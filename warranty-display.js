/**
 * Script hiển thị thông tin bảo hành và tình trạng linh kiện
 * Đảm bảo các linh kiện chính luôn hiển thị
 */

(function() {
    // Đảm bảo CSS được tải
    function loadWarrantyStyles() {
        // Kiểm tra xem CSS đã được tải chưa
        if (document.getElementById('warranty-styles')) {
            return;
        }
        
        // Thêm CSS vào head
        const styleTag = document.createElement('style');
        styleTag.id = 'warranty-styles';
        styleTag.textContent = `
            /* Định dạng cho bảng thông tin bảo hành */
            .warranty-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                font-family: Arial, sans-serif;
                font-size: 14px;
                background-color: #1c1c1c;
                color: #ffffff;
                border: 1px solid #333;
            }
            
            .warranty-table thead {
                background-color: #0053b4;
                color: white;
            }
            
            .warranty-table th,
            .warranty-table td {
                padding: 10px;
                text-align: left;
                border: 1px solid #333;
            }
            
            .warranty-table th {
                font-weight: bold;
            }
            
            .warranty-table tbody tr:nth-child(even) {
                background-color: #222222;
            }
            
            .warranty-table tbody tr:hover {
                background-color: #303030;
            }
            
            /* Định dạng giá tiền */
            .warranty-table td:nth-child(2) {
                text-align: right;
                color: #00b3ff;
            }
            
            /* Định dạng bảo hành */
            .warranty-table td:nth-child(3) {
                text-align: center;
                color: #4CAF50;
            }
            
            /* Định dạng ghi chú */
            .warranty-table td:nth-child(4) {
                text-align: center;
                font-weight: bold;
            }
            
            /* Đảm bảo bảng luôn hiển thị */
            #config-table, 
            #warranty-info-table {
                display: table !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            /* Đảm bảo thông báo tương thích nổi bật */
            #socket-message {
                display: none !important;
            }
            
            /* Đảm bảo KHÔNG ẩn select dropdown khi click */
            select#mainboard, 
            select#ram {
                display: inline-block !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                z-index: 9999 !important;
                position: relative !important;
            }
            
            /* Đảm bảo select dropdown có thể mở ra và chọn được */
            select#mainboard option, 
            select#ram option {
                display: block !important;
                color: #000 !important;
                background-color: #fff !important;
            }
            
            /* Đảm bảo các dropdown có thể click và mở được */
            .form-group, 
            .form-group select,
            .form-group .form-control,
            .select-dropdown {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                z-index: 999 !important;
            }
            
            /* Đảm bảo form group chứa mainboard và RAM hiển thị */
            .mainboard-group,
            .ram-group,
            .form-group:has(#mainboard),
            .form-group:has(#ram) {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
            }
            
            /* Đảm bảo bảng không bị thu nhỏ */
            .config-table-container {
                max-width: 100% !important;
                overflow-x: auto !important;
            }
            
            /* Force hiển thị */
            [style*="display: none"] {
                display: block !important;
            }
            
            /* Ngoại lệ cho một số phần tử */
            .modal[style*="display: none"] {
                display: none !important;
            }
        `;
        
        document.head.appendChild(styleTag);
        console.log('✅ Warranty styles added to page');
    }
    
    // Đảm bảo các thành phần hiển thị
    function ensureComponentsVisible() {
        // Đảm bảo mainboard hiển thị
        const mainboardGroup = document.querySelector('.mainboard-group, .form-group:has(#mainboard)');
        if (mainboardGroup) {
            mainboardGroup.style.display = 'block';
            mainboardGroup.style.visibility = 'visible';
            mainboardGroup.style.opacity = '1';
        }
        
        // Đảm bảo RAM hiển thị
        const ramGroup = document.querySelector('.ram-group, .form-group:has(#ram)');
        if (ramGroup) {
            ramGroup.style.display = 'block';
            ramGroup.style.visibility = 'visible';
            ramGroup.style.opacity = '1';
        }
        
        // Đảm bảo các dropdown hiển thị
        const mainboard = document.getElementById('mainboard');
        if (mainboard) {
            mainboard.style.display = 'block';
            mainboard.style.visibility = 'visible';
            mainboard.style.opacity = '1';
        }
        
        const ram = document.getElementById('ram');
        if (ram) {
            ram.style.display = 'block';
            ram.style.visibility = 'visible';
            ram.style.opacity = '1';
        }
        
        // Tìm tất cả các linh kiện có display: none và sửa
        document.querySelectorAll('.form-group[style*="display: none"]').forEach(el => {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
        
        // Kiểm tra bảng có hiển thị chưa
        const configTable = document.getElementById('config-table');
        if (configTable) {
            configTable.style.display = 'table';
            configTable.style.visibility = 'visible';
            configTable.style.opacity = '1';
        }
        
        console.log('✅ All components visibility enforced');
    }
    
    // Force hiển thị thông tin bảo hành
    function forceWarrantyDisplay() {
        // Gọi hàm kiểm tra tương thích
        if (typeof window.ensureCompatibleComponents === 'function') {
            window.ensureCompatibleComponents();
        }
        
        // Hiển thị bảng config
        const configTable = document.getElementById('config-table');
        if (configTable) {
            configTable.style.display = 'table';
        }
        
        // Hiển thị bảng warranty
        const warrantyTable = document.getElementById('warranty-info-table');
        if (warrantyTable) {
            warrantyTable.style.display = 'table';
        }
        
        console.log('✅ Warranty information display enforced');
    }
    
    // Thêm button để force hiển thị
    function addForceDisplayButton() {
        // Kiểm tra xem button đã tồn tại chưa
        if (document.getElementById('force-display-button')) {
            return;
        }
        
        // Tạo button
        const button = document.createElement('button');
        button.id = 'force-display-button';
        button.textContent = 'HIỂN THỊ THÔNG TIN BẢO HÀNH';
        button.className = 'btn btn-primary';
        button.style.cssText = 'margin: 10px 0; padding: 8px 15px; background-color: #0053b4; color: white; border: none; border-radius: 4px; cursor: pointer;';
        
        // Thêm sự kiện click
        button.addEventListener('click', function() {
            ensureComponentsVisible();
            forceWarrantyDisplay();
        });
        
        // Thêm vào trang
        const configTable = document.getElementById('config-table');
        if (configTable) {
            configTable.parentNode.insertBefore(button, configTable);
        } else {
            // Nếu không tìm thấy config-table, thêm vào main hoặc body
            const main = document.querySelector('main') || document.body;
            main.appendChild(button);
        }
        
        console.log('✅ Force display button added');
    }
    
    // Khởi tạo khi DOM sẵn sàng
    function initialize() {
        loadWarrantyStyles();
        addForceDisplayButton();
        
        // Chạy các chức năng sau một chút để đảm bảo DOM đã được cập nhật
        setTimeout(function() {
            ensureComponentsVisible();
            forceWarrantyDisplay();
        }, 1000);
        
        // Thêm các sự kiện để theo dõi thay đổi trong DOM
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    ensureComponentsVisible();
                }
            });
        });
        
        // Bắt đầu theo dõi thay đổi trong DOM
        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
        
        console.log('✅ Warranty display initialized');
    }
    
    // Gọi khởi tạo khi DOM sẵn sàng
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})(); 