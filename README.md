# Snippet Generator

**Snippet Generator** 是一款专为 VS Code 开发者设计的轻量级效率工具。它能够智能识别当前环境：在源码中，它帮你**生成**片段结构；在片段配置文件中，它帮你**插入**动态占位符。

---

## ✨ 功能特性 (Features)

* **⚡ 智能上下文分流 (Context-Aware)**：
* **在普通源码中**：一键将选中的代码转换为标准 Snippet JSON 结构并复制。
* **在 `.code-snippets` 文件中**：选中文字，一键转换为带序号的占位符 `${n:text}`。


* **🔢 自动序号递增 (Smart Indexing)**：在片段文件中自动感应当前 Snippet 块内的最大序号，智能生成下一个 `$n`，无需手动修改。
* **🛡️ 智能转义 (Auto Escaping)**：自动处理引号、反斜杠及多行数组格式，确保生成的 JSON 语法正确。
* **📋 剪贴板集成 (Clipboard Ready)**：生成结果直接写入剪贴板，移除首尾大括号，完美嵌入现有配置文件。
* **🌐 原生国际化 (Native L10N)**：完整支持中英文切换，右键菜单标题随文件类型动态变化。

---

## 🚀 使用方法 (Usage)

### 1. 生成片段结构 (Generate)

1. 在任何源码文件中（如 `.js`, `.ts`, `.py` 等）选中你想转换的代码。
2. 点击 **鼠标右键**，选择 **"生成 VS Code 代码片段并复制"** (或 **"Copy as VS Code Snippet"**)。
3. 直接粘贴到你的 `.code-snippets` 文件中。

### 2. 插入动态占位符 (Add Placeholder)

1. 在 `.code-snippets` 文件的 `body` 部分，选中你想设为变量的文本。
2. 点击 **鼠标右键**，选择 **"插入占位符"** (或 **"Insert Snippet Placeholder"**)。
3. 文本会自动变为 `${1:text}` 格式，且序号会根据当前代码块自动递增。

---

## 💡 小技巧 (Pro Tips)

* **快捷键绑定**：建议在 `keybindings.json` 中为 `snippet-generator.copy` 和 `snippet-generator.placeholder` 绑定同一个快捷键（如 `Alt+S`），插件会根据当前文件后缀自动触发对应的逻辑。
* **多行支持**：选中的多行代码会自动转换为 JSON 字符串数组，保持原有的缩进格式。

---

**还需要我帮你把这段内容翻译成英文版本，或者补充一个演示用的 GIF 制作建议吗？**