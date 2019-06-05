export type EntityFilterOperator = 'eq' | 'ne' | 'gt' | 'lt' | 'ge' | 'le';
export type EntityFilterType = 'string' | 'string-eased' | 'number' | 'boolean' | 'date';

export interface EntityFilterDefinition {
  field: string;
  type: EntityFilterType;
  operators: { 0: EntityFilterOperator } & EntityFilterOperator[];
}

export interface EntityFilter {
  field: string;
  value: any;
  operator?: EntityFilterOperator;
}

export interface EntityFilterSet {
  condition: 'and' | 'or' | string;
  filters: (EntityFilter | EntityFilterSet)[];
}

export function isEntityFilterSet(thing: EntityFilter | EntityFilterSet): thing is EntityFilterSet {
  return (<EntityFilterSet>thing).condition !== undefined;
}
