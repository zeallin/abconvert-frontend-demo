import { PosterSearchFilters } from "@/services/posterService";
import { QueryParam } from "@/types/dataTypes";
import Checker from "@/utils/checker";
import DataUtil from "@/utils/dataUtil";

const defaultPageSize = 15;

export class QueryParamHelper {
  static getPosterSearchFilters(queryParams: QueryParam): PosterSearchFilters {
    const filter: PosterSearchFilters = {};

    if (Checker.isNonEmptyStr(queryParams.keyword))
      filter.keyword = queryParams.keyword as string;

    filter.pageSize = DataUtil.ensureParseInt(
      queryParams.pageSize,
      defaultPageSize
    );

    return filter;
  }
}
