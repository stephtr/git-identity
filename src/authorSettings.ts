import * as vscode from 'vscode';
import { Author } from './extension';

const emailRegex = /^\S+@\S+\.\S+$/;
export function quickValidateEmail(email: string): string | undefined {
	if (!emailRegex.test(email)) {
		return 'Enter a valid email address';
	}
}

export function getAuthors(): Author[] {
	const authorStrings = vscode.workspace.getConfiguration('git-identity').get<string[]>('authors');
	if (!authorStrings) {
		return [];
	}
	const splitRegex = /(.+)\s+(\S+@\S+\.\S+)/;
	return authorStrings.map((v) => {
		const match = splitRegex.exec(v);
		return match && {
			name: match[1],
			email: match[2]
		};
	}).filter(v => v) as Author[];
}

export function addAuthor(author: Author) {
	const configuration = vscode.workspace.getConfiguration('git-identity');
	let authorStrings = configuration.get<string[]>('authors');
	if (!authorStrings) {
		authorStrings = [];
	}
	authorStrings.push(`${author.name} ${author.email}`);
	configuration.update('authors', authorStrings, true);
}