/**
 * File hỗ trợ tự động chọn cấu hình PC
 * Cung cấp các hàm để tự động chọn cấu hình dựa trên game, ngân sách và loại CPU
 */

// Hàm cập nhật giá trị dropdown với nhiều phương pháp tìm kiếm
function updateDropdownEnhanced(id, value) {
    const dropdown = document.getElementById(id);
    if (!dropdown) {
        console.error(`Dropdown with id ${id} not found`);
        return false;
    }

    // Nếu value không được cung cấp, không làm gì cả
    if (!value) {
        console.warn(`No value provided for dropdown ${id}`);
        return false;
    }

    // In ra tất cả options có sẵn để debug
    const optionsText = Array.from(dropdown.options)
        .map(opt => `${opt.value} (${opt.text})`)
        .join(', ');
    // console.log(`Available options for ${id}: ${optionsText}`);

    // Tìm option phù hợp
    let foundOption = false;
    let optionToSelect = null;
    const valueToSearch = value.toString().toLowerCase();

    // Phương pháp 1: Tìm chính xác theo value
    for (let i = 0; i < dropdown.options.length; i++) {
        const option = dropdown.options[i];
        if (option.value && option.value.toLowerCase() === valueToSearch) {
            optionToSelect = option;
            foundOption = true;
            // console.log(`Found exact value match for ${id}: ${option.text}`);
            break;
        }
    }

    // Phương pháp 2: Tìm chính xác theo text
    if (!foundOption) {
        for (let i = 0; i < dropdown.options.length; i++) {
            const option = dropdown.options[i];
            if (option.text && option.text.toLowerCase() === valueToSearch) {
                optionToSelect = option;
                foundOption = true;
                // console.log(`Found exact text match for ${id}: ${option.text}`);
                break;
            }
        }
    }

    // Phương pháp 3: Tìm option có chứa value
    if (!foundOption) {
        for (let i = 0; i < dropdown.options.length; i++) {
            const option = dropdown.options[i];
            // Kiểm tra nếu value nằm trong option.value hoặc option.text
            if ((option.value && option.value.toLowerCase().includes(valueToSearch)) || 
                (option.text && option.text.toLowerCase().includes(valueToSearch))) {
                optionToSelect = option;
                foundOption = true;
                // console.log(`Found partial match for ${id}: ${option.text} (searched for ${value})`);
                break;
            }
        }
    }
    
    // Phương pháp 4: Tìm tương tự với các từ khóa chính
    if (!foundOption) {
        const keywords = valueToSearch.split(/[-_\s.]+/); // Tách theo dấu gạch ngang, gạch dưới, khoảng trắng
        for (let i = 0; i < dropdown.options.length; i++) {
            const option = dropdown.options[i];
            const optionText = (option.text || '').toLowerCase();
            const optionValue = (option.value || '').toLowerCase();
            
            // Kiểm tra nếu text hoặc value chứa bất kỳ từ khóa nào
            const matchingKeywords = keywords.filter(keyword => 
                (keyword.length > 1) && (optionText.includes(keyword) || optionValue.includes(keyword))
            );
            
            if (matchingKeywords.length > 0) {
                optionToSelect = option;
                foundOption = true;
                // console.log(`Found keyword match for ${id}: ${option.text} (matched keywords: ${matchingKeywords.join(', ')})`);
                break;
            }
        }
    }

    // Phương pháp 5: Dùng option đầu tiên không phải là disabled & placeholder
    if (!foundOption) {
        for (let i = 0; i < dropdown.options.length; i++) {
            const option = dropdown.options[i];
            if (!option.disabled && option.value && option.value !== "null" && option.value !== "") {
                optionToSelect = option;
                foundOption = true;
                // console.log(`Using first available option for ${id}: ${option.text}`);
                break;
            }
        }
    }

    // Cập nhật giá trị dropdown nếu tìm thấy option
    if (foundOption && optionToSelect) {
        // Lưu lại giá trị hiện tại
        const currentValue = dropdown.value;
        
        // Cập nhật dropdown
        dropdown.value = optionToSelect.value;
        
        // Chỉ kích hoạt sự kiện change nếu giá trị thực sự thay đổi
        if (currentValue !== optionToSelect.value) {
            // Kích hoạt sự kiện change để cập nhật giao diện
            const event = new Event('change', { bubbles: true });
            dropdown.dispatchEvent(event);
            // console.log(`Updated ${id} dropdown to: ${optionToSelect.text}`);
        } else {
            // console.log(`${id} dropdown already set to: ${optionToSelect.text}`);
        }
        
        return true;
    } else {
        console.warn(`Could not find suitable option for ${id} with value ${value}`);
        
        // Nếu tất cả phương pháp đều thất bại, chọn một giá trị mặc định dựa trên loại dropdown
        const defaultSelections = {
            'cpu': null,
            'mainboard': null,
            'vga': null,
            'ram': null,
            'ssd': null,
            'cpuCooler': null,
            'psu': null,
            'case': null
        };
        
        if (defaultSelections[id]) {
            // console.log(`Selecting default option for ${id}: ${defaultSelections[id].text}`);
            dropdown.value = defaultSelections[id].value;
            const event = new Event('change', { bubbles: true });
            dropdown.dispatchEvent(event);
            return true;
        }
        
        return false;
    }
}

