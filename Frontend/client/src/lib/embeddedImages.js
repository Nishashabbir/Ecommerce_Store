const pexels = (id, w = 800, h = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const PRODUCT_IMAGES = {
  blanket: pexels(37594842, 800, 600),
  sweater: pexels(14882515, 800, 600),
  accessories: pexels(30859913, 800, 600),
  heroBg: pexels(10964017, 1920, 1080),
  bestseller1: pexels(10885127, 600, 700),
  bestseller2: pexels(33310954, 600, 700),
  bestseller3: pexels(10585295, 600, 700),
  newArrival1: pexels(19814912, 600, 700),
  newArrival2: pexels(7941137, 600, 700),
  newArrival3: pexels(9612675, 600, 700),
  category1: pexels(5603266, 600, 400),
  category2: pexels(28011141, 600, 400),
  category3: pexels(37594842, 600, 400),
};

export const ICON_IMAGES = {
  premium: pexels(35977640, 400, 400),
  sustainable: pexels(35259597, 400, 400),
  unique: pexels(5806945, 400, 400),
  love: pexels(19479490, 400, 400),
};

export const TEAM_IMAGES = {
  sajawal: pexels(1139743, 300, 300),
  nisha: pexels(15089918, 300, 300),
  zulkifal: pexels(3846249, 300, 300),
};

export const PAGE_IMAGES = {
  aboutHero: pexels(29889868, 1200, 600),
  contactHero: pexels(37178191, 1200, 600),
  faqHero: pexels(35977640, 1200, 600),
  craftStudio: pexels(7585573, 800, 600),
  contactForm: pexels(33207480, 600, 400),
  artisanWorkspace: pexels(5806921, 800, 600),
  gallery1: pexels(34505204, 600, 600),
  gallery2: pexels(37465890, 600, 600),
  gallery3: pexels(7585768, 600, 600),
  gallery4: pexels(5806945, 600, 600),
};
