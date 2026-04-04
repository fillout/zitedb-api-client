export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type Record = {
  id: string,
  data: { [key: string]: any },
  fields: { [key: string]: any },
  createdAt: string,
  updatedAt: string
}

export type RecordListOutput = {
  records: Record[],
  total: number,
  hasMore: boolean
}

export type RecordListOptions = {
  limit?: number,
  offset?: number,
  sort?: SortQuery[],
  filter?: FilterQuery
}

type SortQuery = {
  field: string,
  direction: 'asc' | 'desc'
}

type FilterQuery =
  | { field: string } & FilterOperators
  | { and: FilterQuery[] }
  | { or: FilterQuery[] }

type FilterOperators =
  | { equals: any }
  | { does_not_equal: any }
  | { contains: any }
  | { does_not_contain: any }
  | { starts_with: string }
  | { ends_with: string }
  | { is_empty: true }
  | { is_not_empty: true }
  | { in: any[] }
  | { not_in: any[] }
  | { greater_than: any }
  | { greater_than_or_equal_to: any }
  | { less_than: any }
  | { less_than_or_equal_to: any }

export type FieldCreateInput = {
  type: FieldType,
  name: string,
  template?: any
}

export type FieldUpdateInput = {
  name?: string,
  template?: any
}

export type Field = {
  id: string,
  name: string,
  type: FieldType,
  template?: any,
  order: number
}

type FieldType =
  | 'single_line_text'
  | 'long_text'
  | 'email'
  | 'url'
  | 'phone_number'
  | 'number'
  | 'currency'
  | 'percent'
  | 'rating'
  | 'duration'
  | 'single_select'
  | 'multiple_select'
  | 'checkbox'
  | 'date'
  | 'datetime'
  | 'attachments'
  | 'linked_record'
  | 'lookup'
  | 'autonumber'
  | 'source'

export type TableCreateInput = {
  name: string,
  fields: FieldCreateInput[]
}

export type TableUpdateInput = {
  name: string
}

export type Table = {
  id: string,
  name: string,
  order: number,
  primaryFieldId: string,
  fields: Field[],
  views: View[],
  url: string
}

type View = {
  id: string,
  name: string,
  type: string,
  config: any
}

export type DatabaseCreateInput = {
  name: string,
  tables: TableCreateInput[]
}

export type Database = {
  id: string,
  name: string,
  tables: Table[],
  createdAt: string,
  updatedAt: string,
  url: string,
  workspaceId?: string
}

export type DatabaseListOutput = {
  id: string,
  name: string,
  url: string
}

export type WebhookCreateInput = {
  url: string,
  events: WebhookEvent[],
  tableId?: string
}

type WebhookEvent =
  | 'record.created'
  | 'record.updated'
  | 'record.deleted'
  | 'table.created'
  | 'table.updated'
  | 'table.deleted'
  | 'field.created'
  | 'field.updated'
  | 'field.deleted'

export type WebhookCreateOutput = {
  id: number,
  secret: string
}

export type WebhookListOutput = {
  webhooks: {
    id: number,
    url: string,
    events: WebhookEvent[],
    tableIds: string[] | null,
    active: boolean
  }[]
}
