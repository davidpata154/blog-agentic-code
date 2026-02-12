import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Navigate to the homepage
  await page.goto('http://localhost:9205', { waitUntil: 'networkidle' });
  
  // Take screenshot of the page showing the button
  await page.screenshot({ 
    path: '/Users/david.zuluaga/Documents/blog-agentic-code/agents/0a566f9e/reviewer/review_img/01_new_post_button_initial.png',
    fullPage: false
  });

  // Hover over the button to capture hover state
  await page.hover('button:has-text("New post")');
  await page.waitForTimeout(500);
  
  await page.screenshot({ 
    path: '/Users/david.zuluaga/Documents/blog-agentic-code/agents/0a566f9e/reviewer/review_img/02_new_post_button_hover.png',
    fullPage: false
  });

  // Click the button to verify it works
  await page.click('button:has-text("New post")');
  await page.waitForTimeout(1000);
  
  await page.screenshot({ 
    path: '/Users/david.zuluaga/Documents/blog-agentic-code/agents/0a566f9e/reviewer/review_img/03_new_post_form_opened.png',
    fullPage: false
  });

  await browser.close();
  console.log('Screenshots captured successfully');
})();
