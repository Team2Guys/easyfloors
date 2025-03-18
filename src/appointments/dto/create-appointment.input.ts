import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
  @Field()
  firstname: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  whatsappNumber: string;

  @Field()
  area: string;

  @Field()
  selectRooms: string;
  @Field()
  preferredDate: Date;

  @Field()
  preferredTime: string;
  @Field()
  findUs: string;
  @Field()
  comment: string;
  @Field()
  contactMethod: string;


}
