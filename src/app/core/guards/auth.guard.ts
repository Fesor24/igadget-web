import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);

  return accountService.user$.pipe(
    map(user => {
      if(user.isAuthenticated){
        return true
      }
      else{
        accountService.login();
        return false;
      }
    })
  )
};
