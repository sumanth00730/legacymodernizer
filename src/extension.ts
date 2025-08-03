import * as vscode from 'vscode';
import { modernizeCode } from './openaiAdapter';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('legacyModernizer.upgradeCode', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor!');
      return;
    }
    const selection = editor.selection;
    const code = editor.document.getText(selection);

    if (!code) {
      vscode.window.showWarningMessage('Please select some legacy code to modernize.');
      return;
    }

    vscode.window.withProgress(
      { location: vscode.ProgressLocation.Notification, title: 'Modernizing code with OpenAI...' },
      async () => {
        try {
          const prompt = `Modernize this legacy code:\n${code}`;
          const modernized = await modernizeCode(prompt);
          await editor.edit(editBuilder => {
            editBuilder.replace(selection, modernized);
          });
          vscode.window.showInformationMessage('Code modernized! You can undo with Ctrl+Z.');
        } catch (err: any) {
          vscode.window.showErrorMessage(`Modernization failed: ${err.message}`);
        }
      }
    );
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
