<template>
    <div class="note flex-y">
        <!-- 知识区域 -->
        <div class="note-nav flex">
            <Button
                size="small"
                v-for="(area, index) in react.areas"
                :key="index"
                :type="react.areaIdPicked === area.id ? 'success' : 'default'"
                @click.stop="react.renderShelfList(area.id)"
            >
                <span @dblclick="react.toggleArea(area)" @contextmenu="react.deleteArea(area)">{{ area.name }}</span>
            </Button>
            <Button size="small" @click.stop="react.toggleArea">添加区域</Button>
        </div>

        <!-- 书架列表 -->
        <div class="note-nav flex" v-show="react.areaIdPicked">
            <Button
                size="small"
                v-for="(shelf, index) in react.shelfs"
                :key="index"
                :type="react.shelfIdPicked === shelf.id ? 'success' : 'default'"
                @click.stop="react.renderBookList(shelf.id)"
            >
                <span @dblclick="react.toggleShelf(shelf)" @contextmenu="react.deleteShelf(shelf)">{{ shelf.name }}</span>
            </Button>
            <Button v-if="react.areaIdPicked" size="small" @click.stop="react.toggleShelf">添加书架</Button>
        </div>

        <!-- 书籍列表 -->
        <div class="note-book flex" v-show="react.shelfIdPicked">
            <div class="book-list no-scroll-bar">
                <draggable v-model="react.books" @end="reactTo('sortBooks')">
                    <div
                        class="book flex-middle-y"
                        v-for="(book, index) in react.books"
                        :key="index"
                        :class="react.bookIdPicked === book.id ? 'success' : 'default'"
                        @click.stop="react.renderBookContent(book)"
                    >
                        <span @dblclick="react.toggleBook($event, book)" @contextmenu="react.deleteBook(book)">{{ book.name }}</span>
                    </div>
                </draggable>
                <div v-if="react.bookIdPicked" class="book flex-middle-y success" @click.stop="react.commitMyBook">保存{{ react.bookModel.name }}</div>
                <div v-else class="book flex-middle-y" @click.stop="react.toggleBook($event)">添加书籍</div>
            </div>
            <div class="book-content">
                <quill-editor v-if="react.bookIdPicked" class="flex-y" v-model="react.bookModel.content" :options="react.editorConfig" />
            </div>
        </div>

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

        <!-- 书籍弹窗 -->
        <Modal v-model="react.bookModal" :title="react.bookModel.name ? `编辑${react.bookModel.name}` : '新增书籍'" width="350">
            <Form label-position="top">
                <FormItem label="书籍名称">
                    <Input v-model="react.bookModel.name" placeholder="请输入书籍名称" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click.stop="react.toggleBook($event)">取消</Button>
                <Button type="success" @click.stop="react.commitMyBook">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    // 富文本
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor'
    // 拖拽
    import draggable from 'vuedraggable'
    //
    import React from './React.js'
    export default {
        components: {
            quillEditor,
            draggable,
        },
        data() {
            return {
                react: new React(),
            }
        },
        methods: {
            reactTo(methodName, params) {
                this.react[methodName](params)
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import './Note.scss';
</style>
<style lang="scss">
    @import './quill-editor-reset.scss';
</style>
