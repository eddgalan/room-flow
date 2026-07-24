<?php

namespace App\Contracts;

interface HasQuery
{
    public function getFilterableFields(): array;

    public function getSortableFields(): array;

    public function getSearchableFields(): array;
}
