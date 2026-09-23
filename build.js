const fs = require('fs');
const path = require('path');

// 1. 무작위 패턴 추출 유틸리티
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 2. 본문 스피닝 콘텐츠 생성 함수
function renderSpunContent(regionName) {
    const bikePatterns = [
        `<strong>🏍️ ${regionName} 오토바이 퀵</strong> : 소형 긴급 화물 및 중요 서류 신속 배송 지원`,
        `<strong>🏍️ ${regionName} 오토바이 퀵</strong> : 서류 및 긴급 소형 화물 최우선 신속한 배송`,
        `<strong>🏍️ ${regionName} 오토바이 퀵</strong> : 기동성을 바탕으로 한 소화물 급송 서비스`
    ];
    const damasPatterns = [
        `<strong>🚙 ${regionName} 다마스 퀵</strong> : 중소형 가전, 소형이사 안전한 안심 배송`,
        `<strong>🚙 ${regionName} 다마스 퀵</strong> : 날씨 영향 없는 중소형 짐 및 기업 소화물 안심 수송`,
        `<strong>🚙 ${regionName} 다마스 퀵</strong> : 소규모 이삿짐 및 가전/가구 안전한 퀵서비스`
    ];
    const laboPatterns = [
        `<strong>🚚 ${regionName} 라보·1톤 용달</strong> : 대형 화물 및 수도권 전역 대용량 전문 수송`,
        `<strong>🚚 ${regionName} 라보용달, 1톤용달</strong> : 기업 화물, 수도권 전역 전문 특송`,
        `<strong>🚚 ${regionName} 라보용달 및 1톤용달</strong> : 상가 물량 및 중량 화물 수도권 특송`
    ];
    const advHeaderPatterns = [
        `💡 ${regionName} 퀵만의 신속 배송 노하우`,
        `💡 ${regionName} 퀵 만의 특장점`,
        `💡 ${regionName} 퀵서비스가 제공하는 차별화된 장점`
    ];
    const advBodyPatterns = [
        `<p>${regionName} 지역 전담 스피드 배차망 구축 및 지리에 정통한 전문 기사님 우선 배치</p>\n<p>주요 상습 정체 구간 실시간 우회하여 신속한 배송 보장</p>\n<p>연중무휴 24시간 관제 센터 가동으로 끊김 없는 물류 지원</p>`,
        `<p>${regionName} 퀵서비스 배차 시스템 : 숙련된 베테랑 기사님 배치</p>\n<p>정체를 피해 최적의 길로 신속한 배송을 실현</p>\n<p>24시간 실시간 배차 시스템을 통해 모든 물류 서비스 지원</p>`,
        `<p>${regionName} 일대의 교통 흐름을 숙지한 기사진 정밀 이동</p>\n<p>목적지까지 최단 경로로 진입하여 신속한 배송 완수</p>\n<p>365일 상시 가동되는 통합 안내 시스템으로 편리하게 이용</p>`
    ];
    const zoneHeaderPatterns = [
        `📍 ${regionName} 주요 운송 및 접수 지역`,
        `📍 ${regionName} 퀵서비스 주요 서비스 구역`,
        `📍 ${regionName} 및 인근 주요 처리 지역`
    ];
    const zoneBodyPatterns = [
        `<p>${regionName} 주요 상권 및 기업체 필수 문서·시약·샘플 배송</p>\n<p>빌라, 주택, 대단지 아파트 및 신규 주거용 오피스텔 안심 배송</p>\n<p>전통시장, 지역 상권, 주요 학원가 및 교육 시설 주변 소화물 처리</p>\n<p>인근 시/군/구 연계 도로망 활용 수도권 장거리 직송</p>`,
        `<p>중심 상권 및 비즈니스 밀집 지역 서류 신속 배송</p>\n<p>주요 교육 시설 및 캠퍼스 소화물 정기 배송</p>\n<p>전통 시장 및 주택가 밀집 지역 생활 밀착형 퀵</p>\n<p>간선도로 진입권을 통한 광역 퀵서비스 지원</p>`,
        `<p>${regionName} 내 주요 상업지구 및 오피스 군락 긴급 서류 전달</p>\n<p>아파트 단지 및 주거 밀집구역 안심 배송</p>\n<p>학원 및 도서관 등 학생 수요가 많은 소화물 처리</p>\n<p>외곽 순환 및 간선도로 연계 수도권 전역 광역 운송</p>`
    ];
    const patternHeaderPatterns = [
        `🚦 시간대별 수송 현황`,
        `🚦 ${regionName} 퀵서비스 운행 패턴`,
        `🚦 ${regionName} 지역 시간대별 수송 특징`
    ];
    const patternBodyPatterns = [
        `<p><strong>오전 시간대</strong> : 도심 및 업무지구 방향 긴급 계약서·서류 전달</p>\n<p><strong>오후 시간대</strong> : 일반 소화물 수송 및 인근 지역 연계 퀵</p>\n<p><strong>야간/휴일</strong> : 비상 긴급 화물 직송 및 24시간 안심 배송</p>`,
        `<p><strong>오전 시간대</strong> : 상가 물품 및 도심 방면 서류 배송 집중</p>\n<p><strong>오후 시간대</strong> : 소화물 및 인접 지역 연계 생활 퀵</p>\n<p><strong>야간 시간대</strong> : 긴급 물품 및 주말 안심 퀵서비스 상시 운영</p>`,
        `<p><strong>아침/오전</strong> : 거래처 상가 물품 및 주요 서류 집중 이동</p>\n<p><strong>오후/저녁</strong> : 유통 물량 및 인접 지역 연계 화물 배송</p>\n<p><strong>심야/주말</strong> : 24시간 비상 대기 기사를 통한 당일 특송</p>`
    ];
    const faqPatterns = [
        `<p><strong>Q. ${regionName} 지역 기본 이동 요금은 어떻게 되나요?</strong><br>\nA. 거리별 표준 기본 요금이 적용됩니다. 대표전화(1661-4262)로 문의 시 즉시 정확한 안내를 받으실 수 있습니다.</p>\n<br>\n<p><strong>Q. 야간이나 주말에도 똑같이 배차가 되나요?</strong><br>\nA. 네, 저희 ${regionName} 퀵배송은 24시간 365일 연중무휴 관제센터를 가동하여 상시 배차됩니다.</p>\n<br>\n<p><strong>Q. 신용카드 결제도 가능한가요?</strong><br>\nA. 네, 카드 결제가 가능합니다. 접수 진행 시 상담원에게 요청해 주시기 바랍니다.<strong>(부가세별도)</strong></p>`,
        `<p><strong>Q. ${regionName}에서 인접 지역까지 요금은 얼마인가요?</strong><br>\nA. 인접 이동은 기본 요금제로 운영됩니다. 상세 요금은 1661-4262로 문의하시면 신속한 배송 견적을 안내해 드립니다.</p>\n<br>\n<p><strong>Q. 공휴일이나 심야에도 기사 배차가 가능한가요?</strong><br>\nA. 네, 빠른배송 ${regionName}퀵은 365일 24시간 연중무휴 시스템으로 언제든지 접수 가능합니다.</p>\n<br>\n<p><strong>Q. ${regionName} 퀵서비스요금 카드결제는 되나요?</strong><br>\nA. 네, 가능합니다. 전화 접수 시 말씀해 주시면 카드 승인 지원해 드립니다.<strong>(부가세별도)</strong></p>`,
        `<p><strong>Q. ${regionName}에서 가까운 거리 운송 시 비용 책정은 어떻게 되나요?</strong><br>\nA. 거리별 기본 요금표를 적용하고 있습니다. 상세한 견적 문의는 1661-4262로 주시면 바로 확인해 드립니다.</p>\n<br>\n<p><strong>Q. 늦은 밤이나 새벽 시간대에도 배차 신청을 할 수 있나요?</strong><br>\nA. 네, 365일 24시간 연중무휴 관제 시스템을 가동하고 있어 밤낮없이 신속한 배송이 가능합니다.</p>\n<br>\n<p><strong>Q. 영수증 발행 및 카드 결제가 지원되나요?</strong><br>\nA. 네, 접수 시 카드 승인 및 결제 관련 절차를 친절히 도와드리고 있습니다.<strong>(부가세별도)</strong></p>`
    ];

    return `
      <!-- 차종 안내 -->
      <div class="info-box">
        <p>${getRandomItem(bikePatterns)}</p>
        <p>${getRandomItem(damasPatterns)}</p>
        <p>${getRandomItem(laboPatterns)}</p>
      </div>

      <!-- 신속 배송 노하우 -->
      <div class="info-box">
        <p><strong>${getRandomItem(advHeaderPatterns)}</strong></p>
        ${getRandomItem(advBodyPatterns)}
      </div>

      <!-- 주요 처리 및 접수 다발 지역 -->
      <div class="info-box">
        <p><strong>${getRandomItem(zoneHeaderPatterns)}</strong></p>
        ${getRandomItem(zoneBodyPatterns)}
      </div>

      <!-- 시간대별 운행 특징 -->
      <div class="info-box">
        <p><strong>${getRandomItem(patternHeaderPatterns)}</strong></p>
        ${getRandomItem(patternBodyPatterns)}
      </div>

      <!-- 자주 묻는 질문 FAQ -->
      <div class="info-box">
        <p><strong>❓ 자주 묻는 질문 (FAQ)</strong></p>
        ${getRandomItem(faqPatterns)}
      </div>
    `;
}

