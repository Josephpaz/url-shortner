import { Entity, EntityMetadata } from 'src/shared/core/entity';

type AccessLogProps = {
  urlId: string;
  ipAddress: string;
  userAgent: string;
};

export class AccessLog extends Entity<AccessLogProps> {
  private constructor(props: AccessLogProps, metadata?: EntityMetadata) {
    super(props, metadata);
  }

  static create(props: AccessLogProps, metadata?: EntityMetadata) {
    return new AccessLog(props, metadata);
  }

  get urlId(): string {
    return this.props.urlId;
  }

  set urlId(urlId: string) {
    this.props.urlId = urlId;
  }

  get ipAddress(): string {
    return this.props.ipAddress;
  }

  set ipAddress(ipAddress: string) {
    this.props.ipAddress = ipAddress;
  }

  get userAgent(): string {
    return this.props.userAgent;
  }

  set userAgent(userAgent: string) {
    this.props.userAgent = userAgent;
  }
}
