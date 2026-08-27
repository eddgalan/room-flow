<?php

namespace App\Support\Navigation;

use App\Authorization\Resources\DashboardResources;
use App\Authorization\Resources\UserResources;
use App\Models\User;

class SidebarNavigation
{
    /**
     * @return array<int, array{title: string, href: string, icon: string|null}>
     */
    public function forUser(?User $user): array
    {
        if (! $user) {
            return [];
        }

        $visibleItems = [];

        foreach ($this->items() as $item) {
            if (! $user->can($item['permission'])) {
                continue;
            }

            $visibleItems[] = [
                'title' => $item['title'],
                'href' => $item['href'],
                'icon' => $item['icon'],
                'order' => $item['order'],
            ];
        }

        usort(
            $visibleItems,
            fn (array $first, array $second): int => $first['order'] <=> $second['order'],
        );

        $navigationItems = [];

        foreach ($visibleItems as $item) {
            $navigationItems[] = [
                'title' => $item['title'],
                'href' => $item['href'],
                'icon' => $item['icon'],
            ];
        }

        return $navigationItems;
    }

    /**
     * @return array<int, array{title: string, permission: string, href: string, icon: string|null, order: int}>
     */
    private function items(): array
    {
        return [
            [
                'title' => 'Dashboard',
                'permission' => DashboardResources::VIEW,
                'href' => route('dashboard'),
                'icon' => 'layout-grid',
                'order' => 10,
            ],
            [
                'title' => 'Users',
                'permission' => UserResources::VIEW,
                'href' => route('users.index'),
                'icon' => 'users',
                'order' => 20,
            ],
        ];
    }
}
