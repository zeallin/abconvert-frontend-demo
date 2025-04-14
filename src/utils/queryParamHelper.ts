import { PosterSearchFilters } from "@/services/posterService";
import { QueryParam } from "@/types/dataTypes";
import Checker from "@/utils/checker";
import DataUtil from "@/utils/dataUtil";

const defaultPageSize = 15;
const defaultPageNo = 1;

export class QueryParamHelper {
  static getPosterSearchFilters(queryParams: QueryParam): PosterSearchFilters {
    const filter: PosterSearchFilters = {};

    if (Checker.isNonEmptyStr(queryParams.keyword))
      filter.keyword = queryParams.keyword as string;

    if (Checker.isNonEmptyStr(queryParams.category))
      filter.category = queryParams.category as string;

    if (Checker.isNonEmptyStr(queryParams.color))
      filter.color = queryParams.color as string;

    if (Checker.isNonEmptyStr(queryParams.year_gte))
      filter.yearGte = parseInt(queryParams.year_gte as string);

    if (Checker.isNonEmptyStr(queryParams.year_lte))
      filter.yearLte = parseInt(queryParams.year_lte as string);

    filter.pageSize = DataUtil.ensureParseInt(
      queryParams.page_size,
      defaultPageSize
    );

    filter.pageNo = DataUtil.ensureParseInt(queryParams.page_no, defaultPageNo);

    return filter;
  }
  static getPosterSearchUrl(
    baseUrl: string,
    filters?: PosterSearchFilters
  ): string {
    const url = baseUrl;
    const paramList = [];
    if (!filters) return baseUrl;
    if (Checker.isNonEmptyStr(filters.keyword))
      paramList.push(
        `keyword=${encodeURIComponent(filters.keyword as string)}`
      );

    if (Checker.isSetNonNull(filters.pageNo))
      paramList.push(`page_no=${encodeURIComponent(`${filters.pageNo}`)}`);

    if (Checker.isNonEmptyStr(filters.category))
      paramList.push(`category=${encodeURIComponent(`${filters.category}`)}`);

    if (Checker.isNonEmptyStr(filters.color))
      paramList.push(`color=${encodeURIComponent(`${filters.color}`)}`);

    if (Checker.isSetNonNull(filters.yearGte))
      paramList.push(`year_gte=${encodeURIComponent(`${filters.yearGte}`)}`);

    if (Checker.isSetNonNull(filters.yearLte))
      paramList.push(`year_lte=${encodeURIComponent(`${filters.yearLte}`)}`);

    const finalUrl = `${url}?${paramList.join("&")}`;

    return finalUrl;
  }
}
