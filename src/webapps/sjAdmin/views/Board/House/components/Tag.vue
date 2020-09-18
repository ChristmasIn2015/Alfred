<template>
  <div class="sj-modal-right flex right-scroll-off" :class="{ 'right-scroll-on': boardShow }">
    <div class="left" @click.stop="boardShow = false"></div>
    <div class="right">
      <div class="card flex-y">
        <div class="title flex">
          <div>{{ boardType === 'plug' ? '规格' : '单位' }}</div>
          <div class="flex" style="margin-left:auto;">
            <div
              class="sj-btn"
              style="margin-right: 0.25rem"
              @click.stop="editShow = !editShow"
            >{{ editShow ? '关闭编辑': '打开编辑' }}</div>
            <div class="sj-btn" @click.stop="tagPickAction">确定</div>
          </div>
        </div>
        <div class="box-table">
          <div class="row">
            <div class="column">
              <input
                type="number"
                v-model="newTagValue"
                :placeholder="boardType === 'plug' ? '规格值' : '单位值'"
              />
            </div>
            <div class="column">
              <input v-model="newTagName" :placeholder="boardType === 'plug' ? '规格名称' : '单位名称'" />
            </div>
            <div class="column">
              <div
                class="sj-btn blue"
                style="margin: 0rem;"
                @click.stop="createMyTag"
              >新增{{ boardType === 'plug' ? '规格' : '单位' }}</div>
            </div>
          </div>
          <div class="row">
            <div class="column" v-if="boardType === 'plug'">
              <div
                v-for="(tag, index) in gobalTagList"
                :key="index"
                class="sj-btn tag tip-on"
                :class="{ 'tip': tag.checked }"
                @click.stop="tag.checked = !tag.checked"
              >
                <span>{{ tag.value + ' ' + tag.name }}</span>
                <span v-show="editShow" class="close" @click.stop="deleteMyTagConfirm(index)"></span>
              </div>
            </div>
            <div class="column" v-if="boardType === 'count'">
              <div
                v-for="(tag, index) in gobalCountTagList"
                :key="index"
                class="sj-btn tag tip-on"
                :class="{ tip: tag.checked }"
                @click.stop="tag.checked = !tag.checked"
              >
                <span>{{ tag.value + ' ' + tag.name }}</span>
                <span v-show="editShow" class="close" @click.stop="deleteMyTagConfirm(index)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// * 这个组件用于展示和选择
// * 商品单位 * 1
// * 商品规格 * N
import { createTag, getTagList, deleteTag } from "@/common/api/apis_sjAdmin.js";
export default {
  data() {
    return {
      boardType: "plug",
      goodId: -1,
      boardShow: false,
      newTagName: "",
      newTagValue: "",
      gobalTagList: [],
      gobalCountTagList: [],
      editShow: false,
    };
  },
  methods: {
    tagPickAction() {
      if (this.boardType === "plug") {
        this.$emit("tagPickAction", {
          list: JSON.parse(JSON.stringify(this.gobalTagList)),
          boardType: "plug",
        });
      }
      if (this.boardType === "count") {
        this.$emit("tagPickAction", {
          list: JSON.parse(JSON.stringify(this.gobalCountTagList)),
          boardType: "count",
        });
      }
      this.boardShow = false;
    },
    toShow(goodId, list, boardType) {
      this.goodId = goodId;
      this.boardType = boardType;
      this.boardShow = true;
      if (boardType === "plug") this.getMyTagList(goodId, list); // ASYNC
      if (boardType === "count")
        this.gobalCountTagList = Object.assign([], list);
    },
    // * 新增标签
    async createMyTag() {
      try {
        if (this.boardType === "plug") {
          if (!this.newTagName) throw new Error("规格名称不能为空");
          if (!this.newTagValue) throw new Error("规格值不能为空");
          await createTag(-1, this.newTagName, this.newTagValue);
          this.getMyTagList(-1); // ASYNC
        }
        if (this.boardType === "count") {
          this.gobalCountTagList.push({
            name: this.newTagName,
            value: this.newTagValue,
            checked: false,
          });
        }
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 获取标签列表
    async getMyTagList(goodId, tempList) {
      try {
        let list = await getTagList(goodId);
        tempList = tempList || [];

        // * 和传入的列表进行对比
        list.forEach((e) => {
          if (!e["checked"]) e["checked"] = false;
          for (let i = 0; i < tempList.length; i++) {
            if (e._id === tempList[i]._id) {
              e.checked = true;
              break;
            }
          }
        });

        //
        this.gobalTagList = Object.assign([], list);
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
    // * 删除标签
    async deleteMyTagConfirm(index) {
      $confirm({ title: "提示", content: "确定要删除吗" }, (answer) => {
        if (answer) this.deleteMyTag(index);
      });
    },
    async deleteMyTag(index) {
      try {
        //
        if (this.boardType === "plug") {
          await deleteTag(this.gobalTagList[index]._id);
          this.getMyTagList(-1); // ASYNC
        }
        if (this.boardType === "count") {
          this.gobalCountTagList.splice(index, 1);
        }
      } catch (error) {
        $tip(error);
        $warn(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
