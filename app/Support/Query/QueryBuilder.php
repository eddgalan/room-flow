<?php

namespace App\Support\Query;

use App\Contracts\HasQuery;
use Illuminate\Database\Eloquent\Builder;
use InvalidArgumentException;

class QueryBuilder
{
    /**
     * Applies search, filters, and sorting to the given query builder instance based on the provided parameters.
     *
     * @param  Builder  $query  The query builder instance to modify.
     * @param  HasQuery  $model  The model implementing the HasQuery interface for query context.
     * @param  array  $parameters  The set of parameters used to apply search, filters, and sorting.
     * @return Builder The modified query builder instance.
     */
    public function apply(
        Builder $query,
        HasQuery $model,
        array $parameters
    ): Builder {
        $this->applySearch($query, $model, $parameters);
        $this->applyFilters($query, $model, $parameters);
        $this->applySorting($query, $model, $parameters);

        return $query;
    }

    /**
     * Modifies the given query builder with search conditions based on the provided parameters.
     *
     * @param Builder $query
     * @param HasQuery $model
     * @param array $parameters
     * @return void
     */
    private function applySearch(
        Builder $query,
        HasQuery $model,
        array $parameters
    ): void {
        $search = $parameters['search'] ?? null;

        if (! is_string($search) || trim($search) === '') {
            return;
        }

        $query->where(function (Builder $query) use ($model, $search) {
            foreach ($model->getSearchableFields() as $field) {
                $query->orWhere($field, 'like', '%'.trim($search).'%');
            }
        });
    }

    /**
     * Applies filtering to the query builder instance based on the specified parameters.
     *
     * @param Builder $query
     * @param HasQuery $model
     * @param array $parameters
     * @return void
     * @throws InvalidArgumentException If an unsupported field is attempted to be filtered.
     */
    private function applyFilters(
        Builder $query,
        HasQuery $model,
        array $parameters
    ): void {
        $filters = $parameters['filters'] ?? [];
        $allowedFields = $model->getFilterableFields();

        foreach ($filters as $field => $value) {
            if (! array_key_exists($field, $allowedFields)) {
                throw new InvalidArgumentException(
                    "The field [{$field}] cannot be filtered."
                );
            }

            $this->applyFilter(
                query: $query,
                field: $field,
                type: $allowedFields[$field],
                value: $value,
            );
        }
    }

    /**
     * Applies a filter to the given query based on the specified field, type, and value.
     *
     * @param Builder $query
     * @param string $field
     * @param string $type
     * @param mixed $value
     *
     * @throws InvalidArgumentException If an unsupported filter type is provided.
     */
    private function applyFilter(
        Builder $query,
        string $field,
        string $type,
        mixed $value
    ): void {
        match ($type) {
            'string' => $query->where($field, 'like', '%'.$value.'%'),
            'integer' => $query->where($field, '=', (int) $value),
            'boolean' => $query->where($field, '=', filter_var(
                $value,
                FILTER_VALIDATE_BOOLEAN,
                FILTER_NULL_ON_FAILURE
            )),
            'datetime' => $this->applyDateFilter($query, $field, $value),
            default => throw new InvalidArgumentException(
                "Unsupported filter type [{$type}]."
            ),
        };
    }

    /**
     * Applies a date filter to the given query based on the specified field and value.
     *
     * @param Builder $query
     * @param string $field
     * @param mixed $value
     */
    private function applyDateFilter(
        Builder $query,
        string $field,
        mixed $value
    ): void {
        if (is_array($value)) {
            $from = $value['from'] ?? null;
            $to = $value['to'] ?? null;

            $query
                ->when($from, fn (Builder $query) => $query->whereDate(
                    $field,
                    '>=',
                    $from
                ))
                ->when($to, fn (Builder $query) => $query->whereDate(
                    $field,
                    '<=',
                    $to
                ));

            return;
        }

        $query->whereDate($field, $value);
    }

    /**
     * Applies sorting to a database query based on the provided parameters.
     *
     * @param Builder $query
     * @param HasQuery $model
     * @param array $parameters
     *
     * @return void
     * @throws InvalidArgumentException If the provided sort field is not sortable or the direction is invalid.
     *
     */
    private function applySorting(
        Builder $query,
        HasQuery $model,
        array $parameters
    ): void {
        $sort = $parameters['sort'] ?? null;
        $direction = strtolower($parameters['direction'] ?? 'asc');

        if ($sort === null) {
            return;
        }

        if (! in_array($sort, $model->getSortableFields(), true)) {
            throw new InvalidArgumentException(
                "The field [{$sort}] cannot be sorted."
            );
        }

        if (! in_array($direction, ['asc', 'desc'], true)) {
            $direction = 'asc';
        }

        $query->orderBy($sort, $direction);
    }
}
