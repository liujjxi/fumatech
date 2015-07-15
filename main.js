require.config({
 baseUrl: '',
 shim: {
  $: {
      exports: 'zepto'
  },
  _: {
   exports: '_'
  },
  B: {
   deps: [
    '_',
    '$'
     ],
   exports: 'Backbone'
  }
 },
 paths: {
  '$': 'style/js/zepto',
  '_': 'style/js/underscore',
  'B': 'style/js/backbone'
 }
});
requirejs(['B'], function (b) {
});