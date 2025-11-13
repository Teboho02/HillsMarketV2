import type { User, Product, Conversation, ItemCondition } from './types';

export const UNIVERSITIES: string[] = [
  "University of Cape Town",
  "Stellenbosch University",
  "Wits University",
  "University of Pretoria",
  "Rhodes University"
];

export const CATEGORIES: string[] = [
  "Textbooks",
  "Electronics",
  "Furniture",
  "Clothing",
  "Appliances"
];

export const CONDITIONS: ItemCondition[] = ['New', 'Like New', 'Good', 'Fair'];

export const MOCK_USERS: User[] = [
  { id: 1, name: "Alice Johnson", avatarUrl: "https://picsum.photos/seed/alice/100/100", university: "University of Cape Town", phoneNumber: "27821234567" },
  { id: 2, name: "Bob Williams", avatarUrl: "https://picsum.photos/seed/bob/100/100", university: "Wits University", phoneNumber: "27831234567" },
  { id: 3, name: "Charlie Brown", avatarUrl: "https://picsum.photos/seed/charlie/100/100", university: "Stellenbosch University" },
  { id: 4, name: "Diana Prince", avatarUrl: "https://picsum.photos/seed/diana/100/100", university: "University of Pretoria", phoneNumber: "27841234567" },
];

export const CURRENT_USER_ID = 1; // Used for mock login

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, title: "Advanced Calculus Textbook", description: "Slightly used, no markings. 8th Edition. Essential for first-year engineering and science students. Includes access code (unscratched).", price: 750, category: "Textbooks", condition: "Like New", imageUrls: ["https://picsum.photos/seed/calculus/600/400", "https://picsum.photos/seed/calculus2/600/400", "https://picsum.photos/seed/calculus3/600/400"], sellerId: 2, university: "Wits University" },
  { id: 2, title: "Noise-Cancelling Headphones", description: "Brand new in box. Sony WH-1000XM4 model. Unwanted gift. Amazing sound quality and noise cancellation, perfect for studying in noisy environments.", price: 1500, category: "Electronics", condition: "New", imageUrls: ["https://picsum.photos/seed/headphones/600/400", "https://picsum.photos/seed/headphones2/600/400", "https://picsum.photos/seed/headphones3/600/400"], sellerId: 3, university: "Stellenbosch University" },
  { id: 3, title: "Mini Fridge", description: "Perfect for a dorm room. Works great, keeps drinks and snacks cold. Small freezer compartment included. Model: KIC MiniCooler.", price: 500, category: "Appliances", condition: "Good", imageUrls: ["https://picsum.photos/seed/fridge/600/400", "https://picsum.photos/seed/fridge2/600/400"], sellerId: 4, university: "University of Pretoria" },
  { id: 4, title: "IKEA Desk Chair", description: "Comfortable and in good condition. Minor scuffs on the armrests but otherwise perfect. Adjustable height and tilt function.", price: 400, category: "Furniture", condition: "Good", imageUrls: ["https://picsum.photos/seed/chair/600/400", "https://picsum.photos/seed/chair2/600/400", "https://picsum.photos/seed/chair3/600/400", "https://picsum.photos/seed/chair4/600/400"], sellerId: 1, university: "University of Cape Town" },
  { id: 5, title: "University Hoodie", description: "Official university hoodie, size M. Worn twice. Super warm and comfortable. Selling because I bought the wrong size.", price: 250, category: "Clothing", condition: "Like New", imageUrls: ["https://picsum.photos/seed/hoodie/600/400", "https://picsum.photos/seed/hoodie2/600/400"], sellerId: 2, university: "Wits University" },
  { id: 6, title: "Organic Chemistry Textbook", description: "Essential for pre-meds. Includes solution manual. Covered in plastic, so it's in mint condition. 11th Edition by Paula Yurkanis Bruice.", price: 900, category: "Textbooks", condition: "Like New", imageUrls: ["https://picsum.photos/seed/chem/600/400", "https://picsum.photos/seed/chem2/600/400"], sellerId: 1, university: "University of Cape Town" },
  { id: 7, title: "Portable Bluetooth Speaker", description: "JBL Flip 5. Loud and clear sound, 12-hour battery life. Waterproof, so it's great for taking anywhere. Comes with charging cable.", price: 600, category: "Electronics", condition: "Good", imageUrls: ["https://picsum.photos/seed/speaker/600/400", "https://picsum.photos/seed/speaker2/600/400", "https://picsum.photos/seed/speaker3/600/400"], sellerId: 4, university: "University of Pretoria" },
  { id: 8, title: "Bookshelf", description: "Simple 3-shelf bookshelf. Easy to assemble. Made from light pine wood. Perfect for textbooks and decor. Dimensions: 120cm x 60cm x 30cm.", price: 200, category: "Furniture", condition: "Good", imageUrls: ["https://picsum.photos/seed/bookshelf/600/400"], sellerId: 3, university: "Stellenbosch University" },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    productId: 1,
    participantIds: [1, 2],
    messages: [
      { id: 1, senderId: 1, text: "Hi, is the calculus textbook still available?", timestamp: "10:30 AM" },
      { id: 2, senderId: 2, text: "Yes, it is!", timestamp: "10:31 AM" },
      { id: 3, senderId: 1, text: "Great! Could you do R650?", timestamp: "10:32 AM" },
    ]
  },
  {
    id: 2,
    productId: 2,
    participantIds: [1, 3],
    messages: [
      { id: 4, senderId: 1, text: "Hey! I'm interested in the headphones.", timestamp: "Yesterday" },
      { id: 5, senderId: 3, text: "Awesome, they are really good. Let me know if you have questions.", timestamp: "Yesterday" },
    ]
  }
];