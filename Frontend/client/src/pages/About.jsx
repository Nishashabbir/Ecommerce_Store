import { Link } from "wouter";
import { Heart, Sparkles, ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { TEAM_IMAGES } from "@/lib/embeddedImages";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function About() {
  return (
    <>
      <main className="bg-[#F5EFE8]">
        <section className="relative h-[500px] overflow-hidden">
          <img
            src="/images/story/studio-story.png"
            alt="About Us"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5C4A47]/70 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <motion.div initial="hidden" animate="visible" variants={stagger}>
                <motion.p
                  variants={fadeInUp}
                  className="text-[#FDF9F5] tracking-[0.2em] uppercase text-sm font-semibold mb-3"
                >
                  About Artisan Crochet
                </motion.p>
                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl md:text-7xl font-bold text-[#FDF9F5] mb-4"
                >
                  Our Story
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-[#FDF9F5] max-w-2xl"
                >
                  Handcrafted with love, one stitch at a time
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[#D4878E] tracking-[0.2em] uppercase text-sm font-semibold">
                  Who We Are
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#5C4A47] mt-3 mb-8">
                  Masters of Handmade Craft
                </h2>
                <p className="text-lg text-[#5C4A47] mb-6 leading-relaxed">
                  Artisan Crochet was born from a passion for handmade
                  craftsmanship and a desire to preserve the art of crochet in a
                  modern world. What started as a small hobby in our studio has
                  blossomed into a thriving community of makers and lovers of
                  artisanal goods.
                </p>
                <p className="text-lg text-[#5C4A47] mb-6 leading-relaxed">
                  Every piece in our collection is carefully crafted by skilled
                  artisans who pour their heart and soul into each project. We
                  believe that handmade items carry a special energy — they tell
                  stories, connect us to tradition, and celebrate the beauty of
                  imperfection.
                </p>
                <p className="text-lg text-[#5C4A47] leading-relaxed">
                  Our mission is to bring the warmth and authenticity of
                  handcrafted crochet into your home, one beautiful creation at
                  a time.
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/images/products/bag2.png"
                  alt="Our craft studio"
                  className="w-full h-[450px] object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#FDF9F5]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Our Mission",
                  desc: "To create beautiful, sustainable, and affordable handmade crochet products that bring joy, comfort, and connection to our customers. We are committed to supporting artisans and celebrating the timeless craft of crochet.",
                },
                {
                  icon: Sparkles,
                  title: "Our Vision",
                  desc: "To become the most trusted and beloved destination for premium handmade crochet and artisan crafts. We envision a world where handmade goods are cherished, artisans are valued, and creativity thrives.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="card-boutique"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#D4878E]/10 flex items-center justify-center">
                      <item.icon size={28} className="text-[#D4878E]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#5C4A47]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[#B08A9E] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.span
                variants={fadeInUp}
                className="text-[#D4878E] tracking-[0.2em] uppercase text-sm font-semibold"
              >
                Our Team
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-[#5C4A47] mt-3 mb-4"
              >
                Meet Our Artisans
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-[#B08A9E] max-w-xl mx-auto"
              >
                The talented hands behind every creation
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sajawal",
                  role: "Master Artisan",
                  years: "12 Years Experience",
                  bio: "Sajawal specializes in intricate lacework and heirloom-quality pieces. His attention to detail and mastery of traditional techniques make each creation a true work of art.",
                  image: TEAM_IMAGES.sajawal,
                  specialties: "Lacework, Heirloom Pieces",
                },
                {
                  name: "Nisha",
                  role: "Design Lead",
                  years: "8 Years Experience",
                  bio: "Nisha brings modern design sensibilities to traditional crochet. Her innovative patterns and contemporary color palettes have redefined what handmade fashion can be.",
                  image: TEAM_IMAGES.nisha,
                  specialties: "Modern Design, Fashion",
                },
                {
                  name: "Zulkifal",
                  role: "Pattern Expert",
                  years: "15 Years Experience",
                  bio: "With decades of experience, Zulkifal is our master of patterns. His deep understanding of crochet geometry and structure ensures every piece is both beautiful and durable.",
                  image: TEAM_IMAGES.zulkifal,
                  specialties: "Patterns, Structural Design",
                },
              ].map((member, i) => (
                <motion.div
                  key={member.name}
                  className="card-boutique text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border-4 border-[#D4878E]/20">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#5C4A47] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#D4878E] font-semibold mb-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-[#B08A9E] mb-4">{member.years}</p>
                  <p className="text-[#5C4A47] text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="inline-block px-4 py-1.5 bg-[#D4878E]/10 rounded-full text-xs text-[#D4878E] font-medium">
                    {member.specialties}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#FDF9F5]">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.span
                variants={fadeInUp}
                className="text-[#D4878E] tracking-[0.2em] uppercase text-sm font-semibold"
              >
                Testimonials
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-[#5C4A47] mt-3 mb-4"
              >
                What Our Customers Say
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Sajawal's handmade blanket is extraordinary. You can feel the love in every stitch. It has become the centerpiece of our living room.",
                  author: "Sarah M.",
                  location: "New York",
                },
                {
                  quote:
                    "I commissioned a custom sweater from Nisha and she exceeded every expectation. The attention to detail is impeccable. Truly a wearable work of art.",
                  author: "James K.",
                  location: "Los Angeles",
                },
                {
                  quote:
                    "Zulkifal's crochet flowers are absolutely stunning. I ordered a set for my wedding and they were more beautiful than I could have imagined.",
                  author: "Emma R.",
                  location: "Chicago",
                },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  className="card-boutique relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Quote
                    size={24}
                    className="text-[#D4878E]/20 absolute top-4 right-4"
                  />
                  <p className="text-[#5C4A47] mb-6 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-semibold text-[#D4878E]">
                    &mdash; {t.author}
                  </p>
                  <p className="text-xs text-[#B08A9E]">{t.location}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#5C4A47] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, #D4878E 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container mx-auto px-4 text-center relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-[#FDF9F5] mb-6"
              >
                Ready to Explore Our Collection?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-[#D4878E] mb-8 max-w-2xl mx-auto"
              >
                Discover the beauty of handmade crochet and artisan crafts. Each
                piece tells a story of dedication and artistry.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col md:flex-row gap-4 justify-center"
              >
                <Link href="/checkout">
                  <motion.button
                    className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Shop Now <ArrowRight size={20} />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    className="border-2 border-[#FDF9F5]/40 text-[#FDF9F5] px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center gap-2 hover:bg-[#FDF9F5]/10 transition-all duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
