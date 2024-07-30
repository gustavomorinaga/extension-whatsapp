/**
 * Represents the interface for a WhatsApp chat ID.
 */
export type TWhatsAppChatID = {
	/**
	 * The serialized representation of the chat ID.
	 */
	_serialized: string;

	/**
	 * Indicates whether the chat ID is associated with the current user.
	 */
	fromMe: boolean;

	/**
	 * The unique identifier of the chat.
	 */
	id: string;

	/**
	 * The remote user or group associated with the chat.
	 */
	remote: string;
};

/**
 * Represents the interface for the last received key in WhatsApp.
 * Inherits from the TWhatsAppChatID interface.
 */
export type TWhatsAppLastReceivedKey = TWhatsAppChatID;

/**
 * Represents the interface for the latest edit message key in WhatsApp.
 * Extends the TWhatsAppChatID interface.
 */
export type TWhatsAppLatestEditMessageKey = TWhatsAppChatID;

/**
 * Represents the opaque data for a WhatsApp message row.
 */
export type TWhatsAppMessageRowOpaqueData = {};

/**
 * Represents the interface for the first frame sidecar of a WhatsApp message.
 */
export type TWhatsAppFirstFrameSidecar = {};

/**
 * Represents the interface for WhatsApp scans sidecar.
 */
export type TWhatsAppScansSidecar = {};

/**
 * Represents the interface for the WhatsApp Tc Token.
 */
export type TWhatsAppTcToken = {};

/**
 * Represents a WhatsApp chat message.
 */
export type TWhatsAppChatMessage = {
	/** The acknowledgement status of the message. */
	ack: number;
	/** The type of the business bot. */
	bizBotType: unknown;
	/** The type of the business content placeholder. */
	bizContentPlaceholderType: unknown;
	/** The body of the message. */
	body: string;
	/** The type of the bot message body. */
	botMsgBodyType: unknown;
	/** Indicates if the bot plugin is a parent. */
	botPluginMaybeParent: boolean;
	/** The reference index of the bot plugin. */
	botPluginReferenceIndex: unknown;
	/** The search provider of the bot plugin. */
	botPluginSearchProvider: unknown;
	/** The search query of the bot plugin. */
	botPluginSearchQuery: unknown;
	/** The search URL of the bot plugin. */
	botPluginSearchUrl: unknown;
	/** The type of the bot plugin. */
	botPluginType: unknown;
	/** The CDN URL of the bot reel plugin thumbnail. */
	botReelPluginThumbnailCdnUrl: unknown;
	/** The target ID of the bot response. */
	botResponseTargetId: unknown;
	/** The sender JID of the bot target. */
	botTargetSenderJid: unknown;
	/** Indicates if the message is a broadcast. */
	broadcast: boolean;
	/** Indicates if the event is invalidated. */
	eventInvalidated: boolean;
	/** The sender of the message. */
	from: string;
	/** The list of group mentions in the message. */
	groupMentions: Array<unknown>;
	/** Indicates if the message has a reaction. */
	hasReaction: boolean;
	/** Indicates if the hosted business encryption state is mismatched. */
	hostedBizEncStateMismatch: boolean;
	/** The ID of the WhatsApp chat. */
	id: TWhatsAppChatID;
	/** Indicates if the message is invisible. */
	invis: boolean;
	/** The invoked bot WID. */
	invokedBotWid: unknown;
	/** Indicates if the message is an avatar. */
	isAvatar: boolean;
	/** Indicates if the message is a carousel card. */
	isCarouselCard: boolean;
	/** Indicates if the message is a dynamic reply buttons message. */
	isDynamicReplyButtonsMsg: boolean;
	/** Indicates if the message is forwarded. */
	isForwarded: boolean;
	/** Indicates if the message is from a template. */
	isFromTemplate: boolean;
	/** Indicates if the message is a MD history message. */
	isMdHistoryMsg: boolean;
	/** Indicates if the message is a vCard over MMS document. */
	isVcardOverMmsDocument: boolean;
	/** Indicates if the KIC (Keep In Chat) is notified. */
	kicNotified: boolean;
	/** The last playback progress of the message. */
	lastPlaybackProgress: number;
	/** The timestamp of the last update from the server. */
	lastUpdateFromServerTs: number;
	/** The latest edit message key. */
	latestEditMsgKey: unknown;
	/** The timestamp of the latest edit sender. */
	latestEditSenderTimestampMs: unknown;
	/** The list of mentioned JIDs in the message. */
	mentionedJidList: Array<unknown>;
	/** The parent message ID. */
	parentMsgId: unknown;
	/** Indicates if the placeholder is created when the account is hosted. */
	placeholderCreatedWhenAccountIsHosted: boolean;
	/** Indicates if the poll is invalidated. */
	pollInvalidated: boolean;
	/** The list of poll options. */
	pollOptions: Array<unknown>;
	/** Indicates if the product header image is rejected. */
	productHeaderImageRejected: boolean;
	/** Indicates if the message requires a direct connection. */
	requiresDirectConnection: boolean;
	/** The row ID of the message. */
	rowId: number;
	/** Indicates if the sender or recipient account type is hosted. */
	senderOrRecipientAccountTypeHosted: boolean;
	/** Indicates if the message is starred. */
	star: boolean;
	/** The timestamp when the sticker was sent. */
	stickerSentTs: number;
	/** The timestamp of the message. */
	t: number;
	/** The recipient of the message. */
	to: string;
	/** The type of the message. */
	type: string;
	/** Indicates if the message has been viewed. */
	viewed: boolean;
};

