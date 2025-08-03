import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  test('Command is registered', async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes('legacyModernizer.upgradeCode'));
  });
});
