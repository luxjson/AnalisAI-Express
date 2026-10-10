function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );
}
function renderMath(value) {
  let formula = value
    .trim()
    .replace(
      /\\frac\{([^{}]+)\}\{([^{}]+)\}/g,
      '<span class="ai-fraction"><span>$1</span><span>$2</span></span>',
    )
    .replace(/\\div/g, "÷")
    .replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·")
    .replace(/\^\{([^{}]+)\}/g, "<sup>$1</sup>")
    .replace(/\^([A-Za-z0-9]+)/g, "<sup>$1</sup>");
  return `<span class="ai-math">${formula}</span>`;
}
function renderAssistantText(value) {
  if (!value) return "";
  let text = String(value).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const mathBlocks = [];
  text = text.replace(
    /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|(?<!\$)\$([^$\n]+)\$(?!\$)/g,
    (_, block, bracket, inline, dollar) => {
      const token = `@@AI_MATH_${mathBlocks.length}@@`;
      mathBlocks.push(renderMath(block || bracket || inline || dollar));
      return token;
    },
  );
  const codeBlocks = [];
  text = text.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (_, lang, code) => {
    const token = `@@AI_CODE_${codeBlocks.length}@@`;
    codeBlocks.push(
      `<pre><code class="language-${escapeHtml(lang || "text")}">${escapeHtml(code.trim())}</code></pre>`,
    );
    return token;
  });
  const inlineCodes = [];
  text = text.replace(/`([^`\n]+)`/g, (_, code) => {
    const token = `@@AI_INLINE_${inlineCodes.length}@@`;
    inlineCodes.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });
  text = escapeHtml(text);
  function formatInline(str) {
    return str
      .replace(/\*\*\*([^\*\n]+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/___([^_\n]+?)___/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*([^\*\n]+?)\*\*/g, "<strong>$1</strong>")
      .replace(/__([^_\n]+?)__/g, "<strong>$1</strong>")
      .replace(/\*([^\*\n\s](?:[^\*\n]*?[^\*\n\s])?)\*/g, "<em>$1</em>")
      .replace(
        /(^|[\s\(\[\{])_([^_\n\s](?:[^_\n]*?[^_\n\s])?)_([\s\)\]\}]|$)/g,
        "$1<em>$2</em>$3",
      );
  }
  const lines = text.split("\n");
  const out = [];
  let currentList = null;
  let currentParagraph = [];
  function flushParagraph() {
    if (currentParagraph.length > 0) {
      out.push(`<p>${currentParagraph.map(formatInline).join("<br>")}</p>`);
      currentParagraph = [];
    }
  }
  function flushList() {
    if (currentList) {
      out.push(`</${currentList}>`);
      currentList = null;
    }
  }
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    if (/^([*_-][ \t]*){3,}$/.test(trimmed)) {
      flushParagraph();
      flushList();
      out.push("<hr>");
      continue;
    }
    const decoMatch = trimmed.match(/^((?:[*_-]{3,}[ \t]*)+)(.+)$/);
    if (decoMatch) {
      flushParagraph();
      flushList();
      out.push("<hr>");
      trimmed = decoMatch[2].trim();
      line = trimmed;
    }
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = Math.min(Math.max(headingMatch[1].length, 2), 5);
      out.push(`<h${level}>${formatInline(headingMatch[2])}</h${level}>`);
      continue;
    }
    const ulMatch = line.match(/^(\s*)([*+-])\s+(.+)$/);
    if (ulMatch) {
      flushParagraph();
      const indent = ulMatch[1].length;
      const content = formatInline(ulMatch[3]);
      if (currentList !== "ul") {
        flushList();
        out.push("<ul>");
        currentList = "ul";
      }
      if (indent >= 2) {
        out.push(`  <li class="ai-nested-li">${content}</li>`);
      } else {
        out.push(`  <li>${content}</li>`);
      }
      continue;
    }
    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (olMatch) {
      flushParagraph();
      const content = formatInline(olMatch[3]);
      if (currentList !== "ol") {
        flushList();
        out.push("<ol>");
        currentList = "ol";
      }
      out.push(`  <li value="${olMatch[2]}">${content}</li>`);
      continue;
    }
    flushList();
    currentParagraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  let result = out.join("\n");
  mathBlocks.forEach((formula, index) => {
    result = result.replace(`@@AI_MATH_${index}@@`, formula);
  });
  inlineCodes.forEach((code, index) => {
    result = result.replace(`@@AI_INLINE_${index}@@`, code);
  });
  codeBlocks.forEach((code, index) => {
    result = result.replace(`@@AI_CODE_${index}@@`, code);
  });
  return result;
}
export { renderAssistantText };
