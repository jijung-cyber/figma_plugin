# 설치 가이드 📚

이 문서는 **ux톤 적용하기** Figma 플러그인의 상세한 설치 과정을 안내합니다.

## 🛠️ 사전 준비

### 1. 필수 소프트웨어 설치

#### Figma Desktop App
- [Figma 다운로드 페이지](https://www.figma.com/downloads/)에서 최신 버전 다운로드
- 반드시 **Desktop App**을 사용해야 합니다 (웹 버전에서는 플러그인 개발 불가)

#### Node.js
- [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드 (v16 이상)
- 설치 후 터미널에서 확인:
  ```bash
  node --version
  npm --version
  ```

#### TypeScript (권장)
```bash
# 글로벌 설치
npm install -g typescript

# 설치 확인
tsc --version
```

#### 텍스트 에디터 (권장)
- [Visual Studio Code](https://code.visualstudio.com/)
- 또는 선호하는 텍스트 에디터

## 📥 플러그인 설치

### 방법 1: 직접 다운로드 (추천)

1. **프로젝트 다운로드**
   ```bash
   # Git이 설치된 경우
   git clone [repository-url]
   cd ux-tone-applier
   
   # 또는 ZIP 파일 다운로드 후 압축 해제
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **TypeScript 컴파일**
   ```bash
   npm run build
   ```

### 방법 2: 개발 모드 (파일 수정 시)

```bash
# 파일 변경 시 자동 컴파일
npm run watch
```

### 방법 3: 린팅 확인

```bash
# 코드 스타일 검사
npm run lint

# 자동 수정
npm run lint:fix
```

## 🔧 Figma에서 플러그인 등록

### 1. Figma Desktop App 실행
- Figma Desktop App을 실행합니다
- 기존 파일을 열거나 새 파일을 생성합니다

### 2. 플러그인 개발 메뉴 접근
- **방법 1**: 메뉴바에서 `Plugins` → `Development` → `Import plugin from manifest...`
- **방법 2**: 오른쪽 클릭 → `Plugins` → `Development` → `Import plugin from manifest...`

### 3. manifest.json 파일 선택
- 파일 선택 다이얼로그에서 프로젝트 폴더의 `manifest.json` 파일을 선택합니다
- 경로 예시: `/Users/사용자명/ux-tone-applier/manifest.json`

### 4. 플러그인 등록 확인
- 플러그인이 성공적으로 등록되면 `Development` 섹션에 표시됩니다
- 플러그인 이름: "ux톤 적용하기"

## ✅ 설치 확인

### 1. 테스트 텍스트 생성
- Figma에서 텍스트 도구(T)를 선택합니다
- 다음 텍스트 중 하나를 입력해보세요:
  - "확인해보세요"
  - "이용해보세요"
  - "내용을 입력하세요"
  - "파일을 다운로드합니다"

### 2. 플러그인 실행
1. 생성한 텍스트를 선택합니다
2. 오른쪽 클릭 → `Plugins` → `ux톤 적용하기`
3. 플러그인 UI 창이 열리면 성공입니다

### 3. 기능 테스트

#### 3.1 텍스트 분석
1. 플러그인 창에서 "텍스트 분석하기" 버튼을 클릭합니다
2. 분석 결과 탭에서 다음 항목들이 표시되는지 확인:
   - UX 톤 프로파일 (친근함 점수, 격식도 수준)
   - 문장 스타일 (명령문/의문문/서술문)
   - 감정 톤 (친근함/전문적/격식적/캐주얼)
   - 주요 키워드
   - 개선 영역

#### 3.2 톤 변환
1. "톤 적용" 탭으로 이동합니다
2. 적용 가능한 규칙이 표시되는지 확인합니다
3. 원하는 규칙을 선택하고 "선택된 규칙 적용" 버튼을 클릭합니다
4. 텍스트가 변환되는지 확인합니다:
   - "확인해보세요" → "확인하기"
   - "이용해보세요" → "이용하기"
   - "됩니다" → "돼요"

## 🚨 문제 해결

### 플러그인이 로드되지 않는 경우

**1. TypeScript 컴파일 확인**
```bash
npm run build
```
- 오류가 없는지 확인합니다
- `code.js` 파일이 생성되었는지 확인합니다

**2. 의존성 재설치**
```bash
# node_modules 폴더 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

**3. Figma Desktop App 버전 확인**
- 최신 버전으로 업데이트 후 다시 시도합니다

**4. 파일 경로 확인**
- `manifest.json` 파일 경로가 올바른지 확인합니다
- 모든 필요한 파일(`code.js`, `ui.html`)이 존재하는지 확인합니다

### 플러그인 실행 오류

**1. Console 확인**
- Figma에서 `Plugins` → `Development` → `Open Console`
- 콘솔에서 오류 메시지를 확인합니다

**2. ESLint 오류 확인**
```bash
npm run lint
```
- 코드 스타일 오류를 확인하고 수정합니다

**3. TypeScript 오류 확인**
```bash
# TypeScript 컴파일 시 상세 오류 확인
npx tsc --noEmit
```

**4. 권한 문제**
```bash
# npm 권한 문제 시 (Windows)
npm install --force

# macOS/Linux
sudo npm install
```

### 텍스트 분석이 안 되는 경우

**1. 텍스트 노드 선택 확인**
- 텍스트가 실제 텍스트 노드로 생성되었는지 확인합니다
- 이미지나 다른 요소가 아닌지 확인합니다

**2. 한국어 텍스트 확인**
- 분석 대상이 한국어 텍스트인지 확인합니다
- 영어나 다른 언어는 분석이 제한적일 수 있습니다

**3. 텍스트 길이 확인**
- 너무 짧은 텍스트(1-2글자)는 분석이 어려울 수 있습니다
- 3글자 이상의 의미있는 텍스트를 사용해보세요

### 톤 변환이 안 되는 경우

**1. 변환 규칙 확인**
- 입력한 텍스트가 변환 규칙에 포함되어 있는지 확인합니다
- 대소문자, 띄어쓰기가 정확한지 확인합니다

**2. 폰트 문제**
- 다른 폰트로 변경 후 다시 시도합니다
- 기본 폰트(예: Inter, Noto Sans KR)를 사용해보세요

**3. 적용 가능한 규칙 없음**
- "톤 적용" 탭에서 적용 가능한 규칙이 표시되는지 확인합니다
- 규칙이 없다면 해당 텍스트에는 변환할 내용이 없는 것입니다

## 🔧 개발자 모드

### Hot Reload 활성화
```bash
# 파일 변경 시 자동 컴파일
npm run watch
```

### 디버깅 모드
1. Figma에서 `Plugins` → `Development` → `Open Console`
2. `code.ts` 파일에 `console.log()` 추가
3. 플러그인 재실행하여 로그 확인

### 코드 수정 워크플로우
1. `code.ts` 또는 `ui.html` 파일 수정
2. `npm run build` 또는 watch 모드 사용
3. Figma에서 플러그인 재실행 (또는 Hot Reload)

## 📞 추가 지원

더 자세한 도움이 필요하시면:
- GitHub Issues에 문제를 보고해주세요
- README.md 파일의 FAQ 섹션을 참고하세요
- 스크린샷과 함께 구체적인 오류 상황을 알려주세요
- 콘솔 오류 메시지를 포함해주세요

### 유용한 링크
- [Figma Plugin API 문서](https://www.figma.com/plugin-docs/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- [ESLint 설정 가이드](https://eslint.org/docs/user-guide/getting-started)

---

**설치 완료를 축하합니다! 🎉**  
이제 고급 UX Writing 톤 분석과 변환을 즐겨보세요!