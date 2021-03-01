// 使得一个类可绑定其他类
interface ClassBindable {
    BinderMap: Map<string, object>
}
// 使得一个类可以和数据库进行交互
interface DBServable {
    DBAddress: string
    DBOrigin: any
    start(): Promise<boolean>
    getTableCaller(TableName: string): Promise<object>
}
// 使得一个类成为数据库CRUD操作员
interface DBOperatable {
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
// 使得一个类成为数据库CRUD操作员
type DBTabler = {
    name: string
    struct: object
}
// 长链接通信格式
type WebSocketOrder = {
    connectionKey: string // 长链接Id
    orderName: string // 如CreateCMD等
    DTO: any
}
// 命令行通信格式
type CmdAnswer = {
    pid: number
    text: string
    html: string
}
