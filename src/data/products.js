const IBG_ALL_BLOCKED_UP = 'https://raw.githubusercontent.com/brian369k/Inspired-by-god-site/main/IBG%20ALL%20BLOCKED%20UP.png';
const IBG_THE_KINGS_HOUSE = 'https://raw.githubusercontent.com/brian369k/Inspired-by-god-site/main/kings-house.png';
const IBG_OVERLAPPED = 'https://raw.githubusercontent.com/brian369k/Inspired-by-god-site/main/IBG%20OVERLAPPED-BLACK.png';
const IBG_IM_SOO_RAZZ = 'https://raw.githubusercontent.com/brian369k/Inspired-by-god-site/main/soo-razz.png';
const IBG_MAKE_A_WORD = 'https://raw.githubusercontent.com/brian369k/Inspired-by-god-site/main/make-a-word.png';

export const products = [
  {
    id: 1,
    name: "IBG ALL BLOCKED UP",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: "BESTSELLER",
    stripeLink: "https://buy.stripe.com/00w6oH8yL1IK9PpcrZ6Ri04",
    description: "The IBG All Blocked Up tee. Bold blocked lettering on premium heavyweight cotton. A statement piece for the chosen.",
    details: [
      "100% heavyweight ring-spun cotton",
      "Bold blocked letter print",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [IBG_ALL_BLOCKED_UP],
  },
  {
    id: 2,
    name: "IBG THE KING'S HOUSE",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: "NEW",
    stripeLink: "https://buy.stripe.com/fZu3cvdT51IKaTtfEb6Ri03",
    description: "The IBG King's House tee. Premium heavyweight cotton with bold graphic print. Wear your faith with confidence.",
    details: [
      "100% heavyweight ring-spun cotton",
      "King's House graphic print",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [IBG_THE_KINGS_HOUSE],
  },
  {
    id: 3,
    name: "IBG OVERLAPPED",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: null,
    stripeLink: "https://buy.stripe.com/3cI3cv02fcnoaTteA76Ri05",
    description: "The IBG Overlapped tee. Signature overlapping IBG logo in gold on premium cotton. The essential IBG piece.",
    details: [
      "100% heavyweight ring-spun cotton",
      "Overlapped IBG logo print",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [IBG_OVERLAPPED],
  },
  {
    id: 4,
    name: "IBG I'M SOO RAZZ",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: "LIMITED",
    stripeLink: "https://buy.stripe.com/dRm9ATaGT3QS2mX0Jh6Ri01",
    description: "The IBG I'm Soo Razz tee. Limited edition drop on premium heavyweight cotton. Move with purpose.",
    details: [
      "100% heavyweight ring-spun cotton",
      "I'm Soo Razz graphic print",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [IBG_IM_SOO_RAZZ],
  },
  {
    id: 5,
    name: "IBG MAKE A WORD",
    price: 17.99,
    price2x: 19.49,
    price3x: 20.49,
    category: "tshirts",
    tag: null,
    stripeLink: "https://buy.stripe.com/bJe4gzbKXfzA9PpeA76Ri00",
    description: "The IBG Make A Word tee. Premium heavyweight cotton with bold statement print. For those who move with divine purpose.",
    details: [
      "100% heavyweight ring-spun cotton",
      "Make A Word graphic print",
      "Unisex oversized fit",
      "Pre-shrunk and garment washed",
      "Ribbed crew neck",
    ],
    sizes: ["S", "M", "L", "XL", "2X", "3X"],
    colors: ["Black", "White", "Sand", "Azalea", "Cardinal Blue"],
    images: [IBG_MAKE_A_WORD],
  },
];

export const categories = ["all", "tshirts"];

export const getProductById = (id) => products.find((p) => p.id === Number(id));

export const getPriceBySize = (product, size) => {
  if (size === "3X") return product.price3x;
  if (size === "2X") return product.price2x;
  return product.price;
};