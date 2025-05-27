// CPU data
const cpuData = {
    "1220v3": {
        name: "Intel Xeon E3-1220 v3",
        price: 300000,
        image: "/images/intel-xeon-e3-1220v3.jpg",
        brand: "Intel",
        warranty: "12 tháng",
        socket: "LGA1150",
        cores: 4,
        threads: 4,
        technology: "22nm",
        ram_support: "DDR3",
        ram_bus: "1600MHz",
        condition: "2ND",
        score: 2
    },
    "9100f": {
        name: "Intel Core i3-9100f",
        price: 500000,
        image: "/images/intel-core-i3-9100f.jpg",
        brand: "Intel",
        warranty: "12 tháng",
        socket: "LGA1151-v2",
        cores: 4,
        threads: 4,
        technology: "14nm",
        ram_support: "DDR4",
        ram_bus: "2400MHz",
        condition: "2ND",
        score: 3
    },
    "10400f": {
        name: "Intel Core i5-10400F",
        price: 1500000,
        image: "/images/intel-core-i5-10400f.jpg",
        brand: "Intel",
        warranty: "36 tháng",
        socket: "LGA1200",
        cores: 6,
        threads: 12,
        technology: "14nm",
        ram_support: "DDR4",
        ram_bus: "2666MHz",
        condition: "New",
        score: 5
    },
    "12400f": {
        name: "Intel Core i5-12400F",
        price: 3500000,
        image: "/images/intel-core-i5-12400f.jpg",
        brand: "Intel",
        warranty: "36 tháng",
        socket: "LGA1700",
        cores: 6,
        threads: 12,
        technology: "10nm",
        ram_support: "DDR4/DDR5",
        ram_bus: "3200MHz",
        condition: "New",
        score: 7
    },
    "13400f": {
        name: "Intel Core i5-13400F",
        price: 4900000,
        image: "/images/intel-core-i5-13400f.jpg",
        brand: "Intel",
        warranty: "36 tháng",
        socket: "LGA1700",
        cores: 10,
        threads: 16,
        technology: "10nm",
        ram_support: "DDR4/DDR5",
        ram_bus: "3200MHz",
        condition: "New",
        score: 8
    },
    "13600k": {
        name: "Intel Core i5-13600K",
        price: 8500000,
        image: "/images/intel-core-i5-13600kf.jpg",
        brand: "Intel",
        warranty: "36 tháng",
        socket: "LGA1700",
        cores: 14,
        threads: 20,
        technology: "10nm",
        ram_support: "DDR4/DDR5",
        ram_bus: "3200MHz",
        condition: "New",
        score: 9
    }
};

