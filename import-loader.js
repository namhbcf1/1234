
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