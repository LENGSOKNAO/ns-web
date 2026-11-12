import Link from "next/link";

interface CategoryHeaderProps {
  category: string;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <>
      <div className="mb-6 flex gap-2 text-sm text-gray-500">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/category">Shop</Link>
        <span>/</span>
        <span className="text-black">{category}</span>
      </div>

      <h1 className="mb-8 text-3xl font-black sm:text-4xl">{category}</h1>
    </>
  );
}
