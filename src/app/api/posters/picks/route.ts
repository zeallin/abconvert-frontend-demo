// app/api/hello/route.ts
import { NextResponse } from "next/server";
import PosterService from "../../../../services/poster.service";

export async function GET() {
  return NextResponse.json({ data: PosterService.getPicks() });
}
