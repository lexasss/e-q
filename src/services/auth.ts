export default class OAuth {

    public static signIn() {

        const form = OAuth.createForm(
            'https://accounts.google.com/o/oauth2/v2/auth',
            {
                client_id: OAuth.CLIENT_ID,
                redirect_uri: OAuth.URL,
                response_type: OAuth.RESPONSE_TYPE,
                scope: 'openid profile',
                include_granted_scopes: 'true',
                state: 'no-pass-through-value-is-used',     // custon message
                nonce: Array(16).fill( 0 ).map( () => Math.floor(Math.random() * 10) ).join(''),
                hd: 'Electronic questionnaire',
            },
        );

        form.submit();
    }

    public static load() {
        console.log( OAuth.URL );
        const resp = OAuth.getResponse();
        if (!resp) {
            return;
        }

        const params = OAuth.parseResponse( resp );

        if (params.error) {
            throw params.error;
        }
        else if (params.access_token) {
            return OAuth.requestProfile( params.access_token );
        }
        else {
            console.log( 'Unknown response' );
            console.log( params );
        }
    }


    private static CLIENT_ID = '66322499435-p14i1kgmotasts5jim6s524bgbq91oas.apps.googleusercontent.com';
    private static RESPONSE_TYPE = 'id_token token';    // 'code'
    private static URL = (() => {
        const url = location.origin + location.pathname;
        return url.slice( 0, -1 );
    })();

    private static getResponse() {
        let result = '';

        if (OAuth.RESPONSE_TYPE === 'code') {
            result = location.search.substring(1);
            if (result) {
                location.search = '';
            }
        }
        else {
            result = location.hash.substring(1);
            if (result) {
                location.hash = '';
            }
        }

        return result;
    }

    private static parseResponse( data: string ) {

        const params: Record<string, string> = {};
        const regex = /([^&=]+)=([^&]*)/g;
        let m = regex.exec( data );

        while (m) {
            params[ decodeURIComponent( m[1] ) ] = decodeURIComponent( m[2] );
            m = regex.exec( data );
        }

        return params;
    }

    private static createForm( endpoint: string, params: any ) {
        const form = document.createElement( 'form' );
        form.setAttribute( 'method', 'GET' ); // Send as a GET request.
        form.setAttribute( 'action', endpoint );

        for (const p in params) {
            const input = document.createElement( 'input' );
            input.setAttribute( 'type', 'hidden' );
            input.setAttribute( 'name', p );
            input.setAttribute( 'value', (params as any)[p] );
            form.appendChild( input );
        }

        document.body.appendChild( form );

        return form;
    }

    private static requestProfile( accessToken: string ) {
        return OAuth.sendRequest(
            'https://www.googleapis.com/userinfo/v2/me',
            {
                Authorization: 'Bearer ' + accessToken,
            },
        );
    }

    private static async sendRequest( url: string, headers: any ) {
        const response = await fetch( url, {
            method: 'GET',
            headers,
        });

        return response.json();
    }
}
