<template>
    <div class="note">
        <div class="note-nav flex-middle-y">
            <Input placeholder="请输入区域名称" />
            <Button type="success" size="small">
                <span class="fa fa-user"></span>
                <span>新增知识区域</span>
            </Button>
        </div>
        <!-- 1 区块 -->
        <Collapse v-model="blockIndex">
            <Panel v-for="(block, index) in blockList" :key="index" :name="index.toString()">
                {{ block.name }}
                <div slot="content">
                    <!-- 2 书架 -->
                    <Collapse>
                        <Panel v-for="(shelf, _index) in block.shelf" :key="_index">
                            {{ shelf.name }}
                            <div class="note-books" slot="content">
                                <!-- 3 书籍 -->
                                <div class="note-books-create flex-middle-y">
                                    <Input placeholder="请输入书籍名称" />
                                    <Button type="default" size="small">
                                        <span class="fa fa-user"></span>
                                        <span>新增书籍</span>
                                    </Button>
                                </div>
                                <Button type="success" size="small" v-for="(book, __index) in shelf.books" :key="__index">{{ book.name }}</Button>
                            </div>
                        </Panel>
                    </Collapse>
                    <div class="note-shelf-create flex-middle-y">
                        <Input placeholder="请输入书籍名称" />
                        <Button type="default" size="small">
                            <span class="fa fa-user"></span>
                            <span>新增书架</span>
                        </Button>
                    </div>
                </div>
            </Panel>
        </Collapse>

        <div class="note-tip">数据来源: 本机数据</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                blockIndex: '0',
                blockList: [
                    {
                        name: '知识区域1',
                        shelf: [
                            { name: '书架1', books: [{ name: '书1', content: 'C://AAAA//bvvv.js' }] },
                            { name: '书架1', books: [{ name: '书1', content: 'C://AAAA//bvvv.js' }] },
                        ],
                    },
                    {
                        name: '知识区域2',
                        shelf: [
                            { name: '书架1', books: [{ name: '书1', content: 'C://AAAA//bvvv.js' }] },
                            { name: '书架1', books: [{ name: '书1', content: 'C://AAAA//bvvv.js' }] },
                            { name: '书架1', books: [{ name: '书1', content: 'C://AAAA//bvvv.js' }] },
                        ],
                    },
                ],
            }
        },
        mounted() {},
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .note {
        .note-nav {
            margin-bottom: 1rem;
            .ivu-input-wrapper {
                width: 20rem;
                margin-right: 1rem;
            }
        }
        .note-books {
            .ivu-btn {
                margin: 0.5rem 0.5rem 0.5rem 0;
            }
        }
        .note-tip {
            color: $font-0;
        }
    }
    .note-shelf-create,
    .note-books-create {
        .ivu-input-wrapper {
            width: 10rem;
            margin-right: 0.5rem;
        }
    }
</style>
