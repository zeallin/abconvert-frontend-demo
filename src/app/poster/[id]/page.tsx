import { PagePosterSingle } from "@/components/pages/PagePosterSingle";

export default function PosterSingle({ params }: { params: { id: string } }) {
  const { id } = params;
  return <PagePosterSingle id={id} />;
}
