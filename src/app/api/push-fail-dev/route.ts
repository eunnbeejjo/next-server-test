// app/api/push-fail/route.js
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// DEV 테스트 환경
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log(data, "data");

    // Supabase에 데이터 저장
    const { error } = await supabase.from("push_send_fail_dev").insert(data);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      {
        message: "푸시 전송 실패",
        data,
      },
      { status: 400 }
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