// Mainboard data
const mainboardData = {
    "H81": {
        name: "ASUS H81M-E (LGA1150 - Cũ)",
        price: 450000,
        image: "/images/gigabyte-h110m-ds2.jpg",
        brand: "ASUS (Cũ)",
        warranty: "1 tháng",
        sockets: ["LGA1150"],
        memoryType: "DDR3",
        condition: "2ND",
        nvmeSlots: 0,
        pcieVersion: "2.0",
        formFactor: "Micro-ATX",
        score: 2
    },
    "H510": {
        name: "MSI H510M PRO (LGA1200)",
        price: 1800000,
        image: "/images/msi-pro-h610m-b-ddr4.jpg",
        brand: "MSI",
        warranty: "36 tháng",
        sockets: ["LGA1200"],
        memoryType: "DDR4",
        condition: "New",
        nvmeSlots: 1,
        pcieVersion: "4.0",
        formFactor: "Micro-ATX",
        score: 5
    },
    "HNZ-B760": {
        name: "ASUS PRIME B760M-K D4 (LGA1700)",
        price: 3500000,
        image: "/images/mainboard-asus-prime-b760m-k-ddr4.jpg",
        brand: "ASUS",
        warranty: "36 tháng",
        sockets: ["LGA1700"],
        memoryType: "DDR4",
        condition: "New",
        nvmeSlots: 2,
        pcieVersion: "4.0",
        formFactor: "Micro-ATX",
        score: 7
    },
    "MSI-Z690": {
        name: "MSI PRO Z690-A DDR4 (LGA1700)",
        price: 5000000,
        image: "/images/mainboard-msi-pro-b760m-e-ddr4.jpg",
        brand: "MSI",
        warranty: "36 tháng",
        sockets: ["LGA1700"],
        memoryType: "DDR4",
        condition: "New",
        nvmeSlots: 3,
        pcieVersion: "5.0",
        formFactor: "ATX",
        score: 8
    },
    "B450": {
        name: "MSI B450M-A PRO MAX (AM4)",
        price: 1100000,
        image: "/images/msi-b450m-a-pro-max-2.jpg",
        brand: "MSI",
        warranty: "36 tháng",
        sockets: ["AM4"],
        memoryType: "DDR4",
        condition: "New",
        nvmeSlots: 1,
        pcieVersion: "3.0",
        formFactor: "Micro-ATX",
        score: 4
    },
    "JGINYUE-B450": {
        name: "JGinyue B450M-TI (AM4)",
        price: 1390000,
        image: "/images/jginyue-b450m-ti.jpg",
        brand: "JGinyue",
        warranty: "36 tháng",
        sockets: ["AM4"],
        memoryType: "DDR4",
        condition: "New",
        nvmeSlots: 1,
        pcieVersion: "3.0",
        formFactor: "Micro-ATX",
        score: 4
    },
    "JGINYUE-B650": {
        name: "JGinyue B650M-D (AM5)",
        price: 1900000,
        image: "/images/jginyue-b650m-d.jpg",
        brand: "JGinyue",
        warranty: "36 tháng",
        sockets: ["AM5"],
        memoryType: "DDR5",
        condition: "New",
        nvmeSlots: 2,
        pcieVersion: "4.0",
        formFactor: "Micro-ATX",
        score: 6
    }
};

// VGA data
const vgaData = {
    "960": {
        name: "NVIDIA GeForce GTX 960 2GB",
        price: 1200000,
        image: "/images/gtx960.jpg",
        brand: "NVIDIA",
        warranty: "12 tháng",
        memory: "2GB GDDR5",
        bus: "PCI-Express 3.0",
        condition: "2ND",
        score: 2
    },
    "1050ti": {
        name: "NVIDIA GeForce GTX 1050Ti 4GB",
        price: 1500000,
        image: "/images/1050ti-4gb.jpg",
        brand: "NVIDIA",
        warranty: "12 tháng",
        memory: "4GB GDDR5",
        bus: "PCI-Express 3.0",
        condition: "2ND",
        score: 3
    },
    "1060-3g": {
        name: "NVIDIA GeForce GTX 1060 3GB",
        price: 2200000,
        image: "/images/1060-3gb-msi.jpg",
        brand: "NVIDIA",
        warranty: "12 tháng",
        memory: "3GB GDDR5",
        bus: "PCI-Express 3.0",
        condition: "2ND",
        score: 4
    },
    "1660s": {
        name: "NVIDIA GeForce GTX 1660 Super",
        price: 3500000,
        image: "/images/1660-super-6gb-gigabyte.jpg",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "6GB GDDR6",
        bus: "PCI-Express 3.0",
        condition: "New",
        score: 5
    },
    "2060t": {
        name: "NVIDIA GeForce RTX 2060 6GB",
        price: 4500000,
        image: "/images/rtx-2060-6gb-msi.jpg",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "6GB GDDR6",
        bus: "PCI-Express 3.0",
        condition: "New",
        score: 6
    },
    "2060s": {
        name: "NVIDIA GeForce RTX 2060 Super",
        price: 5800000,
        image: "https://via.placeholder.com/150x150.png?text=RTX+2060+Super",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "8GB GDDR6",
        bus: "PCI-Express 3.0",
        condition: "New",
        score: 6
    },
    "2070s": {
        name: "NVIDIA GeForce RTX 2070 Super",
        price: 6500000,
        image: "https://via.placeholder.com/150x150.png?text=RTX+2070+Super",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "8GB GDDR6",
        bus: "PCI-Express 3.0",
        condition: "New",
        score: 7
    },
    "3060": {
        name: "NVIDIA GeForce RTX 3060",
        price: 7000000,
        image: "https://via.placeholder.com/150x150.png?text=RTX+3060",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "12GB GDDR6",
        bus: "PCI-Express 4.0",
        condition: "New",
        score: 7
    },
    "3060ti": {
        name: "NVIDIA GeForce RTX 3060 Ti",
        price: 8500000,
        image: "https://via.placeholder.com/150x150.png?text=RTX+3060+Ti",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "8GB GDDR6X",
        bus: "PCI-Express 4.0",
        condition: "New",
        score: 7
    },
    "3070": {
        name: "NVIDIA GeForce RTX 3070",
        price: 10000000,
        image: "https://via.placeholder.com/150x150.png?text=RTX+3070",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "8GB GDDR6",
        bus: "PCI-Express 4.0",
        condition: "New",
        score: 8
    },
    "3070ti": {
        name: "NVIDIA GeForce RTX 3070 Ti",
        price: 11000000,
        image: "https://via.placeholder.com/150x150.png?text=RTX+3070+Ti",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "8GB GDDR6X",
        bus: "PCI-Express 4.0",
        condition: "New",
        score: 8
    },
    "3080": {
        name: "NVIDIA GeForce RTX 3080",
        price: 13000000,
        image: "https://via.placeholder.com/150x150.png?text=RTX+3080",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "10GB GDDR6X",
        bus: "PCI-Express 4.0",
        condition: "New",
        score: 9
    },
    "4060": {
        name: "NVIDIA GeForce RTX 4060",
        price: 8000000,
        image: "https://via.placeholder.com/150x150.png?text=RTX+4060",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "8GB GDDR6",
        bus: "PCI-Express 4.0",
        condition: "New",
        score: 8
    },
    "4070": {
        name: "NVIDIA GeForce RTX 4070",
        price: 15000000,
        image: "https://via.placeholder.com/150x150.png?text=RTX+4070",
        brand: "NVIDIA",
        warranty: "36 tháng",
        memory: "12GB GDDR6X",
        bus: "PCI-Express 4.0",
        condition: "New",
        score: 9
    }
};

