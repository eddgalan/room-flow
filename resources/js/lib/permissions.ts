export const permissions = {
    settings: {
        profile: {
            view: 'settings.profile.view',
            update: 'settings.profile.update',
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
