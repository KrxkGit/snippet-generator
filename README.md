# Snippet Generator

**Snippet Generator** 是一款轻量级的效率工具，旨在帮助开发者一键将选中的代码转换为标准 VS Code Snippet 格式并复制到剪贴板。

---

## ✨ 功能特性 (Features)

* **一键生成 (One-Click Generation)**：选中代码，右键即可生成。
* **智能转义 (Auto Escaping)**：自动处理引号、反斜杠及多行数组格式。
* **剪贴板集成 (Clipboard Ready)**：生成结果直接写入剪贴板，即贴即用。
* **原生国际化 (Native L10N)**：完整支持中英文切换，适配您的编辑器语言。
* **无感插入 (Clean Paste)**：生成的 JSON 自动修剪外层大括号，完美嵌入现有的 `.code-snippets` 文件。

---

## 🚀 使用方法 (Usage)

1. 在编辑器中选中一段你想转换的代码。
2. 点击 **鼠标右键**。
3. 在菜单中选择 **"Copy as VS Code Snippet"** (或 **"生成 VS Code 代码片段并复制"**)。
4. 打开你的 `.code-snippets` 配置文件，在相应位置直接粘贴 (`Ctrl+V` / `Cmd+V`)。
5. 根据需要微调 `prefix` 和 `body` 中的占位符。