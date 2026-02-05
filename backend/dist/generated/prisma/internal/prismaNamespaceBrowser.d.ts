import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Workspace: "Workspace";
    readonly WorkspaceMember: "WorkspaceMember";
    readonly WorkspaceInvite: "WorkspaceInvite";
    readonly Doc: "Doc";
    readonly Channel: "Channel";
    readonly ChannelMember: "ChannelMember";
    readonly Message: "Message";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly password: "password";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const WorkspaceScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly createdAt: "createdAt";
};
export type WorkspaceScalarFieldEnum = (typeof WorkspaceScalarFieldEnum)[keyof typeof WorkspaceScalarFieldEnum];
export declare const WorkspaceMemberScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly workspaceId: "workspaceId";
    readonly role: "role";
    readonly joinedAt: "joinedAt";
};
export type WorkspaceMemberScalarFieldEnum = (typeof WorkspaceMemberScalarFieldEnum)[keyof typeof WorkspaceMemberScalarFieldEnum];
export declare const WorkspaceInviteScalarFieldEnum: {
    readonly id: "id";
    readonly workspaceId: "workspaceId";
    readonly email: "email";
    readonly token: "token";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type WorkspaceInviteScalarFieldEnum = (typeof WorkspaceInviteScalarFieldEnum)[keyof typeof WorkspaceInviteScalarFieldEnum];
export declare const DocScalarFieldEnum: {
    readonly id: "id";
    readonly workspaceId: "workspaceId";
    readonly title: "title";
    readonly content: "content";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DocScalarFieldEnum = (typeof DocScalarFieldEnum)[keyof typeof DocScalarFieldEnum];
export declare const ChannelScalarFieldEnum: {
    readonly id: "id";
    readonly workspaceId: "workspaceId";
    readonly ownerId: "ownerId";
    readonly name: "name";
    readonly createdAt: "createdAt";
};
export type ChannelScalarFieldEnum = (typeof ChannelScalarFieldEnum)[keyof typeof ChannelScalarFieldEnum];
export declare const ChannelMemberScalarFieldEnum: {
    readonly id: "id";
    readonly channelId: "channelId";
    readonly userId: "userId";
    readonly joinedAt: "joinedAt";
};
export type ChannelMemberScalarFieldEnum = (typeof ChannelMemberScalarFieldEnum)[keyof typeof ChannelMemberScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly channelId: "channelId";
    readonly userId: "userId";
    readonly content: "content";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map