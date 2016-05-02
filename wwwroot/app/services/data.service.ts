﻿
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {ClusterCapacity} from './../models/clustercapacity';
import {ClusterNode} from './../models/clusternode';
import {Replica} from './../models/replica';
import {DeployedApplication} from './../models/deployedapplication';
import {DeployedService} from './../models/deployedservice';


@Injectable()
export class DataService {

    public constructor(private http: Http) {
    }

    private refreshInterval: number = 6;

    private apiUrl:string = "api/";

    public getApplicationModels(nodeName: string): Observable<DeployedApplication[]> {

        return Observable
            .interval(this.refreshInterval * 1000)
            .flatMap(() => this.http.get(this.apiUrl + 'application/' + nodeName).catch(this.handleError))
            .map(this.extractData)
            .catch(this.handleError)
    }

    
    public getClusterCapacity(): Observable<ClusterCapacity[]> {
        return Observable
            .interval(this.refreshInterval * 1000)
            .flatMap(() => this.http.get(this.apiUrl + 'cluster/capacity').catch(this.handleError))
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getNodes(): Observable<ClusterNode[]> {
        return Observable
            .interval(this.refreshInterval * 1000)
            .flatMap(() => this.http.get(this.apiUrl + 'node/capacity').catch(this.handleError))
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 400) {
            return null;
        }
        let body = res.json();
        return body;
    }

    private handleError(error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.log(errMsg); // log to console instead
        return Observable.empty();
    }
}

/*
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {ReplicaList, ServiceList, ClusterNodeList, ClusterCapacityList, ApplicationList} from './mocks/mock-data';
import {ClusterCapacity} from './../models/clustercapacity';
import {ClusterNode} from './../models/clusternode';
import {Replica} from './../models/replica';
import {DeployedApplication} from './../models/deployedapplication';
import {DeployedService} from './../models/deployedservice';

@Injectable()
export class DataService {

    public getApplicationModels(nodeName: string): Observable<DeployedApplication[]> {

        let result: DeployedApplication[] = [];

        for (let i = 0; i < ApplicationList.length; ++i) {
            let app: DeployedApplication = new DeployedApplication();
            app.application = ApplicationList[i];
            app.services = [];

            for (var item of ServiceList[app.application.name]) {
                let serviceModel = new DeployedService();
                serviceModel.service = item;
                serviceModel.replicas = ReplicaList[serviceModel.service.name];
                app.services.push(serviceModel);
            }

            result.push(app);
        }
        return Observable.of(result);
        
    }

    public getClusterCapacity(): Observable<ClusterCapacity[]> {
        return Observable.of(ClusterCapacityList);
    }

    public getNodes(): Observable<ClusterNode[]> {
        return Observable.of(ClusterNodeList);
    }
}
*/