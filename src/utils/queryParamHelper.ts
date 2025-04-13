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

    filter.pageSize = DataUtil.ensureParseInt(
      queryParams.page_size,
      defaultPageSize
    );

    filter.pageNo = DataUtil.ensureParseInt(queryParams.page_no, defaultPageNo);

    return filter;
  }
  static getPosterSearchUrl(
    baseUrl: string,
    filters: PosterSearchFilters
  ): string {
    const url = baseUrl;
    const paramList = [];

    if (Checker.isNonEmptyStr(filters.keyword))
      paramList.push(
        `keyword=${encodeURIComponent(filters.keyword as string)}`
      );

    if (Checker.isSetNonNull(filters.pageNo))
      paramList.push(`page_no=${encodeURIComponent(`${filters.pageNo}`)}`);

    const finalUrl = `${url}?${paramList.join("&")}`;

    return finalUrl;
  }
}
