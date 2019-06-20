import { getCurrentUser, setCurrentUser } from '../src/git';

jest.mock('../src/exec', () => ({
    exec: jest.fn()
}));

import { exec } from '../src/exec';

describe('Git utilities', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should get the current user', async () => {
        const fakeUser = 'John Doe';
        (exec as jest.Mock<any>).mockReturnValueOnce(Promise.resolve({ stdout: fakeUser + '\r\n', stderr: '' }));
        expect(await getCurrentUser()).toEqual(fakeUser);
        const executedCommand = (exec as jest.Mock<any>).mock.calls[0][0] as string;
        expect(executedCommand).toContain('git config');
        expect(executedCommand).toContain(' --get user.name');
    });

    it('should change the author', async () => {
        const author = {
            name: 'John Doe',
            email: 'john@doe.com'
        };
        await setCurrentUser(author);
        const commands = [
            (exec as jest.Mock<any>).mock.calls[0][0] as string,
            (exec as jest.Mock<any>).mock.calls[1][0] as string
        ];
        commands.forEach(cmd => {
            expect(cmd).toContain('git config');
            expect(cmd).not.toContain('--set'); 
        });
        expect(commands.join('|')).toContain(`user.name "${author.name}"`);
        expect(commands.join('|')).toContain(`user.email "${author.email}"`);
    });
});