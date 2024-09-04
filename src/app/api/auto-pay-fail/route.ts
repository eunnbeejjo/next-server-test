// app/api/auto-pay-fail/route.js
import { NextRequest, NextResponse } from "next/server";

// 자동 지급 실패건은 지급 대기로 들어가서 사용하지 않음
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log(data, "data");

    // 서버 측 데이터베이스에 저장하는 로직을 여기에 추가할 수 있습니다.

    return NextResponse.json(
      {
        message: "자동지급 실패",
        // data,
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
