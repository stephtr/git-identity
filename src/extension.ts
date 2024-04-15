import * as vscode from 'vscode';
import { getCurrentUser, setCurrentUser } from './git';
import { getAuthors, addAuthor, quickValidateEmail } from './authorSettings';

export interface Author {
	name: string;
	email: string;
}

let statusbarItem: vscode.StatusBarItem;

async function updateName() {
	const currentUser = await getCurrentUser();
	const potentialAuthors = getAuthors();
	const showEmail = potentialAuthors.filter(a => a.name === currentUser.name && a.email !== currentUser.email).length > 0;
	// Additionally, show the email if the user has multiple emails
	statusbarItem.text = `$(person-filled) ${currentUser.name}${showEmail ? ` (${currentUser.email})` : ''}`;
	if (currentUser.name) {
		statusbarItem.show();
	} else {
		statusbarItem.hide();
	}
}

const switchAuthorCommand = 'git-identity.switchAuthor';

async function switchAuthorAction() {
	updateName();

	type CustomItem = vscode.QuickPickItem & (Author | {});
	const items: CustomItem[] = getAuthors().map(a => ({ ...a, label: `${a.name} (${a.email})` }));
	items.push({ label: 'Add an author...' });
	let selection: Author | undefined;
	if (items.length > 1) {
		selection = await vscode.window.showQuickPick(items) as (Author | undefined);
		if (!selection) { return; }
	}
	if (!selection || !selection.name || !selection.email) {
		const name = await vscode.window.showInputBox({ prompt: 'Enter the author\'s name.', placeHolder: 'John Doe' });
		if (!name) { return; }
		const email = await vscode.window.showInputBox({ prompt: 'Enter the author\'s email.', placeHolder: 'john@doe.com', validateInput: quickValidateEmail });
		if (!email) { return; }
		selection = { name, email };
		addAuthor(selection);
	}
	await setCurrentUser(selection);
	updateName();
}

export async function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand(switchAuthorCommand, switchAuthorAction)
	);

	statusbarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	context.subscriptions.push(statusbarItem);
	statusbarItem.command = switchAuthorCommand;

	updateName();
	const updateTimer = setInterval(updateName, 10000);
	context.subscriptions.push({ dispose: () => clearInterval(updateTimer) });
}