Cloning a Repository with Submodules
This guide provides instructions on how to clone a Git repository along with its submodules using the git clone --recurse-submodules command.

Prerequisites
Before proceeding, make sure you have the following:

Git installed on your local machine. You can download Git from here.
Access to the repository containing submodules.
Cloning with Submodules
To clone a repository with submodules, follow these steps:

Open your terminal or command prompt.

Navigate to the directory where you want to clone the repository.

Use the following command to clone the repository along with its submodules:

bash
Copy code
git clone --recurse-submodules https://github.com/johnlomat/johnlomat.github.io.git
This command will clone both the main repository and all its submodules recursively.

Wait for the cloning process to complete. Git will clone the main repository as well as all its submodules recursively.

Initializing and Updating Submodules (Optional)
If you've already cloned the repository without the --recurse-submodules flag, or if the submodule references have been updated, you can initialize and update the submodules manually.

To initialize and update submodules, use the following commands:

bash
Copy code
cd johnlomat.github.io
git submodule update --init --recursive
This command initializes all the submodules defined in the repository.

To update existing submodules to the latest commit in their respective branches, use:

bash
Copy code
git submodule update --recursive --remote
Conclusion
By following these steps, you can clone a Git repository along with its submodules and ensure that both the main repository and its submodules are up-to-date on your local machine.

For more information on Git submodules, refer to the Git documentation.
