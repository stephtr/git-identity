import { quickValidateEmail, getAuthors, addAuthor } from '../src/authorSettings';
import * as vscode from 'vscode';

describe('author utils', () => {

    describe('quickValidateEmail', () => {
        it('should return an error for invalid email addresses', () => {
            expect(quickValidateEmail('John Doe')).toBeTruthy();
        });
        it('should return undefined for valid email addresses', () => {
            expect(quickValidateEmail('john@doe.com')).toBeUndefined();
        });
    });

    const configuration = vscode.workspace.getConfiguration();

    describe('getAuthor', () => {
        it('should return an empty array if no configuration is present', () => {
            (configuration.get as jest.Mock<any>).mockReturnValue(undefined);
            expect(getAuthors()).toHaveLength(0);
        });

        it('should return the set Author', () => {
            (configuration.get as jest.Mock<any>).mockReturnValue(['John Doe john@doe.com']);
            const authors = getAuthors();
            expect(authors).toHaveLength(1);
            expect(authors[0].name).toBe('John Doe');
            expect(authors[0].email).toBe('john@doe.com');
        });

        it('should ignore unknown entries', () => {
            (configuration.get as jest.Mock<any>).mockReturnValue(['John Doe john@doe.com', 'invalid entry']);
            expect(getAuthors()).toHaveLength(1);
        });
    });

    describe('setAuthor', () => {
        it('should add an author', () => {
            const oldEntries = ['John Doe john@doe.com'];
            const newAuthor = {
                name: 'Max Mustermann',
                email: 'max@mustermann.at'
            };
            (configuration.get as jest.Mock<any>).mockReturnValue([...oldEntries]);            
            addAuthor(newAuthor);
            const newEntries = (configuration.update as jest.Mock<any>).mock.calls[0][1] as string[];
            expect(newEntries).toHaveLength(oldEntries.length + 1);
            expect(newEntries.some(e => e.includes(newAuthor.name) && e.includes(newAuthor.email))).toBeTruthy();
        });
    });

});