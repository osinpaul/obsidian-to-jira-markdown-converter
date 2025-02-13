# Obsidian to Jira Markdown Converter

This is an Angular-based web application that allows users to convert Markdown from **Obsidian** format to **Jira Markdown**. The converter ensures that tables, code blocks, lists, and inline formatting are correctly transformed without breaking Jira's formatting rules.

## 🚀 Features
- Converts **headings**, **bold**, **italic**, **code blocks**, **inline code**, and **links**.
- Properly formats **Jira tables**, removing unnecessary separators (`---`).
- Handles **bullet lists (`-`)** and **numbered lists (`1.`)**.
- Fixes **extra line breaks**, ensuring correct formatting.
- Ignores `!` at the beginning of a new line to prevent table breaking.
- Maintains **code blocks** using `{code}` instead of triple backticks (` ``` `).
- Converts **inline code** (` `code` `) into `{{code}}`.

## 📦 Installation
To run the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/obsidian-to-jira-converter.git
   cd obsidian-to-jira-converter

2. or look at the demo:
https://osinpaul.github.io/obsidian-to-jira-markdown-converter
