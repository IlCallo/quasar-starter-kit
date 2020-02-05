module.exports = {
  root: true,

  {{#preset.typescript}}
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // See https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  {{/preset.typescript}}
  parserOptions: {
    {{#if preset.typescript}}
    // Needed to make the parser take into account 'vue' files
    // See https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    {{else}}
    parser: 'babel-eslint',
    {{/if}}
    sourceType: 'module'
  },

  env: {
    browser: true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    'eslint:recommended',

    {{#preset.typescript}}
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // consider disabling this class of rules if linting takes too long
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    {{/preset.typescript}}    

    // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules
    'plugin:vue/essential',

    {{#if_eq lintConfig "standard"}}
    '@vue/standard'
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    'airbnb-base'
    {{/if_eq}}
    {{#if_eq lintConfig "prettier"}}
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage-with-prettier
    // usage with Prettier, provided by 'eslint-config-prettier'.
    'prettier',
    {{#preset.typescript}}'prettier/@typescript-eslint',{{/preset.typescript}}
    'prettier/vue'
    {{/if_eq}}
  ],

  plugins: [
    {{#preset.typescript}}
    // required to apply rules which need type information
    '@typescript-eslint',

    {{/preset.typescript}}
    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    'vue',

    {{#if_eq lintConfig "prettier"}}
    // Prettier has not been included as plugin to avoid performance impact
    // see https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // add it as an extension for your IDE
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
    {{#if_eq lintConfig "standard"}}
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'one-var': 'off',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    {{/if_eq}}
    {{#if_eq lintConfig "airbnb"}}
    'no-param-reassign': 'off',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    {{/if_eq}}
    'prefer-promise-reject-errors': 'off',

    {{#preset.typescript}}
    // TypeScript
    'quotes': ['warn', 'single'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    {{/preset.typescript}}

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
