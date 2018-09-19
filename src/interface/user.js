import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class UserSelfInterface extends Interface {
    id;
    username;
    phone;
    profile;
    assets;

    constructor(param) {
        super()
        try {
            this.id = param.info.id
            this.nickname = param.info.nickname
            this.username = param.info.username
            this.profile = param.info.profile
            this.assets = param.info.assets
        } catch (e) {
            throw new Exception(e, 'UserSelfInterface interface attribute error')
        }
    }
}

export class UserAccessTokenInterface extends Interface {
    jti;
    iss;
    sub;
    iat;
    exp;

    constructor(param) {
        super()
        try {
            this.jti = param.jti
            this.iss = param.iss
            this.sub = param.sub
            this.iat = param.iat
            this.exp = param.exp
        } catch (e) {
            throw new Exception(e, 'UserAccessTokenInterface interface attribute error')
        }
    }
}

export class UserTokenInfoInterface extends Interface {
    access_token;
    expires_in;

    constructor(param) {
        super()
        try {
            this.access_token = param.access_token
            this.expires_in = param.nickname
        } catch (e) {
            throw new Exception(e, 'TokenInfoInterface interface attribute error')
        }
    }
}

export class UserEvaluatedListInterface extends Interface {
    constructor(param) {
        super()
    }
}
