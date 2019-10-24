import { AuthenticationContext, adalGetToken } from 'react-adal';
import { TOKEN_KEY } from './Constants';
const endpoint = '63876fed-e6e6-4d81-8e63-2ee58d201ef5';
const adalConfig = {
 tenant: `${process.env.REACT_APP_TENANT}`,
 clientId: `${process.env.REACT_APP_CLIENT_ID}`,
 endpoints: {
   api: endpoint
 },
 postLogoutRedirectUri: `${window.location.origin}`,
 redirectUri: `${window.location.origin}/signin-oidc`,
 clientSecret: `${process.env.REACT_APP_CLIENT_SECRET}`,
 cacheLocation: 'sessionStorage'
};

class AdalContext {
  private authContext: AuthenticationContext;
  constructor() {
    this.authContext = new AuthenticationContext(adalConfig);
  }

  get AuthContext() {
    return this.authContext;
  }

  public GetToken(): Promise<string | null> {  
    return  adalGetToken(this.authContext, endpoint);
  }
  public GetCacheToken = () => {
    return this.authContext.getCachedToken(this.AuthContext.config.clientId);
  }
  public Login() {
    this.AuthContext.handleWindowCallback();
    this.AuthContext.login();
  }
  public LogOut() {
    localStorage.removeItem(TOKEN_KEY);
    this.AuthContext.logOut();
  }
}
const adalContext: AdalContext = new AdalContext();
export default adalContext;