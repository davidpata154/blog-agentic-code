# Chore: Update "Nuevo Post" Button Text and Style

## Metadata
issue_number: `6`
adw_id: `0a566f9e`
issue_json: `{"number":6,"title":"cambiar el texto del boton \"+ Nuevo post\"","body":"cambiar el texto del boton \"+ Nuevo post\" por \"✅ New post\" y que el background-color sea gris"}`

## Chore Description
Change the text of the "+ Nuevo Post" button to "✅ New post" and update its background color from blue to gray.

This is a simple UI update to make the button text more internationalized (Spanish to English) and to adjust the visual styling with a gray background color instead of the current blue.

## Relevant Files
Use these files to resolve the chore:

### Existing Files
- **app/page.tsx** (lines 58-63) - Contains the button that needs to be updated with new text and styling. This is the main page component where the "Nuevo Post" button is rendered.

### Test Files
- **No existing test file for app/page.tsx** - The button functionality should be validated manually or with E2E tests if available. Unit tests would be beneficial but are not currently present.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Step 1: Update Button Text
- Open `app/page.tsx`
- Locate the button element on lines 58-63
- Change the button text from `+ Nuevo Post` to `✅ New post`

### Step 2: Update Button Styling
- In the same button element, update the CSS classes
- Change `bg-blue-600` to `bg-gray-600`
- Change `hover:bg-blue-700` to `hover:bg-gray-700`
- Keep all other classes unchanged (`px-6 py-3 text-white rounded-lg font-medium`)

### Step 3: Validate Changes with Build
- Run `npm run build` to ensure the application builds successfully without errors
- Verify that Next.js can compile the changes without TypeScript or build errors

### Step 4: Validate Changes with Tests
- Run `npm test` to ensure all existing tests still pass
- Verify that no regressions were introduced by the button text/style changes

### Step 5: Visual Verification
- Run `npm run dev` to start the development server
- Open http://localhost:3000 in a browser
- Verify the button displays "✅ New post" with gray background
- Test the button hover state shows darker gray
- Confirm the button still functions correctly (opens the new post form)

## Validation Commands
Execute every command to validate the chore is complete with zero regressions.

- `npm run build` - Build the Next.js application to validate no TypeScript or build errors
- `npm test` - Run all Jest tests to ensure no regressions in existing functionality
- `npm run lint` - Run ESLint to ensure code follows project standards

## Notes
- This is a purely cosmetic change that does not affect functionality
- The button maintains all its event handlers and behavior
- Only the visual appearance (text content and color) is being modified
- The gray color (`bg-gray-600` and `hover:bg-gray-700`) follows the existing Tailwind CSS color palette used throughout the project
- No TypeScript types need to be updated since this is a presentation-only change
- Consider creating E2E tests for the button interaction in future iterations if Playwright tests are expanded
