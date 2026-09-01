export const permissions = {
    settings: {
        profile: {
            view: 'settings.profile.view',
            update: 'settings.profile.update',
        },
        roles: {
            view: 'settings.roles.view',
        },
        rooms: {
            type: {
                list: 'rooms.types.index',
                create: 'rooms.types.create',
            },
            rate: {
                list: 'rooms.rates.index',
                create: 'rooms.rates.create',
                edit: 'rooms.rates.edit',
                toggleEnabled: 'rooms.rates.enabled',
            },
        },
        security: 'settings.security',
        appearance: 'settings.appearance',
    },
} as const;

type NestedValueOf<T> = T extends string
    ? T
    : T extends Record<string, unknown>
      ? NestedValueOf<T[keyof T]>
      : never;

export type PermissionName = NestedValueOf<typeof permissions>;
