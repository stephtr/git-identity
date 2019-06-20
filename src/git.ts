import { exec } from './exec';
import { Author } from './extension';

async function getGitConfigEntry(key: string): Promise<string> {
    const { stdout, stderr } = await exec(`git config --get ${key}`, { timeout: 1000, windowsHide: true });
    // TODO: error handling
    return stdout.replace('\r', '').replace('\n', '');
}

function setGitConfigEntry(key: string, value: string, local: boolean = false): Promise<{}> {
    const location = local ? 'local' : 'global';
    return exec(`git config --${location} ${key} "${value.replace('"', '""')}"`);
}

export function getCurrentUser(): Promise<string> {
    return getGitConfigEntry('user.name');
}

export async function setCurrentUser(author: Author): Promise<void> {
    await setGitConfigEntry('user.name', author.name, true);
    await setGitConfigEntry('user.email', author.email, true);
}