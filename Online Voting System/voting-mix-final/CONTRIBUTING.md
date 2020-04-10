# Contributing

## Cloning the repository

### Install GIT Bash

  - Windows: (https://github.com/git-for-windows/git/releases/download/v2.20.1.windows.1/Git-2.20.1-64-bit.exe)
  - inux/UNIX/macOS: (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Generating your SSH key

Open a terminal on Linux or macOS, or Git Bash on Windows and enter the following **substituting your details**, pressing enter twice as there no need to change the name or put in a password

`ssh-keygen -o -t rsa -b 4096 -C "email@example.com"`

Copy your public SSH key to the clipboard by using one of the commands below depending on your Operating System:

Git Bash on Windows:
`cat ~/.ssh/id_rsa.pub | clip`

macOS:
`pbcopy < ~/.ssh/id_rsa.pub`

WSL / GNU/Linux (requires the xclip package):
`xclip -sel clip < ~/.ssh/id_rsa.pub`

go to https://gitlab.cs.cf.ac.uk/profile/keys and paste your key in adding a useful name like "My main laptop" and click 'Add Key'

### Setting your details 

run the following commands **substituting your details**:

`git config user.name "Your name"`

`git config user.email "YourEmail@cardiff.ac.uk"`

### Clone the repository

Navigate to the repository's directory a new terminal, e.g. for windows

`cd c:\my\chosen\directory`

Clone the repository to your chosen folder

`git clone git@gitlab.cs.cf.ac.uk:c1600431/voting.git`

## Setting up node version manager and Node.js

### Install node version manager (NVM)

Remove any previous versions of Node.js you may have installed

Install **node version manager**

#### Windows
Download `nvm-setup.zip` from the latest release [here](https://github.com/coreybutler/nvm-windows/releases)
extract and install
#### Linux/UNIX/macOS
Follow the "Installation" section (https://github.com/creationix/nvm/blob/master/README.md)

Open a new terminal, navigate to this repository's folder (e.g. c:\my\chosen\directory) and run

`nvm install 10.15.1`

followed by

`nvm use 10.15.1`

## First time start

Run the Node Packet Manager installation to install missing prequesists for the project

  `npm install`

followed by

  `npm run migrate` (**MAKE SURE THAT MYSQL IS RUNNING**)

Finally, run the app with

  `npm run dev`

The app should be running on localhost:8080 (port could change)

To run node again, just use the last command from the directory of the project.

### Install MySQL server and MySQL Workbench (useful until we have a remote server)

#### Windows

Get the installer [here](https://dev.mysql.com/downloads/windows/installer/8.0.html) and install MySQL server and MySQL Workbench. Changes to the default configuration are not recommended(i.e. spam "Next"). At the end, restart your pc.

#### Linux/UNIX/macOS

MySQL server - Go [here](https://dev.mysql.com/downloads/mysql/) and download the installer for for your distribution. Changes to the default configuration are not recommended(i.e. spam "Next"). At the end, restart your pc.

MySQL workbench - Go [here](https://dev.mysql.com/downloads/workbench/) and download the installer for for your distribution. Changes to the default configuration are not recommended(i.e. spam "Next").

Depending on your distribution, you could install both through the package manager(e.g. apt, emerge)

## Install Visual studio code - **MANDATORY**

1. Get the installer for your OS at [](https://code.visualstudio.com/) and run the installer
2. Install the following extensions([see how](https://code.visualstudio.com/docs/editor/extension-gallery)):
    - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
    - [Node.js Extension Pack](https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack)
    - [Pug (Jade) snippets](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-jade-snippets)
3. Ready! Open the repository's directory and develop

## Development scripts and commands (optional)

1. `npm run dev` - run the app using nodemon. Nodemon watches for any changes to the server's js
files and restarts the app when it detects one.

2. `npm run migrate` - commit the latest migration to the database

3. `npm run create-migration -- transaction-name` - create a new database migration with a specified ***transaction-name***
