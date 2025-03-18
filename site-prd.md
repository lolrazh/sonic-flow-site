# Sonic Flow – Landing Page PRD

## 1. Purpose
The Sonic Flow landing page serves as the **public-facing entry point** for potential users. It should communicate:
1. **What Sonic Flow is** (an AI-powered dictation tool).
2. **Who it’s for** (anyone needing frictionless dictation across apps).
3. **Why it’s beneficial** (fast, unobtrusive, integrates with everything).
4. **How to sign up** for the single, no-nonsense subscription plan.

## 2. Target Audience
- **Productivity enthusiasts** (writers, coders, managers) looking to save time typing.
- **Professionals** who juggle multiple apps and want quick speech-to-text insertion.
- **General users** curious about AI-powered dictation tools for everyday tasks.

## 3. Page Layout & Key Sections

### 3.1 Hero Section
1. **Left-Side Text Block**  
   - **Headline (H1):** Concise and punchy. Example: *“Dictate with Speed. Type without Typing.”*
   - **Sub-Headline:** Brief explanation. E.g., “Sonic Flow is an AI-powered dictation tool that seamlessly transcribes your speech into any text field. Save time, boost productivity, and say goodbye to manual typing.”
   - **Primary Call-to-Action (CTA) Button:** “Start 7-Day Free Trial.”  
     - Clicking this button takes the user to a **Sign-Up** or **Pricing** section.

2. **Right-Side Visual**  
   - An **illustration or animated mockup** of the Sonic Flow “pill” UI in action.  
   - Could show the pill expanding, detecting speech, and transcribing text into an app.  
   - Keep it visually **clean**: a short looping animation or high-quality static graphic that suggests minimalism and speed.

3. **Secondary CTA or Visual Cue**  
   - Possibly a smaller “Watch Demo” link or a snippet of how the product works in a short video/GIF.

### 3.2 “Who It’s For” (User Personas / Use Cases)
- A **simple horizontal section** beneath the hero:
  - 2–3 **key personas** (e.g., “Writers,” “Developers,” “Managers on the Go”).
  - Each persona accompanied by a short sentence about how Sonic Flow helps them save time or reduce friction.
  - Keep it **light**—the main objective is to show that it’s broadly applicable.

### 3.3 Compatible Apps Mosaic
- A **scrolling or tiled mosaic** of widely recognized app logos (e.g., Google Docs, Microsoft Word, Slack, Notion, Trello, GitHub, etc.).
- A bold line of text: **“Works Everywhere You Type”** or **“Compatible With All Your Favorite Apps”**.
- This visually confirms that Sonic Flow is not limited to a single platform.

### 3.4 “How It Works” Section (Optional but Recommended)
- **Very short 3-step process**:
  1. **Install & Pin** the Sonic Flow pill on your desktop.
  2. **Press the Hotkey & Dictate**.
  3. **Instantly Inserted** into the cursor’s location.
- Include **simple icons** or minimal diagrams next to each step. Keep the text scannable and easy to read.

### 3.5 Pricing Section
- **One Plan**:
  1. **$5/month** for **unlimited usage**.
  2. **7-Day Free Trial** included (no risk sign-up).
- **Payment & Billing**:
  - Credit card or relevant payment methods. 
  - Simplify the copy: “One low monthly price. Unlimited transcription. Cancel anytime.”
- A large **CTA** button: “Start Your Free Trial” leading to sign-up flow.

### 3.6 Benefits / “Why Sonic Flow?” Highlights
- Could be a **short bullet list** near or below Pricing:
  - *Unobtrusive UI* – A tiny pill that hides until you need it.  
  - *Accurate Transcriptions* – Powered by advanced speech-to-text (Groq whisper-turbo or equivalent).  
  - *Use It Everywhere* – Any desktop app, any text field.  
  - *Simple Billing* – Single plan, no hidden fees.  
  - *Focus on Privacy* – Data is not retained or sold (mention if relevant).
- This can double as a place to reassure users and differentiate from competitor products.

### 3.7 Footer
- **Lightweight** but with essential legal and contact links:
  - Terms & Conditions
  - Privacy Policy
  - Cookie Policy
  - Possibly a “Contact” or “Support” link
  - No major social icons if not needed—this is intentionally minimal.

---

## 4. Visual & UX Considerations

