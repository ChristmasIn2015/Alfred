<template>
    <div class="note">
        <div class="note-nav flex">
            <Button size="small" v-for="(area, index) in react.areas" :key="index" :type="react.areaIdPicked === area.id ? 'success' : 'default'">
                <span @click.stop="react.renderShelf(area.id)" @dblclick.stop="react.deleteArea(area)" @contextmenu="react.toggleArea(area)">{{
                    area.name
                }}</span>
            </Button>
            <Button size="small" type="success" @click.stop="react.toggleArea">+</Button>
        </div>
        <div class="note-nav flex">
            <Button size="small" v-for="(shelf, index) in shelfs" :key="index">{{ shelf.name }}</Button>
            <Button size="small" type="success" @click.stop="react.toggleShelf">+</Button>
        </div>
        <div class="note-nav flex">
            <Button size="small" v-for="(book, index) in books" :key="index">{{ book.name }}</Button>
            <Button size="small" type="success">+</Button>
        </div>
        <div class="block no-scroll-bar content"></div>

        <!-- 知识区域弹窗 -->
        <Modal v-model="react.areaModal" :title="react.areaModel.name ? `编辑${react.areaModel.name}` : '新增知识区'" width="350">
            <Form label-position="top">
                <FormItem label="区域名称">
                    <Input v-model="react.areaModel.name" placeholder="请输入区域名称" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.toggleArea">取消</Button>
                <Button type="success" @click.stop="react.commitMyArea">确定</Button>
            </div>
        </Modal>

        <!-- 书架弹窗 -->
        <Modal v-model="react.shelfModal" :title="react.shelfModel.name ? `编辑${react.shelfModel.name}` : '新增书架'" width="350">
            <Form label-position="top">
                <FormItem label="书架名称">
                    <Input v-model="react.shelfModel.name" placeholder="请输入书架名称" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.toggleShelf">取消</Button>
                <Button type="success" @click.stop="react.commitMyShelf">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import React from './React.js'
    export default {
        data() {
            return {
                react: new React(),
            }
        },
        computed: {
            shelfs() {
                return []
            },
            books() {
                return []
            },
        },
        methods: {
            test() {
                console.log(123)
            },
        },
    }
</script>

<style lang="scss" scoped>
    .note {
        height: 100%;
        .note-nav {
            .ivu-btn {
                margin: 0 0.5rem 0.5rem 0;
            }
        }
    }
</style>
