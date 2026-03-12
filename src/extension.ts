import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('snippet-generator.generate', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		const selection = editor.selection;
		const text = editor.document.getText(selection);

		if (!text) {
			// 自动根据当前 VS Code 语言显示 package.nls 中的提示
			vscode.window.showWarningMessage(vscode.l10n.t("msg.warn"));
			return;
		}

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
	});

	context.subscriptions.push(disposable);
}