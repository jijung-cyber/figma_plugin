# 한국어 UX Writing 톤 변환기 ✨

한국어 텍스트를 친근한 UX Writing 톤으로 자동 변경해주는 Figma 플러그인입니다.

## 🎯 주요 기능

- **친근한 톤 변환**: "확인해보세요" → "확인하기" 와 같이 딱딱한 존댓말을 친근한 톤으로 변경
- **패턴 기반 변환**: "~~세요", "~~습니다" 등의 패턴을 자동으로 감지하여 변환
- **실시간 프리뷰**: 선택된 텍스트 노드 개수를 실시간으로 확인
- **일괄 처리**: 여러 텍스트 노드를 한 번에 변환

## 📦 설치 방법

### 1. 개발 환경 설정

먼저 다음 도구들을 설치해주세요:

- [Figma Desktop App](https://www.figma.com/downloads/)
- [Node.js](https://nodejs.org/) (v16 이상)
- [Visual Studio Code](https://code.visualstudio.com/) (권장)

### 2. 프로젝트 설치

```bash
# 의존성 설치
npm install

# TypeScript 컴파일
npm run build

# 또는 개발 모드로 실행 (파일 변경 시 자동 컴파일)
npm run watch
```

### 3. Figma에서 플러그인 설치

1. **Figma Desktop App** 실행
2. 파일을 열거나 새로 생성
3. **메뉴 → Plugins → Development → Import plugin from manifest...**
4. 이 프로젝트의 `manifest.json` 파일 선택

## 🚀 사용 방법

### 기본 사용법

1. Figma에서 텍스트 노드를 선택하세요
2. **우클릭 → Plugins → Korean UX Writing Tone Converter**
3. 플러그인 창에서 **"변환하기"** 버튼 클릭
4. 텍스트가 친근한 톤으로 자동 변환됩니다!

### 변환 예시

| 기존 텍스트 | 변환된 텍스트 |
|-----------|-------------|
| 확인해보세요 | 확인하기 |
| 클릭하세요 | 클릭하기 |
| 내용을 입력하세요 | 내용 입력 |
| 파일을 다운로드하세요 | 파일 다운로드 |
| 자세히 보기 | 더보기 |
| 이전 페이지 | 이전 |

## 📁 프로젝트 구조

```
korean-ux-writing-tone-converter/
├── manifest.json      # Figma 플러그인 설정
├── code.ts           # 메인 플러그인 로직 (TypeScript)
├── code.js           # 컴파일된 JavaScript 파일
├── ui.html           # 사용자 인터페이스
├── package.json      # 프로젝트 설정
├── tsconfig.json     # TypeScript 설정
└── README.md         # 사용 가이드
```

## 🛠️ 개발 가이드

### 톤 변환 규칙 추가

`code.ts` 파일의 `toneConversionRules` 객체에 새로운 변환 규칙을 추가할 수 있습니다:

```typescript
const toneConversionRules: { [key: string]: string } = {
  // 기존 규칙들...
  '새로운 표현': '친근한 표현',
  '추가할 텍스트': '변환될 텍스트'
};
```

### 패턴 기반 변환 수정

정규표현식을 사용한 패턴 변환 로직도 수정할 수 있습니다:

```typescript
// "~~세요" -> "~~기" 변환
convertedText = convertedText.replace(/([가-힣]+)세요/g, (match, verb) => {
  // 변환 로직 수정
  return verb + '기';
});
```

### UI 스타일 커스터마이징

`ui.html` 파일의 CSS 부분을 수정하여 UI를 커스터마이징할 수 있습니다.

## 🤝 기여하기

1. 이 저장소를 Fork 합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/new-feature`)
3. 변경사항을 커밋합니다 (`git commit -am 'Add new feature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/new-feature`)
5. Pull Request를 생성합니다

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참고하세요.

## 🆘 문제 해결

### 자주 발생하는 문제

**Q: 플러그인이 로드되지 않아요**
- Figma Desktop App이 최신 버전인지 확인하세요
- `npm run build`로 TypeScript가 제대로 컴파일되었는지 확인하세요

**Q: 텍스트가 변환되지 않아요**
- 텍스트 노드가 선택되었는지 확인하세요
- 해당 텍스트가 변환 규칙에 포함되어 있는지 확인하세요

**Q: 폰트 관련 오류가 발생해요**
- Figma에서 해당 폰트가 로드되어 있는지 확인하세요
- 다른 폰트로 변경 후 다시 시도해보세요

## 📞 지원

문제가 발생하거나 기능 요청이 있으시면 GitHub Issues를 통해 알려주세요!

---

**Made with ❤️ for Korean UX Writers**
