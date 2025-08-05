"use strict";
// UX 톤 적용하기 - Figma 플러그인
// 텍스트 분석 및 친근한 톤 변환 기능
const toneRules = [
    // 요구사항에 명시된 규칙들
    {
        pattern: '확인해보세요',
        replacement: '확인하기',
        description: '확인 액션을 친근하게',
        category: 'formal-to-friendly'
    },
    {
        pattern: '이용해보세요',
        replacement: '이용하기',
        description: '이용 권유를 친근하게',
        category: 'formal-to-friendly'
    },
    {
        pattern: /됩니다$/g,
        replacement: '돼요',
        description: '격식체를 친근체로',
        category: 'ending'
    },
    {
        pattern: /입니다$/g,
        replacement: '이에요',
        description: '격식체를 친근체로',
        category: 'ending'
    },
    // 확장 가능한 추가 규칙들
    {
        pattern: '클릭하세요',
        replacement: '클릭하기',
        description: '클릭 액션을 친근하게',
        category: 'command'
    },
    {
        pattern: '선택하세요',
        replacement: '선택하기',
        description: '선택 액션을 친근하게',
        category: 'command'
    },
    {
        pattern: '입력하세요',
        replacement: '입력하기',
        description: '입력 액션을 친근하게',
        category: 'command'
    },
    {
        pattern: /하십시오$/g,
        replacement: '하기',
        description: '존댓말을 친근하게',
        category: 'formal-to-friendly'
    },
    {
        pattern: /해주세요$/g,
        replacement: '하기',
        description: '요청을 친근하게',
        category: 'formal-to-friendly'
    },
    {
        pattern: /습니다$/g,
        replacement: '어요',
        description: '격식체를 친근체로',
        category: 'ending'
    }
];
// 문장 스타일 분석
var SentenceStyle;
(function (SentenceStyle) {
    SentenceStyle["COMMAND"] = "command";
    SentenceStyle["QUESTION"] = "question";
    SentenceStyle["STATEMENT"] = "statement"; // 서술문
})(SentenceStyle || (SentenceStyle = {}));
// 감정 톤 분석
var EmotionTone;
(function (EmotionTone) {
    EmotionTone["FRIENDLY"] = "friendly";
    EmotionTone["PROFESSIONAL"] = "professional";
    EmotionTone["FORMAL"] = "formal";
    EmotionTone["CASUAL"] = "casual";
})(EmotionTone || (EmotionTone = {}));
// 텍스트 분석 클래스
class TextAnalyzer {
    // 문장 스타일 분석
    static analyzeSentenceStyle(text) {
        const trimmedText = text.trim();
        if (trimmedText.endsWith('?') || trimmedText.includes('언제') ||
            trimmedText.includes('어떻게') || trimmedText.includes('무엇')) {
            return SentenceStyle.QUESTION;
        }
        if (trimmedText.includes('하세요') || trimmedText.includes('하십시오') ||
            trimmedText.includes('해주세요') || trimmedText.includes('하기')) {
            return SentenceStyle.COMMAND;
        }
        return SentenceStyle.STATEMENT;
    }
    // 감정 톤 분석
    static analyzeEmotionTone(text) {
        const formalPatterns = ['습니다', '됩니다', '입니다', '하십시오'];
        const friendlyPatterns = ['해요', '이에요', '돼요', '하기'];
        const professionalPatterns = ['확인', '검토', '승인', '처리'];
        let formalScore = 0;
        let friendlyScore = 0;
        let professionalScore = 0;
        formalPatterns.forEach(pattern => {
            formalScore += (text.match(new RegExp(pattern, 'g')) || []).length;
        });
        friendlyPatterns.forEach(pattern => {
            friendlyScore += (text.match(new RegExp(pattern, 'g')) || []).length;
        });
        professionalPatterns.forEach(pattern => {
            professionalScore += (text.match(new RegExp(pattern, 'g')) || []).length;
        });
        if (formalScore > friendlyScore && formalScore > 0) {
            return EmotionTone.FORMAL;
        }
        else if (friendlyScore > 0) {
            return EmotionTone.FRIENDLY;
        }
        else if (professionalScore > 0) {
            return EmotionTone.PROFESSIONAL;
        }
        return EmotionTone.CASUAL;
    }
    // 키워드 추출 및 빈도 분석
    static extractKeywords(text) {
        // 한국어 조사, 어미 등을 제외한 의미있는 단어 추출
        const stopWords = ['을', '를', '이', '가', '에', '의', '와', '과', '로', '으로', '에서', '부터', '까지'];
        const words = text.split(/\s+/)
            .filter(word => word.length > 1)
            .filter(word => !stopWords.includes(word))
            .map(word => word.replace(/[^\w가-힣]/g, ''));
        const frequency = {};
        words.forEach(word => {
            if (word) {
                frequency[word] = (frequency[word] || 0) + 1;
            }
        });
        const keywords = Object.keys(frequency)
            .sort((a, b) => frequency[b] - frequency[a])
            .slice(0, 5); // 상위 5개 키워드
        return { keywords, frequency };
    }
    // 적용 가능한 규칙 찾기
    static findApplicableRules(text) {
        const applicableRules = [];
        toneRules.forEach(rule => {
            const matches = [];
            let preview = text;
            if (typeof rule.pattern === 'string') {
                if (text.includes(rule.pattern)) {
                    matches.push(rule.pattern);
                    preview = text.replace(new RegExp(rule.pattern, 'g'), rule.replacement);
                }
            }
            else {
                const regexMatches = text.match(rule.pattern);
                if (regexMatches) {
                    matches.push(...regexMatches);
                    preview = text.replace(rule.pattern, rule.replacement);
                }
            }
            if (matches.length > 0) {
                applicableRules.push({
                    rule,
                    matches,
                    preview
                });
            }
        });
        return applicableRules;
    }
    // UX 톤 프로파일 생성
    static createUXToneProfile(text, emotionTone) {
        const formalIndicators = ['습니다', '됩니다', '입니다', '하십시오'];
        const friendlyIndicators = ['해요', '이에요', '돼요', '하기'];
        let formalityLevel = 0;
        let friendlinessScore = 0;
        formalIndicators.forEach(indicator => {
            formalityLevel += (text.match(new RegExp(indicator, 'g')) || []).length * 20;
        });
        friendlyIndicators.forEach(indicator => {
            friendlinessScore += (text.match(new RegExp(indicator, 'g')) || []).length * 25;
        });
        formalityLevel = Math.min(formalityLevel, 100);
        friendlinessScore = Math.min(friendlinessScore, 100);
        const improvementAreas = [];
        if (formalityLevel > 60)
            improvementAreas.push('격식체를 친근체로 변경');
        if (friendlinessScore < 40)
            improvementAreas.push('더 친근한 표현 사용');
        if (text.includes('하세요'))
            improvementAreas.push('명령조를 권유조로 변경');
        return {
            currentTone: emotionTone,
            recommendedTone: EmotionTone.FRIENDLY,
            friendlinessScore,
            formalityLevel,
            improvementAreas
        };
    }
    // 전체 텍스트 분석
    static analyzeText(text) {
        const sentenceStyle = this.analyzeSentenceStyle(text);
        const emotionTone = this.analyzeEmotionTone(text);
        const { keywords, frequency } = this.extractKeywords(text);
        const applicableRules = this.findApplicableRules(text);
        const uxToneProfile = this.createUXToneProfile(text, emotionTone);
        return {
            text,
            sentenceStyle,
            emotionTone,
            keywords,
            keywordFrequency: frequency,
            applicableRules,
            uxToneProfile
        };
    }
}
// 톤 변환 적용 클래스
class ToneConverter {
    static applyToneRules(text, selectedRules) {
        let convertedText = text;
        const rulesToApply = selectedRules || toneRules;
        rulesToApply.forEach(rule => {
            if (typeof rule.pattern === 'string') {
                convertedText = convertedText.replace(new RegExp(rule.pattern, 'g'), rule.replacement);
            }
            else {
                convertedText = convertedText.replace(rule.pattern, rule.replacement);
            }
        });
        return convertedText;
    }
}
// 메인 플러그인 로직
let currentAnalysis = null;
// UI로부터 메시지 처리
figma.ui.onmessage = async (msg) => {
    try {
        switch (msg.type) {
            case 'analyze-text':
                await handleAnalyzeText();
                break;
            case 'apply-tone':
                await handleApplyTone(msg.selectedRules);
                break;
            case 'apply-all-rules':
                await handleApplyAllRules();
                break;
            case 'close':
                figma.closePlugin();
                break;
            default:
                console.warn('Unknown message type:', msg.type);
        }
    }
    catch (error) {
        console.error('Error handling message:', error);
        figma.notify('오류가 발생했습니다. 다시 시도해주세요.', { error: true });
    }
};
// 텍스트 분석 처리
async function handleAnalyzeText() {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
        figma.ui.postMessage({
            type: 'error',
            message: '텍스트 노드를 선택해주세요.'
        });
        return;
    }
    const textNodes = [];
    // 선택된 노드에서 텍스트 노드 수집
    function collectTextNodes(node) {
        if (node.type === 'TEXT') {
            textNodes.push(node);
        }
        else if ('children' in node) {
            for (const child of node.children) {
                collectTextNodes(child);
            }
        }
    }
    selection.forEach(collectTextNodes);
    if (textNodes.length === 0) {
        figma.ui.postMessage({
            type: 'error',
            message: '선택된 요소에 텍스트 노드가 없습니다.'
        });
        return;
    }
    // 모든 텍스트 결합하여 분석
    const combinedText = textNodes.map(node => node.characters).join(' ');
    currentAnalysis = TextAnalyzer.analyzeText(combinedText);
    figma.ui.postMessage({
        type: 'analysis-complete',
        analysis: currentAnalysis,
        textNodeCount: textNodes.length
    });
}
// 선택된 규칙 적용
async function handleApplyTone(selectedRuleIndices) {
    if (!currentAnalysis) {
        figma.notify('먼저 텍스트를 분석해주세요.');
        return;
    }
    const selection = figma.currentPage.selection;
    const textNodes = [];
    function collectTextNodes(node) {
        if (node.type === 'TEXT') {
            textNodes.push(node);
        }
        else if ('children' in node) {
            for (const child of node.children) {
                collectTextNodes(child);
            }
        }
    }
    selection.forEach(collectTextNodes);
    let selectedRules = [];
    if (selectedRuleIndices && selectedRuleIndices.length > 0) {
        selectedRules = selectedRuleIndices.map(index => currentAnalysis.applicableRules[index].rule);
    }
    else {
        selectedRules = currentAnalysis.applicableRules.map(ar => ar.rule);
    }
    let convertedCount = 0;
    for (const textNode of textNodes) {
        const originalText = textNode.characters;
        const convertedText = ToneConverter.applyToneRules(originalText, selectedRules);
        if (originalText !== convertedText) {
            await figma.loadFontAsync(textNode.fontName);
            textNode.characters = convertedText;
            convertedCount++;
        }
    }
    figma.notify(`${convertedCount}개의 텍스트가 친근한 톤으로 변경되었습니다! ✨`);
    // 변경 후 재분석
    await handleAnalyzeText();
}
// 모든 규칙 적용
async function handleApplyAllRules() {
    await handleApplyTone();
}
// 플러그인 시작
figma.showUI(__html__, { width: 400, height: 600 });
// 선택 변경 시 자동 분석
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
    selection.forEach(countTextNodes);
    figma.ui.postMessage({
        type: 'selection-change',
        textNodeCount,
        totalSelected: selection.length
    });
});
