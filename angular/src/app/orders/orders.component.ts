import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders:any;
  customerId!:number;
  products:any;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {
    this.customerId=route.snapshot.params['customerID']
  }

  getproducts():void{

  }

  ngOnInit(): void {
    this.http.get("http://localhost:8889/INVENTORY-SERVICE/products?projecton=fullProduct").subscribe({
      next: (data: object) => {
        this.products._embedded.products = data;
        console.log(this.products);
      }
    });

    this.http.get("http://localhost:8889/BILLING-SERVICE/bills/search/byCustomerID?projection=fullBill&customerID="+this.customerId).subscribe({
      next:(data:object)=>{
        this.orders=data;
      },
      error:()=>{}
    })
  }

  getOrderDetails(o:any){
    this.router.navigateByUrl("/orderdetails/"+o.id)
  }

}
