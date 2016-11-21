/**
 * PLUNKER VERSION (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  var config = { map: {}, packages: {}, bundles: {}, transpiler: '' };
  global.ENV = global.ENV || 'development';
  console.log(global.ENV);

  if (global.ENV === 'production') {
    config.transpiler = 'typescript',
      config.map = {
        'app': 'app', // this is where your transpiled files live
        '@angular': 'node_modules/@angular',
        'rxjs': 'node_modules/rxjs',
        'typescript': 'node_modules/typescript/lib/typescript.js'
      };
    config.packages = {
      'app': { main: 'main.js', format: 'cjs', defaultExtension: 'js' },
      'app/core': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/shared': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/strategy': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/trader': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/hero': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/crisis': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/login': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/admin': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },

      '@angular/core': { main: 'index.js' },
      '@angular/common': { main: 'index.js' },
      '@angular/compiler': { main: 'index.js' },
      '@angular/forms': { main: 'index.js' },
      '@angular/http': { main: 'index.js' },
      '@angular/platform-browser': { main: 'index.js' },
      '@angular/platform-browser-dynamic': { main: 'index.js' },
      '@angular/router': { main: 'index.js' },
      'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
      'rxjs': { defaultExtension: 'js' },
    };
    config.bundles = {
      'dist/index.js': ['app/*'],
      'dist/shared/index.js': ['app/shared/*'],
      'dist/core/index.js': ['app/core/*'],
      'dist/crisis/index.js': ['app/crisis/*'],
      'dist/hero/index.js': ['app/hero/*'],
      'dist/strategy/index.js': ['app/strategy/*'],
      'dist/trader/index.js': ['app/trader/*'],
      'dist/login/index.js': ['app/login/*'],
      'dist/admin/index.js': ['app/admin/*'],

      'dist/dependencies.js': [
        '@angular/core/index.js',
        '@angular/common/index.js',
        '@angular/compiler/index.js',
        '@angular/platform-browser/index.js',
        '@angular/platform-browser-dynamic/index.js',
        '@angular/http/index.js',
        '@angular/router/index.js',
        '@angular/forms/index.js',
        'angular2-in-memory-web-api/index.js',
        'rxjs/*', 'rxjs/scheduler/*', 'rxjs/add/*', 'rxjs/add/operator/*', 'rxjs/observale/*', 'rxjs/add/observable/*',
      ]
    }
  } else {
    config.map = {
      'app': 'app', // this is where your transpiled files live
      '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
      '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
      '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
      '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',

      'rxjs': 'node_modules/rxjs',
      'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api', // this is something new since angular2 rc.0, don't know what it does    
    };
    config.packages = {
      'app': { main: 'main.js', format: 'cjs', defaultExtension: 'js' },
      'app/core': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/shared': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/strategy': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/trader': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/hero': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/crisis': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/login': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },
      'app/admin': { main: 'index.js', format: 'cjs', defaultExtension: 'js' },

      'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
      'rxjs': { defaultExtension: 'js' },
    }
  }


  System.config(config);

})(this);

