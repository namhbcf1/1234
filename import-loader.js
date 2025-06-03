async function loadComponentData() {
    try {
        console.log('🔄 Đang tải dữ liệu linh kiện từ js/data...');
        
        // Tải dữ liệu linh kiện từ các tệp
        const cpuModule = await import('./js/data/cpu.js').catch(e => console.error('Failed to load CPU data:', e));
        const mainboardModule = await import('./js/data/mainboard.js').catch(e => console.error('Failed to load mainboard data:', e));
        const ramModule = await import('./js/data/ram.js').catch(e => console.error('Failed to load RAM data:', e));
        const vgaModule = await import('./js/data/vga.js').catch(e => console.error('Failed to load VGA data:', e));
        const ssdModule = await import('./js/data/ssd.js').catch(e => console.error('Failed to load SSD data:', e));
        const psuModule = await import('./js/data/psu.js').catch(e => console.error('Failed to load PSU data:', e));
        const caseModule = await import('./js/data/case.js').catch(e => console.error('Failed to load case data:', e));
        const cpuCoolerModule = await import('./js/data/cpuCooler.js').catch(e => console.error('Failed to load CPU cooler data:', e));
        const hddModule = await import('./js/data/hdd.js').catch(e => console.error('Failed to load HDD data:', e));
        const monitorModule = await import('./js/data/monitor.js').catch(e => console.error('Failed to load monitor data:', e));
        const configsModule = await import('./js/configs/index.js').catch(e => console.error('Failed to load configs:', e));

        // Kiểm tra nếu bất kỳ module nào không tải được
        if (!cpuModule || !vgaModule) {
            console.error('❌ Không thể tải các module dữ liệu quan trọng.');
            return false;
        } else {
            // Gán dữ liệu vào đối tượng window
            window.cpuData = cpuModule && cpuModule.cpuData ? { ...cpuModule.cpuData } : {};
            window.mainboardData = mainboardModule && mainboardModule.mainboardData ? { ...mainboardModule.mainboardData } : {};
            window.ramData = ramModule && ramModule.ramData ? { ...ramModule.ramData } : {};
            window.vgaData = vgaModule && vgaModule.vgaData ? { ...vgaModule.vgaData } : {};
            window.ssdData = ssdModule && ssdModule.ssdData ? { ...ssdModule.ssdData } : {};
            window.psuData = psuModule && psuModule.psuData ? { ...psuModule.psuData } : {};
            window.caseData = caseModule && caseModule.caseData ? { ...caseModule.caseData } : {};
            window.cpuCoolerData = cpuCoolerModule && cpuCoolerModule.cpuCoolerData ? { ...cpuCoolerModule.cpuCoolerData } : {};
            window.hddData = hddModule && hddModule.hddData ? { ...hddModule.hddData } : {};
            window.monitorData = monitorModule && monitorModule.monitorData ? { ...monitorModule.monitorData } : {};
            
            // Log số lượng mục được tải cho mỗi loại linh kiện
            console.log('✅ Đã tải dữ liệu linh kiện:');
            console.log(`- CPU: ${Object.keys(window.cpuData).length} mục`);
            console.log(`- Mainboard: ${Object.keys(window.mainboardData).length} mục`);
            console.log(`- VGA: ${Object.keys(window.vgaData).length} mục`);
            console.log(`- RAM: ${Object.keys(window.ramData).length} mục`);
            console.log(`- SSD: ${Object.keys(window.ssdData).length} mục`);
            console.log(`- PSU: ${Object.keys(window.psuData).length} mục`);
            console.log(`- Case: ${Object.keys(window.caseData).length} mục`);
            console.log(`- CPU Cooler: ${Object.keys(window.cpuCoolerData).length} mục`);
            console.log(`- HDD: ${Object.keys(window.hddData).length} mục`);
            console.log(`- Monitor: ${Object.keys(window.monitorData).length} mục`);
            
            // Phát sự kiện để thông báo rằng dữ liệu đã được tải
            const componentDataLoadedEvent = new CustomEvent('component-data-loaded', {
                detail: {
                    source: 'js/data',
                    timestamp: new Date().toISOString()
                }
            });
            document.dispatchEvent(componentDataLoadedEvent);
            
            return true;
        }
    } catch (error) {
        console.error('❌ Lỗi khi tải dữ liệu linh kiện:', error);
        return false;
    }
}

// Tải dữ liệu ngay khi tệp được thực thi
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Bắt đầu tải dữ liệu linh kiện...');
    loadComponentData();
});

// Xuất hàm ra bên ngoài
export { loadComponentData };

// Đảm bảo tương thích ngược với các tính năng cũ
// Cầu nối với code cũ sử dụng window.getConfig, window.intelConfigs, window.amdConfigs
window.getConfig = async function(cpuType, gameId, budgetKey) {
    console.warn('⚠️ Deprecated: window.getConfig is being used, should migrate to dynamic import');
    
    try {
        // Chuyển đổi budget sang định dạng chuẩn
        if (typeof budgetKey === 'number') {
            budgetKey = `${budgetKey}M`;
        } else if (typeof budgetKey === 'string' && /^[0-9]+$/.test(budgetKey)) {
            budgetKey = `${budgetKey}M`;
        }
        
        // Chuẩn hóa CPU type
        const finalCpuType = cpuType.toLowerCase().includes('amd') ? 'amd' : 'intel';
        
        // Import động file cấu hình
        const configPath = `./js/configs/${finalCpuType}/${gameId}.js`;
        console.log(`🔍 Đang tìm file cấu hình qua getConfig: ${configPath}`);
        
        const configModule = await import(configPath).catch(e => {
            console.error(`❌ Không thể import file cấu hình ${configPath}:`, e);
            return null;
        });
        
        if (!configModule) return null;
        
        // Xử lý các loại export khác nhau
        let configResult = null;
        
        if (configModule.configs) {
            configResult = configModule.configs[budgetKey];
        } else if (configModule.config) {
            configResult = configModule.config[budgetKey];
        } else if (configModule.default) {
            const defaultConfig = typeof configModule.default === 'function' 
                ? configModule.default(budgetKey) 
                : configModule.default;
            configResult = defaultConfig[budgetKey];
        }
        
        return configResult;
    } catch (e) {
        console.error('Error in legacy getConfig:', e);
        return null;
    }
};

// Tạo đối tượng giả cho window.intelConfigs và window.amdConfigs
// Chỉ để tương thích ngược với code cũ
const createProxyConfigs = (cpuType) => {
    return new Proxy({}, {
        get: function(target, gameId) {
            console.warn(`⚠️ Deprecated: window.${cpuType}Configs is being accessed, should migrate to dynamic import`);
            if (typeof gameId !== 'string' || gameId === 'length' || gameId.startsWith('_')) {
                return undefined;
            }
            
            // Trả về một proxy cho mỗi game
            return new Proxy({}, {
                get: function(target, budgetKey) {
                    if (typeof budgetKey !== 'string' || budgetKey === 'length' || budgetKey.startsWith('_')) {
                        return undefined;
                    }
                    
                    // Khi truy cập đến budget, tải động file
                    console.log(`🔍 Truy cập qua window.${cpuType}Configs['${gameId}']['${budgetKey}']`);
                    
                    // Không thể dùng await ở đây, nên trả về null
                    // Trong thực tế, code sử dụng cách này đã được thay thế bằng dynamic import
                    return null;
                }
            });
        }
    });
};

window.intelConfigs = createProxyConfigs('intel');
window.amdConfigs = createProxyConfigs('amd'); 