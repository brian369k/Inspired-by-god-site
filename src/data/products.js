export const products = [
  {
    id: 1,
    name: "IBG SIGNATURE TEE",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: "BESTSELLER",
    stripeLink: "https://buy.stripe.com/00w6oH8yL1IK9PpcrZ6Ri04",
    description: "The essential IBG signature tee. Heavyweight premium cotton with screen-printed IBG logo. A staple piece for the chosen.",
    details: [
      "100% heavyweight ring-spun cotton",
      "Screen-printed IBG logo",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=90",
    ],
  },
  {
    id: 2,
    name: "IBG CROSS TEE",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: "NEW",
    stripeLink: "https://buy.stripe.com/fZu3cvdT51IKaTtfEb6Ri03",
    description: "Bold cross graphic tee. Premium heavyweight cotton with oversized cross print. Statement piece for the anointed.",
    details: [
      "100% heavyweight ring-spun cotton",
      "Oversized cross graphic print",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=90",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=90",
    ],
  },
  {
    id: 3,
    name: "IBG DIVINE TEE",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: null,
    stripeLink: "https://buy.stripe.com/5kQaEXeX90EG5z977F6Ri02",
    description: "Clean and minimal IBG Divine tee. Let your presence speak. Premium cotton, elevated basics.",
    details: [
      "100% heavyweight ring-spun cotton",
      "Embroidered IBG chest logo",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
    ],
  },
  {
    id: 4,
    name: "IBG SACRED TEE",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: "LIMITED",
    stripeLink: "https://buy.stripe.com/dRm9ATaGT3QS2mX0Jh6Ri01",
    description: "The IBG Sacred tee. Back arc text print with premium construction. Limited quantities — move with intention.",
    details: [
      "100% heavyweight ring-spun cotton",
      "Back arc text screen print",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
      "https://images.unsplash.com/photo-1503341338985-95c9a5e2827a?w=800&q=90",
    ],
  },
  {
    id: 5,
    name: "IBG CHOSEN TEE",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: null,
    stripeLink: "https://buy.stripe.com/bJe4gzbKXfzA9PpeA76Ri00",
    description: "IBG Chosen tee. Worn by those who know their purpose. Premium heavyweight cotton, clean silhouette.",
    details: [
      "100% heavyweight ring-spun cotton",
      "Chosen graphic front print",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=90",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
    ],
  },
];

export const categories = ["all", "tshirts"];

export const getProductById = (id) => products.find((p) => p.id === Number(id));

export const getPriceBySize = (product, size) => {
  if (size === "3X") return product.price3x;
  if (size === "2X") return product.price2x;
  return product.price;
};
