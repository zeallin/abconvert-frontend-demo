import { PagePosterSingle } from "@/components/pages/PagePosterSingle";

export const PosterSingle = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <PagePosterSingle id={id} />;
};

export default PosterSingle;
