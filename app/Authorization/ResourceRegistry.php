<?php

namespace App\Authorization;

use App\Authorization\Resources\ResourceDefinition;
use Illuminate\Support\Facades\File;
use ReflectionClass;

class ResourceRegistry
{
    /**
     * Retrieves a unique collection of resource constants defined in classes that
     * implement the ResourceDefinition interface within the Resources directory.
     *
     * @return array<int, string> A list of unique resource constants.
     */
    public static function getAllResources(): array
    {
        $resources = [];
        $resourcesPath = app_path('Authorization/Resources');

        if (! File::isDirectory($resourcesPath)) {
            return [];
        }

        foreach (File::allFiles($resourcesPath) as $file) {
            $relativeClass = substr($file->getRelativePathname(), 0, -4);
            $relativeClass = str_replace(['/', DIRECTORY_SEPARATOR], '\\', $relativeClass);
            $className = 'App\\Authorization\\Resources\\'.$relativeClass;

            if (! class_exists($className)) {
                continue;
            }

            $reflection = new ReflectionClass($className);

            if (! $reflection->implementsInterface(ResourceDefinition::class)) {
                continue;
            }

            $resources = array_merge(
                $resources,
                array_filter(
                    array_values($reflection->getConstants()),
                    is_string(...),
                )
            );
        }

        return array_values(array_unique($resources));
    }
}
