import { AccessLog } from 'src/modules/access-log/domain/access-log.entity';
import { User } from 'src/modules/user/domain/user.entity';
import { Entity, EntityMetadata } from 'src/shared/core/entity';

type UrlProps = {
  user?: User;
  accessLogs?: AccessLog[];
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

  get accessLogs(): AccessLog[] | undefined {
    return this.props.accessLogs;
  }

  set accessLogs(accessLogs: AccessLog[]) {
    this.props.accessLogs = accessLogs;
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
