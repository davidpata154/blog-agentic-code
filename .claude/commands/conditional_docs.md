# Conditional Documentation Guide

This prompt helps you determine what documentation you should read based on the specific changes you need to make in the codebase. Review the conditions below and read the relevant documentation before proceeding with your task.

## Instructions
- Review the task you've been asked to perform
- Check each documentation path in the Conditional Documentation section
- For each path, evaluate if any of the listed conditions apply to your task
  - IMPORTANT: Only read the documentation if any one of the conditions match your task
- IMPORTANT: You don't want to excessively read documentation. Only read the documentation if it's relevant to your task.

## Conditional Documentation

- README.md
  - Conditions:
    - When operating on anything under app/server
    - When operating on anything under app/client
    - When first understanding the project structure
    - When you want to learn the commands to start or stop the server or client

- app/client/src/style.css
  - Conditions:
    - When you need to make changes to the client's style

- .claude/commands/classify_adw.md
  - Conditions:
    - When adding or removing new `adws/adw_*.py` files

- adws/README.md
  - Conditions:
    - When you're operating in the `adws/` directory

- app_docs/feature-490eb6b5-one-click-table-exports.md
  - Conditions:
    - When working with CSV export functionality
    - When implementing table or query result export features
    - When troubleshooting download button functionality
    - When working with pandas-based data export utilities

- app_docs/feature-4c768184-model-upgrades.md
  - Conditions:
    - When working with LLM model configurations
    - When updating OpenAI or Anthropic model versions
    - When troubleshooting SQL query generation accuracy
    - When working with the llm_processor module

- app_docs/feature-f055c4f8-off-white-background.md
  - Conditions:
    - When working with application background styling
    - When modifying CSS color variables or themes
    - When implementing visual design changes to the client application

- app_docs/feature-6445fc8f-light-sky-blue-background.md
  - Conditions:
    - When working with light sky blue background styling
    - When implementing background color changes to light blue variants
    - When troubleshooting visual hierarchy with light blue backgrounds

- app_docs/feature-cc73faf1-upload-button-text.md
  - Conditions:
    - When working with upload button text or labeling
    - When implementing UI text changes for data upload functionality
    - When troubleshooting upload button display or terminology

- app_docs/feature-d31168e4-light-green-background.md
  - Conditions:
    - When working with light green background styling
    - When implementing background color changes to green variants
    - When referencing the current background color implementation

- app_docs/feature-174525b3-post-search.md
  - Conditions:
    - When working with post search functionality
    - When implementing search or filtering features for blog posts
    - When working with the SearchBar component or usePostSearch hook
    - When troubleshooting real-time filtering or search UI
    - When adding similar search features to other content types

- app_docs/feature-d917007e-reading-time-estimate.md
  - Conditions:
    - When working with reading time estimation or calculation
    - When implementing word count or content analysis features
    - When modifying post metadata or type definitions (BlogPost, PostPreview)
    - When working with the PostCard component or post display formatting
    - When troubleshooting reading time display or formatting
    - When adding similar time estimate features to other content types

- app_docs/feature-e6b95432-textarea-character-limit.md
  - Conditions:
    - When working with character limits on textareas or input fields
    - When implementing real-time character counters or validation
    - When working with the PostForm component
    - When adding visual feedback for input length constraints
    - When troubleshooting form validation or character counting
    - When adding similar character limit features to other form fields

- app_docs/feature-0a566f9e-new-post-button-update.md
  - Conditions:
    - When working with the new post button on the homepage
    - When implementing button text or styling changes
    - When updating UI text internationalization (Spanish to English)
    - When modifying button color schemes or visual appearance
    - When troubleshooting homepage button functionality