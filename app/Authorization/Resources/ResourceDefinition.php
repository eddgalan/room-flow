<?php

namespace App\Authorization\Resources;

interface ResourceDefinition
{
    /**
     * @return array<string, string>
     */
    public static function descriptions(): array;
}
