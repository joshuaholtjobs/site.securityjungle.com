console.log("CUSTOM MERMAID LOADED");

function css(name) {
  return "rgb(" + getComputedStyle(document.documentElement).getPropertyValue(name) + ")";
}
function initMermaidLight() {
  mermaid.initialize({
    theme: "base",
    themeVariables: {
      background: css("--color-neutral"),
      primaryColor: css("--color-primary-200"),
      secondaryColor: css("--color-secondary-200"),
      tertiaryColor: css("--color-neutral-100"),
      primaryBorderColor: css("--color-primary-400"),
      secondaryBorderColor: css("--color-secondary-400"),
      tertiaryBorderColor: css("--color-neutral-400"),
      lineColor: css("--color-neutral-600"),
      fontFamily:
        "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif",
      fontSize: "16px",
    },
  });
}
function initMermaidDark() {
  mermaid.initialize({
    theme: "base",
    themeVariables: {
      background: css("--color-neutral-800"),
      primaryColor: css("--color-primary-600"),
      secondaryColor: css("--color-secondary-600"),
      tertiaryColor: css("--color-neutral-700"),
      primaryBorderColor: css("--color-primary-400"),
      secondaryBorderColor: css("--color-secondary-400"),
      tertiaryBorderColor: css("--color-neutral-400"),
      lineColor: css("--color-neutral-300"),
      primaryTextColor: "#000000",
      secondaryTextColor: "#000000",
      tertiaryTextColor: "#000000",
      nodeTextColor: "#000000",
      textColor: "#000000",
      fontFamily:
        "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif",
      fontSize: "16px",
    },
  });
}

function fixMermaidTextColor() {
  // Target everything inside mermaid
  document.querySelectorAll('.mermaid foreignObject').forEach(fo => {
    // Reset inheritance completely
    fo.style.cssText = 'color: #000000 !important; -webkit-text-fill-color: #000000 !important;';
    
    // Hit every child
    fo.querySelectorAll('*').forEach(el => {
      el.style.cssText += 'color: #000000 !important; -webkit-text-fill-color: #000000 !important; fill: #000000 !important;';
    });
  });
  
  // Also try text elements directly
  document.querySelectorAll('.mermaid text, .mermaid tspan').forEach(el => {
    el.setAttribute('fill', '#000000');
    el.style.fill = '#000000';
  });
}