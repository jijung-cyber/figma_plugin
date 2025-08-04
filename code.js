"use strict";
// 한국어 UX Writing 친근한 톤 변환 규칙
const toneConversionRules = {
    // 존댓말 -> 친근한 톤
    '확인해보세요': '확인하기',
    '클릭하세요': '클릭하기',
    '선택하세요': '선택하기',
    '입력하세요': '입력하기',
    '설정하세요': '설정하기',
    '완료하세요': '완료하기',
    '저장하세요': '저장하기',
    '삭제하세요': '삭제하기',
    '편집하세요': '편집하기',
    '수정하세요': '수정하기',
    '변경하세요': '변경하기',
    '추가하세요': '추가하기',
    '제거하세요': '제거하기',
    '검색하세요': '검색하기',
    '찾아보세요': '찾아보기',
    '다운로드하세요': '다운로드',
    '업로드하세요': '업로드',
    '공유하세요': '공유하기',
    '복사하세요': '복사하기',
    '붙여넣으세요': '붙여넣기',
    '새로고침하세요': '새로고침',
    '로그인하세요': '로그인',
    '로그아웃하세요': '로그아웃',
    '회원가입하세요': '회원가입',
    '계속하세요': '계속하기',
    '시작하세요': '시작하기',
    '종료하세요': '종료하기',
    '취소하세요': '취소',
    '닫으세요': '닫기',
    '열어보세요': '열어보기',
    '보내세요': '보내기',
    '받으세요': '받기',
    '연결하세요': '연결하기',
    '해제하세요': '해제하기',
    // 문장형 -> 간결한 형태
    '버튼을 클릭하세요': '클릭하기',
    '내용을 확인하세요': '내용 확인',
    '파일을 선택하세요': '파일 선택',
    '정보를 입력하세요': '정보 입력',
    '설정을 변경하세요': '설정 변경',
    '결과를 확인하세요': '결과 확인',
    '데이터를 저장하세요': '데이터 저장',
    '내용을 삭제하세요': '내용 삭제',
    '이미지를 업로드하세요': '이미지 업로드',
    '파일을 다운로드하세요': '파일 다운로드',
    // 기타 자주 사용되는 표현
    '자세히 보기': '더보기',
    '자세한 내용': '상세정보',
    '더 많은 정보': '추가정보',
    '이전 페이지': '이전',
    '다음 페이지': '다음',
    '처음으로': '처음',
    '마지막으로': '마지막',
    '목록으로': '목록',
    '홈으로': '홈',
    '메인으로': '메인',
    '돌아가기': '뒤로',
    '새 창': '새창',
    '팝업 닫기': '닫기',
    '전체 선택': '모두 선택',
    '선택 해제': '해제',
    '필수 입력': '필수',
    '선택 사항': '선택',
    '추천합니다': '추천',
    '권장합니다': '권장',
};
// 텍스트 변환 함수
function convertToFriendlyTone(text) {
    let convertedText = text;
    // 정확한 매칭 우선 처리
    for (const [formal, friendly] of Object.entries(toneConversionRules)) {
        convertedText = convertedText.replace(new RegExp(formal, 'g'), friendly);
    }
    // 패턴 기반 변환
    // "~~세요" -> "~~기" (동사)
    convertedText = convertedText.replace(/([가-힣]+)세요/g, (match, verb) => {
        if (verb.endsWith('하')) {
            return verb + '기';
        }
        return verb + '기';
    });
    // "~~습니다" -> "~~해요"나 간결한 형태로
    convertedText = convertedText.replace(/([가-힣]+)습니다/g, (match, verb) => {
        return verb + '요';
    });
    // "~~입니다" -> "~~예요"
    convertedText = convertedText.replace(/([가-힣]+)입니다/g, (match, noun) => {
        return noun + '예요';
    });
    return convertedText;
}
// 메인 플러그인 로직
figma.ui.onmessage = (msg) => {
    if (msg.type === 'convert-tone') {
        const selection = figma.currentPage.selection;
        let convertedCount = 0;
        // 선택된 요소들 중 텍스트 노드 찾기
        function processNode(node) {
            if (node.type === 'TEXT') {
                const textNode = node;
                const originalText = textNode.characters;
                const convertedText = convertToFriendlyTone(originalText);
                if (originalText !== convertedText) {
                    // 폰트 로드 후 텍스트 변경
                    figma.loadFontAsync(textNode.fontName).then(() => {
                        textNode.characters = convertedText;
                        convertedCount++;
                    });
                }
            }
            else if ('children' in node) {
                // 자식 노드들도 재귀적으로 처리
                for (const child of node.children) {
                    processNode(child);
                }
            }
        }
        if (selection.length === 0) {
            figma.notify('텍스트 노드를 선택해주세요! 🙋‍♀️');
            return;
        }
        for (const node of selection) {
            processNode(node);
        }
        // 결과 알림
        setTimeout(() => {
            if (convertedCount > 0) {
                figma.notify(`${convertedCount}개의 텍스트가 친근한 톤으로 변경되었습니다! ✨`);
            }
            else {
                figma.notify('변경할 텍스트가 없습니다. 다른 텍스트를 선택해보세요! 🤔');
            }
        }, 100);
    }
    else if (msg.type === 'cancel') {
        figma.closePlugin();
    }
};
// 플러그인 시작 시 UI 표시
figma.showUI(__html__, { width: 320, height: 200 });
// 선택 변경 시 UI에 정보 전달
figma.on('selectionchange', () => {
    const selection = figma.currentPage.selection;
    let textNodeCount = 0;
    function countTextNodes(node) {
        if (node.type === 'TEXT') {
            textNodeCount++;
        }
        else if ('children' in node) {
            for (const child of node.children) {
                countTextNodes(child);
            }
        }
    }
    for (const node of selection) {
        countTextNodes(node);
    }
    figma.ui.postMessage({
        type: 'selection-change',
        textNodeCount: textNodeCount,
        totalSelected: selection.length
    });
});