// Hàm chọn option đầu tiên không rỗng
function selectFirstNonEmptyOption(dropdown) {
    for (let i = 1; i < dropdown.options.length; i++) { // Bắt đầu từ 1 để bỏ qua option đầu tiên (thường là placeholder)
        const option = dropdown.options[i];
        if (option && !option.disabled && option.value && option.value !== "null" && option.value !== "") {
            return option;
        }
    }
    return null;
}

// Hàm trả về option placeholder (option đầu tiên)
function selectPlaceholderOption(dropdown) {
    if (dropdown.options.length > 0) {
        return dropdown.options[0];
    }
    return null;
}

// Cập nhật giá sau khi chọn cấu hình
function updateComponentPricesFixed() {
    // Kiểm tra xem hàm updateComponentPrices có tồn tại trong window không
    if (typeof window.updateComponentPrices === 'function') {
        window.updateComponentPrices();
    } else {
        console.log('Sử dụng hàm cập nhật giá thay thế');
        
        // Cập nhật giá và thành tiền cho các linh kiện
        const componentTypes = ['cpu', 'mainboard', 'ram', 'vga', 'ssd', 'cpuCooler', 'psu', 'case', 'hdd', 'monitor'];
        let totalPrice = 0;
        
        componentTypes.forEach(type => {
            const element = document.getElementById(type);
            const priceEl = document.getElementById(`${type}-price`);
            const totalEl = document.getElementById(`${type}-total`);
            
            if (element && element.value && priceEl && totalEl) {
                const option = element.options[element.selectedIndex];
                if (option) {
                    let price = 0;
                    
                    // Trích xuất giá từ text nếu có định dạng như "Tên - XXX,XXX VNĐ"
                    const text = option.text || '';
                    const priceMatch = text.match(/(\d[\d\s,\.]*)\s*VNĐ/);
                    if (priceMatch && priceMatch[1]) {
                        price = parseInt(priceMatch[1].replace(/[\s,\.]/g, ''), 10);
                    }
                    
                    priceEl.textContent = formatPriceFixed(price);
                    totalEl.textContent = formatPriceFixed(price);
                    totalPrice += price;
                }
            }
        });
        
        // Cập nhật tổng tiền trên trang
        const totalPriceDisplay = document.querySelector('#total-price p');
        if (totalPriceDisplay) {
            totalPriceDisplay.textContent = formatPriceFixed(totalPrice) + ' VNĐ';
        }
        
        // Cập nhật tổng tiền trong bảng
        const totalPriceCell = document.getElementById('total-price-cell');
        if (totalPriceCell) {
            totalPriceCell.textContent = formatPriceFixed(totalPrice);
        }
    }
}

