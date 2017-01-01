import {CustomConfig} from 'ng2-ui-auth';

export const GOOGLE_CLIENT_ID = '369584861325-uiq5saup8bl9c9v87uo6arjn1hki36uh.apps.googleusercontent.com';
export class AuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {google: { clientId: GOOGLE_CLIENT_ID, url: "http://localhost:3125/auth/google" }};
}