/**
 * Represents the interface for a WhatsApp chat.
 */
/**
 * Represents a WhatsApp chat.
 */
export type TWhatsAppChat = {
	/** Indicates if the chat is archived. */
	archive: boolean;
	/** Indicates if the chat archive has been viewed in the drawer. */
	archiveAtMentionViewedInDrawer: boolean;
	/** The timestamp of the last played celebration animation. */
	celebrationAnimationLastPlayed: number;
	/** The preview information of the chat in the chat list. */
	chatlistPreview: TWhatsAppChatListPreview;
	/** The initiator of the disappearing mode. */
	disappearingModeInitiator: string;
	/** The trigger of the disappearing mode. */
	disappearingModeTrigger: string;
	/** The transfer type of the end of chat history. */
	endOfHistoryTransferType: number;
	/** The duration of the ephemeral messages in the chat. */
	ephemeralDuration: number;
	/** The timestamp of the ephemeral setting. */
	ephemeralSettingTimestamp: number;
	/** Indicates if the chat has been opened. */
	hasChatBeenOpened: boolean;
	/** Indicates if the chat has been opened. */
	hasOpened: boolean;
	/** Indicates if the welcome message has been requested. */
	hasRequestedWelcomeMsg: boolean;
	/** Indicates if there are unread mentions in the chat. */
	hasUnreadMention: boolean;
	/** The ID of the chat. */
	id: string;
	/** Indicates if the chat is auto-muted. */
	isAutoMuted: boolean;
	/** Indicates if the chat is locked. */
	isLocked: boolean;
	/** Indicates if the chat is read-only. */
	isReadOnly: boolean;
	/** The last received key in the chat. */
	lastReceivedKey: TWhatsAppLastReceivedKey;
	/** The messages in the chat. */
	msgs: Array<TWhatsAppMessage>;
	/** The expiration timestamp of the mute. */
	muteExpiration: number;
	/** The name of the chat. */
	name?: string;
	/** Indicates if the chat is not spam. */
	notSpam: boolean;
	/** Indicates if the initial loading is pending. */
	pendingInitialLoading: boolean;
	/** The pin number of the chat. */
	pin: number;
	/** The timestamp of the chat. */
	t: number;
	/** The token for the Terms and Conditions. */
	tcToken: TWhatsAppTcToken;
	/** The sender timestamp of the Terms and Conditions token. */
	tcTokenSenderTimestamp: number;
	/** The timestamp of the Terms and Conditions token. */
	tcTokenTimestamp: number;
	/** The number of unread messages in the chat. */
	unreadCount: number;
	/** The offset of the unread divider in the chat. */
	unreadDividerOffset: number;
	/** The number of unread mentions in the chat. */
	unreadMentionCount: number;
	/** The unread mentions of the user in the chat. */
	unreadMentionsOfMe: Array<unknown>;
};

/**
 * Represents the preview of a WhatsApp chat list item.
 */
export type TWhatsAppChatListPreview = {
	/**
	 * The key of the message.
	 */
	msgKey: string;

	/**
	 * The key of the parent message.
	 */
	parentMsgKey: string;

	/**
	 * The reaction text of the message.
	 */
	reactionText: string;

	/**
	 * The sender of the message.
	 */
	sender: string;

	/**
	 * The timestamp of the message.
	 */
	timestamp: number;

	/**
	 * The type of the message.
	 */
	type: string;
};