// Định dạng giá tiền
function formatPriceFixed(price) {
    return price ? price.toLocaleString() : "0";
}

// Hàm tự động chọn cấu hình dựa trên game, ngân sách và loại CPU
async function autoSelectConfigEnhanced(gameId, budget, cpuType) {
    console.log(`Enhanced autoSelectConfig with: gameId=${gameId}, budget=${budget}, cpuType=${cpuType}`);
    
    if (!gameId || !budget || !cpuType) {
        console.warn('Missing required parameters for autoSelectConfig');
        return null;
    }

    try {
        // Định dạng budget key
        const budgetInMillions = Math.floor(budget / 1000000);
        console.log(`Budget value in millions: ${budgetInMillions}M`);
        const budgetKey = `${budgetInMillions}M`;
        
        // Sử dụng import động thay vì window.intelConfigs/window.amdConfigs
        const cpuFolder = cpuType.toLowerCase() === 'intel' ? 'intel' : 'amd';
        const configPath = `./js/configs/${cpuFolder}/${gameId}.js`;
        console.log(`🔍 Enhanced helper đang tìm file cấu hình: ${configPath}`);
        
        let configResult = null;
        
        try {
            const configModule = await import(configPath).catch(e => {
                console.error(`❌ Không thể import file cấu hình ${configPath}:`, e);
                return null;
            });
            
            if (configModule) {
                // Hỗ trợ nhiều cách export khác nhau
                if (configModule.configs) {
                    configResult = configModule.configs;
                    console.log(`✅ Đã tìm thấy config export dạng: configModule.configs`);
                } else if (configModule.config) {
                    configResult = configModule.config;
                    console.log(`✅ Đã tìm thấy config export dạng: configModule.config`);
                } else if (configModule.default) {
                    // Trường hợp export default
                    if (typeof configModule.default === 'object') {
                        configResult = configModule.default;
                        console.log(`✅ Đã tìm thấy config export dạng: export default {...}`);
                    } else if (typeof configModule.default === 'function') {
                        // Trường hợp export default function() { return {...} }
                        configResult = configModule.default(budgetKey);
                        console.log(`✅ Đã tìm thấy config export dạng: export default function`);
                    }
                } else if (Object.keys(configModule).length > 0) {
                    // Trường hợp module.exports = {...} hoặc export cả module
                    const firstKey = Object.keys(configModule)[0];
                    if (typeof configModule[firstKey] === 'object' && configModule[firstKey] !== null) {
                        configResult = configModule[firstKey];
                        console.log(`✅ Đã tìm thấy config export với key: ${firstKey}`);
                    } else {
                        configResult = configModule;
                        console.log(`✅ Đã tìm thấy config export toàn bộ module`);
                    }
                }
                
                // Log cấu trúc module để debug
                console.log(`📋 Cấu trúc configModule:`, Object.keys(configModule));
            }
        } catch (e) {
            console.error(`❌ Lỗi khi xử lý file cấu hình:`, e);
        }
        
        if (!configResult) {
            console.warn(`No configuration found for ${cpuType} ${gameId}`);
            return null;
        }
        
        // Lấy các mức ngân sách có sẵn
        const availableBudgets = Object.keys(configResult)
            .filter(key => /^\d+M$/.test(key))  // Chỉ lấy key dạng "12M", "15M", ...
            .map(budgetKey => parseInt(budgetKey.replace('M', '')));
        
        console.log(`Available budgets for ${gameId}:`, availableBudgets);
        
        // Tìm mức ngân sách gần nhất
        let closestBudget;
        let config;
        
        if (availableBudgets.length === 0) {
            // Nếu không có budget nào, kiểm tra xem config có phải là config cho một budget cụ thể không
            if (typeof configResult === 'object' && 
                configResult.cpu && configResult.mainboard && configResult.ram) {
                // Đây là một config trực tiếp, không phân theo budget
                config = configResult;
                console.log(`✅ Đã tìm thấy cấu hình trực tiếp không phân theo budget`);
            } else {
                console.warn(`❌ Không tìm thấy cấu hình phù hợp cho ${cpuType} ${gameId} ${budgetKey}`);
                return null;
            }
        } else {
            // Tìm budget gần nhất
            closestBudget = availableBudgets.reduce((prev, curr) => 
                Math.abs(curr - budgetInMillions) < Math.abs(prev - budgetInMillions) ? curr : prev,
                availableBudgets[0] // Giá trị khởi tạo là phần tử đầu tiên
            );
            
            const closestBudgetKey = `${closestBudget}M`;
            console.log(`Using closest available budget: ${closestBudgetKey} for requested budget: ${budgetInMillions}M`);
            
            config = configResult[closestBudgetKey];
        }
        
        if (!config) {
            console.warn(`No configuration found for ${cpuType} ${gameId} with budget ${budgetKey}`);
            return null;
        }
        
        console.log('⚙️ Config found:', config);
        
        // Cập nhật các dropdown theo cấu hình
        if (config.cpu) updateDropdownEnhanced('cpu', config.cpu);
        if (config.mainboard) updateDropdownEnhanced('mainboard', config.mainboard);
        if (config.vga) updateDropdownEnhanced('vga', config.vga);
        if (config.ram) updateDropdownEnhanced('ram', config.ram);
        if (config.ssd) updateDropdownEnhanced('ssd', config.ssd);
        if (config.case) updateDropdownEnhanced('case', config.case);
        if (config.cpuCooler) updateDropdownEnhanced('cpuCooler', config.cpuCooler);
        if (config.psu) updateDropdownEnhanced('psu', config.psu);
        
        // Cập nhật giá và tổng tiền sau khi tất cả các dropdown được cập nhật
        setTimeout(function() {
            try {
                // Kiểm tra tương thích giữa các linh kiện
                ensureCompatibleComponents();

                // Cập nhật giá
                updateComponentPricesFixed();
                console.log('Price table updated after auto-selection');
                
                // Hiển thị bảng cấu hình sau khi chọn tất cả linh kiện
                const configTable = document.getElementById('config-table');
                if (configTable) {
                    // Hiển thị bảng
                    configTable.style.display = 'block';
                    
                    // Cập nhật hình ảnh và thông tin trong bảng
                    if (typeof window.updateConfigTableImages === 'function') {
                        try {
                            window.updateConfigTableImages();
                            console.log('Configuration table images updated successfully');
                        } catch (error) {
                            console.error('Error updating configuration table images:', error);
                        }
                    }
                    
                    // Cuộn trang đến bảng cấu hình
                    configTable.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                // Hiển thị modal chi tiết nếu có
                if (typeof window.showConfigDetailModal === 'function') {
                    console.log('Showing configuration detail modal');
                    window.showConfigDetailModal();
                }
            } catch (error) {
                console.error('Error updating configuration after auto-selection:', error);
            }
        }, 1000); // Tăng delay để đảm bảo đủ thời gian tải dữ liệu
        
        return config;
    } catch (error) {
        console.error('Error in autoSelectConfigEnhanced:', error);
        return null;
    }
}

// Kiểm tra tương thích socket giữa CPU và Mainboard
function ensureCompatibleComponents() {
    const cpuSelect = document.getElementById('cpu');
    const mainboardSelect = document.getElementById('mainboard');
    const ramSelect = document.getElementById('ram');
    
    if (!cpuSelect || !mainboardSelect) {
        return; // Không đủ thông tin để kiểm tra
    }
    
    // Lấy thông tin CPU
    const cpuData = window.getComponentData ? window.getComponentData('CPU', cpuSelect.value) : null;
    // Lấy thông tin Mainboard
    const mainboardData = window.getComponentData ? window.getComponentData('Mainboard', mainboardSelect.value) : null;
    // Lấy thông tin RAM
    const ramData = window.getComponentData ? window.getComponentData('RAM', ramSelect.value) : null;
    
    if (!cpuData) {
        return; // Không đủ dữ liệu để kiểm tra
    }
    
    // Kiểm tra socket tương thích
    let cpuSocket = cpuData.socket || '';
    if (!cpuSocket) {
        // Xác định socket dựa vào tên CPU
        const cpuName = cpuData.name.toLowerCase();
        if (cpuName.includes('ryzen') || cpuName.includes('amd')) {
            if (cpuName.includes('5600x') || cpuName.includes('5700x') || cpuName.includes('5800x') || cpuName.includes('5900x') || cpuName.includes('5950x')) {
                cpuSocket = 'AM4';
            } else if (cpuName.includes('7600x') || cpuName.includes('7700x') || cpuName.includes('7900x') || cpuName.includes('7950x') || cpuName.includes('7800x3d')) {
                cpuSocket = 'AM5';
            } else if (cpuName.includes('3600') || cpuName.includes('3700x') || cpuName.includes('3800x')) {
                cpuSocket = 'AM4';
            } else {
                cpuSocket = 'AM4'; // Mặc định cho AMD Ryzen
            }
        } else if (cpuName.includes('intel') || cpuName.includes('core i')) {
            if (cpuName.includes('12') || cpuName.includes('13') || cpuName.includes('14')) {
                cpuSocket = 'LGA1700';
            } else if (cpuName.includes('10') || cpuName.includes('11')) {
                cpuSocket = 'LGA1200';
            } else if (cpuName.includes('8') || cpuName.includes('9')) {
                cpuSocket = 'LGA1151';
            } else if (cpuName.includes('6') || cpuName.includes('7')) {
                cpuSocket = 'LGA1151';
            } else {
                cpuSocket = 'LGA1700'; // Mặc định cho Intel mới
            }
        }
    }
    
    // Hiển thị thông báo socket CPU
    const socketMessage = document.getElementById('socket-message');
    if (socketMessage) {
        socketMessage.textContent = `CPU Socket: ${cpuSocket}`;
        socketMessage.style.display = 'block';
    }
    
    // Kiểm tra tương thích mainboard
    if (mainboardData) {
        let mainboardSocket = mainboardData.socket || '';
        if (!mainboardSocket) {
            // Xác định socket dựa vào tên mainboard
            const mainboardName = mainboardData.name.toLowerCase();
            if (mainboardName.includes('b450') || mainboardName.includes('b550') || mainboardName.includes('x570')) {
                mainboardSocket = 'AM4';
            } else if (mainboardName.includes('b650') || mainboardName.includes('x670')) {
                mainboardSocket = 'AM5';
            } else if (mainboardName.includes('b660') || mainboardName.includes('z690') || mainboardName.includes('z790')) {
                mainboardSocket = 'LGA1700';
            } else if (mainboardName.includes('b460') || mainboardName.includes('b560') || mainboardName.includes('z490') || mainboardName.includes('z590')) {
                mainboardSocket = 'LGA1200';
            } else if (mainboardName.includes('h310') || mainboardName.includes('b360') || mainboardName.includes('b365') || mainboardName.includes('z370') || mainboardName.includes('z390')) {
                mainboardSocket = 'LGA1151';
            } else if (mainboardName.includes('h110') || mainboardName.includes('b150') || mainboardName.includes('z170') || mainboardName.includes('z270')) {
                mainboardSocket = 'LGA1151';
            }
        }
        
        // Hiển thị thông báo socket mainboard
        if (socketMessage) {
            socketMessage.textContent += ` | Mainboard Socket: ${mainboardSocket}`;
        }
        
        // Kiểm tra tương thích CPU - Mainboard
        if (cpuSocket && mainboardSocket && cpuSocket !== mainboardSocket) {
            console.warn(`Socket không tương thích: CPU (${cpuSocket}) và Mainboard (${mainboardSocket})`);
            
            // Tìm mainboard tương thích với CPU đã chọn
            if (cpuSocket.includes('AM4')) {
                // Chọn mainboard AMD AM4
                const amdMainboards = ['GIGA-B450', 'JGINYUE-B450', 'GIGA-B550', 'asrock-b550m-se', 'gigabyte-b550m-gaming-wifi'];
                for (const mainboardId of amdMainboards) {
                    updateDropdownEnhanced('mainboard', mainboardId);
                    break;
                }
            } else if (cpuSocket.includes('AM5')) {
                // Chọn mainboard AMD AM5
                const amdMainboards = ['JGINYUE-B650', 'JGINYUE-B650-PRO', 'ASROCK-B650M-HDV-M2', 'MSI-PRO-B650M-P'];
                for (const mainboardId of amdMainboards) {
                    updateDropdownEnhanced('mainboard', mainboardId);
                    break;
                }
            } else if (cpuSocket.includes('LGA1151') || cpuSocket.includes('LGA1200')) {
                // Chọn mainboard Intel cũ
                const intelMainboards = ['H310', 'B360', 'B365', 'H410', 'B460'];
                for (const mainboardId of intelMainboards) {
                    updateDropdownEnhanced('mainboard', mainboardId);
                    break;
                }
            } else if (cpuSocket.includes('LGA1700')) {
                // Chọn mainboard Intel mới
                const intelMainboards = ['ASUS-H610', 'MSI-H610', 'HNZ-H610', 'ASUS-B760', 'MSI-B760', 'B760M-E'];
                for (const mainboardId of intelMainboards) {
                    updateDropdownEnhanced('mainboard', mainboardId);
                    break;
                }
            }
        }
    }
    
    // Kiểm tra tương thích RAM
    if (ramData && cpuSocket) {
        let ramType = '';
        const ramName = ramData.name.toLowerCase();
        
        if (ramName.includes('ddr5')) {
            ramType = 'DDR5';
        } else if (ramName.includes('ddr4')) {
            ramType = 'DDR4';
        } else if (ramName.includes('ddr3')) {
            ramType = 'DDR3';
        }
        
        // Hiển thị thông báo loại RAM
        if (socketMessage) {
            socketMessage.textContent += ` | RAM Type: ${ramType}`;
        }
        
        // AM4 chỉ tương thích với DDR4
        if (cpuSocket === 'AM4' && ramType === 'DDR5') {
            console.warn('CPU AM4 không tương thích với RAM DDR5');
            
            // Chọn RAM DDR4 phù hợp
            const ddr4Rams = ['cosair-16', 'cosair-32', 'fury-16', 'adata-16', 'tridentz-16'];
            for (const ramId of ddr4Rams) {
                updateDropdownEnhanced('ram', ramId);
                break;
            }
        }
        
        // AM5 chỉ tương thích với DDR5
        if (cpuSocket === 'AM5' && ramType === 'DDR4') {
            console.warn('CPU AM5 chỉ tương thích với RAM DDR5');
            
            // Chọn RAM DDR5 phù hợp
            const ddr5Rams = ['Cosair-16-5200', 'tridentz-16-6000', 'tridentz-32-6000', 'adata-32-6000'];
            for (const ramId of ddr5Rams) {
                updateDropdownEnhanced('ram', ramId);
                break;
            }
        }
        
        // LGA1700 tương thích với cả DDR4 và DDR5 tùy mainboard
        if (cpuSocket === 'LGA1700' && mainboardData) {
            const mainboardName = mainboardData.name.toLowerCase();
            // Nếu mainboard hỗ trợ DDR4 nhưng RAM là DDR5 hoặc ngược lại
            if ((mainboardName.includes('ddr4') && ramType === 'DDR5') ||
                (mainboardName.includes('ddr5') && ramType === 'DDR4')) {
                console.warn('RAM không tương thích với mainboard');
                
                if (mainboardName.includes('ddr4')) {
                    // Chọn RAM DDR4 phù hợp
                    const ddr4Rams = ['cosair-16', 'cosair-32', 'fury-16', 'adata-16', 'tridentz-16'];
                    for (const ramId of ddr4Rams) {
                        updateDropdownEnhanced('ram', ramId);
                        break;
                    }
                } else {
                    // Chọn RAM DDR5 phù hợp
                    const ddr5Rams = ['Cosair-16-5200', 'tridentz-16-6000', 'tridentz-32-6000', 'adata-32-6000'];
                    for (const ramId of ddr5Rams) {
                        updateDropdownEnhanced('ram', ramId);
                        break;
                    }
                }
            }
        }
    }
    
    // Hiển thị các thông báo phù hợp
    if (socketMessage) {
        socketMessage.style.backgroundColor = '#e7f3fe';
        socketMessage.style.border = '1px solid #b6dcfe';
        socketMessage.style.color = '#0c5460';
        socketMessage.style.padding = '10px';
        socketMessage.style.borderRadius = '5px';
        socketMessage.style.marginTop = '10px';
        socketMessage.style.marginBottom = '10px';
    }
}

// Kiểm tra và chạy tự động chọn cấu hình khi đủ 3 tiêu chí
async function checkAndRunAutoSelectEnhanced() {
    const gameGenre = document.getElementById('game-genre').value;
    const budget = parseInt(document.getElementById('budget-range').value);
    const cpuType = document.getElementById('cpu-type').value;
    
    console.log('Checking criteria for auto-selection:');
    console.log('- Game:', gameGenre);
    console.log('- Budget:', budget);
    console.log('- CPU Type:', cpuType);
    
    if (gameGenre && budget && cpuType) {
        console.log('✅ All criteria met. Running enhanced autoSelectConfig.');
        try {
            // Chạy hàm tự động chọn cấu hình nâng cao
            await autoSelectConfigEnhanced(gameGenre, budget, cpuType);
        } catch (error) {
            console.error('Error in enhanced autoSelectConfig:', error);
        }
    } else {
        console.log('❌ Not all criteria are met for auto-selection.');
    }
}

// Xuất các hàm để sử dụng trong các module khác
if (typeof window !== 'undefined') {
    window.updateDropdownEnhanced = updateDropdownEnhanced;
    window.autoSelectConfigEnhanced = autoSelectConfigEnhanced;
    window.checkAndRunAutoSelectEnhanced = checkAndRunAutoSelectEnhanced;
    
    // Ghi đè lên các hàm cũ để cải thiện chức năng
    window.updateDropdown = updateDropdownEnhanced;
    window.autoSelectConfig = autoSelectConfigEnhanced;
    window.checkAndRunAutoSelect = checkAndRunAutoSelectEnhanced;
    
    console.log('Enhanced auto-config functions registered successfully');
}

// Khi trang tải xong, chỉ đăng ký sự kiện, không tự động chọn cấu hình
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing enhanced auto-config helper');
    
    // Không tự động chọn cấu hình khi trang tải xong
    // setTimeout(checkAndRunAutoSelectEnhanced, 1500); // Đã tắt tính năng tự động chọn
    
    // Thêm event listeners cho các thay đổi
    const gameGenre = document.getElementById('game-genre');
    const budgetRange = document.getElementById('budget-range');
    const cpuType = document.getElementById('cpu-type');
    
    if (gameGenre) {
        gameGenre.addEventListener('change', function() {
            checkAndRunAutoSelectEnhanced().catch(e => console.error('Error in autoSelect after game change:', e));
        });
    }
    
    if (budgetRange) {
        budgetRange.addEventListener('change', function() {
            checkAndRunAutoSelectEnhanced().catch(e => console.error('Error in autoSelect after budget change:', e));
        });
        
        budgetRange.addEventListener('input', function() {
            // Cập nhật hiển thị ngân sách
            const budgetValue = document.getElementById('budget-value');
            if (budgetValue) {
                const budgetInMillion = parseInt(this.value) / 1000000;
                budgetValue.textContent = budgetInMillion + ' triệu';
            }
        });
    }
    
    if (cpuType) {
        cpuType.addEventListener('change', function() {
            checkAndRunAutoSelectEnhanced().catch(e => console.error('Error in autoSelect after CPU type change:', e));
        });
    }
    
    console.log('Enhanced auto-config event listeners registered successfully');
}); 