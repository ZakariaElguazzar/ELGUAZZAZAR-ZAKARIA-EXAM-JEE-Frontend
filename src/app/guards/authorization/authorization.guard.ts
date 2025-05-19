import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../../login.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const logService = inject(LoginService);
  const router = inject(Router);
  if (logService.roles.includes('ADMIN')){
    return true
  }
  router.navigateByUrl("/admin/notAuthorized");
  return false;
};