// RAM data
const ramData = {
    "FURY-8": {
        name: "Kingston FURY Beast 8GB DDR4 3200MHz",
        price: 450000,
        image: "/images/ram-kingston-fury-beast-8gb.jpg",
        brand: "Kingston",
        warranty: "Lifetime",
        memoryType: "DDR4",
        capacity: "8GB",
        speed: "3200MHz",
        formFactor: "DIMM",
        condition: "New",
        score: 3
    },
    "FURY-16": {
        name: "Kingston FURY Beast 16GB DDR4 3200MHz",
        price: 800000,
        image: "/images/ram-kingston-fury-beast-16gb.jpg",
        brand: "Kingston",
        warranty: "Lifetime",
        memoryType: "DDR4",
        capacity: "16GB",
        speed: "3200MHz",
        formFactor: "DIMM",
        condition: "New",
        score: 5
    },
    "CORSAIR-LPX-8": {
        name: "Corsair Vengeance LPX 8GB DDR4 3200MHz",
        price: 500000,
        image: "/images/ram-corsair-vengeance-lpx-8gb-ddr4-3200.jpg",
        brand: "Corsair",
        warranty: "Lifetime",
        memoryType: "DDR4",
        capacity: "8GB",
        speed: "3200MHz",
        formFactor: "DIMM",
        condition: "New",
        score: 4
    },
    "CORSAIR-LPX-16": {
        name: "Corsair Vengeance LPX 16GB DDR4 3200MHz",
        price: 700000,
        image: "/images/ram-corsair-vengeance-lpx-16gb-ddr4-3200.jpg",
        brand: "Corsair",
        warranty: "Lifetime",
        memoryType: "DDR4",
        capacity: "16GB",
        speed: "3200MHz",
        formFactor: "DIMM",
        condition: "New",
        score: 6
    },
    "CORSAIR-DDR5-16": {
        name: "Corsair Vengeance 16GB DDR5 5200MHz",
        price: 1700000,
        image: "/images/ram-corsair-vengeance-16gb-ddr5-5200.jpg",
        brand: "Corsair",
        warranty: "Lifetime",
        memoryType: "DDR5",
        capacity: "16GB",
        speed: "5200MHz",
        formFactor: "DIMM",
        condition: "New",
        score: 8
    },
    "XPG-32-DDR5": {
        name: "ADATA XPG LANCER 32GB DDR5 5200MHz",
        price: 3000000,
        image: "/images/ram-adata-xpg-32gb-ddr5-5200.jpg",
        brand: "ADATA",
        warranty: "Lifetime",
        memoryType: "DDR5",
        capacity: "32GB",
        speed: "5200MHz",
        formFactor: "DIMM",
        condition: "New",
        score: 9
    }
};

