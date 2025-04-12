// app/api/hello/route.ts
import { NextResponse } from "next/server";
import PosterService from "../../../../services/posterService";

export async function GET() {
  return NextResponse.json({ data: PosterService.getPicks() });
}
