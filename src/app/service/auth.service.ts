import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set("Authorization", environment.token)
  }

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set("Authorization", environment.token)
    }
  }

  entra(usuariorLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>("https://bplnbentes.herokuapp.com/usuario/logar", usuariorLogin);
  }

  cadastra(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>("https://bplnbentes.herokuapp.com/usuario/cadastrar", usuario);
  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://bplnbentes.herokuapp.com/usuario/${id}`, this.token)
  }

  logado(){
    let ok: boolean = false;
    if(environment.token != ""){
      ok = true;
    }
    return ok;
  }

}
