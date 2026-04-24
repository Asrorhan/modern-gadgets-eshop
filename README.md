Modern Gadget E-Shop (Vanilla JS)
I built this project to put my JavaScript skills to the test in a "real-world" scenario. I didn't follow any tutorials or use frameworks like React; instead, I designed the UI and architected the entire logic from scratch.

My goal was to solve the complex problems found in professional e-commerce sites—specifically high-performance state management and dynamic internationalization—using only pure JavaScript.

[View the Live Demo Here](https://asrorhan.github.io/modern-gadgets-eshop/)

What I’m Proud Of

1. Custom i18n Translation Engine
   I built a multilingual system from the ground up using the Fetch API and JSON files.

The Challenge: Ensuring that when a user switches languages, not only do the static headers change, but also the names and descriptions of products being pulled from a JavaScript array.

The Result: The system is completely scalable. To add a third language, you don’t need to touch a single line of JS code; you just drop in a new .json file.

2. Dynamic State & Cart Management
   The shopping cart logic (adding, removing, and adjusting quantities) happens in real-time without page refreshes.

Technical Approach: I utilized Event Delegation to keep the app performant and handle clicks on dynamically generated elements. I also integrated localStorage to ensure the user's cart and language preferences persist even after a page reload.

3. Hand-Crafted UI/UX
   I designed the interface with a focus on "Glassmorphism" and clean aesthetics. Every button, modal transition, and responsive grid was hand-coded to ensure a premium feel across all devices.

Tech Stack
HTML5 & CSS3: Custom properties (CSS variables), Flexbox, and CSS Grid.

Vanilla JavaScript (ES6+): Async/Await, Fetch API, DOM Manipulation, and LocalStorage.

Data Management: All content and translations are managed via JSON to keep the logic separated from the data.

Key Takeaways
Building this independently taught me how to:

Architect a project for scalability without the "crutch" of a framework.

Handle asynchronous data fetching and race conditions effectively.

Debug complex logic by understanding the data flow between JSON files and the UI.

Prioritize clean, readable code that a recruiter or another developer can easily follow.

Author
Asrorjon Kudratov

GitHub: @Asrorhan