// SSD data
const ssdData = {
    "NVME-256": {
        name: "SSTC Oceanic Whitetip 256GB NVMe",
        price: 500000,
        image: "/images/sstc-oceanic-whitetip-256gb.jpg",
        brand: "SSTC",
        warranty: "36 tháng",
        capacity: "256GB",
        interface: "PCIe 3.0 x4",
        readSpeed: "2100 MB/s",
        writeSpeed: "1100 MB/s",
        formFactor: "M.2 2280",
        condition: "New",
        score: 4
    },
    "NVME-512": {
        name: "SSTC Oceanic Whitetip 512GB NVMe",
        price: 800000,
        image: "/images/sstc-oceanic-whitetip-512gb.jpg",
        brand: "SSTC",
        warranty: "36 tháng",
        capacity: "512GB",
        interface: "PCIe 3.0 x4",
        readSpeed: "2400 MB/s",
        writeSpeed: "1800 MB/s",
        formFactor: "M.2 2280",
        condition: "New",
        score: 6
    },
    "SATA-512": {
        name: "Samsung 870 EVO 512GB SATA",
        price: 1100000,
        image: "/images/samsung-980-500gb.jpg",
        brand: "Samsung",
        warranty: "36 tháng",
        capacity: "512GB",
        interface: "SATA III",
        readSpeed: "560 MB/s",
        writeSpeed: "530 MB/s",
        formFactor: "2.5-inch",
        condition: "New",
        score: 5
    },
    "Samsung-990-1TB": {
        name: "Samsung 990 EVO Plus 1TB NVMe",
        price: 2500000,
        image: "/images/samsung-990-evoplus-1tb.jpg",
        brand: "Samsung",
        warranty: "60 tháng",
        capacity: "1TB",
        interface: "PCIe 4.0 x4",
        readSpeed: "7450 MB/s",
        writeSpeed: "6600 MB/s",
        formFactor: "M.2 2280",
        condition: "New",
        score: 9
    }
};

// Cases data
const caseData = {
    "XIGMATEK-CUBI": {
        name: "Xigmatek CUBI M Black",
        price: 500000,
        image: "/images/xigmatek-cubi-m-black.jpg",
        brand: "Xigmatek",
        warranty: "12 tháng",
        formFactor: "Micro-ATX",
        material: "SPCC Steel, ABS",
        color: "Black",
        dimensions: "380 x 190 x 380 mm",
        psuLocation: "Top",
        condition: "New",
        score: 3
    },
    "XIGMATEK-NANO": {
        name: "Xigmatek CUBI M NANO M-ATX Black",
        price: 600000,
        image: "/images/xigmatek-cubi-m-nano-m-atx-black.jpg",
        brand: "Xigmatek",
        warranty: "12 tháng",
        formFactor: "Micro-ATX",
        material: "SPCC Steel, ABS",
        color: "Black",
        dimensions: "370 x 180 x 380 mm",
        psuLocation: "Top",
        condition: "New",
        score: 4
    },
    "XIGMATEK-GEMINI": {
        name: "Xigmatek GEMINI M (No Fan)",
        price: 800000,
        image: "/images/xigmatek-gemini-m-no-fan.jpg",
        brand: "Xigmatek",
        warranty: "12 tháng",
        formFactor: "Micro-ATX",
        material: "SPCC Steel, Tempered Glass",
        color: "Black",
        dimensions: "385 x 220 x 440 mm",
        psuLocation: "Bottom",
        condition: "New",
        score: 5
    },
    "XIGMATEK-NYX": {
        name: "Xigmatek NYX Air 3F",
        price: 1200000,
        image: "/images/xigmatek-nyx-air-3f.jpg",
        brand: "Xigmatek",
        warranty: "12 tháng",
        formFactor: "ATX",
        material: "SPCC Steel, Tempered Glass",
        color: "Black",
        dimensions: "440 x 210 x 450 mm",
        psuLocation: "Bottom",
        condition: "New",
        score: 6
    }
};

