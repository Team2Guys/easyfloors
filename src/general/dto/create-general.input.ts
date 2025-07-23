import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatedRedirecturls {

  @Field(() => String)
  url: string;

  @Field(() => String)
  redirectedUrl: string;


  


}