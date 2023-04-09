#Clone this repo :D

Export env variable CSV_OUPUT with the desired output in your profile file (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc):

export CSV_OUTPUT="{some export timesheet path}"
export COMMIT_HOOKS_PATH="{some path to this repo | e.g ...blabla/commit-hooks}"

Load profile in current terminal: 
bash: source ~/.bashrc

zsh: source ~/.zshrc

ksh: . ~/.profile

# On your desired repository ensure you have .git/ folder or initialize one via git init
 
Move to hooks folder   
Copy commit-msg.sample and remove .sample suffix

Make sure commit-msg file is executable
  chmod 777 commit-msg


See https://stackoverflow.com/questions/45416049/how-to-make-a-git-pre-commit-hook-that-checks-the-commit-message
