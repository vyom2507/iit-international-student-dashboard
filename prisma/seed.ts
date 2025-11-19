import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      title: "Used Calculus Textbook (Stewart)",
      slug: "used-calculus-textbook-stewart",
      description:
        "Clean copy with minimal notes, great for first-year calculus. No access code included.",
      priceCents: 2500,
      category: "Textbooks",
      condition: "Good",
      imageUrl: "/marketplace/textbook-calculus.jpg",
      campus: "IIT Main Campus"
    },
    {
      title: "Desk Lamp with USB Charging",
      slug: "desk-lamp-usb-charging",
      description:
        "LED desk lamp with adjustable arm and built-in USB port for your phone.",
      priceCents: 1800,
      category: "Furniture & Room",
      condition: "Like New",
      imageUrl: "/marketplace/desk-lamp.jpg",
      campus: "IIT Main Campus"
    },
    {
      title: "Gently Used Laptop Stand",
      slug: "gently-used-laptop-stand",
      description:
        "Metal adjustable laptop stand, perfect for online classes and ergonomic setups.",
      priceCents: 1200,
      category: "Electronics & Accessories",
      condition: "Like New",
      imageUrl: "/marketplace/laptop-stand.jpg",
      campus: "IIT Main Campus"
    },
    {
      title: "Mini Rice Cooker",
      slug: "mini-rice-cooker",
      description:
        "Small rice cooker ideal for dorm rooms. Great for quick meals.",
      priceCents: 2200,
      category: "Kitchen",
      condition: "Very Good",
      imageUrl: "/marketplace/rice-cooker.jpg",
      campus: "IIT Main Campus"
    }
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      create: p,
      update: p
    });
  }

  console.log("Seeded marketplace products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
