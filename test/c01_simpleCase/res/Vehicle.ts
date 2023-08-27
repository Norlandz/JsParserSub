// import { Transform, Type } from 'class-transformer';
// import 'reflect-metadata';

// import { Point } from '../shape/Point';

class Vehicle {
  idSql: number;
  idBsi: string;
  // @Type(() => Date)
  vehicleCreationTime: Date;
  vehicleNum: string;
  // @Type(() => Point)
  // posActual: Point | null = null;
  speedActual: number;

  constructor(idSql: number, idBsi: string, vehicleCreationTime: Date, vehicleNum: string, speedActual: number) {
    this.idSql = idSql;
    this.idBsi = idBsi;
    this.vehicleCreationTime = vehicleCreationTime;
    this.vehicleNum = vehicleNum;
    // this.posActual = posActual;
    this.speedActual = speedActual;
  }

  vehicleType: string | null = null;

  brandVehicle: string | null = null;

  /**
   * Test block
   * @param vehicleType
   * @param brandVehicle
   */
  initMore(vehicleType: string, brandVehicle: string) {
    this.vehicleType = vehicleType;
    this.brandVehicle = brandVehicle;
  }

  /* 
  test block 1
  test block 2
  test block 3
  */
  amountPplActual: number | null = null;

  amountLimitMaxPpl: number | null = null;

  /* 
  test block 1
  test block 2 // nest c1
  // nest c2 
  /*  half 
  test block 3
  */
  amountWeightActual: number | null = null;

  // test line /* reverse nest */

  amountLimitMaxWeight: number | null = null;
  // @Type(() => Date)
  dateIntegrityVerifiedLastTime: Date | null = null;

  // ########

  // posSelf: Point | null = null;
  // posGoto: Point | null = null;
  // posSelf: Point | undefined;
  // posGoto: Point | undefined;
}

// export { Vehicle };

const vehicle = new Vehicle(1, 'Alpha', new Date(), 'EE001', 0.3);

console.log(vehicle.vehicleNum);

console.log(/* hello */ 'world');

console.log(/* html */ `
<p>// this is not a comment, test</p>
<!-- html comment -->
<span>sss</span> 
// broken comment
`);

console.log(' log // string comment ');

console.log(111);
