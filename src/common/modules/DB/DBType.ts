// CRUD
export type TableCaller = object
export type TableStruct = object
export interface DBServable {
    DBAddress: string
    DBOrigin: any
    start(): Promise<boolean>
    getTableCaller(TableName: string): Promise<TableCaller>
}
export interface DBOperatable {
    TableName: string
    TableStruct: TableStruct
    TableCaller: TableCaller
    //
    init(TableName: string, newStruct: TableStruct): Promise<boolean>
    //
    create(doc: TableStruct): Promise<object>
    get(doc: TableStruct): Promise<object>
    query(doc: TableStruct): Promise<Array<object>>
    update(query: TableStruct, doc: TableStruct): Promise<object>
    delete(_id: string | number): Promise<boolean>
    //
    getOldStruct(): Promise<TableStruct>
    getStruct(): TableStruct
    model2TableStruct(newModel: object): TableStruct
}
