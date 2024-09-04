// app/api/auto-pay-success/route.js
import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; //이거 추가하셔야함

// DEV 테스트 환경
export async function GET() {
  try {
    // Supabase에 데이터 호출(성공 데이터)
    const { data: successData } = await supabase
      .from("push_send_success_dev")
      .select("userKeyList, code, id, createdAt");

    console.log(successData, "successData");

    // Supabase에 데이터 호출(성공 데이터)
    const { data: failData } = await supabase
      .from("push_send_fail_dev")
      .select("userKeyList, code, id, createdAt");

    console.log(successData, "successData");

    const data = {
      pushSendSuccess: successData,
      pushSendFail: failData,
    };

    const response = NextResponse.json(
      {
        message: "푸시 전송결과 조회",
        data,
      },
      { status: 200 }
    );

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
