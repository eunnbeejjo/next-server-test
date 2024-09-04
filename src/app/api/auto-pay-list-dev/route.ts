// app/api/auto-pay-success/route.js
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; //이거 추가하셔야함

// DEV 테스트 환경
export async function GET() {
  try {
    // Supabase에 데이터 호출
    const { data } = await supabase
      .from("auto_pay_success_dev")
      .select("userKey, code, id, createdAt");

    const response = NextResponse.json(
      {
        message: "자동지급 성공 조회",
        data,
      },
      { status: 200 }
    );

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error: unknown) {
    console.error("Error occurred:", error);

    let errorMessage = "An unknown error occurred";

    // 타입 가드를 통해 error의 타입을 확인
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
