import { PagePosterSearch } from "@/components/pages/PagePosterSearch";
import { PosterSearchFilters } from "@/services/posterService";
import { QueryParam } from "@/types/dataTypes";
import { QueryParamHelper } from "@/utils/queryParamHelper";

interface PosterSearchProps {
  searchParams: QueryParam;
}

export default function PosterSearch({ searchParams }: PosterSearchProps) {
  const searchParam: PosterSearchFilters =
    QueryParamHelper.getPosterSearchFilters(searchParams);
  return <PagePosterSearch {...searchParam} />;
}
