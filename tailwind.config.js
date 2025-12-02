/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // theme is controlled via `dark` class on <html>
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // All color tokens reference CSS variables defined in globals.css.
        background: "var(--background)",
        foreground: "var(--foreground)",

        surface: "var(--surface)",
        "surface-soft": "var(--surface-soft)",
        border: "var(--border)",

        "text-primary": "var(--text-primary)",
        "text-muted": "var(--text-muted)",

        // Marengo Decor brand green (olive).
        brand: {
          DEFAULT: "var(--brand)",
          soft: "var(--brand-soft)",
          foreground: "var(--brand-foreground)",
        },

        // Alias for consumers expecting a `primary` token.
        primary: {
          DEFAULT: "var(--brand)",
          soft: "var(--brand-soft)",
          foreground: "var(--brand-foreground)",
        },

        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },

        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },

        // Single ring color keeps focus styling consistent.
        ring: "var(--ring)",
      },

      fontFamily: {
        // Tailwind utilities still use `font-sans`, but actual font
        // is controlled by the Geist CSS variables on <body>.
        sans: ["system-ui", "sans-serif"],
        display: ["system-ui", "sans-serif"],
      },

      borderRadius: {
        xl: "24px",
        lg: "16px",
        md: "12px",
        sm: "8px",
      },

      boxShadow: {
        soft: "0 24px 60px rgba(15, 23, 42, 0.55)",
        "inner-soft": "0 14px 40px rgba(15, 23, 42, 0.45)",
        subtle: "0 1px 2px rgba(15, 23, 42, 0.6)",
      },

      spacing: {
        "page-y": "3.5rem",
        "page-x": "2rem",
      },

      fontSize: {
        "display-1": ["2.75rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        "display-2": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
      },
    },
  },
  plugins: [],
};