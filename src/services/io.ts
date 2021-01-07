export default class IO {
    public static download( data: any, filename: string ) {
        const file = new Blob( [data], { type: 'text/plain' } );
        const a = document.createElement( 'a' );
        const url = URL.createObjectURL(file);

        a.href = url;
        a.download = filename;
        document.body.appendChild( a );
        a.click();

        setTimeout( () => {
            document.body.removeChild( a );
            window.URL.revokeObjectURL( url );
        }, 0);
    }
}
