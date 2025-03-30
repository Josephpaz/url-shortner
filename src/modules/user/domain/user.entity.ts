import { Entity, EntityMetadata } from 'src/shared/core/entity';
import { hashSync, compareSync } from 'bcrypt';

type UserProps = {
  email: string;
  password: string;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, metadata?: EntityMetadata) {
    super(props, metadata);
  }

  static create(props: UserProps, metadata?: EntityMetadata): User {
    return new User(props, metadata);
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(raw: string) {
    this.props.password = hashSync(raw, 10);
  }

  isPasswordValid(pass: string) {
    return compareSync(pass, this.password);
  }
}
