import { Component, Input } from '@angular/core';
import { UserService } from '../../user.service';
import { NgIf } from '@angular/common';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-follow-button-user',
  imports: [NgIf],
  templateUrl: './follow-button-user.component.html',
})
export class FollowButtonUserComponent {
  @Input() followingId = '';
  userId: string | undefined = '';
  isFollowed = false;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser$
      .pipe(
        filter((user) => !!user),
        tap((user) => (this.userId = user?._id)),
        switchMap(() => this.userService.isFollowing(this.followingId)),
      )
      .subscribe(({ followed }) => (this.isFollowed = followed));
  }

  toggleFollow() {
    this.userService
      .toggleFollow(this.followingId)
      .subscribe(({ followed }) => (this.isFollowed = followed));
  }
}
