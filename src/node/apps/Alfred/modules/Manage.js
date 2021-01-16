import Response from '../../../../database/Response.js'
import { exec } from 'child_process'
import websocket from 'nodejs-websocket'

export default class Manage {
    servers = {}
    constructor() {}

    // 构建完服务后 需要保存这个服务的名称/端口
    #setServers() {}

    // 获取所有服务
    #getServers() {}

    @Response('建立长链接成功')
    longLink(request, response) {}

    @Response('构建HTML成功')
    buildHTML(request, response) {}

    @Response('部署服务成功')
    buildServer(request, response) {}

    @Response('获取当前服务情况成功')
    getAlfredInfo(request, response) {}
}
