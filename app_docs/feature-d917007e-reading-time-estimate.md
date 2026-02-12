# Reading Time Estimate Feature

**ADW ID:** d917007e
**Date:** 2026-02-11
**Specification:** specs/issue-3-adw-d917007e-sdlc_planner-add-reading-time-estimate.md

## Overview

This feature adds an automatic reading time estimate to all blog posts. The system calculates the estimated reading time based on word count (assuming 200 words per minute) and displays it alongside the publication date in both the post list and individual post pages.

## What Was Built

- **Reading Time Calculator**: Core function that counts words and estimates reading time
- **Reading Time Formatter**: Spanish language formatter with proper singular/plural grammar
- **Type System Updates**: Added `readingTime` field to TypeScript interfaces
- **UI Integration**: Visual indicators in PostCard component and post detail pages
- **Comprehensive Testing**: Unit tests for calculation, formatting, and component rendering
- **E2E Test**: Playwright test to validate visual appearance

## Technical Implementation

### Files Modified

- `types/post.ts:35,48`: Added `readingTime: number` field to `BlogPost` and `PostPreview` interfaces
- `lib/posts.ts:10-50`: Implemented `calculateReadingTime()` and `formatReadingTime()` functions
- `lib/posts.ts:122,178,192`: Integrated reading time calculation into `getPostBySlug()` and `getAllPosts()`
- `components/PostCard.tsx:3,41-45`: Updated PostCard to display reading time with clock emoji and bullet separator
- `app/blog/[slug]/page.tsx`: Added reading time display to individual post header
- `.eslintrc.json`: Updated ESLint configuration to support new code patterns
- `package.json`: Added `reading-time` dependency

### Key Changes

1. **Word Count Algorithm**: The `calculateReadingTime()` function splits content by whitespace and counts words, using `Math.ceil(wordCount / 200)` to calculate minutes with a minimum of 1 minute

2. **Spanish Localization**: The `formatReadingTime()` function correctly handles Spanish grammar rules: "1 min de lectura" (singular) vs "5 mins de lectura" (plural)

3. **Build-Time Calculation**: Reading time is calculated during static site generation (SSG), not at runtime, ensuring zero performance impact for users

4. **Visual Indicators**: Uses clock emoji (⏱️) and bullet separator (•) for clear visual distinction between date and reading time

5. **Type Safety**: Full TypeScript integration ensures reading time is always present and correctly typed throughout the application

## How to Use

### For Readers

Reading time appears automatically on every post:

**On the home page:**
```
📅 11 Feb 2024 • ⏱️ 5 mins de lectura
```

**On individual post pages:**
The same format appears in the post header, helping readers decide if they have time to read the full article.

### For Content Authors

No action required! Reading time is calculated automatically from your Markdown content when you:

1. Create a new post in `content/posts/`
2. Run `npm run build` to generate static pages
3. The system counts words and calculates reading time automatically

### For Developers

To use the reading time functions in your code:

```typescript
import { calculateReadingTime, formatReadingTime } from '@/lib/posts'

// Calculate reading time from markdown content
const minutes = calculateReadingTime(markdownContent)  // Returns: 5

// Format for display
const formatted = formatReadingTime(minutes)  // Returns: "5 mins de lectura"
```

## Configuration

### Reading Speed

The default reading speed is **200 words per minute**, which is standard for technical content. To adjust:

```typescript
// In lib/posts.ts, line 31
const minutes = Math.ceil(wordCount / 200)  // Change 200 to your desired WPM
```

### Minimum Reading Time

The minimum reading time is **1 minute**. To adjust:

```typescript
// In lib/posts.ts, line 34
return Math.max(1, minutes)  // Change 1 to your desired minimum
```

### Language and Format

To change the language or format:

```typescript
// In lib/posts.ts, line 49-50
export function formatReadingTime(minutes: number): string {
  return minutes === 1 ? '1 min de lectura' : `${minutes} mins de lectura`
}
```

## Testing

### Run Unit Tests

```bash
# Test reading time calculation and formatting
npm test -- __tests__/lib/reading-time.test.ts

# Test PostCard rendering
npm test -- __tests__/components/PostCard-reading-time.test.tsx

# Run all tests
npm test
```

### Run E2E Test

```bash
# Visual validation with Playwright
# Follow instructions in .claude/commands/e2e/test_reading_time.md
```

### Manual Testing

```bash
# Start development server
npm run dev

# Visit http://localhost:3000 to see post list with reading times
# Click any post to see reading time in header
```

### Test Coverage

- ✅ Word count calculation (0, 100, 200, 201, 500, 1000 words)
- ✅ Minimum 1 minute for empty/short content
- ✅ Correct rounding with `Math.ceil()`
- ✅ Singular format ("1 min de lectura")
- ✅ Plural format ("X mins de lectura")
- ✅ Clock emoji rendering
- ✅ Bullet separator rendering
- ✅ PostCard component integration
- ✅ Individual post page integration

## Notes

### Design Decisions

- **200 WPM**: Standard average reading speed for technical content (research-backed)
- **Round Up**: Uses `Math.ceil()` to overestimate rather than underestimate time
- **1 Minute Minimum**: Avoids confusing "0 mins de lectura" for very short posts
- **Emoji Over Icon**: Uses ⏱️ emoji instead of icon component to avoid dependencies
- **Build-Time**: Calculated during SSG for optimal performance (no runtime computation)
- **Markdown Counting**: Counts words from raw Markdown before HTML conversion for accuracy

### Edge Cases Handled

- Empty content → shows "1 min de lectura"
- Very short posts (< 200 words) → shows "1 min de lectura"
- Exactly 200 words → shows "1 min de lectura"
- 201 words → shows "2 mins de lectura"
- Very long posts (5000+ words) → calculates correctly (25+ mins)
- Code blocks → words in code blocks count toward reading time
- Whitespace-only content → handled gracefully (1 min)

### Future Enhancements

- Optional reading speed customization per user (localStorage)
- Different reading speeds for code-heavy vs text-heavy posts
- Reading progress indicator on post pages
- Estimated time remaining as user scrolls

### Performance Impact

Zero runtime performance impact since:
- Reading time is calculated at build time (SSG)
- Stored as simple number in post metadata
- No client-side JavaScript required for calculation
- Only minimal string formatting on server-side render
