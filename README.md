# ux톤 적용하기 ✨

Figma 텍스트를 분석하고 친근한 UX Writing 톤으로 자동 변환하는 고급 플러그인입니다.

## 🎯 주요 기능

### 🔍 텍스트 분석
- **문장 스타일 분석**: 명령문, 의문문, 서술문 자동 판별
- **감정 톤 분석**: friendly, professional, formal, casual 톤 감지
- **키워드 빈도 분석**: 핵심 키워드 추출 및 빈도 계산
- **UX 톤 프로파일**: 친근함 점수와 격식도 수준 측정

### 🔧 스마트 톤 변환
- **패턴 기반 변환**: "확인해보세요" → "확인하기" 등
- **정규식 지원**: 복잡한 패턴 매칭 가능
- **선택적 적용**: 원하는 규칙만 골라서 적용
- **미리보기**: 변환 전 결과를 미리 확인

### 🎨 현대적 UI
- **Shadcn 스타일**: 모던하고 직관적인 인터페이스
- **탭 기반 구성**: 분석 결과와 톤 적용 분리
- **실시간 피드백**: 선택 변경 시 즉시 반영

## 📦 설치 방법

### 사전 요구사항
- [Figma Desktop App](https://www.figma.com/downloads/) (최신 버전)
- [Node.js](https://nodejs.org/) v16 이상
- [TypeScript](https://www.typescriptlang.org/) (글로벌 설치 권장)

### 설치 과정

1. **프로젝트 클론**
   ```bash
   git clone [repository-url]
   cd ux-tone-applier
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **빌드**
   ```bash
   npm run build
   ```

4. **Figma에서 플러그인 등록**
   - Figma Desktop App 실행
   - **Plugins** → **Development** → **Import plugin from manifest...**
   - `manifest.json` 파일 선택

## 🚀 사용 방법

### 기본 워크플로우

1. **텍스트 선택**: Figma에서 분석할 텍스트 노드 선택
2. **분석 실행**: "텍스트 분석하기" 버튼 클릭
3. **결과 확인**: 분석 결과 탭에서 UX 톤 프로파일 검토
4. **톤 적용**: 톤 적용 탭에서 원하는 규칙 선택 및 적용

### 상세 기능

#### 텍스트 분석 결과
- **UX 톤 프로파일**: 친근함 점수(0-100), 격식도 수준(0-100)
- **문장 스타일**: 명령문/의문문/서술문 분류
- **감정 톤**: 현재 톤과 권장 톤 표시
- **주요 키워드**: 상위 5개 키워드 추출
- **개선 영역**: 구체적인 개선 방향 제시

#### 톤 변환 규칙
- **확인해보세요** → **확인하기**
- **이용해보세요** → **이용하기**
- **됩니다** → **돼요**
- **입니다** → **이에요**
- **하세요** → **하기**
- **습니다** → **어요**

## 🔧 개발 가이드

### 프로젝트 구조

```
ux-tone-applier/
├── manifest.json          # Figma 플러그인 설정
├── code.ts                # 메인 플러그인 로직 (TypeScript)
├── code.js                # 컴파일된 JavaScript
├── ui.html                # Shadcn 스타일 UI
├── package.json           # 프로젝트 설정
├── tsconfig.json          # TypeScript 설정
├── .eslintrc.js           # ESLint 설정
└── README.md              # 이 파일
```

### 개발 명령어

```bash
# 개발 모드 (파일 변경 시 자동 컴파일)
npm run watch

# 빌드
npm run build

# 린팅
npm run lint

# 린팅 자동 수정
npm run lint:fix
```

### 톤 변환 규칙 추가

`code.ts`의 `toneRules` 배열에 새 규칙 추가:

```typescript
{
  pattern: '새로운 표현',           // 또는 정규식: /pattern$/g
  replacement: '변환될 표현',
  description: '규칙 설명',
  category: 'formal-to-friendly'   // 또는 'command', 'ending'
}
```

### 분석 로직 커스터마이징

`TextAnalyzer` 클래스의 메서드들을 수정하여 분석 로직 조정:

- `analyzeSentenceStyle()`: 문장 스타일 분석
- `analyzeEmotionTone()`: 감정 톤 분석
- `extractKeywords()`: 키워드 추출
- `createUXToneProfile()`: UX 톤 프로파일 생성

## 📚 API 참조

### 메인 클래스

#### `TextAnalyzer`
텍스트 분석을 담당하는 정적 클래스

```typescript
TextAnalyzer.analyzeText(text: string): TextAnalysis
```

#### `ToneConverter`
톤 변환을 담당하는 정적 클래스

```typescript
ToneConverter.applyToneRules(text: string, rules?: ToneRule[]): string
```

### 인터페이스

#### `TextAnalysis`
```typescript
interface TextAnalysis {
  text: string;
  sentenceStyle: SentenceStyle;
  emotionTone: EmotionTone;
  keywords: string[];
  keywordFrequency: Record<string, number>;
  applicableRules: ApplicableRule[];
  uxToneProfile: UXToneProfile;
}
```

#### `UXToneProfile`
```typescript
interface UXToneProfile {
  currentTone: EmotionTone;
  recommendedTone: EmotionTone;
  friendlinessScore: number;    // 0-100
  formalityLevel: number;       // 0-100
  improvementAreas: string[];
}
```

## 🛠️ 기술 스택

- **언어**: TypeScript
- **빌드**: tsc (TypeScript Compiler)
- **린팅**: ESLint + @typescript-eslint
- **UI**: Shadcn-inspired CSS + Vanilla JavaScript
- **API**: Figma Plugin API v1.0.0

## 🤝 기여하기

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a Pull Request

### 개발 가이드라인

- TypeScript 사용 필수
- ESLint 규칙 준수
- 함수와 클래스에 JSDoc 주석 추가
- 새로운 기능에 대한 테스트 시나리오 제공

## 📝 라이선스

MIT License - 자세한 내용은 `LICENSE` 파일을 참고하세요.

## 🚨 문제 해결

### 자주 발생하는 문제

**Q: 플러그인이 로드되지 않아요**
- `npm run build`로 컴파일 확인
- Figma Desktop App 최신 버전 사용
- `code.js` 파일이 생성되었는지 확인

**Q: 분석 결과가 이상해요**
- 한국어 텍스트인지 확인
- 텍스트 노드가 제대로 선택되었는지 확인
- 콘솔에서 오류 메시지 확인

**Q: 톤 변환이 적용되지 않아요**
- 해당 텍스트가 변환 규칙에 포함되어 있는지 확인
- 폰트 로딩 문제일 수 있음 (다른 폰트로 변경 후 시도)

### 디버깅

Figma에서 `Plugins` → `Development` → `Open Console`로 콘솔 확인

## 📞 지원

- GitHub Issues에 버그 리포트나 기능 요청 제출
- 상세한 오류 상황과 스크린샷 첨부 권장

---

**한국어 UX Writing을 더 친근하게 만들어보세요! 🎉**
