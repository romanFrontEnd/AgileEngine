const fs = require( 'fs' );
const { promisify } = require( 'util' );
const readFile = promisify( fs.readFile );
const exists = promisify( fs.exists );
const { JSDOM } = require( 'jsdom' );

module.exports.getDom = async (filePath) => {
    try {
        if( await exists( filePath ) ) {
            const fileData = await readFile( filePath, "utf8" );
            if( !fileData ) {
                throw Error( 'File is empty' );
            }
            const domData = new JSDOM( fileData );
            if( !domData ) {
                throw Error( "Can't create dom from input file" );
            }
            const documentSrc = domData.window.document;
            if( !documentSrc ) {
                throw Error( 'Dom data is empty or errors in conversion' );
            }

            return documentSrc;
        }
    } catch (err) {
        console.log( "Error while reading or parsig file:" + ' path:' + filePath + ' ERROR = ' + err );
    }

    return null;
};