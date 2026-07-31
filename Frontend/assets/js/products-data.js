/*
 * STORE CATALOG — edit this file to manage products across the entire site.
 *
 * To change a product image, update `image` to a file in
 * assets/images/products/. The same image is used on the shop and detail page.
 * To add a product, duplicate an object and give it a unique `id`.
 */
const STORE_CATEGORIES = {
  all: 'All pieces',
  bags: 'Bags & totes',
  headwear: 'Headwear',
  'home-decor': 'Home decor',
  charms: 'Charms & gifts'
};

const STORE_PRODUCTS = [
  {
    id: 'bloom-market-bag', category: 'bags', name: 'Bloom market bag',
    subtitle: 'Oat & wildflower', price: '$84', image: 'assets/images/products/bag.png', label: 'New arrival',
    description: 'A roomy, hand-crocheted carryall with a cheerful floral finish. Made for market mornings, everyday errands and carrying a little joy wherever you go.',
    care: '100% cotton yarn · Approx. 30 × 26 cm · Spot clean gently.'
  },
  {
    id: 'shell-mini-bag', category: 'bags', name: 'Shell mini bag',
    subtitle: 'Berry pink', price: '$48', image: 'assets/images/products/seashellbag.png',
    description: 'A playful shell-shaped mini bag with a delicate chain strap. Perfect for your essentials and a little extra colour on a sunny day.',
    care: 'Cotton yarn · Lined interior · Approx. 18 × 16 cm.'
  },
  {
    id: 'grany-shoulder-bag', category: 'bags', name: 'Grany shoulder bag',
    subtitle: 'Pastel garden', price: '$92', image: 'assets/images/products/bag2.png', label: 'Limited',
    description: 'A flower-by-flower crochet shoulder bag with a joyful daisy motif. Each one is patiently made by hand, so yours will be entirely unique.',
    care: 'Cotton yarn · Fully hand crocheted · Approx. 32 × 28 cm.'
  },
  {
    id: 'petal-headband', category: 'headwear', name: 'Petal headband',
    subtitle: 'Soft blush', price: '$28', image: 'assets/images/products/headband.png',
    description: 'A soft crocheted headband with a comfortable, flexible fit. Made to add a gentle handmade detail to everyday looks.',
    care: 'Soft cotton blend · One size · Hand wash cold.'
  },
  {
    id: 'crochet-sun-hat', category: 'headwear', name: 'Crochet sun hat',
    subtitle: 'Warm oat', price: '$36', image: 'assets/images/products/hat3.png',
    description: 'A light, hand-crocheted hat for warm afternoons and slow days outdoors.',
    care: 'Cotton blend · One size · Hand wash cold and reshape while damp.'
  },
  {
    id: 'summer-bandana', category: 'headwear', name: 'Summer bandana',
    subtitle: 'Petal pink', price: '$24', image: 'assets/images/products/Bandana.png',
    description: 'A soft crochet bandana that adds a handmade touch to your everyday look.',
    care: 'Cotton yarn · One size · Hand wash cold.'
  },
  {
    id: 'soft-home-piece-2', category: 'home-decor', name: 'Soft home piece II',
    subtitle: 'Studio collection', price: '$38', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiB3uXPa0Blkv0rhEWMu3nXx402yjYohCeXvL9lBo3bbZJgwHqopnOT3aJ&s=10',
    description: 'A textured handmade piece created to bring a little warmth and softness to your favourite corner.',
    care: 'Cotton blend · Gentle machine wash · Reshape while damp.'
  },
  {
    id: 'soft-home-piece-3', category: 'home-decor', name: 'Soft home piece III',
    subtitle: 'Studio collection', price: '$38', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqkYoMHWN23--IkXvblpQDjEJbsoS8eI7ITJjb8T6oDg&s=10',
    description: 'A textured handmade piece created to bring a little warmth and softness to your favourite corner.',
    care: 'Cotton blend · Gentle machine wash · Reshape while damp.'
  },
  {
    id: 'soft-home-piece-4', category: 'home-decor', name: 'Soft home piece IV',
    subtitle: 'Studio collection', price: '$38', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-CxOwHcGBJHwgCXAThRfEArUR_ccgLpoZtEaqcUHvoQ&s=10',
    description: 'A textured handmade piece created to bring a little warmth and softness to your favourite corner.',
    care: 'Cotton blend · Gentle machine wash · Reshape while damp.'
  },
  {
    id: 'soft-home-piece-5', category: 'home-decor', name: 'Soft home piece V',
    subtitle: 'Studio collection', price: '$38', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlt1DSEXeDY6Ub5lm40r9Z2bPRMRyCyQWCTCHHGPB8uQ&s=10',
    description: 'A textured handmade piece created to bring a little warmth and softness to your favourite corner.',
    care: 'Cotton blend · Gentle machine wash · Reshape while damp.'
  },

  {
    id: 'lucky-charm-keychain-2', category: 'charms', name: 'Lucky charm keychain II',
    subtitle: 'Vintage gold', price: '$18', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc6F50s42Q7frpO9GQWpbJoi7DIw1XvP0Va0trr1xj_Q&s=10',
    description: 'A tiny crocheted charm for keys, bags and thoughtful gifts. Every flower is made stitch by stitch, so no two are the same.',
    care: 'Cotton yarn · Metal key ring · Approx. 8 cm wide.'
  },
  {
    id: 'lucky-charm-keychain', category: 'charms', name: 'Lucky charm keychain',
    subtitle: 'Vintage gold', price: '$18', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREi6SX9oIyqHT9XrHB2i9uhxtKaJUTWyKIVDX6F9ihCQ&s=10',
    description: 'A tiny crocheted charm for keys, bags and thoughtful gifts. Every flower is made stitch by stitch, so no two are the same.',
    care: 'Cotton yarn · Metal key ring · Approx. 8 cm wide.'
  },
  {
    id: 'lucky-charm-keychain', category: 'charms', name: 'Lucky charm keychain',
    subtitle: 'Vintage gold', price: '$18',  image: 'assets/images/products/chain3.png', label: 'New arrival',
    description: 'A tiny crocheted charm for keys, bags and thoughtful gifts. Every flower is made stitch by stitch, so no two are the same.',
    care: 'Cotton yarn · Metal key ring · Approx. 8 cm wide.'
  },
  {
    id: 'soft-home-piece-6', category: 'home-decor', name: 'Soft home piece VI',
    subtitle: 'Studio collection', price: '$38', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqkYoMHWN23--IkXvblpQDjEJbsoS8eI7ITJjb8T6oDg&s=10',
    description: 'A textured handmade piece created to bring a little warmth and softness to your favourite corner.',
    care: 'Cotton blend · Gentle machine wash · Reshape while damp.'
  },
  {
    id: 'soft-home-piece-7', category: 'home-decor', name: 'Soft home piece VII',
    subtitle: 'Studio collection', price: '$38', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-CxOwHcGBJHwgCXAThRfEArUR_ccgLpoZtEaqcUHvoQ&s=10',
    description: 'A textured handmade piece created to bring a little warmth and softness to your favourite corner.',
    care: 'Cotton blend · Gentle machine wash · Reshape while damp.'
  },
  {
    id: 'soft-home-piece-8', category: 'home-decor', name: 'Soft home piece VIII',
    subtitle: 'Studio collection', price: '$38', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlt1DSEXeDY6Ub5lm40r9Z2bPRMRyCyQWCTCHHGPB8uQ&s=10',
    description: 'A textured handmade piece created to bring a little warmth and softness to your favourite corner.',
    care: 'Cotton blend · Gentle machine wash · Reshape while damp.'
  },

];
