import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AbstractSecurityStorage, AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment.development';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AuthModule.forRoot({
      config: {
        configId: 'main-config',
        authority: environment.idsvc,
        redirectUrl: window.location.origin + '/signin-oidc',
        postLogoutRedirectUri: window.location.origin,
        clientId: environment.client_id,
        scope: environment.scope,
        responseType: 'code',
        silentRenew: false,
        useRefreshToken: false,
        logLevel: LogLevel.Debug,
        customParamsCodeRequest: {
          client_secret: environment.client_secret,
        },
      },
    }),
  ]
})
export class AccountModule {}
