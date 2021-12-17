interface ChannelFeedViewData {
    type: 'channelFeed';
    data: {
        displayId: string;
    };
}
interface ChatViewData {
    type: 'chat';
    data: {
        displayId: string;
        chatId?: string;
    };
}
interface InboxViewData {
    type: 'inbox';
    data?: {
        displayId?: string;
        lineId?: string;
        chatId?: string;
    };
}
interface FlowbotViewData {
    type: 'flowbot';
    data: {
        botId: string;
    };
}
interface LineConfigViewData {
    type: 'lineConfig';
    data: {
        displayId: string;
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
}
export {};
