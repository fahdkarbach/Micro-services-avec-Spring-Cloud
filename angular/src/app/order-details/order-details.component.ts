import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails:any;
  orderId!:number;
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {
    this.orderId=route.snapshot.params['orderID']
  }

  ngOnInit(): void {
    this.http.get("http://localhost:8889/BILLING-SERVICE/fullBill/"+this.orderId).subscribe({
      next:(data:object)=>{
        this.orderDetails=data;
      },
      error:()=>{}
    })
  }


}
