<template>
  <!-- 新增或是编辑文章 -->
  <div>
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <form @submit.prevent="handleAddForm">
              <fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="article.title"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    v-model="article.description"
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model="article.body"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                  />
                  <div class="tag-list"></div>
                </fieldset>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click="handleAddForm"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addArticle } from "@/api/article.js";
export default {
  name: "CreateOrEdit",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    async handleAddForm() {
      const { data } = await addArticle({ article: this.article });
      console.log("添加新文章");
    },
  },
};
</script>
<style lang='scss' scoped>
</style>