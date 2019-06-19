import * as vscode from 'vscode';
import { getCurrentUser } from './git';

let statusbarItem: vscode.StatusBarItem;

async function updateName() {
	const name = await getCurrentUser();
	statusbarItem.text = `$(person-filled) ${name}`;
}

export async function activate(context: vscode.ExtensionContext) {
	statusbarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(statusbarItem);
	statusbarItem.show();
	
	updateName();
	const updateTimer = setInterval(updateName, 10000);
	context.subscriptions.push({ dispose: () => clearInterval(updateTimer) });
}

export function deactivate() {
}
