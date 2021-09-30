<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </h1>
            <p class="text-xs-center">
              <nuxt-link v-if="isLogin" to="/register"
                >need an account?</nuxt-link
              >
              <nuxt-link v-else to="/login">Have an account?</nuxt-link>
            </p>

            <ul class="error-messages">
              <template v-for="(messages, errName) in err">
                <li
                  :key="errName + index"
                  v-for="(messages, index) in messages"
                >
                  {{ errName }} {{ messages }}
                </li>
              </template>
            </ul>

            <form @submit.prevent="handleSubmit">
              <fieldset v-if="!isLogin" class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  v-model="user.email"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                  minlength="8"
                  required
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                {{ isLogin ? "Sign in" : "Sign up" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user.js";
import { mapMutations } from "vuex";
// js-cookie 是 js 的操作 cookie 的包，仅在客户端渲染的情况下来引入

const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
        username: "",
      },

      err: {},
    };
  },

  components: {},

  computed: {
    isLogin() {
      return this.$route.path === "/login";
    },
  },

  mounted() {},

  methods: {
    ...mapMutations("user", ["setUserInfo"]),
    async handleSubmit() {
      try {
        let {data} = await (this.isLogin
          ? login({ user: this.user })
          : register({ user: this.user }));

        // 存储用户信息
        // 存储的用户信息不仅会在客户端渲染会用到，服务端渲染时也会用到
        // 1. 存储到 vuex 中，方便全局使用
        this.setUserInfo(data.user);

        // 2. 数据持久化
        Cookie.set('user', JSON.stringify(data.user))

        // 跳转页面到首页
        this.$router.push("/");
        console.log("表单提交", data);
      } catch (err) {
        this.err = err.response?.data?.errors || {};
        console.dir(err);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
</style>