1. **Minimalism & White Space:** The entire brand vibe is about unobtrusiveness, so keep the landing page airy, with large typography, and straightforward CTAs.
2. **Consistent Branding:** Simple color scheme (possibly whites, grays, or a subtle accent color that complements the “pill” icon).
3. **Responsive Design:** Must look good on all device sizes (desktop, tablet, mobile). The hero section’s left-text / right-visual layout should gracefully stack on mobile.

---

## 5. Functional Requirements

1. **Single-Page Layout**: The user should be able to gather all critical info and sign up without excessive scrolling or multi-page transitions.
2. **Sign-Up Integration**: The “Start Free Trial” button either opens a registration modal or takes the user to a separate sign-up page.  
3. **Pricing Validation**: The $5/month plan is the only plan. The 7-day trial must be clearly indicated.
4. **Legal Compliance**: 
   - Footer must link to Terms, Privacy, and Cookie Policy pages.
   - If cookies are used, ensure a simple cookie notice (banner or pop-up) if relevant for compliance.

---

## 6. Content & Copy Requirements

1. **Hero Text**:
   - Must convey the main value proposition: “Faster than typing. Powered by AI. Works in every app.”
   - Headline should be short and direct (max ~8-10 words).
2. **Sub-Headline**:
   - High-level explanation: “A small dictation pill that’s always at your fingertips.”
3. **CTA Buttons**:
   - **Primary CTA**: “Start Your 7-Day Free Trial”
   - **Secondary CTA** (if used): “Watch Demo” or “Learn More”
4. **Use Cases**:
   - Possibly emphasize time-saving benefits or how it reduces RSI, etc.
5. **Legal Copy**:
   - Terms & Conditions, Privacy, and Cookie links must be distinct enough to comply with typical guidelines.

---

## 7. User Journey on Landing Page

1. **Arrive on Page**: Hero section captures attention with a short, bold statement and a visually appealing representation of the “pill” UI.
2. **Scroll Past Hero**: Sees “Who It’s For” + app compatibility mosaic (confidence-building).
3. **Pricing**: Clearly see $5/month plan with 7-day free trial.
4. **Call to Action**: Encouraged to sign up. 
5. **Footer**: Access legal info, potentially contact support if needed.

---

## 8. Technical & Implementation Details

1. **Tech Stack**: 
   - Likely a **React** or **Next.js** front-end with minimal SSR or static site generation for speed.
   - Styled with **Tailwind** or another utility-based framework to maintain a consistent, minimal design.
2. **Responsive**: 
   - Utilize responsive units and grid layouts for the hero and mosaic sections.
3. **Animation**: 
   - Possibly a short Lottie or MP4 loop for the pill demonstration on the hero’s right side.
4. **Analytics**:
   - Basic site analytics to track user visits, CTA clicks, bounce rates, etc. (e.g., Google Analytics or similar).
5. **Form Handling**:
   - The sign-up CTA should direct to a sign-up form (hosted or integrated with a payment gateway like Stripe).
   - The site must handle discount codes if any exist in the future (even if not in the immediate plan, keep it flexible).

---

## 9. Timeline

1. **Design & Wireframe (1 Week)**  
   - Create high-fidelity wireframes of the hero, pricing, mosaic, etc.
   - Decide on final text, CTA wording, and any animations.
2. **Implementation & Review (2 Weeks)**  
   - Build the React/Next.js layout, integrate the sign-up link.
   - Ensure responsive design, add brand styling, finalize copy and images.
3. **Legal & Content Finalization (Ongoing in Parallel)**  
   - Prepare T&C, Privacy Policy, Cookie Policy pages.
4. **QA & Launch (1 Week)**  
   - Test across devices, ensure sign-up flows properly to the subscription or trial creation.
   - Validate links, legal compliance, cookie banner if needed.

---

## 10. Summary & Next Steps

- **Core Value**: A single-page landing site that quickly communicates Sonic Flow’s dictation solution, invites users to sign up for a single-tier subscription, and instills trust through minimal yet clear design elements.
- **No Excess**: Maintain brevity—only a hero, a highlights section, a single pricing plan, minimal usage instructions, and a legal-compliant footer.
- **High Impact**: Crisp visuals, confident copy, and straightforward CTA to convert visitors into trial users.