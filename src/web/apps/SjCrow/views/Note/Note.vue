<template>
    <div class="note">
        <div class="note-nav flex">
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
                                <Button type="default" size="small" v-for="(book, __index) in shelf.books" :key="__index">{{ book.name }}</Button>
                                <Button type="success" size="small">
                                    <span class="fa fa-user"></span>
                                    <span>新增书籍</span>
                                </Button>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </Panel>
        </Collapse>
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
        }
        .note-books {
            .ivu-btn {
                margin-right: 0.5rem;
            }
        }
    }
</style>
