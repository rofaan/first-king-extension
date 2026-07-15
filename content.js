const forms = {
  "первый": "король",
  "первого": "короля",
  "первому": "королю",
  "первым": "королём",
  "первом": "короле",

  "первая": "король",
  "первой": "короля",
  "первую": "короля",

  "первое": "говно",

  "первые": "короли",
  "первых": "королей",
  "первыми": "королями"
};

function getReplacement(word) {
  const rep = forms[word.toLowerCase()];
  if (!rep) return null;

  if (word === word.toUpperCase()) return rep.toUpperCase();
  if (word === word.toLowerCase()) return rep;

  return rep[0].toUpperCase() + rep.slice(1);
}

function process(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.parentNode?.dataset?.processed) return;

    const oldText = node.textContent;

    const newText = oldText.replace(
      /перв(ый|ого|ому|ым|ом|ая|ой|ую|ое|ые|ых|ыми)(?!\s+(король|короля|королю|королём|короле|короли|королей|королями|говно))/gi,
      match => {
        const rep = getReplacement(match);
        if (!rep) return match;
        return `${match} ${rep}`;
      }
    );

    if (newText !== oldText) {
      const span = document.createElement("span");
      span.dataset.processed = "true";
      span.textContent = newText;
      node.replaceWith(span);
    }

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

new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(process);
  });
}).observe(document.body, {
  childList: true,
  subtree: true
});
