import { exec as exec_orig } from 'child_process';
import { promisify } from 'util';

export const exec = promisify(exec_orig);