function process(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent.replace(
      /(?<![А-Яа-яЁёA-Za-z0-9_])первый(?!\s+король)(?![А-Яа-яЁёA-Za-z0-9_])/gi,
      m => m === m.toUpperCase()
        ? m + " КОРОЛЬ"
        : m === m.toLowerCase()
          ? m + " король"
          : m + " Король"
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

process(document.body);

new MutationObserver(ms => {
  ms.forEach(m => m.addedNodes.forEach(process));
}).observe(document.body, {
  childList: true,
  subtree: true
});