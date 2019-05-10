// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止在计算属性中对属性修改, 是具体情况而定，有时候可能会用到，列为warn；
    'vue/no-side-effects-in-computed-properties': 'off',

    // 计算属性必须有返回值
    'vue/return-in-computed-property': 'off',

    // 始终使用 === 替代 ==
    'eqeqeq': 'off',

    // 对于变量和函数名统一使用驼峰命名法。
    'camelcase': 'off',

    // 使用浏览器全局变量时加上 window. 前缀
    'no-undef': 'off',

    // 禁止不必要的转义
    'no-useless-escape': 'off',

    // 忽略某些不常规的闭合标签报错
    "vue/no-parsing-error":
      [
        2,
        { "x-invalid-end-tag": false }
      ],

    "no-unused-expressions": 'off',
    "no-sequences": 'off',
    "no-use-before-define": 'off',
    'vue/require-v-for-key': 'off',
    'vue/no-unused-vars': 'off',
    'no-unused-vars': 'off'
  }
}
