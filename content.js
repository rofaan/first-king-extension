const forms = {
  "первый": "король",
  "первого": "короля",
  "первому": "королю",
  "первым": "королём",
  "первом": "короле",
  "первая": "королева",
  "первой": "королевы",
  "первую": "королеву",
  "первые": "короли",
  "первых": "королей",
  "первыми": "королями"
};

function getReplacement(word) {
  const replacement = forms[word.toLowerCase()];
  if (!replacement) return word;

  if (word === word.toUpperCase()) {
    return replacement.toUpperCase();
  }

  if (word === word.toLowerCase()) {
    return replacement;
  }

  return replacement.charAt(0).toUpperCase() + replacement.slice(1);
}

function process(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent.replace(
      /(?<![А-Яа-яЁёA-Za-z0-9_])(первый|первого|первому|первым|первом|первая|первой|первую|первые|первых|первыми)(?!\s+(король|короля|королю|королём|короле|королева|королевы|королеву|короли|королей|королями))(?![А-Яа-яЁёA-Za-z0-9_])/gi,
      match => `${match} ${getReplacement(match)}`
    );
    return;
  }

  if (
    node.nodeType === Node.ELEMENT_NODE &&
    !["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(node.tagName)
  ) {
    node.childNodes.forEach(process);
  }
}

function start() {
  if (!document.body) {
    requestAnimationFrame(start);
    return;
  }

  process(document.body);

  new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        process(node);
      }
    }
  }).observe(document.body, {
    childList: true,
    subtree: true
  });
}

start();
