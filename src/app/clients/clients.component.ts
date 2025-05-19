import {Component, OnInit} from '@angular/core';
import {Client} from '../model/model';
import {catchError, map, Observable, throwError} from 'rxjs';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ClientService} from '../client.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-clients',
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit{
  private clients !: Observable<Array<Client>>;
  private searchFormGroup !: FormGroup;
  // private messageError : String | undefined;
  //private messageError : String | null=null;
  private messageError !: Object;
  constructor(private clientService : ClientService,private fb : FormBuilder) {
  }
  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    });
    this.handleSearchFormSubmit();
  }

  public getClients(){
    return this.clients;
  }
  public getMessageError(){
    return this.messageError;
  }
  public getSearchFormGroup(){
    return this.searchFormGroup;
  }

  handleSearchFormSubmit() {
    // ? verify if the value exist before searching
    this.clients=this.clientService.searchCustomer(this.searchFormGroup?.value.keyword).pipe(
      catchError(err => {
        this.messageError=err.message;
        return throwError(() => err);
      })
    );
  }

  handleDeleteCustomer(client: Client) {
    return this.clientService.deleteCustomer(client.id).subscribe(
      {
        next: () =>{
          this.clients=this.clients.pipe(
            map(data=>{
              data.slice(data.indexOf(client),1)
              return data
            })
          )
        },
        error : (err) => {
          this.messageError=err;
        }
      }
    );
  }

}
