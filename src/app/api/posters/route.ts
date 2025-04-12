// app/api/hello/route.ts
import { PosterService } from "@/services/posterService";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: PosterService.getAll() });
}
