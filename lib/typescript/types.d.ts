import type { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';
import type { CHANTELS_EVENT_TYPE } from './enums';
interface WildcardsMap {
    [key: string]: any;
}
interface ColorScheme extends WildcardsMap {
    navbarColor?: string;
    navbarFontColor?: string;
    networkStateBannerColor?: string;
    networkStateBannerFontColor?: string;
}
interface ChatnelsClientOptions extends WildcardsMap {
    networkStateBanner?: {
        disable: boolean;
    };
}
export interface ChannelFeedViewConfig {
    type: 'channelFeed';
    data: WildcardsMap & {
        displayId: string;
        feedId?: string;
    };
    options?: ChatnelsClientOptions;
    colorScheme?: ColorScheme;
}
export interface ChatViewConfig {
    type: 'chat';
    data: WildcardsMap & {
        displayId: string;
        chatId?: string;
    };
    options?: ChatnelsClientOptions;
    colorScheme?: ColorScheme;
}
interface InboxViewOptions extends ChatnelsClientOptions {
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
    options?: ChatnelsClientOptions;
    colorScheme?: ColorScheme;
}
export interface LineConfigViewConfig {
    type: 'lineConfig';
    data: WildcardsMap & {
        displayId: string;
    };
    options?: ChatnelsClientOptions;
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
    onChatnelsEvent?: (name: CHANTELS_EVENT_TYPE | string, data: any) => void;
    onError?: (e: WebViewErrorEvent) => void;
    onReady?: () => void;
    onRequestSession?: () => void;
}
export interface ChatnelsWidgetHandle {
    refresh: () => void;
}
export {};
