chrome.devtools.panels.create("demo panel", "icon.png", "panel.html", () => {
  console.log("user switched to this panel");
});
