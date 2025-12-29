---
"@mogeko/utils": patch
---

Prevent prototype pollution in `assocPath` function

Potential fix for https://github.com/mogeko/mogeko/security/code-scanning/3

To fix the issue, we need to prevent the use of dangerous property names such as __proto__, constructor, and prototype as keys in the assocPath function. This can be achieved by adding a validation step to check if idx (the computed property name) matches any of these reserved names. If it does, we can throw an error or handle it appropriately to prevent prototype pollution.

The fix involves:

1. Adding a validation step for idx to ensure it does not match dangerous property names.
2. Updating the assocPath function to include this validation before proceeding with the assignment.
