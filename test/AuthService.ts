import { Amplify } from "aws-amplify";
import { SignInOutput, fetchAuthSession, signIn } from "@aws-amplify/auth";


const awsRegin = 'ap-south-1';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: 'ap-south-1_D5CRTzQgZ',
            userPoolClientId: 'o1ldroubhp1171nvuqh36a174'
        }
    }
});

export class AuthService {
    public async login(userName: string, password: string) {
        const signInOutput: SignInOutput = await signIn({
            username: userName,
            password: password,
            options: {
                authFlowType: 'USER_PASSWORD_AUTH'
            }
        })
        return signInOutput;
    }

    public async getIdToken() {
        const authSession = await fetchAuthSession();
        return authSession.tokens?.idToken?.toString();
    }
}