// 3. 양천구 세부 지역 및 주요 도로명/지명 배열 (요청하신 지역 반영)
const targetLocations = [
    "양천구", "신정동", "목동", "신월동", "목동로", "신월로", "신정로", "오목교", "곰달래로", "공항대로", "국회대로"
];

// 중복 제거
const uniqueLocations = Array.from(new Set(targetLocations));

// 도메인 및 기초 설정
const BASE_URL = 'https://양천구퀵서비스.퀵배송1661-4262.kr';
const currentDate = new Date().toISOString().split('T')[0];

// 4. HTML 템플릿 생성 함수
function generateHtml(regionName) {
    const spunAreaContent = renderSpunContent(regionName);

    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">

  <title>${regionName}퀵서비스 | 오토바이,다마스,라보,용달 24시 ${regionName} 퀵</title>

  <meta name="description" content="${regionName}퀵서비스 친절한 24시퀵배송.오토바이퀵,다마스퀵,라보용달,1톤용달 빠른픽업.카드결제가능(부가세별도)">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${BASE_URL}/${regionName}퀵서비스/">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" type="text/css" href="/file/aplusquick.css?v=1.5" />

  <!-- OpenGraph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${regionName}퀵서비스 365일 24시퀵">
  <meta property="og:description" content="${regionName} 서울·경기 전지역 24시 퀵서비스 우수,전문업체">
  <meta property="og:url" content="${BASE_URL}/${regionName}퀵서비스/">
  <meta property="og:image" content="/images/og_image.webp">

  <!-- Local Business Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "CourierService",
    "name": "에이플러스 ${regionName}퀵서비스",
    "url": "${BASE_URL}/${regionName}퀵서비스/",
    "telephone": "1661-4262",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "${regionName}·서울·경기 전지역"
    },
    "openingHours": "Mo-Su 00:00-24:00",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR",
      "addressLocality": "${regionName}"
    }
  }
  </script>
