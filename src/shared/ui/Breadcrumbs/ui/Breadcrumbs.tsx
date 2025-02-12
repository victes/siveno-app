"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const segmentNames: Record<string, string> = {
  "catalog-categories": "Каталог",
  "catalog-products": "Каталог",
};

const isSlug = (segment: string) => /^[a-zA-Z0-9-_]+$/.test(segment);
const isProductId = (segment: string) => /^[0-9]+$/.test(segment);

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(segment => segment);

  return (
    <nav aria-label="breadcrumb">
      <ul className="flex space-x-2 text-gray-600">
        <li>
          <Link href="/" className="hover:underline">
            Главная
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const isLast = index === pathSegments.length - 1;

          let displayName = segmentNames[segment] || decodeURIComponent(segment);
          if (isSlug(segment) && !segmentNames[segment]) displayName = segment;
          if (isProductId(segment)) displayName = "Product";

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-800">{displayName}</span>
              ) : (
                <Link href={href === "/catalog-products" ? "/catalog-categories" : href} className="hover:underline">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
