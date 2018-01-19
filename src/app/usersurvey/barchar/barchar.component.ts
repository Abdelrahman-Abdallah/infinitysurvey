import { Component, OnInit , ElementRef , ViewChild , Input , AfterViewInit} from '@angular/core';
//import * as d3 from 'd3';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-barchar',
  templateUrl: './barchar.component.html',
  styleUrls: ['./barchar.component.css']
})
export class BarcharComponent implements OnInit , AfterViewInit{

  @ViewChild('chart', {read: ElementRef}) chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private title: any = '';

  public context: CanvasRenderingContext2D;

  canvas: any = '';
  ctx: any = '';
  lable: any = [];
  chartdata: any = [];
  constructor() { }
  // used to create the chart body
  // private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  // private chart: any;
  // private width: number;
  // private height: number;
  // private xScale: any;
  // private yScale: any;
  // private colors: any;
  // private xAxis: any;
  // private yAxis: any;


  ngOnInit() {
    // this.createChart();
     console.log(this.data);
    
  }
  ngAfterViewInit() {
    this.lable = [];
    this.chartdata = [];
    for (let n = 0; n < this.data.length; n++){
      this.lable.push(this.data[n].answer);
      this.chartdata.push(this.data[n].count);

    }
     const data1111 = {
      labels: this.lable,
      datasets: [
          {
              label: this.title,
              // backgroundColor: "rgba(255,99,132,0.2)",
              backgroundColor: "#1c98d0",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: this.chartdata,
          }
      ]
  };
  const option = {
      animation: {
              duration: 1000
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
    };
  const myBarChart = Chart.Bar(this.chartContainer.nativeElement, {
    data: data1111,
    options: option
  });
  }
  // createChart() {

  //   const element = this.chartContainer.nativeElement;
  //   this.width = element.offsetWidth - this.margin.left - this.margin.right;
  //   this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
  //   const svg = d3.select(element).append('svg')
  //     .attr('width', element.offsetWidth)
  //     .attr('height', element.offsetHeight);

  //   // chart plot area
  //   this.chart = svg.append('g')
  //     .attr('class', 'bars')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

  //   // define X & Y domains
  //   const xDomain = this.data.map(d => d[0]);
  //   const yDomain = [0, d3.max(this.data, d => d[1])];

  //   // create scales
  //   this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
  //   this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

  //   // bar colors
  //   this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

  //   // x & y axis
  //   this.xAxis = svg.append('g')
  //     .attr('class', 'axis axis-x')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
  //     .call(d3.axisBottom(this.xScale));
  //   this.yAxis = svg.append('g')
  //     .attr('class', 'axis axis-y')
  //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
  //     .call(d3.axisLeft(this.yScale));

  // }


   /*createChart() {
    let padding = 25;
    let element = this.chartContainer.nativeElement;
    let w = 600;
		let h = 300;

    let svg = d3.select(element).append('svg');
    let xScale = d3.scale.ordinal()
            .domain(d3.range(this.data.length))
            .rangeRoundBands([ padding, padding ], 0.1); // gap bt bars

    let yScale = d3.scale.linear()
            .domain([ 0, d3.max(this.data) ])
            .rangeRound([h- padding, w - padding ]);

		//Configure y axis generator
    let yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .ticks(6);

            let groups = svg.selectAll('g')
						.data(this.data['count'])  // bind data to the group
						.enter()
						.append('g')
            .attr('class', 'bar')
            .attr('transform', function(d, i) {
              return 'translate(' + xScale(i) + ',0)';
            })
            .on('mouseover', function(d) {

							d3.select(this)
                .classed('highlight', true);
                var x = d3.event.pageX;
              var y = d3.event.pageY - 40;
              d3.select('#tooltip') 
								.style('left', x + 'px') // with tooltips define top left corner
								.style('top', y + 'px')
								.style('opacity', 1)
                .text(d);
              })
              .on('mouseout', function() { 

                d3.select(this)
                  .classed('highlight', false);  // no longer has class highlight
  
                //Hide the tooltip - revert back to invisible
                d3.select('#tooltip')
                  .style('opacity', 0);
  
              });

              let rects = groups.append('rect')
						  .attr('x', 0)
						  .attr('y', function(d) {
						  		return  h - padding;
						  })
						  .attr('width', xScale.rangeBand())
						  .attr('height', 0)
						  .attr('fill', '#4400ff');   //initial color

		//Add label to each group
          groups.append('text')
            .attr('x', xScale.rangeBand() / 2)
            .attr('y', function(d) {
              return yScale(d) + 14;
            })
            .text(function(d) {
              return d;
            })

		//Transition rects into place
          rects.transition()
            .delay(function(d, i) {  //kind of goes in order left to right
              return i * 100; 
            })
            .duration(1500)
            .attr('y', function(d) {
              return yScale(d);
            })
            .attr('height', function(d) {
              return  h- padding - yScale(d);
            })
            .filter(function(d) {  // filter and if true do following
              if (d > 20) {
                return true;
              }
              return false;
            })
            .attr('fill', '#84eeff')
            // change fill if above is true- this is not a color that is designated by css - it is done by javascript
      // add another class here by which can change hover only for high value highlighted?
            .attr('class', 'filtereddata') // adds class *only* to the rect part of filtered <g>
          ;

           //Create y axis
          svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + padding + ',0)')  //location y-axis
            .attr('opacity', 0) // initially invisible
            .call(yAxis)
            .transition()  // transitions in
            .delay(2000)
            .duration(1500)
            .attr('opacity', 1.0);




   }*/
  }
