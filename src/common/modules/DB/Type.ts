//
export interface DBServable {
    DBAddress: string
    DBOrigin: any
    start(): Promise<boolean>
    getTableCaller(TableName: string): Promise<object>
}
export interface DBOperatable {
    TableName: string
    TableStruct: object
    TableCaller: object
    //
    init(TableName: string, newStruct: object): Promise<boolean>
    //
    create(doc: object): Promise<object>
    get(doc: object): Promise<object>
    query(doc: object): Promise<Array<object>>
    update(query: object, doc: object): Promise<object>
    delete(_id: string | number): Promise<boolean>
    //
    getOldStruct(): Promise<object>
    getStruct(): object
    model2TableStruct(newModel: object): object
}
//
export interface DBTabler {
    name: string
    struct: object
}
