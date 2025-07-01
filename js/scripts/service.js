import {Subject} from `rxjs`;
import { fetchAPI } from "./config";


class callService{
    constructor(){
        this.callRec = [];
        this.call = new Subject();
    }

    async getCal(hora) {
        if(hora != null){
            try {
                const horaSessao = hora;
                const response = await fetchAPI(`chamada`, `POST`, {horaSessao: horaSessao})

                this.callRec = response;
                this.call.next(this.callRec);
                
            } catch (e) {
                console.log("horario invalido", e);                
            }
        }
    }
}