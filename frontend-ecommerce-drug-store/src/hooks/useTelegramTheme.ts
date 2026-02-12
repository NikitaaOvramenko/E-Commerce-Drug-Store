// Telegram theme hook - returns all theme params with sensible defaults
export function useTelegramTheme() {
    const theme = window.Telegram?.WebApp?.themeParams;

    // Core colors
    const bgColor = theme?.bg_color || "#000000";
    const secondaryBgColor = theme?.secondary_bg_color || "#1a1a1a";
    const textColor = theme?.text_color || "#ffffff";
    const hintColor = theme?.hint_color || "#6b7280";
    const linkColor = theme?.link_color || "#22c55e";
    const buttonColor = theme?.button_color || "#22c55e";
    const buttonTextColor = theme?.button_text_color || "#000000";

    return {
        // Background colors
        bgColor,
        secondaryBgColor,
        headerBgColor: theme?.header_bg_color || secondaryBgColor,
        sectionBgColor: theme?.section_bg_color || secondaryBgColor,
        bottomBarBgColor: theme?.bottom_bar_bg_color || secondaryBgColor,

        // Text colors
        textColor,
        hintColor,
        subtitleTextColor: theme?.subtitle_text_color || hintColor,
        sectionHeaderTextColor: theme?.section_header_text_color || hintColor,

        // Accent colors
        linkColor,
        accentTextColor: theme?.accent_text_color || linkColor,
        buttonColor,
        buttonTextColor,
        destructiveTextColor: theme?.destructive_text_color || "#ef4444",
    };
}
