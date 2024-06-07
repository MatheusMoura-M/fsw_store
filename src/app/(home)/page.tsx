import Image from "next/image";
import Categories from "./components/categories";
import ProductList from "@/components/ui/product-list";
import { prismaClient } from "@/lib/prisma";
import SectionTitle from "@/components/ui/section-title";
import PromoBanner from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div>
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto esse mês!"
        className="px-5 lg:hidden"
      />

      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <SectionTitle className="pl-5">Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner-home-02.png"
        alt="Até 55% de desconto em mouses!"
        className="w-0 flex-1 px-5"
      />

      <div className="flex flex-col gap-3 lg:gap-5">
        <SectionTitle className="pl-5">Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>
  );
}
