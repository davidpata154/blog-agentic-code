# Feature: Textarea Character Limit with Visual Counter

## Metadata
issue_number: `5`
adw_id: `e6b95432`
issue_json: `{"number":5,"title":"agregar dentro del text area un limite de caracteres","body":"Agregar dentro del text area un limite de 250 caracteres e indicarlo graficamente algo asi como 1/250 ...5/250 "}`

## Feature Description
Add a character limit of 250 characters to the content textarea in the PostForm component, with a real-time visual counter that displays the current character count and maximum limit (e.g., "1/250", "150/250"). The counter should provide visual feedback to users as they type, helping them stay within the allowed character limit.

## User Story
As a blog user
I want to see a character counter on the content textarea with a 250 character limit
So that I know how many characters I can write and avoid exceeding the limit

## Problem Statement
Currently, the PostForm component's content textarea has no character limit, allowing users to enter unlimited text. This can lead to:
- Excessively long posts that may not be ideal for the application's use case
- No guidance for users about how much content is appropriate
- Potential UI/UX issues with very long content strings
- Lack of visual feedback during content entry

## Solution Statement
Implement a 250-character limit on the content textarea with a real-time visual counter that:
- Displays the current character count vs. maximum (e.g., "1/250", "150/250")
- Updates in real-time as the user types
- Prevents users from entering more than 250 characters
- Provides clear visual feedback when approaching or at the limit
- Maintains the existing form validation and submission logic

## Relevant Files
Use these files to implement the feature:

- `components/PostForm.tsx` - The form component containing the textarea that needs the character limit and counter. This is where we'll add the character counting logic, maxLength attribute, and visual counter display.

- `types/post.ts` - Type definitions for Post interface. We may need to reference this to ensure our validation aligns with the Post type structure.

- `app/page.tsx` - The main page component that uses PostForm. We'll need to verify the feature works correctly in the context where it's used.

### New Files

- `__tests__/components/PostForm.test.tsx` - New test file to verify the character limit functionality, counter display, and user interactions.

- `.claude/commands/e2e/test_textarea_character_limit.md` - New E2E test specification to validate the character limit feature end-to-end in the browser.

## Implementation Plan

### Phase 1: Foundation
First, we'll update the PostForm component to add state management for character count tracking. We'll implement the core logic for counting characters and enforcing the 250 character limit using the maxLength HTML attribute. This phase establishes the technical foundation without visual feedback.

### Phase 2: Core Implementation
Next, we'll implement the visual counter display beneath the textarea. The counter will show the format "X/250" where X is the current character count. We'll add dynamic styling to provide visual feedback - showing gray text normally, yellow/warning color when approaching the limit (e.g., >230 characters), and red when at or near the limit.

### Phase 3: Integration
Finally, we'll ensure the character limit works seamlessly with existing functionality including:
- Creating new posts
- Editing existing posts (preserving content within 250 chars)
- Form validation and submission
- Proper state management when switching between create/edit modes
- Testing across all user flows

## Step by Step Tasks

### Task 1: Update PostForm Component with Character Limit Logic
- Add a constant for MAX_CHARACTERS = 250 at the top of the PostForm component
- Add maxLength={250} attribute to the textarea element to enforce the limit at the browser level
- Calculate the current character count using content.length
- Ensure the character count updates in real-time as the user types

### Task 2: Implement Visual Counter Display
- Add a character counter display beneath the textarea showing "X/250" format
- Position the counter appropriately (e.g., below the textarea, right-aligned)
- Style the counter with appropriate text size and color
- Implement dynamic color coding:
  - Gray (default) when character count < 230
  - Yellow/orange (warning) when character count >= 230 and < 250
  - Red when character count = 250
- Ensure the counter is accessible with proper ARIA labels

### Task 3: Create Unit Tests for PostForm
- Create `__tests__/components/PostForm.test.tsx`
- Test that textarea has maxLength attribute set to 250
- Test that character counter displays correctly on initial render (0/250)
- Test that character counter updates as user types
- Test that character counter shows correct count for different lengths
- Test that counter changes color appropriately at thresholds (230, 250)
- Test that form cannot submit empty content (existing validation)
- Test that form works correctly with editing existing posts
- Test that maxLength prevents typing beyond 250 characters

### Task 4: Create E2E Test Specification
- Create `.claude/commands/e2e/test_textarea_character_limit.md`
- Define user story for the E2E test
- Specify test steps:
  1. Navigate to the application
  2. Click "+ Nuevo Post" button
  3. Verify character counter shows "0/250"
  4. Type 50 characters and verify counter shows "50/250"
  5. Type up to 230 characters and verify counter color is default
  6. Type to 235 characters and verify counter shows warning color
  7. Type to exactly 250 characters and verify counter shows red and prevents further input
  8. Delete some characters and verify counter updates correctly
  9. Submit the post successfully
  10. Edit the post and verify counter loads with correct count
