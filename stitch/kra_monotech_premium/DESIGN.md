# Design System Strategy: The Technical Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Technical Editor"**
The objective of this design system is to transform KRA Academy from a standard learning platform into a high-precision digital institution. We are moving away from the "template" aesthetic by merging the clinical precision of a technical manual with the prestige of a high-end editorial journal. 

While inspired by the clarity of Coursera, this system introduces a sharper, more intentional edge. We achieve this through **Intentional Asymmetry**—where content is not always centered but anchored to a rigid, technical grid—and **Tonal Depth**, replacing generic borders with sophisticated shifts in surface value. The result is an experience that feels engineered, authoritative, and premium.

---

## 2. Colors & Surface Philosophy
The palette is dominated by the tension between High-Contrast Black (`#000000`) and the authoritative KRA Red (`#D32F2F`). 

*   **Primary Red (`primary`):** Use this as a precision instrument. It is for focus, action, and critical branding. Never use it for large background blocks; use it for the "surgical" strike of a CTA or a progress highlight.
*   **The "No-Line" Rule:** We do not use 1px solid borders to separate sections. Structure is created through background shifts. A section might sit on `surface`, while an inner content area transitions to `surface_container_low`. 
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of physical layers. 
    *   **Level 0:** `surface` (#f9f9f9) - The canvas.
    *   **Level 1:** `surface_container_low` (#f3f3f3) - Tertiary content/Sidebars.
    *   **Level 2:** `surface_container_lowest` (#ffffff) - Primary content cards.
*   **The "Glass & Gradient" Rule:** To soften the technical "Roboto Mono" feel, floating elements (like navigation bars or hovering tooltips) should utilize Glassmorphism. Use `surface` colors at 80% opacity with a `20px` backdrop blur.
*   **Signature Textures:** For Hero sections, use a subtle linear gradient from `primary` (#af101a) to `primary_container` (#d32f2f) at a 135-degree angle to add "soul" and depth to the brand's primary touchpoints.

---

## 3. Typography: The Mono Aesthetic
We are utilizing **Roboto Mono** across all scales to lean into the technical nature of KRA Academy. To make a monospaced font feel "premium" rather than "system-default," we must manipulate tracking and weight.

*   **Display Scale (`display-lg` to `display-sm`):** Use these for high-impact editorial moments. Set with `-2%` letter spacing to tighten the technical gaps of the mono font.
*   **Headline & Title:** These are your navigational anchors. Always use `on_surface` (#1b1b1b) to maintain maximum readability against the white background.
*   **Body Scale:** Use `body-md` for standard course content. Ensure line height is generous (1.6x) to compensate for the character width of Roboto Mono.
*   **Labels:** Use `label-sm` in ALL CAPS with `+5%` letter spacing for technical metadata (e.g., "DURATION," "LEVEL," "MODULE 01").

---

## 4. Elevation & Depth
We reject the "standard" drop shadow. Our depth is environmental and sophisticated.

*   **Tonal Layering:** Depth is achieved by "stacking." A `surface_container_lowest` card placed on a `surface_container_low` background provides a natural, soft lift that requires no shadow.
*   **Ambient Shadows:** If a floating state is required (e.g., a dropdown), use a high-diffusion shadow: `y-offset: 12px, blur: 32px, color: rgba(27, 27, 27, 0.06)`. This mimics soft, natural gallery lighting.
*   **The "Ghost Border" Fallback:** If accessibility requires a container definition, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** For top-level navigation, use a semi-transparent `surface_container_lowest` with a heavy backdrop blur. This ensures the technical content "bleeds" through the header, integrating the layout.

---

## 5. Components

### Buttons
*   **Primary:** Background `primary` (#af101a), text `on_primary` (#ffffff). **Shape:** `md` (0.375rem) for a sharp, modern feel.
*   **Secondary:** Background `secondary_container`, text `on_secondary_container`. Use for "Save for Later" or secondary actions.
*   **Tertiary:** No background. Text `primary` with a `Ghost Border` on hover.

### Progress & Success (The Green Rule)
*   **Usage:** Only use `tertiary` (#006533) and its variants for completion states.
*   **Progress Bars:** Background `surface_container_high`, fill `tertiary`. 
*   **Success Toasts:** Use `tertiary_container` with `on_tertiary_container` text.

### Cards & Modules
*   **Rule:** Forbid divider lines. 
*   **Structure:** Use vertical white space (32px or 48px) to separate course modules. Use `surface_container_lowest` for the card body to make it "pop" off the light grey background.

### Input Fields
*   **Style:** Minimalist. Only a bottom border using `outline_variant` at 40% opacity. 
*   **Focus State:** The bottom border transforms into a 2px `primary` (Red) line. Labels use `label-md` and sit above the field in `secondary`.

---

## 6. Do's and Don'ts

### Do
*   **DO** use whitespace as a structural component. If a layout feels cluttered, increase the gap between containers rather than adding a line.
*   **DO** use `tertiary` (Green) exclusively for positive feedback and progress.
*   **DO** use "Technical Metadata"—labels like `[01]`, `TYPE // VIDEO`, `STATUS // ACTIVE`—to lean into the Roboto Mono aesthetic.

### Don't
*   **DON'T** use 100% opaque black borders. It breaks the premium editorial feel.
*   **DON'T** use Red for "Success" or "Warning" messages. Red is KRA's brand power; keep it prestigious. Use `error` (#ba1a1a) only for critical system failures.
*   **DON'T** center-align long blocks of text. Stick to a left-aligned, rigid technical grid to maintain the "Technical Editor" persona.