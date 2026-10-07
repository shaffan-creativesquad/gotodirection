import type { SpecGroup } from "./schema";

export type SeedCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  icon: string;
};

export type SeedProduct = {
  partNumber: string;
  title: string;
  shortTitle: string;
  category: string;
  manufacturer: string;
  price: number;
  listPrice: number;
  condition: "New" | "New Open Box" | "Refurbished";
  upc: string;
  stock: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  overview: string;
  highlights: string[];
  specs: SpecGroup[];
};

export const seedCategories: SeedCategory[] = [
  {
    slug: "network-switches",
    name: "Network Switches",
    tagline: "Managed, PoE & stackable switching for every wiring closet",
    description:
      "Layer 2 and Layer 3 managed switches from HPE Aruba, Cisco and Dell — gigabit access, 10/25/50GbE uplinks and Class 4 PoE for access points, IP cameras and VoIP handsets. Every unit is tested, firmware checked and backed by our warranty.",
    imageUrl: "/images/cat-switches.jpg",
    icon: "🔀",
  },
  {
    slug: "servers",
    name: "Servers & Workstations",
    tagline: "Rack, tower and node servers configured to order",
    description:
      "Enterprise rack servers and workstations built on Xeon Scalable and EPYC platforms. Choose your CPU, memory and drive configuration — we burn-in test every build before it ships.",
    imageUrl: "/images/cat-servers.jpg",
    icon: "🖥️",
  },
  {
    slug: "hard-drives-ssds",
    name: "Hard Drives & SSDs",
    tagline: "SAS, SATA and NVMe storage for servers and desktops",
    description:
      "Enterprise-class hard drives and solid state drives — 10K/15K SAS, nearline SATA, mixed-use NVMe and M.2 gaming SSDs. All drives are health-tested with SMART reports available on request.",
    imageUrl: "/images/cat-drives.jpg",
    icon: "💽",
  },
  {
    slug: "memory-ram",
    name: "Server Memory (RAM)",
    tagline: "ECC RDIMM, LRDIMM and desktop memory modules",
    description:
      "Registered and load-reduced ECC memory guaranteed compatible with your HPE, Dell, Lenovo or Supermicro platform. Need a full bank? Ask us for matched-kit pricing.",
    imageUrl: "/images/cat-memory.jpg",
    icon: "🧠",
  },
  {
    slug: "motherboards",
    name: "Motherboards & System Boards",
    tagline: "Server, workstation and proprietary system boards",
    description:
      "Hard-to-find server system boards and workstation motherboards for single and multi-socket platforms, including legacy spares that keep production systems alive.",
    imageUrl: "/images/cat-motherboards.jpg",
    icon: "🧩",
  },
  {
    slug: "power-supplies",
    name: "Power Supplies",
    tagline: "Hot-swap redundant and internal ATX power modules",
    description:
      "Redundant hot-plug PSUs, internal ATX units and storage-array power modules with matching connector pinouts. Every PSU is load tested before dispatch.",
    imageUrl: "/images/cat-power.jpg",
    icon: "⚡",
  },
  {
    slug: "transceivers-cables",
    name: "Transceivers & Cables",
    tagline: "SFP, SFP+, QSFP optics and DAC assemblies",
    description:
      "OEM and compatible optical transceivers, direct attach copper and fiber patch assemblies — coded for your switch platform so links come up first time.",
    imageUrl: "/images/cat-transceivers.jpg",
    icon: "🔌",
  },
  {
    slug: "printers-scanners",
    name: "Printers & Barcode Scanners",
    tagline: "Thermal label printers and rugged barcode imagers",
    description:
      "Direct thermal and thermal transfer label printers plus 1D/2D handheld scanners from Zebra, Honeywell, Brother and Datalogic for warehouse, retail and healthcare workflows.",
    imageUrl: "/images/cat-printers.jpg",
    icon: "🖨️",
  },
];

export const seedManufacturers: { slug: string; name: string; blurb: string }[] =
  [
    { slug: "hpe", name: "HPE / Aruba", blurb: "Networking, servers and storage" },
    { slug: "dell", name: "Dell EMC", blurb: "PowerEdge servers and PowerVault storage" },
    { slug: "cisco", name: "Cisco", blurb: "Catalyst switching and routing" },
    { slug: "supermicro", name: "Supermicro", blurb: "Server boards and barebone systems" },
    { slug: "seagate", name: "Seagate", blurb: "Enterprise hard drives" },
    { slug: "western-digital", name: "Western Digital", blurb: "SSD and HDD storage" },
    { slug: "samsung", name: "Samsung", blurb: "Memory and solid state storage" },
    { slug: "intel", name: "Intel", blurb: "Processors, NICs and SSDs" },
    { slug: "kingston", name: "Kingston", blurb: "Server and desktop memory" },
    { slug: "lenovo", name: "Lenovo", blurb: "ThinkSystem servers and options" },
    { slug: "delta", name: "Delta Electronics", blurb: "Power supplies and cooling" },
    { slug: "zebra", name: "Zebra", blurb: "Barcode printers and scanners" },
    { slug: "honeywell", name: "Honeywell", blurb: "Industrial scanning and printing" },
    { slug: "brother", name: "Brother", blurb: "Mobile and desktop label printers" },
  ];

const g = (title: string, rows: [string, string][]): SpecGroup => ({
  title,
  rows: rows.map(([label, value]) => ({ label, value })),
});

