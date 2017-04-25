import { Injectable } from '@angular/core';

@Injectable()
export class AuthorizationService {

    constructor() {
    }

    /**
     * permission (name) checker
     * @param permissionNames
     * @returns {boolean}
     */
    hasPermissions(permissionNames:string[]) {
        if (!localStorage.getItem('authorization')) {
            return false;
        }

        let authorization = JSON.parse(localStorage.getItem('authorization'));

        for (let i in permissionNames) {
            let passed:boolean = false;
            for (let j in authorization.permissions) {
                if (authorization.permissions[j] === permissionNames[i]) {
                    passed = true;
                    break;
                }
            }

            if (passed != true) {
                return false;
            }
        }

        return true;
    }

    /**
     * permission (name) checker
     * @param permissionName
     * @returns {boolean}
     */
    hasPermission(permissionName:string) {
        return this.hasPermissions([permissionName]);
    }


    /**
     * role (name) checker
     * @param roleNames
     * @returns {boolean}
     */
    hasRoles(roleNames:string[]) {
        if (!localStorage.getItem('authorization')) {
            return false;
        }

        let authorization = JSON.parse(localStorage.getItem('authorization'));

        for (let i in roleNames) {
            let passed:boolean = false;
            for (let j in authorization.roles) {
                if (authorization.roles[j] === roleNames[i]) {
                    passed = true;
                    break;
                }
            }

            if (passed != true) {
                return false;
            }
        }

        return true;
    }

    /**
     * role (name) checker
     * @param roleName
     * @returns {boolean}
     */
    hasRole(roleName:string) {
        return this.hasRoles([roleName]);
    }


}
