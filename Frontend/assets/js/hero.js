/* Homepage hero animation. Only loaded by index.html. */
const heroStory = document.querySelector('.story');

if (heroStory) {
  const heroFrameCount = 57;
  const heroFrames = Array.from(
    { length: heroFrameCount },
    (_, index) => `assets/images/hero/frame_${String(index + 1).padStart(5, '0')}.png`
  );
  const heroImage = document.querySelector('#film');
  const heroCopy = {
    eyebrow: document.querySelector('#eyebrow'),
    headline: document.querySelector('#headline'),
    lede: document.querySelector('#lede'),
    link: document.querySelector('#discover')
  };
  const chapters = [
    ['A slower kind of beautiful', 'One thread.<br><em>A whole world.</em>', 'Handmade objects for soft living — each loop holding a little more care than the last.'],
    ['Hands remember', 'A rhythm<br><em>of care.</em>', 'A patient process of pulling, looping and turning. Nothing rushed. Nothing quite the same.'],
    ['Made to bloom', 'A little joy,<br><em>in every stitch.</em>', 'Colour finds its way in. Petals take shape. The ordinary becomes something you want to hold onto.'],
    ['For the life around you', 'Made slowly.<br><em>Loved dearly.</em>', 'A soft companion for market mornings, sunlit rooms and all the in-between moments.']
  ];
  let activeFrame = -1;
  let activeChapter = -1;

  heroFrames.forEach((source) => { const image = new Image(); image.src = source; });

  function updateHeroChapter(index) {
    const [eyebrow, headline, lede] = chapters[index];
    heroCopy.eyebrow.textContent = eyebrow;
    heroCopy.headline.innerHTML = headline;
    heroCopy.lede.textContent = lede;
    heroCopy.link.style.opacity = index === chapters.length - 1 ? '.35' : '1';
  }

  function updateHero() {
    const scrollableHeight = heroStory.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -heroStory.getBoundingClientRect().top / scrollableHeight));
    const nextFrame = Math.floor(progress * (heroFrameCount - 1));
    const nextChapter = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
    if (nextFrame !== activeFrame) { activeFrame = nextFrame; heroImage.src = heroFrames[nextFrame]; }
    if (nextChapter !== activeChapter) { activeChapter = nextChapter; updateHeroChapter(nextChapter); }
  }

  window.addEventListener('scroll', updateHero, { passive: true });
  window.addEventListener('resize', updateHero);
  updateHero();
}
