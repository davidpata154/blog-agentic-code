# E2E Test: Reading Time Estimate

Test that reading time is displayed correctly on both post list and individual post pages.

## User Story

As a blog reader
I want to see how long it will take me to read a post
So that I can decide if I have time to read it now or save it for later

## Test Steps

1. Navigate to the `Application URL` (home page)
2. Take a screenshot of the home page with post list
3. **Verify** the page contains post cards
4. **Verify** each post card displays reading time with format "X min de lectura" or "X mins de lectura"
5. **Verify** clock emoji (⏱️) is present before reading time text
6. **Verify** bullet separator (•) is present between date and reading time
7. Click on the first post to view individual post page
8. Take a screenshot of the individual post page
9. **Verify** the post header displays reading time with the same format
10. **Verify** clock emoji (⏱️) is present in the post header
11. **Verify** bullet separator (•) is present between date and reading time in post header
12. Take a final screenshot showing the reading time details

## Success Criteria
- Reading time is visible on post cards in the home page
- Reading time is visible in individual post pages
- Clock emoji (⏱️) is displayed before reading time
- Bullet separator (•) is between date and reading time
- Format is correct: singular "1 min de lectura" or plural "X mins de lectura"
- 3 screenshots are taken
