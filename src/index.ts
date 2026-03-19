import type { Database, DatabaseCreateInput, DatabaseListOutput, Field, FieldCreateInput, FieldUpdateInput, Method, Record, RecordListOptions, RecordListOutput, Table, TableCreateInput, TableUpdateInput, WebhookCreateInput, WebhookCreateOutput, WebhookListOutput } from "./types.js";

const TOKEN_PREFIXES = ["sk_prod_", "fillout_token_"];

function isValidToken(token: string) {
    return TOKEN_PREFIXES.some((prefix) => token.startsWith(prefix));
}

export class Zite {
    private token: string;
    private baseUrl: string;

    constructor(token: string) {
        if (typeof token !== "string" || !isValidToken(token)) {
            throw new Error(
                "Invalid Fillout API key. Visit https://build.fillout.com/home/settings/developer to create one."
            );
        }

        this.token = token;
        this.baseUrl = "https://tables.fillout.com/api/v1";
    }

    private request = async <T>(method: Method, url: string, verb: string, body?: any) => {
        const res = await fetch(this.baseUrl + url, {
            method,
            headers: {
                Authorization: `Bearer ${this.token}`,
                ...(body ? { "Content-Type": "application/json" } : {})
            },
            body: body ? JSON.stringify(body) : undefined
        });
        if (!res.ok) throw await filloutError(verb, res)

        const data: T = await res.json();
        return data
    }

    record = {
        create: (databaseId: string, tableId: string, record: any) => {
            return this.request<Record>(
                "POST",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}/records`,
                "create Zite record",
                { record }
            )
        },

        get: (databaseId: string, tableId: string, recordId: string) => {
            return this.request<Request>(
                "GET",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}/records/${encodeURIComponent(recordId)}`,
                "get Zite record"
            )
        },

        update: (databaseId: string, tableId: string, recordId: string, record: any) => {
            return this.request<Request>(
                "PATCH",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}/records/${encodeURIComponent(recordId)}`,
                "update Zite record",
                { record }
            )
        },

        delete: (databaseId: string, tableId: string, recordId: string) => {
            return this.request<{ deleted: true }>(
                "DELETE",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}/records/${encodeURIComponent(recordId)}`,
                "delete Zite record"
            )
        },

        list: (databaseId: string, tableId: string, options?: RecordListOptions) => {
            return this.request<RecordListOutput>(
                "POST",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}/records/list`,
                "list Zite records",
                options
            )
        },
    }

    field = {
        create: (databaseId: string, tableId: string, field: FieldCreateInput) => {
            return this.request<Field>(
                "POST",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}/fields`,
                "create Zite field",
                field
            )
        },

        update: (databaseId: string, tableId: string, fieldId: string, field: FieldUpdateInput) => {
            return this.request<Field>(
                "PATCH",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}/fields/${encodeURIComponent(fieldId)}`,
                "update Zite field",
                field
            )
        },

        delete: (databaseId: string, tableId: string, fieldId: string) => {
            return this.request<{ deleted: true }>(
                "DELETE",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}/fields/${encodeURIComponent(fieldId)}`,
                "delete Zite field"
            )
        }
    }

    table = {
        create: (databaseId: string, table: TableCreateInput) => {
            return this.request<Table>(
                "POST",
                `/bases/${encodeURIComponent(databaseId)}/tables`,
                "create Zite table",
                table
            )
        },

        update: (databaseId: string, tableId: string, table: TableUpdateInput) => {
            return this.request<Table>(
                "PATCH",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}`,
                "update Zite table",
                table
            )
        },

        delete: (databaseId: string, tableId: string) => {
            return this.request<{ deleted: true }>(
                "DELETE",
                `/bases/${encodeURIComponent(databaseId)}/tables/${encodeURIComponent(tableId)}`,
                "delete Zite table"
            )
        }
    }

    database = {
        create: (database: DatabaseCreateInput) => {
            return this.request<Database>(
                "POST",
                `/bases`,
                "create Zite database",
                database
            )
        },

        list: () => {
            return this.request<DatabaseListOutput[]>(
                "GET",
                `/bases`,
                "list Zite databases"
            )
        },

        get: (databaseId: string) => {
            return this.request<Database>(
                "GET",
                `/bases/${encodeURIComponent(databaseId)}`,
                "get Zite database"
            )
        },

        delete: (databaseId: string) => {
            return this.request<{ deleted: true }>(
                "DELETE",
                `/bases/${encodeURIComponent(databaseId)}`,
                "delete Zite database"
            )
        }
    }

    webhook = {
        create: (databaseId: string, webhook: WebhookCreateInput) => {
            return this.request<WebhookCreateOutput>(
                "POST",
                `/bases/${encodeURIComponent(databaseId)}/webhooks`,
                "create Zite webhook",
                webhook
            )
        },

        list: (databaseId: string) => {
            return this.request<WebhookListOutput>(
                "GET",
                `/bases/${encodeURIComponent(databaseId)}/webhooks`,
                "list Zite webhooks"
            )
        },

        delete: (databaseId: string, webhookId: number) => {
            return this.request<{ success: true }>(
                "DELETE",
                `/bases/${encodeURIComponent(databaseId)}/webhooks/${encodeURIComponent(webhookId)}`,
                "delete Zite webhook"
            )
        }
    }
}

const filloutError = async (verb: string, res: Response) => {
    const ct = res.headers.get("Content-Type")?.split(";")[0];
    if (ct === "application/json") {
        const body = await res.json();
        if (body?.error?.message) return new Error(body.error.message);
    }

    return new Error(`Failed to ${verb} with status code ${res.status}`);
};
