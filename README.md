# Git-Identity switcher

This VS Code extension adds a button to easily switch between different Git authors.

## Features

If multiple people are sharing a single operating system user account and are working on the same Git repository, it is hard to keep track of their individual contributions.
For such cases this extension adds a button to the VS Code status bar displaying the currently set author. You can change it by clicking on the status bar item.

<img src="https://github.com/stephtr/git-identity/raw/master/images/showcase.gif" alt="Screenshot of the tool" width="100%">

## Extension Settings

This extension contributes the following settings:

- `git-identity.authors`: available Git authors (each array entry should be of the form 'John Doe john@doe.com')
- `git-identity.showEmail`: When to display the email address of the current author in the status bar.
  `always`, `never`, or `for identical names` when the currently active author has multiple profiles with the same name but different email addresses (default)

## Release Notes

### [1.2.0] - 2024-04-18

- Added a setting for whether to show the email address (thanks to Wesztman!)

### [1.1.2] - 2024-04-15

- In case the currently selected author has multiple profiles, also show the email address
- The extension also activates, if a `.gitignore` file is present in the workspace.

### 1.0.0

Initial release
