import MiniSearch from "minisearch";
import { Poster, PosterPicks } from "../types/dataTypes";

import itemData from "../data/poster.json";

const items: Poster[] = itemData;

const miniSearch = new MiniSearch({
  fields: ["name", "category", "color"], // fields to index for full-text search
  storeFields: [
    "id",
    "name",
    "sizeWidthInch",
    "sizeHeightInch",
    "year",
    "price",
    "thumbPath",
    "color",
    "category",
  ], // fields to return with search results
});

// Index all documents
miniSearch.addAll(items);

export interface PosterSearchFilters {
  keyword?: string;
  id?: string;
  ids?: string[];
  name?: string;
  year?: number; // Equal
  yearGte?: number; // Greater than
  yearLte?: number; // Less than
  price?: number; // Equal
  priceGte?: number; // Greater than
  priceLte?: number; // Less than
  category?: string;
  color?: string;
  pageNo?: number;
  pageSize?: number;
}
interface SearchResult<T> {
  items: T[];
  itemCount: number;
  pageCount: number;
  pageSize: number;
  pageNo: number;
}

// Search function
function searchPosters({
  keyword,
  id,
  ids,
  name,
  year,
  yearGte,
  yearLte,
  price,
  priceGte,
  priceLte,
  category,
  color,
  pageNo = 1,
  pageSize = 15,
}: PosterSearchFilters): SearchResult<Poster> {
  const result: SearchResult<Poster> = {
    items: [],
    itemCount: 0,
    pageCount: 0,
    pageSize,
    pageNo,
  };

  let dataset = items;
  if (keyword !== undefined) {
    dataset = miniSearch.search(keyword, {
      fields: ["name"],
      fuzzy: 0.3,
    }) as unknown as Poster[];
  }

  // Apply range filters for year and price

  if (yearGte !== undefined) {
    dataset = dataset.filter((poster) => poster.year! >= yearGte);
  }
  if (yearLte !== undefined) {
    dataset = dataset.filter((poster) => poster.year! <= yearLte);
  }
  if (priceGte !== undefined) {
    dataset = dataset.filter((poster) => poster.price >= priceGte);
  }
  if (priceLte !== undefined) {
    dataset = dataset.filter((poster) => poster.price <= priceLte);
  }
  if (price !== undefined) {
    dataset = dataset.filter((poster) => poster.price === price);
  }
  if (ids !== undefined) {
    dataset = dataset.filter((poster) => ids.includes(poster.id));
  }
  if (color !== undefined) {
    dataset = dataset.filter((poster) => poster.color.includes(color));
  }
  if (category !== undefined) {
    dataset = dataset.filter((poster) => poster.category.includes(category));
  }
  if (name !== undefined) {
    dataset = dataset.filter((poster) => poster.name === name);
  }
  if (id !== undefined) {
    const originalId = id.toUpperCase();
    // TODO: may prepare a id map
    dataset = dataset.filter((poster) => poster.id === originalId);
  }
  if (year !== undefined) {
    dataset = dataset.filter((poster) => poster.year === year);
  }

  // Apply paging
  const totalCount = dataset.length;
  const startIndex = (pageNo - 1) * pageSize;
  const paginatedResults = dataset.slice(startIndex, startIndex + pageSize);

  result.itemCount = totalCount;
  result.items = paginatedResults;
  result.pageNo = pageNo;
  result.pageCount = Math.ceil(totalCount / pageSize);

  return result;
}

const staffPicks: Poster[] = searchPosters({
  ids: ["MPW-146606", "MPW-144918", "MPW-146223", "MPW-146373", "MPW-140900"],
}).items;

const topSelling: Poster[] = searchPosters({
  ids: ["MPW-142454", "MPW-144571", "MPW-131637", "MPW-130373", "MPW-138804"],
}).items;

const newRelease: Poster[] = searchPosters({
  ids: ["MPW-146635", "MPW-146497", "MPW-146158", "MPW-146139", "MPW-136841"],
}).items;

export class PosterService {
  public static getAll(): Poster[] {
    return items;
  }
  public static search(param: PosterSearchFilters): SearchResult<Poster> {
    return searchPosters(param);
  }
  public static getPicks(): PosterPicks {
    return {
      staffPicks,
      topSelling,
      newRelease,
    };
  }
}
