// city.detail.component.ts
import {Component, OnDestroy, OnInit} from '@angular/core';
import {City} from "./city.model";
// import {RouteParams} from "@angular/router"; // OLD way
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'city-detail',
	template: `<h1>City Detail</h1>
	<h2>Details voor city: {{ id }}</h2>
	<!-- TODO: 'real' lookup of city in db -->
	`
})

export class CityDetailComponent implements OnInit, OnDestroy{
	id:string;
	currentCity:City;
	private sub : any ; // pointer to subscription on Route

	constructor(private route:ActivatedRoute) {
		// Credits: http://blog.thoughtram.io/angular/2016/06/14/routing-in-angular-2-revisited.html
		// ActivatedRoute comes with a 'params' property which is an Observable.
		// To access the property 'id', all we have to do is to subscribe to
		// the parameters Observable changes.
	}

	ngOnInit() {
		// OLD:
		// this.id = this.route.get('id');

		// NEW:
		this.sub = this.route.params
			.map(params => params['id'])
			.subscribe((id) => {
				this.id = id;
			});

		// OR:
		// Work via Router-snapshot:
		// Sometimes we’re not interested in future changes of a route parameter.
		// All we need the id and once we have it, we can provide the data we want to provide.
		// In this case, an Observable can bit a bit of an overkill.
		// A *snapshot* is simply a snapshot representation of the activated route.
		// this.id = this.route.snapshot.params['id'];
	}

	ngOnDestroy(){
		// If subscribed, we must unsubscribe before Angular destroys the component.
		// Failure to do so could create a memory leak.
		this.sub.unsubscribe();
	}

}
