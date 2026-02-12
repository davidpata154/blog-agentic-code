# Textarea Character Limit with Visual Counter

**ADW ID:** e6b95432
**Date:** 2026-02-11
**Specification:** specs/issue-5-adw-e6b95432-sdlc_planner-textarea-character-limit.md

## Overview

This feature adds a 250-character limit to the content textarea in the PostForm component with a real-time visual counter. The counter displays the current character count versus the maximum (e.g., "1/250", "150/250") and provides dynamic color feedback to help users stay within the allowed limit.

## What Was Built

- **Character limit enforcement**: Textarea now has a hard limit of 250 characters using the HTML `maxLength` attribute
- **Visual counter display**: Real-time character counter showing "X/250" format beneath the textarea
- **Dynamic color feedback**: Counter color changes based on character count:
  - Gray (default) when count < 230
  - Yellow/orange (warning) when count >= 230 and < 250
  - Red when count = 250
- **Accessibility features**: ARIA attributes for screen readers and keyboard navigation
- **Comprehensive test coverage**: Unit tests covering all functionality and edge cases
- **E2E test specification**: Browser-based validation test for the feature

## Technical Implementation

### Files Modified

- `components/PostForm.tsx`: Added character limit constant (MAX_CHARACTERS = 250), maxLength attribute on textarea, character counter display with dynamic styling, and accessibility attributes (aria-describedby, aria-live)

- `__tests__/components/PostForm.test.tsx`: New test file with 268 lines covering character limit functionality, accessibility, form integration, edit mode, edge cases, and cancel functionality

- `.claude/commands/e2e/test_textarea_character_limit.md`: New E2E test specification for browser-based validation

### Key Changes

1. **Character Limit Enforcement**: Added `maxLength={MAX_CHARACTERS}` attribute to the textarea element, preventing users from typing more than 250 characters at the browser level

2. **Real-time Counter Logic**: The counter uses `content.length` to track character count and updates automatically as the user types through React's state management

3. **Dynamic Styling**: Implemented conditional CSS classes using Tailwind that change the counter appearance based on character count thresholds:
   - `text-gray-600` (< 230 chars)
   - `text-yellow-600 font-medium` (>= 230 and < 250 chars)
   - `text-red-600 font-semibold` (= 250 chars)

4. **Accessibility Integration**: Added `aria-describedby="character-counter"` to link the textarea with the counter, and `aria-live="polite"` on the counter for screen reader announcements

5. **Seamless Form Integration**: The character limit works correctly with existing functionality including creating new posts, editing existing posts, form validation, and submission

## How to Use

### Creating a New Post

1. Click the "+ Nuevo Post" button on the home page
2. Enter a title in the "Título" field
3. Start typing in the "Contenido" textarea
4. Observe the character counter below the textarea showing your current count (e.g., "45/250")
5. Watch the counter color change as you approach the limit:
   - Gray text when you have plenty of characters remaining
   - Yellow text when approaching 230 characters
   - Red text when you reach exactly 250 characters
6. The browser will prevent you from typing beyond 250 characters
7. Click "Publicar" to submit your post

### Editing an Existing Post

1. Click the "Editar" button on any existing post
2. The character counter will display the current character count of the existing content
3. Make your edits while monitoring the character counter
4. The counter updates in real-time as you modify the content
5. Click "Actualizar" to save your changes

### Character Counter Behavior

- **Initial state**: Shows "0/250" for new posts
- **During typing**: Updates immediately to show current count
- **At warning threshold (230 chars)**: Text turns yellow/orange
- **At limit (250 chars)**: Text turns red and bold
- **After submission**: Resets to "0/250" for the next post

## Configuration

No additional configuration is required. The character limit is hardcoded to 250 characters in the `PostForm.tsx` component:

```tsx
const MAX_CHARACTERS = 250
```

To change the limit in the future, modify this constant and update the corresponding tests in `__tests__/components/PostForm.test.tsx`.

## Testing

### Unit Tests

Run the comprehensive test suite:

```bash
npm test
```

The tests cover:
- Character counter display and updates
- MaxLength attribute enforcement
- Color threshold changes (230, 250)
- Form integration and validation
- Edit mode functionality
- Accessibility features (ARIA attributes)
- Edge cases (exactly 250 chars, spaces, rapid typing)

### E2E Testing

Execute the browser-based validation:

```bash
# Read the E2E test runner documentation
# Then execute the character limit test
```

The E2E test specification is located at `.claude/commands/e2e/test_textarea_character_limit.md`

### Manual Testing

1. Start the development server: `npm run dev`
2. Navigate to http://localhost:3000
3. Click "+ Nuevo Post"
4. Test the following scenarios:
   - Type text and verify counter updates
   - Type exactly 230 characters and verify yellow color
   - Type exactly 250 characters and verify red color and input prevention
   - Try to paste text longer than 250 characters (should truncate)
   - Submit a post and verify counter resets to 0/250
   - Edit an existing post and verify counter shows correct initial count

## Notes

### Implementation Details

- The character limit is enforced at the HTML level using the native `maxLength` attribute, providing a reliable browser-level constraint
- React state management automatically handles counter updates through the `content` state variable
- Tailwind CSS classes provide the color transitions without additional CSS
- The counter is positioned using Tailwind utilities (`text-right`, `mt-1`) for consistent alignment
- Accessibility is built-in with ARIA attributes for screen reader support

### Accessibility Features

- `aria-describedby` links the textarea to the character counter for screen readers
- `aria-live="polite"` announces counter updates to screen readers without interrupting
- Color is not the only indicator - the text content itself ("230/250", "250/250") provides information
- Keyboard navigation works seamlessly with existing form controls

### Edge Cases Handled

- **Exactly 250 characters**: Counter shows red, prevents further input
- **Copy/paste beyond limit**: Browser automatically truncates to 250 characters
- **Multiple spaces**: All whitespace counts toward the limit
- **Special characters**: Multi-byte characters (emoji, accents) count correctly
- **Form reset**: Counter resets to 0/250 after successful submission
- **Edit mode**: Counter initializes with correct count for existing content

### Future Enhancements

If needed, consider these potential improvements:
- Add a warning message near 230 characters (e.g., "Approaching character limit")
- Make the character limit configurable via props for reusability
- Add smooth color transition animations
- Create a visual progress bar in addition to the text counter
- Extract the counter into a reusable component for other forms
