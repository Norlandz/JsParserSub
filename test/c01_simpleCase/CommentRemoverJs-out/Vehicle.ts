                                                       
                             

                                          

class Vehicle {
  idSql: number;
  idBsi: string;
                      
  vehicleCreationTime: Date;
  vehicleNum: string;
                       
                                    
  speedActual: number;

  constructor(idSql: number, idBsi: string, vehicleCreationTime: Date, vehicleNum: string, speedActual: number) {
    this.idSql = idSql;
    this.idBsi = idBsi;
    this.vehicleCreationTime = vehicleCreationTime;
    this.vehicleNum = vehicleNum;
                                  
    this.speedActual = speedActual;
  }

  vehicleType: string | null = null;

  brandVehicle: string | null = null;

     
               
                       
                        
     
  initMore(vehicleType: string, brandVehicle: string) {
    this.vehicleType = vehicleType;
    this.brandVehicle = brandVehicle;
  }

     
              
              
              
    
  amountPplActual: number | null = null;

  amountLimitMaxPpl: number | null = null;

     
              
                         
             
           
              
    
  amountWeightActual: number | null = null;

                                 

  amountLimitMaxWeight: number | null = null;
                      
  dateIntegrityVerifiedLastTime: Date | null = null;

             

                                  
                                  
                                
                                
}

                      

const vehicle = new Vehicle(1, 'Alpha', new Date(), 'EE001', 0.3);

console.log(vehicle.vehicleNum);

console.log(            'world');

console.log(           `
<p>// this is not a comment, test</p>
<!-- html comment -->
<span>sss</span> 
// broken comment
`);

console.log(' log // string comment ');

console.log(111);
