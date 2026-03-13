import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	async function convertToPlaceholder(editor: vscode.TextEditor, selection: vscode.Selection, text: string) {
		const document = editor.document;
		const cursorOffset = document.offsetAt(selection.start);
		const fullText = document.getText();

		// 1. 向上查找最近的 "body": [ 
		// 这能粗略定位当前 Snippet 的起始位置
		const bodyStartIdx = fullText.lastIndexOf('"body":', cursorOffset);

		// 如果没找到（可能不在 body 内），回退到 0
		const searchStart = bodyStartIdx !== -1 ? bodyStartIdx : 0;

		// 2. 向下查找当前 Snippet 的结束位置（下一个 "body": 或文件末尾）
		let searchEnd = fullText.indexOf('"body":', cursorOffset);
		if (searchEnd === -1) searchEnd = fullText.length;

		// 3. 仅在当前 Snippet 范围内提取文本
		const scopeText = fullText.substring(searchStart, searchEnd);

		// 4. 在局部范围内匹配最大序号
		const placeholderRegex = /\$\{(\d+):/g;
		let maxIndex = 0;
		let match;

		while ((match = placeholderRegex.exec(scopeText)) !== null) {
			const currentIndex = parseInt(match[1]);
			if (currentIndex > maxIndex) maxIndex = currentIndex;
		}

		const nextIndex = maxIndex + 1;

		// 5. 执行替换
		const replacement = `\${${nextIndex}:${text}}`;
		await editor.edit(editBuilder => {
			editBuilder.replace(selection, replacement);
		});

		vscode.window.setStatusBarMessage(`局部序号: $${nextIndex}`, 3000);
	}

	async function generateSnippetToClipboard(text: string) {
		const lines = text.split(/\r?\n/);
		const snippetObj = {
			"Your Snippet Name": {
				"prefix": "prefix",
				"body": lines,
				"description": vscode.l10n.t("snippet.desc")
			}
		};

		const snippetString = JSON.stringify(snippetObj, null, 4);
		// 移除首尾大括号，方便用户直接粘贴到现有的 snippets JSON 中
		const finalSnippet = snippetString.replace(/^\{|\}$/g, '').trim();

		await vscode.env.clipboard.writeText(finalSnippet);
		vscode.window.showInformationMessage(vscode.l10n.t("msg.success"));
	}

	const coreHandler = async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		const selection = editor.selection;
		const text = editor.document.getText(selection);

		if (!text) {
			// 自动根据当前 VS Code 语言显示 package.nls 中的提示
			vscode.window.showWarningMessage(vscode.l10n.t("msg.warn"));
			return;
		}

		const document = editor.document;
		const isSnippetFile = document.languageId === 'snippets' ||
			document.fileName.endsWith('.code-snippets') ||
			(document.languageId === 'json' && document.fileName.includes('.vscode'));
		if (isSnippetFile) {
			const selectedText = document.getText(selection);
			await convertToPlaceholder(editor, selection, selectedText);
		} else {
			await generateSnippetToClipboard(text);
		}
	};

	context.subscriptions.push(
		vscode.commands.registerCommand('snippet-generator.copy', coreHandler),
		vscode.commands.registerCommand('snippet-generator.placeholder', coreHandler)
	);
}