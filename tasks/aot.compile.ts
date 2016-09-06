let gulp = require('gulp');
import 'reflect-metadata';
import * as ts from 'typescript';
import * as tsc from '@angular/tsc-wrapped';
import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { CodeGenerator } from '@angular/compiler-cli';

let config = require('../gulp.config')();
/*
function codegen(
    ngOptions: tsc.AngularCompilerOptions, program: ts.Program, host: ts.CompilerHost) {
    return CodeGenerator.create(ngOptions, program, host).codegen();
}

const copyFile = (name: string, from: string, to: string, mod: any = (f: string) => f) => {
    const file = readFileSync(join(from, name));
    writeFileSync(join(to, name), mod(file.toString()));
};

gulp.task('aot-compile', (done) => {
    tsc.main('./', undefined, codegen)
        .catch((e) => {
            console.error(e.stack);
            console.error('Compilation failed');
            process.exit(1);
       });
   done();
});
*/