// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://ec2-43-200-42-220.ap-northeast-2.compute.amazonaws.com/api/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // 또는 ['http://localhost:5174']와 같이 특정 출처를 지정할 수 있습니다.
          },
        ],
      },
    ];
  },
};
