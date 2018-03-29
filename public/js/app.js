'use strict';
const { getDom } = require( '../../assets/js/utils/parse-utils' );
const { FindById } = require( '../../assets/js/parsers/jsdomFindByIdParser' );
const { FindByCssQuery } = require( '../../assets/js/parsers/jsdomCssSelectParser' );
const {fromNode} =  require('simple-xpath-position') ;
const path  = require('path');


const SAMPLES_PATH = path.resolve(process.cwd() + '/public/js/', './samples/') + "\\";

//ENTRY POINT
if( process.argv.length > 2 ) {
    let queryMap = {};
    let filesToProcess = [];
    let argv = require( 'minimist' )( process.argv.slice( 2 ) );
    if( argv.inpt_files ) {
        filesToProcess = argv.inpt_files.split( " " );
    }
    if(!argv.id || !argv.cssQuery) {
        console.log( 'You should specify at list one selector --id "some_elem_ID" --cssQuery "some_css_query"' );
    }
    if (filesToProcess.length === 0) {
        console.log( 'You should specify at list one "html" from samples folder' );
    }
    if( filesToProcess.length > 0 && argv.id || argv.cssQuery ) {
        processFiles(filesToProcess, argv);
    }

} else {
    console.log( 'You should specify file name/s to parse and queries --id "some_elem_ID" --cssQuery "some_css_query"' );
}

async function processFiles(files, argv) {
    for( let filePath of files ) {
        await findElem( SAMPLES_PATH + filePath, argv.id, argv.cssQuery) ;
    }
}
async function findElem(path, id, cssQuery) {
    console.log( 'Processing file =>' + path  + ' id=' + id + ' cssQuery =' + cssQuery);
    let dom = await getDom( path );

    let foundedElemById = await FindById( dom, id );
    if(foundedElemById) {
        printResult(foundedElemById, dom );
    }
    let foundedElemByCssQuery = await FindByCssQuery( dom, cssQuery );
    if(foundedElemByCssQuery) {
        printResult(foundedElemByCssQuery, dom );
    }
    console.log( '____________________________________________________________________________' );

}

async function printResult(foundedElem, dom) {
    if( foundedElem && foundedElem.textContent ) {
        try {
            const xpathToNode = await fromNode(foundedElem, dom);
            console.log( `Successfully found element. Element path:` + xpathToNode);
        } catch(e) {
            console.log('Error while trying to get  Xpath' + e);
        }
    } else {
        console.log( 'No data found. Please check your selector or use more specific' );
    }
}