/**
 * Represents a WhatsApp message.
 */
export type TWhatsAppMessage = {
	/** The acknowledgement status of the message. */
	ack: number;
	/** The type of the business bot. */
	bizBotType: unknown;
	/** The type of the business content placeholder. */
	bizContentPlaceholderType: unknown;
	/** The body of the message. */
	body?: string;
	/** The type of the bot message body. */
	botMsgBodyType: unknown;
	/** Indicates if the bot plugin is a parent. */
	botPluginMaybeParent: boolean;
	/** The reference index of the bot plugin. */
	botPluginReferenceIndex: unknown;
	/** The search provider of the bot plugin. */
	botPluginSearchProvider: unknown;
	/** The search query of the bot plugin. */
	botPluginSearchQuery: unknown;
	/** The search URL of the bot plugin. */
	botPluginSearchUrl: unknown;
	/** The type of the bot plugin. */
	botPluginType: unknown;
	/** The CDN URL of the bot reel plugin thumbnail. */
	botReelPluginThumbnailCdnUrl: unknown;
	/** The target ID of the bot response. */
	botResponseTargetId: unknown;
	/** The sender JID of the bot target. */
	botTargetSenderJid: unknown;
	/** Indicates if the message is a broadcast message. */
	broadcast?: boolean;
	/** Indicates if the event is invalidated. */
	eventInvalidated: boolean;
	/** The sender of the message. */
	from: string;
	/** The group mentions in the message. */
	groupMentions: Array<unknown>;
	/** Indicates if the message has a reaction. */
	hasReaction: boolean;
	/** Indicates if the hosted business encryption state is mismatched. */
	hostedBizEncStateMismatch: boolean;
	/** The ID of the WhatsApp chat. */
	id: TWhatsAppChatID;
	/** Indicates if the message is invisible. */
	invis: boolean;
	/** The invoked bot WID. */
	invokedBotWid: unknown;
	/** Indicates if the message is an avatar. */
	isAvatar: boolean;
	/** Indicates if the message is a carousel card. */
	isCarouselCard: boolean;
	/** Indicates if the message is a dynamic reply buttons message. */
	isDynamicReplyButtonsMsg: boolean;
	/** Indicates if the message is forwarded. */
	isForwarded?: boolean;
	/** Indicates if the message is from a template. */
	isFromTemplate: boolean;
	/** Indicates if the message is a MD history message. */
	isMdHistoryMsg: boolean;
	/** Indicates if the message is a vCard over MMS document. */
	isVcardOverMmsDocument: boolean;
	/** Indicates if the KIC (Key Information Center) is notified. */
	kicNotified: boolean;
	/** The last playback progress of the message. */
	lastPlaybackProgress: number;
	/** The timestamp of the last update from the server. */
	lastUpdateFromServerTs: number;
	/** The latest edit message key. */
	latestEditMsgKey?: TWhatsAppLatestEditMessageKey;
	/** The timestamp of the latest edit sender. */
	latestEditSenderTimestampMs?: number;
	/** The mentioned JID list in the message. */
	mentionedJidList: Array<unknown>;
	/** The parent message ID. */
	parentMsgId: unknown;
	/** Indicates if the placeholder is created when the account is hosted. */
	placeholderCreatedWhenAccountIsHosted: boolean;
	/** Indicates if the poll is invalidated. */
	pollInvalidated: boolean;
	/** The options of the poll. */
	pollOptions: Array<unknown>;
	/** Indicates if the product header image is rejected. */
	productHeaderImageRejected: boolean;
	/** Indicates if the message requires a direct connection. */
	requiresDirectConnection: boolean;
	/** The row ID of the message. */
	rowId: number;
	/** Indicates if the sender or recipient account type is hosted. */
	senderOrRecipientAccountTypeHosted: boolean;
	/** Indicates if the message is starred. */
	star: boolean;
	/** The timestamp when the sticker is sent. */
	stickerSentTs: number;
	/** The timestamp of the message. */
	t: number;
	/** The recipient of the message. */
	to: string;
	/** The type of the message. */
	type: string;
	/** Indicates if the message is viewed. */
	viewed: boolean;
	/** The deprecated MMS3 URL of the message. */
	deprecatedMms3Url?: string;
	/** The direct path of the message. */
	directPath?: string;
	/** The encryption file hash of the message. */
	encFilehash?: string;
	/** The file hash of the message. */
	filehash?: string;
	/** The length of the first frame of the message. */
	firstFrameLength?: number;
	/** The first frame sidecar of the message. */
	firstFrameSidecar?: TWhatsAppFirstFrameSidecar;
	/** The height of the message. */
	height?: number;
	/** Indicates if the message is animated. */
	isAnimated?: boolean;
	/** Indicates if the message is a Lottie animation. */
	isLottie?: boolean;
	/** The media key of the message. */
	mediaKey?: string;
	/** The timestamp of the media key. */
	mediaKeyTimestamp?: number;
	/** The MIME type of the message. */
	mimetype?: string;
	/** The width of the message. */
	width?: number;
	/** Indicates if the message is a new message. */
	isNewMsg?: boolean;
	/** The type of the invite group. */
	inviteGrpType?: string;
	/** The quoted message of the message. */
	quotedMsg?: TWhatsAppQuotedMessage;
	/** The participant who is quoted in the message. */
	quotedParticipant?: string;
	/** The stanza ID of the quoted message. */
	quotedStanzaID?: string;
	/** The type of the rich preview. */
	richPreviewType?: number;
	/** The thumbnail of the message. */
	thumbnail?: string;
	/** The forwarding score of the message. */
	forwardingScore?: number;
	/** The interactive annotations of the message. */
	interactiveAnnotations?: Array<unknown>;
	/** Indicates if the message is a view once message. */
	isViewOnce?: boolean;
	/** The scan lengths of the message. */
	scanLengths?: Array<number>;
	/** The scans sidecar of the message. */
	scansSidecar?: TWhatsAppScansSidecar;
	/** The size of the message. */
	size?: number;
	/** The static URL of the message. */
	staticUrl?: string;
	/** The author of the message. */
	author?: string;
};

