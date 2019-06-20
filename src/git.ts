import { exec } from './exec';
import { Author } from './extension';

async function getGitConfigEntry(key: string): Promise<string> {
    const { stdout, stderr } = await exec(`git config --get ${key}`, { timeout: 1000, windowsHide: true });
    // TODO: error handling
    return stdout.replace('\r', '').replace('\n', '');
}

function setGlobalGitConfigEntry(key: string, value: string): Promise<{}> {
    return exec(`git config --global ${key} "${value.replace('"', '""')}"`);
}

export function getCurrentUser(): Promise<string> {
    return getGitConfigEntry('user.name');
}

export async function setCurrentUser(author: Author): Promise<void> {
    await setGlobalGitConfigEntry('user.name', author.name);
    await setGlobalGitConfigEntry('user.email', author.email);
}