// CPU Cooler data
const cpuCoolerData = {
    "INTEL-STOCK": {
        name: "Intel Stock Cooler",
        price: 0,
        image: "/images/stock-intel-cooler.jpg",
        brand: "Intel",
        warranty: "12 tháng",
        type: "Air",
        socket: "LGA1200/1700",
        tdp: "65W",
        condition: "New",
        score: 1
    },
    "PA-120-SE": {
        name: "Thermalright Peerless Assassin 120 SE ARGB",
        price: 800000,
        image: "/images/thermalright-peerless-assassin-120-se-argb.jpg",
        brand: "Thermalright",
        warranty: "12 tháng",
        type: "Air",
        socket: "LGA1700/1200/AM4/AM5",
        tdp: "260W",
        condition: "New",
        score: 7
    },
    "FS-140": {
        name: "Thermalright Frost Spirit 140",
        price: 1000000,
        image: "/images/thermalright-frost-spirit-140.jpg",
        brand: "Thermalright",
        warranty: "12 tháng",
        type: "Air",
        socket: "LGA1700/1200/AM4/AM5",
        tdp: "280W",
        condition: "New",
        score: 8
    },
    "JONSBO-CR-1000": {
        name: "Jonsbo CR-1000 RGB",
        price: 300000,
        image: "/images/jonsbo-cr-1000-rgb.jpg",
        brand: "Jonsbo",
        warranty: "12 tháng",
        type: "Air",
        socket: "LGA1700/1200/AM4/AM5",
        tdp: "125W",
        condition: "New",
        score: 5
    },
    "AQUA-ELITE-360": {
        name: "Thermalright Aqua Elite 360 ARGB Black",
        price: 2500000,
        image: "/images/thermalright-aqua-elite-360-argb-black.jpg",
        brand: "Thermalright",
        warranty: "12 tháng",
        type: "Liquid",
        socket: "LGA1700/1200/AM4/AM5",
        tdp: "380W",
        condition: "New",
        score: 9
    }
};

// PSU data
const psuData = {
    "VSP-450W": {
        name: "VSP Delta P350W",
        price: 350000,
        image: "/images/vsp-delta-p350w.jpg",
        brand: "VSP",
        warranty: "24 tháng",
        power: "350W",
        efficiency: "80%",
        modular: "Non-modular",
        condition: "New",
        score: 2
    },
    "VSP-650W": {
        name: "VSP Elite DT660 650W",
        price: 650000,
        image: "/images/vsp-elite-dt660-650w.jpg",
        brand: "VSP",
        warranty: "36 tháng",
        power: "650W",
        efficiency: "80% Bronze",
        modular: "Non-modular",
        condition: "New",
        score: 4
    },
    "VSP-750W": {
        name: "VSP VGP750BRN 80Plus Bronze 750W",
        price: 1000000,
        image: "/images/vsp-vgp750brn-80plus-bronze-750w.jpg",
        brand: "VSP",
        warranty: "36 tháng",
        power: "750W",
        efficiency: "80+ Bronze",
        modular: "Semi-modular",
        condition: "New",
        score: 6
    },
    "CORSAIR-750W": {
        name: "Corsair CV750 750W",
        price: 1200000,
        image: "/images/nguon-corsair-cv750.jpg",
        brand: "Corsair",
        warranty: "36 tháng",
        power: "750W",
        efficiency: "80+ Bronze",
        modular: "Non-modular",
        condition: "New",
        score: 6
    },
    "CORSAIR-850W": {
        name: "Corsair RM850e 850W",
        price: 2500000,
        image: "/images/nguon-corsair-rm850e.jpg",
        brand: "Corsair",
        warranty: "60 tháng",
        power: "850W",
        efficiency: "80+ Gold",
        modular: "Full-modular",
        condition: "New",
        score: 8
    }
};

