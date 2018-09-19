import Exception from "./exception";


export default class Interface  {
    exception;

    getException(){
        return this.exception
    }
    setException(exception){
        if( exception instanceof Exception){
            this.exception = exception
        }else{
            throw 'Interface Exception must be utils/Exception'
        }
    }
}
