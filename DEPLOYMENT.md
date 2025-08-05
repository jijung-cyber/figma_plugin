# 🚀 UX톤 적용하기 플러그인 배포 가이드

## 📦 배포용 파일 준비

다음 파일들을 배포용으로 준비하세요:

### 필수 파일들:
- `manifest.json` - 플러그인 설정
- `code.js` - 컴파일된 메인 로직
- `ui.html` - 사용자 인터페이스

### 선택적 파일들:
- `README.md` - 사용 설명서
- `LICENSE` - 라이선스 정보

## 🔧 배포 방법

### A. 직접 공유 (개발자 모드)

1. **파일 압축**
   ```bash
   zip -r ux-tone-applier.zip manifest.json code.js ui.html README.md LICENSE
   ```

2. **사용자에게 전달**
   - 압축 파일을 이메일, 클라우드 드라이브, 또는 GitHub 등으로 공유
   - 사용자는 압축을 풀고 Figma에서 개발자 모드로 설치

### B. GitHub 배포

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial release"
   git remote add origin https://github.com/yourusername/ux-tone-applier.git
   git push -u origin main
   ```

2. **릴리즈 생성**
   - GitHub에서 Releases 탭으로 이동
   - "Create a new release" 클릭
   - 태그 버전 입력 (예: v1.0.0)
   - 배포용 파일들을 첨부

## 📋 사용자 설치 가이드

### 개발자 모드 설치:

1. **Figma Desktop App 실행**
2. **Plugins** → **Development** → **Import plugin from manifest...**
3. **manifest.json 파일 선택**
4. **플러그인 사용 시작!**

### 주의사항:
- 사용자는 Figma Desktop App이 필요합니다
- 개발자 모드에서는 플러그인이 로컬에만 설치됩니다
- Figma 웹 버전에서는 개발자 모드 플러그인을 사용할 수 없습니다

## 🎯 공식 마켓플레이스 배포 (선택사항)

나중에 공식 배포를 원한다면:

1. **Figma Community 제출**
   - https://www.figma.com/community/submit
   - 플러그인 검토 과정 필요 (1-2주 소요)
   - 승인 후 공식 마켓플레이스에 등록

2. **제출 요구사항**
   - 완전한 기능 구현
   - 사용자 가이드 및 스크린샷
   - 적절한 아이콘 및 설명
   - 라이선스 정보

## 📞 지원 및 문의

플러그인 사용 중 문제가 발생하면:
- GitHub Issues 사용
- 이메일로 문의
- README.md의 문제 해결 섹션 참조