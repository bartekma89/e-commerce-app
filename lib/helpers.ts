import { StoreApiResponse } from "@/types/Product.types";

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(
  value: number,
  language: string,
  options: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(language, { ...options }).format(value);
}

export const recursiveFetch = async ({
  offset,
  currentRecords,
}: {
  offset: number;
  currentRecords: number;
}): Promise<number> => {
  const ITEMS = 1000;
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${ITEMS}&offset=${offset}`
  );
  const data: StoreApiResponse[] | [] = await res.json();
  let records = currentRecords;

  if (res.status === 200 && data.length > 0) {
    records += data.length;
  } else {
    return records;
  }

  return recursiveFetch({ offset: offset + ITEMS, currentRecords: records });
};
