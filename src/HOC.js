import React from "react";
import { UserAgentApplication } from "msal";

export const msalInstance = new UserAgentApplication({
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: process.env.REACT_APP_AUTORITY,
    redirectUri: "http://localhost:3000",
    validateAuthority: false,
    postLogoutRedirectUri: window.location.origin,
  },
});

export function withAuth(WrappedComponent) {
  return class Auth extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: false,
        renewIframe: false,
        hasError: false,
        errorMessage: null,
      };
    }
    componentWillMount() {
      msalInstance.handleRedirectCallback(
        (response) => {
          // on success
          this.setState({
            authenticated: true,
          });
        },
        (authErr, accountState) => {
          // on fail
          console.log(authErr);

          this.setState({
            hasError: true,
            errorMessage: authErr.errorMessage,
          });
        }
      );
      console.log(msalInstance.getAccount());

      if (!msalInstance.getAccount()) {
        this.setState({
          authenticated: false,
        });
        console.log(msalInstance.getAccount());
        msalInstance.loginRedirect({
          scopes: [process.env.REACT_APP_SCOPE],
        });
        return;
      } else {
        // logged in, set authenticated state and init pnpjs library
        this.setState({
          authenticated: true,
        });
      }
    }
    render() {
      if (this.state.authenticated === false) {
        return <div>Not Authenticated</div>;
      }
      if (this.state.authenticated === true) {
        return (
          <WrappedComponent
            {...this.props}
            logout={() => msalInstance.logout()}
          />
        );
      }
    }
  };
}
