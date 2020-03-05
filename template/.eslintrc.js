module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepo)
  root: true,

  env: {
    browser: true
  },

  // Configuration extensions order is important
  // CHANGE IT ONLY IF YOU KNOW WHAT YOU'RE DOING
  extends: [
    "quasar",

    {{#preset.typescript}}
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#recommended-configs
    // consider using "quasar/typescript" instead if linting takes too long
    // it will disable "plugin:@typescript-eslint/recommended-requiring-type-checking" rules group
    "quasar/typescript-with-type-checking",
    {{/preset.typescript}}    

    // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules
    'plugin:vue/essential',

    {{#if_eq lintConfig "standard"}}
    'quasar/style-standard',
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    'quasar/style-airbnb',
    {{/if_eq}}
    {{#if_eq lintConfig "prettier"}}
    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as ESLint plugin to avoid performance impact
    // it should be added as an extension to your IDE
    'quasar/style-prettier{{#preset.typescript}}-with-typescript{{/preset.typescript}}'
    {{/if_eq}}
  ],

  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true,
    'process': true,
    'Capacitor': true,
    'chrome': true
  },

  // add your custom rules here
  rules: {
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