</head>
<body>

  <!-- 모바일 전용 상단 고정 2구 버튼 -->
  <div class="mobile-bottom-nav">
    <a href="tel:1661-4262" class="btn-call">📞 전화연결 1661-4262</a>
    <a href="https://pf.kakao.com/_xnRKLxb/chat" target="_blank" rel="noopener noreferrer" class="btn-kakao">💬 카카오톡 문의</a>
  </div>

  <!-- 컨테이너 -->
  <div class="container" id="mainContainer">
    <!-- 1 ~ 6번: 풀페이지(100vh 스크롤 스냅) 섹션 -->
    <section class="section" id="section1">
      <picture>
        <source media="(max-width: 768px)" srcset="/images/m_pb1.png">
        <img src="/images/pb1.png" alt="${regionName}퀵서비스 친절한 퀵" class="section-img">
      </picture>
      <div class="content">
        <h1>${regionName}퀵서비스</h1>
        <h2>${regionName} 전지역 24시 퀵서비스</h2>
      </div>
    </section>

    <section class="section" id="section2">
      <picture>
        <source media="(max-width: 768px)" srcset="/images/m_pb2.png">
        <img src="/images/pb2.png" alt="${regionName} 빠른배송퀵" class="section-img">
      </picture>
    </section>

    <section class="section" id="section3">
      <picture>
        <source media="(max-width: 768px)" srcset="/images/m_pb3.png">
        <img src="/images/pb3.png" alt="서울,경기 ${regionName} 전지역퀵" class="section-img">
      </picture>
    </section>

    <section class="section" id="section4">
      <picture>
        <source media="(max-width: 768px)" srcset="/images/m_pb4.png">
        <img src="/images/pb4.png" alt="카드결제 가능 ${regionName}퀵배송" class="section-img">
      </picture>
    </section>

    <section class="section" id="section5">
      <picture>
        <source media="(max-width: 768px)" srcset="/images/m_pb5.png">
        <img src="/images/pb5.png" alt="${regionName} 야간퀵 24시퀵 365일퀵" class="section-img">
      </picture>
    </section>

    <section class="section" id="section6">
      <picture>
        <source media="(max-width: 768px)" srcset="/images/m_pb6.png">
        <img src="/images/pb6.png" alt="${regionName}퀵 캐시백 서비스" class="section-img">
      </picture>
    </section>

    <!-- 7번째 일반 페이지 섹션 -->
    <section class="section-normal" id="section7">
      <div class="normal-content">
        <h4><a href="/">홈 바로가기</a></h4>
        <h3>🏍️📦 ${regionName} 퀵서비스 차종별 배송 가이드🚚🚙</h3>
        <br>
        <p>고객님의 화물 크기와 상황에 맞춰서 </p>
        <p>최적의 차량을 맞춤 배차해 드립니다</p>

        <!-- 동적 스피닝 콘텐츠 영역 삽입 -->
        ${spunAreaContent}

      </div>

      <!-- 하단 푸터 영역 -->
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-info">
            <p class="footer-company">상호:에이플러스퀵서비스 ${regionName}지점</p>
            <p>통신판매업 제 2012-서울강북-0482호</p>
            <p>대표전화: <a href="tel:1661-4262" class="footer-tel">1661-4262</a></p>
            <p>사업자번호:217-03-31209</p>
            <p>대표자:이서미</p>
            <p>이메일:aplusquick78@gmail.com</p>
            <p>365일 24시간 연중무휴 관제센터 운영</p>
            <p class="footer-copyright">Copyright © 2004 에이플러스 퀵서비스 All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  </div>

  <script src="/file/aplusquick.js"></script>
        
  <script>
  // iOS Safari 주소창 변동에 따른 100vh 실제 높이 계산
  function setRealVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  }

  window.addEventListener('resize', setRealVh);
  window.addEventListener('orientationchange', setRealVh);
  setRealVh();
  </script>
