import MiniSearch from "minisearch";
import { Poster, PosterPicks } from "../types/dataTypes";

const items: Poster[] = require("../data/poster.json");

let miniSearch = new MiniSearch({
  fields: ["name", "category", "color"], // fields to index for full-text search
  storeFields: [
    "id",
    "name",
    "sizeWidthInch",
    "sizeHeightInch",
    "year",
    "price",
    "thumbPath",
  ], // fields to return with search results
});

// Index all documents
miniSearch.addAll(items);

interface PosterSearchFilters {
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
  page?: number;
  pageSize?: number;
}

// Search function
export function searchPosters({
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
  page = 1,
  pageSize = 10,
}: PosterSearchFilters) {
  // Build FlexSearch queries
  const queries: any[] = [];
  if (id) queries.push({ field: "id", query: id });
  if (name) queries.push({ field: "name", query: name, limit: 2000 }); // Fuzzy for name
  if (year !== undefined) queries.push({ field: "year", query: year });
  if (price !== undefined) queries.push({ field: "price", query: price });
  if (category) queries.push({ field: "category", query: category });
  if (color) queries.push({ field: "color", query: color });

  // Perform FlexSearch
  let results: any[] = [];
  if (queries.length > 0) {
    const searchResults = index.search(queries as any, {
      enrich: true,
    }) as any[];
    // Combine results with AND logic
    const resultMap = new Map();
    searchResults.forEach((fieldResults) => {
      fieldResults.result.forEach((r: any) => {
        const id = r.id;
        if (!resultMap.has(id)) resultMap.set(id, new Set());
        resultMap.get(id).add(fieldResults.field);
      });
    });
    // Only keep items matching all queried fields
    const validIds = Array.from(resultMap.entries())
      .filter(([_, fields]) => fields.size === queries.length)
      .map(([id]) => Number(id));
    results = validIds.map((id) => items[id]);
  } else {
    results = items;
  }

  // Apply range filters for year and price
  if (yearGte !== undefined) {
    results = results.filter((poster) => poster.year >= yearGte);
  }
  if (yearLte !== undefined) {
    results = results.filter((poster) => poster.year <= yearLte);
  }
  if (priceGte !== undefined) {
    results = results.filter((poster) => poster.price >= priceGte);
  }
  if (priceLte !== undefined) {
    results = results.filter((poster) => poster.price <= priceLte);
  }
  if (ids !== undefined) {
    results = results.filter((poster) => ids.includes(poster.id));
  }

  // Apply paging
  const totalResults = results.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedResults = results.slice(startIndex, startIndex + pageSize);

  return {
    results: paginatedResults,
    totalResults,
    totalPages: Math.ceil(totalResults / pageSize),
    currentPage: page,
  };
}

const topItems: Poster[] = searchPosters({
  ids: ["MPW-146606", "MPW-144918", "MPW-146223", "MPW-128534", "A70-6975"],
}).results;
// const starWars: Poster[] = searchPosters({
//   name: "starwars",
// }).results;

export default class PosterService {
  public static getAll(): Poster[] {
    return items;
  }
  public static getPicks(): PosterPicks {
    const starWars = miniSearch
      .search("movie", { fields: ["name"], fuzzy: 0.2 })
      .slice(0, 5);

    return {
      staffPicks: topItems,
      topSelling: starWars,
      newRelease: topItems,
    };
  }
}
