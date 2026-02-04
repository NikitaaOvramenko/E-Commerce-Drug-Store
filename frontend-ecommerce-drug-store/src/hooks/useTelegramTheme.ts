// Telegram theme hook - returns all theme params with sensible defaults
export function useTelegramTheme() {
    const theme = window.Telegram?.WebApp?.themeParams;

    return {
        // Background colors
        bgColor: theme?.bg_color || "#000000",
        secondaryBgColor: theme?.secondary_bg_color || "#1a1a1a",

        // Text colors
        textColor: theme?.text_color || "#ffffff",
        hintColor: theme?.hint_color || "#6b7280",

        // Accent colors
        linkColor: theme?.link_color || "#22c55e",
        buttonColor: theme?.button_color || "#22c55e",
        buttonTextColor: theme?.button_text_color || "#000000",
    };
}
