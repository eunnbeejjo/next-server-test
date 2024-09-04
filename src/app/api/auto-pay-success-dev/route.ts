// app/api/auto-pay-success/route.js
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// DEV 테스트 환경
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log(data, "data");

    // Supabase에 데이터 저장
    const { error } = await supabase
      .from("auto_pay_success_dev")
      .insert(data.list);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      {
        message: "자동지급 성공",
        data,
      },
      { status: 200 }
    );
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
