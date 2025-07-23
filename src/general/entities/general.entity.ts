import { ObjectType, Field, Int } from '@nestjs/graphql';


@ObjectType()
export class Redirecturls {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  url: string;

  @Field(() => String)
  redirectedUrl: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}