export const seedProducts: SeedProduct[] = [
  // ---------------- Network switches ----------------
  {
    partNumber: "JL665A",
    title:
      "HPE Aruba CX 6300F 48 x 1000Base-T RJ-45 Class 4 PoE + 4 x 50GbE SFP56 Layer 3 Managed Stackable Switch",
    shortTitle: "Aruba CX 6300F 48-Port PoE Switch",
    category: "network-switches",
    manufacturer: "hpe",
    price: 5901.03,
    listPrice: 6083.54,
    condition: "New",
    upc: "190017339528",
    stock: 14,
    rating: 4.9,
    reviewCount: 36,
    featured: true,
    bestSeller: true,
    overview:
      "The Aruba CX 6300F (JL665A) is the switch to look at when you are standardising wiring closets across a campus. Fifty-two ports in a 1U chassis — 48 gigabit RJ-45 access ports with Class 4 PoE plus four 50GbE SFP56 uplink/stacking ports — mean access points, IP cameras and VoIP phones draw power and data from one cable while uplinks stay congestion free. Layer 3 routing handles inter-VLAN traffic on the switch itself, and 32 GB of onboard flash keeps firmware and config backups local. Front-and-side-to-back airflow and a 17.4-inch rack width drop it straight into any standard 19-inch rack.",
    highlights: [
      "48 x 1GbE Class 4 PoE access ports and 4 x 50GbE SFP56 uplink/stacking ports",
      "Layer 3 static and dynamic routing with VSF stacking up to 10 members",
      "880 Gbps system switching capacity, 660 Mpps throughput",
      "32 GB onboard flash for firmware images and configuration rollback",
      "Aruba Network Analytics Engine with built-in NetEdit support",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Aruba CX 6300F"],
        ["Model", "6300F 48-port 1GbE Class 4 PoE and 4-port SFP56"],
        ["Product Type", "Layer 3 Managed Switch"],
        ["Package Type", "Retail"],
      ]),
      g("Ports & Interfaces", [
        ["Network Ports", "48 x Gigabit Ethernet RJ-45 (Class 4 PoE)"],
        ["Uplink Ports", "4 x 50 Gigabit Ethernet SFP56"],
        ["Total Network Ports", "52"],
        ["Console Management Port", "Yes"],
        ["USB Port", "Yes"],
        ["Flash Storage Memory", "32 GB"],
      ]),
      g("Power", [
        ["PoE Support", "Yes — Class 4 PoE / PoE+"],
        ["Power Source", "Internal Power Supply"],
        ["Power Input", "AC Input"],
      ]),
      g("Physical Characteristics", [
        ["Form Factor", "Rack-mountable"],
        ["Supported Rack", "1U"],
        ["Airflow", "Front-and-side-to-back"],
        ["Dimensions (H x W x D)", "1.73 in x 17.4 in x 12.9 in"],
        ["Weight", "11.2 lbs (5.10 kg)"],
      ]),
    ],
  },
  {
    partNumber: "J4093-69001",
    title:
      "HP ProCurve 2424M 24 x RJ-45 10/100Base-TX Layer 2 Managed Rack-Mountable Fast Ethernet Switch",
    shortTitle: "HP ProCurve 2424M 24-Port Switch",
    category: "network-switches",
    manufacturer: "hpe",
    price: 257.5,
    listPrice: 273.94,
    condition: "Refurbished",
    upc: "088698375921",
    stock: 7,
    rating: 4.6,
    reviewCount: 18,
    overview:
      "A dependable legacy workhorse for lab benches, isolated OT networks and spares inventory. The ProCurve 2424M gives you 24 auto-sensing 10/100 ports, two transceiver slots for fibre uplinks and full web, CLI and SNMP management. Units are cleaned, firmware updated to the final supported release and burn-in tested before shipping, so you can keep an ageing deployment running without redesigning around a modern platform.",
    highlights: [
      "24 auto-sensing 10/100Base-TX RJ-45 ports",
      "Two expansion slots for 100Base-FX / gigabit transceiver modules",
      "Web, CLI, telnet and SNMP v1/v2c management",
      "Professionally tested with the final supported firmware release",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "HP ProCurve"],
        ["Model", "Switch 2424M"],
        ["Product Type", "Layer 2 Managed Switch"],
      ]),
      g("Ports & Interfaces", [
        ["Network Ports", "24 x 10/100Base-TX RJ-45"],
        ["Expansion Slots", "2 (transceiver modules)"],
        ["Console Port", "Yes (DB-9 serial)"],
        ["MAC Address Table", "8,000 entries"],
      ]),
      g("Physical Characteristics", [
        ["Form Factor", "Rack-mountable"],
        ["Supported Rack", "1U"],
        ["Power Input", "100-240V AC, 50/60Hz"],
        ["Weight", "8.4 lbs"],
      ]),
    ],
  },
  {
    partNumber: "WS-C2960X-48FPD-L",
    title:
      "Cisco Catalyst 2960-X 48 x GigE PoE+ 740W + 2 x 10G SFP+ Layer 2 Managed LAN Base Switch",
    shortTitle: "Cisco Catalyst 2960-X 48-Port PoE+ Switch",
    category: "network-switches",
    manufacturer: "cisco",
    price: 1289.0,
    listPrice: 1420.5,
    condition: "New Open Box",
    upc: "882658575273",
    stock: 11,
    rating: 4.8,
    reviewCount: 41,
    bestSeller: true,
    overview:
      "The Catalyst 2960-X remains one of the most deployed access switches in the world, and for good reason: 48 gigabit PoE+ ports with a 740 W budget, two 10G SFP+ uplinks and FlexStack-Plus for stacking up to eight units into a single logical switch. LAN Base software gives you full VLAN, QoS and ACL control, while EnergyWise and port hibernation cut idle power draw. Ideal for offices rolling out Wi-Fi 6 access points and PoE cameras on a budget.",
    highlights: [
      "48 x 10/100/1000 PoE+ ports with 740W total PoE budget",
      "2 x 10 Gigabit SFP+ uplinks for fibre or DAC aggregation",
      "FlexStack-Plus stacking: up to 8 units, 80 Gbps stack bandwidth",
      "LAN Base feature set with QoS, ACLs and 1,023 active VLANs",
      "EnergyWise power management and USB console access",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Cisco Catalyst 2960-X Series"],
        ["Software Image", "LAN Base"],
        ["Product Type", "Layer 2 Managed Switch"],
      ]),
      g("Ports & Interfaces", [
        ["Access Ports", "48 x 10/100/1000Base-T PoE+"],
        ["Uplink Ports", "2 x 10G SFP+"],
        ["Stacking", "FlexStack-Plus (80 Gbps)"],
        ["Switching Capacity", "216 Gbps"],
        ["Forwarding Rate", "107.1 Mpps"],
      ]),
      g("Power", [
        ["PoE Budget", "740 Watts"],
        ["Power Supply", "Internal, fixed"],
        ["Input Voltage", "100-240V AC"],
      ]),
      g("Physical Characteristics", [
        ["Form Factor", "1U Rack-mountable"],
        ["Dimensions (H x W x D)", "1.73 in x 17.5 in x 14.9 in"],
        ["Weight", "16.1 lbs"],
      ]),
    ],
  },
  {
    partNumber: "JL368A",
    title: "HPE Aruba 8400 Management Switch Module",
    shortTitle: "Aruba 8400 Management Module",
    category: "network-switches",
    manufacturer: "hpe",
    price: 800.0,
    listPrice: 842.11,
    condition: "New",
    upc: "190017174785",
    stock: 5,
    rating: 4.7,
    reviewCount: 9,
    overview:
      "Redundant management module for the Aruba 8400 core chassis. Fit a second module to remove the control plane as a single point of failure — the standby module keeps a synchronised copy of the running configuration and takes over on failure without dropping forwarding traffic. Hot-swappable from the front of the chassis with its own console, out-of-band management and USB ports.",
    highlights: [
      "Hot-swappable redundant management module for Aruba 8400 chassis",
      "Active/standby control plane with configuration synchronisation",
      "Dedicated out-of-band management, console and USB ports",
      "Supports AOS-CX with Network Analytics Engine",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Aruba 8400 Series"],
        ["Product Type", "Management Module"],
        ["Compatible Chassis", "Aruba 8400 8-slot chassis"],
      ]),
      g("Features", [
        ["Redundancy", "Active / standby"],
        ["Hot Swappable", "Yes"],
        ["Management Interfaces", "Console, OOBM Ethernet, USB"],
        ["Operating System", "AOS-CX"],
      ]),
    ],
  },
  {
    partNumber: "R8N88A",
    title:
      "HPE Aruba 6000 24G 4SFP — 24 x RJ-45 1000Base-T + 4 x SFP Layer 3 Managed 1U Gigabit Switch",
    shortTitle: "Aruba 6000 24G 4SFP Switch",
    category: "network-switches",
    manufacturer: "hpe",
    price: 905.51,
    listPrice: 963.31,
    condition: "New",
    upc: "190017595924",
    stock: 22,
    rating: 4.8,
    reviewCount: 27,
    featured: true,
    overview:
      "Aruba Instant On-class simplicity with enterprise AOS-CX foundations. The 6000 24G 4SFP gives small and branch sites 24 gigabit copper ports and four SFP uplinks in a fanless-friendly 1U chassis, managed locally or through Aruba Central. Static routing, VLAN segmentation and 802.1X all come as standard, backed by HPE's limited lifetime warranty.",
    highlights: [
      "24 x 1000Base-T RJ-45 ports plus 4 x 1G SFP uplinks",
      "Layer 3 static routing and ACL/QoS policy support",
      "Cloud management ready via Aruba Central",
      "Limited lifetime manufacturer warranty, factory sealed",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Aruba CX 6000 Series"],
        ["Product Type", "Layer 3 Managed Switch"],
        ["Package Type", "Retail — factory sealed"],
      ]),
      g("Ports & Interfaces", [
        ["Access Ports", "24 x Gigabit Ethernet RJ-45"],
        ["Uplink Ports", "4 x SFP 1G"],
        ["Switching Capacity", "56 Gbps"],
        ["MAC Table", "16,000 entries"],
      ]),
      g("Physical Characteristics", [
        ["Form Factor", "1U Rack-mountable"],
        ["Airflow", "Side-to-side"],
        ["Weight", "7.3 lbs"],
      ]),
    ],
  },

  // ---------------- Servers ----------------
  {
    partNumber: "POWEREDGE-R740XD",
    title:
      "Dell PowerEdge R740xd 2U Rack Server — 2 x Xeon Gold 6230, 256GB DDR4, 24 x 2.5\" Bays, H740P, 2 x 1100W",
    shortTitle: "Dell PowerEdge R740xd Rack Server",
    category: "servers",
    manufacturer: "dell",
    price: 4395.0,
    listPrice: 4890.0,
    condition: "Refurbished",
    upc: "884116286509",
    stock: 6,
    rating: 4.9,
    reviewCount: 52,
    featured: true,
    bestSeller: true,
    overview:
      "A storage-dense virtualisation host that still punches well above its price. Two 20-core Xeon Gold 6230 processors and 256 GB of registered DDR4 give you plenty of room for VMware or Proxmox clusters, while 24 hot-swap 2.5-inch bays on a PERC H740P controller handle everything from all-flash vSAN to tiered NL-SAS capacity. Dual 1100 W platinum PSUs, iDRAC9 Enterprise and rails are included — plug it in and start provisioning.",
    highlights: [
      "2 x Intel Xeon Gold 6230 (40 cores / 80 threads total)",
      "256GB DDR4-2933 ECC RDIMM, expandable to 3TB across 24 slots",
      "24 x 2.5-inch hot-swap bays with PERC H740P 8GB cache RAID",
      "iDRAC9 Enterprise with dedicated out-of-band management port",
      "Dual 1100W Platinum hot-plug PSUs and ReadyRails included",
    ],
    specs: [
      g("Processor & Memory", [
        ["Processor", "2 x Intel Xeon Gold 6230 2.1GHz 20-core"],
        ["Cache", "27.5 MB per CPU"],
        ["Installed Memory", "256 GB (8 x 32GB DDR4-2933 RDIMM)"],
        ["Memory Slots", "24 DIMM (max 3TB)"],
      ]),
      g("Storage & Controllers", [
        ["Drive Bays", "24 x 2.5-inch hot-swap SAS/SATA/NVMe"],
        ["RAID Controller", "Dell PERC H740P 8GB NV cache"],
        ["Boot Option", "BOSS M.2 ready"],
      ]),
      g("Networking & Management", [
        ["Network", "4 x 1GbE rNDC (Broadcom 5720)"],
        ["Management", "iDRAC9 Enterprise"],
        ["Expansion", "Up to 8 x PCIe 3.0 slots"],
      ]),
      g("Physical & Power", [
        ["Form Factor", "2U Rack-mountable"],
        ["Power Supplies", "2 x 1100W Platinum hot-plug"],
        ["Weight", "63 lbs"],
      ]),
    ],
  },
  {
    partNumber: "HPE-DL380-G10",
    title:
      "HPE ProLiant DL380 Gen10 2U Server — 2 x Xeon Silver 4214, 128GB DDR4, 8 x SFF Bays, P408i-a, 2 x 800W",
    shortTitle: "HPE ProLiant DL380 Gen10 Server",
    category: "servers",
    manufacturer: "hpe",
    price: 3290.0,
    listPrice: 3780.0,
    condition: "Refurbished",
    upc: "190017212548",
    stock: 9,
    rating: 4.8,
    reviewCount: 44,
    overview:
      "The DL380 Gen10 is the default answer for a general purpose 2U server, and this configuration is tuned for mixed workloads: two 12-core Xeon Silver 4214 CPUs, 128 GB of DDR4 and eight small form factor hot-swap bays behind a Smart Array P408i-a controller. iLO 5 with silicon root of trust covers remote management and firmware integrity, and dual 800 W Flexible Slot PSUs keep power redundant.",
    highlights: [
      "2 x Intel Xeon Silver 4214 2.2GHz (24 cores / 48 threads)",
      "128GB DDR4-2400 ECC RDIMM across 24 DIMM slots",
      "8 x 2.5-inch hot-swap SAS/SATA bays with Smart Array P408i-a",
      "iLO 5 Advanced remote management with silicon root of trust",
      "Dual 800W Flex Slot Platinum power supplies and rail kit",
    ],
    specs: [
      g("Processor & Memory", [
        ["Processor", "2 x Intel Xeon Silver 4214 2.2GHz 12-core"],
        ["Installed Memory", "128 GB (4 x 32GB RDIMM)"],
        ["Memory Type", "DDR4-2400 ECC Registered"],
        ["Maximum Memory", "3 TB"],
      ]),
      g("Storage & Expansion", [
        ["Drive Bays", "8 x 2.5-inch hot-swap SFF"],
        ["Storage Controller", "HPE Smart Array P408i-a 2GB"],
        ["PCIe Slots", "Up to 6 x PCIe 3.0"],
      ]),
      g("Management & Power", [
        ["Remote Management", "HPE iLO 5 Advanced"],
        ["Power Supplies", "2 x 800W Flex Slot Platinum"],
        ["Form Factor", "2U Rack-mountable"],
      ]),
    ],
  },
  {
    partNumber: "SYS-1029P-WTR",
    title:
      "Supermicro SYS-1029P-WTR 1U Barebone Server — Dual LGA3647, 12 x DDR4 DIMM, 4 x 3.5\" Bays, 2 x 750W",
    shortTitle: "Supermicro SYS-1029P-WTR 1U Server",
    category: "servers",
    manufacturer: "supermicro",
    price: 1875.0,
    listPrice: 2050.0,
    condition: "New",
    upc: "672042228317",
    stock: 12,
    rating: 4.7,
    reviewCount: 16,
    overview:
      "A clean 1U canvas for building exactly the node you need. Dual LGA3647 sockets take first or second generation Xeon Scalable CPUs, twelve DIMM slots reach 1.5 TB of registered memory, and four hot-swap 3.5-inch bays cover local storage. Redundant 750 W Titanium PSUs and IPMI 2.0 with dedicated LAN make it a straightforward fit for colocation and HPC cluster nodes.",
    highlights: [
      "Dual Socket P (LGA 3647) for Xeon Scalable processors up to 165W",
      "12 x DDR4 DIMM slots supporting up to 1.5TB ECC RDIMM/LRDIMM",
      "4 x 3.5-inch hot-swap SATA3 drive bays",
      "Dual 10GBase-T LAN plus dedicated IPMI management port",
      "2 x 750W redundant Titanium Level power supplies",
    ],
    specs: [
      g("Platform", [
        ["Chassis", "SC113TQ-R700WB 1U"],
        ["Motherboard", "X11DPL-i"],
        ["CPU Support", "2 x Intel Xeon Scalable (LGA 3647)"],
        ["Chipset", "Intel C621"],
      ]),
      g("Memory & Storage", [
        ["DIMM Slots", "12 x DDR4 (max 1.5TB)"],
        ["Drive Bays", "4 x 3.5-inch hot-swap"],
        ["SATA", "10 x SATA3 (6Gbps)"],
      ]),
      g("Networking & Power", [
        ["LAN", "2 x 10GBase-T, 1 x dedicated IPMI"],
        ["Power", "2 x 750W Redundant Titanium"],
        ["Expansion", "2 x PCIe 3.0 x16, 1 x PCIe 3.0 x8"],
      ]),
    ],
  },
  {
    partNumber: "THINKSYSTEM-SR650",
    title:
      "Lenovo ThinkSystem SR650 2U Server — 2 x Xeon Gold 5218, 192GB DDR4, 8 x SFF, RAID 930-8i, 2 x 750W",
    shortTitle: "Lenovo ThinkSystem SR650 Server",
    category: "servers",
    manufacturer: "lenovo",
    price: 3650.0,
    listPrice: 4120.0,
    condition: "Refurbished",
    upc: "889488461745",
    stock: 4,
    rating: 4.8,
    reviewCount: 21,
    overview:
      "Lenovo's SR650 has topped more SPEC benchmark charts than any other 2U two-socket server, and this build keeps that reputation intact with two 16-core Xeon Gold 5218 CPUs and 192 GB of DDR4. The RAID 930-8i controller with 2 GB flash-backed cache protects writes, while XClarity Controller Enterprise handles remote media, alerting and firmware updates from a browser.",
    highlights: [
      "2 x Intel Xeon Gold 5218 2.3GHz (32 cores / 64 threads)",
      "192GB DDR4-2666 ECC RDIMM, 24 DIMM slots available",
      "8 x 2.5-inch hot-swap bays, RAID 930-8i with 2GB flash cache",
      "XClarity Controller Enterprise remote management",
      "Dual 750W Platinum hot-swap power supplies",
    ],
    specs: [
      g("Processor & Memory", [
        ["Processor", "2 x Intel Xeon Gold 5218 2.3GHz 16-core"],
        ["Installed Memory", "192 GB (12 x 16GB RDIMM)"],
        ["Maximum Memory", "3 TB (24 DIMM slots)"],
      ]),
      g("Storage", [
        ["Drive Bays", "8 x 2.5-inch hot-swap SAS/SATA"],
        ["RAID", "ThinkSystem RAID 930-8i 2GB flash"],
      ]),
      g("Management & Power", [
        ["Management", "XClarity Controller Enterprise"],
        ["Power Supplies", "2 x 750W Platinum hot-swap"],
        ["Form Factor", "2U Rack-mountable"],
      ]),
    ],
  },

  // ---------------- Storage ----------------
  {
    partNumber: "WDS200T2X0E",
    title:
      "Western Digital Black SN850X 2TB PCIe Gen4 x4 NVMe M.2 2280 Gaming Solid State Drive",
    shortTitle: "WD Black SN850X 2TB NVMe SSD",
    category: "hard-drives-ssds",
    manufacturer: "western-digital",
    price: 574.71,
    listPrice: 598.66,
    condition: "New",
    upc: "718037891057",
    stock: 40,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
    bestSeller: true,
    overview:
      "WD's flagship consumer NVMe drive, and a surprisingly good fit for workstation scratch volumes. Sequential reads hit 7,300 MB/s and writes 6,600 MB/s on a PCIe Gen4 x4 link, with Game Mode 2.0 predictive loading and an adaptive thermal profile that holds clocks under sustained load. A 1,200 TBW endurance rating and five-year warranty make it dependable for editing rigs and developer machines as well as gaming builds.",
    highlights: [
      "Up to 7,300 MB/s sequential read, 6,600 MB/s sequential write",
      "PCIe Gen4 x4 NVMe 1.4, M.2 2280 single-sided form factor",
      "1,200 TBW endurance with 1.75M hours MTTF",
      "Game Mode 2.0 with predictive loading and adaptive thermal management",
      "5-year limited manufacturer warranty",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "WD_BLACK SN850X"],
        ["Capacity", "2 TB"],
        ["Device Type", "Internal Solid State Drive"],
      ]),
      g("Interface & Performance", [
        ["Interface", "PCI Express 4.0 x4 (NVMe 1.4)"],
        ["Sequential Read", "7,300 MB/s"],
        ["Sequential Write", "6,600 MB/s"],
        ["Random Read", "1,200,000 IOPS"],
        ["Random Write", "1,100,000 IOPS"],
        ["NAND Type", "3D TLC NAND"],
      ]),
      g("Reliability & Physical", [
        ["Endurance", "1,200 TBW"],
        ["MTTF", "1,750,000 hours"],
        ["Form Factor", "M.2 2280"],
        ["Warranty", "5 Years Limited"],
      ]),
    ],
  },
  {
    partNumber: "ST31000425SS",
    title:
      "Seagate Constellation ES 1TB 7200RPM SAS 6Gb/s 16MB Cache SED 3.5-Inch Enterprise Hard Drive",
    shortTitle: "Seagate Constellation ES 1TB SAS HDD",
    category: "hard-drives-ssds",
    manufacturer: "seagate",
    price: 343.33,
    listPrice: 365.24,
    condition: "New",
    upc: "763649036488",
    stock: 25,
    rating: 4.6,
    reviewCount: 33,
    overview:
      "Nearline SAS capacity with self-encrypting drive support built in. The Constellation ES runs at 7200 RPM on a 6 Gb/s dual-port SAS interface, rated for 24x7 duty with a 1.2 million hour MTBF. The SED firmware lets you cryptographically erase a drive in seconds at end of life instead of shredding it — useful when your compliance policy covers data destruction.",
    highlights: [
      "1TB capacity, 7200RPM, 3.5-inch enterprise form factor",
      "6Gb/s dual-port SAS interface with 16MB cache",
      "Self-Encrypting Drive (SED) with instant secure erase",
      "24x7 duty rated, 1.2M hours MTBF",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Seagate Constellation ES"],
        ["Capacity", "1 TB"],
        ["Device Type", "Internal Hard Disk Drive"],
      ]),
      g("Interface & Performance", [
        ["Interface", "SAS 6Gb/s (dual port)"],
        ["Rotational Speed", "7,200 RPM"],
        ["Cache", "16 MB"],
        ["Average Latency", "4.16 ms"],
        ["Sustained Transfer Rate", "149 MB/s"],
      ]),
      g("Reliability & Physical", [
        ["Security", "Self-Encrypting Drive (SED)"],
        ["MTBF", "1,200,000 hours"],
        ["Form Factor", "3.5-inch"],
        ["Weight", "1.52 lbs"],
      ]),
    ],
  },
  {
    partNumber: "ST450MM0026",
    title:
      "Seagate Savvio 10K.6 450GB 10000RPM SAS 6Gb/s 64MB Cache SED 2.5-Inch Enterprise Hard Drive",
    shortTitle: "Seagate Savvio 10K.6 450GB SAS HDD",
    category: "hard-drives-ssds",
    manufacturer: "seagate",
    price: 397.83,
    listPrice: 423.22,
    condition: "New",
    upc: "763649044674",
    stock: 18,
    rating: 4.5,
    reviewCount: 14,
    overview:
      "Small form factor 10K SAS for transaction-heavy arrays that still rely on spinning media. 450 GB at 10,000 RPM with a 64 MB cache and 6 Gb/s dual-port SAS keeps IOPS respectable while halving the rack footprint of 3.5-inch drives. SED firmware and a 2 million hour MTBF make it a safe replacement spare for existing SAN shelves.",
    highlights: [
      "450GB at 10,000 RPM in a 2.5-inch SFF chassis",
      "6Gb/s dual-port SAS with 64MB cache",
      "Self-encrypting drive firmware for instant secure erase",
      "2,000,000 hours MTBF, 24x7 enterprise duty cycle",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Seagate Savvio 10K.6"],
        ["Capacity", "450 GB"],
        ["Device Type", "Internal Hard Disk Drive"],
      ]),
      g("Interface & Performance", [
        ["Interface", "SAS 6Gb/s"],
        ["Rotational Speed", "10,000 RPM"],
        ["Cache", "64 MB"],
        ["Average Seek Time", "3.7 ms read"],
      ]),
      g("Reliability & Physical", [
        ["MTBF", "2,000,000 hours"],
        ["Form Factor", "2.5-inch SFF"],
        ["Security", "SED"],
      ]),
    ],
  },
  {
    partNumber: "MZ-77E1T0B",
    title:
      "Samsung 870 EVO 1TB SATA III 6Gb/s 2.5-Inch Internal Solid State Drive",
    shortTitle: "Samsung 870 EVO 1TB SATA SSD",
    category: "hard-drives-ssds",
    manufacturer: "samsung",
    price: 129.99,
    listPrice: 149.99,
    condition: "New",
    upc: "887276429229",
    stock: 60,
    rating: 4.9,
    reviewCount: 212,
    bestSeller: true,
    overview:
      "The safest SATA SSD recommendation there is. The 870 EVO pairs Samsung's MKX controller with 1 GB of LPDDR4 cache to hold 560 MB/s reads and 530 MB/s writes right up to the SATA ceiling, and Intelligent TurboWrite keeps large file copies from collapsing to TLC speeds. 600 TBW of endurance and a five-year warranty mean it is just as comfortable in a boot array as in a laptop upgrade.",
    highlights: [
      "Up to 560 MB/s read and 530 MB/s write over SATA III",
      "Samsung V-NAND 3-bit MLC with MKX controller",
      "Intelligent TurboWrite buffer for sustained large transfers",
      "600 TBW endurance, 5-year limited warranty",
      "AES 256-bit hardware encryption, TCG/Opal compliant",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Samsung 870 EVO"],
        ["Capacity", "1 TB"],
        ["Form Factor", "2.5-inch, 7mm"],
      ]),
      g("Interface & Performance", [
        ["Interface", "SATA III 6Gb/s"],
        ["Sequential Read", "560 MB/s"],
        ["Sequential Write", "530 MB/s"],
        ["Random Read", "98,000 IOPS"],
        ["Cache Memory", "1 GB LPDDR4"],
      ]),
      g("Reliability", [
        ["Endurance", "600 TBW"],
        ["MTBF", "1,500,000 hours"],
        ["Encryption", "AES 256-bit, TCG/Opal"],
      ]),
    ],
  },
  {
    partNumber: "SSDPE2KX040T8",
    title:
      "Intel SSD DC P4510 Series 4TB PCIe Gen3 x4 NVMe 3D TLC U.2 2.5-Inch Enterprise Solid State Drive",
    shortTitle: "Intel DC P4510 4TB U.2 NVMe SSD",
    category: "hard-drives-ssds",
    manufacturer: "intel",
    price: 1189.0,
    listPrice: 1310.0,
    condition: "New",
    upc: "735858388238",
    stock: 15,
    rating: 4.8,
    reviewCount: 23,
    featured: true,
    overview:
      "Datacenter NVMe built for consistency rather than headline numbers. The P4510 delivers 3,000 MB/s reads with tightly bounded QoS latency, end-to-end data protection and power-loss-protection capacitors so in-flight writes survive a rack outage. At 4 TB per U.2 drive it is a sensible density point for Ceph, vSAN capacity tiers and database storage.",
    highlights: [
      "4TB capacity in a hot-swap U.2 2.5-inch 15mm form factor",
      "Up to 3,000 MB/s read / 2,900 MB/s write, 636K random read IOPS",
      "Enhanced power-loss data protection with onboard capacitors",
      "6.3 PBW endurance (0.9 DWPD random workload)",
      "End-to-end data path protection and AES-XTS 256 encryption",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Intel SSD DC P4510 Series"],
        ["Capacity", "4 TB"],
        ["Form Factor", "U.2 2.5-inch 15mm"],
      ]),
      g("Interface & Performance", [
        ["Interface", "PCIe 3.1 x4, NVMe 1.2"],
        ["Sequential Read", "3,000 MB/s"],
        ["Sequential Write", "2,900 MB/s"],
        ["Random Read (4K)", "636,500 IOPS"],
        ["Random Write (4K)", "111,500 IOPS"],
      ]),
      g("Reliability", [
        ["Endurance", "6.3 PBW"],
        ["Power Loss Protection", "Yes"],
        ["Warranty", "5 Years Limited"],
      ]),
    ],
  },

  // ---------------- Memory ----------------
  {
    partNumber: "M393A4K40CB2-CTD",
    title:
      "Samsung 32GB DDR4-2666MHz PC4-21300 ECC Registered RDIMM CL19 2Rx4 1.2V 288-Pin Server Memory Module",
    shortTitle: "Samsung 32GB DDR4-2666 ECC RDIMM",
    category: "memory-ram",
    manufacturer: "samsung",
    price: 118.5,
    listPrice: 139.0,
    condition: "New",
    upc: "887276239613",
    stock: 80,
    rating: 4.9,
    reviewCount: 97,
    bestSeller: true,
    overview:
      "The standard 32 GB building block for Xeon Scalable and EPYC platforms. Dual-rank x4 organisation keeps bandwidth high while registered ECC buffering lets you populate every channel without stability penalties. We test each module in a reference server before it ships and will confirm compatibility against your exact server model before you order.",
    highlights: [
      "32GB DDR4-2666 (PC4-21300) ECC Registered RDIMM",
      "CL19, 2Rx4 organisation, 1.2V low voltage",
      "288-pin DIMM for Xeon Scalable, EPYC and Threadripper Pro platforms",
      "Tested in reference hardware; compatibility guaranteed",
    ],
    specs: [
      g("General Information", [
        ["Capacity", "32 GB"],
        ["Memory Type", "DDR4 SDRAM"],
        ["Technology", "ECC Registered (RDIMM)"],
      ]),
      g("Performance", [
        ["Speed", "2666 MHz (PC4-21300)"],
        ["CAS Latency", "CL19"],
        ["Rank / Organisation", "2Rx4 Dual Rank"],
        ["Voltage", "1.2 V"],
        ["Pins", "288-pin"],
      ]),
    ],
  },
  {
    partNumber: "KSM32RD4/64HAR",
    title:
      "Kingston Server Premier 64GB DDR4-3200MHz PC4-25600 ECC Registered RDIMM CL22 2Rx4 Memory Module",
    shortTitle: "Kingston 64GB DDR4-3200 ECC RDIMM",
    category: "memory-ram",
    manufacturer: "kingston",
    price: 239.0,
    listPrice: 275.0,
    condition: "New",
    upc: "740617310573",
    stock: 46,
    rating: 4.8,
    reviewCount: 58,
    featured: true,
    overview:
      "When you need capacity per slot, 64 GB dual-rank RDIMMs at 3200 MT/s are the sweet spot for third-generation Xeon Scalable and EPYC Milan hosts. Kingston Server Premier modules use Hynix A-die with a locked BOM, so what you qualify today is what you can buy next year — important when you are standardising a fleet.",
    highlights: [
      "64GB DDR4-3200 (PC4-25600) ECC Registered RDIMM",
      "CL22, 2Rx4 dual rank, 1.2V",
      "Locked bill of materials for fleet standardisation",
      "Lifetime manufacturer warranty",
    ],
    specs: [
      g("General Information", [
        ["Capacity", "64 GB"],
        ["Memory Type", "DDR4 SDRAM"],
        ["Technology", "ECC Registered (RDIMM)"],
      ]),
      g("Performance", [
        ["Speed", "3200 MT/s (PC4-25600)"],
        ["CAS Latency", "CL22"],
        ["Rank", "2Rx4 Dual Rank"],
        ["Voltage", "1.2 V"],
      ]),
      g("Warranty", [["Coverage", "Lifetime limited warranty"]]),
    ],
  },
  {
    partNumber: "M393B5170EHB-CH9",
    title:
      "Samsung 4GB DDR3-1333MHz PC3-10600 ECC Registered RDIMM CL9 2Rx4 1.5V 240-Pin Memory Module",
    shortTitle: "Samsung 4GB DDR3-1333 ECC RDIMM",
    category: "memory-ram",
    manufacturer: "samsung",
    price: 67.69,
    listPrice: 71.25,
    condition: "New",
    upc: "635753498943",
    stock: 120,
    rating: 4.5,
    reviewCount: 31,
    overview:
      "Legacy DDR3 registered memory for Nehalem and Westmere era servers that are still in production. Dual-rank 4 GB modules are the most common replacement size for ProLiant G6/G7 and PowerEdge 11G hosts, and we keep deep stock so you can refresh a whole bank rather than mixing part numbers.",
    highlights: [
      "4GB DDR3-1333 (PC3-10600) ECC Registered RDIMM",
      "CL9, 2Rx4 dual rank, 1.5V, 240-pin",
      "Ideal spare for ProLiant G6/G7 and PowerEdge 11G servers",
      "Deep stock for full-bank replacements",
    ],
    specs: [
      g("General Information", [
        ["Capacity", "4 GB"],
        ["Memory Type", "DDR3 SDRAM"],
        ["Technology", "ECC Registered"],
      ]),
      g("Performance", [
        ["Speed", "1333 MHz (PC3-10600)"],
        ["CAS Latency", "CL9"],
        ["Rank", "2Rx4"],
        ["Voltage", "1.5 V"],
        ["Pins", "240-pin"],
      ]),
    ],
  },
  {
    partNumber: "HMAA8GL7CPR4N-XN",
    title:
      "128GB DDR4-3200MHz PC4-25600 ECC Load Reduced LRDIMM CL22 4Rx4 1.2V 288-Pin Server Memory Module",
    shortTitle: "128GB DDR4-3200 ECC LRDIMM",
    category: "memory-ram",
    manufacturer: "kingston",
    price: 689.0,
    listPrice: 795.0,
    condition: "New",
    upc: "740617322712",
    stock: 18,
    rating: 4.7,
    reviewCount: 12,
    overview:
      "Maximum density memory for in-memory databases and large VM hosts. Load-reduced buffering lets you fill all eight channels with quad-rank 128 GB modules and still run at 3200 MT/s, taking a dual-socket board to 4 TB. Expect this part to be the difference between consolidating onto one host and buying a second one.",
    highlights: [
      "128GB DDR4-3200 ECC Load Reduced LRDIMM",
      "4Rx4 quad rank, CL22, 1.2V",
      "Enables up to 4TB on dual-socket Xeon Scalable boards",
      "Thermal sensor equipped for server telemetry",
    ],
    specs: [
      g("General Information", [
        ["Capacity", "128 GB"],
        ["Memory Type", "DDR4 SDRAM"],
        ["Technology", "ECC Load Reduced (LRDIMM)"],
      ]),
      g("Performance", [
        ["Speed", "3200 MT/s (PC4-25600)"],
        ["CAS Latency", "CL22"],
        ["Rank", "4Rx4 Quad Rank"],
        ["Voltage", "1.2 V"],
      ]),
    ],
  },

  // ---------------- Motherboards ----------------
  {
    partNumber: "X11SPL-F",
    title:
      "Supermicro X11SPL-F Socket LGA3647 Intel C621 Chipset ATX Server Motherboard, 8 x DDR4 DIMM",
    shortTitle: "Supermicro X11SPL-F ATX Server Board",
    category: "motherboards",
    manufacturer: "supermicro",
    price: 1226.22,
    listPrice: 1332.85,
    condition: "New",
    upc: "672042228843",
    stock: 10,
    rating: 4.8,
    reviewCount: 19,
    featured: true,
    overview:
      "A single-socket ATX board that behaves like a proper server platform: LGA3647 for Xeon Scalable up to 165 W, eight DDR4 DIMM slots reaching 1 TB, six PCIe 3.0 slots and IPMI 2.0 with dedicated LAN and HTML5 KVM. Because it is standard ATX, it drops into off-the-shelf chassis — ideal for build-your-own storage servers and render nodes.",
    highlights: [
      "Socket P (LGA 3647) for Intel Xeon Scalable up to 165W TDP",
      "8 x DDR4 DIMM slots, up to 1TB ECC RDIMM/LRDIMM (6 channels)",
      "6 x PCIe 3.0 slots (x16/x8) and 10 x SATA3 ports",
      "IPMI 2.0 with dedicated LAN and HTML5 KVM over IP",
      "Standard ATX footprint for off-the-shelf chassis builds",
    ],
    specs: [
      g("General Information", [
        ["Manufacturer Part", "MBD-X11SPL-F-O"],
        ["Form Factor", "ATX (12 in x 9.6 in)"],
        ["Chipset", "Intel C621"],
      ]),
      g("Processor & Memory", [
        ["Socket", "1 x Socket P (LGA 3647)"],
        ["Supported CPU", "Xeon Scalable (Platinum / Gold / Silver / Bronze)"],
        ["Memory Slots", "8 x DDR4 DIMM"],
        ["Maximum Memory", "1 TB ECC RDIMM / LRDIMM"],
      ]),
      g("Expansion & I/O", [
        ["PCIe Slots", "4 x PCIe 3.0 x8, 2 x PCIe 3.0 x16"],
        ["SATA", "10 x SATA3 6Gb/s"],
        ["LAN", "2 x GbE (Intel i210) + dedicated IPMI"],
        ["USB", "2 x USB 3.0, 4 x USB 2.0"],
      ]),
    ],
  },
  {
    partNumber: "MBD-X9DAX-ITF-O",
    title:
      "Supermicro X9DAX-iTF Socket LGA2011 Intel C602 Chipset E-ATX Dual Xeon E5-2600 Workstation Motherboard",
    shortTitle: "Supermicro X9DAX-iTF E-ATX Board",
    category: "motherboards",
    manufacturer: "supermicro",
    price: 3697.5,
    listPrice: 3933.51,
    condition: "New",
    upc: "672042093977",
    stock: 3,
    rating: 4.6,
    reviewCount: 8,
    overview:
      "A dual-socket E-ATX workstation board for people maintaining high-value legacy CAD and simulation rigs. Two LGA2011 sockets take Xeon E5-2600 v1/v2 processors, sixteen DIMM slots take 512 GB of registered DDR3, and onboard dual 10GBase-T plus HD audio cover both the datacentre and the desk. New old stock, sealed, with full IPMI.",
    highlights: [
      "Dual Socket R (LGA 2011) for Xeon E5-2600 / v2 processors",
      "16 x DDR3 DIMM slots, up to 512GB ECC registered memory",
      "Dual 10GBase-T LAN with Intel X540 controller",
      "Enhanced Extended ATX form factor with 7 PCIe slots",
      "IPMI 2.0 with KVM over LAN and virtual media",
    ],
    specs: [
      g("General Information", [
        ["Form Factor", "E-ATX (13.68 in x 13.05 in)"],
        ["Chipset", "Intel C602"],
        ["Package", "Retail Box"],
      ]),
      g("Processor & Memory", [
        ["Sockets", "2 x LGA 2011"],
        ["Supported CPU", "Intel Xeon E5-2600 / E5-2600 v2"],
        ["Memory Slots", "16 x DDR3 DIMM"],
        ["Maximum Memory", "512 GB ECC Registered"],
      ]),
      g("Expansion & I/O", [
        ["PCIe Slots", "4 x PCIe 3.0 x16, 2 x PCIe 3.0 x8, 1 x PCI"],
        ["SATA", "2 x SATA3, 8 x SATA2"],
        ["LAN", "2 x 10GBase-T (Intel X540)"],
      ]),
    ],
  },
  {
    partNumber: "X8SIU-F",
    title:
      "Supermicro X8SIU-F Socket LGA1156 Intel 3420 Chipset Proprietary Server System Board, 6 x DDR3 DIMM",
    shortTitle: "Supermicro X8SIU-F Server Board",
    category: "motherboards",
    manufacturer: "supermicro",
    price: 260.0,
    listPrice: 276.6,
    condition: "Refurbished",
    upc: "672042086870",
    stock: 6,
    rating: 4.4,
    reviewCount: 6,
    overview:
      "A proprietary-footprint replacement board for 1U Supermicro chassis built around the LGA1156 platform. Supports Xeon X3400/L3400, Core i3 and Pentium processors with up to 32 GB of DDR3 across six DIMM slots, six SATA ports and onboard IPMI. Tested with the latest BIOS and a fresh CMOS battery.",
    highlights: [
      "Socket H (LGA 1156) supporting Xeon 3400/L3400, Core i3, Pentium",
      "6 x DDR3 DIMM slots, up to 32GB ECC unbuffered/registered",
      "6 x SATA 3.0Gb/s ports with onboard RAID 0/1/5/10",
      "IPMI 2.0 with dedicated management LAN",
      "Tested, latest BIOS flashed, new CMOS battery fitted",
    ],
    specs: [
      g("General Information", [
        ["Form Factor", "Proprietary (for 1U chassis)"],
        ["Chipset", "Intel 3420"],
      ]),
      g("Processor & Memory", [
        ["Socket", "LGA 1156"],
        ["Memory Slots", "6 x DDR3 DIMM"],
        ["Maximum Memory", "32 GB"],
      ]),
      g("Expansion & I/O", [
        ["SATA", "6 x SATA 3.0Gb/s"],
        ["LAN", "2 x GbE + IPMI dedicated"],
        ["Expansion", "1 x PCIe 2.0 x8"],
      ]),
    ],
  },
  {
    partNumber: "MBD-H8QGI-LN4F",
    title:
      "Supermicro H8QGI-LN4F Socket G34 AMD SR5690 Chipset SWTX Quad Opteron 6000 Server Motherboard, 32 x DDR3",
    shortTitle: "Supermicro H8QGI-LN4F Quad Socket Board",
    category: "motherboards",
    manufacturer: "supermicro",
    price: 3503.75,
    listPrice: 3727.39,
    condition: "New",
    upc: "672042089147",
    stock: 2,
    rating: 4.5,
    reviewCount: 4,
    overview:
      "Four Socket G34 processors and thirty-two DIMM slots on a single SWTX board — up to 48 Opteron cores and 512 GB of registered DDR3 in one node. It remains a cost-effective way to build high-core-count batch compute or licence-constrained workloads where per-socket licensing is not the limiting factor.",
    highlights: [
      "4 x Socket G34 for AMD Opteron 6000 series (up to 48 cores)",
      "32 x DDR3 DIMM slots, up to 512GB registered ECC",
      "Quad Gigabit Ethernet with Intel i350 controller",
      "SWTX form factor with 4 x PCIe 2.0 x16 slots",
      "IPMI 2.0 with KVM over LAN",
    ],
    specs: [
      g("General Information", [
        ["Form Factor", "SWTX (16.48 in x 13 in)"],
        ["Chipset", "AMD SR5690 / SP5100"],
      ]),
      g("Processor & Memory", [
        ["Sockets", "4 x Socket G34"],
        ["Supported CPU", "AMD Opteron 6000 Series"],
        ["Memory Slots", "32 x DDR3 DIMM"],
        ["Maximum Memory", "512 GB Registered ECC"],
      ]),
      g("Expansion & I/O", [
        ["PCIe Slots", "4 x PCIe 2.0 x16"],
        ["SATA", "6 x SATA 3.0Gb/s"],
        ["LAN", "4 x Gigabit Ethernet"],
      ]),
    ],
  },

  // ---------------- Power supplies ----------------
  {
    partNumber: "DPS-528AB-A",
    title:
      "Delta DPS-528AB-A 530-Watt Redundant Hot-Plug Power Supply for Dell PowerEdge T300",
    shortTitle: "Delta 530W Redundant PSU (PowerEdge T300)",
    category: "power-supplies",
    manufacturer: "delta",
    price: 157.06,
    listPrice: 165.33,
    condition: "New",
    upc: "884116034117",
    stock: 20,
    rating: 4.6,
    reviewCount: 11,
    overview:
      "Direct replacement hot-plug PSU module for PowerEdge T300 redundant power cages. 530 W continuous output with active PFC and the correct Dell connector keying, so it slides into the cage and is recognised by the BMC without firmware complaints. Every unit is load-banked at full output before packing.",
    highlights: [
      "530W hot-plug redundant power supply module",
      "Direct replacement for Dell PowerEdge T300 power cage",
      "Active PFC, 100-240V auto-ranging input",
      "Load tested at full rated output before dispatch",
    ],
    specs: [
      g("General Information", [
        ["Manufacturer Part", "DPS-528AB-A"],
        ["Compatible System", "Dell PowerEdge T300"],
        ["Type", "Hot-plug redundant module"],
      ]),
      g("Electrical", [
        ["Output Power", "530 Watts"],
        ["Input Voltage", "100-240V AC auto-ranging"],
        ["Input Frequency", "50/60 Hz"],
        ["Power Factor Correction", "Active"],
      ]),
    ],
  },
  {
    partNumber: "DPS-485AB-A",
    title:
      "Delta DPS-485AB-A 485-Watt 100-240V Hot-Plug Power Supply for Dell PowerVault MD1120 Storage Array",
    shortTitle: "Delta 485W PSU (PowerVault MD1120)",
    category: "power-supplies",
    manufacturer: "delta",
    price: 218.33,
    listPrice: 229.82,
    condition: "New",
    upc: "884116034124",
    stock: 14,
    rating: 4.5,
    reviewCount: 7,
    overview:
      "Replacement 485 W power and cooling module for PowerVault MD1120 and MD1000 family shelves. The integrated fan assembly and PSU are supplied as one hot-swap unit, keeping shelf airflow balanced when you replace a failed module. Both modules should be matched — ask us for pair pricing.",
    highlights: [
      "485W hot-swap power and cooling module",
      "Fits Dell PowerVault MD1120 / MD1000 storage enclosures",
      "Integrated fan assembly maintains shelf airflow",
      "100-240V auto-ranging input",
    ],
    specs: [
      g("General Information", [
        ["Manufacturer Part", "DPS-485AB-A"],
        ["Compatible System", "Dell PowerVault MD1120 / MD1000"],
        ["Type", "Hot-swap PSU + fan module"],
      ]),
      g("Electrical", [
        ["Output Power", "485 Watts"],
        ["Input", "100-240V AC, 50/60Hz"],
        ["Connector", "Dell proprietary edge connector"],
      ]),
    ],
  },
  {
    partNumber: "DPS-280DB-A",
    title:
      "Delta DPS-280DB-A 280-Watt Internal ATX Power Supply for Dell OptiPlex GX620 / GX745",
    shortTitle: "Delta 280W ATX PSU (OptiPlex)",
    category: "power-supplies",
    manufacturer: "delta",
    price: 306.3,
    listPrice: 322.42,
    condition: "New",
    upc: "884116034131",
    stock: 9,
    rating: 4.3,
    reviewCount: 5,
    overview:
      "Original-spec 280 W internal PSU for OptiPlex GX620 and GX745 small form factor desktops. Dell used proprietary pinouts in this generation, so a generic ATX unit will not work — this is the correct part with the right harness lengths and connector keying for a drop-in swap.",
    highlights: [
      "280W internal ATX power supply",
      "Correct Dell proprietary pinout for OptiPlex GX620 / GX745",
      "Factory harness lengths for a drop-in replacement",
      "Bench tested under load",
    ],
    specs: [
      g("General Information", [
        ["Manufacturer Part", "DPS-280DB-A"],
        ["Compatible System", "Dell OptiPlex GX620, GX745"],
        ["Type", "Internal (non hot-plug)"],
      ]),
      g("Electrical", [
        ["Output Power", "280 Watts"],
        ["Input", "100-240V AC"],
        ["Main Connector", "Dell 24-pin proprietary"],
      ]),
    ],
  },
  {
    partNumber: "865414-B21",
    title:
      "HPE 800W Flex Slot Platinum Hot Plug Low Halogen Power Supply Kit for ProLiant Gen10",
    shortTitle: "HPE 800W Flex Slot Platinum PSU",
    category: "power-supplies",
    manufacturer: "hpe",
    price: 329.0,
    listPrice: 389.0,
    condition: "New",
    upc: "190017163413",
    stock: 30,
    rating: 4.9,
    reviewCount: 40,
    bestSeller: true,
    overview:
      "The standard power module across the ProLiant Gen10 range. 800 W of 94%-efficient Platinum output in a hot-plug Flex Slot package, with full iLO power telemetry so you can see per-PSU draw in your monitoring stack. Add a second unit for N+1 redundancy on DL360, DL380 and ML350 Gen10 servers.",
    highlights: [
      "800W Flex Slot hot-plug power supply, 94% Platinum efficiency",
      "Supported on ProLiant DL360/DL380/ML350 Gen10 and Apollo platforms",
      "Full iLO power metering and capping support",
      "Low halogen, factory sealed HPE kit",
    ],
    specs: [
      g("General Information", [
        ["HPE Part Number", "865414-B21"],
        ["Product Line", "HPE Flex Slot"],
        ["Type", "Hot-plug redundant"],
      ]),
      g("Electrical", [
        ["Output Power", "800 Watts"],
        ["Efficiency", "80 PLUS Platinum (94%)"],
        ["Input Voltage", "100-240V AC"],
      ]),
    ],
  },

  // ---------------- Transceivers ----------------
  {
    partNumber: "J9150D",
    title:
      "HPE Aruba 10G SFP+ LC SR 300m MMF Multimode Fiber Optic Transceiver Module",
    shortTitle: "HPE Aruba 10G SFP+ SR Transceiver",
    category: "transceivers-cables",
    manufacturer: "hpe",
    price: 149.0,
    listPrice: 189.0,
    condition: "New",
    upc: "190017053394",
    stock: 75,
    rating: 4.8,
    reviewCount: 64,
    bestSeller: true,
    overview:
      "The standard 10 Gigabit short-reach optic for Aruba and ProCurve switching. 850 nm VCSEL over OM3 multimode reaches 300 m, with digital optical monitoring so you can read transmit and receive power straight from the CLI. Genuine HPE coding means no firmware warnings and no unsupported-transceiver log spam.",
    highlights: [
      "10GBASE-SR SFP+ transceiver, LC duplex connector",
      "Up to 300m over OM3 multimode fibre (850nm)",
      "Digital Optical Monitoring (DOM/DDM) supported",
      "Genuine HPE coded — no unsupported transceiver warnings",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "HPE Aruba Transceivers"],
        ["Standard", "10GBASE-SR"],
        ["Form Factor", "SFP+"],
      ]),
      g("Optical", [
        ["Wavelength", "850 nm"],
        ["Maximum Distance", "300 m (OM3) / 400 m (OM4)"],
        ["Connector", "LC Duplex"],
        ["Fibre Type", "Multimode"],
        ["DOM Support", "Yes"],
      ]),
    ],
  },
  {
    partNumber: "QSFP-40G-SR4",
    title:
      "Cisco 40GBASE-SR4 QSFP+ MPO 150m OM4 Multimode Fiber Optic Transceiver Module",
    shortTitle: "Cisco 40G QSFP+ SR4 Transceiver",
    category: "transceivers-cables",
    manufacturer: "cisco",
    price: 419.0,
    listPrice: 495.0,
    condition: "New",
    upc: "882658431814",
    stock: 32,
    rating: 4.7,
    reviewCount: 22,
    overview:
      "40 Gigabit short reach over a single MPO-12 trunk — four 10G lanes in each direction. Commonly used for leaf-to-spine uplinks on Nexus and Catalyst platforms, and breakout-capable to 4 x 10G with the right fan-out cable. Genuine Cisco coding with full DOM reporting.",
    highlights: [
      "40GBASE-SR4 QSFP+ module with MPO-12 connector",
      "Up to 150m over OM4 / 100m over OM3 multimode",
      "Supports 4 x 10G breakout with fan-out assemblies",
      "Digital optical monitoring, Cisco coded",
    ],
    specs: [
      g("General Information", [
        ["Standard", "40GBASE-SR4"],
        ["Form Factor", "QSFP+"],
        ["Coding", "Cisco original"],
      ]),
      g("Optical", [
        ["Wavelength", "850 nm (4 lanes)"],
        ["Maximum Distance", "150 m OM4 / 100 m OM3"],
        ["Connector", "MPO-12"],
        ["Breakout", "4 x 10GBASE-SR supported"],
      ]),
    ],
  },
  {
    partNumber: "SFP-H10GB-CU3M",
    title:
      "Cisco 10GBASE-CU SFP+ Direct Attach Twinax Copper Cable Assembly — 3 Meter Passive",
    shortTitle: "Cisco 10G SFP+ DAC Cable 3m",
    category: "transceivers-cables",
    manufacturer: "cisco",
    price: 89.0,
    listPrice: 119.0,
    condition: "New",
    upc: "882658174612",
    stock: 110,
    rating: 4.8,
    reviewCount: 88,
    overview:
      "The cheapest reliable way to link top-of-rack switches to servers inside the same cabinet. A 3 metre passive twinax assembly with moulded SFP+ ends draws almost no power, adds negligible latency and eliminates two optics plus a patch lead per link. Cisco coded for Nexus, Catalyst and UCS fabric interconnects.",
    highlights: [
      "Passive 10GBASE-CU twinax direct attach assembly, 3m",
      "Moulded SFP+ connectors on both ends",
      "Near-zero power draw and latency versus optical links",
      "Cisco coded for Nexus, Catalyst and UCS platforms",
    ],
    specs: [
      g("General Information", [
        ["Type", "Direct Attach Copper (DAC)"],
        ["Length", "3 Meters"],
        ["Standard", "10GBASE-CU / SFF-8431"],
      ]),
      g("Physical", [
        ["Connectors", "SFP+ to SFP+"],
        ["Cable Gauge", "30 AWG twinaxial"],
        ["Mode", "Passive"],
      ]),
    ],
  },
  {
    partNumber: "GLC-LH-SMD",
    title:
      "Cisco 1000BASE-LX/LH SFP LC 10km Single-Mode Fiber Optic Transceiver Module with DOM",
    shortTitle: "Cisco 1G SFP LX/LH Transceiver",
    category: "transceivers-cables",
    manufacturer: "cisco",
    price: 112.0,
    listPrice: 139.0,
    condition: "New",
    upc: "882658408748",
    stock: 64,
    rating: 4.7,
    reviewCount: 35,
    overview:
      "Gigabit single-mode optic for campus building interconnects up to 10 km, and dual-rate capable on multimode with a mode conditioning patch cord. The SMD revision adds digital optical monitoring, so link budget troubleshooting no longer needs a light meter and a site visit.",
    highlights: [
      "1000BASE-LX/LH SFP, LC duplex, 1310nm",
      "Up to 10km over single-mode fibre",
      "Digital Optical Monitoring (DOM) support",
      "Works on multimode with mode conditioning patch cord",
    ],
    specs: [
      g("General Information", [
        ["Standard", "1000BASE-LX/LH"],
        ["Form Factor", "SFP"],
        ["Coding", "Cisco original"],
      ]),
      g("Optical", [
        ["Wavelength", "1310 nm"],
        ["Maximum Distance", "10 km single-mode"],
        ["Connector", "LC Duplex"],
        ["DOM Support", "Yes"],
      ]),
    ],
  },

  // ---------------- Printers & scanners ----------------
  {
    partNumber: "ZQ62-AUWA0B4-00",
    title:
      "Zebra ZQ620 Plus 3-Inch Mobile Direct Thermal Barcode Label Printer with Bluetooth and Wi-Fi",
    shortTitle: "Zebra ZQ620 Plus Mobile Printer",
    category: "printers-scanners",
    manufacturer: "zebra",
    price: 1352.11,
    listPrice: 1438.41,
    condition: "New",
    upc: "783555209974",
    stock: 17,
    rating: 4.8,
    reviewCount: 29,
    featured: true,
    overview:
      "Zebra's flagship 3-inch mobile printer for route accounting, retail markdown and field service. Dual-band Wi-Fi and Bluetooth 5.0 keep it connected as workers move, the colour display shows battery and connectivity at a glance, and Print Touch NFC pairs a handset with one tap. Rated for 6-foot drops to concrete and IP54 sealed with the exoskeleton fitted.",
    highlights: [
      "3-inch (72mm) direct thermal mobile printer, 203 dpi",
      "Dual-band 802.11ac Wi-Fi and Bluetooth 5.0 with Print Touch NFC",
      "Colour LCD with battery health and connectivity indicators",
      "6 ft drop rating, IP54 sealing with optional exoskeleton",
      "PowerPrecision+ smart battery with usage telemetry",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Zebra ZQ600 Plus Series"],
        ["Model", "ZQ620 Plus"],
        ["Print Technology", "Direct Thermal"],
      ]),
      g("Print Specifications", [
        ["Resolution", "203 dpi (8 dots/mm)"],
        ["Print Width", "2.9 inches (72 mm)"],
        ["Print Speed", "Up to 5 ips (127 mm/s)"],
        ["Media Roll Diameter", "2.2 inches"],
      ]),
      g("Connectivity & Power", [
        ["Wireless", "802.11a/b/g/n/ac, Bluetooth 5.0"],
        ["Wired", "USB-C, RS-232 serial"],
        ["Battery", "PowerPrecision+ 2280 mAh Li-Ion"],
      ]),
      g("Physical", [
        ["Dimensions", "6.4 in x 5.1 in x 2.9 in"],
        ["Weight", "1.6 lbs with battery"],
        ["Environmental", "IP54 with exoskeleton, 6 ft drop spec"],
      ]),
    ],
  },
  {
    partNumber: "DS4608-SR7U3200SGW",
    title:
      "Zebra DS4608-SR 2D Imager Standard Range Corded USB Handheld Barcode Scanner Kit",
    shortTitle: "Zebra DS4608-SR Barcode Scanner",
    category: "printers-scanners",
    manufacturer: "zebra",
    price: 526.2,
    listPrice: 553.89,
    condition: "New",
    upc: "783555115015",
    stock: 48,
    rating: 4.9,
    reviewCount: 76,
    bestSeller: true,
    overview:
      "A retail and healthcare counter scanner that simply does not miss. The DS4608 reads 1D, 2D and digital barcodes off phone screens instantly, handles poorly printed and damaged labels, and supports OCR and document capture out of the box. The USB kit ships complete with stand and cable, so it is scanning within a minute of unboxing.",
    highlights: [
      "1D, 2D and PDF417 scanning including mobile phone screens",
      "Standard range optics with best-in-class motion tolerance",
      "USB kit includes shielded cable and presentation stand",
      "OCR, document capture and digital watermark support",
      "6 ft drop spec, IP52 sealed for counter and clinic use",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Zebra DS4600 Series"],
        ["Model", "DS4608-SR"],
        ["Scanner Type", "Handheld 2D Area Imager"],
      ]),
      g("Scanning", [
        ["Symbologies", "1D, 2D, PDF417, Postal, OCR"],
        ["Scan Range", "Standard Range (SR)"],
        ["Image Sensor", "1280 x 800 pixels"],
        ["Motion Tolerance", "Up to 25 in/s"],
      ]),
      g("Interface & Durability", [
        ["Interface", "USB (HID keyboard / CDC)"],
        ["Drop Spec", "6 ft / 1.8 m to concrete"],
        ["Sealing", "IP52"],
      ]),
    ],
  },
  {
    partNumber: "PC45D010000201",
    title:
      "Honeywell PC45D 203 dpi Bluetooth Ethernet Direct Thermal Desktop Label Printer",
    shortTitle: "Honeywell PC45D Desktop Label Printer",
    category: "printers-scanners",
    manufacturer: "honeywell",
    price: 1217.24,
    listPrice: 1294.94,
    condition: "New",
    upc: "191107043621",
    stock: 13,
    rating: 4.6,
    reviewCount: 15,
    overview:
      "A desktop printer designed to be shared across a team. The PC45D's colour touchscreen walks users through loading media and clearing jams, Bluetooth 5.2 plus gigabit Ethernet cover every connection scenario, and Honeywell's Operational Intelligence platform reports printhead health and label counts back to IT. Big 5-inch media rolls mean fewer reload stops.",
    highlights: [
      "203 dpi direct thermal desktop printer, up to 8 ips",
      "Colour touchscreen with guided media loading",
      "Bluetooth 5.2, USB and Gigabit Ethernet connectivity",
      "5-inch media roll capacity for long production runs",
      "Operational Intelligence printhead and usage telemetry",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Honeywell PC45 Series"],
        ["Model", "PC45D"],
        ["Print Technology", "Direct Thermal"],
      ]),
      g("Print Specifications", [
        ["Resolution", "203 dpi"],
        ["Maximum Print Width", "4.09 inches"],
        ["Print Speed", "Up to 8 ips"],
        ["Media Roll Capacity", "5 inch OD"],
      ]),
      g("Connectivity", [
        ["Standard", "USB-A, USB-B, Gigabit Ethernet"],
        ["Wireless", "Bluetooth 5.2 (Wi-Fi optional)"],
        ["Languages", "Fingerprint, Direct Protocol, ZSim, DPL"],
      ]),
    ],
  },
  {
    partNumber: "PJ822",
    title:
      "Brother PocketJet PJ-822 Full Page Mobile Direct Thermal Printer, 203 dpi, USB-C",
    shortTitle: "Brother PocketJet PJ-822 Mobile Printer",
    category: "printers-scanners",
    manufacturer: "brother",
    price: 649.71,
    listPrice: 713.97,
    condition: "New",
    upc: "012502658108",
    stock: 21,
    rating: 4.7,
    reviewCount: 18,
    overview:
      "Full-page A4 printing from a device that fits in a vehicle door pocket. The PJ-822 prints 8.5 x 11 inch pages at 203 dpi with no ink, toner or ribbon — just thermal paper — which makes it the standard choice for police citations, insurance assessments and field service worksheets. USB-C connectivity and a rugged shell rated to 6-foot drops.",
    highlights: [
      "Full page (8.5 x 11 in) direct thermal mobile printing",
      "203 dpi resolution at up to 8 pages per minute",
      "No ink, toner or ribbon required",
      "USB-C interface, optional Bluetooth and Wi-Fi models",
      "6 ft drop rated with optional vehicle mount and battery",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Brother PocketJet 8"],
        ["Model", "PJ-822"],
        ["Print Technology", "Direct Thermal"],
      ]),
      g("Print Specifications", [
        ["Resolution", "203 dpi"],
        ["Print Speed", "Up to 8 ppm"],
        ["Maximum Paper Width", "8.5 inches"],
      ]),
      g("Physical & Connectivity", [
        ["Interface", "USB-C"],
        ["Dimensions", "10 in x 2.2 in x 1.2 in"],
        ["Weight", "1.2 lbs"],
      ]),
    ],
  },
  {
    partNumber: "PM9100-910RBK10",
    title:
      "Datalogic PowerScan PM9100 1D Linear Imager Standard Range 910MHz Cordless Industrial Barcode Scanner Kit",
    shortTitle: "Datalogic PowerScan PM9100 Scanner Kit",
    category: "printers-scanners",
    manufacturer: "honeywell",
    price: 1093.77,
    listPrice: 1163.59,
    condition: "New",
    upc: "788612121318",
    stock: 8,
    rating: 4.6,
    reviewCount: 10,
    overview:
      "Built for warehouses, freezers and loading docks where consumer-grade scanners die in a week. The PM9100 is a cordless 910 MHz linear imager with a 2.5 m drop rating, IP65 sealing and Datalogic's STAR radio for up to 50 m of reliable range in a building. The kit ships with base station, cable and battery.",
    highlights: [
      "Cordless 910MHz STAR radio, up to 50m indoor range",
      "1D linear imaging, standard range optics",
      "IP65 sealed, 2.5m / 8.2ft drop resistance",
      "Kit includes base/charger, USB cable and battery",
      "Datalogic Aladdin configuration utility support",
    ],
    specs: [
      g("General Information", [
        ["Product Line", "Datalogic PowerScan 9100"],
        ["Model", "PM9100-910"],
        ["Scanner Type", "Cordless Handheld Linear Imager"],
      ]),
      g("Scanning & Radio", [
        ["Symbologies", "1D / Linear"],
        ["Radio Frequency", "910 MHz STAR"],
        ["Radio Range", "Up to 50 m indoors"],
      ]),
      g("Durability", [
        ["Sealing", "IP65"],
        ["Drop Spec", "2.5 m / 8.2 ft"],
        ["Operating Temperature", "-20°C to 50°C"],
      ]),
    ],
  },
];