/**
 * Represents a quoted message in WhatsApp.
 */
export type TWhatsAppQuotedMessage = {
	/**
	 * The acknowledgement status of the message.
	 */
	ack?: number;

	/**
	 * The body of the message.
	 */
	body: string;

	/**
	 * The sender of the message.
	 */
	from?: string;

	/**
	 * The ID of the chat.
	 */
	id?: TWhatsAppChatID;

	/**
	 * Indicates if the message is invisible.
	 */
	invis?: boolean;

	/**
	 * Indicates if the message is a history message.
	 */
	isMdHistoryMsg?: boolean;

	/**
	 * The index of the message range.
	 */
	messageRangeIndex?: string;

	/**
	 * Additional opaque data for the message row.
	 */
	msgRowOpaqueData?: TWhatsAppMessageRowOpaqueData;

	/**
	 * The poll options for the message.
	 */
	pollOptions: Array<unknown>;

	/**
	 * The row ID of the message.
	 */
	rowId?: number;

	/**
	 * Indicates if the message is starred.
	 */
	star?: boolean;

	/**
	 * The timestamp of the message.
	 */
	t?: number;

	/**
	 * The recipient of the message.
	 */
	to?: string;

	/**
	 * The type of the message.
	 */
	type: string;

	/**
	 * The kind of the message.
	 */
	kind?: string;
};

/**
 * Represents a WhatsApp contact.
 */
export type TWhatsAppContact = {
	/**
	 * The unique identifier of the contact.
	 */
	id: string;

	/**
	 * Indicates whether the contact is a business account.
	 */
	isBusiness: boolean;

	/**
	 * Indicates whether the contact synchronization is completed.
	 */
	isContactSyncCompleted: number;

	/**
	 * Indicates whether the contact is an enterprise account.
	 */
	isEnterprise: boolean;

	/**
	 * Indicates whether the contact is an SMB (Small and Medium-sized Business) account.
	 */
	isSmb: boolean;

	/**
	 * The name of the contact.
	 */
	name: string;

	/**
	 * The push name of the contact.
	 */
	pushname: string;

	/**
	 * The short name of the contact.
	 */
	shortName: string;

	/**
	 * Indicates whether the contact is synced to the address book.
	 */
	syncToAddressbook: boolean;

	/**
	 * The timestamp of the last update to the contact's text status.
	 */
	textStatusLastUpdateTime: number;

	/**
	 * The type of the contact.
	 */
	type: string;
};
