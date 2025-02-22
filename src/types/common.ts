export interface BaseEntity {
  id: string;
}

export interface NamedEntity extends BaseEntity {
  name: string;
}

export interface DateRange {
  from: string | null;
  to: string | null;
}