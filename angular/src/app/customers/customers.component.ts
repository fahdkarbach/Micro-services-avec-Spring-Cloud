import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers : any
  baseUrl="http://localhost:8889/CUSTOMER-SERVICE/"
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.http.get(this.baseUrl+"customers").subscribe({
      next : (data:object)=>{
        this.customers=data;
      },
      error:(err)=>{}
    });
  }

  getOrders(c:any){
    this.router.navigateByUrl("orders/"+c.id)
  }

  create(name:any,email:any):void{
    this.http.post<any>(this.baseUrl+"addcustomer",{
      name:name,
      email:email
    }).subscribe({
      next:()=>{
        alert('Customer Added');
        this.ngOnInit();
      }
    })
  }

  delete(id:any):void{
    this.http.delete(this.baseUrl+"deletecustomer/"+id).subscribe({
      next:()=>{
        alert('Customer Deleted');
        this.ngOnInit();
      }
    })
  }
}

