const kitchens = [
  {
    id: 1,
    name: "Taste of India",
    address: "Kathora naka",
    city: "Amravati",
    state: "Maharashtra",
    rating: 3.7,
    image: "/images/taste-of-india.webp",
    managerName: "MS Dhoni",
    timing: "10 AM - 10 PM",
    category: "Veg",
    cloudKitchenId: "AMT-1",
    managerId:"1",
    dishes: [
      { id: 101, name: "Dhokla", price: 120, image: "/images/dhokla.webp", category: "Veg", spiceLevel: "Mild", isAvailable: true, rating: 4.7, bestSeller: true },
      { id: 102, name: "Thepla", price: 80, image: "/images/thepla.jpeg", category: "Veg", spiceLevel: "Medium", isAvailable: false, rating: 4.5, bestSeller: false },
      { id: 103, name: "Khandvi", price: 100, image: "/images/khandvi.jpeg", category: "Veg", spiceLevel: "Mild", isAvailable: true, rating: 4.6, bestSeller: false },
      { id: 104, name: "Undhiyu", price: 250, image: "/images/undhiyu.jpeg", category: "Veg", spiceLevel: "Medium", isAvailable: true, rating: 4.8, bestSeller: true },
      { id: 105, name: "Fafda-Jalebi", price: 150, image: "/images/fafda-jalebi.webp", category: "Veg", spiceLevel: "Mild", isAvailable: false, rating: 4.9, bestSeller: true }
    ]
  },
  {
    id: 2,
    name: "Spicy Bites",
    address: "Kathora naka",
    city: "Pune",
    state: "Maharashtra",
    rating: 4.5,
    image: "/images/spicy-bites.jpeg",
    managerName: "Rohit Sharma",
    timing: "10 AM - 10 PM",
    category: "Veg",
    cloudKitchenId: "PUN-1",
    managerId:"2",
    dishes: [
      { id: 201, name: "Dal Baati Churma", price: 300, image: "/images/dal-baati-churma.webp", category: "Veg", spiceLevel: "Medium", isAvailable: true, rating: 4.8, bestSeller: true },
      { id: 202, name: "Gatte ki Sabzi", price: 220, image: "/images/gatte-ki-sabzi.avif", category: "Veg", spiceLevel: "Spicy", isAvailable: true, rating: 4.7, bestSeller: false },
      { id: 203, name: "Ker Sangri", price: 270, image: "/images/ker-sangri.webp", category: "Veg", spiceLevel: "Spicy", isAvailable: false, rating: 4.5, bestSeller: false },
      { id: 204, name: "Laal Maas", price: 400, image: "/images/laal-maas.jpg", category: "Non-Veg", spiceLevel: "Very Spicy", isAvailable: true, rating: 4.9, bestSeller: true }
    ]
  },
  {
    id: 3,
    name: "Royal Tandoor",
    address: "Kathora naka",
    city: "Nagpur",
    state: "Maharashtra",
    rating: 4.2,
    image: "/images/royal-tandoor.png",
    managerName: "Virat Kohli",
    timing: "10 AM - 10 PM",
    category: "Veg",
    cloudKitchenId: "NGP-1",
    managerId:"3",
    dishes: [
      { id: 301, name: "Pav Bhaji", price: 180, image: "/images/pav-bhaji.avif", category: "Veg", spiceLevel: "Medium", isAvailable: true, rating: 4.8, bestSeller: true },
      { id: 302, name: "Puran Poli", price: 150, image: "/images/puran-poli.webp", category: "Veg", spiceLevel: "None", isAvailable: true, rating: 4.6, bestSeller: false },
      { id: 303, name: "Vada Pav", price: 50, image: "/images/vada-pav.webp", category: "Veg", spiceLevel: "Spicy", isAvailable: true, rating: 4.7, bestSeller: true },
      { id: 304, name: "Misal Pav", price: 120, image: "/images/misal-pav.jpg", category: "Veg", spiceLevel: "Very Spicy", isAvailable: true, rating: 4.8, bestSeller: true },
      { id: 305, name: "Modak", price: 200, image: "/images/modak.jpg", category: "Veg", spiceLevel: "None", isAvailable: true, rating: 4.9, bestSeller: false }
    ]
  },
  {
    id: 4,
    name: "Biryani House",
    address: "Kathora naka",
    city: "Akola",
    state: "Maharashtra",
    rating: 3.9,
    image: "/images/biryani-house.jpeg",
    managerName: "Jasprit Bumrah",
    timing: "10 AM - 10 PM",
    category: "Non-Veg",
    cloudKitchenId: "AKL-1",
    managerId:"4",
    dishes: [
      { id: 401, name: "Goan Fish Curry", price: 350, image: "/images/GoanFishCurry.jpg", category: "Non-Veg", spiceLevel: "Medium", isAvailable: true, rating: 4.8, bestSeller: true },
      { id: 402, name: "Vindaloo", price: 380, image: "/images/vindaloo.jpg", category: "Non-Veg", spiceLevel: "Spicy", isAvailable: true, rating: 4.7, bestSeller: false },
      { id: 403, name: "Bebinca", price: 250, image: "/images/bebinca.webp", category: "Veg", spiceLevel: "None", isAvailable: true, rating: 4.6, bestSeller: true },
      { id: 404, name: "Sorpotel", price: 400, image: "/images/sorpotel.webp", category: "Non-Veg", spiceLevel: "Very Spicy", isAvailable: false, rating: 4.5, bestSeller: false },
      { id: 405, name: "Prawn Balchao", price: 420, image: "/images/prawn-balchao.jpg", category: "Non-Veg", spiceLevel: "Spicy", isAvailable: true, rating: 4.8, bestSeller: true }
    ]
  }
];

export default kitchens;