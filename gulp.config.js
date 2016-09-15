module.exports = function () {

    const _appPath = 'app/';
    const _buildPath = 'dist/';
    const _tmpPath = 'dist/tmp/';
    

    const _tsFiles = [
        _appPath + '**/!(*.spec)+(.ts)'
    ];
    const _typingFiles = [
        'typings/index.d.ts',
    ];
    const _tslintRuleFiles = [
        'tslint-rules/*.ts',
    ];

    const _appBundles = [        
        { moduleName: 'strategy', modulePath: _appPath +  "strategy/" },
        { moduleName: 'hero', modulePath:  _appPath + "hero/" },
        { moduleName: 'crisis', modulePath:  _appPath + "crisis/" },
        { moduleName: 'login', modulePath: _appPath + "login/" },        
        { moduleName: 'main', modulePath:  _appPath, isMain: true },
    ];

    const config = {
        appBundles: _appBundles,
        appPath: _appPath,
        buildPath: _buildPath,
        tempPath: _tmpPath,
        tsFiles: _tsFiles,
        typingFiles: _typingFiles,
        tsintRuleFiles: _tslintRuleFiles,
    };

    return config;
};