</body>
</html>`;
}

// 5. Sitemap & Feed(RSS) 생성 함수
function generateSitemapAndFeed(locations, outputDir) {
    // 5-1. sitemap.xml 생성
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 메인 홈 및 board.html 추가
    sitemapXml += `  <url>\n    <loc>${BASE_URL}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    sitemapXml += `  <url>\n    <loc>${BASE_URL}/board.html</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;

    // 타겟 지역 URL 추가
    locations.forEach(regionName => {
        sitemapXml += `  <url>\n    <loc>${BASE_URL}/${encodeURIComponent(regionName + '퀵서비스')}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    sitemapXml += `</urlset>`;
    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapXml, 'utf8');

    // 5-2. feed.xml (RSS 2.0) 생성
    const nowRssDate = new Date().toUTCString();
    let feedXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    feedXml += `<rss version="2.0">\n`;
    feedXml += `  <channel>\n`;
    feedXml += `    <title>에이플러스 퀵서비스 양천구 지점망</title>\n`;
    feedXml += `    <link>${BASE_URL}/</link>\n`;
    feedXml += `    <description>양천구 전지역 24시 오토바이, 다마스, 라보, 용달 퀵서비스 안내</description>\n`;
    feedXml += `    <language>ko-KR</language>\n`;
    feedXml += `    <pubDate>${nowRssDate}</pubDate>\n`;

    locations.forEach(regionName => {
        const itemUrl = `${BASE_URL}/${encodeURIComponent(regionName + '퀵서비스')}/`;
        feedXml += `    <item>\n`;
        feedXml += `      <title>${regionName}퀵서비스 24시 배송 안내</title>\n`;
        feedXml += `      <link>${itemUrl}</link>\n`;
        feedXml += `      <description>${regionName} 전지역 신속한 오토바이, 다마스, 라보, 용달 퀵배송 서비스</description>\n`;
        feedXml += `      <pubDate>${nowRssDate}</pubDate>\n`;
        feedXml += `      <guid>${itemUrl}</guid>\n`;
        feedXml += `    </item>\n`;
    });

    feedXml += `  </channel>\n`;
    feedXml += `</rss>`;
    fs.writeFileSync(path.join(outputDir, 'feed.xml'), feedXml, 'utf8');
}

// 6. 실행 함수
function buildAllPages() {
    const baseOutputDir = path.join(__dirname, 'dist');

    if (!fs.existsSync(baseOutputDir)) {
        fs.mkdirSync(baseOutputDir, { recursive: true });
    }

    uniqueLocations.forEach((regionName) => {
        const targetDir = path.join(baseOutputDir, `${regionName}퀵서비스`);
        
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const htmlContent = generateHtml(regionName);
        const filePath = path.join(targetDir, 'index.html');
        
        fs.writeFileSync(filePath, htmlContent, 'utf8');
    });

    // sitemap.xml 및 feed.xml 생성
    generateSitemapAndFeed(uniqueLocations, baseOutputDir);

    console.log(`총 ${uniqueLocations.length}개 지역 대상 페이지 생성이 성공적으로 완료되었습니다.`);
    console.log(`sitemap.xml 및 feed.xml 파일이 ./dist/ 폴더에 추가되었습니다.`);
}

buildAllPages();