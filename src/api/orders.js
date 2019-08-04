

function orders(){

    let ordersDB = {};//用户的订单数据{user:【...】}
    ordersDB['admin']=[];

    return {
        addOrder(userName,orders){//orders = [['单品名称',[价格/图片/数量/分类],....]
            for(let i=0;i<orders.length;i++){
                // window.console.log(orders[i]);
                ordersDB[userName].push(orders[i]);
            }
            window.console.log('数据添加成功')
        },
        queryOrders(userName){
            return ordersDB[userName];
        },
        getOrders(){//返回所有用户订单
            return ordersDB;
        },
    }
}
export default orders;