import * as React from 'react';
import axios from 'axios';
// import SockJsClient from 'react-stomp';
import { Client, StompSubscription } from '@stomp/stompjs';

import { plainToInstance } from 'class-transformer';
import moment from 'moment';

import { HihesNode } from './lib/node/HihesNode';
import { Vehicle } from './lib/traffic/Vehicle';
import { MapFile } from './lib/traffic/MapFile';
import { VehicleInfoTrafficDetectorDto } from './lib/traffic/VehicleInfoTrafficDetectorDto';
import { TrafficDetector } from './lib/traffic/TrafficDetector';
import { LocationGeneric } from './lib/traffic/LocationGeneric';

import { Toggler } from './lib/libNt/_useful/JsUtil_Nt.js';

import styles from './App.module.css';
import './lib/libNt/_general/basicCss_Nt.css';
import cssCp from './lib/libNt/_useful/cssClassAsPropAndToggle.module.css';
import cssPanel from './lib/libNt/panelHtse/panelHtse_general_Nt.module.css';
import { Point } from './lib/shape/Point';

// ############
// ############

// const arr_vehicle: Vehicle[] = [];
// let i = 0;
// let vehicleCreationTime: Date;
// let vehicle: Vehicle;
//

const SearchContext = React.createContext({
  stateRt_arr_SearchedVehicle: new Array<Vehicle>(),
  setstateRt_arr_SearchedVehicle: (e: Vehicle[]) => {}, // just for type not actually using it
});

// ############

const url_lh = 'http://localhost:8080';
const url_vu = '/v0.1/user';
const url = url_lh + url_vu;

const ws_to_connect = '/ws_to_connect';
const SOCKET_URL = 'ws://localhost:8080' + ws_to_connect;

const ws_BrokerTopic_ServerPubClientSub = '/topic';
const ws_BrokerTopic_ClientPubServerSub = '/app';
const ws_TopicFolder_cpss_AA = '/cpss_msg';
const ws_TopicFolder_spcs_AA = '/spcs_msg';
const ws_client_pub_folder_AA = ws_BrokerTopic_ClientPubServerSub + ws_TopicFolder_cpss_AA;
const ws_client_sub_folder_AA = ws_BrokerTopic_ServerPubClientSub + ws_TopicFolder_spcs_AA;
const url_http_endpoint_delegate_to_ws = url_lh + '/http_endpoint_delegate_to_ws';

const topic_PosOfVehicle = '/topic_PosOfVehicle';
const topic_VehicleInfoTrafficDetectorDto = '/topic_VehicleInfoTrafficDetectorDto';
const wsSub_PosOfVehicle = ws_BrokerTopic_ServerPubClientSub + topic_PosOfVehicle;
const wsSub_VehicleInfoTrafficDetectorDto = ws_BrokerTopic_ServerPubClientSub + topic_VehicleInfoTrafficDetectorDto;

let subscription_PosOfVehicle: StompSubscription | null = null;
let subscription_VehicleInfoTrafficDetectorDto: StompSubscription | null = null;

const ws_ClientOption = {
  brokerURL: SOCKET_URL,
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
  // onConnect: onConnected,
  // onDisconnect: onDisconnected,
};

const client_MsgWsTest = new Client(ws_ClientOption);
const client_PosOfVehicle = new Client(ws_ClientOption);
const client_VehicleInfoTrafficDetectorDto = new Client(ws_ClientOption);

function App() {
  // #>>
  const [count, setCount] = React.useState(0);

  // #>>
  const [sceneMainContent, setStateRt_sceneMainContent] = React.useState(SceneMainContent.Home);

  // #>>
  const [stateRt_arrVehicle, setStateRt_arrVehicle] = React.useState(new Array<Vehicle>());

  const get_arrVehicle = React.useCallback(async () => {
    console.log('>> get_arrVehicle() useCallback');
    try {
      const methodLinkName = 'getGpVehicleInVehicleInventory';
      const result = await axios.get(url + '/' + methodLinkName);
      console.log(result.data);
      // https://stackoverflow.com/questions/22875636/how-do-i-cast-a-json-object-to-a-typescript-class
      const arrVehicle = plainToInstance(Vehicle, result.data);
      // nice empty ok
      if (arrVehicle === null || arrVehicle === undefined) { throw new TypeError(); } // prettier-ignore
      setStateRt_arrVehicle(arrVehicle);
    } catch (err) {
      throw new Error('' + err);
    }
  }, []);

  React.useEffect(() => {
    // aga said should use some kind aof login mechanism
    get_arrVehicle();
  }, []);

  // #>>
}

// ############

type SearchFormProps = {
  searchFor_Item: string;
  execOnInput_Search_Item: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ searchFor_Item: searchFor_Item, execOnInput_Search_Item: execOnSearchItemInput }) => (
  <>
    <label>Search Brand: </label>
    <input type="text" onChange={execOnSearchItemInput} />
  </>
);

// ####

type ListProps = {
  list: Vehicle[];
};

const List: React.FC<ListProps> = ({ list }) => (
  <ul>
    {list.map((item) => (
      <li key={item.idBsi}>
        <span>{item.idBsi}</span>
        <span>{item.vehicleNum}</span>
        <span>{item.vehicleType}</span>
        <span>{item.brandVehicle}</span>
      </li>
    ))}
  </ul>
);

const Table: React.FC<ListProps> = ({ list }) => {
  // const keys = Object.keys(list);

  return (
    <table>
      <thead>
        <tr>
          {/* <th>{getPropertyName(list[0], (vehicle) => vehicle.idBsi)}</th>
          <th>{getPropertyName(list[0], (vehicle) => vehicle.vehicleNum)}</th>
          <th>{getPropertyName(list[0], (vehicle) => vehicle.vehicleType)}</th>
          <th>{getPropertyName(list[0], (vehicle) => vehicle.brandVehicle)}</th> */}
          <th>{'idSql'}</th>
          <th>{'idBsi'}</th>
          <th>{'vehicleNum'}</th>
          <th>{'vehicleType'}</th>
          <th>{'brandVehicle'}</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.idBsi}>
            <td>{item.idSql}</td>
            <td>{item.idBsi}</td>
            <td>{item.vehicleNum}</td>
            <td>{item.vehicleType}</td>
            <td>{item.brandVehicle}</td>
          </tr>
        ))}
      </tbody>
      <caption>Table of Items</caption>
    </table>
  );
};

// ############
// ############

// function getPropertyName<T extends object>(o: T, expression: (x: { [Property in keyof T]: string }) => string) {
//   const res = {} as { [Property in keyof T]: string };
//   Object.keys(o).map((k) => (res[k as keyof T] = k));
//   return expression(res);
// }

// ############
// ############

export default App;
