import { User } from 'src/modules/user/domain/user.entity';
import { Entity, EntityMetadata } from 'src/shared/core/entity';

type UrlProps = {
  user?: User;
  original: string;
  short: string;
  clicks: number;
};

export class Url extends Entity<UrlProps> {
  private constructor(props: UrlProps, metadata?: EntityMetadata) {
    super(props, metadata);
  }

  static create(props: UrlProps, metadata?: EntityMetadata): Url {
    return new Url(props, metadata);
  }

  get user(): User | undefined {
    return this.props.user;
  }

  set user(user: User) {
    this.props.user = user;
  }

  get original(): string {
    return this.props.original;
  }

  set original(original: string) {
    this.props.original = original;
  }

  get short(): string {
    return this.props.short;
  }

  set short(short: string) {
    this.props.short = short;
  }

  get clicks(): number {
    return this.props.clicks;
  }

  set clicks(clicks: number) {
    this.props.clicks = clicks;
  }
}
