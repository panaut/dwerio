import { PersonalAccount } from './personal-account';
import { ActionPoint } from './action-point';
import { ActivationType } from './activation-types';

export class Permission {
    private _account: PersonalAccount;
    private _actionPoint: ActionPoint;

    public accountId: number;
    public actionPointId: number;
    public activationType: ActivationType;

    get account(): PersonalAccount {
        if (!this._account) {
            // load the account
        }

        return this._account;
    }

    get actionPoint(): ActionPoint {
        if (this._actionPoint) {
            // load the action point
        }

        return this._actionPoint;
    }

    constructor() {

    }
}