// HDD data
const hddData = {
    "WD-BLUE-500GB": {
        name: "Western Digital Blue 500GB SATA",
        price: 400000,
        image: "/images/wd-blue-500gb.jpg",
        brand: "Western Digital",
        warranty: "24 tháng",
        capacity: "500GB",
        interface: "SATA III",
        rpm: "7200 RPM",
        cacheSize: "64MB",
        formFactor: "3.5-inch",
        condition: "New",
        score: 3
    },
    "WD-BLUE-1TB": {
        name: "Western Digital Blue 1TB SATA",
        price: 700000,
        image: "/images/wd-blue-1tb.jpg",
        brand: "Western Digital",
        warranty: "24 tháng",
        capacity: "1TB",
        interface: "SATA III",
        rpm: "7200 RPM",
        cacheSize: "64MB",
        formFactor: "3.5-inch",
        condition: "New",
        score: 4
    },
    "WD-BLUE-2TB": {
        name: "Western Digital Blue 2TB SATA",
        price: 1200000,
        image: "/images/wd-blue-2tb.jpg",
        brand: "Western Digital",
        warranty: "24 tháng",
        capacity: "2TB",
        interface: "SATA III",
        rpm: "5400 RPM",
        cacheSize: "256MB",
        formFactor: "3.5-inch",
        condition: "New",
        score: 5
    },
    "SEAGATE-SKYHAWK-4TB": {
        name: "Seagate SkyHawk 4TB SATA",
        price: 2200000,
        image: "/images/seagate-skyhawk-4tb.jpg",
        brand: "Seagate",
        warranty: "36 tháng",
        capacity: "4TB",
        interface: "SATA III",
        rpm: "5900 RPM",
        cacheSize: "256MB",
        formFactor: "3.5-inch",
        condition: "New",
        score: 7
    },
    "SEAGATE-IRONWOLF-4TB": {
        name: "Seagate IronWolf Pro 4TB SATA",
        price: 2900000,
        image: "/images/seagate-ironwolf-pro-4tb.jpg",
        brand: "Seagate",
        warranty: "36 tháng",
        capacity: "4TB",
        interface: "SATA III",
        rpm: "7200 RPM",
        cacheSize: "128MB",
        formFactor: "3.5-inch",
        condition: "New",
        score: 8
    }
};

// Monitor data
const monitorData = {
    "SAMSUNG-ODYSSEY-G4": {
        name: "Samsung Odyssey G4 LS25BG400EEXXV",
        price: 3800000,
        image: "/images/samsung-odyssey-g4-ls25bg400eexxv.jpg",
        brand: "Samsung",
        warranty: "24 tháng",
        screenSize: "25\"",
        resolution: "1920x1080",
        refreshRate: "240Hz",
        panelType: "IPS",
        responseTime: "1ms",
        inputs: ["HDMI", "DisplayPort"],
        condition: "New",
        score: 7
    },
    "LG-27GS75Q-B": {
        name: "LG UltraGear 27GS75Q-B",
        price: 6500000,
        image: "/images/lg-ultragear-27gs75q-b.jpg",
        brand: "LG",
        warranty: "24 tháng",
        screenSize: "27\"",
        resolution: "2560x1440",
        refreshRate: "260Hz",
        panelType: "IPS",
        responseTime: "1ms",
        inputs: ["HDMI", "DisplayPort"],
        condition: "New",
        score: 8
    },
    "LG-24GS50F-B": {
        name: "LG UltraGear 24GS50F-B",
        price: 3500000,
        image: "/images/lg-ultragear-24gs50f-b.jpg",
        brand: "LG",
        warranty: "24 tháng",
        screenSize: "24\"",
        resolution: "1920x1080",
        refreshRate: "165Hz",
        panelType: "VA",
        responseTime: "1ms",
        inputs: ["HDMI", "DisplayPort"],
        condition: "New",
        score: 6
    }
}; 