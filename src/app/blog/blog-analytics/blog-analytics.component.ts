import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { BlogsService } from '../../blogs.service';
import { ActivatedRoute } from '@angular/router';
import {
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLinkButton,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateOutlet } from '@angular/common';
import { BlogAnalytics } from '../../response.models';

@Component({
  selector: 'app-blog-analytics',
  imports: [
    NgbNav,
    NgbNavOutlet,
    NgbNavItem,
    NgbNavLinkButton,
    NgbNavContent,
    NgTemplateOutlet,
  ],
  templateUrl: './blog-analytics.component.html',
})
export class BlogAnalyticsComponent {
  chart: Chart<'line', number[], string> | null = null;
  range = 'weekly';
  blogId = '';
  totalReads = 0;
  totalLikes = 0;
  totalComments = 0;
  currentHoveredButton = 0;
  currentFocusedButton = 0;

  constructor(
    private readonly blogService: BlogsService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id')!;
      this.getAnalytics(this.range);
    });
  }

  getAnalytics(range: string) {
    this.range = range;

    this.blogService
      .getAnalytics(this.blogId, this.range)
      .subscribe((analytics) => this.createChart(analytics));
  }

  createChart(analytics: BlogAnalytics) {
    this.totalReads = analytics.total.reads;
    this.totalLikes = analytics.total.likes;
    this.totalComments = analytics.total.comments;

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    this.chart = new Chart(this.range, {
      type: 'line',

      data: {
        labels: analytics.labels,
        datasets: analytics.datasets.map((dataset) => ({
          ...dataset,
          tension: 0.5,
        })),
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            ticks: {
              stepSize: 1,
            },
          },
        },
        animations: {
          y: {
            easing: 'easeInOutElastic',
            from: (ctx: any) => {
              if (ctx.type === 'data') {
                if (ctx.mode === 'default' && !ctx.dropped) {
                  ctx.dropped = true;
                  return 0;
                }
              }
              return undefined;
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            onHover: function (e: any) {
              e.native.target.style.cursor = 'pointer';
            },
            onLeave: function (e: any) {
              e.native.target.style.cursor = 'default';
            },
          },
        },
      },
    });
  }
}
