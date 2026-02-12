# E2E Test: Textarea Character Limit with Visual Counter

Test that the textarea character limit functionality works correctly with real-time visual feedback and proper enforcement of the 250 character limit.

## User Story

As a blog contributor
I want to see a character counter on the content textarea with a 250 character limit
So that I know how many characters I can write and avoid exceeding the limit

## Test Steps

1. Navigate to the `Application URL` (home page)
2. Take a screenshot of the home page
3. Click on the "+ Nuevo Post" button to open the post creation form
4. Take a screenshot of the empty form
5. **Verify** character counter displays "0/250" below the content textarea
6. **Verify** counter text color is gray (default state)
7. Type 50 characters into the content textarea
8. **Verify** character counter updates to "50/250"
9. **Verify** counter text color remains gray
10. Type additional characters to reach 150 total characters
11. **Verify** character counter displays "150/250"
12. **Verify** counter text color remains gray
13. Take a screenshot showing the counter at 150 characters
14. Type additional characters to reach 230 total characters
15. **Verify** character counter displays "230/250"
16. **Verify** counter text color changes to yellow/warning (text-yellow-600)
17. Take a screenshot showing the warning state at 230 characters
18. Type additional characters to reach 235 total characters
19. **Verify** character counter displays "235/250"
20. **Verify** counter text color remains yellow/warning
21. Type additional characters to reach exactly 250 characters
22. **Verify** character counter displays "250/250"
23. **Verify** counter text color changes to red (text-red-600)
24. **Verify** counter displays with font-semibold styling at the limit
25. Take a screenshot showing the limit reached state at 250 characters
26. Attempt to type more characters beyond 250
27. **Verify** no additional characters can be entered (maxLength enforcement)
28. **Verify** counter still shows "250/250" in red
29. Delete 20 characters (back to 230 characters)
30. **Verify** character counter updates to "230/250"
31. **Verify** counter text color changes back to yellow
32. Fill in the title field with "Test Post Title"
33. **Verify** form can be submitted with content at character limit
34. Click the "Publicar" button to submit the post
35. **Verify** the form clears after submission
36. **Verify** character counter resets to "0/250" with gray color
37. Take a screenshot of the reset form
38. Navigate back to the home page
39. **Verify** the newly created post appears in the list
40. Click on the newly created post to edit it
41. **Verify** character counter displays the correct count for the existing content
42. Take a final screenshot of the edit mode with character counter

## Success Criteria
- Character counter displays "0/250" on initial form render
- Counter updates in real-time as user types
- Counter shows correct count at all tested values (50, 150, 230, 235, 250)
- Counter color is gray when count < 230
- Counter color is yellow when count >= 230 and < 250
- Counter color is red when count = 250
- Counter text is right-aligned below the textarea
- MaxLength attribute prevents typing beyond 250 characters
- Counter updates correctly when deleting characters
- Counter resets to "0/250" after form submission
- Counter displays correct count when editing existing posts
- Form submission works correctly with content at or below the limit
- At least 7 screenshots are captured showing different states
