/**
 * Script sửa lỗi dropdown không mở được
 * Đặc biệt là Mainboard và RAM
 */

(function() {
    // Tạo thẻ style mới
    function addFixStyles() {
        const styleTag = document.createElement('style');
        styleTag.id = 'dropdown-fix-styles';
        styleTag.innerHTML = `
            /* FIX DROPDOWN KHÔNG MỞ ĐƯỢC - CẢI TIẾN MỚI */
            select,
            select.form-control,
            select#mainboard, 
            select#ram,
            select#cpu,
            select#vga,
            select#ssd,
            select#psu,
            select#case,
            select#cpuCooler,
            select#hdd,
            select#monitor {
                position: relative !important;
                display: inline-block !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                z-index: 99999 !important;
                cursor: pointer !important;
                background: #fff !important;
                color: #000 !important;
                border: 1px solid #ccc !important;
                border-radius: 4px !important;
                padding: 8px !important;
                width: 100% !important;
            }

            /* Hiển thị options */
            select option {
                display: block !important;
                color: #000 !important;
                background-color: #fff !important;
                padding: 5px !important;
            }

            /* Xóa các style chặn dropdown */
            [style*="pointer-events: none"] {
                pointer-events: auto !important;
            }

            /* Vô hiệu hóa JS block cho mainboard và RAM */
            html body .mainboard-wrapper,
            html body .ram-wrapper,
            html body .mainboard-group,
            html body .ram-group {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                z-index: 999999 !important;
            }
            
            /* Đảm bảo label và select hiển thị đúng */
            .form-group label {
                display: block !important;
                margin-bottom: 5px !important;
                color: #fff !important;
                font-weight: bold !important;
            }
            
            /* Đảm bảo dropdown không bị ẩn bởi JS */
            .form-group:has(#mainboard), 
            .form-group:has(#ram) {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
        `;
        document.head.appendChild(styleTag);
    }

    // Tạo preset options cho các dropdown trắng
    const presetOptions = {
        mainboard: [
            { value: 'asrock-b450m', text: 'ASRock B450M-HDV/M.2 (AM4) - 1.390.000 VND', dataPrice: '1390000' },
            { value: 'gigabyte-b450m', text: 'Gigabyte B450M DS3H - 1.500.000 VND', dataPrice: '1500000' },
            { value: 'msi-b450m', text: 'MSI B450M PRO-VDH MAX - 1.600.000 VND', dataPrice: '1600000' }
        ],
        ram: [
            { value: 'corsair-16gb', text: 'RAM Corsair Vengeance LPX 16GB DDR4 (Bus 3200) - 700.000 VND', dataPrice: '700000' },
            { value: 'kingston-16gb', text: 'RAM Kingston Fury 16GB DDR4 3200MHz - 750.000 VND', dataPrice: '750000' },
            { value: 'gskill-16gb', text: 'RAM G.Skill Ripjaws V 16GB DDR4 3200MHz - 730.000 VND', dataPrice: '730000' }
        ]
    };

    // Tạo dropdown mới thay thế hoàn toàn
    function replaceDropdowns() {
        // Danh sách dropdown cần thay thế
        const dropdownsToReplace = [
            'mainboard',
            'ram'
        ];

        dropdownsToReplace.forEach(id => {
            const originalSelect = document.getElementById(id);
            
            // Tìm container cha
            let parentElement;
            if (originalSelect) {
                parentElement = originalSelect.parentElement;
            } else {
                // Nếu không tìm thấy select, tìm container theo class
                const container = document.querySelector(`.${id}-group, .form-group:has(label[for="${id}"])`);
                if (container) {
                    parentElement = container;
                } else {
                    // Tạo container mới nếu không tìm thấy
                    console.log(`⚠️ Không tìm thấy container cho ${id}, tạo mới`);
                    parentElement = document.createElement('div');
                    parentElement.className = `form-group ${id}-group`;
                    
                    // Tạo label
                    const label = document.createElement('label');
                    label.setAttribute('for', id);
                    label.textContent = id === 'mainboard' ? 'Mainboard' : 'RAM';
                    parentElement.appendChild(label);
                    
                    // Thêm vào form container
                    const formContainer = document.querySelector('.form-container, .form-row, main, body');
                    if (formContainer) {
                        formContainer.appendChild(parentElement);
                    } else {
                        document.body.appendChild(parentElement);
                    }
                }
            }
            
            // Tạo select mới
            const newSelect = document.createElement('select');
            newSelect.id = id;
            newSelect.className = originalSelect ? originalSelect.className : 'form-control';
            
            // Thêm options từ preset hoặc từ select gốc
            const options = [];
            
            if (originalSelect && originalSelect.options.length > 0) {
                // Lấy options từ select gốc nếu có
                for (let i = 0; i < originalSelect.options.length; i++) {
                    const opt = originalSelect.options[i];
                    options.push({
                        value: opt.value,
                        text: opt.text,
                        selected: opt.selected,
                        dataPrice: opt.getAttribute('data-price')
                    });
                }
            } else {
                // Sử dụng preset options nếu không có options gốc
                options.push(...presetOptions[id]);
            }
            
            // Thêm options vào select mới
            options.forEach((opt, index) => {
                const option = document.createElement('option');
                option.value = opt.value || `option-${index + 1}`;
                option.text = opt.text;
                option.selected = index === 0; // Chọn option đầu tiên
                if (opt.dataPrice) {
                    option.setAttribute('data-price', opt.dataPrice);
                }
                newSelect.appendChild(option);
            });
            
            // Thiết lập style
            newSelect.style.cssText = `
                position: relative !important;
                display: inline-block !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                z-index: 99999 !important;
                cursor: pointer !important;
                background: #fff !important;
                color: #000 !important;
                border: 1px solid #ccc !important;
                border-radius: 4px !important;
                padding: 8px !important;
                width: 100% !important;
            `;
            
            // Xóa select cũ nếu có
            if (originalSelect) {
                parentElement.removeChild(originalSelect);
            }
            
            // Thêm select mới
            parentElement.appendChild(newSelect);
            
            // Thêm event listener
            newSelect.addEventListener('change', function() {
                // Kích hoạt sự kiện change để các script khác biết
                const event = new Event('change', { bubbles: true });
                newSelect.dispatchEvent(event);
                
                // Cập nhật bảng thông tin nếu cần
                updateConfigTable(id, newSelect.options[newSelect.selectedIndex].text);
            });
            
            console.log(`✅ Đã thay thế dropdown ${id}`);
        });
    }
    
    // Cập nhật bảng thông tin khi chọn option mới
    function updateConfigTable(componentId, componentText) {
        const configTable = document.getElementById('config-table');
        if (!configTable) return;
        
        // Map ID dropdown tới row trong bảng
        const rowMap = {
            'mainboard': 2, // row thứ 2 (index 1) cho mainboard
            'ram': 3,       // row thứ 3 (index 2) cho RAM
            'cpu': 1,
            'vga': 4,
            'ssd': 5,
            'psu': 7,
            'case': 8,
            'cpuCooler': 6
        };
        
        // Lấy row tương ứng
        const rowIndex = rowMap[componentId];
        if (!rowIndex) return;
        
        // Lấy tất cả rows
        const rows = configTable.querySelectorAll('tbody tr');
        if (rows.length < rowIndex) return;
        
        // Parse thông tin
        const regex = /(.*?)(?:\s-\s)?([\d,.]+)\s*VND/;
        const match = componentText.match(regex);
        
        if (match) {
            const name = match[1].trim();
            const price = match[2].trim();
            
            // Cập nhật tên linh kiện
            const nameCell = rows[rowIndex - 1].cells[2];
            if (nameCell) nameCell.textContent = name;
            
            // Cập nhật giá
            const priceCell = rows[rowIndex - 1].cells[5];
            if (priceCell) priceCell.textContent = price + ' VND';
            
            // Cập nhật thành tiền
            const totalCell = rows[rowIndex - 1].cells[6];
            if (totalCell) totalCell.textContent = price + ' VND';
            
            // Cập nhật tổng cộng
            updateTotalPrice();
        }
    }
    
    // Cập nhật tổng giá
    function updateTotalPrice() {
        const configTable = document.getElementById('config-table');
        if (!configTable) return;
        
        // Lấy tất cả các ô giá
        const priceCells = configTable.querySelectorAll('tbody tr:not(.total-row) td.price-cell:nth-of-type(7)');
        let total = 0;
        
        // Tính tổng
        priceCells.forEach(cell => {
            const priceText = cell.textContent.trim();
            const price = parseInt(priceText.replace(/[^\d]/g, ''));
            if (!isNaN(price)) {
                total += price;
            }
        });
        
        // Cập nhật ô tổng cộng
        const totalRow = configTable.querySelector('tbody tr.total-row');
        if (totalRow) {
            const totalCell = totalRow.querySelector('td.price-cell');
            if (totalCell) {
                // Format số với dấu chấm phân cách hàng nghìn
                const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                totalCell.textContent = formattedTotal + ' VND';
            }
        }
    }

    // Vô hiệu hóa các sự kiện chặn click trên dropdown
    function disableBlockingEvents() {
        // Danh sách các dropdown cần xử lý
        const dropdownIds = [
            'mainboard',
            'ram',
            'cpu',
            'vga',
            'ssd',
            'psu',
            'case',
            'cpuCooler',
            'hdd',
            'monitor'
        ];

        dropdownIds.forEach(id => {
            const select = document.getElementById(id);
            if (!select) return;

            // Xóa các event handler ngăn chặn
            select.onmousedown = null;
            select.onclick = null;
            select.onmouseover = null;
            select.onfocus = null;

            // Thêm sự kiện click mới
            select.addEventListener('click', function(e) {
                e.stopPropagation();
            });

            // Đảm bảo select có thể focus
            select.tabIndex = 0;
        });

        // Xóa các sự kiện chặn click trên document
        const originalAddEventListener = document.addEventListener;
        document.addEventListener = function(type, listener, options) {
            if (type === 'click' || type === 'mousedown') {
                // Bỏ qua các sự kiện chặn click
                return;
            }
            return originalAddEventListener.call(document, type, listener, options);
        };

        console.log('✅ Đã vô hiệu hóa các sự kiện chặn dropdown');
    }

    // Thêm button để fix dropdown
    function addFixButton() {
        // Kiểm tra nút đã tồn tại chưa
        if (document.getElementById('fix-dropdown-button')) {
            return;
        }

        // Tạo button
        const button = document.createElement('button');
        button.id = 'fix-dropdown-button';
        button.textContent = 'SỬA LỖI DROPDOWN';
        button.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 99999;
            background-color: #ff3333;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 15px;
            cursor: pointer;
            font-weight: bold;
        `;

        // Thêm sự kiện click
        button.addEventListener('click', function() {
            fixDropdowns();
            button.textContent = 'ĐÃ SỬA DROPDOWN';
            button.style.backgroundColor = '#4CAF50';
        });

        // Thêm vào trang
        document.body.appendChild(button);
    }

    // Hàm fix tất cả dropdown
    function fixDropdowns() {
        addFixStyles();
        replaceDropdowns();
        disableBlockingEvents();
        console.log('✅ Đã sửa lỗi dropdown');
    }

    // Thực thi khi trang đã tải xong
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(fixDropdowns, 500); // Trì hoãn một chút để đảm bảo DOM đã sẵn sàng
            addFixButton();
        });
    } else {
        setTimeout(fixDropdowns, 500);
        addFixButton();
    }

    // Thêm hàm vào window để có thể gọi từ bên ngoài
    window.fixDropdowns = fixDropdowns;
})(); 