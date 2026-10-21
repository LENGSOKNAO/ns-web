export default function HeroStats() {
  const stats = [
    { value: "200+", label: "International Brands" },
    { value: "2,000+", label: "High-Quality Products" },
    { value: "30,000+", label: "Happy Customers" },
  ];

  return (
    <div className="mt-8 flex flex-wrap items-center justify-start divide-x divide-black/10 sm:mt-10 lg:mt-12">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`${
            index === 0
              ? "pr-6 sm:pr-8"
              : index === 1
              ? "px-6 sm:px-8"
              : "pl-6 sm:pl-8"
          }`}
        >
          <p className="font-bold text-2xl tracking-tight text-black sm:text-3xl lg:text-[40px] leading-none">
            {stat.value}
          </p>
          <p className="mt-1 text-xs text-black/60 sm:text-sm whitespace-nowrap">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
