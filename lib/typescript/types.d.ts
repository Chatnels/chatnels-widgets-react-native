interface WildcardsMap {
    [key: string]: any;
}
interface ColorScheme extends WildcardsMap {
    navbarColor: string;
    navbarFontColor: string;
}
export interface ChannelFeedViewConfig {
    type: 'channelFeed';
    data: WildcardsMap & {
        displayId: string;
        feedId?: string;
    };
    options?: WildcardsMap;
    colorScheme?: ColorScheme;
}
export interface ChatViewConfig {
    type: 'chat';
    data: WildcardsMap & {
        displayId: string;
        chatId?: string;
    };
    options?: WildcardsMap;
    colorScheme?: ColorScheme;
}
interface InboxViewOptions extends WildcardsMap {
    enableChatMenu?: boolean;
    useExternalCreateChat?: boolean;
    navbarProps?: {
        enableBackBtn?: boolean;
        title?: string;
    };
}
export interface InboxViewConfig {
    type: 'inbox';
    data?: WildcardsMap & {
        displayId?: string;
        lineId?: string;
        chatId?: string;
    };
    options?: InboxViewOptions;
    colorScheme?: ColorScheme;
}
export interface FlowBotViewConfig {
    type: 'flowbot';
    data: WildcardsMap & {
        botId: string;
    };
    options?: WildcardsMap;
    colorScheme?: ColorScheme;
}
export interface LineConfigViewConfig {
    type: 'lineConfig';
    data: WildcardsMap & {
        displayId: string;
    };
    options?: WildcardsMap;
    colorScheme?: ColorScheme;
}
export declare type ChatnelsWidgetConfig = ChannelFeedViewConfig | ChatViewConfig | FlowBotViewConfig | InboxViewConfig | LineConfigViewConfig;
export declare type ChatnelsWidgetOptions = InboxViewOptions;
export interface ChatnelsWidgetProps {
    orgDomain: string;
    serviceProvider?: string;
    viewData: ChatnelsWidgetConfig;
    sessionToken?: string;
    sessionDuration?: string;
    onRequestSession?: () => void;
    onChatnelsEvent?: (name: string, data: any) => void;
}
export {};
