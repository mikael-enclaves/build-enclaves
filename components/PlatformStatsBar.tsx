"use client";

export function PlatformStatsBar() {
  const tvl = 139.5;
  const totalAssets = 10;
  const issuers = 9;
  const categories = 8;

  return (
    <div
      className="w-full py-3 px-4 md:px-6 text-center text-sm text-white"
      style={{
        background: "linear-gradient(135deg, #2d1b4e 0%, #1a0d2e 100%)",
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-inherit [&_*]:text-white">
        <span>
          <span className="opacity-90">TVL</span>{" "}
          <span className="font-semibold">${tvl}M</span>
        </span>
        <span className="opacity-50">|</span>
        <span>
          <span className="font-semibold">{totalAssets}</span>{" "}
          <span className="opacity-90">Total Assets</span>
        </span>
        <span className="opacity-50">|</span>
        <span>
          <span className="font-semibold">{issuers}</span>{" "}
          <span className="opacity-90">Issuers</span>
        </span>
        <span className="opacity-50">|</span>
        <span>
          <span className="font-semibold">{categories}</span>{" "}
          <span className="opacity-90">Categories</span>
        </span>
      </div>
    </div>
  );
}
