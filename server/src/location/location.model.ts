import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  city?: string | null;

  @Field(() => String, { nullable: true })
  state?: string | null;

  @Field(() => String)
  country: string;

  @Field(() => Boolean)
  isActive: boolean;
}
