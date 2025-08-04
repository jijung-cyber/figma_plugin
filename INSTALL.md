# 설치 가이드 📚

이 문서는 **한국어 UX Writing 톤 변환기** Figma 플러그인의 상세한 설치 과정을 안내합니다.

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

#### 텍스트 에디터 (권장)
- [Visual Studio Code](https://code.visualstudio.com/)
- 또는 선호하는 텍스트 에디터

## 📥 플러그인 설치

### 방법 1: 직접 다운로드 (추천)

1. **프로젝트 다운로드**
   ```bash
   # Git이 설치된 경우
   git clone [repository-url]
   cd korean-ux-writing-tone-converter
   
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

## 🔧 Figma에서 플러그인 등록

### 1. Figma Desktop App 실행
- Figma Desktop App을 실행합니다
- 기존 파일을 열거나 새 파일을 생성합니다

### 2. 플러그인 개발 메뉴 접근
- **방법 1**: 메뉴바에서 `Plugins` → `Development` → `Import plugin from manifest...`
- **방법 2**: 오른쪽 클릭 → `Plugins` → `Development` → `Import plugin from manifest...`

### 3. manifest.json 파일 선택
- 파일 선택 다이얼로그에서 프로젝트 폴더의 `manifest.json` 파일을 선택합니다
- 경로 예시: `/Users/사용자명/korean-ux-writing-tone-converter/manifest.json`

### 4. 플러그인 등록 확인
- 플러그인이 성공적으로 등록되면 `Development` 섹션에 표시됩니다
- 플러그인 이름: "Korean UX Writing Tone Converter"

## ✅ 설치 확인

### 1. 테스트 텍스트 생성
- Figma에서 텍스트 도구(T)를 선택합니다
- 다음 텍스트 중 하나를 입력해보세요:
  - "확인해보세요"
  - "클릭하세요"
  - "내용을 입력하세요"

### 2. 플러그인 실행
1. 생성한 텍스트를 선택합니다
2. 오른쪽 클릭 → `Plugins` → `Korean UX Writing Tone Converter`
3. 플러그인 UI 창이 열리면 성공입니다

### 3. 변환 테스트
1. 플러그인 창에서 "변환하기" 버튼을 클릭합니다
2. 텍스트가 변환되는지 확인합니다:
   - "확인해보세요" → "확인하기"
   - "클릭하세요" → "클릭하기"
   - "내용을 입력하세요" → "내용 입력"

## 🚨 문제 해결

### 플러그인이 로드되지 않는 경우

**1. TypeScript 컴파일 확인**
```bash
npm run build
```
- 오류가 없는지 확인합니다
- `code.js` 파일이 생성되었는지 확인합니다

**2. Figma Desktop App 버전 확인**
- 최신 버전으로 업데이트 후 다시 시도합니다

**3. 파일 경로 확인**
- `manifest.json` 파일 경로가 올바른지 확인합니다
- 모든 필요한 파일(`code.js`, `ui.html`)이 존재하는지 확인합니다

### 플러그인 실행 오류

**1. Console 확인**
- Figma에서 `Plugins` → `Development` → `Open Console`
- 콘솔에서 오류 메시지를 확인합니다

**2. 권한 문제**
```bash
# npm 권한 문제 시
sudo npm install
```

**3. Node.js 버전 문제**
- Node.js v16 이상인지 확인합니다
- 필요시 최신 LTS 버전으로 업데이트합니다

### 텍스트 변환이 안 되는 경우

**1. 텍스트 노드 선택 확인**
- 텍스트가 실제 텍스트 노드로 생성되었는지 확인합니다
- 이미지나 다른 요소가 아닌지 확인합니다

**2. 폰트 문제**
- 다른 폰트로 변경 후 다시 시도합니다
- 기본 폰트(예: Inter)를 사용해보세요

**3. 변환 규칙 확인**
- 입력한 텍스트가 변환 규칙에 포함되어 있는지 확인합니다
- 대소문자, 띄어쓰기가 정확한지 확인합니다

## 📞 추가 지원

더 자세한 도움이 필요하시면:
- GitHub Issues에 문제를 보고해주세요
- README.md 파일의 FAQ 섹션을 참고하세요
- 스크린샷과 함께 구체적인 오류 상황을 알려주세요

---

**설치 완료를 축하합니다! 🎉**  
이제 친근한 한국어 UX Writing을 즐겨보세요!