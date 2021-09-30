<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <nuxt-link
                    v-if="isLogin"
                    class="nav-link"
                    to="{name: 'Home', query: {}}"
                  >
                    Your Feed
                  </nuxt-link>
                </li>
                <li class="nav-item"></li>
                <li class="nav-item">
                  <nuxt-link
                    v-if="isLogin"
                    class="nav-link active"
                    to="{name: 'Home', query: {}}"
                  >
                    Global Feed
                  </nuxt-link>
                </li>

                <!-- tag 标签 -->
                <li class="nav-item" v-if="tag">
                  <nuxt-link
                    v-if="isLogin"
                    class="nav-link active"
                    to="{name: 'Home', query: {}}"
                  >
                    {{ `# ${tag}` }}
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div
              v-for="article in articles"
              :key="article.slug"
              class="article-preview"
            >
              <div class="article-meta">
                <nuxt-link
                  :to="{
                    name: 'Profile',
                    params: { username: article.author.username },
                  }"
                >
                  <img :src="article.author.image" />
                </nuxt-link>

                <div class="info">
                  <nuxt-link
                    class="author"
                    :to="{
                      name: 'Profile',
                      params: { username: article.author.username },
                    }"
                  >
                    {{ article.author.username }}
                  </nuxt-link>

                  <span class="date">{{ article.createdAt }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link
                class="preview-link"
                :to="{
                  name: 'Article',
                  params: { slug: article.slug },
                }"
              >
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>

            <!-- pagenation -->
            <nav>
              <ul class="pagination">
                <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
                <li
                  :class="['page-item', page === item ? 'active' : '']"
                  v-for="item in totalPage"
                  :key="item"
                >
                  <nuxt-link
                    class="page-link"
                    :to="{
                      name: 'Home',
                      query: {
                        page: item,
                        tag: $route.query.tag,
                      },
                    }"
                    >{{ item }}</nuxt-link
                  >
                </li>
                <!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
              </ul>
            </nav>
          </div>

          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <nuxt-link
                  class="tag-pill tag-default"
                  v-for="tag in tags"
                  :key="tag"
                  :to="{
                    name: 'Home',
                    query: {
                      tag: tag,
                    },
                  }"
                  >{{ tag }}</nuxt-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleList, getTagList } from "@/api/home.js";
import { mapState } from "vuex";
export default {
  name: "Home",
  watchQuery: ["page", "tag"],
  async asyncData({ query }) {
    // getArticleList 数据的请求方法在 asyncData 调用，还是在 mounted 中调用
    // 完全取决于是否要通过服务端渲染进行 seo 优 && 首屏加载。
    const page = Number.parseInt(query.page || 1);
    const limit = 20;
    const tag = query.tag;
    // offset 表示数据偏移量。 第一页数据偏移 0 ， 第二页 (page - 1 ) * pageSize
    const offset = (page - 1) * limit;

    // 获取文章list 跟获取 标签 list  请求无关联，所以是并行请求
    const [articleRes, tagRes] = await Promise.all([
      getArticleList({
        offset,
        limit,
        tag,
      }),
      getTagList(),
    ]);

    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;

    return {
      articles: articles,
      articlesCount: articlesCount,
      tags,
      limit,
      page,
      tag,
    };
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState("user", ["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    isLogin() {
      return this.user.token;
    },
  },

  mounted() {},

  methods: {},
};
</script>
<style lang='scss' scoped>
</style>