- Define success criteria for validation
- Specify screenshot capture points

### Task 5: Update Existing Tests if Needed
- Review `__tests__/components/PostCard.test.tsx` to ensure no conflicts
- Review `__tests__/components/SearchBar.test.tsx` to ensure no conflicts
- Check that any snapshot tests still pass with the updated PostForm

### Task 6: Execute Validation Commands
- Run all unit tests with `npm test` to ensure no regressions
- Run TypeScript compiler check with `npx tsc --noEmit`
- Run build with `npm run build`
- Read `.claude/commands/test_e2e.md` then execute the new E2E test `.claude/commands/e2e/test_textarea_character_limit.md`
- Manually test the feature in the browser to verify:
  - Character counter displays correctly
  - Counter updates in real-time
  - Color changes work at the correct thresholds
  - MaxLength prevents input beyond 250 characters
  - Form submission works correctly
  - Edit mode works correctly with existing content

## Testing Strategy

### Unit Tests
- **Character Counter Display**: Verify counter renders with correct initial value (0/250)
- **Real-time Updates**: Verify counter updates as user types in textarea
- **MaxLength Enforcement**: Verify textarea has maxLength={250} attribute
- **Color Thresholds**: Verify counter changes color at 230 and 250 characters
- **Form Integration**: Verify form validation and submission still work correctly
- **Edit Mode**: Verify counter displays correct count when editing existing posts
- **Empty State**: Verify counter shows 0/250 on form reset
- **Accessibility**: Verify counter has appropriate ARIA labels

### Edge Cases
- **Exactly 250 characters**: Counter should show "250/250" in red and prevent further input
- **Copy/paste content > 250 chars**: Browser should truncate to 250 due to maxLength
- **Editing post with content**: Counter should initialize with correct character count
- **Rapid typing**: Counter should update smoothly without lag
- **Special characters**: Multi-byte characters (emoji, accented) should count correctly
- **Form reset**: Counter should reset to 0/250 after successful submission
- **Cancel editing**: Counter should reset when canceling edit mode
- **Multiple spaces**: All characters including spaces should count toward the limit

## Acceptance Criteria
1. Content textarea has a maximum length of 250 characters enforced by maxLength attribute
2. Character counter displays in format "X/250" where X is the current character count
3. Counter updates in real-time as user types
4. Counter displays in default color (gray) when count < 230
5. Counter displays in warning color (yellow/orange) when count >= 230 and < 250
6. Counter displays in red when count = 250
7. Users cannot type more than 250 characters in the textarea
8. Counter works correctly when creating new posts (starts at 0/250)
9. Counter works correctly when editing existing posts (shows current count)
10. All existing form functionality (validation, submission, cancel) continues to work
11. Counter is positioned clearly beneath the textarea
12. Counter has proper accessibility attributes
13. All unit tests pass with 100% coverage of new functionality
14. E2E test validates the feature works correctly in the browser
15. No visual regressions in the PostForm or related components

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

Read `.claude/commands/test_e2e.md`, then read and execute the new E2E `.claude/commands/e2e/test_textarea_character_limit.md` test file to validate this functionality works.

- `npm test` - Run all unit tests to validate the feature works with zero regressions
- `npx tsc --noEmit` - Run TypeScript compiler to validate no type errors
- `npm run build` - Run Next.js build to validate the feature works with zero regressions

## Notes

### Implementation Details
- Use React's built-in state management (useState) to track character count
- The maxLength attribute provides native browser-level enforcement
- Consider using Tailwind CSS classes for color transitions (text-gray-600, text-yellow-600, text-red-600)
- Position counter using flexbox or grid for consistent alignment
- Use aria-live="polite" on the counter for screen reader announcements

### Future Considerations
- Could add a warning message when approaching the limit (e.g., "You're approaching the character limit")
- Could make the character limit configurable via props if needed for other forms
- Could add animations for color transitions to make changes more noticeable
- Could add a progress bar visual instead of just text counter
- Could extract the character counter into a reusable component if similar functionality is needed elsewhere

### Design Consistency
- Follow existing PostForm styling patterns (border colors, focus states, spacing)
- Ensure the counter doesn't interfere with the existing responsive layout
- Match the font size and weight with other form helper text
- Maintain consistent spacing with the cancel/submit buttons below

### Accessibility
- Add aria-describedby linking the textarea to the counter
- Use aria-live for dynamic counter updates
- Ensure color is not the only indicator (also rely on text changes)
- Test with keyboard navigation and screen readers
