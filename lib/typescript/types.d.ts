interface ChannelFeedViewData {
    type: 'channelFeed';
    data: {
        displayId: string;
        [key: string]: any;
    };
}
interface ChatViewData {
    type: 'chat';
    data: {
        displayId: string;
        chatId?: string;
        [key: string]: any;
    };
}
interface InboxViewData {
    type: 'inbox';
    data?: {
        displayId?: string;
        lineId?: string;
        chatId?: string;
        [key: string]: any;
    };
}
interface FlowbotViewData {
    type: 'flowbot';
    data: {
        botId: string;
        [key: string]: any;
    };
}
interface LineConfigViewData {
    type: 'lineConfig';
    data: {
        displayId: string;
        [key: string]: any;
    };
}
export declare type ChatnelsViewData = ChannelFeedViewData | ChatViewData | FlowbotViewData | InboxViewData | LineConfigViewData;
export interface ChatnelsWidgetProps {
    orgDomain: string;
    serviceProvider?: string;
    viewData: ChatnelsViewData;
    sessionToken?: string;
    sessionDuration?: string;
    onRequestSession?: () => void;
    onChatnelsEvent?: (name: string, data: any) => void;
}
export {};
