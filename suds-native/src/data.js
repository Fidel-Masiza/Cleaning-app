export const CATEGORIES = [
  { id: "all", label: "All", icon: "🧺" },
  { id: "wash", label: "Wash & Fold", icon: "👕" },
  { id: "dry", label: "Dry Clean", icon: "🧥" },
  { id: "iron", label: "Ironing", icon: "🧷" },
  { id: "shoe", label: "Shoe Care", icon: "👟" },
  { id: "bed", label: "Bedding", icon: "🛏️" },
];

export const SERVICES = [
  {
    id: "svc-wash",
    cat: "wash",
    emoji: "👕",
    name: "Wash & Fold",
    unit: "kg",
    price: 150,
    desc: "Everyday laundry, washed, dried and neatly folded, ready to wear.",
  },
  {
    id: "svc-dry",
    cat: "dry",
    emoji: "🧥",
    name: "Dry Cleaning",
    unit: "item",
    price: 350,
    desc: "Gentle solvent clean for suits, coats and delicate fabrics.",
  },
  {
    id: "svc-iron",
    cat: "iron",
    emoji: "🧷",
    name: "Ironing Only",
    unit: "item",
    price: 80,
    desc: "Crisp, wrinkle-free finish for shirts, trousers and dresses.",
  },
  {
    id: "svc-shoe",
    cat: "shoe",
    emoji: "👟",
    name: "Shoe Cleaning",
    unit: "pair",
    price: 300,
    desc: "Deep clean and deodorise for sneakers, boots and leather shoes.",
  },
  {
    id: "svc-bed",
    cat: "bed",
    emoji: "🛏️",
    name: "Bedding & Duvets",
    unit: "item",
    price: 500,
    desc: "Heavy-duty wash for duvets, comforters and large bedding sets.",
  },
  {
    id: "svc-curtain",
    cat: "wash",
    emoji: "🪟",
    name: "Curtains",
    unit: "panel",
    price: 400,
    desc: "Freshen up curtains and drapes without taking them off the rail.",
  },
];

export const PICKUP_SLOTS = [
  "Today, 2–4pm",
  "Today, 5–7pm",
  "Tomorrow, 9–11am",
  "Tomorrow, 2–4pm",
];

export const TRACK_STEPS = [
  { key: "placed", title: "Order placed", desc: "We've got your request", icon: "📝" },
  { key: "pickup", title: "Picked up", desc: "Rider is bringing it to us", icon: "🛵" },
  { key: "wash", title: "In the wash", desc: "Being cleaned with care", icon: "🫧" },
  { key: "qc", title: "Quality check", desc: "Folded, pressed and packed", icon: "✅" },
  { key: "delivery", title: "Out for delivery", desc: "On its way back to you", icon: "🚚" },
];

export const DELIVERY_FEE = 100;
