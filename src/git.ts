import { exec as exec_orig } from 'child_process';
import { promisify } from 'util';
const exec = promisify(exec_orig);

async function getGitConfigEntry(key: string): Promise<string> {
    const { stdout, stderr } = await exec(`git config --get ${key}`);
    // TODO: error handling
    return stdout;
}

export function getCurrentUser(): Promise<string> {
    return getGitConfigEntry('user.name');
}